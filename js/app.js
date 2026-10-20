/**
 * PYLICE - Main Game Application Controller
 * Coordinates game states, views, transitions, audio triggers,
 * and handles user actions between screens.
 * Features full bilingual (Bahasa Indonesia & English) language switching.
 */

import { CASES, getLocalizedCase } from "./cases.js";
import { sound } from "./audio.js";
import { CodeViewer } from "./codeviewer.js";
import { Notepad } from "./notepad.js";
import { UIRenderer } from "./ui.js";
import { i18n } from "./i18n.js";

class GameApp {
  constructor() {
    this.currentCaseIndex = 0;
    this.codeViewer = null;
    this.notepad = null;
    this.ui = new UIRenderer();
    this.currentView = "title"; // title, game
    this.activeMobileTab = "code"; // code, suspects, notepad
  }

  init() {
    // Initialize components
    this.codeViewer = new CodeViewer("codeViewerContainer");
    this.notepad = new Notepad("notepadContainer");

    this.bindEvents();
    this.applyLanguage(i18n.getLang());
    this.showTitleScreen();
  }

  get currentRawCase() {
    return CASES[this.currentCaseIndex];
  }

  get currentCase() {
    return getLocalizedCase(this.currentRawCase, i18n.getLang());
  }

  applyLanguage(lang) {
    i18n.setLang(lang);
    document.documentElement.lang = lang;

    // Title Screen Text Updates
    const setTxt = (id, text) => {
      const el = document.getElementById(id);
      if (el) el.textContent = text;
    };

    setTxt("titleStamp", i18n.t("topSecretStamp"));
    setTxt("titleSubtitle", i18n.t("gameSubtitle"));
    setTxt("titleTagline", i18n.t("tagline"));
    setTxt("titleDispatchHeading", i18n.t("dispatchTitle"));
    setTxt("titleDispatchText", i18n.t("dispatchBody"));
    setTxt("pillCases", i18n.t("pillCases"));
    setTxt("pillConcepts", i18n.t("pillConcepts"));
    setTxt("pillDecoders", i18n.t("pillDecoders"));
    setTxt("pillZeroBoilerplate", i18n.t("pillZeroBoilerplate"));
    setTxt("titleStartBtnText", i18n.t("btnStart"));
    setTxt("titleDivisionFooter", i18n.t("divisionFooter"));
    setTxt("titleLangPrompt", i18n.t("langLabel"));

    // Title screen language buttons active state
    document.querySelectorAll(".btn-lang").forEach((b) => {
      b.classList.toggle("active", b.getAttribute("data-lang") === lang);
    });

    // Top Bar Text Updates
    setTxt("topVictimLabel", i18n.t("targetLabel"));
    setTxt("topBriefingBtnText", i18n.t("btnBriefing"));
    setTxt("topLockBtnText", i18n.t("btnLockAnswer"));
    const langCode = document.getElementById("langCode");
    if (langCode) {
      langCode.textContent = lang.toUpperCase();
    }

    // Mobile tabs
    setTxt("mobileTabCode", i18n.t("tabCode"));
    setTxt("mobileTabSuspects", i18n.t("tabSuspects"));
    setTxt("mobileTabNotepad", i18n.t("tabNotepad"));

    // If currently in investigation view, refresh case content & components
    if (this.currentView === "game") {
      this.refreshCurrentCaseView();
    }
  }

  refreshCurrentCaseView() {
    const c = this.currentCase;
    const isId = i18n.getLang() === "id";

    // Update Top bar UI
    document.getElementById("topCaseNum").textContent = isId ? `KASUS #${c.id}` : `CASE #${c.id}`;
    document.getElementById("topCaseTitle").textContent = c.title;
    document.getElementById("topCaseDiff").textContent = `${c.difficulty} ${c.stars}`;
    document.getElementById("topCaseVictim").textContent = c.victim;

    // Refresh Code Viewer header
    this.codeViewer.setCode(c.code, c.filename);

    // Refresh Suspects List with localized roles and bios
    this.ui.renderSuspectList(c.suspects, "suspectListContainer", (suspect) => {
      sound.playPaper();
      this.ui.showSuspectDetail(suspect);
    });

    // Refresh Notepad tabs and labels
    this.notepad.render();
  }

  bindEvents() {
    // Title screen language buttons
    document.querySelectorAll(".btn-lang").forEach((btn) => {
      btn.addEventListener("click", () => {
        sound.init();
        sound.playPaper();
        const selectedLang = btn.getAttribute("data-lang");
        this.applyLanguage(selectedLang);
      });
    });

    // Topbar language toggle button
    const langToggleBtn = document.getElementById("langToggleBtn");
    if (langToggleBtn) {
      langToggleBtn.addEventListener("click", () => {
        sound.playPaper();
        const nextLang = i18n.getLang() === "id" ? "en" : "id";
        this.applyLanguage(nextLang);
      });
    }

    // Title screen start button
    const startBtn = document.getElementById("titleStartBtn");
    if (startBtn) {
      startBtn.addEventListener("click", () => {
        sound.init();
        sound.playStamp();
        this.startGame();
      });
    }

    // Audio toggle button
    const muteBtn = document.getElementById("audioToggleBtn");
    if (muteBtn) {
      muteBtn.addEventListener("click", () => {
        sound.init();
        const isMuted = sound.toggleMute();
        muteBtn.textContent = isMuted ? "OFF" : "ON";
        muteBtn.title = isMuted ? "Unmute Sound" : "Mute Sound";
      });
    }

    // Top bar: Case Briefing button
    const briefingBtn = document.getElementById("topBriefingBtn");
    if (briefingBtn) {
      briefingBtn.addEventListener("click", () => {
        sound.playPaper();
        this.ui.showBriefingModal(this.currentCase);
      });
    }

    // Top bar: Lock Answer button
    const lockAnswerBtn = document.getElementById("topLockBtn");
    if (lockAnswerBtn) {
      lockAnswerBtn.addEventListener("click", () => {
        sound.playStamp();
        this.ui.showLockAnswerModal(this.currentCase, (chosenSuspectId) => {
          this.handleAnswerSubmission(chosenSuspectId);
        });
      });
    }

    // Mobile / Tablet Tab Switchers
    const mobileTabs = document.querySelectorAll(".mobile-nav-btn");
    mobileTabs.forEach((btn) => {
      btn.addEventListener("click", () => {
        sound.playPaper();
        const tab = btn.getAttribute("data-tab");
        this.setMobileTab(tab);
      });
    });

    // Close modals on Escape key
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        document.querySelectorAll(".modal.modal-active").forEach((m) => {
          if (m.id !== "verdictModal" && m.id !== "victoryModal") {
            m.classList.remove("modal-active");
          }
        });
      }
    });
  }

  setMobileTab(tabName) {
    this.activeMobileTab = tabName;
    document.querySelectorAll(".mobile-nav-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-tab") === tabName);
    });

    const codeCol = document.getElementById("codeCol");
    const suspectCol = document.getElementById("suspectCol");
    const notepadCol = document.getElementById("notepadCol");

    if (codeCol && suspectCol && notepadCol) {
      codeCol.classList.toggle("mobile-hidden", tabName !== "code");
      suspectCol.classList.toggle("mobile-hidden", tabName !== "suspects");
      notepadCol.classList.toggle("mobile-hidden", tabName !== "notepad");
    }
  }

  showTitleScreen() {
    this.currentView = "title";
    document.getElementById("titleScreen")?.classList.remove("hidden");
    document.getElementById("gameScreen")?.classList.add("hidden");
  }

  startGame() {
    this.currentView = "game";
    document.getElementById("titleScreen")?.classList.add("hidden");
    document.getElementById("gameScreen")?.classList.remove("hidden");
    this.loadCase(0, true);
  }

  loadCase(index, showBriefing = true) {
    this.currentCaseIndex = index;
    const c = this.currentCase;
    const isId = i18n.getLang() === "id";

    // Update Top bar UI
    document.getElementById("topCaseNum").textContent = isId ? `KASUS #${c.id}` : `CASE #${c.id}`;
    document.getElementById("topCaseTitle").textContent = c.title;
    document.getElementById("topCaseDiff").textContent = `${c.difficulty} ${c.stars}`;
    document.getElementById("topCaseVictim").textContent = c.victim;

    // Load Code
    this.codeViewer.setCode(c.code, c.filename);

    // Load Suspects
    this.ui.renderSuspectList(c.suspects, "suspectListContainer", (suspect) => {
      sound.playPaper();
      this.ui.showSuspectDetail(suspect);
    });

    // Load Notepad
    this.notepad.setCase(c.id);

    // Default mobile tab
    this.setMobileTab("code");

    // Show initial Briefing Modal
    if (showBriefing) {
      setTimeout(() => {
        sound.playPaper();
        this.ui.showBriefingModal(c);
      }, 200);
    }
  }

  handleAnswerSubmission(suspectId) {
    const c = this.currentCase;
    const isCorrect = suspectId === c.culpritId;
    const chosenSuspect = c.suspects.find((s) => s.id === suspectId);

    if (isCorrect) {
      sound.playSuccess();
      setTimeout(() => sound.playStamp(), 300);

      this.ui.showVerdictModal(true, c, chosenSuspect, () => {
        if (this.currentCaseIndex < CASES.length - 1) {
          // Proceed to next case
          this.loadCase(this.currentCaseIndex + 1, true);
        } else {
          // Victory Screen!
          sound.playSuccess();
          this.ui.showVictoryScreen(() => {
            this.loadCase(0, true);
          });
        }
      });
    } else {
      sound.playFail();
      setTimeout(() => sound.playStamp(), 350);

      this.ui.showVerdictModal(false, c, chosenSuspect, () => {
        // Retry the same case
        this.loadCase(this.currentCaseIndex, false);
      });
    }
  }
}

// Instantiate and start app on DOM ready
document.addEventListener("DOMContentLoaded", () => {
  const app = new GameApp();
  app.init();
});
