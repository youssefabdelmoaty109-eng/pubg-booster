(() => {
  "use strict";

  const HISTORY_KEY = "pubg-booster-web.history.v1";
  const SETTINGS_KEY = "pubg-booster-web.settings.v1";
  const PROFILE_KEY = "pubg-booster-web.profile.v1";
  const DEFAULT_ENDPOINT = "https://httpbin.org/status/204?source=pubg-booster-web";
  const MAX_HISTORY = 12;
  const translations = {
    ar: {
      private:"اختباراتك تبقى على جهازك", eyebrow:"أدوات اتصال صادقة للاعبين",
      heroLineOne:"افهم اتصالك.",heroLineTwo:"بدون وعود وهمية.",
      heroDescription:"قِس زمن استجابة المتصفح إلى خادم HTTPS، وراقب التغيّر بعد تعديلاتك اليدوية على الشبكة.",
      honesty:"هذا قياس للمتصفح إلى خادم الاختبار، وليس بنغ خوادم PUBG Mobile. الموقع لا يستطيع تغيير اتصال اللعبة.",
      livePanel:"لوحة القياس",dashboardTitle:"حالة الاتصال",ready:"جاهز للاختبار",running:"جارٍ تنفيذ الاختبار…",done:"اكتمل الاختبار",average:"متوسط الاستجابة",minimum:"الأقل",maximum:"الأعلى",variation:"التذبذب",browserToServer:"المتصفح ← خادم الاختبار",fastestAttempt:"أسرع محاولة ناجحة",slowestAttempt:"أبطأ محاولة ناجحة",standardDeviation:"الانحراف المعياري للتجارب الناجحة",
      testSetup:"إعداد الاختبار",runTest:"اختبر اتصالك",realMeasurement:"قياس حقيقي",endpointLabel:"رابط خادم الاختبار",endpointHint:"استخدم رابط HTTPS عامًا يقبل طلبات GET من المتصفح (CORS). لا تستخدم عنوان خادم PUBG.",attemptCount:"عدد المحاولات",startTest:"ابدأ الاختبار",beforeChange:"قياس قبل التغيير",afterChange:"قياس بعد التغيير",testFootnote:"القياس حتى وصول ترويسات الاستجابة؛ قد تختلف النتيجة بحسب الشبكة والمتصفح والخادم.",
      lastRun:"الاختبار الحالي",responseTrend:"محاولات الاستجابة",chartEmpty:"ستظهر نتائج القياس هنا",successful:"ناجحة",failed:"فاشلة",chartOnlyReal:"النتائج الفعلية فقط",
      manualComparison:"مقارنة يدوية",compareNetwork:"قارن قبل وبعد تعديل الشبكة",compareIntro:"شغّل قياس «قبل التغيير»، عدّل إعدادًا يدويًا مثل الاقتراب من الراوتر، ثم شغّل «بعد التغيير» على نفس الخادم وعدد المحاولات.",beforeLabel:"قبل التغيير",afterLabel:"بعد التغيير",awaitingMeasure:"بانتظار القياس",changeLabel:"الفرق",compareCaveat:"مقارنة وصفية بين قياسين للمتصفح؛ لا تثبت تغيّر بنغ اللعبة. أعد القياس أكثر من مرة إذا كانت النتائج متذبذبة.",
      practicalTips:"خطوات عملية",guidanceTitle:"جرّب هذه الخطوات",tipsDefault:"ابدأ بقياس الاتصال، ثم جرّب تحسينات بسيطة يدويًا وأعد القياس للمقارنة.",tipDefault1:"اقترب من الراوتر، أو جرّب نطاق Wi‑Fi مختلفًا إن كان متاحًا.",tipDefault2:"أوقف التنزيلات والبث على الأجهزة الأخرى مؤقتًا.",tipDefault3:"أعد تشغيل الراوتر إذا استمر التقطّع، ثم قارن النتائج مرة أخرى.",noMagic:"التغييرات على الشبكة يدوية؛ هذه الصفحة لا تغيّر إعدادات هاتفك أو اللعبة.",
      savedOnDevice:"محفوظ على جهازك",recentHistory:"سجل الاختبارات",clearHistory:"مسح السجل",historyEmpty:"لا توجد اختبارات محفوظة بعد",localOnly:"تُحفظ النتائج محليًا في هذا المتصفح فقط.",footerNote:"أداة تشخيص عامة — ليست منتجًا رسميًا من PUBG أو Tencent.",
      tipHigh1:"تحقّق من قوة إشارة Wi‑Fi، وجرّب الاقتراب من الراوتر أو استخدام نطاق أقل ازدحامًا.",tipHigh2:"أوقف التنزيلات والبث المرئي مؤقتًا على الأجهزة المتصلة بالشبكة.",tipHigh3:"أعد تشغيل الراوتر، أو تواصل مع مزوّد الخدمة إذا تكرر البطء على أكثر من جهاز.",
      tipVar1:"تذبذب القياس قد ينتج عن ازدحام مؤقت أو إشارة Wi‑Fi غير مستقرة.",tipVar2:"جرّب إعادة الاختبار في وقت آخر وعلى نفس الخادم للمقارنة.",tipVar3:"إن أمكن، قلّل المسافة والحواجز بين الهاتف والراوتر.",
      tipStable1:"جرّب اختبارًا إضافيًا وقت استخدام الشبكة المعتاد لديك.",tipStable2:"قارن إعدادات الشبكة يدويًا باستخدام نفس الخادم وعدد المحاولات.",tipStable3:"هذا القياس لا يغني عن بيانات الشبكة داخل اللعبة.",comparisonMismatch:"للمقارنة العادلة، استخدم نفس رابط الخادم وعدد المحاولات كما في قياس «قبل التغيير».",
      invalidUrl:"أدخل رابط HTTPS صالحًا لخادم اختبار يقبل طلب GET وطلبات CORS.",failedAll:"لم تنجح أي محاولة. تحقّق من الإنترنت، والرابط، ومن سماح الخادم بطلبات CORS.",partial:"نجحت {ok} من {total} محاولات. قد يكون الخادم لا يدعم CORS أو أن الشبكة انقطعت.",finished:"اكتمل القياس: {ok} ناجحة و{bad} فاشلة.",timeout:"انتهت مهلة الطلب. قد يكون الخادم بطيئًا أو الشبكة غير متاحة.",networkError:"تعذّر الوصول إلى خادم الاختبار. قد يكون السبب انقطاع الشبكة أو حظر CORS أو رابطًا غير صالح.",httpError:"ردّ الخادم بحالة HTTP {status}؛ لم تُحتسب هذه المحاولة ناجحة.",failedLabel:"فشل",historyConfirm:"هل تريد حذف سجل القياسات المحفوظ على هذا المتصفح؟",historyCleared:"تم مسح السجل المحلي.",beforeSaved:"المتوسط قبل التغيير",afterSaved:"المتوسط بعد التغيير",comparisonNeedBefore:"شغّل «قياس قبل التغيير» أولًا، ثم أجرِ التعديل اليدوي.",comparisonNeedValid:"لم يتوفر متوسط صالح للمقارنة. أعد الاختبار بنجاح.",lowerBy:"أقل بـ {n} ms",higherBy:"أعلى بـ {n} ms",same:"لا فرق ملحوظ",sameRun:"الاختبار",attempt:"محاولة",attempts:"محاولات",ms:"ms",timeLocale:"ar-KW",language:"EN",clearButton:"مسح السجل",countDecrease:"تقليل عدد المحاولات",countIncrease:"زيادة عدد المحاولات",countAria:"عدد المحاولات",chartAria:"رسم نتائج المحاولات",networkAdviceHigh:"الاستجابة إلى خادم الاختبار مرتفعة في هذه الجولة. جرّب النصائح أدناه ثم قارن على نفس الخادم.",networkAdviceVar:"الاستجابة متذبذبة في هذه الجولة. جرّب النصائح أدناه وأعد القياس في ظروف مشابهة.",networkAdviceOk:"الاستجابة كانت متقاربة في هذه الجولة. يمكنك مقارنة إعداد يدوي آخر عند الحاجة.",historySuccess:"ناجح",historyFailure:"فاشل",invalidResponse:"ردّ HTTP غير ناجح",attemptLabel:"المحاولة",latencyDescription:"زمن استجابة المتصفح إلى خادم الاختبار",comparisonNoData:"—",countUnit:"محاولة"
    },
    en: {
      private:"Tests stay on your device",eyebrow:"Honest connection tools for players",
      heroLineOne:"Understand your connection.",heroLineTwo:"No empty promises.",
      heroDescription:"Measure browser response time to an HTTPS test server, then compare after manually changing your network.",
      honesty:"This measures your browser to the test server—not PUBG Mobile server ping. A website cannot change the game's connection.",
      livePanel:"DIAGNOSTICS",dashboardTitle:"Connection status",ready:"Ready to test",running:"Running test…",done:"Test complete",average:"Average response",minimum:"Minimum",maximum:"Maximum",variation:"Variation",browserToServer:"Browser ← test server",fastestAttempt:"Fastest successful attempt",slowestAttempt:"Slowest successful attempt",standardDeviation:"Standard deviation of successful tests",
      testSetup:"TEST SETUP",runTest:"Check your connection",realMeasurement:"REAL MEASUREMENT",endpointLabel:"Test server URL",endpointHint:"Use a public HTTPS URL that accepts browser GET requests (CORS). Do not use a PUBG server address.",attemptCount:"Number of attempts",startTest:"Start test",beforeChange:"Measure before change",afterChange:"Measure after change",testFootnote:"Measured until response headers arrive; results vary by network, browser, and server.",
      lastRun:"CURRENT RUN",responseTrend:"Response attempts",chartEmpty:"Measurement results will appear here",successful:"Success",failed:"Failed",chartOnlyReal:"Real results only",
      manualComparison:"MANUAL COMPARISON",compareNetwork:"Compare before and after a network change",compareIntro:"Run “Measure before change,” manually adjust a setting such as moving closer to your router, then run “Measure after change” using the same server and attempt count.",beforeLabel:"Before change",afterLabel:"After change",awaitingMeasure:"Waiting for measurement",changeLabel:"Difference",compareCaveat:"This describes two browser measurements; it does not prove a change in game ping. Repeat tests if results vary.",
      practicalTips:"PRACTICAL STEPS",guidanceTitle:"Try these steps",tipsDefault:"Measure first, try simple manual adjustments, then measure again to compare.",tipDefault1:"Move closer to the router or try another Wi-Fi band if available.",tipDefault2:"Pause downloads and streaming on other devices temporarily.",tipDefault3:"Restart the router if interruptions continue, then compare again.",noMagic:"Network changes are manual; this page does not change your phone or game settings.",
      savedOnDevice:"SAVED ON YOUR DEVICE",recentHistory:"Test history",clearHistory:"Clear history",historyEmpty:"No saved tests yet",localOnly:"Results are saved only in this browser.",footerNote:"General diagnostic tool—not an official PUBG or Tencent product.",
      tipHigh1:"Check Wi-Fi signal strength. Move closer to the router or try a less congested band.",tipHigh2:"Temporarily pause downloads and video streaming on other devices.",tipHigh3:"Restart the router, or contact your ISP if multiple devices stay slow.",
      tipVar1:"Variation can come from temporary congestion or an unstable Wi-Fi signal.",tipVar2:"Repeat the test at another time using the same server.",tipVar3:"If possible, reduce distance and obstacles between your phone and router.",
      tipStable1:"Try another test during your usual network usage.",tipStable2:"Compare manual network changes using the same server and attempt count.",tipStable3:"This measurement does not replace in-game network data.",comparisonMismatch:"For a fair comparison, use the same test URL and attempt count as the “before change” run.",
      invalidUrl:"Enter a valid HTTPS URL for a test server that accepts GET and CORS requests.",failedAll:"No attempts succeeded. Check your internet, URL, and whether the server allows CORS.",partial:"{ok} of {total} attempts succeeded. The server may not support CORS or the network may have dropped.",finished:"Measurement complete: {ok} succeeded and {bad} failed.",timeout:"The request timed out. The server may be slow or unavailable.",networkError:"Could not reach the test server. The network, CORS policy, or URL may be the cause.",httpError:"The server responded with HTTP {status}; this attempt was not counted as successful.",failedLabel:"Failed",historyConfirm:"Delete the locally saved test history from this browser?",historyCleared:"Local history cleared.",beforeSaved:"Average before change",afterSaved:"Average after change",comparisonNeedBefore:"Run “Measure before change” first, then make your manual adjustment.",comparisonNeedValid:"No valid average is available for comparison. Run a successful test first.",lowerBy:"{n} ms lower",higherBy:"{n} ms higher",same:"No measurable difference",sameRun:"Test",attempt:"Attempt",attempts:"attempts",ms:"ms",timeLocale:"en",language:"عربي",clearButton:"Clear history",countDecrease:"Decrease number of attempts",countIncrease:"Increase number of attempts",countAria:"Number of attempts",chartAria:"Attempt results chart",networkAdviceHigh:"Response to the test server was elevated in this run. Try the tips below and compare using the same server.",networkAdviceVar:"Response varied in this run. Try the tips below and repeat under similar conditions.",networkAdviceOk:"Response was consistent in this run. Compare another manual setting if useful.",historySuccess:"Success",historyFailure:"Failed",invalidResponse:"Unsuccessful HTTP response",attemptLabel:"Attempt",latencyDescription:"Browser response time to test server",comparisonNoData:"—",countUnit:"attempt"
    }
  };
  Object.assign(translations.ar, {
    appTitle:"PUBG Booster — GearUP Style",installApp:"تثبيت",installedApp:"مثبّت",installPrompted:"تم إرسال طلب التثبيت إلى المتصفح.",installedMessage:"تم تثبيت PUBG Booster.",installInstructions:"على Android، افتح قائمة Chrome ⋮ ثم اختر «تثبيت التطبيق» أو «إضافة إلى الشاشة الرئيسية». يلزم فتح الموقع عبر HTTPS.",
    eyebrow:"تشخيص اتصال واضح للاعبين",heroLineOne:"حلّل اتصالك.",heroLineTwo:"وحسّن الشبكة يدويًا.",heroDescription:"اختبارات HTTPS حقيقية، ومقارنة قبل وبعد تغييراتك على Wi‑Fi — دون تعديل اللعبة أو تغيير مسار اتصالها.",honesty:"القياس من المتصفح إلى خادم الاختبار، وليس بنغ PUBG Mobile. صفحة ويب لا تغيّر اتصال اللعبة ولا توجّهه عبر VPN.",footerNote:"أداة مستقلة للتشخيص؛ ليست منتجًا رسميًا من PUBG أو Tencent أو GearUP.",
    jitterLabel:"التذبذب (Jitter)",jitterCaption:"متوسط فرق النتائج الناجحة المتتالية",failureRate:"نسبة فشل الطلبات",failureRateCaption:"فشل طلبات الاختبار؛ ليس فقدان حزم اللعبة",
    profileKicker:"إعدادات هذا الجهاز",profileTitle:"ملف الاختبار",profileIntro:"تُحفظ هذه التفاصيل على جهازك لتخصيص العرض فقط، ولا تُرسل إلى خادم الاختبار.",gameName:"اسم اللعبة",deviceName:"اسم الجهاز",savedLocally:"يُحفظ محليًا",
    explainKicker:"افهم الأرقام",explainTitle:"ماذا تعني النتائج — وماذا لا تعني؟",explainLatencyTitle:"زمن الاستجابة",explainLatency:"الوقت من إرسال المتصفح طلب HTTPS حتى وصول ترويسات الرد من الخادم المختار. يتأثر بالواي فاي ومزوّد الخدمة والمسار والمتصفح وحمل الخادم.",explainJitterTitle:"التذبذب",explainJitter:"متوسط الفرق المطلق بين نتيجتين ناجحتين متتاليتين. يحتاج إلى محاولتين ناجحتين متجاورتين على الأقل؛ لذلك قد يظهر «—» عند قلة البيانات.",explainFailureTitle:"فشل الطلبات",explainFailure:"النسبة تحسب طلبات الاختبار التي انتهت بخطأ HTTP أو تعذّر وصولها أو انتهت مهلتها. حظر CORS قد يبدو كخطأ شبكة. هذه ليست قراءة من داخل اللعبة ولا قياسًا مؤكدًا لفقدان حزم PUBG.",explainGameTitle:"اتصال اللعبة",explainGame:"المتصفح وتطبيق PUBG مساران منفصلان. تسريع شبيه بـ GearUP يحتاج مكوّنًا مناسبًا على الجهاز وخوادم وسيطة وتكاملًا فعليًا؛ هذه النسخة لا تنفذ VPN أو توجيهًا أو تعديلًا لملفات اللعبة.",
    profileSaved:"تم حفظ الإعدادات على هذا الجهاز.",profileSaving:"جارٍ الحفظ على هذا الجهاز…",installNotAvailable:"التثبيت المباشر غير متاح في هذا المتصفح الآن؛ استخدم قائمة Chrome على Android لإضافة الصفحة إلى الشاشة الرئيسية.",
    tipDefault1:"جرّب نطاق Wi‑Fi ‏5GHz إذا كان الراوتر والهاتف يدعمانه، أو اقترب من الراوتر.",tipDefault2:"أوقف التنزيلات والبث على الأجهزة الأخرى مؤقتًا.",tipHigh1:"تحقّق من الإشارة، وجرّب Wi‑Fi ‏5GHz عند توفره أو اقترب من الراوتر.",tipVar1:"قد ينتج التذبذب عن ازدحام مؤقت أو إشارة Wi‑Fi غير مستقرة. جرّب 5GHz إذا كان متاحًا."
  });
  Object.assign(translations.en, {
    appTitle:"PUBG Booster — GearUP Style",installApp:"Install",installedApp:"Installed",installPrompted:"The browser received the install request.",installedMessage:"PUBG Booster was installed.",installInstructions:"On Android, open Chrome’s ⋮ menu and choose “Install app” or “Add to Home screen.” The site must be opened over HTTPS.",
    eyebrow:"Clear connection diagnostics for players",heroLineOne:"Analyze your connection.",heroLineTwo:"Tune your network manually.",heroDescription:"Real HTTPS tests and before/after comparisons for Wi-Fi changes—without modifying the game or routing its traffic.",honesty:"This measures browser-to-test-server response, not PUBG Mobile ping. A website cannot change the game’s connection or route it through a VPN.",footerNote:"Independent diagnostic tool—not an official PUBG, Tencent, or GearUP product.",
    jitterLabel:"Jitter",jitterCaption:"Mean change between adjacent successful results",failureRate:"Request failure rate",failureRateCaption:"Failed test requests—not game packet loss",
    profileKicker:"THIS DEVICE",profileTitle:"Test profile",profileIntro:"Saved on this device to personalize the display only; never sent to the test server.",gameName:"Game name",deviceName:"Device name",savedLocally:"Saved locally",
    explainKicker:"READ THE METRICS",explainTitle:"What do these results mean—and not mean?",explainLatencyTitle:"Response time",explainLatency:"Time from the browser sending an HTTPS request until response headers arrive from the selected server. Wi-Fi, ISP, route, browser, and server load all affect it.",explainJitterTitle:"Jitter",explainJitter:"Mean absolute difference between adjacent successful results. It needs at least two neighboring successful attempts; otherwise it shows “—”.",explainFailureTitle:"Failed requests",explainFailure:"This percentage counts test requests that returned an HTTP error, could not be reached, or timed out. CORS blocking can look like a network error. It is not measured inside the game and is not confirmed PUBG packet loss.",explainGameTitle:"Game connection",explainGame:"The browser and PUBG app use separate network paths. GearUP-like acceleration requires a suitable on-device component, relay servers, and real integration. This version does not implement a VPN, routing, or game-file changes.",
    profileSaved:"Settings saved on this device.",profileSaving:"Saving on this device…",installNotAvailable:"Direct installation is not available in this browser right now. On Android, use Chrome’s menu to add this page to your home screen.",
    tipDefault1:"Try 5 GHz Wi-Fi if both your router and phone support it, or move closer to the router.",tipDefault2:"Temporarily pause downloads and streaming on other devices.",tipHigh1:"Check signal strength; try 5 GHz Wi-Fi if available or move closer to the router.",tipVar1:"Variation may come from temporary congestion or unstable Wi-Fi. Try 5 GHz if available."
  });

  const $ = (id) => document.getElementById(id);
  const els = {
    endpoint:$("endpointInput"),count:$("countInput"),run:$("runButton"),before:$("beforeButton"),after:$("afterButton"),
    statusPill:$("statusPill"),statusText:$("statusText"),feedback:$("feedback"),chart:$("chartArea"),
    successCount:$("successCount"),failureCount:$("failureCount"),history:$("historyList"),clearHistory:$("clearHistory"),
    comparisonResult:$("comparisonResult"),tipsIntro:$("tipsIntro"),tipsList:$("tipsList"),
    gameName:$("gameNameInput"),deviceName:$("deviceNameInput"),profileSummary:$("profileSummary"),
    profileSaveState:$("profileSaveState"),install:$("installButton")
  };
  let lang = "ar";
  try { lang = localStorage.getItem("pubg-booster-web.language") === "en" ? "en" : "ar"; } catch {}
  let history = readHistory();
  let comparison = { before: null, after: null };
  let deferredInstallPrompt = null;
  let profileSaveTimer = 0;

  function t(key, values = {}) {
    let text = translations[lang][key] || translations.ar[key] || key;
    for (const [name, value] of Object.entries(values)) text = text.replaceAll(`{${name}}`, String(value));
    return text;
  }
  function readHistory() {
    try {
      const parsed = JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
      return Array.isArray(parsed) ? parsed.filter(item => item && typeof item === "object").slice(0, MAX_HISTORY) : [];
    } catch { return []; }
  }
  function saveSettings() {
    try { localStorage.setItem(SETTINGS_KEY, JSON.stringify({ endpoint: els.endpoint.value, count: clampCount(els.count.value) })); } catch {}
  }
  function loadSettings() {
    try {
      const saved = JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}");
      if (typeof saved.endpoint === "string" && saved.endpoint.startsWith("https://")) els.endpoint.value = saved.endpoint;
      if (saved.count) els.count.value = clampCount(saved.count);
    } catch {}
  }
  function loadProfile() {
    try {
      const saved = JSON.parse(localStorage.getItem(PROFILE_KEY) || "{}");
      if (typeof saved.gameName === "string" && saved.gameName.trim()) els.gameName.value = saved.gameName.slice(0, 40);
      if (typeof saved.deviceName === "string" && saved.deviceName.trim()) els.deviceName.value = saved.deviceName.slice(0, 60);
    } catch {}
    renderProfile();
  }
  function renderProfile() {
    const game = els.gameName.value.trim() || (lang === "ar" ? "لعبة" : "Game");
    const device = els.deviceName.value.trim() || (lang === "ar" ? "جهاز" : "Device");
    els.profileSummary.textContent = `${game} · ${device}`;
  }
  function saveProfile() {
    renderProfile();
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify({
        gameName: els.gameName.value.trim().slice(0, 40),
        deviceName: els.deviceName.value.trim().slice(0, 60)
      }));
      els.profileSaveState.textContent = t("profileSaved");
    } catch {
      els.profileSaveState.textContent = t("savedLocally");
    }
  }
  function clampCount(value) {
    const n = Number.parseInt(value, 10);
    return Number.isFinite(n) ? Math.max(1, Math.min(20, n)) : 5;
  }
  function renderLanguage() {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.title = t("appTitle");
    document.querySelectorAll("[data-i18n]").forEach(node => {
      const key = node.dataset.i18n;
      if (translations[lang][key]) node.textContent = t(key);
    });
    $("languageToggle").textContent = `${t("language")} ↗`;
    $("languageToggle").setAttribute("aria-label", lang === "ar" ? "Switch language" : "تغيير اللغة");
    $("decreaseCount").setAttribute("aria-label", t("countDecrease"));
    $("increaseCount").setAttribute("aria-label", t("countIncrease"));
    els.count.setAttribute("aria-label", t("countAria"));
    els.chart.setAttribute("aria-label", t("chartAria"));
    els.clearHistory.setAttribute("aria-label", t("clearButton"));
    els.install.setAttribute("aria-label", t("installApp"));
    renderHistory();
    renderProfile();
    if (!els.chart.dataset.hasResults) renderChart([]);
    updateComparisonView();
  }
  function setStatus(kind, key) {
    els.statusPill.className = `status-pill${kind ? ` ${kind}` : ""}`;
    els.statusText.textContent = t(key);
  }
  function showFeedback(message, kind = "") {
    els.feedback.textContent = message;
    els.feedback.className = `feedback${kind ? ` ${kind}` : ""}`;
    els.feedback.hidden = false;
  }
  function clearFeedback() {
    els.feedback.hidden = true;
    els.feedback.textContent = "";
    els.feedback.className = "feedback";
  }
  function validEndpoint() {
    try {
      const url = new URL(els.endpoint.value.trim());
      return url.protocol === "https:" && Boolean(url.hostname);
    } catch { return false; }
  }
  function makeTestUrl(base, runId, attemptIndex) {
    const url = new URL(base);
    url.searchParams.set("_pbw", `${runId}-${attemptIndex}-${Date.now()}`);
    return url.href;
  }
  async function measureOne(base, runId, index) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    const start = performance.now();
    try {
      const response = await fetch(makeTestUrl(base, runId, index), {
        method: "GET", mode: "cors", cache: "no-store", credentials: "omit", redirect: "follow",
        signal: controller.signal, headers: { "Accept": "*/*" }
      });
      const ms = performance.now() - start;
      if (!response.ok) return { ok: false, ms, status: response.status, reason: "http" };
      return { ok: true, ms, status: response.status };
    } catch (error) {
      return { ok: false, ms: performance.now() - start, reason: error && error.name === "AbortError" ? "timeout" : "network" };
    } finally {
      clearTimeout(timeout);
    }
  }
  function stats(results) {
    const values = results.filter(x => x.ok).map(x => x.ms);
    const pairs = [];
    for (let i = 1; i < results.length; i++) {
      if (results[i - 1].ok && results[i].ok) pairs.push(Math.abs(results[i].ms - results[i - 1].ms));
    }
    const avg = values.length ? values.reduce((a,b) => a+b,0) / values.length : null;
    const bad = results.length - values.length;
    return {
      avg, min: values.length ? Math.min(...values) : null, max: values.length ? Math.max(...values) : null,
      jitter: pairs.length ? pairs.reduce((a,b) => a+b,0) / pairs.length : null,
      failureRate: results.length ? bad / results.length * 100 : null,
      ok: values.length, bad, total: results.length
    };
  }
  function formatMs(value) { return Number.isFinite(value) ? String(Math.round(value)) : "—"; }
  function updateMetrics(summary) {
    $("averageValue").textContent = summary && summary.ok ? formatMs(summary.avg) : "—";
    $("minimumValue").textContent = summary && summary.ok ? formatMs(summary.min) : "—";
    $("maximumValue").textContent = summary && summary.ok ? formatMs(summary.max) : "—";
    $("jitterValue").textContent = summary && Number.isFinite(summary.jitter) ? formatMs(summary.jitter) : "—";
    $("failureRateValue").textContent = summary && Number.isFinite(summary.failureRate) ? formatMs(summary.failureRate) : "—";
  }
  function renderChart(results) {
    els.chart.dataset.hasResults = results.length ? "true" : "";
    els.successCount.textContent = results.filter(x => x.ok).length;
    els.failureCount.textContent = results.filter(x => !x.ok).length;
    if (!results.length) {
      els.chart.innerHTML = `<div class="chart-empty"><span class="empty-orbit">⌁</span><span>${t("chartEmpty")}</span></div>`;
      return;
    }
    const max = Math.max(1, ...results.filter(x => x.ok).map(x => x.ms));
    els.chart.innerHTML = results.map((item, i) => {
      const height = item.ok ? Math.max(8, item.ms / max * 82) : 10;
      const label = item.ok ? `${Math.round(item.ms)} ${t("ms")}` : t("failedLabel");
      return `<div class="bar-item" title="${t("attempt")} ${i + 1}: ${label}"><span class="bar-value" style="--bar-height:${height}%">${item.ok ? Math.round(item.ms) : "×"}</span><div class="bar${item.ok ? "" : " failed"}" style="height:${height}%"></div><span class="bar-label">${i + 1}</span></div>`;
    }).join("");
  }
  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, char => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[char]));
  }
  function renderHistory() {
    if (!history.length) {
      els.history.innerHTML = `<div class="history-empty"><span aria-hidden="true">◷</span><span>${t("historyEmpty")}</span></div>`;
      return;
    }
    els.history.innerHTML = history.map(item => {
      const date = new Date(item.time);
      const when = Number.isNaN(date.getTime()) ? "" : new Intl.DateTimeFormat(t("timeLocale"), { dateStyle:"medium", timeStyle:"short" }).format(date);
      const avg = Number.isFinite(item.avg) ? `${formatMs(item.avg)} ms` : t("failedLabel");
      const result = `${item.ok || 0}/${item.total || 0}`;
      const failure = Number.isFinite(item.failureRate) ? ` · ${formatMs(item.failureRate)}%` : "";
      return `<div class="history-item"><span class="history-time">${escapeHtml(when)}</span><span class="history-result">${escapeHtml(avg)}</span><span class="history-meta">${escapeHtml(item.label || t("sameRun"))} · ${escapeHtml(result)} ${t("attempts")}${escapeHtml(failure)}</span><span class="history-meta">${escapeHtml(item.endpoint || "")}</span></div>`;
    }).join("");
  }
  function persistHistory() {
    try { localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, MAX_HISTORY))); } catch {}
    renderHistory();
  }
  function updateComparisonView() {
    $("beforeValue").textContent = comparison.before ? `${formatMs(comparison.before.avg)} ms` : "—";
    $("afterValue").textContent = comparison.after ? `${formatMs(comparison.after.avg)} ms` : "—";
    $("beforeMeta").textContent = comparison.before ? `${t("beforeSaved")} · ${comparison.before.ok}/${comparison.before.total}` : t("awaitingMeasure");
    $("afterMeta").textContent = comparison.after ? `${t("afterSaved")} · ${comparison.after.ok}/${comparison.after.total}` : t("awaitingMeasure");
    els.comparisonResult.className = "comparison-result";
    if (!comparison.before || !comparison.after) {
      $("differenceValue").textContent = "—";
      return;
    }
    const diff = comparison.after.avg - comparison.before.avg;
    if (Math.abs(diff) < 0.5) {
      $("differenceValue").textContent = t("same");
    } else if (diff < 0) {
      $("differenceValue").textContent = t("lowerBy", { n: formatMs(Math.abs(diff)) });
      els.comparisonResult.classList.add("better");
    } else {
      $("differenceValue").textContent = t("higherBy", { n: formatMs(diff) });
      els.comparisonResult.classList.add("worse");
    }
  }
  function updateTips(summary) {
    if (!summary || !summary.ok) {
      els.tipsIntro.textContent = t("tipsDefault");
      els.tipsList.innerHTML = `<li><span class="tip-number">01</span><span>${t("tipDefault1")}</span></li><li><span class="tip-number">02</span><span>${t("tipDefault2")}</span></li><li><span class="tip-number">03</span><span>${t("tipDefault3")}</span></li>`;
      return;
    }
    let intro, tips;
    if (summary.avg > 180) {
      intro = t("networkAdviceHigh");
      tips = [t("tipHigh1"), t("tipHigh2"), t("tipHigh3")];
    } else if (Number.isFinite(summary.jitter) && summary.jitter > Math.max(30, summary.avg * 0.35)) {
      intro = t("networkAdviceVar");
      tips = [t("tipVar1"), t("tipVar2"), t("tipVar3")];
    } else {
      intro = t("networkAdviceOk");
      tips = [t("tipStable1"), t("tipStable2"), t("tipStable3")];
    }
    els.tipsIntro.textContent = intro;
    els.tipsList.innerHTML = tips.map((tip, i) => `<li><span class="tip-number">0${i + 1}</span><span>${tip}</span></li>`).join("");
  }
  function showMeasurementError(results, summary) {
    if (!summary.ok) {
      const timedOut = results.some(x => x.reason === "timeout");
      const httpFailure = results.find(x => x.reason === "http");
      const message = timedOut ? t("timeout") : (httpFailure && results.every(x => x.reason === "http"))
        ? t("httpError", { status: httpFailure.status }) : t("networkError");
      showFeedback(message, "error");
      setStatus("has-error", "ready");
    } else if (summary.bad) {
      showFeedback(t("partial", { ok: summary.ok, total: results.length }), "error");
      setStatus("has-error", "done");
    } else {
      showFeedback(t("finished", { ok: summary.ok, bad: summary.bad }), "success");
      setStatus("is-done", "done");
    }
  }
  async function runTest(mode = "normal") {
    clearFeedback();
    if (!validEndpoint()) {
      showFeedback(t("invalidUrl"), "error");
      els.endpoint.focus();
      return;
    }
    const count = clampCount(els.count.value);
    els.count.value = count;
    saveSettings();
    const base = els.endpoint.value.trim();
    if (mode === "before") {
      comparison.before = null;
      comparison.after = null;
      updateComparisonView();
    } else if (mode === "after") {
      if (!comparison.before) {
        showFeedback(t("comparisonNeedBefore"), "error");
        return;
      }
      if (comparison.before.endpoint !== base || comparison.before.count !== count) {
        showFeedback(t("comparisonMismatch"), "error");
        return;
      }
      comparison.after = null;
      updateComparisonView();
    }
    const runId = `${Date.now()}-${Math.floor(Math.random() * 1e7)}`;
    els.run.disabled = els.before.disabled = els.after.disabled = true;
    setStatus("is-running", "running");
    const results = [];
    updateMetrics(null);
    renderChart([]);
    for (let i = 0; i < count; i++) {
      results.push(await measureOne(base, runId, i));
      renderChart(results);
      if (i < count - 1) await new Promise(resolve => setTimeout(resolve, 220));
    }
    const summary = stats(results);
    updateMetrics(summary);
    updateTips(summary);
    showMeasurementError(results, summary);
    if (summary.ok) {
      if (mode === "before") {
        comparison.before = { avg: summary.avg, ok: summary.ok, total: results.length, endpoint: base, count };
        comparison.after = null;
      } else if (mode === "after") {
        comparison.after = { avg: summary.avg, ok: summary.ok, total: results.length, endpoint: base, count };
      }
      updateComparisonView();
    } else if (mode === "after" && !comparison.before) {
      showFeedback(t("comparisonNeedBefore"), "error");
    }
    const label = mode === "before" ? t("beforeLabel") : mode === "after" ? t("afterLabel") : t("sameRun");
    history.unshift({ time: new Date().toISOString(), avg: summary.ok ? summary.avg : null, jitter: summary.jitter, failureRate: summary.failureRate, ok: summary.ok, total: results.length, endpoint: new URL(base).hostname, label });
    history = history.slice(0, MAX_HISTORY);
    persistHistory();
    els.run.disabled = els.before.disabled = els.after.disabled = false;
  }
  $("languageToggle").addEventListener("click", () => {
    lang = lang === "ar" ? "en" : "ar";
    try { localStorage.setItem("pubg-booster-web.language", lang); } catch {}
    renderLanguage();
  });
  els.run.addEventListener("click", () => runTest("normal"));
  els.before.addEventListener("click", () => runTest("before"));
  els.after.addEventListener("click", () => {
    if (!comparison.before) {
      showFeedback(t("comparisonNeedBefore"), "error");
      return;
    }
    runTest("after");
  });
  $("decreaseCount").addEventListener("click", () => { els.count.value = Math.max(1, clampCount(els.count.value) - 1); saveSettings(); });
  $("increaseCount").addEventListener("click", () => { els.count.value = Math.min(20, clampCount(els.count.value) + 1); saveSettings(); });
  els.count.addEventListener("change", () => { els.count.value = clampCount(els.count.value); saveSettings(); });
  els.endpoint.addEventListener("change", saveSettings);
  els.clearHistory.addEventListener("click", () => {
    if (!history.length) return;
    if (window.confirm(t("historyConfirm"))) {
      history = [];
      try { localStorage.removeItem(HISTORY_KEY); } catch {}
      renderHistory();
      showFeedback(t("historyCleared"), "success");
    }
  });

  const scheduleProfileSave = () => {
    renderProfile();
    els.profileSaveState.textContent = t("profileSaving");
    clearTimeout(profileSaveTimer);
    profileSaveTimer = setTimeout(saveProfile, 350);
  };
  els.gameName.addEventListener("input", scheduleProfileSave);
  els.deviceName.addEventListener("input", scheduleProfileSave);

  const standalone = () => window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
  const refreshInstallButton = () => {
    if (standalone()) {
      els.install.textContent = t("installedApp");
      els.install.disabled = true;
    } else {
      els.install.textContent = t("installApp");
      els.install.disabled = false;
    }
  };
  window.addEventListener("beforeinstallprompt", event => {
    event.preventDefault();
    deferredInstallPrompt = event;
    refreshInstallButton();
  });
  window.addEventListener("appinstalled", () => {
    deferredInstallPrompt = null;
    refreshInstallButton();
    showFeedback(t("installedMessage"), "success");
  });
  els.install.addEventListener("click", async () => {
    if (!deferredInstallPrompt) {
      showFeedback(t(window.isSecureContext ? "installInstructions" : "installNotAvailable"));
      return;
    }
    deferredInstallPrompt.prompt();
    const choice = await deferredInstallPrompt.userChoice;
    showFeedback(choice && choice.outcome === "accepted" ? t("installPrompted") : t("installInstructions"));
    deferredInstallPrompt = null;
  });
  refreshInstallButton();

  loadSettings();
  loadProfile();
  renderLanguage();
  setStatus("", "ready");
  if ("serviceWorker" in navigator && window.isSecureContext) {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }
})();
