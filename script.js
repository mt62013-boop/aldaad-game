const DEFAULT_QUESTIONS_PER_GAME = 12;
const MAX_QUESTIONS_PER_GAME = 999;
const TIME_PER_QUESTION = 50;
const MAX_POINTS_PER_QUESTION = 50;
const SCREEN_TRANSITION_MS = 220;
const SPLASH_DELAY_MS = 650;
const STORAGE_KEY = "arabic-grade12-islam-positive-leaderboard";
const QUESTIONS_DATA_URL = "./questions-data.json";

let DEFAULT_QUESTION_BANK = [];
let defaultQuestionsPromise = null;

async function ensureDefaultQuestionBankLoaded() {
  if (Array.isArray(DEFAULT_QUESTION_BANK) && DEFAULT_QUESTION_BANK.length) {
    return DEFAULT_QUESTION_BANK;
  }

  if (defaultQuestionsPromise) {
    return defaultQuestionsPromise;
  }

  defaultQuestionsPromise = fetch(QUESTIONS_DATA_URL, { cache: "force-cache" })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load questions data: ${response.status}`);
      }

      return response.json();
    })
    .then((questions) => {
      DEFAULT_QUESTION_BANK = Array.isArray(questions) ? questions : [];
      return DEFAULT_QUESTION_BANK;
    })
    .catch((error) => {
      console.error("Unable to load default questions:", error);
      DEFAULT_QUESTION_BANK = [];
      return DEFAULT_QUESTION_BANK;
    })
    .finally(() => {
      defaultQuestionsPromise = null;
    });

  return defaultQuestionsPromise;
}

let questionBank = [];
let pendingTeacherLogoData = "";

const screens = {
  splash: document.getElementById("splash-screen"),
  auth: document.getElementById("auth-screen"),
  start: document.getElementById("start-screen"),
  game: document.getElementById("game-screen"),
  result: document.getElementById("result-screen")
};

const playerNameInput = document.getElementById("player-name");
const authTitle = document.getElementById("auth-title");
const authDescription = document.getElementById("auth-description");
const authRegisterPanel = document.getElementById("auth-register-panel");
const authLoginPanel = document.getElementById("auth-login-panel");
const authSchoolNameInput = document.getElementById("auth-school-name");
const authTeacherNameInput = document.getElementById("auth-teacher-name");
const authLogoUploadInput = document.getElementById("auth-logo-upload");
const authRegisterUsernameInput = document.getElementById("auth-register-username");
const authRegisterPasswordInput = document.getElementById("auth-register-password");
const authRecoveryMethodSelect = document.getElementById("auth-recovery-method");
const authRecoveryCountryWrap = document.getElementById("auth-recovery-country-wrap");
const authRecoveryCountrySelect = document.getElementById("auth-recovery-country");
const authRecoveryValueInput = document.getElementById("auth-recovery-value");
const authLoginUsernameInput = document.getElementById("auth-login-username");
const authLoginPasswordInput = document.getElementById("auth-login-password");
const authRegisterBtn = document.getElementById("auth-register-btn");
const authLoginBtn = document.getElementById("auth-login-btn");
const authForgotBtn = document.getElementById("auth-forgot-btn");
const authRecoveryPanel = document.getElementById("auth-recovery-panel");
const recoveryMethodSelect = document.getElementById("recovery-method");
const recoveryCountryWrap = document.getElementById("recovery-country-wrap");
const recoveryCountrySelect = document.getElementById("recovery-country");
const recoveryValueInput = document.getElementById("recovery-value");
const recoveryNewPasswordInput = document.getElementById("recovery-new-password");
const recoveryConfirmPasswordInput = document.getElementById("recovery-confirm-password");
const recoverAccountBtn = document.getElementById("recover-account-btn");
const recoveryStatus = document.getElementById("recovery-status");
const authStatus = document.getElementById("auth-status");
const togglePasswordPanelBtn = document.getElementById("toggle-password-panel-btn");
const teacherLogoutBtn = document.getElementById("teacher-logout-btn");
const passwordPanel = document.getElementById("password-panel");
const currentPasswordInput = document.getElementById("current-password");
const newPasswordInput = document.getElementById("new-password");
const confirmPasswordInput = document.getElementById("confirm-password");
const savePasswordBtn = document.getElementById("save-password-btn");
const passwordChangeStatus = document.getElementById("password-change-status");
const calmModeToggle = document.getElementById("calm-mode-toggle");
const calmModeNote = document.getElementById("calm-mode-note");
const schoolNameInput = document.getElementById("school-name");
const teacherNameInput = document.getElementById("teacher-name");
const logoUploadInput = document.getElementById("logo-upload");
const questionEditorList = document.getElementById("question-editor-list");
const saveQuestionsBtn = document.getElementById("save-questions-btn");
const resetQuestionsBtn = document.getElementById("reset-questions-btn");
const addQuestionBtn = document.getElementById("add-question-btn");
const questionEditorStatus = document.getElementById("question-editor-status");
const modeButtons = Array.from(document.querySelectorAll(".mode-btn"));
const competitionModeButtons = Array.from(document.querySelectorAll(".competition-mode-btn"));
const teamCountButtons = Array.from(document.querySelectorAll(".team-count-btn"));
const teamNameInputs = Array.from(document.querySelectorAll(".team-name-input"));
const teamSetupSection = document.getElementById("team-setup-section");
const studentSetupSection = document.getElementById("student-setup-section");
const studentCountSelect = document.getElementById("student-count");
const studentNamesInput = document.getElementById("student-names");
const fillStudentsBtn = document.getElementById("fill-students-btn");
const lessonSelect = document.getElementById("lesson-filter");
const subLessonGroup = document.getElementById("sub-lesson-group");
const subLessonSelect = document.getElementById("sub-lesson-filter");
const subLessonFilterInfo = document.getElementById("sub-lesson-filter-info");
const lessonFilterInfo = document.getElementById("lesson-filter-info");
const questionCountInput = document.getElementById("question-count");
const questionCountInfo = document.getElementById("question-count-info");
const questionFormatRatioSelect = document.getElementById("question-format-ratio");
const questionFormatRatioInfo = document.getElementById("question-format-ratio-info");
const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const endGameBtn = document.getElementById("end-game-btn");
const cancelEndBtn = document.getElementById("cancel-end-btn");
const confirmEndBtn = document.getElementById("confirm-end-btn");
const confirmModal = document.getElementById("confirm-modal");
const restartBtn = document.getElementById("restart-btn");
const announceWinnerBtn = document.getElementById("announce-winner-btn");
const introMusicBtn = document.getElementById("intro-music-btn");
const resetBrandingBtn = document.getElementById("reset-branding-btn");
const fullscreenBtn = document.getElementById("fullscreen-btn");
const installAppBtn = document.getElementById("install-app-btn");
const leaderboardList = document.getElementById("leaderboard-list");

let deferredInstallPrompt = null;

const playerLabel = document.getElementById("player-label");
const lessonTitleDisplay = document.getElementById("lesson-title-display");
const lessonSubtitleDisplay = document.getElementById("lesson-subtitle-display");
const schoolNameDisplay = document.getElementById("school-name-display");
const teacherNameDisplay = document.getElementById("teacher-name-display");
const schoolLogoImage = document.querySelector(".school-logo");
const progressLabel = document.getElementById("progress-label");
const scoreLabel = document.getElementById("score-label");
const timerLabel = document.getElementById("timer-label");
const categoryTag = document.getElementById("category-tag");
const progressBar = document.getElementById("progress-bar");
const questionText = document.getElementById("question-text");
const questionPointsLive = document.getElementById("question-points-live");
const questionPointsLabel = document.getElementById("question-points-label");
const answersContainer = document.getElementById("answers-container");
const feedbackBox = document.getElementById("feedback-box");
const assistBtn = document.getElementById("assist-btn");
const readBtn = document.getElementById("read-btn");
const stopAudioBtn = document.getElementById("stop-audio-btn");
const assistantText = document.getElementById("assistant-text");
const assistantCard = document.querySelector(".assistant-card");
const copySessionLinkBtn = document.getElementById("copy-session-link-btn");
const sessionLinkStatus = document.getElementById("session-link-status");
const teamsBoard = document.getElementById("teams-board");
const scoreCaption = document.getElementById("score-caption");
const targetSelect = document.getElementById("target-select");
const fastestNameInput = document.getElementById("fastest-name-input");
const participantsList = document.getElementById("participants-list");
const buzzInBtn = document.getElementById("buzz-in-btn");
const applyTargetBtn = document.getElementById("apply-target-btn");
const randomTargetBtn = document.getElementById("random-target-btn");
const buzzLockBanner = document.getElementById("buzz-lock-banner");
const directorPanel = document.querySelector(".director-panel");
const directorNote = document.getElementById("director-note");
const connectionBanner = document.getElementById("connection-banner");
const installSplash = document.getElementById("install-splash");
const installSplashMessage = document.getElementById("install-splash-message");
const sessionUrlParams = new URLSearchParams(window.location.search);
const SESSION_ROLE = sessionUrlParams.get("role") === "contestant" ? "contestant" : "teacher";
const IS_CONTESTANT_VIEW = SESSION_ROLE === "contestant";
const SHARED_SESSION_TITLE = (sessionUrlParams.get("className") || "").trim();

const resultTitle = document.getElementById("result-title");
const resultSummary = document.getElementById("result-summary");
const finalScore = document.getElementById("final-score");
const finalCorrect = document.getElementById("final-correct");
const finalPercent = document.getElementById("final-percent");
const recommendationText = document.getElementById("recommendation-text");
const postgameReadBtn = document.getElementById("postgame-read-btn");
const finalRanking = document.getElementById("final-ranking");
const winnerCertificate = document.getElementById("winner-certificate");
const certificateSchool = document.getElementById("certificate-school");
const certificateTeam = document.getElementById("certificate-team");
const certificateScore = document.getElementById("certificate-score");

const TEAM_LABELS = ["الفريق الأول", "الفريق الثاني", "الفريق الثالث", "الفريق الرابع"];
const OPTION_LABELS = ["الأول", "الثاني", "الثالث", "الرابع"];
const ARAB_COUNTRIES = [
  { name: "الكويت", code: "+965" },
  { name: "السعودية", code: "+966" },
  { name: "الإمارات", code: "+971" },
  { name: "قطر", code: "+974" },
  { name: "البحرين", code: "+973" },
  { name: "عُمان", code: "+968" },
  { name: "العراق", code: "+964" },
  { name: "الأردن", code: "+962" },
  { name: "فلسطين", code: "+970" },
  { name: "لبنان", code: "+961" },
  { name: "سوريا", code: "+963" },
  { name: "اليمن", code: "+967" },
  { name: "مصر", code: "+20" },
  { name: "ليبيا", code: "+218" },
  { name: "تونس", code: "+216" },
  { name: "الجزائر", code: "+213" },
  { name: "المغرب", code: "+212" },
  { name: "موريتانيا", code: "+222" },
  { name: "السودان", code: "+249" },
  { name: "الصومال", code: "+252" },
  { name: "جيبوتي", code: "+253" },
  { name: "جزر القمر", code: "+269" }
];
const DEFAULT_STUDENT_COUNT = 1;
const MAX_STUDENTS = 30;
const QUESTION_CATEGORIES = ["الفهم والاستيعاب", "فنون البلاغة", "السلامة اللغوية", "الثروة اللغوية"];
const LESSON_OPTIONS = [
  { value: "all", label: "جميع الدروس" },
  { value: "lesson1", label: "الدرس الأول — آيات من سورة الزمر" },
  { value: "lesson2", label: "الدرس الثاني — جابر عثرات الكرام" },
  { value: "lesson3", label: "الدرس الثالث — الوحي الخالد" },
  { value: "lesson4", label: "الدرس الرابع — الإسلام يحارب السلبية" },
  { value: "lesson5", label: "الدرس الخامس — الغبطة فكرة" }
];
const LESSON_LABELS = Object.fromEntries(LESSON_OPTIONS.map((option) => [option.value, option.label]));
const DEFAULT_LESSON_FILTER = "all";
const DEFAULT_SUB_LESSON_FILTER = "all";
const SUB_LESSON_OPTIONS = {
  rhetoric: [
    { value: "all", label: "جميع فروع البلاغة" },
    { value: "rhetoric_tawriya", label: "البلاغة: التورية" },
    { value: "rhetoric_amr", label: "البلاغة: الأغراض البلاغية للأمر" },
    { value: "rhetoric_nahi", label: "البلاغة: الأغراض البلاغية للنهي" },
    { value: "rhetoric_istifham", label: "البلاغة: الأغراض البلاغية للاستفهام" },
    { value: "rhetoric_nida", label: "البلاغة: الأغراض البلاغية للنداء" }
  ],
  grammar: [
    { value: "all", label: "جميع فروع القواعد" },
    { value: "grammar_has_mahal", label: "القواعد: الجمل التي لها محل من الإعراب" },
    { value: "grammar_no_mahal", label: "القواعد: الجمل التي ليس لها محل من الإعراب" },
    { value: "grammar_madh_dhamm", label: "القواعد: المدح والذم" },
    { value: "grammar_nasab", label: "القواعد: النسب" },
    { value: "grammar_tasghir", label: "القواعد: التصغير" },
    { value: "grammar_istifham", label: "القواعد: الاستفهام" }
  ]
};
const SUB_LESSON_MATCHERS = {
  rhetoric_tawriya: /(التورية|موطن التورية|المعنى القريب|المعنى البعيد)/,
  rhetoric_amr: /(أمر\s+غرضه|فعل\s+أمر|الغرض\s+البلاغي.*الأمر|أسلوب\s+الأمر|\sالأمر\s|^الأمر\s|\sالأمر$)/,
  rhetoric_nahi: /(نهي\s+غرضه|الغرض\s+البلاغي.*النهي|أسلوب\s+النهي|للنهي|بالنهي|\sالنهي\s|^النهي\s|\sالنهي$)/,
  rhetoric_istifham: /(استفهام\s+غرضه|الغرض\s+البلاغي\s+من\s+الاستفهام|الغرض\s+البلاغي.*الاستفهام|\sالاستفهام\s|^الاستفهام\s|\sالاستفهام$)/,
  rhetoric_nida: /(نداء\s+غرضه|الغرض\s+البلاغي\s+من\s+النداء|الغرض\s+البلاغي.*النداء|أسلوب\s+النداء|\sالنداء\s|^النداء\s|\sالنداء$|يا\s+عبادي|أيها)/,
  grammar_has_mahal: /(لها\s+محل|في\s+محل|محل\s+من\s+الإعراب|موقع\s+الجملة|الجمل\s+التي\s+لها\s+محل)/,
  grammar_no_mahal: /(لا\s+محل\s+لها|ليس\s+لها\s+محل|الجمل\s+التي\s+ليس\s+لها\s+محل|صلة\s+الاسم\s+الموصول|اعتراضية|ابتدائية|تفسيرية)/,
  grammar_madh_dhamm: /(المدح|الذم|نعم\s+الرجل|\sبئس\s|^بئس\s|\sبئس$|حبذا|المخصوص)/,
  grammar_nasab: /(النسب|الاسم\s+المنسوب|كويتي|مصري|إسلامي|عربي|وردي|شرطي)/,
  grammar_tasghir: /(تصغير|التصغير|فُعَيْل|فُعَيْعِل|فُعَيْعِيل|مُصَيْبِيح|مُسَيْطِرة|أُقَيْلام|جُبَيْل)/,
  grammar_istifham: /(الاستفهام\s+التصديقي|الاستفهام\s+التصوري|الاستفهام\s+التعييني|الاستفهام\s+المنفي|استفهام\s+تصديقي|استفهام\s+تصوّري|استفهام\s+تصوري|هل\s+حضر\s+الطالب|أم\s+التعيينية|\sبلى\s|^بلى\s|\sبلى$)/
};
const ALL_SUB_LESSON_VALUES = new Set(
  Object.values(SUB_LESSON_OPTIONS)
    .flat()
    .map((option) => option.value)
);
const DEFAULT_LESSON_TITLE = "الضاد";
const DEFAULT_LESSON_SUBTITLE = "تعلم بمرح";
const DEFAULT_SCHOOL_NAME = "مدرسة أكاديمية الموهبة المشتركة";
const DEFAULT_TEACHER_NAME = "معلم اللغة العربية";
const DEFAULT_LOGO_SRC = "school-logo.png";
const BRANDING_STORAGE_KEY = "arabic-game-branding";
const QUESTIONS_STORAGE_KEY = "arabic-game-custom-questions";
const ROUND_SETTINGS_STORAGE_KEY = "arabic-game-round-settings";
const TEACHER_AUTH_STORAGE_KEY = "arabic-game-teacher-auth";
const TEACHER_SESSION_STORAGE_KEY = "arabic-game-teacher-session";
const speechSupported = "speechSynthesis" in window && typeof SpeechSynthesisUtterance !== "undefined";
const audioContext = typeof window !== "undefined" && (window.AudioContext || window.webkitAudioContext)
  ? new (window.AudioContext || window.webkitAudioContext)()
  : null;

const gameState = {
  mode: "mixed",
  playerName: "حصة اللغة العربية",
  competitionMode: "teams",
  teamCount: 2,
  lessonFilter: DEFAULT_LESSON_FILTER,
  subLessonFilter: DEFAULT_SUB_LESSON_FILTER,
  questionLimit: DEFAULT_QUESTIONS_PER_GAME,
  trueFalseRatio: 0.3,
  calmMode: false,
  teams: [],
  currentTeamIndex: -1,
  selectedQuestions: [],
  currentIndex: 0,
  roundParticipantIndex: 0,
  score: 0,
  correctAnswers: 0,
  timer: TIME_PER_QUESTION,
  timerId: null,
  answered: false,
  buzzLocked: false,
  assistUsed: false,
  lastNarration: "",
  winnerAnnouncement: "",
  introMusicPlayed: false,
  introSequenceTimeoutId: null,
  openingSequenceId: null,
  screenTransitionId: null,
  categoryStats: {}
};

function saveRoundSettings() {
  localStorage.setItem(
    ROUND_SETTINGS_STORAGE_KEY,
    JSON.stringify({
      mode: gameState.mode,
      competitionMode: gameState.competitionMode,
      lessonFilter: gameState.lessonFilter,
      subLessonFilter: gameState.subLessonFilter,
      questionLimit: gameState.questionLimit,
      trueFalseRatio: gameState.trueFalseRatio,
      calmMode: !!gameState.calmMode
    })
  );
}

function loadSavedRoundSettings() {
  const saved = JSON.parse(localStorage.getItem(ROUND_SETTINGS_STORAGE_KEY) || "{}");

  if (["mixed", "comprehension", "rhetoric", "grammar", "lexicon"].includes(saved.mode)) {
    gameState.mode = saved.mode;
  }

  if (["teams", "students"].includes(saved.competitionMode)) {
    gameState.competitionMode = saved.competitionMode;
  }

  if (LESSON_LABELS[saved.lessonFilter]) {
    gameState.lessonFilter = saved.lessonFilter;
  }

  if (ALL_SUB_LESSON_VALUES.has(saved.subLessonFilter)) {
    gameState.subLessonFilter = saved.subLessonFilter;
  }

  if (Number.isFinite(Number(saved.questionLimit))) {
    gameState.questionLimit = Math.max(1, Number(saved.questionLimit));
  }

  if (Number.isFinite(Number(saved.trueFalseRatio))) {
    gameState.trueFalseRatio = Math.min(0.5, Math.max(0.2, Number(saved.trueFalseRatio)));
  }

  if (typeof saved.calmMode === "boolean") {
    gameState.calmMode = saved.calmMode;
  }
}

function getModeLabel(mode = gameState.mode) {
  return ({
    mixed: "مجالات متنوعة",
    comprehension: "الفهم والاستيعاب",
    rhetoric: "فنون البلاغة",
    grammar: "السلامة اللغوية",
    lexicon: "الثروة اللغوية"
  })[mode] || "مجالات متنوعة";
}

function applySessionConfigFromUrl() {
  const sharedSchool = (sessionUrlParams.get("school") || "").trim();
  const sharedTeacher = (sessionUrlParams.get("teacher") || "").trim();
  const sharedLogo = (sessionUrlParams.get("logo") || "").trim();
  const mode = (sessionUrlParams.get("mode") || "").trim();
  const competition = (sessionUrlParams.get("competition") || "").trim();
  const lesson = (sessionUrlParams.get("lesson") || "").trim();
  const subLesson = (sessionUrlParams.get("subLesson") || "").trim();
  const count = Number(sessionUrlParams.get("count"));
  const ratio = Number(sessionUrlParams.get("ratio"));
  const calm = (sessionUrlParams.get("calm") || "").trim();

  if (sharedSchool) {
    schoolNameInput.value = sharedSchool;
  }

  if (sharedTeacher) {
    teacherNameInput.value = sharedTeacher;
  }

  if (!IS_CONTESTANT_VIEW && SHARED_SESSION_TITLE) {
    playerNameInput.value = SHARED_SESSION_TITLE;
  }

  if (sharedLogo) {
    schoolLogoImage.src = sharedLogo;
  }

  if (["mixed", "comprehension", "rhetoric", "grammar", "lexicon"].includes(mode)) {
    gameState.mode = mode;
  }

  if (["teams", "students"].includes(competition)) {
    gameState.competitionMode = competition;
  }

  if (LESSON_LABELS[lesson]) {
    gameState.lessonFilter = lesson;
  }

  if (ALL_SUB_LESSON_VALUES.has(subLesson)) {
    gameState.subLessonFilter = subLesson;
  }

  if (Number.isFinite(count)) {
    gameState.questionLimit = Math.min(MAX_QUESTIONS_PER_GAME, Math.max(1, count));
  }

  if (Number.isFinite(ratio)) {
    gameState.trueFalseRatio = Math.min(0.5, Math.max(0.2, ratio / 100));
  }

  if (["1", "true", "yes"].includes(calm.toLowerCase())) {
    gameState.calmMode = true;
  } else if (["0", "false", "no"].includes(calm.toLowerCase())) {
    gameState.calmMode = false;
  }
}

function applyRolePermissions() {
  document.body.classList.toggle("contestant-view", IS_CONTESTANT_VIEW);

  if (!IS_CONTESTANT_VIEW) {
    return;
  }

  const playerNameLabel = document.querySelector('label[for="player-name"]');
  const startScreenHeading = document.querySelector("#start-screen h2");
  const startScreenNote = document.querySelector(".start-screen-note");
  const teacherOnlySections = [
    document.querySelector(".session-share-box"),
    ...document.querySelectorAll(".start-optional"),
    document.querySelector(".competition-mode-picker")?.closest(".field-group"),
    teamSetupSection,
    studentSetupSection,
    document.querySelector(".mode-picker")?.closest(".field-group"),
    subLessonSelect?.closest(".field-group"),
    lessonSelect?.closest(".field-group"),
    questionCountInput?.closest(".field-group"),
    questionFormatRatioSelect?.closest(".field-group"),
    directorPanel
  ];

  teacherOnlySections.filter(Boolean).forEach((section) => {
    section.classList.add("hidden");
    section.setAttribute("aria-hidden", "true");
    section.querySelectorAll("input, select, textarea, button").forEach((control) => {
      control.disabled = true;
    });
  });

  if (endGameBtn) {
    endGameBtn.classList.add("hidden");
  }

  if (startScreenHeading) {
    startScreenHeading.textContent = "شاشة المتسابق";
  }

  if (playerNameLabel) {
    playerNameLabel.textContent = gameState.competitionMode === "teams" ? "اسم الفريق أو المتسابق" : "اسم الطالب المتسابق";
  }

  if (playerNameInput) {
    playerNameInput.value = "";
    playerNameInput.placeholder = gameState.competitionMode === "teams"
      ? "اكتب اسم الفريق أو المشارك"
      : "اكتب اسمك هنا";
  }

  if (startScreenNote) {
    const sessionLabel = SHARED_SESSION_TITLE ? `الجلسة: ${SHARED_SESSION_TITLE}. ` : "";
    startScreenNote.textContent = `${sessionLabel}هذه شاشة مستقلة للمتسابق فقط. صلاحيتك تقتصر على كتابة الاسم ثم الإجابة عن الأسئلة ومشاهدة النتيجة النهائية، بينما يبقى التحكم الكامل للمعلم في إعدادات المسابقة.`;
  }

  if (sessionLinkStatus) {
    sessionLinkStatus.textContent = `تم تجهيز هذه الشاشة كواجهة متسابق، والإعدادات الحالية مضبوطة من قبل المعلم: ${getModeLabel(gameState.mode)} — ${LESSON_LABELS[gameState.lessonFilter] || LESSON_LABELS[DEFAULT_LESSON_FILTER]}.`;
  }

  if (startBtn) {
    startBtn.textContent = "ابدأ المنافسة";
  }

  syncContestantStartAvailability();
}

function buildSessionLink() {
  const sessionLink = new URL(window.location.href);
  const savedBranding = JSON.parse(localStorage.getItem(BRANDING_STORAGE_KEY) || "{}");

  sessionLink.search = "";
  sessionLink.hash = "";
  sessionLink.searchParams.set("role", "contestant");
  sessionLink.searchParams.set("className", playerNameInput.value.trim() || "حصة اللغة العربية");
  sessionLink.searchParams.set("school", schoolNameInput.value.trim() || DEFAULT_SCHOOL_NAME);
  sessionLink.searchParams.set("teacher", teacherNameInput.value.trim() || DEFAULT_TEACHER_NAME);
  sessionLink.searchParams.set("mode", gameState.mode);
  sessionLink.searchParams.set("competition", gameState.competitionMode);
  sessionLink.searchParams.set("lesson", gameState.lessonFilter);
  sessionLink.searchParams.set("subLesson", gameState.subLessonFilter || "all");
  sessionLink.searchParams.set("count", String(gameState.questionLimit || DEFAULT_QUESTIONS_PER_GAME));
  sessionLink.searchParams.set("ratio", String(Math.round((gameState.trueFalseRatio || 0.3) * 100)));
  sessionLink.searchParams.set("calm", gameState.calmMode ? "1" : "0");

  if (typeof savedBranding.customLogo === "string" && savedBranding.customLogo && savedBranding.customLogo.length < 1800) {
    sessionLink.searchParams.set("logo", savedBranding.customLogo);
  }

  return sessionLink.toString();
}

function updateModeSelection(modeValue) {
  const normalizedMode = ["mixed", "comprehension", "rhetoric", "grammar", "lexicon"].includes(modeValue)
    ? modeValue
    : "mixed";

  gameState.mode = normalizedMode;

  modeButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.mode === normalizedMode);
  });

  refreshSubLessonFilterOptions();
  updateQuestionCountSetting(Number(questionCountInput?.value || gameState.questionLimit));
  saveRoundSettings();
}

modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    updateModeSelection(button.dataset.mode);
  });
});

competitionModeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    updateCompetitionMode(button.dataset.competition);
  });
});

teamCountButtons.forEach((button) => {
  button.addEventListener("click", () => {
    updateTeamCount(Number(button.dataset.count));
  });
});

studentCountSelect?.addEventListener("change", () => {
  populateStudentNames(Number(studentCountSelect.value));
});

fillStudentsBtn?.addEventListener("click", () => {
  populateStudentNames(Number(studentCountSelect?.value || DEFAULT_STUDENT_COUNT), true);
});

lessonSelect?.addEventListener("change", () => {
  updateLessonSelection(lessonSelect.value);
});

subLessonSelect?.addEventListener("change", () => {
  updateSubLessonSelection(subLessonSelect.value);
});

questionCountInput?.addEventListener("input", () => {
  updateQuestionCountSetting(Number(questionCountInput.value));
  saveRoundSettings();
});

questionFormatRatioSelect?.addEventListener("change", () => {
  updateQuestionFormatRatioSetting(Number(questionFormatRatioSelect.value));
  saveRoundSettings();
});

playerNameInput?.addEventListener("input", syncContestantStartAvailability);
authRegisterBtn?.addEventListener("click", registerTeacherAccount);
authLoginBtn?.addEventListener("click", loginTeacherAccount);
authForgotBtn?.addEventListener("click", toggleAuthRecoveryPanel);
recoverAccountBtn?.addEventListener("click", recoverTeacherAccount);
authRecoveryMethodSelect?.addEventListener("change", () => updateRecoveryInputState(authRecoveryMethodSelect, authRecoveryCountryWrap, authRecoveryCountrySelect, authRecoveryValueInput));
recoveryMethodSelect?.addEventListener("change", () => updateRecoveryInputState(recoveryMethodSelect, recoveryCountryWrap, recoveryCountrySelect, recoveryValueInput));
authLogoUploadInput?.addEventListener("change", handleTeacherLogoUpload);
togglePasswordPanelBtn?.addEventListener("click", togglePasswordPanel);
teacherLogoutBtn?.addEventListener("click", logoutTeacher);
savePasswordBtn?.addEventListener("click", changeTeacherPassword);
calmModeToggle?.addEventListener("change", () => applyCalmMode(calmModeToggle.checked));
schoolNameInput.addEventListener("input", updateBranding);
teacherNameInput.addEventListener("input", updateBranding);
logoUploadInput.addEventListener("change", handleLogoUpload);

startBtn.addEventListener("click", startGame);
nextBtn.addEventListener("click", goToNextQuestion);
endGameBtn.addEventListener("click", openEndGameModal);
cancelEndBtn.addEventListener("click", closeEndGameModal);
confirmEndBtn.addEventListener("click", () => {
  closeEndGameModal();
  finishGame();
});
confirmModal.addEventListener("click", (event) => {
  if (event.target === confirmModal) {
    closeEndGameModal();
  }
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !confirmModal.classList.contains("hidden")) {
    closeEndGameModal();
  }
});
restartBtn.addEventListener("click", () => showScreen("start"));
announceWinnerBtn.addEventListener("click", playWinnerAnnouncement);
introMusicBtn?.addEventListener("click", playIntroMusic);
resetBrandingBtn.addEventListener("click", resetBrandingToDefaults);
saveQuestionsBtn.addEventListener("click", saveQuestionsFromEditor);
resetQuestionsBtn.addEventListener("click", resetQuestionsToDefaults);
addQuestionBtn.addEventListener("click", addNewQuestion);
assistBtn.addEventListener("click", provideSmartHint);
readBtn.addEventListener("click", readCurrentContent);
stopAudioBtn.addEventListener("click", stopSpeech);
postgameReadBtn?.addEventListener("click", readPostgameExplanation);
copySessionLinkBtn?.addEventListener("click", copySessionLink);
buzzInBtn?.addEventListener("click", () => {
  applyTargetSelection(undefined, { name: fastestNameInput?.value || "", buzz: true });
});
applyTargetBtn?.addEventListener("click", () => {
  applyTargetSelection(undefined, { name: fastestNameInput?.value || "", buzz: true });
});
randomTargetBtn?.addEventListener("click", applyRandomTarget);
fastestNameInput?.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    applyTargetSelection(undefined, { name: fastestNameInput.value, buzz: true });
  }
});
fullscreenBtn.addEventListener("click", async () => {
  if (!document.fullscreenElement) {
    await document.documentElement.requestFullscreen();
  } else {
    await document.exitFullscreen();
  }
});

installAppBtn?.addEventListener("click", async () => {
  if (!deferredInstallPrompt) {
    assistantText.textContent = window.location.protocol === "file:"
      ? "لتثبيت التطبيق، افتح اللعبة من رابط ويب مثل GitHub Pages ثم اختر تثبيت التطبيق."
      : "خيار التثبيت سيظهر عندما يدعمه المتصفح ويستوفي شروط PWA.";
    return;
  }

  deferredInstallPrompt.prompt();
  const choiceResult = await deferredInstallPrompt.userChoice;

  if (choiceResult.outcome === "accepted") {
    assistantText.textContent = "رائع! يتم الآن تجهيز نسخة التطبيق على الهاتف.";
    showInstallSplash("جار تجهيز نسخة التطبيق المثبتة...");
  } else {
    assistantText.textContent = "يمكنك تثبيت التطبيق لاحقًا من المتصفح في أي وقت.";
  }

  deferredInstallPrompt = null;
  installAppBtn.classList.add("hidden");
});

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  deferredInstallPrompt = event;
  installAppBtn?.classList.remove("hidden");
});

window.addEventListener("appinstalled", () => {
  deferredInstallPrompt = null;
  installAppBtn?.classList.add("hidden");
  assistantText.textContent = "تم تثبيت لعبة الضاد كتطبيق على الجهاز بنجاح.";
  showInstallSplash("تم تثبيت التطبيق بنجاح. استمتع بالتجربة!");
});

function showInstallSplash(message = "جار تجهيز التجربة التفاعلية للعمل بسرعة حتى بدون إنترنت.") {
  if (!installSplash || !installSplashMessage) return;

  installSplashMessage.textContent = message;
  installSplash.classList.remove("hidden", "fade-out");

  window.setTimeout(() => {
    installSplash.classList.add("fade-out");
  }, 1200);

  window.setTimeout(() => {
    installSplash.classList.add("hidden");
    installSplash.classList.remove("fade-out");
  }, 1700);
}

function showScreen(name) {
  const nextScreen = screens[name];
  if (!nextScreen) return;

  if (gameState.screenTransitionId) {
    window.clearTimeout(gameState.screenTransitionId);
    gameState.screenTransitionId = null;
  }

  const revealNextScreen = () => {
    nextScreen.classList.remove("hidden", "screen-exit", "screen-exit-active");
    nextScreen.classList.add("screen-enter");

    window.requestAnimationFrame(() => {
      nextScreen.classList.add("screen-enter-active");
    });

    window.setTimeout(() => {
      nextScreen.classList.remove("screen-enter", "screen-enter-active");
    }, SCREEN_TRANSITION_MS);
  };

  const currentScreen = Object.values(screens).find(
    (screen) => !screen.classList.contains("hidden") && screen !== nextScreen
  );

  if (!currentScreen) {
    if (nextScreen.classList.contains("hidden")) {
      revealNextScreen();
    }
    return;
  }

  currentScreen.classList.remove("screen-enter", "screen-enter-active");
  currentScreen.classList.add("screen-exit");

  window.requestAnimationFrame(() => {
    currentScreen.classList.add("screen-exit-active");
  });

  gameState.screenTransitionId = window.setTimeout(() => {
    currentScreen.classList.add("hidden");
    currentScreen.classList.remove("screen-exit", "screen-exit-active");
    revealNextScreen();
    gameState.screenTransitionId = null;
  }, SCREEN_TRANSITION_MS);
}

function beginOpeningSequence() {
  showScreen("splash");
  window.clearTimeout(gameState.openingSequenceId);
  gameState.openingSequenceId = window.setTimeout(() => {
    const nextScreenName = getInitialScreenName();
    showScreen(nextScreenName);

    if (nextScreenName === "start") {
      scheduleAutoIntroMusic();
    }
  }, SPLASH_DELAY_MS);
}

function loadSavedBranding() {
  const savedBranding = JSON.parse(localStorage.getItem(BRANDING_STORAGE_KEY) || "{}");
  const logoSrc = savedBranding.customLogo || DEFAULT_LOGO_SRC;

  schoolNameInput.value = savedBranding.schoolName || DEFAULT_SCHOOL_NAME;
  teacherNameInput.value = savedBranding.teacherName || DEFAULT_TEACHER_NAME;
  schoolLogoImage.src = logoSrc;
  pendingTeacherLogoData = savedBranding.customLogo || "";

  if (authSchoolNameInput) {
    authSchoolNameInput.value = schoolNameInput.value;
  }

  if (authTeacherNameInput) {
    authTeacherNameInput.value = teacherNameInput.value;
  }
}

function updateBranding() {
  const lessonTitle = DEFAULT_LESSON_TITLE;
  const lessonSubtitle = DEFAULT_LESSON_SUBTITLE;
  const schoolName = schoolNameInput.value.trim() || DEFAULT_SCHOOL_NAME;
  const teacherName = teacherNameInput.value.trim() || DEFAULT_TEACHER_NAME;
  const savedBranding = JSON.parse(localStorage.getItem(BRANDING_STORAGE_KEY) || "{}");

  lessonTitleDisplay.textContent = lessonTitle;
  lessonSubtitleDisplay.textContent = lessonSubtitle;
  schoolNameDisplay.textContent = schoolName;
  teacherNameDisplay.textContent = `إعداد المعلم/ة: ${teacherName}`;
  document.title = `${lessonTitle} | ${lessonSubtitle}`;

  localStorage.setItem(
    BRANDING_STORAGE_KEY,
    JSON.stringify({
      lessonTitle,
      lessonSubtitle,
      schoolName,
      teacherName,
      customLogo: savedBranding.customLogo || (schoolLogoImage.src.includes(DEFAULT_LOGO_SRC) ? "" : schoolLogoImage.src)
    })
  );
}

function handleLogoUpload(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    schoolLogoImage.src = reader.result;
    updateBranding();
    assistantText.textContent = "المساعد الذكي: تم تحميل الصورة الأصلية لشعار المدرسة بنجاح من داخل التطبيق.";
  };
  reader.readAsDataURL(file);
}

function resetBrandingToDefaults() {
  schoolNameInput.value = DEFAULT_SCHOOL_NAME;
  teacherNameInput.value = DEFAULT_TEACHER_NAME;
  logoUploadInput.value = "";
  schoolLogoImage.src = DEFAULT_LOGO_SRC;
  localStorage.removeItem(BRANDING_STORAGE_KEY);
  authSchoolNameInput && (authSchoolNameInput.value = DEFAULT_SCHOOL_NAME);
  authTeacherNameInput && (authTeacherNameInput.value = DEFAULT_TEACHER_NAME);
  updateBranding();
  assistantText.textContent = "المساعد الذكي: تمت إعادة اسم المدرسة واسم المعلم والشعار إلى القيم الافتراضية بنجاح.";
}

function normalizeQuestionCategory(question) {
  const category = (question?.category || "").trim();
  const prompt = question?.prompt || "";

  if (QUESTION_CATEGORIES.includes(category)) return category;
  if (category === "فهم واستيعاب") return "الفهم والاستيعاب";

  if (category === "مفردات ودلالات") {
    return /تعبير|الإيمان والعمل/.test(prompt) ? "السلامة اللغوية" : "الثروة اللغوية";
  }

  if (category === "تحليل") {
    if (/العلاقة بين|الإجمال|التفصيل|النتيجة|التعليل|التأكيد/.test(prompt)) {
      return "السلامة اللغوية";
    }
    return /الأسلوب|الغرض|وصف/.test(prompt) ? "فنون البلاغة" : "السلامة اللغوية";
  }

  return "الفهم والاستيعاب";
}

function normalizeQuestionLesson(question) {
  const lesson = (question?.lesson || "").trim();
  const text = `${question?.prompt || ""} ${question?.explanation || ""}`;

  if (lesson && LESSON_LABELS[lesson] && lesson !== "all") {
    return lesson;
  }

  if (/الزمر|تقنطوا|مقاليد|مفازة|أنيبوا|يا حسرتى|جنب الله/.test(text)) return "lesson1";
  if (/خزيمة|عكرمة|جابر عثرات الكرام|الرقة|سليمان بن عبد الملك/.test(text)) return "lesson2";
  if (/الوحي الخالد|الربيع|الروض|الدجى|صوادح|شعفاتها|الجمال/.test(text)) return "lesson3";
  if (/السلبية|الإيجابية|التواكل|المبادرة|المسؤولية|الإصلاح/.test(text)) return "lesson4";
  if (/الغبطة|العيد|الكوخ|التشاؤم|العبوس|القفر|مكفهرة/.test(text)) return "lesson5";

  return "lesson4";
}

function normalizeQuestionSet(questions = []) {
  return questions.map((question) => ({
    ...question,
    category: normalizeQuestionCategory(question),
    lesson: normalizeQuestionLesson(question)
  }));
}

function mergeQuestionBanks(savedQuestions = [], defaultQuestions = []) {
  const mergedQuestions = [...normalizeQuestionSet(defaultQuestions), ...normalizeQuestionSet(savedQuestions)];
  const seen = new Set();

  return mergedQuestions.filter((question) => {
    const promptKey = `${normalizeQuestionLesson(question)}::${normalizeQuestionCategory(question)}::${(question.prompt || "").trim()}`;
    if (!promptKey || seen.has(promptKey)) {
      return false;
    }

    seen.add(promptKey);
    return true;
  });
}

function cloneDefaultQuestions() {
  return normalizeQuestionSet(JSON.parse(JSON.stringify(DEFAULT_QUESTION_BANK)));
}

function escapeHtml(value = "") {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function setQuestionEditorStatus(message, type = "") {
  questionEditorStatus.textContent = message;
  questionEditorStatus.className = `question-editor-status${type ? ` ${type}` : ""}`;
}

async function loadSavedQuestions() {
  await ensureDefaultQuestionBankLoaded();

  const savedQuestions = JSON.parse(localStorage.getItem(QUESTIONS_STORAGE_KEY) || "null");
  const defaultQuestions = cloneDefaultQuestions();

  questionBank = Array.isArray(savedQuestions) && savedQuestions.length
    ? mergeQuestionBanks(savedQuestions, defaultQuestions)
    : defaultQuestions;

  renderQuestionEditor();
}

function renderQuestionEditor(statusMessage = `عدد الأسئلة الحالية: ${questionBank.length}`, statusType = "") {
  questionEditorList.innerHTML = questionBank
    .map(
      (question, index) => `
        <div class="question-edit-card" data-index="${index}">
          <div class="question-edit-header">
            <strong>السؤال ${index + 1}</strong>
            <button class="ghost-btn delete-question-btn" type="button" data-index="${index}">حذف</button>
          </div>
          <div class="field-group">
            <label>الدرس</label>
            <select class="question-lesson">
              ${LESSON_OPTIONS
                .filter((option) => option.value !== "all")
                .map(
                  (option) => `<option value="${option.value}" ${normalizeQuestionLesson(question) === option.value ? "selected" : ""}>${option.label}</option>`
                )
                .join("")}
            </select>
          </div>
          <div class="field-group">
            <label>التصنيف</label>
            <select class="question-category">
              ${QUESTION_CATEGORIES
                .map(
                  (category) => `<option value="${category}" ${normalizeQuestionCategory(question) === category ? "selected" : ""}>${category}</option>`
                )
                .join("")}
            </select>
          </div>
          <div class="field-group">
            <label>نص السؤال</label>
            <textarea class="question-prompt">${escapeHtml(question.prompt)}</textarea>
          </div>
          <div class="question-options-grid">
            ${question.options
              .map(
                (option, optionIndex) => `
                  <div class="field-group">
                    <label>الخيار ${optionIndex + 1}</label>
                    <input class="question-option-input" type="text" value="${escapeHtml(option)}" maxlength="120" />
                  </div>
                `
              )
              .join("")}
          </div>
          <div class="field-group">
            <label>رقم الإجابة الصحيحة</label>
            <select class="question-correct-index">
              ${[0, 1, 2, 3]
                .map(
                  (optionIndex) => `<option value="${optionIndex}" ${question.correctIndex === optionIndex ? "selected" : ""}>الخيار ${optionIndex + 1}</option>`
                )
                .join("")}
            </select>
          </div>
          <div class="field-group">
            <label>شرح الإجابة</label>
            <textarea class="question-explanation">${escapeHtml(question.explanation)}</textarea>
          </div>
        </div>
      `
    )
    .join("");

  Array.from(questionEditorList.querySelectorAll(".delete-question-btn")).forEach((button) => {
    button.addEventListener("click", () => {
      if (questionBank.length === 1) {
        setQuestionEditorStatus("يجب أن يبقى سؤال واحد على الأقل داخل اللعبة.", "error");
        return;
      }

      questionBank.splice(Number(button.dataset.index), 1);
      renderQuestionEditor("تم حذف السؤال من قائمة التعديل. اضغط حفظ لتثبيت التغييرات.", "success");
    });
  });

  setQuestionEditorStatus(statusMessage, statusType);
}

function collectQuestionsFromEditor() {
  return Array.from(questionEditorList.querySelectorAll(".question-edit-card")).map((card) => ({
    lesson: card.querySelector(".question-lesson").value.trim(),
    category: card.querySelector(".question-category").value.trim(),
    prompt: card.querySelector(".question-prompt").value.trim(),
    options: Array.from(card.querySelectorAll(".question-option-input")).map((input) => input.value.trim()),
    correctIndex: Number(card.querySelector(".question-correct-index").value),
    explanation: card.querySelector(".question-explanation").value.trim()
  }));
}

function validateQuestions(questions) {
  if (!questions.length) {
    return "أضف سؤالًا واحدًا على الأقل قبل الحفظ.";
  }

  for (let index = 0; index < questions.length; index += 1) {
    const question = questions[index];
    if (!question.category || !question.prompt || !question.explanation) {
      return `أكمل بيانات السؤال ${index + 1} قبل الحفظ.`;
    }

    if (question.options.length !== 4 || question.options.some((option) => !option)) {
      return `جميع الخيارات الأربعة في السؤال ${index + 1} مطلوبة.`;
    }

    if (Number.isNaN(question.correctIndex) || question.correctIndex < 0 || question.correctIndex > 3) {
      return `حدد الإجابة الصحيحة بشكل صحيح في السؤال ${index + 1}.`;
    }
  }

  return "";
}

function saveQuestionsFromEditor() {
  const updatedQuestions = collectQuestionsFromEditor();
  const validationMessage = validateQuestions(updatedQuestions);

  if (validationMessage) {
    setQuestionEditorStatus(validationMessage, "error");
    return;
  }

  questionBank = normalizeQuestionSet(updatedQuestions);
  localStorage.setItem(QUESTIONS_STORAGE_KEY, JSON.stringify(questionBank));
  renderQuestionEditor("تم حفظ الأسئلة الجديدة بنجاح، وأصبحت جاهزة للاستخدام في الجولة التالية مع تنويع تلقائي لمواضع الإجابات الصحيحة.", "success");
  refreshSubLessonFilterOptions();
  updateQuestionCountSetting(Number(questionCountInput?.value || gameState.questionLimit));
}

async function resetQuestionsToDefaults() {
  await ensureDefaultQuestionBankLoaded();

  questionBank = cloneDefaultQuestions();
  localStorage.removeItem(QUESTIONS_STORAGE_KEY);
  renderQuestionEditor("تمت استعادة الأسئلة الأصلية الخاصة بالدرس بنجاح، مع تنويع مواضع الإجابات الصحيحة أثناء اللعب.", "success");
  refreshSubLessonFilterOptions();
  updateQuestionCountSetting(Number(questionCountInput?.value || gameState.questionLimit));
}

function addNewQuestion() {
  questionBank.push({
    lesson: gameState.lessonFilter === "all" ? "lesson1" : gameState.lessonFilter,
    category: "الفهم والاستيعاب",
    prompt: "اكتب السؤال الجديد هنا",
    options: ["الخيار الأول", "الخيار الثاني", "الخيار الثالث", "الخيار الرابع"],
    correctIndex: 0,
    explanation: "اكتب شرح الإجابة الصحيحة هنا"
  });
  renderQuestionEditor("تمت إضافة سؤال جديد. عدّل محتواه ثم اضغط حفظ الأسئلة.", "success");
  refreshSubLessonFilterOptions();
  updateQuestionCountSetting(Number(questionCountInput?.value || gameState.questionLimit));
}

function updateCompetitionMode(mode) {
  gameState.competitionMode = mode === "students" ? "students" : "teams";

  competitionModeButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.competition === gameState.competitionMode);
  });

  teamSetupSection?.classList.toggle("hidden", gameState.competitionMode !== "teams");
  studentSetupSection?.classList.toggle("hidden", gameState.competitionMode !== "students");
  scoreCaption.textContent = IS_CONTESTANT_VIEW ? "نقاط المتسابق" : gameState.competitionMode === "students" ? "نقاط الطالب" : "نقاط الفريق";

  if (gameState.competitionMode === "students") {
    populateStudentNames(Number(studentCountSelect?.value || DEFAULT_STUDENT_COUNT));
  }

  updateQuestionCountSetting(Number(questionCountInput?.value || gameState.questionLimit));
  saveRoundSettings();
}

function updateLessonSelection(lessonValue) {
  const normalizedLesson = LESSON_LABELS[lessonValue] ? lessonValue : DEFAULT_LESSON_FILTER;
  gameState.lessonFilter = normalizedLesson;

  if (lessonSelect) {
    lessonSelect.value = normalizedLesson;
  }

  if (lessonFilterInfo) {
    lessonFilterInfo.textContent = normalizedLesson === "all"
      ? "يمكنك تشغيل الأسئلة من جميع الدروس أو تخصيص الجولة لدرس واحد فقط."
      : `سيتم تخصيص الجولة لـ ${LESSON_LABELS[normalizedLesson]}.`;
  }

  refreshSubLessonFilterOptions();
  updateQuestionCountSetting(Number(questionCountInput?.value || gameState.questionLimit));
  saveRoundSettings();
}

function isSubLessonMode(mode = gameState.mode) {
  return mode === "rhetoric" || mode === "grammar";
}

function getSubLessonOptions(mode = gameState.mode) {
  if (mode === "rhetoric") return SUB_LESSON_OPTIONS.rhetoric;
  if (mode === "grammar") return SUB_LESSON_OPTIONS.grammar;
  return [{ value: "all", label: "جميع الفروع" }];
}

function getSubLessonLabel(mode = gameState.mode, value = gameState.subLessonFilter) {
  const option = getSubLessonOptions(mode).find((item) => item.value === value);
  return option ? option.label : "";
}

function buildQuestionSearchText(question) {
  const optionsText = Array.isArray(question?.options) ? question.options.join(" ") : "";
  return `${question?.prompt || ""} ${question?.explanation || ""} ${optionsText}`;
}

function matchesSubLessonBranch(question, mode = gameState.mode, selectedSubLesson = gameState.subLessonFilter) {
  if (!isSubLessonMode(mode) || selectedSubLesson === "all") return true;

  const matcher = SUB_LESSON_MATCHERS[selectedSubLesson];
  if (!matcher) return true;

  return matcher.test(buildQuestionSearchText(question));
}

function updateSubLessonSelection(subLessonValue) {
  if (!isSubLessonMode(gameState.mode)) {
    gameState.subLessonFilter = "all";
    if (subLessonSelect) {
      subLessonSelect.value = "all";
    }
    return;
  }

  const options = getSubLessonOptions(gameState.mode);
  const normalizedSubLesson = options.some((item) => item.value === subLessonValue) ? subLessonValue : "all";
  gameState.subLessonFilter = normalizedSubLesson;

  if (subLessonSelect) {
    subLessonSelect.value = normalizedSubLesson;
  }

  if (subLessonFilterInfo) {
    subLessonFilterInfo.textContent = normalizedSubLesson === "all"
      ? "يمكنك اختيار فرع واحد داخل المجال، أو الإبقاء على جميع الفروع."
      : `الفرع المختار: ${getSubLessonLabel(gameState.mode, normalizedSubLesson)}.`;
  }

  updateQuestionCountSetting(Number(questionCountInput?.value || gameState.questionLimit));
  saveRoundSettings();
}

function refreshSubLessonFilterOptions() {
  const enabled = isSubLessonMode(gameState.mode);

  if (subLessonGroup) {
    subLessonGroup.classList.toggle("hidden", !enabled);
  }

  if (!enabled) {
    gameState.subLessonFilter = "all";
    if (subLessonSelect) {
      subLessonSelect.innerHTML = '<option value="all">جميع الفروع</option>';
      subLessonSelect.value = "all";
    }
    return;
  }

  const options = getSubLessonOptions(gameState.mode);
  const basePool = questionBank.filter((question) => matchesModeAndLesson(question));

  if (subLessonSelect) {
    subLessonSelect.innerHTML = options
      .map((option) => {
        if (option.value === "all") {
          return `<option value="${option.value}">${option.label} (${basePool.length})</option>`;
        }

        const branchCount = basePool.filter((question) => matchesSubLessonBranch(question, gameState.mode, option.value)).length;
        return `<option value="${option.value}">${option.label} (${branchCount})</option>`;
      })
      .join("");
  }

  if (!options.some((item) => item.value === gameState.subLessonFilter)) {
    gameState.subLessonFilter = "all";
  }

  updateSubLessonSelection(gameState.subLessonFilter);
}

function updateQuestionCountSetting(count) {
  const availableCount = questionBank.filter(matchesMode).length;
  const capByBank = availableCount > 0 ? availableCount : MAX_QUESTIONS_PER_GAME;
  const requestedCount = Number(count);
  const fallbackCount = availableCount > 0 ? availableCount : DEFAULT_QUESTIONS_PER_GAME;
  const normalizedCount = Math.min(capByBank, Math.max(1, Number.isFinite(requestedCount) ? requestedCount : fallbackCount));
  const actualCount = availableCount ? Math.min(normalizedCount, availableCount) : 0;
  const selectedLessonLabel = LESSON_LABELS[gameState.lessonFilter] || LESSON_LABELS[DEFAULT_LESSON_FILTER];
  const selectedSubLessonLabel = isSubLessonMode(gameState.mode) && gameState.subLessonFilter !== "all"
    ? getSubLessonLabel(gameState.mode, gameState.subLessonFilter)
    : "";
  const scopeLabel = selectedSubLessonLabel ? `${selectedLessonLabel} ضمن ${selectedSubLessonLabel}` : selectedLessonLabel;

  gameState.questionLimit = normalizedCount;

  if (questionCountInput) {
    questionCountInput.min = "1";
    questionCountInput.max = String(capByBank);
    questionCountInput.value = String(normalizedCount);
  }

  if (questionCountInfo) {
    questionCountInfo.textContent = availableCount
      ? `سيتم طرح ${actualCount} سؤالًا من ${scopeLabel}${normalizedCount > availableCount ? ` لأن المتاح حاليًا هو ${availableCount} فقط.` : "."}`
      : `لا توجد أسئلة متاحة حاليًا ضمن ${scopeLabel} والمجال المختار.`;
  }
}

function updateQuestionFormatRatioSetting(percent) {
  const numericPercent = Number(percent);
  const normalizedPercent = Math.min(50, Math.max(20, Number.isFinite(numericPercent) ? numericPercent : 30));
  const ratio = normalizedPercent / 100;

  gameState.trueFalseRatio = ratio;

  if (questionFormatRatioSelect) {
    questionFormatRatioSelect.value = String(normalizedPercent);
  }

  if (questionFormatRatioInfo) {
    questionFormatRatioInfo.textContent = `النسبة الحالية: ${normalizedPercent}% صح/خطأ و${100 - normalizedPercent}% اختيار من متعدد.`;
  }
}

function populateStudentNames(count = DEFAULT_STUDENT_COUNT, forceReset = false) {
  if (!studentNamesInput) return;

  const cleanedNames = forceReset
    ? []
    : studentNamesInput.value
        .split(/\r?\n/)
        .map((name) => name.trim())
        .filter(Boolean)
        .slice(0, MAX_STUDENTS);

  studentNamesInput.value = cleanedNames.join("\n");

  if (studentCountSelect) {
    studentCountSelect.value = String(Math.max(1, Number(count) || DEFAULT_STUDENT_COUNT));
  }
}

function updateTeamCount(count) {
  gameState.teamCount = count;
  teamCountButtons.forEach((button) => {
    button.classList.toggle("active", Number(button.dataset.count) === count);
  });

  teamNameInputs.forEach((input, index) => {
    const wrapper = input.closest(".team-input-wrap");
    const shouldShow = index < count;
    wrapper.classList.toggle("hidden", !shouldShow);
    input.disabled = !shouldShow;
  });
}

function startGame() {
  const inputName = playerNameInput.value.trim();
  gameState.playerName = IS_CONTESTANT_VIEW
    ? (SHARED_SESSION_TITLE || "جلسة الضاد")
    : (inputName || "حصة اللغة العربية");
  gameState.currentIndex = 0;
  gameState.roundParticipantIndex = 0;
  gameState.currentTeamIndex = -1;
  gameState.score = 0;
  gameState.correctAnswers = 0;
  gameState.categoryStats = {};

  if (IS_CONTESTANT_VIEW) {
    if (!inputName) {
      setQuestionEditorStatus("اكتب اسم المتسابق قبل بدء الجولة.", "error");
      playerNameInput.focus();
      return;
    }

    gameState.teams = [{
      name: inputName,
      score: 0,
      correct: 0
    }];
  } else if (gameState.competitionMode === "teams") {
    const emptyTeam = teamNameInputs.slice(0, 2).find((input) => !input.value.trim());
    if (emptyTeam) {
      setQuestionEditorStatus("اكتب اسم الفريق الأول والثاني قبل بدء اللعبة.", "error");
      emptyTeam.focus();
      return;
    }
  } else {
    const enteredStudentNames = (studentNamesInput?.value || "")
      .split(/\r?\n/)
      .map((name) => name.trim())
      .filter(Boolean);

    if (!enteredStudentNames.length) {
      setQuestionEditorStatus("اكتب اسم الطالب أو الطلاب المشاركين قبل بدء اللعبة.", "error");
      studentNamesInput?.focus();
      return;
    }
  }

  if (!IS_CONTESTANT_VIEW) {
    gameState.teams = buildParticipants();
  }

  const filtered = questionBank.filter(matchesMode);
  if (!filtered.length) {
    const selectedLessonLabel = LESSON_LABELS[gameState.lessonFilter] || LESSON_LABELS[DEFAULT_LESSON_FILTER];
    setQuestionEditorStatus(`لا توجد أسئلة مناسبة ضمن ${selectedLessonLabel} والمجال الحالي. عدّل الأسئلة أو اختر درسًا/مجالًا آخر.`, "error");
    document.querySelector(".question-editor-panel").open = true;
    return;
  }

  if (!gameState.teams.length) {
    setQuestionEditorStatus("أضف على الأقل فريقًا واحدًا أو طالبًا واحدًا لبدء الجولة.", "error");
    return;
  }

  updateQuestionCountSetting(Number(questionCountInput?.value || gameState.questionLimit));
  const totalQuestionsForRound = Math.min(gameState.questionLimit, filtered.length);
  gameState.selectedQuestions = prepareQuestionsForRound(filtered, totalQuestionsForRound);

  if (totalQuestionsForRound < gameState.questionLimit) {
    assistantText.textContent = `تم تجهيز ${totalQuestionsForRound} سؤالًا لأن المتاح في الدرس أو المجال المختار أقل من العدد المطلوب.`;
  }

  scoreCaption.textContent = IS_CONTESTANT_VIEW ? "نقاط المتسابق" : gameState.competitionMode === "students" ? "نقاط الطالب" : "نقاط الفريق";
  renderTargetOptions();
  renderTeamsBoard();
  showScreen("game");
  renderQuestion();
}

function buildParticipants() {
  return gameState.competitionMode === "students" ? buildStudents() : buildTeams();
}

function buildTeams() {
  return teamNameInputs.slice(0, gameState.teamCount).map((input) => ({
    name: input.value.trim(),
    score: 0,
    correct: 0
  }));
}

function buildStudents() {
  const enteredNames = (studentNamesInput?.value || "")
    .split(/\r?\n/)
    .map((name) => name.trim())
    .filter(Boolean)
    .slice(0, 30);

  return enteredNames.map((name) => ({
    name,
    score: 0,
    correct: 0
  }));
}

function getCurrentTeam() {
  if (!gameState.teams.length || gameState.currentTeamIndex < 0 || gameState.currentTeamIndex >= gameState.teams.length) {
    return {
      name: "بانتظار الأسرع",
      score: 0,
      correct: 0
    };
  }

  return gameState.teams[gameState.currentTeamIndex];
}

function getQuestionPointsByTime() {
  return Math.max(0, Math.min(MAX_POINTS_PER_QUESTION, Number(gameState.timer) || 0));
}

function syncContestantStartAvailability() {
  if (!IS_CONTESTANT_VIEW || !startBtn || !playerNameInput) return;

  const hasName = !!playerNameInput.value.trim();
  startBtn.disabled = !hasName;
  startBtn.setAttribute("aria-disabled", hasName ? "false" : "true");
}

function updateQuestionPointsDisplay(prefix = "النقاط المتبقية لهذا السؤال", points = getQuestionPointsByTime()) {
  if (!questionPointsLive) return;

  const livePrefix = prefix.endsWith(":") ? prefix : `${prefix}:`;
  if (questionPointsLive.firstChild) {
    questionPointsLive.firstChild.textContent = `${livePrefix} `;
  }

  const valueLabel = questionPointsLive.querySelector("strong") || questionPointsLabel;
  if (valueLabel) {
    valueLabel.textContent = String(Math.max(0, points));
  }
}

function populateArabCountrySelect(selectElement) {
  if (!selectElement) return;

  const currentValue = selectElement.value;
  selectElement.innerHTML = ARAB_COUNTRIES.map(({ name, code }) => `<option value="${code}">${name} (${code})</option>`).join("");
  selectElement.value = ARAB_COUNTRIES.some((country) => country.code === currentValue)
    ? currentValue
    : "+965";
}

function normalizeRecoveryValue(method, value) {
  const trimmedValue = String(value || "").trim();
  return method === "phone"
    ? trimmedValue.replace(/[^\d]/g, "")
    : trimmedValue.toLowerCase();
}

function updateRecoveryInputState(methodSelect, countryWrap, countrySelect, valueInput) {
  if (!methodSelect || !valueInput) return;

  const isPhone = methodSelect.value === "phone";
  countryWrap?.classList.toggle("hidden", !isPhone);

  if (countrySelect) {
    countrySelect.disabled = !isPhone;
  }

  valueInput.type = isPhone ? "tel" : "email";
  valueInput.inputMode = isPhone ? "numeric" : "email";
  valueInput.placeholder = isPhone ? "مثال: 98765432" : "name@example.com";
}

function applyCalmMode(enabled = false) {
  gameState.calmMode = !!enabled;
  document.body.classList.toggle("calm-mode", gameState.calmMode);

  if (calmModeToggle) {
    calmModeToggle.checked = gameState.calmMode;
  }

  if (calmModeNote) {
    calmModeNote.textContent = gameState.calmMode
      ? "الوضع الهادئ جدًا مفعل الآن: ألوان أكثر راحة وحركة أقل داخل الشاشات."
      : "يمكن للمعلم تفعيل هذا الوضع لتقديم تجربة بصرية ألطف وأكثر هدوءًا.";
  }

  saveRoundSettings();
}

function setRecoveryStatus(message, type = "") {
  if (!recoveryStatus) return;

  recoveryStatus.textContent = message;
  recoveryStatus.classList.remove("error", "success");
  if (type) {
    recoveryStatus.classList.add(type);
  }
}

function toggleAuthRecoveryPanel() {
  if (!authRecoveryPanel) return;

  const shouldShow = authRecoveryPanel.classList.contains("hidden");
  authRecoveryPanel.classList.toggle("hidden", !shouldShow);

  if (authForgotBtn) {
    authForgotBtn.textContent = shouldShow ? "إغلاق الاسترجاع" : "نسيت اسم المستخدم أو كلمة المرور";
  }

  setRecoveryStatus("عند تطابق بيانات الاسترجاع يظهر اسم المستخدم، ويمكنك أيضًا تعيين كلمة مرور جديدة.");
}

function getStoredTeacherAccount() {
  try {
    const storedAccount = JSON.parse(localStorage.getItem(TEACHER_AUTH_STORAGE_KEY) || "null");
    if (!storedAccount || typeof storedAccount.username !== "string" || typeof storedAccount.password !== "string") {
      return null;
    }

    return storedAccount;
  } catch (error) {
    console.warn("Unable to read teacher account:", error);
    return null;
  }
}

function isTeacherAuthenticated() {
  return IS_CONTESTANT_VIEW || sessionStorage.getItem(TEACHER_SESSION_STORAGE_KEY) === "true";
}

function setTeacherAuthenticated(isAuthenticated) {
  if (IS_CONTESTANT_VIEW) return;

  if (isAuthenticated) {
    sessionStorage.setItem(TEACHER_SESSION_STORAGE_KEY, "true");
    return;
  }

  sessionStorage.removeItem(TEACHER_SESSION_STORAGE_KEY);
}

function setAuthStatus(message, type = "") {
  if (!authStatus) return;

  authStatus.textContent = message;
  authStatus.classList.remove("error", "success");
  if (type) {
    authStatus.classList.add(type);
  }
}

function syncTeacherAuthView() {
  if (IS_CONTESTANT_VIEW) return;

  const storedAccount = getStoredTeacherAccount();
  const hasTeacherAccount = !!storedAccount;

  authRegisterPanel?.classList.toggle("hidden", hasTeacherAccount);
  authLoginPanel?.classList.toggle("hidden", !hasTeacherAccount);

  if (authTitle) {
    authTitle.textContent = hasTeacherAccount ? "دخول المعلم" : "تسجيل المعلم لأول مرة";
  }

  if (authDescription) {
    authDescription.textContent = hasTeacherAccount
      ? "سجّل دخول المعلم للانطلاق في جولة عربية مبهجة وخفيفة للطلاب."
      : "أدخل بيانات المدرسة والمعلم مرة واحدة لنجهّز مساحة آمنة ومبهجة للطلاب، ثم اختر اسم مستخدم وكلمة مرور خاصين بالمعلم.";
  }

  if (!hasTeacherAccount) {
    if (authSchoolNameInput) {
      authSchoolNameInput.value = schoolNameInput.value.trim() || DEFAULT_SCHOOL_NAME;
    }
    if (authTeacherNameInput) {
      authTeacherNameInput.value = teacherNameInput.value.trim() || DEFAULT_TEACHER_NAME;
    }
    if (authRecoveryMethodSelect) {
      authRecoveryMethodSelect.value = "phone";
    }
    updateRecoveryInputState(authRecoveryMethodSelect, authRecoveryCountryWrap, authRecoveryCountrySelect, authRecoveryValueInput);
    setAuthStatus("اسم المدرسة إلزامي، وأضف هاتفًا أو بريدًا إلكترونيًا عربيًا للمساعدة في الاسترجاع لاحقًا.");
    return;
  }

  if (authLoginUsernameInput && !authLoginUsernameInput.value.trim()) {
    authLoginUsernameInput.value = storedAccount.username;
  }

  if (recoveryMethodSelect && storedAccount.recoveryMethod) {
    recoveryMethodSelect.value = storedAccount.recoveryMethod;
  }
  if (recoveryCountrySelect && storedAccount.recoveryCountry) {
    recoveryCountrySelect.value = storedAccount.recoveryCountry;
  }
  updateRecoveryInputState(recoveryMethodSelect, recoveryCountryWrap, recoveryCountrySelect, recoveryValueInput);

  setAuthStatus("صلاحيات لوحة المعلم محمية بكلمة مرور المعلم فقط، ويمكنك الاسترجاع عبر وسيلة التواصل المحفوظة.");
}

function getInitialScreenName() {
  if (IS_CONTESTANT_VIEW || isTeacherAuthenticated()) {
    return "start";
  }

  syncTeacherAuthView();
  return "auth";
}

function registerTeacherAccount() {
  const schoolName = authSchoolNameInput?.value.trim() || "";
  const teacherName = authTeacherNameInput?.value.trim() || "";
  const username = authRegisterUsernameInput?.value.trim() || "";
  const password = authRegisterPasswordInput?.value.trim() || "";
  const recoveryMethod = authRecoveryMethodSelect?.value || "phone";
  const recoveryCountry = recoveryMethod === "phone" ? (authRecoveryCountrySelect?.value || "+965") : "";
  const recoveryValue = normalizeRecoveryValue(recoveryMethod, authRecoveryValueInput?.value || "");

  if (!schoolName) {
    setAuthStatus("يرجى إدخال اسم المدرسة أولًا.", "error");
    authSchoolNameInput?.focus();
    return;
  }

  if (!teacherName) {
    setAuthStatus("يرجى إدخال اسم المعلم أولًا.", "error");
    authTeacherNameInput?.focus();
    return;
  }

  if (!recoveryValue) {
    setAuthStatus("يرجى إضافة رقم هاتف أو بريد إلكتروني للاسترجاع.", "error");
    authRecoveryValueInput?.focus();
    return;
  }

  if (recoveryMethod === "email" && !recoveryValue.includes("@")) {
    setAuthStatus("يرجى إدخال بريد إلكتروني صحيح للاسترجاع.", "error");
    authRecoveryValueInput?.focus();
    return;
  }

  if (recoveryMethod === "phone" && recoveryValue.length < 6) {
    setAuthStatus("يرجى إدخال رقم هاتف صحيح مع اختيار الدولة العربية المناسبة.", "error");
    authRecoveryValueInput?.focus();
    return;
  }

  if (username.length < 3) {
    setAuthStatus("اختر اسم مستخدم للمعلم لا يقل عن 3 أحرف.", "error");
    authRegisterUsernameInput?.focus();
    return;
  }

  if (password.length < 4) {
    setAuthStatus("اختر كلمة مرور للمعلم لا تقل عن 4 أحرف.", "error");
    authRegisterPasswordInput?.focus();
    return;
  }

  localStorage.setItem(TEACHER_AUTH_STORAGE_KEY, JSON.stringify({ username, password, recoveryMethod, recoveryCountry, recoveryValue }));
  schoolNameInput.value = schoolName;
  teacherNameInput.value = teacherName;

  if (pendingTeacherLogoData) {
    schoolLogoImage.src = pendingTeacherLogoData;
  }

  updateBranding();
  setTeacherAuthenticated(true);
  syncTeacherAuthView();

  if (authLoginUsernameInput) {
    authLoginUsernameInput.value = username;
  }
  if (authLoginPasswordInput) {
    authLoginPasswordInput.value = "";
  }

  setAuthStatus("تم إنشاء حساب المعلم بنجاح، ويمكنك الآن إدارة الجلسة.", "success");
  showScreen("start");
  scheduleAutoIntroMusic();
}

function loginTeacherAccount() {
  const storedAccount = getStoredTeacherAccount();
  const username = authLoginUsernameInput?.value.trim() || "";
  const password = authLoginPasswordInput?.value.trim() || "";

  if (!storedAccount) {
    syncTeacherAuthView();
    showScreen("auth");
    return;
  }

  if (username !== storedAccount.username || password !== storedAccount.password) {
    setAuthStatus("اسم المستخدم أو كلمة المرور غير صحيحين. حاول مرة أخرى.", "error");
    authLoginPasswordInput?.focus();
    return;
  }

  setTeacherAuthenticated(true);
  authRecoveryPanel?.classList.add("hidden");
  if (authForgotBtn) {
    authForgotBtn.textContent = "نسيت اسم المستخدم أو كلمة المرور";
  }
  setAuthStatus("تم تسجيل دخول المعلم بنجاح.", "success");
  showScreen("start");
  scheduleAutoIntroMusic();
}

function handleTeacherLogoUpload(event) {
  const [file] = event.target.files || [];
  if (!file) {
    pendingTeacherLogoData = "";
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    pendingTeacherLogoData = String(reader.result || "");
    setAuthStatus("تم اختيار الشعار وسيُحفظ عند إنشاء حساب المعلم.", "success");
  };
  reader.readAsDataURL(file);
}

function recoverTeacherAccount() {
  const storedAccount = getStoredTeacherAccount();
  if (!storedAccount) {
    setRecoveryStatus("لا يوجد حساب معلم محفوظ لاسترجاعه حاليًا.", "error");
    return;
  }

  if (!storedAccount.recoveryMethod || !storedAccount.recoveryValue) {
    setRecoveryStatus("هذا الحساب لا يحتوي بعد على بيانات استرجاع محفوظة.", "error");
    return;
  }

  const method = recoveryMethodSelect?.value || "phone";
  const country = method === "phone" ? (recoveryCountrySelect?.value || "") : "";
  const value = normalizeRecoveryValue(method, recoveryValueInput?.value || "");
  const newPassword = recoveryNewPasswordInput?.value.trim() || "";
  const confirmPassword = recoveryConfirmPasswordInput?.value.trim() || "";

  if (!value) {
    setRecoveryStatus("أدخل رقم الهاتف أو البريد الإلكتروني المحفوظ للاسترجاع.", "error");
    recoveryValueInput?.focus();
    return;
  }

  const savedMethod = storedAccount.recoveryMethod || "phone";
  const savedCountry = savedMethod === "phone" ? (storedAccount.recoveryCountry || "") : "";
  const savedValue = normalizeRecoveryValue(savedMethod, storedAccount.recoveryValue || "");

  const matches = method === savedMethod
    && value === savedValue
    && (method !== "phone" || country === savedCountry);

  if (!matches) {
    setRecoveryStatus("بيانات الاسترجاع غير متطابقة مع الحساب المحفوظ.", "error");
    return;
  }

  let nextPassword = storedAccount.password;
  let passwordMessage = "";

  if (newPassword || confirmPassword) {
    if (newPassword.length < 4) {
      setRecoveryStatus("كلمة المرور الجديدة يجب أن تكون 4 أحرف على الأقل.", "error");
      recoveryNewPasswordInput?.focus();
      return;
    }

    if (newPassword !== confirmPassword) {
      setRecoveryStatus("تأكيد كلمة المرور الجديدة غير متطابق.", "error");
      recoveryConfirmPasswordInput?.focus();
      return;
    }

    nextPassword = newPassword;
    passwordMessage = " وتم تحديث كلمة المرور الجديدة بنجاح.";
  }

  localStorage.setItem(TEACHER_AUTH_STORAGE_KEY, JSON.stringify({ ...storedAccount, password: nextPassword }));

  if (authLoginUsernameInput) {
    authLoginUsernameInput.value = storedAccount.username;
  }
  if (authLoginPasswordInput) {
    authLoginPasswordInput.value = "";
  }

  recoveryNewPasswordInput && (recoveryNewPasswordInput.value = "");
  recoveryConfirmPasswordInput && (recoveryConfirmPasswordInput.value = "");

  setRecoveryStatus(`تم التحقق بنجاح. اسم المستخدم هو: ${storedAccount.username}.${passwordMessage}`, "success");
}

function setPasswordStatus(message, type = "") {
  if (!passwordChangeStatus) return;

  passwordChangeStatus.textContent = message;
  passwordChangeStatus.classList.remove("error", "success");
  if (type) {
    passwordChangeStatus.classList.add(type);
  }
}

function togglePasswordPanel() {
  if (!passwordPanel) return;

  const willShow = passwordPanel.classList.contains("hidden");
  passwordPanel.classList.toggle("hidden", !willShow);
  if (togglePasswordPanelBtn) {
    togglePasswordPanelBtn.textContent = willShow ? "إغلاق تغيير كلمة المرور" : "تغيير كلمة المرور";
  }
  setPasswordStatus("يمكنك تغيير كلمة مرور المعلم في أي وقت بعد إدخال الحالية.");

  if (!willShow) {
    currentPasswordInput && (currentPasswordInput.value = "");
    newPasswordInput && (newPasswordInput.value = "");
    confirmPasswordInput && (confirmPasswordInput.value = "");
  }
}

function changeTeacherPassword() {
  const storedAccount = getStoredTeacherAccount();
  const currentPassword = currentPasswordInput?.value.trim() || "";
  const newPassword = newPasswordInput?.value.trim() || "";
  const confirmPassword = confirmPasswordInput?.value.trim() || "";

  if (!storedAccount) {
    setPasswordStatus("لا يوجد حساب معلم محفوظ حاليًا.", "error");
    return;
  }

  if (currentPassword !== storedAccount.password) {
    setPasswordStatus("كلمة المرور الحالية غير صحيحة.", "error");
    currentPasswordInput?.focus();
    return;
  }

  if (newPassword.length < 4) {
    setPasswordStatus("كلمة المرور الجديدة يجب أن تكون 4 أحرف على الأقل.", "error");
    newPasswordInput?.focus();
    return;
  }

  if (newPassword !== confirmPassword) {
    setPasswordStatus("تأكيد كلمة المرور الجديدة غير متطابق.", "error");
    confirmPasswordInput?.focus();
    return;
  }

  localStorage.setItem(TEACHER_AUTH_STORAGE_KEY, JSON.stringify({ ...storedAccount, password: newPassword }));
  currentPasswordInput && (currentPasswordInput.value = "");
  newPasswordInput && (newPasswordInput.value = "");
  confirmPasswordInput && (confirmPasswordInput.value = "");
  authLoginPasswordInput && (authLoginPasswordInput.value = "");
  setPasswordStatus("تم تغيير كلمة المرور بنجاح.", "success");
}

function logoutTeacher() {
  setTeacherAuthenticated(false);
  passwordPanel?.classList.add("hidden");
  authRecoveryPanel?.classList.add("hidden");
  if (togglePasswordPanelBtn) {
    togglePasswordPanelBtn.textContent = "تغيير كلمة المرور";
  }
  if (authForgotBtn) {
    authForgotBtn.textContent = "نسيت اسم المستخدم أو كلمة المرور";
  }
  currentPasswordInput && (currentPasswordInput.value = "");
  newPasswordInput && (newPasswordInput.value = "");
  confirmPasswordInput && (confirmPasswordInput.value = "");
  authLoginPasswordInput && (authLoginPasswordInput.value = "");
  syncTeacherAuthView();
  showScreen("auth");
  assistantText.textContent = "المساعد الذكي: تم تسجيل خروج المعلم بنجاح.";
}

function setAnswerButtonsEnabled(enabled) {
  Array.from(document.querySelectorAll(".answer-btn")).forEach((button) => {
    button.disabled = gameState.answered ? true : !(enabled && gameState.buzzLocked);
  });
}

function updateBuzzLockUI() {
  const locked = gameState.buzzLocked && gameState.currentTeamIndex >= 0 && gameState.currentTeamIndex < gameState.teams.length;
  const lockedName = locked ? getCurrentTeam().name : "";

  if (buzzInBtn) {
    buzzInBtn.disabled = locked || gameState.answered;
    buzzInBtn.classList.toggle("locked", locked || gameState.answered);
    buzzInBtn.textContent = locked ? `🔒 ${lockedName}` : "🔔 Buzz In";
  }

  if (applyTargetBtn) {
    applyTargetBtn.disabled = locked || gameState.answered;
  }

  if (randomTargetBtn) {
    randomTargetBtn.disabled = locked || gameState.answered;
  }

  if (fastestNameInput) {
    fastestNameInput.readOnly = locked || gameState.answered;
    fastestNameInput.classList.toggle("locked", locked || gameState.answered);
  }

  if (buzzLockBanner) {
    buzzLockBanner.classList.toggle("locked", locked);
    buzzLockBanner.textContent = locked
      ? `🔒 تم قفل الجرس لأول ضاغط: ${lockedName}`
      : "🔔 الجرس مفتوح الآن — أول ضاغط سيُقفل السؤال لهذا الدور.";
  }

  if (directorPanel) {
    directorPanel.classList.toggle("buzz-locked", locked);
  }
}

function ensureParticipantExists(name) {
  const normalizedName = (name || "").trim();
  if (!normalizedName) return -1;

  const existingIndex = gameState.teams.findIndex(
    (participant) => participant.name.trim().toLowerCase() === normalizedName.toLowerCase()
  );

  if (existingIndex !== -1) {
    return existingIndex;
  }

  gameState.teams.push({
    name: normalizedName,
    score: 0,
    correct: 0
  });

  renderTargetOptions();
  renderTeamsBoard();
  return gameState.teams.length - 1;
}

function renderTargetOptions() {
  if (targetSelect) {
    targetSelect.innerHTML = gameState.teams
      .map((participant, index) => `<option value="${index}">${participant.name}</option>`)
      .join("");
    targetSelect.value = gameState.currentTeamIndex >= 0 ? String(gameState.currentTeamIndex) : "";
  }

  if (participantsList) {
    participantsList.innerHTML = gameState.teams
      .map((participant) => `<option value="${escapeHtml(participant.name)}"></option>`)
      .join("");
  }
}

function applyTargetSelection(index, options = {}) {
  const { announce = true, name = "", buzz = false } = options;
  let safeIndex = Number.isInteger(index) ? Math.min(Math.max(index, 0), gameState.teams.length - 1) : -1;

  const typedName = (name || fastestNameInput?.value || "").trim();
  if (typedName) {
    safeIndex = ensureParticipantExists(typedName);
  } else if (typeof index !== "number" && targetSelect && targetSelect.value !== "") {
    safeIndex = Number(targetSelect.value);
  }

  if (!gameState.teams.length || safeIndex < 0 || safeIndex >= gameState.teams.length) {
    const { singular } = getCompetitionNouns();
    if (directorNote && announce) {
      directorNote.textContent = `اكتب اسم ${singular} الأسرع أو اضغط على اسمه أولًا ليُحتسب له السؤال.`;
    }
    playerLabel.textContent = "بانتظار الأسرع";
    scoreLabel.textContent = "—";
    setAnswerButtonsEnabled(false);
    updateBuzzLockUI();
    return;
  }

  if (gameState.buzzLocked) {
    const lockedTeam = getCurrentTeam();
    if (directorNote && announce) {
      directorNote.textContent = `🔒 الجرس مقفول بالفعل لأول ضاغط: ${lockedTeam.name}`;
    }
    assistantText.textContent = `المساعد الذكي: تم قفل الجرس بالفعل لـ ${lockedTeam.name}. انتقلوا الآن إلى الإجابة.`;
    updateBuzzLockUI();
    return;
  }

  gameState.currentTeamIndex = safeIndex;

  if (buzz && !gameState.answered) {
    gameState.buzzLocked = true;
    playBuzzInSound();
  }

  if (targetSelect) {
    targetSelect.value = String(safeIndex);
  }

  const currentTeam = getCurrentTeam();
  if (fastestNameInput) {
    fastestNameInput.value = currentTeam.name;
  }

  playerLabel.textContent = currentTeam.name;
  scoreLabel.textContent = String(currentTeam.score);
  renderTeamsBoard();
  updateBuzzLockUI();

  if (directorNote && announce) {
    directorNote.textContent = buzz
      ? `🔒 تم قفل الجرس الآن لـ ${currentTeam.name}`
      : `تم تسجيل ${currentTeam.name} كأسرع مجيب لهذا السؤال.`;
  }

  if (!gameState.answered && gameState.selectedQuestions.length) {
    const currentQuestion = gameState.selectedQuestions[gameState.currentIndex];
    if (currentQuestion) {
      gameState.lastNarration = buildQuestionNarration(currentQuestion, currentTeam.name);
    }
  }

  setAnswerButtonsEnabled(true);
}

function applyRandomTarget() {
  if (!gameState.teams.length) return;

  const randomIndex = Math.floor(Math.random() * gameState.teams.length);
  applyTargetSelection(randomIndex, { buzz: true });

  if (directorNote && gameState.currentTeamIndex >= 0) {
    directorNote.textContent = `🔒 تم قفل الجرس عشوائيًا لـ ${getCurrentTeam().name}.`;
  }
}

function getCompetitionNouns() {
  if (IS_CONTESTANT_VIEW) {
    return { singular: "المتسابق", plural: "المتسابقين", boardTitle: "نتيجة المتسابق" };
  }

  return gameState.competitionMode === "students"
    ? { singular: "الطالب", plural: "الطلاب", boardTitle: "ترتيب الطلاب" }
    : { singular: "الفريق", plural: "فريقين", boardTitle: "ترتيب الفريقين" };
}

function matchesMode(question) {
  return matchesModeAndLesson(question) && matchesSubLessonBranch(question);
}

function matchesModeAndLesson(question) {
  const normalizedCategory = normalizeQuestionCategory(question);
  const normalizedLesson = normalizeQuestionLesson(question);

  const modeMatch = gameState.mode === "mixed"
    || (gameState.mode === "comprehension" && normalizedCategory === "الفهم والاستيعاب")
    || (gameState.mode === "rhetoric" && normalizedCategory === "فنون البلاغة")
    || (gameState.mode === "grammar" && normalizedCategory === "السلامة اللغوية")
    || (gameState.mode === "lexicon" && normalizedCategory === "الثروة اللغوية");

  const lessonMatch = gameState.lessonFilter === "all" || normalizedLesson === gameState.lessonFilter;
  return modeMatch && lessonMatch;
}

function renderQuestion() {
  clearInterval(gameState.timerId);
  stopSpeech();
  gameState.answered = false;
  gameState.assistUsed = false;
  gameState.buzzLocked = false;
  gameState.currentTeamIndex = -1;
  gameState.timer = TIME_PER_QUESTION;
  timerLabel.textContent = String(TIME_PER_QUESTION);
  updateQuestionPointsDisplay();
  nextBtn.classList.add("hidden");
  feedbackBox.className = "feedback hidden";
  feedbackBox.innerHTML = "";
  assistBtn.disabled = false;
  readBtn.disabled = !speechSupported;
  stopAudioBtn.disabled = !speechSupported;
  readBtn.textContent = "استمع للسؤال";
  if (assistantCard) {
    assistantCard.classList.add("hidden");
  }
  if (fastestNameInput) {
    fastestNameInput.value = "";
  }
  updateBuzzLockUI();
  assistantText.textContent = IS_CONTESTANT_VIEW
    ? "أجب عن السؤال مباشرة ضمن الوقت المحدد، وستظهر نتيجتك النهائية بعد انتهاء الجولة."
    : gameState.competitionMode === "students"
      ? "السؤال الآن ظاهر لجميع الطلاب في الجلسة نفسها، وستُحتسب النقاط لصاحب الإجابة الأسرع."
      : "السؤال الآن ظاهر للفريقين. سجّل اسم الأسرع أولًا ثم اختر الإجابة لحساب النقاط له.";

  const question = gameState.selectedQuestions[gameState.currentIndex];
  renderTargetOptions();

  playerLabel.textContent = "بانتظار الأسرع";
  scoreLabel.textContent = "—";
  progressLabel.textContent = `${gameState.currentIndex + 1} / ${gameState.selectedQuestions.length}`;
  progressBar.style.width = `${((gameState.currentIndex + 1) / gameState.selectedQuestions.length) * 100}%`;
  categoryTag.textContent = question.category;

  if (directorNote) {
    directorNote.textContent = IS_CONTESTANT_VIEW
      ? "وضع المتسابق مفعل: يمكنك الإجابة مباشرة دون أي أدوات تحكم خاصة بالمعلم."
      : gameState.competitionMode === "students"
        ? "الطلاب في الجلسة يرون السؤال نفسه الآن. سجّل اسم الطالب الأسرع أو اضغط على اسمه من القائمة لحساب النقاط له، سواء كانت الحصة عن بُعد أو حضورية."
        : "السؤال نفسه ظاهر للفريقين. سجّل اسم الفريق الأسرع أو اضغط على اسمه في اللوحة ثم اختر الإجابة.";
  }
  questionText.textContent = question.prompt;
  gameState.lastNarration = buildQuestionNarration(question);
  renderTeamsBoard();

  answersContainer.innerHTML = "";
  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-btn";
    button.textContent = option;
    button.disabled = true;
    button.addEventListener("click", () => lockAnswer(index));
    answersContainer.appendChild(button);
  });

  if (IS_CONTESTANT_VIEW && gameState.teams.length) {
    gameState.currentTeamIndex = 0;
    gameState.buzzLocked = true;

    const contestant = getCurrentTeam();
    if (fastestNameInput) {
      fastestNameInput.value = contestant.name;
    }

    playerLabel.textContent = contestant.name;
    scoreLabel.textContent = String(contestant.score);
    updateBuzzLockUI();
    setAnswerButtonsEnabled(true);
  } else {
    setAnswerButtonsEnabled(false);

    if (gameState.competitionMode === "students" && gameState.teams.length) {
      updateBuzzLockUI();
      setAnswerButtonsEnabled(false);
    }
  }

  gameState.timerId = setInterval(() => {
    gameState.timer -= 1;
    timerLabel.textContent = String(gameState.timer);
    updateQuestionPointsDisplay();
    if (gameState.timer <= 0) {
      clearInterval(gameState.timerId);
      lockAnswer(-1);
    }
  }, 1000);
}

function playTone(frequency, duration, type = "sine", volume = 0.03) {
  if (!audioContext) return;

  if (audioContext.state === "suspended") {
    audioContext.resume().catch(() => {});
  }

  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  oscillator.type = type;
  oscillator.frequency.value = frequency;
  gainNode.gain.value = volume;

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.start();
  gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration);
  oscillator.stop(audioContext.currentTime + duration);
}

function playSuccessSound() {
  playTone(660, 0.12, "triangle", 0.035);
  setTimeout(() => playTone(880, 0.16, "triangle", 0.035), 120);
}

function playBuzzInSound() {
  playTone(740, 0.08, "square", 0.03);
  setTimeout(() => playTone(988, 0.09, "square", 0.03), 85);
}

function playApplauseSound() {
  playTone(880, 0.08, "triangle", 0.03);
  setTimeout(() => playTone(988, 0.08, "triangle", 0.03), 90);
  setTimeout(() => playTone(1175, 0.1, "triangle", 0.03), 180);
  setTimeout(() => playTone(1318, 0.12, "triangle", 0.03), 280);
}

async function playIntroMusic(options = {}) {
  const { auto = false, announce = true, playWelcomeAfter = false } = options;
  if (gameState.introMusicPlayed && auto) return;
  if (!audioContext) return;

  stopSpeech();

  try {
    if (audioContext.state === "suspended") {
      await audioContext.resume();
    }
  } catch {
    return;
  }

  if (audioContext.state !== "running") {
    return;
  }

  gameState.introMusicPlayed = true;

  if (announce && !screens.start.classList.contains("hidden")) {
    assistantText.textContent = "المساعد الذكي: يتم الآن تشغيل موسيقى البداية فقط.";
  }

  playTone(523, 0.18, "sine", 0.025);
  setTimeout(() => playTone(659, 0.18, "sine", 0.025), 180);
  setTimeout(() => playTone(784, 0.22, "sine", 0.025), 360);
  setTimeout(() => playTone(659, 0.18, "sine", 0.02), 580);

  window.clearTimeout(gameState.introSequenceTimeoutId);
  if (playWelcomeAfter) {
    gameState.introSequenceTimeoutId = window.setTimeout(() => {
      playWelcomeMessage({ auto: true });
    }, 920);
  }
}

function scheduleAutoIntroMusic() {
  if (!audioContext || gameState.introMusicPlayed) return;

  const startOnInteraction = () => {
    playIntroMusic({ auto: true, announce: false, playWelcomeAfter: false });
  };

  window.addEventListener("pointerdown", startOnInteraction, { once: true });
  window.addEventListener("keydown", startOnInteraction, { once: true });
  window.addEventListener("touchstart", startOnInteraction, { once: true });

  window.setTimeout(() => {
    playIntroMusic({ auto: true, announce: false, playWelcomeAfter: false });
  }, 260);
}

function playFailSound() {
  playTone(320, 0.16, "sawtooth", 0.03);
  setTimeout(() => playTone(240, 0.18, "sawtooth", 0.03), 140);
}

function speakText(text) {
  if (!speechSupported || !text) {
    assistantText.textContent = "المساعد الذكي: المتصفح الحالي لا يدعم القراءة الصوتية.";
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "ar-SA";
  utterance.rate = 0.95;
  utterance.pitch = 1;

  const arabicVoice = window.speechSynthesis
    .getVoices()
    .find((voice) => voice.lang && voice.lang.toLowerCase().startsWith("ar"));

  if (arabicVoice) {
    utterance.voice = arabicVoice;
  }

  window.speechSynthesis.speak(utterance);
}

function stopSpeech() {
  if (!speechSupported) return;
  window.speechSynthesis.cancel();
}

function playWelcomeMessage() {
  stopSpeech();
  assistantText.textContent = "المساعد الذكي: تم إلغاء رسالة الترحيب.";
}

function playWinnerAnnouncement() {
  if (!gameState.winnerAnnouncement) return;
  playApplauseSound();
  setTimeout(() => speakText(gameState.winnerAnnouncement), 350);
}

function readCurrentContent() {
  if (!gameState.lastNarration) return;

  assistantText.textContent = gameState.answered
    ? "المساعد الذكي: تتم الآن قراءة الشرح الصوتي للمشارك الأسرع."
    : "المساعد الذكي: تتم الآن قراءة السؤال والخيارات للجميع صوتيًا.";

  speakText(gameState.lastNarration);
}

function readPostgameExplanation() {
  const summary = [resultSummary.textContent, recommendationText.textContent]
    .map((text) => (text || "").trim())
    .filter(Boolean)
    .join(". ");

  if (!summary) return;
  speakText(summary);
}

async function copySessionLink() {
  if (!sessionLinkStatus) return;

  if (window.location.protocol === "file:") {
    sessionLinkStatus.textContent = "للتعليم عن بُعد افتح نسخة GitHub Pages أو رابط الويب ثم انسخ رابط شاشة المتسابقين وشاركه معهم.";
    return;
  }

  const sessionLink = buildSessionLink();

  try {
    await navigator.clipboard.writeText(sessionLink);
    sessionLinkStatus.textContent = "تم نسخ رابط شاشة المتسابقين بنجاح. أرسله الآن للطلاب أو الفرق، وستبقى صلاحيات الإعداد محصورة بالمعلم.";
  } catch {
    sessionLinkStatus.textContent = `رابط شاشة المتسابقين: ${sessionLink}`;
  }
}

function buildQuestionNarration(question, teamName = "") {
  const optionsText = question.options
    .map((option, index) => `الخيار ${OPTION_LABELS[index]}: ${option}`)
    .join(". ");

  const intro = teamName
    ? `السؤال مطروح للجميع، وتم تسجيل ${teamName} كأسرع مجيب.`
    : "السؤال نفسه مطروح الآن على الجميع، وستُحتسب النقاط للأسرع.";

  return `${intro} ${question.prompt}. ${optionsText}`;
}

function buildExpandedExplanation(question) {
  const category = normalizeQuestionCategory(question);
  const prompt = question?.prompt || "";

  if (/الجملة الاسمية/.test(prompt)) {
    return "من دلالات الجملة الاسمية: الثبوت والاستقرار، لذا اربط الإجابة بالمعنى الثابت الذي يريد النص ترسيخه في الذهن.";
  }

  if (/تنكير|نكرة/.test(prompt)) {
    return "التنكير قد يفيد التعظيم أو الشمول أو التكثير أو التخصيص أو التحقير أو التقليل، ويُحدد المقصود من خلال السياق.";
  }

  if (/الفعل الماضي/.test(prompt)) {
    return "الفعل الماضي يدل غالبًا على تحقق الحدث وثبوته، وقد يأتي للدعاء بحسب السياق، فانتبه إلى المعنى الأقرب في النص.";
  }

  if (/الفعل المضارع/.test(prompt)) {
    return "الفعل المضارع يفيد التجدد والاستمرار واستحضار الحركة، فاختر الإجابة التي تبرز هذا المعنى إذا كان السياق مناسبًا.";
  }

  if (/أداة الشرط|دلالة.*إذا|دلالة.*إن/.test(prompt)) {
    return "من دلالات الحروف: إذا مع الماضي تفيد تحقق ما بعدها، وإن مع الفعل قد تعلق الأمر على الاحتمال أو الشك بحسب السياق.";
  }

  if (/دلالة.*قد|\(قد\)/.test(prompt)) {
    return "قد مع الماضي تفيد التحقيق والتوكيد، ومع المضارع تتحدد دلالتها من خلال السياق والمتكلم.";
  }

  if (/التكرار/.test(prompt)) {
    return "التكرار قد يفيد التأكيد أو التهويل أو التنوع والتعدد، فاختر الأثر الذي يخدم المعنى في الموضع المذكور.";
  }

  if (/الأمر/.test(prompt)) {
    return "في أسلوب الأمر لا يُسأل عن النوع، بل عن الغرض البلاغي أو تحديد العبارة الدالة عليه. ومن أغراضه في هذا المنهج: الالتماس، التمني، التهديد، التحقير، التسوية.";
  }

  if (/النهي/.test(prompt)) {
    return "النهي يكون بلا الناهية مع الفعل المضارع، ويُسأل عن غرضه البلاغي مثل: الالتماس، التمني، التحقير، التهديد، الحث.";
  }

  if (/الاستفهام/.test(prompt)) {
    return "في الاستفهام ركّز على الغرض البلاغي لا على الأداة فقط، ومن أغراضه هنا: التمني، التعظيم، الاستبطاء، التهكم، التسوية.";
  }

  if (/النداء/.test(prompt)) {
    return "في النداء يُطلب الغرض البلاغي أو العبارة التي تدل عليه، ومن أغراضه هنا: الإغراء، الضجر، التعظيم.";
  }

  if (/التورية|موطن التورية|المعنى القريب|المعنى البعيد/.test(prompt)) {
    return "في التورية ابحث عن لفظ له معنيان: معنى قريب ظاهر غير مراد، ومعنى بعيد خفي هو المراد. لذلك ركّز على تحديد موطن التورية أولًا، ثم ميّز بين المعنيين القريب والبعيد وفق المثال المقرر.";
  }

  if (/(استعارة|كناية|تشبيه|الصورة الفنية|الصورة البيانية|التمني|الأسلوب البلاغي|الغرض البلاغي)/.test(prompt)) {
    return "في أسئلة التذوق الفني والبلاغة ركّز على الغرض والأثر في المعنى والفكر والعاطفة وتوصيل الرسالة إلى المتلقي، لا على تسمية النوع فقط. وقد يطلب منك أحيانًا تحديد العبارة التي تشتمل على غرض بلاغي معين. وفي الكناية يمكن ذكر نوعها مع شرح الأثر والمعنى المستفاد من سياق النص.";
  }

  if (/الاستفهام التصديقي|الاستفهام التصوري|الاستفهام التعييني|أم التعيينية|الاستفهام المنفي|أليس|ألم|ألن|أما|ألا|هل.*استفهام|بلى.*نعم|نعم.*بلى/.test(prompt)) {
    return "في الاستفهام النحوي هنا ميّز بين ثلاثة أنماط فقط: الاستفهام التصديقي ويكون بالهمزة أو هل ويجاب عنه في الإثبات بـ(نعم) وفي النفي بـ(لا)، والاستفهام التصوري أو التعييني ويكون بالهمزة مع أم التعيينية ويجاب عنه بتعيين أحد الطرفين، والاستفهام المنفي ويكون بالهمزة مع أداة نفي مثل: ليس، لم، ما، لا، لن، ويجاب عنه في الإثبات بـ(بلى) وفي النفي بـ(نعم)، ولا يأتي الاستفهام المنفي مع هل.";
  }

  if (/الفكرة|تلخيص|المحورية|الرئيسة|الجزئية/.test(prompt)) {
    return "عند صياغة الفكرة العامة أو الرئيسة أو الجزئية، اجعل الإجابة جملة اسمية واضحة من مبتدأ وخبر تعبّر عن معنى عام أو جزئي من النص.";
  }

  if (/العلاقة بين|الإجمال|التفصيل|النتيجة|التعليل|التأكيد/.test(prompt)) {
    return "في علاقات الجمل التزم فقط بالأنواع المقررة: الإجمال والتفصيل، النتيجة، التعليل، التأكيد، ثم اختر ما يلائم السياق.";
  }

  if (/صح أم خطأ|صح أو خطأ/.test(prompt)) {
    return "في أسئلة الصح والخطأ لا تنظر إلى كلمة واحدة فقط، بل طابق العبارة كلها مع القاعدة أو معنى النص، ثم احكم: أهي صحيحة أم خاطئة؟";
  }

  if (/النسب|الاسم المنسوب|المنسوب إليه|كويتي|مصري|إسلامي|عربي|وردي|شرطي/.test(prompt)) {
    return "في النسب نضيف ياءً مشددةً في آخر الاسم المنسوب مع كسر ما قبلها، مثل: كويت ← كويتيّ. وقد يدل الاسم المنسوب على الوطن أو الدين أو الجنس أو اللون أو الحرفة بحسب السياق. وإذا سُئلت عن المنسوب إليه، فارجع بالكلمة المنسوبة إلى أصلها الذي اشتقت منه.";
  }

  if (/التصغير|فُعيل|فُعيعل|فُعيعيل|مصيبيح|مسيطرة|أقيلام|أقيْلام|مصباح|مسطرة|أقلام/.test(prompt)) {
    return "في التصغير يكون الاسم الثلاثي على وزن فُعَيْل، والرباعي على وزن فُعَيْعِل، والخماسي على وزن فُعَيْعِيل. وإذا كان الخماسي قبل آخره حرف علة قُلب ياءً عند التصغير مثل: مصباح ← مُصَيْبِيح. وبعض الكلمات تُعامل معاملة الثلاثي أو الرباعي عند التصغير بحسب بنائها، مثل: أقلام ← أُقَيْلام، ومسطرة ← مُسَيْطِرة.";
  }

  if (/المدح|الذم|المخصوص|حبذا|نعم|بئس/.test(prompt)) {
    return "في أسلوب المدح والذم حدّد الأركان الثلاثة: فعل المدح أو الذم، ثم الفاعل، ثم المخصوص. وتذكّر صور الفاعل مع نعم وبئس: اسم معرف بـ(ال)، أو نكرة مضافة إلى معرف بـ(ال)، أو ضمير مستتر مفسر بتمييز، أو اسم موصول مثل (من) و(ما). أما في (حبذا) فـ(ذا) اسم إشارة في محل فاعل. والمخصوص مع نعم وبئس يعرب مبتدأ مؤخرًا مرفوعًا جوازًا أو خبرًا لمبتدأ محذوف، ومع حبذا يعرب مبتدأ مؤخرًا مرفوعًا وجوبًا، ويجوز حذف المخصوص مع نعم وبئس إذا دل عليه السياق.";
  }

  if (/محل الجملة|موقع الجملة|خبر إن|خبر المبتدأ|خبر كان|خبر الفعل الناسخ|جملة الحال|جملة النعت|جواب شرط|مفعولاً به|مفعول به ثان|بالإضافة|معطوفة|الابتدائية|التفسيرية|صلة الاسم الموصول|جواب القسم|شرط غير جازم|اعتراضية|ليس لها محل/.test(prompt)) {
    return "في إعراب الجمل حدّد أولًا موقع الجملة: خبر، حال، نعت، مفعول به، جواب شرط، مضاف إليه، معطوفة، ابتدائية، تفسيرية، صلة موصول، جواب قسم، اعتراضية... ثم استخرج محلها أو سبب عدمه. فالجملة قد تكون في محل رفع أو نصب أو جر أو جزم بحسب موقعها، وقد تكون لا محل لها إذا كانت ابتدائية، أو تفسيرية، أو صلة للموصول، أو جواب قسم، أو جواب شرط غير جازم أو جازم غير مقترن بما يوجب المحل، أو اعتراضية بين أجزاء الكلام ونحو ذلك.";
  }

  if (/الهدف|الغاية|الغرض|الدافع|يدعو/.test(prompt)) {
    return "عند تحديد الهدف أو الغاية، ابدأ الإجابة بعبارات مثل: الدعوة إلى، الحث على، التأكيد على، بيان، التحذير من، وفق سياق النص.";
  }

  if (category === "الفهم والاستيعاب") {
    return "ركّز هنا على الفكرة العامة للنص ومعناه المباشر، ثم اربط الإجابة بالرسالة التعليمية الأساسية.";
  }

  if (category === "فنون البلاغة") {
    return "في هذا المجال نبحث عن الصورة البلاغية أو الغرض من الأسلوب، وكيف يخدم المعنى ويقوّي التأثير.";
  }

  if (category === "السلامة اللغوية") {
    return "راجع سلامة التركيب والدلالة اللغوية، وانتبه إلى الصياغة الأدق والأكثر انسجامًا مع القاعدة والسياق.";
  }

  return "في الثروة اللغوية ركّز على معاني المفردات والفروق الدقيقة بينها داخل السياق، وليس على الحفظ المجرد فقط.";
}

function buildExplanationNarration(question, isCorrect, teamName) {
  const intro = isCorrect ? `أحسن ${teamName} الإجابة.` : `${teamName} يحتاج إلى مراجعة الفكرة.`;
  return `${intro} الشرح هو: ${question.explanation}. ${buildExpandedExplanation(question)}`;
}

function provideSmartHint() {
  if (gameState.answered || gameState.assistUsed) return;

  const question = gameState.selectedQuestions[gameState.currentIndex];
  assistantText.textContent = generateSmartHint(question);
  gameState.assistUsed = true;
  assistBtn.disabled = true;
}

function generateSmartHint(question) {
  const prompt = question.prompt;
  const category = normalizeQuestionCategory(question);
  const hints = [];

  if (category === "الفهم والاستيعاب") {
    hints.push("ركّز على المعنى العام للنص والرسالة الأساسية، ثم اختر الإجابة الأشمل والأوضح.");
  }

  if (category === "فنون البلاغة") {
    hints.push("ابحث عن الأسلوب أو الصورة البلاغية والغرض منها: هل تقوي المعنى أو تؤثر في المتلقي؟");
  }

  if (category === "السلامة اللغوية") {
    hints.push("انتبه إلى الصياغة السليمة والاختيار اللغوي الأدق، واستبعد التركيب الأضعف أو الأقل انسجامًا.");
  }

  if (category === "الثروة اللغوية") {
    hints.push("وازن بين المعاني القريبة للكلمات، واختر اللفظ الأنسب داخل السياق لا المعنى العام فقط.");
  }

  if (/الأمر/.test(prompt)) {
    hints.push("في الأمر ابحث عن الغرض البلاغي مثل: الالتماس أو التمني أو التهديد أو التحقير أو التسوية.");
  }

  if (/النهي/.test(prompt)) {
    hints.push("تأكد أولًا من وجود لا الناهية مع المضارع، ثم حدّد الغرض مثل الحث أو التهديد أو غيرهما.");
  }

  if (/الاستفهام التصديقي|الاستفهام التصوري|الاستفهام التعييني|أم التعيينية|الاستفهام المنفي|أليس|ألم|ألن|أما|ألا|هل.*استفهام|بلى.*نعم|نعم.*بلى/.test(prompt)) {
    hints.push("اسأل أولًا: هل المطلوب تصديق أم تعيين أم جواب عن استفهام منفي؟");
    hints.push("تذكّر: التصديقي جوابه نعم/لا، والتصوري جوابه بتعيين أحد الطرفين، والمنفي جوابه بلى في الإثبات ونعم في النفي.");
  }

  if (/الاستفهام/.test(prompt) && !/التصديقي|التصوري|التعييني|المنفي|أم التعيينية|بلى|هل/.test(prompt)) {
    hints.push("لا تكتفِ بالأداة؛ بل حدّد غرض الاستفهام مثل التعظيم أو التهكم أو التسوية أو الاستبطاء.");
  }

  if (/النداء/.test(prompt)) {
    hints.push("في النداء ابحث عن الغرض الأقرب مثل الإغراء أو الضجر أو التعظيم.");
  }

  if (/التورية|موطن التورية|المعنى القريب|المعنى البعيد/.test(prompt)) {
    hints.push("حدّد أولًا الكلمة أو العبارة التي تحتمل معنيين؛ فهذا هو موطن التورية.");
    hints.push("ثم ميّز بين المعنى القريب الظاهر غير المراد، والمعنى البعيد الخفي المراد.");
  }

  if (/(استعارة|كناية|تشبيه|الصورة الفنية|الصورة البيانية|التمني|الأسلوب البلاغي|الغرض البلاغي)/.test(prompt)) {
    hints.push("اسأل نفسك: ما الغرض من هذا الأسلوب؟ أو أي عبارة من الخيارات تحقق هذا الغرض فعلًا؟ ثم اربطه بالمعنى والعاطفة.");
  }

  if (/الجملة الاسمية/.test(prompt)) {
    hints.push("تذكّر أن الجملة الاسمية تدل غالبًا على الثبوت والاستقرار.");
  }

  if (/تنكير|نكرة/.test(prompt)) {
    hints.push("اسأل نفسك: هل التنكير هنا للتعظيم أم للشمول أم لغيرهما؟ ثم اختر ما يسانده السياق.");
  }

  if (/الفعل الماضي/.test(prompt)) {
    hints.push("الفعل الماضي يشير غالبًا إلى تحقق الحدث وثبوته في السياق.");
  }

  if (/الفعل المضارع/.test(prompt)) {
    hints.push("المضارع يوحي بالتجدد والاستمرار والحركة المتجددة.");
  }

  if (/أداة الشرط|دلالة.*إذا|دلالة.*إن/.test(prompt)) {
    hints.push("إذا مع الماضي تميل إلى تحقق ما بعدها، أما إن فتعلّق الأمر على احتمال أو شرط.");
  }

  if (/دلالة.*قد|\(قد\)/.test(prompt)) {
    hints.push("تذكّر أن قد مع الماضي تفيد التحقيق والتوكيد غالبًا.");
  }

  if (/التكرار/.test(prompt)) {
    hints.push("انظر هل خدم التكرار التأكيد أم التهويل أم تنويع المعنى.");
  }

  if (/الفكرة|تلخيص|عنوان|المحورية|الرئيسة|الجزئية/.test(prompt)) {
    hints.push("صغ الفكرة في جملة اسمية واضحة من مبتدأ وخبر، تعبّر عن المعنى العام أو الجزئي للنص.");
  }

  if (/أقرب معنى|ضد كلمة|يدل على/.test(prompt)) {
    hints.push("قارن بين دلالات الكلمات واستبعد الاختيارات البعيدة عن السياق.");
  }

  if (/الهدف|الغاية|الغرض|الدافع|يدعو/.test(prompt)) {
    hints.push("ابدأ الإجابة بمصدر مناسب مثل: الدعوة إلى، الحث على، التأكيد على، بيان، أو التحذير من.");
  }

  if (/العلاقة بين|الإجمال|التفصيل|النتيجة|التعليل|التأكيد/.test(prompt)) {
    hints.push("العلاقات المعتمدة هنا محصورة في: الإجمال والتفصيل، النتيجة، التعليل، والتأكيد فقط.");
  }

  if (/صح أم خطأ|صح أو خطأ/.test(prompt)) {
    hints.push("اقرأ العبارة كاملة ثم قارنها بالنص أو القاعدة، ولا تعتمد على كلمة منفردة فقط.");
    hints.push("إذا خالفت العبارة أصل القاعدة أو معنى النص فالإجابة: خطأ.");
  }

  if (/النسب|الاسم المنسوب|المنسوب إليه|كويتي|مصري|إسلامي|عربي|وردي|شرطي/.test(prompt)) {
    hints.push("ابحث عن أصل الكلمة أولًا، ثم أضف ياءً مشددة في آخرها مع كسر ما قبلها إذا كان السؤال عن النسب.");
    hints.push("ميّز دلالة النسب من السياق: وطن، دين، جنس، لون، أو حرفة.");
  }

  if (/التصغير|فُعيل|فُعيعل|فُعيعيل|مصيبيح|مسيطرة|أقيلام|أقيْلام|مصباح|مسطرة|أقلام/.test(prompt)) {
    hints.push("حدّد عدد حروف الاسم أولًا؛ فالثلاثي له وزن، والرباعي له وزن آخر، والخماسي له وزن ثالث.");
    hints.push("انتبه إلى أن بعض الكلمات تُعامل معاملة الثلاثي أو الرباعي، وقد يُقلب حرف العلة ياءً في بعض الأمثلة.");
  }

  if (/المدح|الذم|المخصوص|حبذا|نعم|بئس/.test(prompt)) {
    hints.push("حدّد أولًا الفعل: نعم أو بئس أو حبذا، ثم ابحث عن الفاعل والمخصوص بالمدح أو الذم.");
    hints.push("تذكّر: مخصوص نعم وبئس يجوز فيه وجهان، أما مع حبذا فيكون مبتدأ مؤخرًا مرفوعًا وجوبًا.");
  }

  if (/محل الجملة|موقع الجملة|خبر إن|خبر المبتدأ|خبر كان|خبر الفعل الناسخ|جملة الحال|جملة النعت|جواب شرط|مفعولاً به|مفعول به ثان|بالإضافة|معطوفة|الابتدائية|التفسيرية|صلة الاسم الموصول|جواب القسم|شرط غير جازم|اعتراضية|ليس لها محل/.test(prompt)) {
    hints.push("حدّد موقع الجملة أولًا: خبر أم حال أم نعت أم مفعول به أم جواب شرط أم مضاف إليه أم اعتراضية...؟");
    hints.push("ثم اسأل: هل لها محل من الإعراب أم لا؟ وما السبب النحوي في ذلك؟");
  }

  if (/العلاقة|القيمة|أسلوب/.test(prompt)) {
    hints.push("ابحث عن العلاقة بين التعبير والمعنى، أو عن الأثر المقصود من الصياغة.");
  }

  hints.push("ابدأ باستبعاد الخيارين الأبعد عن السياق، ثم قارن بين الإجابتين الأقرب.");
  return hints.slice(0, 2).join(" ");
}

function lockAnswer(selectedIndex) {
  if (gameState.answered) return;

  if (selectedIndex !== -1 && (gameState.currentTeamIndex < 0 || gameState.currentTeamIndex >= gameState.teams.length)) {
    const { singular } = getCompetitionNouns();
    if (directorNote) {
      directorNote.textContent = `سجّل اسم ${singular} الأسرع أولًا ثم اختر الإجابة ليُحتسب له الرصيد.`;
    }
    assistantText.textContent = `المساعد الذكي: اكتب اسم ${singular} الأسرع أو اضغط على اسمه أولًا.`;
    return;
  }

  gameState.answered = true;
  clearInterval(gameState.timerId);

  const question = gameState.selectedQuestions[gameState.currentIndex];
  const currentTeam = getCurrentTeam();
  const responderName = gameState.currentTeamIndex >= 0 ? currentTeam.name : "الجميع";
  const buttons = Array.from(document.querySelectorAll(".answer-btn"));
  const isCorrect = selectedIndex === question.correctIndex;
  const questionPoints = getQuestionPointsByTime();

  if (!gameState.categoryStats[question.category]) {
    gameState.categoryStats[question.category] = { correct: 0, total: 0 };
  }
  gameState.categoryStats[question.category].total += 1;

  buttons.forEach((button, index) => {
    button.disabled = true;
    if (index === question.correctIndex) {
      button.classList.add("correct");
    }
    if (selectedIndex === index && !isCorrect) {
      button.classList.add("wrong");
    }
  });

  const expandedExplanation = buildExpandedExplanation(question);
  let message = "";
  if (selectedIndex === -1) {
    updateQuestionPointsDisplay("النقاط المتبقية لهذا السؤال", 0);
    feedbackBox.className = "feedback warning";
    message = `${responderName}: انتهى الوقت، ولم تُحتسب أي نقاط لهذا السؤال. الإجابة الصحيحة هي <strong>${question.options[question.correctIndex]}</strong><br><strong>الشرح:</strong> ${question.explanation}<br><strong>توسيع الفكرة:</strong> ${expandedExplanation}`;
    playFailSound();
  } else if (isCorrect) {
    const earnedPoints = questionPoints;
    currentTeam.score += earnedPoints;
    currentTeam.correct += 1;
    gameState.score = gameState.teams.reduce((sum, participant) => sum + participant.score, 0);
    gameState.correctAnswers += 1;
    gameState.categoryStats[question.category].correct += 1;
    scoreLabel.textContent = String(currentTeam.score);
    updateQuestionPointsDisplay("النقاط المحتسبة لهذا السؤال", earnedPoints);
    feedbackBox.className = "feedback success";
    message = `${currentTeam.name}: إجابة صحيحة ✅ حصل على <strong>${earnedPoints}</strong> نقطة من أصل <strong>${MAX_POINTS_PER_QUESTION}</strong>، مع خصم نقطة واحدة عن كل ثانية تأخير.<br><strong>الشرح:</strong> ${question.explanation}<br><strong>توسيع الفكرة:</strong> ${expandedExplanation}`;
    playSuccessSound();
  } else {
    const penaltyPoints = questionPoints;
    currentTeam.score -= penaltyPoints;
    gameState.score = gameState.teams.reduce((sum, participant) => sum + participant.score, 0);
    scoreLabel.textContent = String(currentTeam.score);
    updateQuestionPointsDisplay("النقاط المخصومة لهذا السؤال", penaltyPoints);
    feedbackBox.className = "feedback error";
    message = `${currentTeam.name}: الإجابة غير صحيحة ❌ خُصمت <strong>${penaltyPoints}</strong> نقطة كاملة لهذا السؤال، والصحيح هو <strong>${question.options[question.correctIndex]}</strong><br><strong>الشرح:</strong> ${question.explanation}<br><strong>توسيع الفكرة:</strong> ${expandedExplanation}`;
    playFailSound();
  }

  assistBtn.disabled = true;
  gameState.buzzLocked = true;
  updateBuzzLockUI();
  readBtn.disabled = !speechSupported;
  readBtn.textContent = "استمع للشرح";
  gameState.lastNarration = buildExplanationNarration(question, isCorrect, responderName);
  assistantText.textContent = selectedIndex === -1
    ? `المساعد الذكي: انتهى الوقت على الجميع. ${question.explanation} ${expandedExplanation}`
    : isCorrect
      ? `المساعد الذكي: أحسن ${currentTeam.name} لأنه كان الأسرع. ${question.explanation} ${expandedExplanation}`
      : `المساعد الذكي: ${currentTeam.name} كان الأسرع لكن يحتاج إلى مراجعة السبب. ${question.explanation} ${expandedExplanation}`;

  renderTeamsBoard();
  feedbackBox.innerHTML = message;
  feedbackBox.classList.remove("hidden");

  nextBtn.textContent = gameState.currentIndex === gameState.selectedQuestions.length - 1
    ? "اعرض النتيجة"
    : "السؤال التالي";
  nextBtn.classList.remove("hidden");
}

function goToNextQuestion() {
  if (gameState.currentIndex < gameState.selectedQuestions.length - 1) {
    gameState.currentIndex += 1;
    renderQuestion();
  } else {
    finishGame();
  }
}

function openEndGameModal() {
  confirmModal.classList.remove("hidden");
}

function closeEndGameModal() {
  confirmModal.classList.add("hidden");
}

function finishGame() {
  clearInterval(gameState.timerId);
  const totalQuestions = gameState.selectedQuestions.length || 1;
  const percent = Math.round((gameState.correctAnswers / totalQuestions) * 100);
  const ranking = [...gameState.teams].sort((a, b) => b.score - a.score || b.correct - a.correct);
  const winner = ranking[0];
  const competitionNouns = getCompetitionNouns();

  if (assistantCard) {
    assistantCard.classList.add("hidden");
  }

  finalScore.textContent = `${winner.score} نقطة`;
  finalCorrect.textContent = `${winner.correct} / ${totalQuestions}`;
  finalPercent.textContent = `${percent}%`;

  resultTitle.textContent = IS_CONTESTANT_VIEW
    ? `نتيجتك النهائية: ${winner.name}`
    : `${competitionNouns.singular} الفائز: ${winner.name}`;
  resultSummary.textContent = IS_CONTESTANT_VIEW
    ? `${winner.name} أنهى الجولة الخاصة بـ ${gameState.playerName} وحقق ${winner.score} نقطة بنسبة ${Math.round((winner.correct / totalQuestions) * 100)}%.`
    : gameState.competitionMode === "students"
      ? `${gameState.playerName} انتهت بمشاركة ${gameState.teams.length} طلاب في الجلسة نفسها، وتصدر ${winner.name} النتائج بإجمالي ${winner.score} نقطة ونسبة ${Math.round((winner.correct / totalQuestions) * 100)}%.`
      : `${gameState.playerName} انتهت بفوز ${winner.name} بعد منافسة بين فريقين، بإجمالي ${gameState.score} نقطة و${gameState.correctAnswers} إجابات صحيحة من أصل ${totalQuestions}.`;
  recommendationText.textContent = buildRecommendation(percent, winner.name);
  const lessonTitle = DEFAULT_LESSON_TITLE;
  gameState.winnerAnnouncement = `مبارك لـ${competitionNouns.singular} الفائز: ${winner.name}. لقد حقق ${winner.score} نقطة في لعبة ${lessonTitle}. أحسنتم جميعًا.`;
  renderFinalRanking(ranking, totalQuestions);
  renderWinnerCertificate(winner, lessonTitle);

  saveLeaderboard({
    name: `${winner.name} — ${gameState.playerName}`,
    score: winner.score,
    percent
  });
  renderLeaderboard();
  showScreen("result");
  playWinnerAnnouncement();
}

function renderFinalRanking(ranking, totalQuestions = gameState.selectedQuestions.length || 1) {
  if (!ranking.length) {
    finalRanking.innerHTML = "";
    return;
  }

  finalRanking.innerHTML = `
    <h3>${getCompetitionNouns().boardTitle}</h3>
    ${ranking
      .map((team, index) => {
        const personalPercent = Math.round((team.correct / Math.max(totalQuestions, 1)) * 100);
        return `
          <div class="team-result-card ${index === 0 ? "winner" : ""}">
            <div>
              <strong>${index + 1}. ${team.name}</strong>
              <small>${team.correct} إجابات صحيحة — ${personalPercent}%</small>
            </div>
            <strong>${team.score} نقطة</strong>
          </div>
        `;
      })
      .join("")}
  `;
}

function renderWinnerCertificate(winner, lessonTitle) {
  certificateSchool.textContent = schoolNameInput.value.trim() || DEFAULT_SCHOOL_NAME;
  certificateTeam.textContent = winner.name;
  certificateScore.textContent = `بعد تحقيق ${winner.score} نقطة في ${lessonTitle}`;
  winnerCertificate.classList.remove("hidden");
}

function buildRecommendation(percent, winnerName) {
  const bestCategory = getBestCategory();
  const participantsLabel = IS_CONTESTANT_VIEW ? "المتسابق" : gameState.competitionMode === "students" ? "الطلاب" : "الفريقين";

  if (percent >= 85) {
    return `أداء الصف ممتاز جدًا، وتصدر ${winnerName} المنافسة. أقوى جانب ظاهر في الجولة هو: ${bestCategory}.`;
  }
  if (percent >= 65) {
    return `أداء الصف جيد، ويُنصح بمراجعة بعض أفكار الدرس مع تعزيز مهارة: ${bestCategory}.`;
  }
  return `يحتاج ${participantsLabel} إلى مراجعة الفكرة العامة للدرس وأمثلة الإيجابية الواردة فيه، مع التركيز على: ${bestCategory}.`;
}

function getBestCategory() {
  const entries = Object.entries(gameState.categoryStats);
  if (!entries.length) return "المحاولة العامة";

  entries.sort((a, b) => {
    const rateA = a[1].correct / a[1].total;
    const rateB = b[1].correct / b[1].total;
    return rateB - rateA;
  });

  return entries[0][0];
}

function renderTeamsBoard() {
  if (!gameState.teams.length) {
    teamsBoard.innerHTML = "";
    return;
  }

  teamsBoard.innerHTML = gameState.teams
    .map(
      (team, index) => `
        <div class="team-chip ${index === gameState.currentTeamIndex ? "active" : ""}" data-index="${index}" role="button" tabindex="0" aria-label="اختيار ${team.name} باعتباره الأسرع">
          <strong>${team.name}</strong>
          <span>${team.score} نقطة</span>
        </div>
      `
    )
    .join("");

  Array.from(teamsBoard.querySelectorAll(".team-chip")).forEach((chip) => {
    const chipIndex = Number(chip.dataset.index);
    chip.addEventListener("click", () => applyTargetSelection(chipIndex, { buzz: true }));
    chip.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        applyTargetSelection(chipIndex, { buzz: true });
      }
    });
  });
}

function saveLeaderboard(entry) {
  const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  existing.push(entry);
  existing.sort((a, b) => b.score - a.score || b.percent - a.percent);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing.slice(0, 5)));
}

function renderLeaderboard() {
  const entries = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  leaderboardList.innerHTML = "";

  if (!entries.length) {
    leaderboardList.innerHTML = "<li>ابدأ أول جولة لتسجيل النتيجة.</li>";
    return;
  }

  entries.forEach((entry) => {
    const item = document.createElement("li");
    item.textContent = `${entry.name} — ${entry.score} نقطة (${entry.percent}%)`;
    leaderboardList.appendChild(item);
  });
}

function shuffleArray(items) {
  const clone = [...items];
  for (let i = clone.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [clone[i], clone[j]] = [clone[j], clone[i]];
  }
  return clone;
}

function repositionCorrectAnswer(question, targetIndex = 0) {
  const safeOptions = Array.isArray(question?.options) ? [...question.options] : [];
  if (!safeOptions.length) {
    return { ...question };
  }

  const safeCorrectIndex = Math.min(Math.max(Number(question.correctIndex) || 0, 0), safeOptions.length - 1);
  const correctOption = safeOptions[safeCorrectIndex];
  const wrongOptions = safeOptions.filter((_, index) => index !== safeCorrectIndex);
  const safeTargetIndex = Math.min(Math.max(Number(targetIndex) || 0, 0), safeOptions.length - 1);
  const balancedWrongOptions = shuffleArray(wrongOptions);

  balancedWrongOptions.splice(safeTargetIndex, 0, correctOption);

  return {
    ...question,
    options: balancedWrongOptions,
    correctIndex: safeTargetIndex
  };
}

function isTrueFalseQuestion(question) {
  const options = Array.isArray(question?.options) ? question.options : [];
  if (options.length !== 2) return false;

  const normalized = options.map((option) => String(option || "").trim());
  return normalized.includes("صح") && normalized.includes("خطأ");
}

function prepareQuestionsForRound(questions = [], limit = questions.length) {
  const targetCount = Math.max(0, limit);
  const shuffledQuestions = shuffleArray(questions);
  const trueFalsePool = shuffledQuestions.filter(isTrueFalseQuestion);
  const multipleChoicePool = shuffledQuestions.filter((question) => !isTrueFalseQuestion(question));

  const ratio = Math.min(0.5, Math.max(0.2, Number(gameState.trueFalseRatio) || 0.3));
  const targetTrueFalse = Math.round(targetCount * ratio);
  const pickedTrueFalse = trueFalsePool.slice(0, Math.min(targetTrueFalse, trueFalsePool.length));

  const remainingAfterTrueFalse = targetCount - pickedTrueFalse.length;
  const pickedMultipleChoice = multipleChoicePool.slice(0, Math.min(remainingAfterTrueFalse, multipleChoicePool.length));

  const missingCount = targetCount - (pickedTrueFalse.length + pickedMultipleChoice.length);
  const extraTrueFalse = trueFalsePool.slice(pickedTrueFalse.length, pickedTrueFalse.length + Math.max(0, missingCount));

  return shuffleArray([...pickedTrueFalse, ...pickedMultipleChoice, ...extraTrueFalse])
    .slice(0, targetCount)
    .map((question, index) => repositionCorrectAnswer(question, index % Math.max(question.options?.length || 4, 1)));
}

function updateConnectionStatus(showOnlineFeedback = false) {
  if (!connectionBanner) return;

  if (navigator.onLine) {
    connectionBanner.textContent = "تم استعادة الاتصال بالإنترنت.";
    connectionBanner.classList.remove("offline", "hidden");
    connectionBanner.classList.add("online");

    if (!showOnlineFeedback) {
      connectionBanner.classList.add("hidden");
      connectionBanner.classList.remove("online");
      return;
    }

    window.setTimeout(() => {
      connectionBanner.classList.add("hidden");
      connectionBanner.classList.remove("online");
    }, 1800);
    return;
  }

  connectionBanner.textContent = "أنت تعمل الآن بدون اتصال. النسخة المحفوظة ما زالت متاحة للاستخدام.";
  connectionBanner.classList.remove("hidden", "online");
  connectionBanner.classList.add("offline");
}

function registerPwaSupport() {
  const isStandalone = window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone;
  const canRegisterServiceWorker = "serviceWorker" in navigator
    && (window.location.protocol === "https:" || ["localhost", "127.0.0.1"].includes(window.location.hostname));

  updateConnectionStatus(false);
  window.addEventListener("online", () => updateConnectionStatus(true));
  window.addEventListener("offline", () => updateConnectionStatus(true));

  if (isStandalone) {
    showInstallSplash("مرحبًا بك في نسخة التطبيق من لعبة الضاد.");
    installAppBtn?.classList.add("hidden");
  }

  if (!canRegisterServiceWorker) {
    return;
  }

  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js").catch((error) => {
      console.warn("Service worker registration failed:", error);
    });
  });
}

async function initializeApp() {
  loadSavedBranding();
  populateArabCountrySelect(authRecoveryCountrySelect);
  populateArabCountrySelect(recoveryCountrySelect);
  updateRecoveryInputState(authRecoveryMethodSelect, authRecoveryCountryWrap, authRecoveryCountrySelect, authRecoveryValueInput);
  updateRecoveryInputState(recoveryMethodSelect, recoveryCountryWrap, recoveryCountrySelect, recoveryValueInput);
  await loadSavedQuestions();
  loadSavedRoundSettings();
  applySessionConfigFromUrl();
  applyCalmMode(gameState.calmMode);
  updateBranding();
  syncTeacherAuthView();
  updateModeSelection(gameState.mode);
  updateCompetitionMode(gameState.competitionMode);
  updateTeamCount(gameState.teamCount);
  populateStudentNames(DEFAULT_STUDENT_COUNT);
  updateLessonSelection(gameState.lessonFilter);
  updateSubLessonSelection(gameState.subLessonFilter);
  updateQuestionFormatRatioSetting(Math.round((gameState.trueFalseRatio || 0.3) * 100));
  updateQuestionCountSetting(gameState.questionLimit || questionBank.filter(matchesMode).length || DEFAULT_QUESTIONS_PER_GAME);
  applyRolePermissions();
  readBtn.disabled = !speechSupported;
  stopAudioBtn.disabled = !speechSupported;
  renderLeaderboard();
  renderTeamsBoard();
  registerPwaSupport();
  beginOpeningSequence();
}

initializeApp();
