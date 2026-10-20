/**
 * PYLICE - UI Component & Modal Renderer
 * Manages noir detective dossiers, SVG badges, classified overlays,
 * Lock Answer confirmations, and dramatic stamp verdicts.
 * Fully localized with i18n support.
 */

import { i18n } from "./i18n.js";

export class UIRenderer {
  
  constructor() {
    this.selectedSuspectId = null;
  }

  // Generates unique noir role silhouette SVGs
  getAvatarSvg(type) {
    const pal = {
      skin: "#e2c09c",
      shadow: "#2a1e17",
      cloth: "#3b2f27",
      accent: "#c4a35a",
      hair: "#1b140f"
    };

    switch (type) {
      case "sysadmin":
      case "hardware":
        return `
          <svg viewBox="0 0 80 80" class="suspect-avatar-svg">
            <circle cx="40" cy="40" r="38" fill="#241b16" stroke="#c4a35a" stroke-width="2"/>
            <circle cx="40" cy="30" r="14" fill="${pal.skin}"/>
            <path d="M 28 26 Q 40 16 52 26 Q 40 20 28 26 Z" fill="${pal.hair}"/>
            <!-- Glasses -->
            <rect x="30" y="27" width="8" height="5" rx="1" fill="none" stroke="#d4af37" stroke-width="1.5"/>
            <rect x="42" y="27" width="8" height="5" rx="1" fill="none" stroke="#d4af37" stroke-width="1.5"/>
            <line x1="38" y1="29" x2="42" y2="29" stroke="#d4af37" stroke-width="1.5"/>
            <!-- Body -->
            <path d="M 20 70 C 20 50, 30 46, 40 46 C 50 46, 60 50, 60 70 Z" fill="#313d44"/>
            <polygon points="40,46 36,54 44,54" fill="#c4a35a"/>
          </svg>
        `;
      case "teller":
      case "clerk":
        return `
          <svg viewBox="0 0 80 80" class="suspect-avatar-svg">
            <circle cx="40" cy="40" r="38" fill="#241b16" stroke="#c4a35a" stroke-width="2"/>
            <circle cx="40" cy="30" r="14" fill="${pal.skin}"/>
            <path d="M 26 25 Q 40 18 54 25" stroke="${pal.hair}" stroke-width="6" fill="none"/>
            <path d="M 22 70 C 22 52, 30 48, 40 48 C 50 48, 58 52, 58 70 Z" fill="#42352b"/>
            <!-- Tie -->
            <polygon points="40,48 37,62 40,68 43,62" fill="#8b3a3a"/>
          </svg>
        `;
      case "guard":
        return `
          <svg viewBox="0 0 80 80" class="suspect-avatar-svg">
            <circle cx="40" cy="40" r="38" fill="#241b16" stroke="#c4a35a" stroke-width="2"/>
            <circle cx="40" cy="32" r="14" fill="${pal.skin}"/>
            <!-- Officer Cap -->
            <path d="M 24 24 L 56 24 L 50 16 L 30 16 Z" fill="#1b242e"/>
            <rect x="22" y="24" width="36" height="4" rx="2" fill="#d4af37"/>
            <path d="M 20 70 C 20 52, 30 48, 40 48 C 60 52, 60 70 Z" fill="#1b242e"/>
            <!-- Badge -->
            <polygon points="40,54 43,58 40,62 37,58" fill="#d4af37"/>
          </svg>
        `;
      case "doctor":
      case "nurse":
        return `
          <svg viewBox="0 0 80 80" class="suspect-avatar-svg">
            <circle cx="40" cy="40" r="38" fill="#241b16" stroke="#c4a35a" stroke-width="2"/>
            <circle cx="40" cy="30" r="14" fill="${pal.skin}"/>
            <path d="M 24 28 Q 40 14 56 28" fill="${pal.hair}"/>
            <!-- Stethoscope / Scrubs -->
            <path d="M 20 70 C 20 50, 30 46, 40 46 C 50 46, 60 50, 60 70 Z" fill="#2d5257"/>
            <path d="M 33 46 Q 40 60 47 46" stroke="#d4af37" stroke-width="2" fill="none"/>
            <circle cx="40" cy="62" r="3" fill="#d4af37"/>
          </svg>
        `;
      default:
        return `
          <svg viewBox="0 0 80 80" class="suspect-avatar-svg">
            <circle cx="40" cy="40" r="38" fill="#241b16" stroke="#c4a35a" stroke-width="2"/>
            <circle cx="40" cy="30" r="14" fill="${pal.skin}"/>
            <path d="M 26 26 Q 40 18 54 26" fill="${pal.hair}"/>
            <!-- Collar Coat -->
            <path d="M 20 70 C 20 52, 30 48, 40 48 C 50 48, 60 52, 60 70 Z" fill="${pal.cloth}"/>
            <polygon points="40,48 35,58 45,58" fill="#c4a35a"/>
          </svg>
        `;
    }
  }

  // Renders the suspect cards on the right-hand panel
  renderSuspectList(suspects, containerId, onCardClick) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let html = `<div class="suspect-roster-header">
      <span class="roster-title">${i18n.t("suspectsTitle")} (${suspects.length})</span>
      <span class="roster-note">${i18n.t("suspectsNote")}</span>
    </div>`;

    html += `<div class="suspect-cards-grid">`;

    suspects.forEach((s) => {
      const rawAccess = (s.accessLevel || "").toLowerCase();
      const accessBadgeClass = 
        rawAccess.includes("high") || rawAccess.includes("tinggi") ? "badge-high" :
        rawAccess.includes("medium") || rawAccess.includes("sedang") ? "badge-medium" :
        rawAccess.includes("low") || rawAccess.includes("rendah") ? "badge-low" : "badge-none";

      html += `
        <div class="suspect-file-card" data-suspect-id="${s.id}">
          <div class="card-pin"></div>
          <div class="card-avatar-box">
            ${this.getAvatarSvg(s.avatarType)}
          </div>
          <div class="card-info">
            <div class="card-name-row">
              <span class="card-name">${s.name}</span>
              <span class="card-badge-id">${s.badge}</span>
            </div>
            <div class="card-role">${s.role} &bull; ${s.age} ${i18n.t("yearsOld")}</div>
            <div class="card-desc">${s.description}</div>
            <div class="card-footer">
              <span class="access-tag ${accessBadgeClass}">${i18n.t("accessLabel")} ${s.accessLevel}</span>
              <span class="inspect-btn">${i18n.t("examineLink")}</span>
            </div>
          </div>
        </div>
      `;
    });

    html += `</div>`;
    container.innerHTML = html;

    // Attach click listeners to cards
    container.querySelectorAll(".suspect-file-card").forEach((card) => {
      card.addEventListener("click", () => {
        const id = card.getAttribute("data-suspect-id");
        const suspect = suspects.find((s) => s.id === id);
        if (suspect && onCardClick) {
          onCardClick(suspect);
        }
      });
    });
  }

  // Briefing modal overlay
  showBriefingModal(caseData, onStartInvestigation) {
    const modal = document.getElementById("briefingModal");
    if (!modal) return;

    // Localize header text
    const folderTab = modal.querySelector(".tab-classified-text");
    if (folderTab) folderTab.textContent = i18n.t("deptTitle");

    const specLabels = modal.querySelectorAll(".spec-label");
    if (specLabels.length >= 4) {
      specLabels[0].textContent = i18n.t("incidentDateLabel");
      specLabels[1].textContent = i18n.t("victimLabel");
      specLabels[2].textContent = i18n.t("lossLabel");
      specLabels[3].textContent = i18n.t("breachedSystemLabel");
    }

    const conceptsLabel = modal.querySelector(".concepts-label");
    if (conceptsLabel) conceptsLabel.textContent = i18n.t("focusLabel");

    const synopsisTitle = modal.querySelector(".dossier-story-narrative h4");
    if (synopsisTitle) synopsisTitle.textContent = i18n.t("synopsisTitle");

    const missionTitle = modal.querySelector(".dossier-mission-box strong");
    if (missionTitle) missionTitle.textContent = i18n.t("objectiveTitle");

    const missionBody = modal.querySelector(".dossier-mission-box span");
    if (missionBody) missionBody.textContent = i18n.t("objectiveBody");

    const startBtnText = document.getElementById("modalStartBtn");
    if (startBtnText) {
      startBtnText.innerHTML = `${i18n.t("btnEnterInvestigation")}`;
    }

    document.getElementById("modalCaseTag").textContent = `CASE #${caseData.id} — ${caseData.stars}`;
    document.getElementById("modalCaseTitle").textContent = caseData.title;
    document.getElementById("modalCaseDate").textContent = caseData.date;
    document.getElementById("modalCaseVictim").textContent = caseData.victim;
    document.getElementById("modalCaseLoss").textContent = caseData.amountStolen;
    document.getElementById("modalCaseSystem").textContent = caseData.system;
    document.getElementById("modalCaseConcepts").textContent = caseData.concepts.join(" • ");
    document.getElementById("modalCaseStory").innerHTML = caseData.story.replace(/\n\n/g, "<br><br>");

    modal.classList.add("modal-active");

    const startBtn = document.getElementById("modalStartBtn");
    const newBtn = startBtn.cloneNode(true);
    startBtn.parentNode.replaceChild(newBtn, startBtn);

    newBtn.addEventListener("click", () => {
      modal.classList.remove("modal-active");
      if (onStartInvestigation) onStartInvestigation();
    });
  }

  // Suspect Profile Inspection modal
  showSuspectDetail(suspect) {
    const modal = document.getElementById("suspectModal");
    if (!modal) return;

    modal.querySelector(".modal-title").textContent = i18n.t("dossierTitle");
    modal.querySelector(".bio-box h4").textContent = i18n.t("bioTitle");

    document.getElementById("suspectModalAvatar").innerHTML = this.getAvatarSvg(suspect.avatarType);
    document.getElementById("suspectModalName").textContent = suspect.name;
    document.getElementById("suspectModalRole").textContent = suspect.role;
    document.getElementById("suspectModalAge").textContent = `${suspect.age} ${i18n.t("yearsOld")}`;
    document.getElementById("suspectModalBadge").textContent = `ID: ${suspect.badge}`;
    document.getElementById("suspectModalAccess").textContent = `${i18n.t("clearanceLabel")} ${suspect.accessLevel}`;
    document.getElementById("suspectModalBio").textContent = suspect.description;

    modal.classList.add("modal-active");

    const closeBtn = document.getElementById("suspectModalClose");
    const closeHandler = () => {
      modal.classList.remove("modal-active");
      closeBtn.removeEventListener("click", closeHandler);
    };
    closeBtn.addEventListener("click", closeHandler);
  }

  // Lock Answer selection modal with GUARANTEED button enablement
  showLockAnswerModal(caseData, onConfirmAnswer) {
    const modal = document.getElementById("lockAnswerModal");
    if (!modal) return;

    this.selectedSuspectId = null;

    // Localize modal texts
    const headerTitle = modal.querySelector(".modal-header h2");
    if (headerTitle) headerTitle.textContent = i18n.t("lockTitle");

    const headerSub = modal.querySelector(".lock-subtitle");
    if (headerSub) headerSub.textContent = i18n.t("lockSubtitle");

    const warnTitle = modal.querySelector(".warning-callout strong");
    if (warnTitle) warnTitle.textContent = i18n.t("lockWarningTitle");

    const warnBody = modal.querySelector(".warning-callout");
    if (warnBody) {
      warnBody.innerHTML = `<strong>${i18n.t("lockWarningTitle")}</strong> ${i18n.t("lockWarningBody")}`;
    }

    const cancelBtn = document.getElementById("cancelLockBtn");
    if (cancelBtn) cancelBtn.textContent = i18n.t("btnCancelLock");

    // Replace confirm button FIRST so we hold the exact reference in DOM
    const rawConfirmBtn = document.getElementById("confirmLockBtn");
    const confirmBtn = rawConfirmBtn.cloneNode(true);
    confirmBtn.disabled = true;
    confirmBtn.textContent = i18n.t("btnConfirmLock");
    rawConfirmBtn.parentNode.replaceChild(confirmBtn, rawConfirmBtn);

    const grid = document.getElementById("lockSuspectsGrid");
    let html = "";
    caseData.suspects.forEach((s) => {
      html += `
        <div class="lock-suspect-card" data-suspect-id="${s.id}">
          <div class="lock-avatar">${this.getAvatarSvg(s.avatarType)}</div>
          <div class="lock-info">
            <span class="lock-name">${s.name}</span>
            <span class="lock-role">${s.role}</span>
          </div>
          <div class="lock-check-mark">✓</div>
        </div>
      `;
    });
    grid.innerHTML = html;

    // Attach card clicks - ALWAYS enables the real confirmBtn in DOM
    grid.querySelectorAll(".lock-suspect-card").forEach((card) => {
      card.addEventListener("click", () => {
        grid.querySelectorAll(".lock-suspect-card").forEach((c) => c.classList.remove("selected"));
        card.classList.add("selected");
        this.selectedSuspectId = card.getAttribute("data-suspect-id");
        confirmBtn.disabled = false;
      });
    });

    modal.classList.add("modal-active");

    // Cancel action
    const onCancel = () => {
      modal.classList.remove("modal-active");
      cancelBtn.removeEventListener("click", onCancel);
    };
    cancelBtn.addEventListener("click", onCancel);

    // Confirm action
    confirmBtn.addEventListener("click", () => {
      if (!this.selectedSuspectId) return;
      modal.classList.remove("modal-active");
      if (onConfirmAnswer) {
        onConfirmAnswer(this.selectedSuspectId);
      }
    });
  }

  // Shows verdict (Guilty / Case Solved OR Case Failed / Wrong Suspect)
  showVerdictModal(isSuccess, caseData, chosenSuspect, onAction) {
    const modal = document.getElementById("verdictModal");
    if (!modal) return;

    const content = document.getElementById("verdictModalContent");

    if (isSuccess) {
      let cluesList = "";
      caseData.clues.forEach((c) => {
        cluesList += `
          <div class="verdict-clue-item">
            <div class="clue-line-tag">Line ${c.line}</div>
            <div class="clue-code-box"><code>${c.codeSnippet}</code></div>
            <div class="clue-expl">${c.explanation}</div>
          </div>
        `;
      });

      content.innerHTML = `
        <div class="verdict-card success-card">
          <div class="stamp-seal stamp-solved">${i18n.t("stampSolved")}</div>
          <div class="verdict-headline">${i18n.t("headlineSolved")}</div>
          <div class="verdict-suspect-box">
            <div class="verdict-avatar">${this.getAvatarSvg(chosenSuspect.avatarType)}</div>
            <div class="verdict-suspect-text">
              <h3>${chosenSuspect.name}</h3>
              <p class="role">${chosenSuspect.role} &bull; ${chosenSuspect.badge}</p>
              <span class="guilty-tag">${i18n.t("statusGuilty")}</span>
            </div>
          </div>

          <div class="verdict-forensic-report">
            <h4>${i18n.t("forensicReportTitle")}</h4>
            ${cluesList}
          </div>

          <div class="verdict-edu-box">
            <h4>${i18n.t("eduSummaryTitle")}</h4>
            <p>${caseData.educationalSummary}</p>
          </div>

          <div class="verdict-actions">
            <button id="verdictActionBtn" class="btn-stamp-action">
              ${caseData.id === 5 ? i18n.t("btnViewVictory") : i18n.t("btnNextCase")}
            </button>
          </div>
        </div>
      `;
    } else {
      content.innerHTML = `
        <div class="verdict-card failure-card">
          <div class="stamp-seal stamp-failed">${i18n.t("stampCold")}</div>
          <div class="verdict-headline">${i18n.t("headlineCold")}</div>
          <p class="verdict-lead">
            ${i18n.t("leadColdPrefix")} <strong>${chosenSuspect ? chosenSuspect.name : 'Unknown'}</strong> (${chosenSuspect ? chosenSuspect.role : ''}),
            ${i18n.t("leadColdSuffix")}
          </p>

          <div class="verdict-warning-box">
            <p>${i18n.t("warningCold")}</p>
          </div>

          <div class="verdict-actions">
            <button id="verdictActionBtn" class="btn-stamp-retry">
              ${i18n.t("btnRetryCase")}
            </button>
          </div>
        </div>
      `;
    }

    modal.classList.add("modal-active");

    const actionBtn = document.getElementById("verdictActionBtn");
    if (actionBtn) {
      actionBtn.addEventListener("click", () => {
        modal.classList.remove("modal-active");
        if (onAction) onAction();
      });
    }
  }

  // Grand Victory Screen for completing all 5 cases
  showVictoryScreen(onPlayAgain) {
    const modal = document.getElementById("victoryModal");
    if (!modal) return;

    modal.querySelector(".victory-ribbon").textContent = i18n.t("victoryRibbon");
    modal.querySelector(".victory-title").textContent = i18n.t("victoryTitle");
    modal.querySelector(".victory-lead").textContent = i18n.t("victoryLead");
    modal.querySelector(".victory-records-card h3").textContent = i18n.t("archiveTitle");
    modal.querySelector(".victory-quote").textContent = i18n.t("victoryQuote");
    
    const playAgainBtn = document.getElementById("playAgainBtn");
    if (playAgainBtn) playAgainBtn.textContent = i18n.t("btnPlayAgain");

    modal.classList.add("modal-active");

    if (playAgainBtn) {
      playAgainBtn.addEventListener("click", () => {
        modal.classList.remove("modal-active");
        if (onPlayAgain) onPlayAgain();
      });
    }
  }
}
