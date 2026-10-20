/**
 * PYLICE - Python Evidence Code Viewer Engine
 * Robust single-pass regex tokenizer for Python syntax highlighting.
 * Features line numbers, search filter, forensic line highlights, and i18n support.
 */

import { i18n } from "./i18n.js";

export class CodeViewer {
  constructor(containerId) {
    this.container = typeof document !== "undefined" && containerId ? document.getElementById(containerId) : null;
    this.rawCode = "";
    this.filename = "evidence.py";
    this.searchRaw = ""; // exactly what the user typed (kept in the input)
    this.searchQuery = ""; // trimmed value used for matching
  }

  setCode(code, filename = "evidence.py") {
    this.rawCode = code.trim();
    this.filename = filename;
    this.render();
  }

  setSearch(query) {
    this.searchRaw = query || "";
    this.searchQuery = this.searchRaw.trim();

    // Only the code rows are redrawn. The header and the input element stay
    // untouched, so the input keeps focus while the user types.
    this.renderRows();
    this.syncSearchControls();
  }

  escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  /**
   * Finds every search hit on the RAW (unescaped, untokenized) line.
   * Returns a list of [start, end) ranges. Matching never touches HTML,
   * so it cannot hit tag names or attributes such as <span class="token-...">.
   */
  findMatchRanges(line) {
    if (!this.searchQuery) return [];
    const escaped = this.searchQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(escaped, "gi");
    const ranges = [];
    let m;
    while ((m = regex.exec(line)) !== null) {
      if (m[0].length === 0) {
        regex.lastIndex++;
        continue;
      }
      ranges.push([m.index, m.index + m[0].length]);
    }
    return ranges;
  }

  /**
   * Emits one token as HTML. `offset` is the token's start position in the raw
   * line; any part of the token that overlaps a search range is wrapped in <mark>.
   * Text is always escaped before being placed in HTML.
   */
  emit(text, cls, offset, ranges) {
    let inner = "";
    const end = offset + text.length;
    let cursor = offset;

    for (const [rs, re] of ranges) {
      if (re <= cursor) continue;
      if (rs >= end) break;
      const s = Math.max(rs, cursor);
      const e = Math.min(re, end);
      if (s > cursor) inner += this.escapeHtml(text.slice(cursor - offset, s - offset));
      inner += `<mark class="code-search-hit">${this.escapeHtml(text.slice(s - offset, e - offset))}</mark>`;
      cursor = e;
    }
    if (cursor < end) inner += this.escapeHtml(text.slice(cursor - offset));

    return cls ? `<span class="${cls}">${inner}</span>` : inner;
  }

  highlightSyntax(line) {
    const PYTHON_REGEX = /(#.*$)|("""[\s\S]*?"""|'''[\s\S]*?'''|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(@\w+)|\b(0b[01]+|0x[0-9a-fA-F]+|\d+\.?\d*)\b|\b(import|from|def|class|return|if|elif|else|for|while|try|except|with|as|in|not|and|or|True|False|None|pass|break|continue|raise|yield|lambda|global|nonlocal|assert|del|finally)\b|\b(print|len|range|int|str|float|list|dict|set|tuple|type|isinstance|open|chr|ord|bytes|hex|bin)\b|\b([a-zA-Z_]\w*)(?=\s*\()/g;

    const ranges = this.findMatchRanges(line);
    let lastIndex = 0;
    let html = "";
    let match;

    while ((match = PYTHON_REGEX.exec(line)) !== null) {
      if (match.index > lastIndex) {
        html += this.emit(line.slice(lastIndex, match.index), "", lastIndex, ranges);
      }

      const [full, comment, str, decorator, number, keyword, builtin, fn] = match;
      let cls = "";

      if (comment) cls = "token-comment";
      else if (str) cls = "token-string";
      else if (decorator) cls = "token-decorator";
      else if (number) cls = "token-number";
      else if (keyword) cls = "token-keyword";
      else if (builtin) cls = "token-builtin";
      else if (fn) cls = "token-function";

      html += this.emit(full, cls, match.index, ranges);
      lastIndex = match.index + full.length;

      if (full.length === 0) PYTHON_REGEX.lastIndex++;
    }

    if (lastIndex < line.length) {
      html += this.emit(line.slice(lastIndex), "", lastIndex, ranges);
    }

    return html;
  }

  /** Builds the static shell (header, search input, empty table). Runs once per setCode / language change. */
  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="code-dossier-header">
        <div class="code-file-tag">
          <span class="file-name">${this.escapeHtml(this.filename)}</span>
          <span class="file-status">${i18n.t("codeHeaderStatus")}</span>
        </div>
        <div class="code-actions">
          <div class="code-search-box">
            <input type="text" id="codeSearchInput" placeholder="${this.escapeHtml(i18n.t("codeSearchPlaceholder"))}" value="${this.escapeHtml(this.searchRaw)}" autocomplete="off" spellcheck="false" />
            <button id="clearSearchBtn" title="Clear filter" style="display:none">&#10005;</button>
          </div>
          <button id="copyCodeBtn" class="btn-micro" title="Copy Python script">${i18n.t("btnCopy")}</button>
        </div>
      </div>
      <div class="code-scroll-pane">
        <table class="code-table">
          <tbody id="codeTableBody"></tbody>
        </table>
      </div>
    `;

    const searchInput = this.container.querySelector("#codeSearchInput");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.setSearch(e.target.value);
      });
    }

    const clearBtn = this.container.querySelector("#clearSearchBtn");
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        this.setSearch("");
        const input = this.container.querySelector("#codeSearchInput");
        if (input) input.focus();
      });
    }

    const copyBtn = this.container.querySelector("#copyCodeBtn");
    if (copyBtn) {
      copyBtn.addEventListener("click", () => {
        navigator.clipboard.writeText(this.rawCode).then(() => {
          copyBtn.textContent = i18n.t("btnCopied");
          setTimeout(() => (copyBtn.textContent = i18n.t("btnCopy")), 2000);
        });
      });
    }

    this.renderRows();
    this.syncSearchControls();
  }

  /** Redraws only the code lines. */
  renderRows() {
    if (!this.container) return;
    const tbody = this.container.querySelector("#codeTableBody");
    if (!tbody) return;

    const query = this.searchQuery.toLowerCase();
    const lines = this.rawCode.split("\n");
    let html = "";

    lines.forEach((line, index) => {
      const lineNum = index + 1;
      const highlighted = this.highlightSyntax(line);
      const isSearchMatch = query && line.toLowerCase().includes(query);

      html += `
        <tr class="code-row ${isSearchMatch ? "search-match-row" : ""}" data-line="${lineNum}">
          <td class="code-gutter" data-line="${lineNum}">${lineNum}</td>
          <td class="code-content"><pre><code>${highlighted || " "}</code></pre></td>
        </tr>
      `;
    });

    tbody.innerHTML = html;
  }

  /** Keeps the clear button and the input value in sync without recreating the input. */
  syncSearchControls() {
    if (!this.container) return;
    const input = this.container.querySelector("#codeSearchInput");
    const clearBtn = this.container.querySelector("#clearSearchBtn");
    if (input && input.value !== this.searchRaw) input.value = this.searchRaw;
    if (clearBtn) clearBtn.style.display = this.searchRaw ? "" : "none";
  }

  scrollToLine(lineNum) {
    const row = this.container.querySelector(`tr[data-line="${lineNum}"]`);
    if (row) {
      row.scrollIntoView({ behavior: 'smooth', block: 'center' });
      row.classList.add('flash-highlight');
      setTimeout(() => row.classList.remove('flash-highlight'), 2000);
    }
  }
}
