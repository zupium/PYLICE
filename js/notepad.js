/**
 * PYLICE - Detective Notebook & Cyber Forensics Scratchpad
 * Allows players to take notes per case and provides interactive decoder tools:
 * Caesar Cipher, ASCII Code converter, Base64/Hex decoder, and String Reverser.
 * Now starts EMPTY without spoilers and supports bilingual (i18n) labels!
 */

import { i18n } from "./i18n.js";

export class Notepad {
  constructor(containerId) {
    this.container = typeof document !== "undefined" && containerId ? document.getElementById(containerId) : null;
    this.currentCaseId = 1;
    this.activeTab = "notes"; // "notes" or "tools"
  }

  setCase(caseId) {
    this.currentCaseId = caseId;
    this.render();
  }

  getStorageKey() {
    return `pylice_case_note_${this.currentCaseId}`;
  }

  getSavedNotes() {
    return typeof localStorage !== "undefined" ? (localStorage.getItem(this.getStorageKey()) || "") : "";
  }

  saveNotes(text) {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(this.getStorageKey(), text);
    }
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="notepad-header">
        <div class="notepad-tabs">
          <button class="notepad-tab-btn ${this.activeTab === 'notes' ? 'active' : ''}" data-tab="notes">
            ${i18n.t("tabFieldNotes")}
          </button>
          <button class="notepad-tab-btn ${this.activeTab === 'tools' ? 'active' : ''}" data-tab="tools">
            ${i18n.t("tabDecoderTools")}
          </button>
        </div>
        <span class="notepad-stamp">${i18n.t("confidentialStamp")}</span>
      </div>

      <div class="notepad-body">
        ${this.activeTab === 'notes' ? this.renderNotesView() : this.renderToolsView()}
      </div>
    `;

    this.attachEvents();
  }

  renderNotesView() {
    const saved = this.getSavedNotes();
    return `
      <div class="notes-view">
        <p class="notes-hint">${i18n.t("notesHint")}</p>
        <textarea id="caseNotesArea" placeholder="${i18n.t("notesPlaceholder")}" spellcheck="false">${saved}</textarea>
        <div class="notes-footer">
          <span id="saveStatus" class="save-status">${i18n.t("statusSaved")}</span>
          <button id="clearNotesBtn" class="btn-micro-muted">${i18n.t("btnClearNotes")}</button>
        </div>
      </div>
    `;
  }

  renderToolsView() {
    return `
      <div class="decoder-tools-grid">
        <!-- Tool 1: Caesar Cipher Decoder -->
        <div class="decoder-card">
          <div class="decoder-title">
            <span>${i18n.t("caesarTitle")}</span>
            <span class="tool-badge">${i18n.t("caesarBadge")}</span>
          </div>
          <div class="decoder-input-row">
            <input type="text" id="caesarInput" placeholder="${i18n.t("caesarPlaceholder")}" value="" />
            <input type="number" id="caesarShift" value="" min="1" max="25" placeholder="Shift" title="${i18n.t("caesarShiftTitle")}" />
            <button id="runCaesarBtn" class="btn-micro-action">${i18n.t("btnDecode")}</button>
          </div>
          <div class="decoder-result" id="caesarResult">${i18n.t("resultAwaiting")}</div>
        </div>

        <!-- Tool 2: ASCII chr() / ord() -->
        <div class="decoder-card">
          <div class="decoder-title">
            <span>${i18n.t("asciiTitle")}</span>
            <span class="tool-badge">${i18n.t("asciiBadge")}</span>
          </div>
          <div class="decoder-input-row">
            <input type="text" id="asciiInput" placeholder="${i18n.t("asciiPlaceholder")}" value="" />
            <button id="runAsciiBtn" class="btn-micro-action">${i18n.t("btnConvert")}</button>
          </div>
          <div class="decoder-result" id="asciiResult">${i18n.t("resultAwaiting")}</div>
        </div>

        <!-- Tool 3: Base64 & Hex Decoder -->
        <div class="decoder-card">
          <div class="decoder-title">
            <span>${i18n.t("b64HexTitle")}</span>
            <span class="tool-badge">${i18n.t("b64HexBadge")}</span>
          </div>
          <div class="decoder-input-row">
            <input type="text" id="b64HexInput" placeholder="${i18n.t("b64HexPlaceholder")}" value="" />
            <button id="runB64HexBtn" class="btn-micro-action">${i18n.t("btnDecode")}</button>
          </div>
          <div class="decoder-result" id="b64HexResult">${i18n.t("resultAwaiting")}</div>
        </div>

        <!-- Tool 4: Reverse Slicer [::-1] -->
        <div class="decoder-card">
          <div class="decoder-title">
            <span>${i18n.t("reverseTitle")}</span>
            <span class="tool-badge">${i18n.t("reverseBadge")}</span>
          </div>
          <div class="decoder-input-row">
            <input type="text" id="reverseInput" placeholder="${i18n.t("reversePlaceholder")}" value="" />
            <button id="runReverseBtn" class="btn-micro-action">${i18n.t("btnReverse")}</button>
          </div>
          <div class="decoder-result" id="reverseResult">${i18n.t("resultAwaiting")}</div>
        </div>
      </div>
    `;
  }

  attachEvents() {
    // Tab switching
    this.container.querySelectorAll(".notepad-tab-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        this.activeTab = btn.getAttribute("data-tab");
        this.render();
      });
    });

    if (this.activeTab === "notes") {
      const textarea = document.getElementById("caseNotesArea");
      const status = document.getElementById("saveStatus");
      const clearBtn = document.getElementById("clearNotesBtn");

      if (textarea) {
        let timeout;
        textarea.addEventListener("input", () => {
          if (status) status.textContent = i18n.t("statusSaving");
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            this.saveNotes(textarea.value);
            if (status) status.textContent = i18n.t("statusSaved");
          }, 400);
        });
      }

      if (clearBtn && textarea) {
        clearBtn.addEventListener("click", () => {
          if (confirm(i18n.t("confirmClearNotes"))) {
            textarea.value = "";
            this.saveNotes("");
            if (status) status.textContent = i18n.t("statusCleared");
          }
        });
      }
    } else {
      // Decoder tools handlers
      // 1. Caesar Cipher
      const runCaesar = () => {
        const text = (document.getElementById("caesarInput")?.value || "").trim().toLowerCase();
        const shiftVal = document.getElementById("caesarShift")?.value;
        const shift = shiftVal === "" ? 0 : parseInt(shiftVal, 10);
        const out = document.getElementById("caesarResult");

        if (!text) {
          if (out) out.textContent = i18n.t("resultAwaiting");
          return;
        }

        let res = "";
        for (let i = 0; i < text.length; i++) {
          const c = text.charCodeAt(i);
          if (c >= 97 && c <= 122) {
            // Shift backwards (decode)
            const decoded = ((c - 97 - shift + 26) % 26) + 97;
            res += String.fromCharCode(decoded);
          } else {
            res += text[i];
          }
        }
        if (out) out.textContent = `${i18n.t("resultPrefix")}${res}`;
      };
      document.getElementById("runCaesarBtn")?.addEventListener("click", runCaesar);

      // 2. ASCII Array
      const runAscii = () => {
        const raw = (document.getElementById("asciiInput")?.value || "").trim();
        const out = document.getElementById("asciiResult");
        if (!raw) {
          if (out) out.textContent = i18n.t("resultAwaiting");
          return;
        }

        const numbers = raw.match(/\d+/g) || [];
        let res = "";
        for (const n of numbers) {
          const code = parseInt(n, 10);
          if (code >= 32 && code <= 126) {
            res += String.fromCharCode(code);
          }
        }
        if (out) out.textContent = `${i18n.t("resultPrefix")}${res || i18n.t("resultNone")}`;
      };
      document.getElementById("runAsciiBtn")?.addEventListener("click", runAscii);

      // 3. Base64 & Hex
      const runB64Hex = () => {
        const raw = (document.getElementById("b64HexInput")?.value || "").trim();
        const out = document.getElementById("b64HexResult");
        if (!raw) {
          if (out) out.textContent = i18n.t("resultAwaiting");
          return;
        }

        // Try Base64
        try {
          const decoded = atob(raw);
          if (out) out.textContent = `${i18n.t("resultPrefix")}${decoded}`;
          return;
        } catch (_) {}

        // Try Hex
        try {
          const cleanHex = raw.replace(/\s+|0x/g, '');
          if (/^[0-9a-fA-F]+$/.test(cleanHex) && cleanHex.length % 2 === 0) {
            let str = '';
            for (let i = 0; i < cleanHex.length; i += 2) {
              str += String.fromCharCode(parseInt(cleanHex.substr(i, 2), 16));
            }
            if (out) out.textContent = `${i18n.t("resultPrefix")}${str}`;
            return;
          }
        } catch (_) {}

        if (out) out.textContent = i18n.t("resultDecodeError");
      };
      document.getElementById("runB64HexBtn")?.addEventListener("click", runB64Hex);

      // 4. Reverse
      const runReverse = () => {
        const text = (document.getElementById("reverseInput")?.value || "").trim();
        const out = document.getElementById("reverseResult");
        if (!text) {
          if (out) out.textContent = i18n.t("resultAwaiting");
          return;
        }
        const reversed = text.split("").reverse().join("");
        if (out) out.textContent = `${i18n.t("resultPrefix")}${reversed}`;
      };
      document.getElementById("runReverseBtn")?.addEventListener("click", runReverse);
    }
  }
}
