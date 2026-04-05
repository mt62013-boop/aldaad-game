const DEFAULT_QUESTIONS_PER_GAME = 12;
const MAX_QUESTIONS_PER_GAME = 30;
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
  },
  {
    category: "الثروة اللغوية",
    prompt: "ما المرادف الأقرب لكلمة (تقنطوا) الواردة في الآيات؟",
    options: ["تيأسوا", "تفرحوا", "تسارعوا", "تراجعوا"],
    correctIndex: 0,
    explanation: "ورد في الثروة اللغوية أن (تقنطوا) تعني تيأسوا من رحمة الله."
  },
  {
    category: "الثروة اللغوية",
    prompt: "ما المعنى الصحيح لكلمة (بغتة)؟",
    options: ["فجأة", "تدرجًا", "خفيًّا", "ببطء"],
    correctIndex: 0,
    explanation: "من معاني الكلمة في الدرس أن (بغتة) تعني فجأة."
  },
  {
    category: "الثروة اللغوية",
    prompt: "ما المقصود بكلمة (مقاليد) في قوله تعالى: (له مقاليد السماوات والأرض)؟",
    options: ["مفاتيح", "أبواب", "حدود", "نجوم"],
    correctIndex: 0,
    explanation: "مقاليد السماوات والأرض تعني مفاتيحها أو خزائنها."
  },
  {
    category: "الثروة اللغوية",
    prompt: "ما المعنى الأنسب لكلمة (مفازة)؟",
    options: ["منجاة", "مفاجأة", "مفخرة", "مزار"],
    correctIndex: 0,
    explanation: "المفازة في سياق الآيات تعني النجاة والفوز من السوء."
  },
  {
    category: "الثروة اللغوية",
    prompt: "ما التفسير الصحيح لعبارة: (مسّته الضراء)؟",
    options: ["أصابته الشدة", "أعجبته النعمة", "تركته وحيدًا", "أسعدته"],
    correctIndex: 0,
    explanation: "يُقال مسّته الضراء أي أصابته الشدة أو البلاء."
  },
  {
    category: "الثروة اللغوية",
    prompt: "أي الكلمات الآتية هو المفرد الصحيح لكلمة (أسواء)؟",
    options: ["سوء", "سوءة", "سوية", "سِيّ"],
    correctIndex: 0,
    explanation: "مفرد (أسواء) هو (سوء)."
  },
  {
    category: "الثروة اللغوية",
    prompt: "أي تصريف مناسب من الفعل (رحم) يتم به قوله: (وتواصوا بالصبر وتواصوا بالـ...)؟",
    options: ["مرحمة", "رحمة", "رحيم", "راحم"],
    correctIndex: 0,
    explanation: "التركيب الوارد في الكتاب هو: وتواصوا بالصبر وتواصوا بالمرحمة."
  },
  {
    category: "الثروة اللغوية",
    prompt: "ما المعنى الأقرب للفعل (أنيبوا) في قوله تعالى: (وأنيبوا إلى ربكم)؟",
    options: ["ارجعوا وتوبوا", "توقفوا وانتظروا", "اسألوا الناس", "جادلوا"],
    correctIndex: 0,
    explanation: "أنيبوا تعني ارجعوا إلى الله وتوبوا وأقبلوا عليه."
  },
  {
    category: "فنون البلاغة",
    prompt: "ما نوع الصورة البيانية في قولهم: (يا حسرتى)؟",
    options: ["استعارة مكنية", "تشبيه صريح", "مجاز مرسل", "طباق"],
    correctIndex: 0,
    explanation: "(يا حسرتى) استعارة مكنية؛ إذ صوَّر الحسرة بشخص يُنادى."
  },
  {
    category: "فنون البلاغة",
    prompt: "ما نوع التعبير البلاغي في قولهم: (جنب الله)؟",
    options: ["كناية عن حق الله وشأنه", "تشبيه بليغ", "استعارة تصريحية", "سجع"],
    correctIndex: 0,
    explanation: "التعبير كناية عن حق الله وشأنه وما يجب له من طاعة."
  },
  {
    category: "فنون البلاغة",
    prompt: "في قوله: (مقاليد السماوات والأرض) الكناية تدل على:",
    options: ["حفظ الله وتصرفه في الكون", "كثرة النجوم فقط", "اتساع الطرق", "حمل المفاتيح الحسية"],
    correctIndex: 0,
    explanation: "المقصود كناية عن التصرف في شؤون السماوات والأرض وحفظ خيراتهما."
  },
  {
    category: "فنون البلاغة",
    prompt: "ما نوع الأسلوب في عبارة: (يا حسرتى)، وما غرضه؟",
    options: ["نداء غرضه إعلان الحسرة", "أمر غرضه التهديد", "استفهام غرضه التقرير", "نهي غرضه التحذير"],
    correctIndex: 0,
    explanation: "الأسلوب نداء، وغرضه إظهار شدة الندم والحسرة."
  },
  {
    category: "فنون البلاغة",
    prompt: "ما نوع الأسلوب في قولهم: (لو أن لي كرة فأكون من المحسنين)؟",
    options: ["تمنٍ لطلب شيء مستحيل", "أمر للالتزام", "نهي للكف", "قسم للتوكيد"],
    correctIndex: 0,
    explanation: "هذا أسلوب تمني يفيد طلب شيء متعذر لشدة الرغبة فيه."
  },
  {
    category: "فنون البلاغة",
    prompt: "ما الغرض البلاغي من الاستفهام في: (أليس في جهنم مثوى للمتكبرين؟)؟",
    options: ["التقرير", "التعجب", "الاستبعاد", "الترجي"],
    correctIndex: 0,
    explanation: "جاء الاستفهام هنا للتقرير والتأكيد على المصير المحتوم للمتكبرين."
  },
  {
    category: "فنون البلاغة",
    prompt: "ما المقصود بالتورية؟",
    options: ["لفظ له معنيان؛ قريب غير مراد وبعيد هو المقصود", "الجمع بين لفظين متضادين", "تكرار اللفظ للتوكيد", "حذف المشبه به"],
    correctIndex: 0,
    explanation: "التورية من المحسنات البديعية، وفيها معنى قريب ظاهر غير مقصود ومعنى بعيد هو المراد."
  },
  {
    category: "فنون البلاغة",
    prompt: "في قول أبي بكر رضي الله عنه: (هادٍ يهديني)، ما المعنى البعيد المراد في التورية؟",
    options: ["هادٍ يهدي إلى الإسلام", "دليل للطريق فقط", "رجل مسافر", "صديق في الرحلة"],
    correctIndex: 0,
    explanation: "المعنى البعيد المقصود هو الهادي إلى الإسلام، لا مجرد دليل الطريق."
  },
  {
    category: "فنون البلاغة",
    prompt: "في قول الشاعر: (مرّ يحلو)، ما المعنى البعيد لكلمة (مرّ)؟",
    options: ["المرارة ضد الحلاوة", "المرور والذهاب", "الليل المظلم", "الحزن"],
    correctIndex: 0,
    explanation: "التورية هنا في كلمة (مرّ)؛ فالمعنى البعيد المراد هو المرارة ضد الحلاوة."
  },
  {
    category: "السلامة اللغوية",
    prompt: "ما الموقع الإعرابي للجملة (وصلوا) في: (المسافرون وصلوا قبل ساعة)؟",
    options: ["في محل رفع خبر للمبتدأ", "في محل نصب حال", "في محل جر نعت", "في محل جزم جواب شرط"],
    correctIndex: 0,
    explanation: "الجملة الفعلية (وصلوا) وقعت خبرًا للمبتدأ فهي في محل رفع."
  },
  {
    category: "السلامة اللغوية",
    prompt: "ما الموقع الإعرابي للجملة (يدخلون) في: (كان المسافرون يدخلون قاعة الاستقبال)؟",
    options: ["في محل نصب خبر كان", "في محل رفع خبر إن", "في محل جر مضاف إليه", "في محل نصب مفعول به"],
    correctIndex: 0,
    explanation: "لأنها خبر للفعل الناسخ (كان) فهي في محل نصب."
  },
  {
    category: "السلامة اللغوية",
    prompt: "ما الموقع الإعرابي للجملة (يلعبون) في: (رأيت الأطفال يلعبون)؟",
    options: ["في محل نصب حال", "في محل رفع خبر", "في محل جر نعت", "في محل جزم جواب شرط"],
    correctIndex: 0,
    explanation: "الجملة هنا تبين هيئة الأطفال وقت الرؤية، فهي في محل نصب حال."
  },
  {
    category: "السلامة اللغوية",
    prompt: "ما نوع الجملة في: (وهو ساجد) في قولهم: (أقرب ما يكون العبد إلى ربه وهو ساجد)؟",
    options: ["جملة اسمية في محل نصب حال", "جملة فعلية في محل رفع خبر", "جملة فعلية في محل جر نعت", "جملة اسمية لا محل لها"],
    correctIndex: 0,
    explanation: "(وهو ساجد) جملة اسمية وقعت حالًا، لذا محلها النصب."
  },
  {
    category: "السلامة اللغوية",
    prompt: "ما الموقع الإعرابي للجملة (يصارحك بعيوبك) في: (أفضل الأصدقاء صديق يصارحك بعيوبك)؟",
    options: ["في محل رفع نعت", "في محل نصب حال", "في محل نصب مفعول به", "في محل جر مضاف إليه"],
    correctIndex: 0,
    explanation: "لأنها وصفت اسمًا نكرة هو (صديق)، فهي جملة نعت في محل رفع."
  },
  {
    category: "السلامة اللغوية",
    prompt: "ما الموقع الإعرابي للجملة (غاب عن المدرسة) في: (اتصلت بطالب غاب عن المدرسة أمس)؟",
    options: ["في محل جر نعت", "في محل رفع خبر", "في محل نصب حال", "في محل جزم جواب الشرط"],
    correctIndex: 0,
    explanation: "الجملة وصفت الاسم النكرة (طالب) المجرور، فهي في محل جر نعت."
  },
  {
    category: "السلامة اللغوية",
    prompt: "ما الموقع الإعرابي للجملة (تصدر النتائج غدًا) بعد قولنا: (قال المدير: تصدر النتائج غدًا)؟",
    options: ["في محل نصب مفعول به (مقول القول)", "في محل رفع خبر", "في محل جر نعت", "في محل نصب حال"],
    correctIndex: 0,
    explanation: "الجملة بعد أفعال القول تُعرب في محل نصب مفعولًا به، وتسمى مقول القول."
  },
  {
    category: "السلامة اللغوية",
    prompt: "ما الموقع الإعرابي للجملة (تعود من السفر) في: (سأزورك يوم تعود من السفر)؟",
    options: ["في محل جر مضاف إليه", "في محل رفع خبر", "في محل نصب حال", "في محل جزم جواب شرط"],
    correctIndex: 0,
    explanation: "تقع الجملة بعد الظرف (يوم)، فتكون في محل جر مضاف إليه."
  },
  {
    category: "السلامة اللغوية",
    prompt: "ما الموقع الإعرابي للجملة (فأنت ناجح) في: (إن تدرس فأنت ناجح)؟",
    options: ["في محل جزم جواب الشرط", "في محل نصب مفعول به", "في محل رفع خبر", "في محل جر نعت"],
    correctIndex: 0,
    explanation: "جملة جواب الشرط المقترنة بالفاء تكون في محل جزم جواب الشرط."
  },
  {
    category: "الفهم والاستيعاب",
    prompt: "في أي بيئة دارت أحداث قصة (جابر عثرات الكرام)؟",
    options: ["في مدينة الرقة بالجزيرة الفراتية", "في مكة المكرمة", "في الأندلس", "في بغداد العباسية"],
    correctIndex: 0,
    explanation: "ذكر الكتاب أن أحداث القصة دارت في مدينة الرقة بالجزيرة الفراتية."
  },
  {
    category: "الفهم والاستيعاب",
    prompt: "ما الفكرة المحورية التي تدور حولها قصة (جابر عثرات الكرام)؟",
    options: ["المعروف لا يضيع بين الله والناس", "المال هو أساس السعادة", "العزلة أفضل من الاختلاط", "القوة تغلب كل شيء"],
    correctIndex: 0,
    explanation: "الفكرة المحورية في القصة أن صنائع المعروف تبقى محفوظة ولا تضيع."
  },
  {
    category: "الفهم والاستيعاب",
    prompt: "ما نوع قصة (جابر عثرات الكرام) كما ورد في الشرح؟",
    options: ["قصة تاريخية واقعية", "قصة خيالية رمزية", "مقامة أدبية", "سيرة ذاتية"],
    correctIndex: 0,
    explanation: "نص الشرح على أنها قصة تاريخية واقعية."
  },
  {
    category: "الفهم والاستيعاب",
    prompt: "لماذا أخفى عكرمة الفياض شخصيته عن خزيمة عندما ساعده؟",
    options: ["مراعاة لمشاعره وإخلاصًا لربه", "خوفًا من العقوبة", "ليختبره أمام الناس", "لأنه لم يعرفه"],
    correctIndex: 0,
    explanation: "أخفى شخصيته حفظًا لكرامة خزيمة وإخلاصًا لله تعالى."
  },
  {
    category: "الفهم والاستيعاب",
    prompt: "ما العقدة الرئيسة في قصة (جابر عثرات الكرام)؟",
    options: ["الجهل بحقيقة جابر عثرات الكرام", "ضياع المال فقط", "اختفاء زوجة خزيمة", "رفض الخليفة للعطاء"],
    correctIndex: 0,
    explanation: "العقدة الرئيسة كانت جهل خزيمة بحقيقة من أسدى إليه المعروف."
  },
  {
    category: "الثروة اللغوية",
    prompt: "ما المرادف الصحيح لكلمة (نفد) في درس (جابر عثرات الكرام)؟",
    options: ["فني وانتهى", "تجدد وكثر", "استتر واختفى", "اشتد وقوي"],
    correctIndex: 0,
    explanation: "ورد في الثروة اللغوية أن (نفد) تعني فني وانتهى."
  },
  {
    category: "الثروة اللغوية",
    prompt: "ما المعنى الأقرب للفعل (يتقوت)؟",
    options: ["يأكل ما يقيم به حياته", "يهاجم أعداءه", "يكتب بالقلم", "يخفي ماله"],
    correctIndex: 0,
    explanation: "يتقوت أي يأكل ما يسد رمقه ويقيم حياته."
  },
  {
    category: "الثروة اللغوية",
    prompt: "ما المعنى السياقي للفعل (حمل على صديقه)؟",
    options: ["حقد عليه", "حفظه وصانه", "ساعده وواساه", "ابتعد عنه"],
    correctIndex: 0,
    explanation: "من معاني (حمل) في السياق: حمل الحسود على صديقه أي حقد عليه."
  },
  {
    category: "الفهم والاستيعاب",
    prompt: "ما العلاقة بين عنوان قصيدة (الوحي الخالد) ومضمونها؟",
    options: ["يعكس جمال الطبيعة الذي يخلده الشعر", "يدل على الحزن فقط", "يشير إلى الحرب والبطولة", "يصف رحلة تاريخية"],
    correctIndex: 0,
    explanation: "العنوان انعكاس لمضمون القصيدة التي تخلد وحي الجمال في الطبيعة عبر الشعر."
  },
  {
    category: "الفهم والاستيعاب",
    prompt: "كيف بدت نفس الشاعر في قصيدة (الوحي الخالد)؟",
    options: ["فرحة بالجمال ثم حزينة على زواله", "غاضبة منذ البداية", "خائفة من المجهول", "غير مبالية بالطبيعة"],
    correctIndex: 0,
    explanation: "بدأت نفس الشاعر معجبة مبهورة بالجمال ثم تحولت إلى الحزن عند انقضاء الربيع."
  },
  {
    category: "الفهم والاستيعاب",
    prompt: "ما الفكرة التي تدور حولها الأبيات الأولى من قصيدة (الوحي الخالد)؟",
    options: ["للحسن أثر عظيم في الكون والطبيعة", "التشاؤم من تقلبات الحياة", "الدعوة إلى العزلة", "مدح المال والثراء"],
    correctIndex: 0,
    explanation: "الأبيات الأولى تبرز أثر الجمال في الكون ومظاهر الطبيعة كافة."
  },
  {
    category: "الفهم والاستيعاب",
    prompt: "إلى ماذا يدعو الشاعر في الأبيات الأخيرة من (الوحي الخالد)؟",
    options: ["الاستمتاع بالجمال ما دام متاحًا", "ترك التأمل في الطبيعة", "نسيان الربيع تمامًا", "الابتعاد عن الفن"],
    correctIndex: 0,
    explanation: "يدعو الشاعر إلى اغتنام الجمال قبل زواله بانقضاء الربيع."
  },
  {
    category: "الثروة اللغوية",
    prompt: "ما المرادف الصحيح لكلمة (صوادح) في قصيدة (الوحي الخالد)؟",
    options: ["طيور مغردة", "أزهار متفتحة", "رياح عاصفة", "جبال شاهقة"],
    correctIndex: 0,
    explanation: "الصوادح هي الطيور المغردة ذات الأصوات الجميلة."
  },
  {
    category: "الثروة اللغوية",
    prompt: "ما معنى كلمة (الدجى) في قصيدة (الوحي الخالد)؟",
    options: ["الظلام", "الفجر", "النسيم", "المطر"],
    correctIndex: 0,
    explanation: "الدجى يعني الظلام."
  },
  {
    category: "الثروة اللغوية",
    prompt: "ما المعنى السياقي للفعل (جاشت نفس الطفل)؟",
    options: ["اضطربت وحزنت", "هدأت واطمأنت", "اشتدت وقويت", "غنت وطربت"],
    correctIndex: 0,
    explanation: "ورد في الشرح: جاشت نفس الطفل أي اضطربت وحزنت."
  },
  {
    category: "الفهم والاستيعاب",
    prompt: "ما المقصود بالغبطة في قصيدة (الغبطة فكرة)؟",
    options: ["حسن الحال والفرح والرضا", "الغرور والتكبر", "الحزن الدائم", "الاستسلام لليأس"],
    correctIndex: 0,
    explanation: "الغبطة في القصيدة تعني السرور والسعادة والرضا الداخلي."
  },
  {
    category: "الفهم والاستيعاب",
    prompt: "ما الدافع وراء إنشاد قصيدة (الغبطة فكرة)؟",
    options: ["رؤية الناس في العيد بلا مظاهر فرح والدعوة إلى التفاؤل", "مدح الأثرياء فقط", "الحث على السفر", "وصف معركة تاريخية"],
    correctIndex: 0,
    explanation: "أنشدها الشاعر عندما رأى الناس في العيد غارقين في العبوس والشكوى، فدعاهم إلى التفاؤل."
  },
  {
    category: "الفهم والاستيعاب",
    prompt: "ما الفكرة التي تعبر عنها الأبيات الأولى من (الغبطة فكرة)؟",
    options: ["اختفاء مظاهر السعادة رغم توافر دواعيها", "السعادة في كثرة المال فقط", "الدعوة إلى الهروب من المجتمع", "الإعجاب بالطبيعة وحدها"],
    correctIndex: 0,
    explanation: "الأبيات الأولى تصوّر غياب الفرح وسيطرة الشكوى واليأس على الناس."
  },
  {
    category: "الفهم والاستيعاب",
    prompt: "ما موقف الشاعر من الشاكين والمتشائمين في قصيدة (الغبطة فكرة)؟",
    options: ["يرفض حالهم ويدعوهم إلى الرضا والتفاؤل", "يشجعهم على البكاء", "يعدهم مثالًا يُحتذى", "يدعوهم إلى العزلة"],
    correctIndex: 0,
    explanation: "الشاعر ينكر على المتشائمين حالهم ويدعوهم إلى التفاؤل واغتنام الفرح."
  },
  {
    category: "الثروة اللغوية",
    prompt: "ما المرادف الصحيح لكلمة (مكفهرة) في قصيدة (الغبطة فكرة)؟",
    options: ["عابسة", "مشرقة", "هادئة", "متفائلة"],
    correctIndex: 0,
    explanation: "مكفهرة تعني شديدة العبوس والانقباض."
  },
  {
    category: "الثروة اللغوية",
    prompt: "ما معنى كلمة (القفر) في القصيدة؟",
    options: ["الأرض الخالية", "الحديقة الغناء", "الماء الجاري", "الطريق القصير"],
    correctIndex: 0,
    explanation: "القفر هي الأرض الخالية المقفرة التي لا نبات فيها."
  },
  {
    category: "الثروة اللغوية",
    prompt: "ما المعنى السياقي لعبارة (خلا الرجل بصديقه)؟",
    options: ["انفرد به", "تركه وحيدًا", "خاصمه بشدة", "حمله على كتفيه"],
    correctIndex: 0,
    explanation: "خلا الرجل بصديقه أي انفرد به بعيدًا عن الناس."
  },
  {
    category: "الثروة اللغوية",
    prompt: "ما المرادف الأقرب لكلمة (التبعات) في درس (الإسلام يحارب السلبية)؟",
    options: ["المسؤوليات", "المكاسب", "الأماني", "العوائق"],
    correctIndex: 0,
    explanation: "ورد في الثروة اللغوية للدرس أن التبعات تعني المسؤوليات."
  },
  {
    category: "الثروة اللغوية",
    prompt: "ما المعنى الأقرب للفعل (وطنوا) في درس (الإسلام يحارب السلبية)؟",
    options: ["عوّدوا ودرّبوا", "ابتعدوا وهاجروا", "توقفوا تمامًا", "اختبؤوا"],
    correctIndex: 0,
    explanation: "وطنوا تعني عوّدوا أنفسهم أو دربوها على الأمر."
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
const competitionModeButtons = Array.from(document.querySelectorAll(".competition-mode-btn"));
const teamCountButtons = Array.from(document.querySelectorAll(".team-count-btn"));
const teamNameInputs = Array.from(document.querySelectorAll(".team-name-input"));
const teamSetupSection = document.getElementById("team-setup-section");
const studentSetupSection = document.getElementById("student-setup-section");
const studentCountSelect = document.getElementById("student-count");
const studentNamesInput = document.getElementById("student-names");
const fillStudentsBtn = document.getElementById("fill-students-btn");
const lessonSelect = document.getElementById("lesson-filter");
const lessonFilterInfo = document.getElementById("lesson-filter-info");
const questionCountInput = document.getElementById("question-count");
const questionCountInfo = document.getElementById("question-count-info");
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
const answersContainer = document.getElementById("answers-container");
const feedbackBox = document.getElementById("feedback-box");
const assistBtn = document.getElementById("assist-btn");
const readBtn = document.getElementById("read-btn");
const stopAudioBtn = document.getElementById("stop-audio-btn");
const assistantText = document.getElementById("assistant-text");
const teamsBoard = document.getElementById("teams-board");
const scoreCaption = document.getElementById("score-caption");
const targetSelect = document.getElementById("target-select");
const fastestNameInput = document.getElementById("fastest-name-input");
const participantsList = document.getElementById("participants-list");
const applyTargetBtn = document.getElementById("apply-target-btn");
const randomTargetBtn = document.getElementById("random-target-btn");
const directorNote = document.getElementById("director-note");
const connectionBanner = document.getElementById("connection-banner");
const installSplash = document.getElementById("install-splash");
const installSplashMessage = document.getElementById("install-splash-message");

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
const DEFAULT_STUDENT_COUNT = 10;
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
const DEFAULT_LESSON_TITLE = "الضاد";
const DEFAULT_LEGACY_TITLE = "الإسلام يحارب السلبية";
const DEFAULT_LESSON_SUBTITLE = "تعلم بمرح";
const DEFAULT_SCHOOL_NAME = "مدرسة أكاديمية الموهبة المشتركة";
const DEFAULT_TEACHER_NAME = "معلم اللغة العربية";
const DEFAULT_LOGO_SRC = "school-logo.png";
const GAME_LOGO_SRC = "logo-logo.png?v=2";
const BRANDING_STORAGE_KEY = "arabic-game-branding";
const QUESTIONS_STORAGE_KEY = "arabic-game-custom-questions";
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
  questionLimit: DEFAULT_QUESTIONS_PER_GAME,
  teams: [],
  currentTeamIndex: -1,
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
    updateQuestionCountSetting(Number(questionCountInput?.value || gameState.questionLimit));
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

questionCountInput?.addEventListener("input", () => {
  updateQuestionCountSetting(Number(questionCountInput.value));
});

schoolNameInput.addEventListener("input", updateBranding);
teacherNameInput.addEventListener("input", updateBranding);
logoUploadInput.addEventListener("change", handleLogoUpload);

introContinueBtn?.addEventListener("click", () => showScreen("start"));
introWelcomeBtn?.addEventListener("click", playWelcomeMessage);
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
welcomeBtn?.addEventListener("click", playWelcomeMessage);
resetBrandingBtn.addEventListener("click", resetBrandingToDefaults);
saveQuestionsBtn.addEventListener("click", saveQuestionsFromEditor);
resetQuestionsBtn.addEventListener("click", resetQuestionsToDefaults);
addQuestionBtn.addEventListener("click", addNewQuestion);
assistBtn.addEventListener("click", provideSmartHint);
readBtn.addEventListener("click", readCurrentContent);
stopAudioBtn.addEventListener("click", stopSpeech);
applyTargetBtn?.addEventListener("click", () => {
  applyTargetSelection(undefined, { name: fastestNameInput?.value || "" });
});
randomTargetBtn?.addEventListener("click", applyRandomTarget);
fastestNameInput?.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    applyTargetSelection(undefined, { name: fastestNameInput.value });
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
    showScreen("start");
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
  introLogoImage.src = GAME_LOGO_SRC;
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
  introLogoImage.src = GAME_LOGO_SRC;
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
  introLogoImage.src = GAME_LOGO_SRC;
  localStorage.removeItem(BRANDING_STORAGE_KEY);
  updateBranding();
  assistantText.textContent = "المساعد الذكي: تمت إعادة عنوان الدرس واسم المدرسة واسم المعلم والشعار إلى القيم الافتراضية بنجاح.";
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
    return /الأسلوب|الغرض|العلاقة|وصف/.test(prompt) ? "فنون البلاغة" : "السلامة اللغوية";
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
  const mergedQuestions = [...normalizeQuestionSet(savedQuestions), ...normalizeQuestionSet(defaultQuestions)];
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

function loadSavedQuestions() {
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
  renderQuestionEditor("تم حفظ الأسئلة الجديدة بنجاح، وأصبحت جاهزة للاستخدام في الجولة التالية.", "success");
  updateQuestionCountSetting(Number(questionCountInput?.value || gameState.questionLimit));
}

function resetQuestionsToDefaults() {
  questionBank = cloneDefaultQuestions();
  localStorage.removeItem(QUESTIONS_STORAGE_KEY);
  renderQuestionEditor("تمت استعادة الأسئلة الأصلية الخاصة بالدرس بنجاح.", "success");
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
}

function updateCompetitionMode(mode) {
  gameState.competitionMode = mode === "students" ? "students" : "teams";

  competitionModeButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.competition === gameState.competitionMode);
  });

  teamSetupSection?.classList.toggle("hidden", gameState.competitionMode !== "teams");
  studentSetupSection?.classList.toggle("hidden", gameState.competitionMode !== "students");
  scoreCaption.textContent = gameState.competitionMode === "students" ? "نقاط الطالب" : "نقاط الفريق";

  if (gameState.competitionMode === "students") {
    populateStudentNames(Number(studentCountSelect?.value || DEFAULT_STUDENT_COUNT));
  }

  updateQuestionCountSetting(Number(questionCountInput?.value || gameState.questionLimit));
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

  updateQuestionCountSetting(Number(questionCountInput?.value || gameState.questionLimit));
}

function updateQuestionCountSetting(count) {
  const normalizedCount = Math.min(MAX_QUESTIONS_PER_GAME, Math.max(1, Number(count) || DEFAULT_QUESTIONS_PER_GAME));
  const availableCount = questionBank.filter(matchesMode).length;
  const actualCount = availableCount ? Math.min(normalizedCount, availableCount) : 0;
  const selectedLessonLabel = LESSON_LABELS[gameState.lessonFilter] || LESSON_LABELS[DEFAULT_LESSON_FILTER];

  gameState.questionLimit = normalizedCount;

  if (questionCountInput) {
    questionCountInput.value = String(normalizedCount);
  }

  if (questionCountInfo) {
    questionCountInfo.textContent = availableCount
      ? `سيتم طرح ${actualCount} سؤالًا من ${selectedLessonLabel}${normalizedCount > availableCount ? ` لأن المتاح حاليًا هو ${availableCount} فقط.` : "."}`
      : `لا توجد أسئلة متاحة حاليًا ضمن ${selectedLessonLabel} والمجال المختار.`;
  }
}

function populateStudentNames(count = DEFAULT_STUDENT_COUNT, forceReset = false) {
  if (!studentNamesInput) return;

  const safeCount = Math.min(MAX_STUDENTS, Math.max(1, Number(count) || DEFAULT_STUDENT_COUNT));
  const existingNames = forceReset
    ? []
    : studentNamesInput.value
        .split(/\r?\n/)
        .map((name) => name.trim())
        .filter(Boolean);

  const names = Array.from({ length: safeCount }, (_, index) => existingNames[index] || `الطالب ${index + 1}`);
  studentNamesInput.value = names.join("\n");

  if (studentCountSelect) {
    studentCountSelect.value = String(safeCount);
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
    if (!input.value.trim()) {
      input.value = TEAM_LABELS[index];
    }
  });
}

function startGame() {
  const inputName = playerNameInput.value.trim();
  gameState.playerName = inputName || "حصة اللغة العربية";
  gameState.currentIndex = 0;
  gameState.currentTeamIndex = -1;
  gameState.score = 0;
  gameState.correctAnswers = 0;
  gameState.categoryStats = {};
  gameState.teams = buildParticipants();

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
  gameState.selectedQuestions = shuffleArray(filtered).slice(0, totalQuestionsForRound);

  if (totalQuestionsForRound < gameState.questionLimit) {
    assistantText.textContent = `تم تجهيز ${totalQuestionsForRound} سؤالًا لأن المتاح في الدرس أو المجال المختار أقل من العدد المطلوب.`;
  }

  scoreCaption.textContent = gameState.competitionMode === "students" ? "نقاط الطالب" : "نقاط الفريق";
  renderTargetOptions();
  renderTeamsBoard();
  showScreen("game");
  renderQuestion();
}

function buildParticipants() {
  return gameState.competitionMode === "students" ? buildStudents() : buildTeams();
}

function buildTeams() {
  return teamNameInputs.slice(0, gameState.teamCount).map((input, index) => ({
    name: input.value.trim() || TEAM_LABELS[index],
    score: 0,
    correct: 0
  }));
}

function buildStudents() {
  const desiredCount = Math.min(MAX_STUDENTS, Math.max(1, Number(studentCountSelect?.value || DEFAULT_STUDENT_COUNT)));
  const enteredNames = (studentNamesInput?.value || "")
    .split(/\r?\n/)
    .map((name) => name.trim())
    .filter(Boolean);

  const names = Array.from({ length: desiredCount }, (_, index) => enteredNames[index] || `الطالب ${index + 1}`);

  if (studentNamesInput) {
    studentNamesInput.value = names.join("\n");
  }

  return names.map((name) => ({
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

function setAnswerButtonsEnabled(enabled) {
  Array.from(document.querySelectorAll(".answer-btn")).forEach((button) => {
    button.disabled = gameState.answered ? true : !enabled;
  });
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
  const { announce = true, name = "" } = options;
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
    return;
  }

  gameState.currentTeamIndex = safeIndex;

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

  if (directorNote && announce) {
    directorNote.textContent = `تم تسجيل ${currentTeam.name} كأسرع مجيب لهذا السؤال.`;
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
  applyTargetSelection(randomIndex);

  if (directorNote) {
    directorNote.textContent = `تم تسجيل ${getCurrentTeam().name} كأسرع مجيب بشكل عشوائي.`;
  }
}

function getCompetitionNouns() {
  return gameState.competitionMode === "students"
    ? { singular: "الطالب", plural: "طلاب", boardTitle: "ترتيب الطلاب" }
    : { singular: "الفريق", plural: "فرق", boardTitle: "ترتيب الفرق" };
}

function matchesMode(question) {
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
  gameState.currentTeamIndex = -1;
  gameState.timer = TIME_PER_QUESTION;
  timerLabel.textContent = String(TIME_PER_QUESTION);
  nextBtn.classList.add("hidden");
  feedbackBox.className = "feedback hidden";
  feedbackBox.innerHTML = "";
  assistBtn.disabled = false;
  readBtn.disabled = !speechSupported;
  stopAudioBtn.disabled = !speechSupported;
  readBtn.textContent = "استمع للسؤال";
  if (fastestNameInput) {
    fastestNameInput.value = "";
  }
  assistantText.textContent = speechSupported
    ? "السؤال الآن ظاهر للجميع. سجّل اسم الأسرع أولًا ثم اختر الإجابة لحساب النقاط له."
    : "السؤال الآن ظاهر للجميع. سجّل اسم الأسرع أولًا ثم اختر الإجابة لحساب النقاط له.";

  const question = gameState.selectedQuestions[gameState.currentIndex];
  renderTargetOptions();

  playerLabel.textContent = "بانتظار الأسرع";
  scoreLabel.textContent = "—";
  progressLabel.textContent = `${gameState.currentIndex + 1} / ${gameState.selectedQuestions.length}`;
  progressBar.style.width = `${((gameState.currentIndex + 1) / gameState.selectedQuestions.length) * 100}%`;
  categoryTag.textContent = question.category;

  if (directorNote) {
    const { singular } = getCompetitionNouns();
    directorNote.textContent = `السؤال نفسه ظاهر للجميع. سجّل اسم ${singular} الأسرع أو اضغط على اسمه في اللوحة ثم اختر الإجابة.`;
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

  setAnswerButtonsEnabled(false);

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

  if (/الفكرة|تلخيص|عنوان/.test(prompt)) {
    hints.push("اختر الإجابة الأشمل التي تلخص الفكرة كلها، وليس مثالًا جزئيًا منها.");
  }

  if (/أقرب معنى|ضد كلمة|يدل على/.test(prompt)) {
    hints.push("قارن بين دلالات الكلمات واستبعد الاختيارات البعيدة عن السياق.");
  }

  if (/العلاقة|نتيجة|الغرض|القيمة|أسلوب/.test(prompt)) {
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
    message = `${responderName}: انتهى الوقت على الجميع. الإجابة الصحيحة هي <strong>${question.options[question.correctIndex]}</strong><br><strong>الشرح:</strong> ${question.explanation}<br><strong>توسيع الفكرة:</strong> ${expandedExplanation}`;
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
    message = `${currentTeam.name}: كان الأسرع وأجاب إجابة صحيحة ✅ أضيفت <strong>10</strong> نقاط إلى رصيده.<br><strong>الشرح:</strong> ${question.explanation}<br><strong>توسيع الفكرة:</strong> ${expandedExplanation}`;
    playSuccessSound();
  } else {
    feedbackBox.className = "feedback error";
    message = `${currentTeam.name}: كان الأسرع لكن الإجابة غير صحيحة ❌ الصحيح هو <strong>${question.options[question.correctIndex]}</strong><br><strong>الشرح:</strong> ${question.explanation}<br><strong>توسيع الفكرة:</strong> ${expandedExplanation}`;
    playFailSound();
  }

  assistBtn.disabled = true;
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
  const competitionNouns = getCompetitionNouns();

  finalScore.textContent = `${winner.score} نقطة`;
  finalCorrect.textContent = `${winner.correct} / ${totalQuestions}`;
  finalPercent.textContent = `${percent}%`;

  resultTitle.textContent = `${competitionNouns.singular} الفائز: ${winner.name}`;
  resultSummary.textContent = `${gameState.playerName} انتهت بفوز ${winner.name} بعد منافسة بين ${gameState.teams.length} ${competitionNouns.plural}، بإجمالي ${gameState.score} نقطة و${gameState.correctAnswers} إجابات صحيحة من أصل ${totalQuestions}.`;
  recommendationText.textContent = buildRecommendation(percent, winner.name);
  const lessonTitle = DEFAULT_LESSON_TITLE;
  gameState.winnerAnnouncement = `مبارك لـ${competitionNouns.singular} الفائز: ${winner.name}. لقد حقق ${winner.score} نقطة في لعبة ${lessonTitle}. أحسنتم جميعًا.`;
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
    <h3>${getCompetitionNouns().boardTitle}</h3>
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
  const participantsLabel = gameState.competitionMode === "students" ? "الطلاب" : "الفرق";

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
    chip.addEventListener("click", () => applyTargetSelection(chipIndex));
    chip.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        applyTargetSelection(chipIndex);
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

loadSavedBranding();
loadSavedQuestions();
updateBranding();
updateCompetitionMode(gameState.competitionMode);
updateTeamCount(gameState.teamCount);
populateStudentNames(DEFAULT_STUDENT_COUNT);
updateLessonSelection(gameState.lessonFilter);
updateQuestionCountSetting(DEFAULT_QUESTIONS_PER_GAME);
readBtn.disabled = !speechSupported;
stopAudioBtn.disabled = !speechSupported;
renderLeaderboard();
renderTeamsBoard();
registerPwaSupport();
beginOpeningSequence();
