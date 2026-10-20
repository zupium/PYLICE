/**
 * PYLICE - Internationalization (i18n) Engine
 * Full bilingual support: Bahasa Indonesia (id) & English (en).
 * Provides localized case descriptions, suspects, clues, and UI strings.
 */

export const I18N_STORAGE_KEY = "pylice_language";

export const UI_TEXT = {
  id: {
    // Title screen
    topSecretStamp: "BERKAS RESMI • RAHASIA NEGARA",
    gameSubtitle: "Investigasi Logika Python & Penegakan Kejahatan Siber",
    tagline: "“Setiap kejahatan meninggalkan jejak. Setiap baris kode bercerita.”",
    dispatchTitle: "DISPATCH MASUK DARI DITRESKRIMSUS SIBER",
    dispatchBody: "Gelombang kejahatan siber canggih telah membobol institusi penting. Satu-satunya barang bukti yang tertinggal adalah kode berbahaya Python. Masuki peran detektif siber: bedah skripnya, pecahkan sandi kriptografinya, dan seret pelakunya ke pengadilan.",
    pillCases: "5 Kasus Unik",
    pillConcepts: "Konsep Nyata Python",
    pillDecoders: "Alat Forensik Interaktif",
    pillZeroBoilerplate: "100% Edukatif",
    btnStart: "BUKA BERKAS KASUS PERTAMA",
    divisionFooter: "DIVISI PYLICE • UNIT FORENSIK SIBER • V1.0",
    langLabel: "PILIH BAHASA:",

    // Top bar
    targetLabel: "SASARAN / KORBAN:",
    btnBriefing: "Ringkasan Kasus",
    btnLockAnswer: "Kunci Jawaban",
    soundToggle: "Suara",

    // Mobile tabs
    tabCode: "Kode Bukti",
    tabSuspects: "Suspek",
    tabNotepad: "Catatan & Tools",

    // Code viewer
    codeHeaderStatus: "SALINAN FORENSIK HANYA-BACA",
    codeSearchPlaceholder: "Cari di kode (misal: hash, diana)...",
    btnCopy: "Salin",
    btnCopied: "✓ Tersalin!",

    // Suspects panel
    suspectsTitle: "DAFTAR SUSPEK / TERDUGA",
    suspectsNote: "Klik kartu untuk periksa",
    accessLabel: "Akses:",
    examineLink: "Periksa &rarr;",
    yearsOld: "tahun",

    // Notepad & Decoders
    tabFieldNotes: "Catatan Lapangan",
    tabDecoderTools: "Alat Forensik",
    confidentialStamp: "RAHASIA",
    notesHint: "Tuliskan temuan variabel, alibi suspek, atau hipotesis Anda:",
    notesPlaceholder: "Ketik catatan investigasi Anda di sini... (tersimpan otomatis)",
    statusSaved: "Tersimpan",
    statusSaving: "Menyimpan...",
    statusCleared: "Dibersihkan",
    btnClearNotes: "Hapus Catatan",
    confirmClearNotes: "Hapus catatan investigasi untuk kasus ini?",

    // Decoders
    caesarTitle: "Dekoder Caesar Cipher",
    caesarBadge: "Pergeseran Huruf",
    caesarPlaceholder: "Teks sandi (misal: fkcpc)",
    caesarShiftTitle: "Jumlah pergeseran alfabet",
    btnDecode: "Dekode",

    asciiTitle: "Konversi Array ASCII chr() ke Teks",
    asciiBadge: "chr(n)",
    asciiPlaceholder: "Ketik deret angka (misal: 74, 97, 109, 101, 115)",
    btnConvert: "Konversi",

    b64HexTitle: "Dekoder Base64 & Hex Byte",
    b64HexBadge: "fromhex / b64",
    b64HexPlaceholder: "Tempel kode Base64 atau string Hex...",

    reverseTitle: "Pembalik String [::-1]",
    reverseBadge: "Irisan [::-1]",
    reversePlaceholder: "Teks yang ingin dibalik...",
    btnReverse: "Balikkan",

    resultAwaiting: "Hasil: (menunggu input)",
    resultPrefix: "Hasil: ",
    resultNone: "(tidak ada)",
    resultDecodeError: "Format tidak valid (periksa format Base64 atau Hex)",

    // Case briefing modal
    deptTitle: "DIREKTORAT PENEGAKAN HUKUM SIBER",
    incidentDateLabel: "TANGGAL KEJADIAN:",
    victimLabel: "KORBAN / ENTITAS:",
    lossLabel: "KERUGIAN / DAMPAK:",
    breachedSystemLabel: "SISTEM YANG DIREBOB:",
    focusLabel: "FOKUS LOGIKA PYTHON:",
    synopsisTitle: "KRONOLOGI & RINGKASAN KASUS:",
    objectiveTitle: "INSTRUKSI DETEKTIF:",
    objectiveBody: "Teliti skrip Python yang tertinggal di panel kiri. Cocokkan nilai variabel, sandi, serta petunjuk tersembunyi dengan profil suspek untuk mengungkap pelakunya.",
    btnEnterInvestigation: "MASUK KE RUANG INVESTIGASI",

    // Suspect detail modal
    dossierTitle: "BERKAS LENGKAP ORANG DALAM PENYELIDIKAN",
    clearanceLabel: "Izin Hak Akses:",
    bioTitle: "LATAR BELAKANG & KESAKSIAN:",

    // Lock answer modal
    lockTitle: "AJUKAN DAKWAAN RESMI",
    lockSubtitle: "Pilih individu yang jejak digital dan motifnya terbukti pada kode Python.",
    lockWarningTitle: "PERINGATAN KERAS DETEKTIF:",
    lockWarningBody: "Anda hanya memiliki SATU kali kesempatan! Jika Anda salah mendakwa orang, kasus ini akan dinyatakan buntu dan investigasi kasus ini harus diulang dari awal!",
    btnCancelLock: "Batalkan & Pelajari Kode Lagi",
    btnConfirmLock: "KONFIRMASI DAKWAAN & TANGKAP",

    // Verdict modal
    stampSolved: "KASUS TERPECAHKAN",
    headlineSolved: "PELAKU BERHASIL DITANGKAP!",
    statusGuilty: "██ TERBUKTI BERSALAH ██",
    forensicReportTitle: "Bedah Bukti Kode Forensik:",
    eduSummaryTitle: "Pelajaran Logika Python:",
    btnNextCase: "LANJUT KE KASUS BERIKUTNYA &rarr;",
    btnViewVictory: "LIHAT PENGHARGAAN DETEKTIF &rarr;",

    stampCold: "KASUS BUNTU",
    headlineCold: "SALAH MENANGKAP ORANG!",
    leadColdPrefix: "Anda menangkap",
    leadColdSuffix: "namun alibi mereka terbukti sah dan tidak terbantahkan. Pelaku sebenarnya berhasil menghapus jejak dan melarikan diri!",
    warningCold: "Peringatan: Dalam forensik digital, praduga saja tidak cukup. Pelajari baris kode dengan teliti, periksa operasi variabel, manipulasi teks, dan komentar yang tertinggal!",
    btnRetryCase: "BUKA KEMBALI KASUS (COBA LAGI)",

    // Victory modal
    victoryRibbon: "PIAGAM KEHORMATAN KEPOLISIAN SIBER PYLICE",
    victoryTitle: "DETEKTIF SIBER UTAMA (MASTER DETECTIVE)",
    victoryLead: "Luar biasa! Anda berhasil memecahkan seluruh 5 kasus kejahatan siber berantai dan membongkar setiap lapisan logika tersembunyi dalam kode Python.",
    archiveTitle: "ARSIP KASUS YANG BERHASIL DIPECAHKAN:",
    victoryQuote: "“Setiap baris kode bercerita. Anda telah membuktikan kemampuan membacanya dengan sempurna.”",
    btnPlayAgain: "MAINKAN ULANG INVESTIGASI"
  },

  en: {
    // Title screen
    topSecretStamp: "OFFICIAL DOSSIER • TOP SECRET",
    gameSubtitle: "Python Logic Investigation & Cybercrime Enforcement",
    tagline: "“Every crime leaves a trace. Every line of code tells a story.”",
    dispatchTitle: "S.I.U. INCOMING DISPATCH",
    dispatchBody: "A wave of sophisticated cybercrimes has struck major institutions. The only evidence left behind is rogue Python source code. Step into the shoes of a lead cyber detective: read the scripts, decipher the ciphers, and bring the criminals to justice.",
    pillCases: "5 Unique Cases",
    pillConcepts: "Real Python Concepts",
    pillDecoders: "Interactive Decoders",
    pillZeroBoilerplate: "100% Educational",
    btnStart: "OPEN FIRST CASE FILE",
    divisionFooter: "PYLICE DIVISION • CYBER FORENSICS UNIT • V1.0",
    langLabel: "LANGUAGE:",

    // Top bar
    targetLabel: "TARGET:",
    btnBriefing: "Case Briefing",
    btnLockAnswer: "Lock Answer",
    soundToggle: "Sound",

    // Mobile tabs
    tabCode: "Evidence Code",
    tabSuspects: "Suspects",
    tabNotepad: "Field Notes & Tools",

    // Code viewer
    codeHeaderStatus: "READ-ONLY FORENSIC DUMP",
    codeSearchPlaceholder: "Filter code (e.g. hash, diana)...",
    btnCopy: "Copy",
    btnCopied: "✓ Copied!",

    // Suspects panel
    suspectsTitle: "PERSONS OF INTEREST",
    suspectsNote: "Click card to inspect",
    accessLabel: "Access:",
    examineLink: "Examine &rarr;",
    yearsOld: "y/o",

    // Notepad & Decoders
    tabFieldNotes: "Field Notes",
    tabDecoderTools: "Decoder Tools",
    confidentialStamp: "CONFIDENTIAL",
    notesHint: "Jot down clues, variable values, or suspect motives:",
    notesPlaceholder: "Write your case observations here... (autosaves)",
    statusSaved: "Saved",
    statusSaving: "Saving...",
    statusCleared: "Cleared",
    btnClearNotes: "Clear Notes",
    confirmClearNotes: "Clear your field notes for this case?",

    // Decoders
    caesarTitle: "Caesar Cipher Decoder",
    caesarBadge: "Shift",
    caesarPlaceholder: "Ciphertext (e.g. fkcpc)",
    caesarShiftTitle: "Shift amount",
    btnDecode: "Decode",

    asciiTitle: "ASCII chr() Array to Text",
    asciiBadge: "chr(n)",
    asciiPlaceholder: "e.g. 74, 97, 109, 101, 115",
    btnConvert: "Convert",

    b64HexTitle: "Base64 & Hex Byte Decoder",
    b64HexBadge: "fromhex / b64",
    b64HexPlaceholder: "Paste Base64 or Hex...",

    reverseTitle: "String Reverser [::-1]",
    reverseBadge: "slice",
    reversePlaceholder: "Text to reverse...",
    btnReverse: "Reverse",

    resultAwaiting: "Result: (awaiting input)",
    resultPrefix: "Result: ",
    resultNone: "(none)",
    resultDecodeError: "Could not decode (check Base64 or Hex format)",

    // Case briefing modal
    deptTitle: "DEPARTMENT OF CYBER ENFORCEMENT",
    incidentDateLabel: "INCIDENT DATE:",
    victimLabel: "VICTIM / ENTITY:",
    lossLabel: "FINANCIAL LOSS:",
    breachedSystemLabel: "BREACHED SYSTEM:",
    focusLabel: "FORENSIC CODE FOCUS:",
    synopsisTitle: "CASE SYNOPSIS:",
    objectiveTitle: "DETECTIVE OBJECTIVE:",
    objectiveBody: "Analyze the intercepted Python script in your workspace. Correlate variable values, comments, and cipher parameters with the suspect profiles to identify the insider.",
    btnEnterInvestigation: "ENTER INVESTIGATION ROOM",

    // Suspect detail modal
    dossierTitle: "PERSON OF INTEREST DOSSIER",
    clearanceLabel: "Clearance:",
    bioTitle: "BACKGROUND & STATEMENTS:",

    // Lock answer modal
    lockTitle: "FILE OFFICIAL INDICTMENT",
    lockSubtitle: "Select the individual whose digital signature matches the malicious Python evidence.",
    lockWarningTitle: "ATTENTION DETECTIVE:",
    lockWarningBody: "You have only ONE chance to name the culprit. An incorrect indictment will trigger an immediate administrative review and reset this investigation!",
    btnCancelLock: "Cancel & Review Code",
    btnConfirmLock: "CONFIRM ACCUSATION & ARREST",

    // Verdict modal
    stampSolved: "CASE SOLVED",
    headlineSolved: "CRIMINAL APPREHENDED!",
    statusGuilty: "██ GUILTY AS CHARGED ██",
    forensicReportTitle: "Forensic Code Breakdown:",
    eduSummaryTitle: "What Python Logic Taught Us:",
    btnNextCase: "PROCEED TO NEXT CASE &rarr;",
    btnViewVictory: "VIEW FINAL COMMENDATION &rarr;",

    stampCold: "CASE COLD",
    headlineCold: "WRONG SUSPECT ACCUSED!",
    leadColdPrefix: "You arrested",
    leadColdSuffix: "but their alibi checked out completely. The real perpetrator destroyed their logs and slipped away!",
    warningCold: "Warning: In forensic cyber investigations, circumstantial evidence is not enough. Re-examine the Python code line by line, trace the variable transformations, strings, and comments carefully!",
    btnRetryCase: "RE-OPEN CASE EVIDENCE (RETRY)",

    // Victory modal
    victoryRibbon: "PYLICE DISTINGUISHED COMMENDATION",
    victoryTitle: "OUTSTANDING MASTER DETECTIVE",
    victoryLead: "You have cracked all 5 high-profile cybercrime cases and decoded every layer of malicious Python logic.",
    archiveTitle: "SOLVED CASE ARCHIVE:",
    victoryQuote: "“Every line of code tells a story. You just proved you can read between the lines.”",
    btnPlayAgain: "REPLAY INVESTIGATIONS"
  }
};

class I18nManager {
  constructor() {
    this.currentLang = typeof localStorage !== "undefined" ? (localStorage.getItem(I18N_STORAGE_KEY) || "id") : "id";
  }

  getLang() {
    return this.currentLang;
  }

  setLang(lang) {
    if (lang === "id" || lang === "en") {
      this.currentLang = lang;
      if (typeof localStorage !== "undefined") {
        localStorage.setItem(I18N_STORAGE_KEY, lang);
      }
    }
  }

  t(key) {
    const table = UI_TEXT[this.currentLang] || UI_TEXT.id;
    return table[key] || UI_TEXT.en[key] || key;
  }
}

export const i18n = new I18nManager();
