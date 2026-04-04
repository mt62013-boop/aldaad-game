const QUESTIONS_PER_GAME = 12;
const TIME_PER_QUESTION = 25;
const SCREEN_TRANSITION_MS = 280;
const SPLASH_DELAY_MS = 1150;
const STORAGE_KEY = "arabic-grade12-islam-positive-leaderboard";

const DEFAULT_QUESTION_BANK = [
  {
    category: "فهم واستيعاب",
    prompt: "ما الفكرة الرئيسة لدرس (الإسلام يحارب السلبية)؟",
    options: ["الدعوة إلى الإيجابية والعمل وتحمل المسؤولية", "تمجيد العزلة والابتعاد عن المجتمع", "التركيز على الحفظ دون تطبيق", "تفضيل الصمت على الإصلاح"],
    correctIndex: 0,
    explanation: "يركز الدرس على أن الإسلام يرفض السلبية ويدعو إلى المبادرة والعمل النافع للفرد والمجتمع."
  },
  {
    category: "فهم واستيعاب",
    prompt: "يرفض الإسلام السلبية لأنها تؤدي إلى:",
    options: ["تعطيل الطاقات وتأخر المجتمع", "زيادة الإنتاج والإبداع", "ترسيخ روح التعاون", "تحقيق الإصلاح السريع"],
    correctIndex: 0,
    explanation: "السلبية تجعل الفرد متقاعسًا، وهذا يضعف المجتمع ويؤخر تقدمه."
  },
  {
    category: "فهم واستيعاب",
    prompt: "أي سلوك يعبر عن رسالة الدرس؟",
    options: ["المبادرة إلى حل المشكلات وخدمة الآخرين", "انتظار الآخرين ليتحملوا كل المسؤولية", "الشكوى المستمرة دون عمل", "الانسحاب من المواقف الصعبة"],
    correctIndex: 0,
    explanation: "الدرس يدعو إلى المبادرة والإصلاح وعدم الاتكال على الآخرين."
  },
  {
    category: "فهم واستيعاب",
    prompt: "المقصود بالإيجابية في سياق الدرس هو:",
    options: ["التفاعل الواعي والعمل المؤثر", "الكلام الكثير بلا تنفيذ", "الانعزال عن قضايا المجتمع", "رفض التعاون مع الناس"],
    correctIndex: 0,
    explanation: "الإيجابية ليست مجرد رأي، بل سلوك عملي يسهم في البناء والإصلاح."
  },
  {
    category: "فهم واستيعاب",
    prompt: "أي عنوان بديل يناسب مضمون الدرس؟",
    options: ["المسؤولية طريق النهضة", "الراحة غاية النجاح", "العزلة أفضل من المشاركة", "السكوت يحل المشكلات"],
    correctIndex: 0,
    explanation: "العنوان البديل المناسب هو ما يعكس فكرة المسؤولية والعمل والإصلاح."
  },
  {
    category: "مفردات ودلالات",
    prompt: "أقرب معنى لكلمة (السلبية) في هذا الدرس هو:",
    options: ["التقاعس وعدم المبادرة", "الذكاء وسرعة الفهم", "الهدوء مع الإتقان", "الاجتهاد في التعلم"],
    correctIndex: 0,
    explanation: "السلبية هنا تعني التخاذل وترك العمل والاعتماد على الآخرين."
  },
  {
    category: "مفردات ودلالات",
    prompt: "أقرب معنى لكلمة (التواكل) هو:",
    options: ["ترك الأخذ بالأسباب والاعتماد على الغير", "الثقة بالنفس مع العمل", "التخطيط الجيد للمستقبل", "الإخلاص في أداء الواجب"],
    correctIndex: 0,
    explanation: "التواكل مذموم لأنه يعني ترك العمل بدعوى انتظار النتائج دون جهد."
  },
  {
    category: "مفردات ودلالات",
    prompt: "ضد كلمة (المبادرة) هو:",
    options: ["التقاعس", "السرعة", "الشجاعة", "المنافسة"],
    correctIndex: 0,
    explanation: "المبادرة تقابلها حالة التردد والتقاعس وعدم التحرك."
  },
  {
    category: "مفردات ودلالات",
    prompt: "تعبير (تحمل المسؤولية) يدل على:",
    options: ["النضج والالتزام", "اللامبالاة", "الهروب من الواجب", "ضعف الشخصية"],
    correctIndex: 0,
    explanation: "تحمل المسؤولية صفة من صفات الشخصية الإيجابية الواعية."
  },
  {
    category: "مفردات ودلالات",
    prompt: "عندما يربط الدرس بين الإيمان والعمل، فالدلالة هي:",
    options: ["أن القيم لا تكتمل إلا بالسلوك", "أن المعرفة تكفي وحدها", "أن النية تغني عن الجهد", "أن العزلة أفضل من المشاركة"],
    correctIndex: 0,
    explanation: "الدرس يوضح أن الإيمان الحق يظهر في العمل والإنتاج والإصلاح."
  },
  {
    category: "تحليل",
    prompt: "ما الأسلوب الأنسب الذي اعتمد عليه الدرس في الإقناع؟",
    options: ["عرض الفكرة مع بيان آثارها على الفرد والمجتمع", "السرد القصصي فقط", "الاعتماد على الألفاظ الغامضة", "ذكر أفكار متفرقة بلا رابط"],
    correctIndex: 0,
    explanation: "الدرس يقنع المتلقي من خلال الربط بين الفكرة ونتائجها العملية."
  },
  {
    category: "تحليل",
    prompt: "العلاقة بين محاربة السلبية وبناء المجتمع هي علاقة:",
    options: ["سبب ونتيجة", "تضاد تام", "مجاز فقط", "تشابه شكلي"],
    correctIndex: 0,
    explanation: "كلما تراجعت السلبية زادت فاعلية الأفراد، فتقدم المجتمع."
  },
  {
    category: "تحليل",
    prompt: "إذا عرض الكاتب نماذج لأشخاص بادروا إلى الإصلاح، فالغرض من ذلك:",
    options: ["تعزيز الفكرة بأمثلة تطبيقية", "إطالة النص دون فائدة", "الابتعاد عن موضوع الدرس", "التسلية فقط"],
    correctIndex: 0,
    explanation: "الأمثلة الواقعية تقوي الحجة وتقرّب المعنى إلى ذهن الطالب."
  },
  {
    category: "تحليل",
    prompt: "أي نتيجة يمكن استنتاجها من مضمون الدرس؟",
    options: ["الفرد الإيجابي عنصر أساس في نهضة الأمة", "المجتمع يتغير بلا جهد أفراده", "الإصلاح مهمة جهة واحدة فقط", "السلبية لا تؤثر في الواقع"],
    correctIndex: 0,
    explanation: "الدرس يؤكد أن صلاح المجتمع يبدأ من وعي الفرد ومسؤوليته."
  },
  {
    category: "تحليل",
    prompt: "ما القيمة المركزية التي يبني عليها الدرس فكرته؟",
    options: ["المسؤولية", "الكسل", "التردد", "اللامبالاة"],
    correctIndex: 0,
    explanation: "المسؤولية قيمة محورية لأنها تدفع الإنسان إلى الفعل والإصلاح."
  },
  {
    category: "تحليل",
    prompt: "أي موقف ينسجم مع مضمون الدرس أكثر من غيره؟",
    options: ["طالب ينظم حملة لمساعدة زملائه المتعثرين", "طالب يكتفي بانتقاد الجميع", "طالب يرفض المشاركة في أي نشاط", "طالب يؤجل واجباته دائمًا"],
    correctIndex: 0,
    explanation: "المبادرة لخدمة الآخرين صورة عملية من صور الإيجابية التي يشجع عليها الدرس."
  },
  {
    category: "فهم واستيعاب",
    prompt: "يريد الدرس من المتعلم أن ينتقل من مرحلة المعرفة إلى مرحلة:",
    options: ["التطبيق والعمل", "الحفظ الآلي فقط", "العزلة الفكرية", "الاعتراض دون دليل"],
    correctIndex: 0,
    explanation: "القيمة التعليمية هنا أن الفهم الحقيقي يظهر في السلوك والتطبيق."
  },
  {
    category: "تحليل",
    prompt: "وصف السلبية بأنها (عائق) يوحي بأنها:",
    options: ["تمنع التقدم والإنجاز", "وسيلة للنجاح", "صفة محمودة", "حالة مؤقتة بلا أثر"],
    correctIndex: 0,
    explanation: "لفظ (عائق) يحمل دلالة المنع والتأخير، وهو مناسب لفكرة الدرس."
  },
  {
    category: "مفردات ودلالات",
    prompt: "أقرب معنى لعبارة (روح المبادرة) هو:",
    options: ["الاستعداد للبدء بالعمل النافع", "التردد في اتخاذ القرار", "الاعتماد الكامل على الآخرين", "الانشغال بالكلام فقط"],
    correctIndex: 0,
    explanation: "روح المبادرة تعني أن يبدأ الإنسان الخير دون انتظار دائم للآخرين."
  },
  {
    category: "تحليل",
    prompt: "أفضل تلخيص للدرس هو:",
    options: ["الإسلام يربي الإنسان على الفاعلية والإصلاح ومحاربة التخاذل", "الدرس يقتصر على شرح مفردات معزولة", "الغاية من الدرس تمجيد الصمت", "الدرس يدعو إلى ترك الشأن العام"],
    correctIndex: 0,
    explanation: "هذا التلخيص يجمع بين الفكرة الرئيسة والقيمة التربوية في النص."
  }
 ];

let questionBank = [];

const screens = {
  splash: document.getElementById("splash-screen"),
  intro: document.getElementById("intro-screen"),
  start: document.getElementById("start-screen"),
  game: document.getElementById("game-screen"),
  result: document.getElementById("result-screen")
};

const playerNameInput = document.getElementById("player-name");
const introContinueBtn = document.getElementById("intro-continue-btn");
const introWelcomeBtn = document.getElementById("intro-welcome-btn");
const introSchoolDisplay = document.getElementById("intro-school-display");
const introTeacherDisplay = document.getElementById("intro-teacher-display");
const introLogoImage = document.getElementById("intro-logo");
const schoolNameInput = document.getElementById("school-name");
const teacherNameInput = document.getElementById("teacher-name");
const logoUploadInput = document.getElementById("logo-upload");
const questionEditorList = document.getElementById("question-editor-list");
const saveQuestionsBtn = document.getElementById("save-questions-btn");
const resetQuestionsBtn = document.getElementById("reset-questions-btn");
const addQuestionBtn = document.getElementById("add-question-btn");
const questionEditorStatus = document.getElementById("question-editor-status");
const modeButtons = Array.from(document.querySelectorAll(".mode-btn"));
const teamCountButtons = Array.from(document.querySelectorAll(".team-count-btn"));
const teamNameInputs = Array.from(document.querySelectorAll(".team-name-input"));
const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const endGameBtn = document.getElementById("end-game-btn");
const cancelEndBtn = document.getElementById("cancel-end-btn");
const confirmEndBtn = document.getElementById("confirm-end-btn");
const confirmModal = document.getElementById("confirm-modal");
const restartBtn = document.getElementById("restart-btn");
const announceWinnerBtn = document.getElementById("announce-winner-btn");
const introMusicBtn = document.getElementById("intro-music-btn");
const welcomeBtn = document.getElementById("welcome-btn");
const resetBrandingBtn = document.getElementById("reset-branding-btn");
const fullscreenBtn = document.getElementById("fullscreen-btn");
const leaderboardList = document.getElementById("leaderboard-list");

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
const answersContainer = document.getElementById("answers-container");
const feedbackBox = document.getElementById("feedback-box");
const assistBtn = document.getElementById("assist-btn");
const readBtn = document.getElementById("read-btn");
const stopAudioBtn = document.getElementById("stop-audio-btn");
const assistantText = document.getElementById("assistant-text");
const teamsBoard = document.getElementById("teams-board");

const resultTitle = document.getElementById("result-title");
const resultSummary = document.getElementById("result-summary");
const finalScore = document.getElementById("final-score");
const finalCorrect = document.getElementById("final-correct");
const finalPercent = document.getElementById("final-percent");
const recommendationText = document.getElementById("recommendation-text");
const finalRanking = document.getElementById("final-ranking");
const winnerCertificate = document.getElementById("winner-certificate");
const certificateSchool = document.getElementById("certificate-school");
const certificateTeam = document.getElementById("certificate-team");
const certificateScore = document.getElementById("certificate-score");

const TEAM_LABELS = ["الفريق الأول", "الفريق الثاني", "الفريق الثالث", "الفريق الرابع"];
const OPTION_LABELS = ["الأول", "الثاني", "الثالث", "الرابع"];
const DEFAULT_LESSON_TITLE = "الضاد";
const DEFAULT_LEGACY_TITLE = "الإسلام يحارب السلبية";
const DEFAULT_LESSON_SUBTITLE = "تعلم بمرح";
const DEFAULT_SCHOOL_NAME = "مدرسة أكاديمية الموهبة المشتركة";
const DEFAULT_TEACHER_NAME = "معلم اللغة العربية";
const DEFAULT_LOGO_SRC = "school-logo.svg";
const BRANDING_STORAGE_KEY = "arabic-game-branding";
const QUESTIONS_STORAGE_KEY = "arabic-game-custom-questions";
const speechSupported = "speechSynthesis" in window && typeof SpeechSynthesisUtterance !== "undefined";
const audioContext = typeof window !== "undefined" && (window.AudioContext || window.webkitAudioContext)
  ? new (window.AudioContext || window.webkitAudioContext)()
  : null;

const gameState = {
  mode: "mixed",
  playerName: "حصة اللغة العربية",
  teamCount: 2,
  teams: [],
  currentTeamIndex: 0,
  selectedQuestions: [],
  currentIndex: 0,
  score: 0,
  correctAnswers: 0,
  timer: TIME_PER_QUESTION,
  timerId: null,
  answered: false,
  assistUsed: false,
  lastNarration: "",
  winnerAnnouncement: "",
  introMusicPlayed: false,
  introSequenceTimeoutId: null,
  openingSequenceId: null,
  screenTransitionId: null,
  categoryStats: {}
};

modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modeButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    gameState.mode = button.dataset.mode;
  });
});

teamCountButtons.forEach((button) => {
  button.addEventListener("click", () => {
    updateTeamCount(Number(button.dataset.count));
  });
});

schoolNameInput.addEventListener("input", updateBranding);
teacherNameInput.addEventListener("input", updateBranding);
logoUploadInput.addEventListener("change", handleLogoUpload);

introContinueBtn.addEventListener("click", () => showScreen("start"));
introWelcomeBtn.addEventListener("click", playWelcomeMessage);
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
introMusicBtn.addEventListener("click", playIntroMusic);
welcomeBtn.addEventListener("click", playWelcomeMessage);
resetBrandingBtn.addEventListener("click", resetBrandingToDefaults);
saveQuestionsBtn.addEventListener("click", saveQuestionsFromEditor);
resetQuestionsBtn.addEventListener("click", resetQuestionsToDefaults);
addQuestionBtn.addEventListener("click", addNewQuestion);
assistBtn.addEventListener("click", provideSmartHint);
readBtn.addEventListener("click", readCurrentContent);
stopAudioBtn.addEventListener("click", stopSpeech);
fullscreenBtn.addEventListener("click", async () => {
  if (!document.fullscreenElement) {
    await document.documentElement.requestFullscreen();
  } else {
    await document.exitFullscreen();
  }
});

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
    showScreen("intro");
    scheduleAutoIntroMusic();
  }, SPLASH_DELAY_MS);
}

function normalizeLessonTitle(value) {
  const trimmedValue = (value || "").trim();
  return !trimmedValue || trimmedValue === DEFAULT_LEGACY_TITLE ? DEFAULT_LESSON_TITLE : trimmedValue;
}

function normalizeLessonSubtitle(value) {
  const trimmedValue = (value || "").trim();
  return !trimmedValue ? DEFAULT_LESSON_SUBTITLE : trimmedValue;
}

function loadSavedBranding() {
  const savedBranding = JSON.parse(localStorage.getItem(BRANDING_STORAGE_KEY) || "{}");
  const logoSrc = savedBranding.customLogo || DEFAULT_LOGO_SRC;

  schoolNameInput.value = savedBranding.schoolName || DEFAULT_SCHOOL_NAME;
  teacherNameInput.value = savedBranding.teacherName || DEFAULT_TEACHER_NAME;
  schoolLogoImage.src = logoSrc;
  introLogoImage.src = logoSrc;
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
  introSchoolDisplay.textContent = schoolName;
  introTeacherDisplay.textContent = `إعداد المعلم/ة: ${teacherName}`;
  introLogoImage.src = schoolLogoImage.src;
  document.title = `${lessonTitle} | ${lessonSubtitle}`;

  localStorage.setItem(
    BRANDING_STORAGE_KEY,
    JSON.stringify({
      lessonTitle,
      lessonSubtitle,
      schoolName,
      teacherName,
      customLogo: savedBranding.customLogo || (schoolLogoImage.src.includes("school-logo.svg") ? "" : schoolLogoImage.src)
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
  introLogoImage.src = DEFAULT_LOGO_SRC;
  localStorage.removeItem(BRANDING_STORAGE_KEY);
  updateBranding();
  assistantText.textContent = "المساعد الذكي: تمت إعادة عنوان الدرس واسم المدرسة واسم المعلم والشعار إلى القيم الافتراضية بنجاح.";
}

function cloneDefaultQuestions() {
  return JSON.parse(JSON.stringify(DEFAULT_QUESTION_BANK));
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

function loadSavedQuestions() {
  const savedQuestions = JSON.parse(localStorage.getItem(QUESTIONS_STORAGE_KEY) || "null");
  questionBank = Array.isArray(savedQuestions) && savedQuestions.length ? savedQuestions : cloneDefaultQuestions();
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
            <label>التصنيف</label>
            <select class="question-category">
              ${["فهم واستيعاب", "مفردات ودلالات", "تحليل"]
                .map(
                  (category) => `<option value="${category}" ${question.category === category ? "selected" : ""}>${category}</option>`
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

  questionBank = updatedQuestions;
  localStorage.setItem(QUESTIONS_STORAGE_KEY, JSON.stringify(questionBank));
  renderQuestionEditor("تم حفظ الأسئلة الجديدة بنجاح، وأصبحت جاهزة للاستخدام في الجولة التالية.", "success");
}

function resetQuestionsToDefaults() {
  questionBank = cloneDefaultQuestions();
  localStorage.removeItem(QUESTIONS_STORAGE_KEY);
  renderQuestionEditor("تمت استعادة الأسئلة الأصلية الخاصة بالدرس بنجاح.", "success");
}

function addNewQuestion() {
  questionBank.push({
    category: "فهم واستيعاب",
    prompt: "اكتب السؤال الجديد هنا",
    options: ["الخيار الأول", "الخيار الثاني", "الخيار الثالث", "الخيار الرابع"],
    correctIndex: 0,
    explanation: "اكتب شرح الإجابة الصحيحة هنا"
  });
  renderQuestionEditor("تمت إضافة سؤال جديد. عدّل محتواه ثم اضغط حفظ الأسئلة.", "success");
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
    if (!input.value.trim()) {
      input.value = TEAM_LABELS[index];
    }
  });
}

function startGame() {
  const inputName = playerNameInput.value.trim();
  gameState.playerName = inputName || "حصة اللغة العربية";
  gameState.currentIndex = 0;
  gameState.currentTeamIndex = 0;
  gameState.score = 0;
  gameState.correctAnswers = 0;
  gameState.categoryStats = {};
  gameState.teams = buildTeams();

  const filtered = questionBank.filter(matchesMode);
  if (!filtered.length) {
    setQuestionEditorStatus("لا توجد أسئلة مناسبة للمسار المحدد. عدّل الأسئلة أو اختر وضع (مختلط).", "error");
    document.querySelector(".question-editor-panel").open = true;
    return;
  }

  gameState.selectedQuestions = shuffleArray(filtered).slice(0, Math.min(QUESTIONS_PER_GAME, filtered.length));

  playerLabel.textContent = gameState.teams[0].name;
  scoreLabel.textContent = "0";
  renderTeamsBoard();
  showScreen("game");
  renderQuestion();
}

function buildTeams() {
  return teamNameInputs.slice(0, gameState.teamCount).map((input, index) => ({
    name: input.value.trim() || TEAM_LABELS[index],
    score: 0,
    correct: 0
  }));
}

function getCurrentTeam() {
  return gameState.teams[gameState.currentTeamIndex] || {
    name: "الفريق الحالي",
    score: 0,
    correct: 0
  };
}

function matchesMode(question) {
  if (gameState.mode === "mixed") return true;
  if (gameState.mode === "comprehension") return ["فهم واستيعاب"].includes(question.category);
  if (gameState.mode === "vocabulary") return ["مفردات ودلالات"].includes(question.category);
  if (gameState.mode === "analysis") return ["تحليل"].includes(question.category);
  return true;
}

function renderQuestion() {
  clearInterval(gameState.timerId);
  stopSpeech();
  gameState.answered = false;
  gameState.assistUsed = false;
  gameState.timer = TIME_PER_QUESTION;
  timerLabel.textContent = String(TIME_PER_QUESTION);
  nextBtn.classList.add("hidden");
  feedbackBox.className = "feedback hidden";
  feedbackBox.innerHTML = "";
  assistBtn.disabled = false;
  readBtn.disabled = !speechSupported;
  stopAudioBtn.disabled = !speechSupported;
  readBtn.textContent = "استمع للسؤال";
  assistantText.textContent = speechSupported
    ? "يمكنك طلب تلميح ذكي أو الاستماع إلى السؤال والشرح صوتيًا أثناء المنافسة."
    : "يمكنك طلب تلميح ذكي، بينما قد لا يدعم هذا المتصفح ميزة القراءة الصوتية.";

  const question = gameState.selectedQuestions[gameState.currentIndex];
  gameState.currentTeamIndex = gameState.currentIndex % gameState.teams.length;
  const currentTeam = getCurrentTeam();

  playerLabel.textContent = currentTeam.name;
  scoreLabel.textContent = String(currentTeam.score);
  progressLabel.textContent = `${gameState.currentIndex + 1} / ${gameState.selectedQuestions.length}`;
  progressBar.style.width = `${((gameState.currentIndex + 1) / gameState.selectedQuestions.length) * 100}%`;
  categoryTag.textContent = question.category;
  questionText.textContent = question.prompt;
  gameState.lastNarration = buildQuestionNarration(question, currentTeam.name);
  renderTeamsBoard();

  answersContainer.innerHTML = "";
  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-btn";
    button.textContent = option;
    button.addEventListener("click", () => lockAnswer(index));
    answersContainer.appendChild(button);
  });

  gameState.timerId = setInterval(() => {
    gameState.timer -= 1;
    timerLabel.textContent = String(gameState.timer);
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

function playApplauseSound() {
  playTone(880, 0.08, "triangle", 0.03);
  setTimeout(() => playTone(988, 0.08, "triangle", 0.03), 90);
  setTimeout(() => playTone(1175, 0.1, "triangle", 0.03), 180);
  setTimeout(() => playTone(1318, 0.12, "triangle", 0.03), 280);
}

async function playIntroMusic(options = {}) {
  const { auto = false, announce = true } = options;
  if (gameState.introMusicPlayed && auto) return;
  if (!audioContext) return;

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
    assistantText.textContent = "المساعد الذكي: يتم الآن تشغيل موسيقى افتتاحية خفيفة للحصة.";
  }

  playTone(523, 0.18, "sine", 0.025);
  setTimeout(() => playTone(659, 0.18, "sine", 0.025), 180);
  setTimeout(() => playTone(784, 0.22, "sine", 0.025), 360);
  setTimeout(() => playTone(659, 0.18, "sine", 0.02), 580);

  window.clearTimeout(gameState.introSequenceTimeoutId);
  gameState.introSequenceTimeoutId = window.setTimeout(() => {
    playWelcomeMessage({ auto: true });
  }, 920);
}

function scheduleAutoIntroMusic() {
  if (!audioContext || gameState.introMusicPlayed) return;

  const startOnInteraction = () => {
    playIntroMusic({ auto: true, announce: false });
  };

  window.addEventListener("pointerdown", startOnInteraction, { once: true });
  window.addEventListener("keydown", startOnInteraction, { once: true });
  window.addEventListener("touchstart", startOnInteraction, { once: true });

  window.setTimeout(() => {
    playIntroMusic({ auto: true, announce: false });
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

function playWelcomeMessage(options = {}) {
  const { auto = false } = options;
  const lessonTitle = DEFAULT_LESSON_TITLE;
  const schoolName = schoolNameInput.value.trim() || DEFAULT_SCHOOL_NAME;
  const teacherName = teacherNameInput.value.trim() || DEFAULT_TEACHER_NAME;
  const welcomeText = `مرحبًا بكم في ${schoolName} مع ${teacherName} في درس ${lessonTitle} للصف الثاني عشر. استعدوا لمنافسة تعليمية ممتعة في الفهم والاستيعاب والتحليل.`;
  assistantText.textContent = auto
    ? "المساعد الذكي: تبدأ الآن الرسالة الترحيبية الصوتية تلقائيًا بعد الموسيقى."
    : "المساعد الذكي: يتم الآن تشغيل الرسالة الترحيبية الصوتية.";
  speakText(welcomeText);
}

function playWinnerAnnouncement() {
  if (!gameState.winnerAnnouncement) return;
  playApplauseSound();
  setTimeout(() => speakText(gameState.winnerAnnouncement), 350);
}

function readCurrentContent() {
  if (!gameState.lastNarration) return;

  assistantText.textContent = gameState.answered
    ? "المساعد الذكي: تتم الآن قراءة الشرح الصوتي للفريق."
    : "المساعد الذكي: تتم الآن قراءة السؤال والخيارات صوتيًا.";

  speakText(gameState.lastNarration);
}

function buildQuestionNarration(question, teamName) {
  const optionsText = question.options
    .map((option, index) => `الخيار ${OPTION_LABELS[index]}: ${option}`)
    .join(". ");

  return `دور ${teamName}. ${question.prompt}. ${optionsText}`;
}

function buildExpandedExplanation(question) {
  if (question.category === "فهم واستيعاب") {
    return "ركّز هنا على الرسالة العامة للدرس، وهي أن المسلم الإيجابي لا يكتفي بالمعرفة بل يحولها إلى عمل نافع وإصلاح واقعي.";
  }

  if (question.category === "مفردات ودلالات") {
    return "المطلوب في هذا النوع من الأسئلة فهم الكلمة داخل السياق، لا معناها المعجمي المنفصل فقط، لذلك ترتبط الدلالة بفكرة المسؤولية ورفض التواكل.";
  }

  return "في أسئلة التحليل نبحث عن العلاقة بين الفكرة وأثرها أو الغرض منها، لذلك ينبغي الربط بين السلبية ونتائجها على الفرد والمجتمع.";
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
  const hints = [];

  if (question.category === "فهم واستيعاب") {
    hints.push("ركّز على الفكرة العامة للدرس: الإسلام يدعو إلى المبادرة والعمل وتحمل المسؤولية، لا إلى التخاذل أو الانسحاب.");
  }

  if (question.category === "مفردات ودلالات") {
    hints.push("ابحث عن المعنى الأقرب في سياق الدرس، واستبعد أي خيار لا ينسجم مع المسؤولية أو الإيجابية.");
  }

  if (question.category === "تحليل") {
    hints.push("فكر في العلاقة المنطقية بين الفكرة وأثرها: ما الذي يريده الكاتب من القارئ؟ وما النتيجة المترتبة على السلبية؟");
  }

  if (/الفكرة|تلخيص|عنوان/.test(prompt)) {
    hints.push("اختر الإجابة الأشمل التي تلخص الرسالة كلها، وليس مثالًا جزئيًا منها.");
  }

  if (/أقرب معنى|ضد كلمة|يدل على/.test(prompt)) {
    hints.push("وازن بين دلالة الكلمات، ثم استبعد ما يمتدح الكسل أو اللامبالاة.");
  }

  if (/العلاقة|نتيجة|الغرض|القيمة/.test(prompt)) {
    hints.push("ابحث عن سبب ونتيجة، أو عن القيمة المركزية مثل المسؤولية والمبادرة.");
  }

  hints.push("استبعد أولًا الخيارات التي تشجع على العزلة أو التواكل، ثم قارِن بين المتبقي.");
  return hints.slice(0, 2).join(" ");
}

function lockAnswer(selectedIndex) {
  if (gameState.answered) return;
  gameState.answered = true;
  clearInterval(gameState.timerId);

  const question = gameState.selectedQuestions[gameState.currentIndex];
  const currentTeam = getCurrentTeam();
  const buttons = Array.from(document.querySelectorAll(".answer-btn"));
  const isCorrect = selectedIndex === question.correctIndex;

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
    feedbackBox.className = "feedback warning";
    message = `${currentTeam.name}: انتهى الوقت. الإجابة الصحيحة هي <strong>${question.options[question.correctIndex]}</strong><br><strong>الشرح:</strong> ${question.explanation}<br><strong>توسيع الفكرة:</strong> ${expandedExplanation}`;
    playFailSound();
  } else if (isCorrect) {
    const earnedPoints = 10;
    currentTeam.score += earnedPoints;
    currentTeam.correct += 1;
    gameState.score += earnedPoints;
    gameState.correctAnswers += 1;
    gameState.categoryStats[question.category].correct += 1;
    scoreLabel.textContent = String(currentTeam.score);
    feedbackBox.className = "feedback success";
    message = `${currentTeam.name}: إجابة صحيحة ✅ أضيفت <strong>10</strong> نقاط إلى رصيد الفريق.<br><strong>الشرح:</strong> ${question.explanation}<br><strong>توسيع الفكرة:</strong> ${expandedExplanation}`;
    playSuccessSound();
  } else {
    feedbackBox.className = "feedback error";
    message = `${currentTeam.name}: إجابة غير صحيحة ❌ الصحيح هو <strong>${question.options[question.correctIndex]}</strong><br><strong>الشرح:</strong> ${question.explanation}<br><strong>توسيع الفكرة:</strong> ${expandedExplanation}`;
    playFailSound();
  }

  assistBtn.disabled = true;
  readBtn.disabled = !speechSupported;
  readBtn.textContent = "استمع للشرح";
  gameState.lastNarration = buildExplanationNarration(question, isCorrect, currentTeam.name);
  assistantText.textContent = isCorrect
    ? `المساعد الذكي: أحسنتم. ${question.explanation} ${expandedExplanation}`
    : `المساعد الذكي: انتبهوا إلى سبب صحة الإجابة. ${question.explanation} ${expandedExplanation}`;

  renderTeamsBoard();
  feedbackBox.innerHTML = message;
  feedbackBox.classList.remove("hidden");
  nextBtn.textContent = gameState.currentIndex === gameState.selectedQuestions.length - 1 ? "اعرض النتيجة" : "السؤال التالي";
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

  finalScore.textContent = `${winner.score} نقطة`;
  finalCorrect.textContent = `${winner.correct} إجابات صحيحة`;
  finalPercent.textContent = `${percent}%`;

  resultTitle.textContent = `الفائز: ${winner.name}`;
  resultSummary.textContent = `${gameState.playerName} انتهت بفوز ${winner.name} بعد منافسة بين ${gameState.teams.length} فرق، بإجمالي ${gameState.score} نقطة و${gameState.correctAnswers} إجابات صحيحة من أصل ${totalQuestions}.`;
  recommendationText.textContent = buildRecommendation(percent, winner.name);
  const lessonTitle = DEFAULT_LESSON_TITLE;
  gameState.winnerAnnouncement = `مبارك للفريق الفائز: ${winner.name}. لقد حقق ${winner.score} نقطة في لعبة ${lessonTitle}. أحسنتم جميعًا.`;
  renderFinalRanking(ranking);
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

function renderFinalRanking(ranking) {
  if (!ranking.length) {
    finalRanking.innerHTML = "";
    return;
  }

  finalRanking.innerHTML = `
    <h3>ترتيب الفرق</h3>
    ${ranking
      .map(
        (team, index) => `
          <div class="team-result-card ${index === 0 ? "winner" : ""}">
            <div>
              <strong>${index + 1}. ${team.name}</strong>
              <small>${team.correct} إجابات صحيحة</small>
            </div>
            <strong>${team.score} نقطة</strong>
          </div>
        `
      )
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
  if (percent >= 85) {
    return `أداء الصف ممتاز جدًا، وتصدر ${winnerName} المنافسة. أقوى جانب ظاهر في الجولة هو: ${bestCategory}.`;
  }
  if (percent >= 65) {
    return `أداء الصف جيد، ويُنصح بمراجعة بعض أفكار الدرس مع تعزيز مهارة: ${bestCategory}.`;
  }
  return `تحتاج الفرق إلى مراجعة الفكرة العامة للدرس وأمثلة الإيجابية الواردة فيه، مع التركيز على: ${bestCategory}.`;
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
        <div class="team-chip ${index === gameState.currentTeamIndex ? "active" : ""}">
          <strong>${team.name}</strong>
          <span>${team.score} نقطة</span>
        </div>
      `
    )
    .join("");
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

loadSavedBranding();
loadSavedQuestions();
updateBranding();
updateTeamCount(gameState.teamCount);
readBtn.disabled = !speechSupported;
stopAudioBtn.disabled = !speechSupported;
renderLeaderboard();
renderTeamsBoard();
beginOpeningSequence();
