export type Language = "en" | "ru" | "uz";

export const translations = {
  // Navigation
  nav: {
    home: { en: "Home", ru: "Главная", uz: "Bosh sahifa" },
    goals: { en: "Goals", ru: "Цели", uz: "Maqsadlar" },
    learn: { en: "Learn", ru: "Обучение", uz: "O'rganish" },
    transactions: { en: "History", ru: "История", uz: "Tarix" },
    profile: { en: "Profile", ru: "Профиль", uz: "Profil" },
    analytics: { en: "Analytics", ru: "Аналитика", uz: "Tahlil" },
  },

  // Home View
  home: {
    goodMorning: { en: "Good morning,", ru: "Доброе утро,", uz: "Xayrli tong," },
    goodAfternoon: { en: "Good afternoon,", ru: "Добрый день,", uz: "Xayrli kun," },
    goodEvening: { en: "Good evening,", ru: "Добрый вечер,", uz: "Xayrli kech," },
    student: { en: "Student", ru: "Студент", uz: "Talaba" },
    welcomeBack: { en: "Welcome back", ru: "С возвращением", uz: "Xush kelibsiz" },
    totalBalance: { en: "Total Balance", ru: "Общий баланс", uz: "Umumiy balans" },
    refresh: { en: "Refresh", ru: "Обновить", uz: "Yangilash" },
    availableBalance: { en: "Available Balance", ru: "Доступный баланс", uz: "Mavjud balans" },
    thisMonth: { en: "this month", ru: "за месяц", uz: "bu oy" },
    quickActions: { en: "Quick Actions", ru: "Быстрые действия", uz: "Tezkor amallar" },
    add: { en: "Add", ru: "Добавить", uz: "Qo'shish" },
    send: { en: "Send", ru: "Отправить", uz: "Jo'natish" },
    request: { en: "Request", ru: "Запросить", uz: "So'rash" },
    budget: { en: "Budget", ru: "Бюджет", uz: "Byudjet" },
    recentTransactions: { en: "Recent Transactions", ru: "Последние операции", uz: "So'nggi amallar" },
    seeAll: { en: "See All", ru: "Все", uz: "Hammasi" },
    today: { en: "Today", ru: "Сегодня", uz: "Bugun" },
    yesterday: { en: "Yesterday", ru: "Вчера", uz: "Kecha" },
    noTransactions: { en: "No transactions yet", ru: "Пока нет операций", uz: "Hali amallar yo'q" },
    addFirst: { en: "Add your first transaction!", ru: "Добавьте первую операцию!", uz: "Birinchi amalni qo'shing!" },
    income: { en: "Income", ru: "Доход", uz: "Daromad" },
    expense: { en: "Expense", ru: "Расход", uz: "Xarajat" },
    balance: { en: "Balance", ru: "Баланс", uz: "Balans" },
    monthlySavingsRate: { en: "Monthly Savings Rate", ru: "Месячная норма сбережений", uz: "Oylik tejash darajasi" },
  },

  // Transaction categories
  categories: {
    shopping: { en: "Shopping", ru: "Покупки", uz: "Xaridlar" },
    food: { en: "Food", ru: "Еда", uz: "Ovqat" },
    transport: { en: "Transport", ru: "Транспорт", uz: "Transport" },
    phone: { en: "Phone", ru: "Телефон", uz: "Telefon" },
    gift: { en: "Gift", ru: "Подарок", uz: "Sovg'a" },
    restaurant: { en: "Restaurant", ru: "Ресторан", uz: "Restoran" },
    entertainment: { en: "Entertainment", ru: "Развлечения", uz: "Ko'ngilochar" },
    education: { en: "Education", ru: "Образование", uz: "Ta'lim" },
    health: { en: "Health", ru: "Здоровье", uz: "Salomatlik" },
    utilities: { en: "Utilities", ru: "Коммунальные", uz: "Kommunal" },
    other: { en: "Other", ru: "Другое", uz: "Boshqa" },
    income: { en: "Income", ru: "Доход", uz: "Daromad" },
    salary: { en: "Salary", ru: "Зарплата", uz: "Maosh" },
  },

  // Goals/Wallet View
  wallet: {
    savings: { en: "Savings", ru: "Накопления", uz: "Jamg'armalar" },
    trackGoals: { en: "Track your savings goals", ru: "Следите за целями", uz: "Maqsadlaringizni kuzating" },
    totalSaved: { en: "Total Saved", ru: "Всего накоплено", uz: "Jami yig'ilgan" },
    yourGoals: { en: "Your Goals", ru: "Ваши цели", uz: "Maqsadlaringiz" },
    activeGoals: { en: "Active Goals", ru: "Активные цели", uz: "Faol maqsadlar" },
    left: { en: "left", ru: "осталось", uz: "qoldi" },
    createGoal: { en: "Create New Goal", ru: "Создать цель", uz: "Yangi maqsad" },
    startSaving: { en: "Start saving for something special", ru: "Начните копить на что-то особенное", uz: "Maxsus narsa uchun yig'ishni boshlang" },
    noGoals: { en: "No savings goals yet", ru: "Пока нет целей", uz: "Hali maqsadlar yo'q" },
    addGoal: { en: "Add Goal", ru: "Добавить цель", uz: "Maqsad qo'shish" },
    goalName: { en: "Goal Name", ru: "Название цели", uz: "Maqsad nomi" },
    targetAmount: { en: "Target Amount", ru: "Целевая сумма", uz: "Maqsad summasi" },
    selectEmoji: { en: "Select Emoji", ru: "Выберите эмодзи", uz: "Emoji tanlang" },
    create: { en: "Create", ru: "Создать", uz: "Yaratish" },
    addMoney: { en: "Add Money", ru: "Добавить", uz: "Pul qo'shish" },
    enterGoalName: { en: "Enter goal name", ru: "Введите название", uz: "Maqsad nomini kiriting" },
    enterAmount: { en: "Enter amount", ru: "Введите сумму", uz: "Summani kiriting" },
    goalCreated: { en: "Goal created!", ru: "Цель создана!", uz: "Maqsad yaratildi!" },
    moneyAdded: { en: "Money added to goal!", ru: "Деньги добавлены!", uz: "Pul qo'shildi!" },
    deleteGoal: { en: "Delete Goal", ru: "Удалить цель", uz: "Maqsadni o'chirish" },
    goalCompleted: { en: "Goal completed! 🎉", ru: "Цель достигнута! 🎉", uz: "Maqsad bajarildi! 🎉" },
    editGoal: { en: "Edit Goal", ru: "Редактировать цель", uz: "Maqsadni tahrirlash" },
  },

  // Learn View
  learn: {
    title: { en: "Learn", ru: "Обучение", uz: "O'rganish" },
    subtitle: { en: "Master your money skills", ru: "Освойте финансовую грамотность", uz: "Moliyaviy ko'nikmalaringizni rivojlantiring" },
    yourProgress: { en: "Your Progress", ru: "Ваш прогресс", uz: "Sizning taraqqiyotingiz" },
    lessonsOf: { en: "of", ru: "из", uz: "dan" },
    lessons: { en: "lessons", ru: "уроков", uz: "dars" },
    dayStreak: { en: "day streak", ru: "дней подряд", uz: "kunlik streak" },
    lessonsTitle: { en: "Lessons", ru: "Уроки", uz: "Darslar" },
    startLesson: { en: "Start Lesson", ru: "Начать урок", uz: "Darsni boshlash" },
    continueLesson: { en: "Continue", ru: "Продолжить", uz: "Davom etish" },
    completed: { en: "Completed", ru: "Завершено", uz: "Tugatildi" },
    question: { en: "Question", ru: "Вопрос", uz: "Savol" },
    of: { en: "of", ru: "из", uz: "dan" },
    correct: { en: "Correct!", ru: "Правильно!", uz: "To'g'ri!" },
    incorrect: { en: "Incorrect", ru: "Неправильно", uz: "Noto'g'ri" },
    nextQuestion: { en: "Next Question", ru: "Следующий вопрос", uz: "Keyingi savol" },
    finishLesson: { en: "Finish Lesson", ru: "Завершить урок", uz: "Darsni tugatish" },
    lessonComplete: { en: "Lesson Complete!", ru: "Урок завершён!", uz: "Dars tugadi!" },
    youEarned: { en: "You earned", ru: "Вы получили", uz: "Siz oldingiz" },
    xpPoints: { en: "XP points", ru: "очков опыта", uz: "XP ball" },
    backToLessons: { en: "Back to Lessons", ru: "К урокам", uz: "Darslarga qaytish" },
    achievements: { en: "Achievements", ru: "Достижения", uz: "Yutuqlar" },
    streak: { en: "Streak", ru: "Серия", uz: "Streak" },
    bestStreak: { en: "Best", ru: "Лучший", uz: "Eng yaxshi" },
    days: { en: "days", ru: "дней", uz: "kun" },
    modules: { en: "Modules", ru: "Модули", uz: "Modullar" },
    overview: { en: "Overview", ru: "Обзор", uz: "Umumiy ma'lumot" },
    keyPoints: { en: "Key Points", ru: "Ключевые моменты", uz: "Asosiy nuqtalar" },
    remember: { en: "Remember", ru: "Запомните", uz: "Esda tuting" },
    startQuiz: { en: "Start Quiz", ru: "Начать тест", uz: "Testni boshlash" },
    perfectScore: { en: "Perfect Score! 🎉", ru: "Идеальный результат! 🎉", uz: "Mukammal natija! 🎉" },
    perfectBonus: { en: "+25 XP Bonus!", ru: "+25 XP Бонус!", uz: "+25 XP Bonus!" },
  },

  // Profile View
  profile: {
    title: { en: "Profile", ru: "Профиль", uz: "Profil" },
    statistics: { en: "Statistics", ru: "Статистика", uz: "Statistika" },
    dayStreak: { en: "Day Streak", ru: "Дней подряд", uz: "Kun streak" },
    lessonsDone: { en: "Lessons Done", ru: "Уроков пройдено", uz: "Darslar tugallandi" },
    moneySaved: { en: "Money Saved", ru: "Накоплено", uz: "Tejalgan pul" },
    language: { en: "Language", ru: "Язык", uz: "Til" },
    settings: { en: "Settings", ru: "Настройки", uz: "Sozlamalar" },
    notifications: { en: "Notifications", ru: "Уведомления", uz: "Bildirishnomalar" },
    appearance: { en: "Appearance", ru: "Оформление", uz: "Ko'rinish" },
    privacy: { en: "Privacy", ru: "Конфиденциальность", uz: "Maxfiylik" },
    help: { en: "Help", ru: "Помощь", uz: "Yordam" },
    signOut: { en: "Sign Out", ru: "Выйти", uz: "Chiqish" },
    currency: { en: "Currency", ru: "Валюта", uz: "Valyuta" },
    data: { en: "Data", ru: "Данные", uz: "Ma'lumotlar" },
    financialExplorer: { en: "Financial Explorer", ru: "Финансовый исследователь", uz: "Moliyaviy kashfiyotchi" },
  },

  // Settings
  settings: {
    lightMode: { en: "Light", ru: "Светлая", uz: "Yorug'" },
    darkMode: { en: "Dark", ru: "Тёмная", uz: "Qorong'u" },
    systemMode: { en: "System", ru: "Системная", uz: "Tizim" },
    exportData: { en: "Export Data", ru: "Экспорт данных", uz: "Ma'lumotlarni eksport qilish" },
    exportDescription: { en: "Download your financial data", ru: "Скачайте свои финансовые данные", uz: "Moliyaviy ma'lumotlaringizni yuklab oling" },
    exportTransactions: { en: "Transactions", ru: "Транзакции", uz: "Tranzaksiyalar" },
    exportGoals: { en: "Savings Goals", ru: "Цели сбережений", uz: "Tejash maqsadlari" },
    exportFullBackup: { en: "Export Full Backup", ru: "Экспорт полной копии", uz: "To'liq zaxirani eksport qilish" },
    exportSuccess: { en: "Export completed!", ru: "Экспорт завершён!", uz: "Eksport tugallandi!" },
    clearData: { en: "Clear All Data", ru: "Очистить все данные", uz: "Barcha ma'lumotlarni tozalash" },
    clearDataWarning: { en: "This action cannot be undone", ru: "Это действие нельзя отменить", uz: "Bu amalni qaytarib bo'lmaydi" },
  },

  // Transaction Modal
  transactionModal: {
    addTransaction: { en: "Add Transaction", ru: "Добавить операцию", uz: "Amal qo'shish" },
    income: { en: "Income", ru: "Доход", uz: "Daromad" },
    expense: { en: "Expense", ru: "Расход", uz: "Xarajat" },
    amount: { en: "Amount", ru: "Сумма", uz: "Miqdor" },
    title: { en: "Title", ru: "Название", uz: "Nomi" },
    category: { en: "Category", ru: "Категория", uz: "Kategoriya" },
    selectCategory: { en: "Select category", ru: "Выберите категорию", uz: "Kategoriyani tanlang" },
    add: { en: "Add", ru: "Добавить", uz: "Qo'shish" },
    cancel: { en: "Cancel", ru: "Отмена", uz: "Bekor qilish" },
    enterAmount: { en: "Enter amount", ru: "Введите сумму", uz: "Miqdorni kiriting" },
    enterTitle: { en: "Enter title", ru: "Введите название", uz: "Nomini kiriting" },
  },

  // Analytics
  analytics: {
    title: { en: "Analytics", ru: "Аналитика", uz: "Tahlil" },
    spendingAnalytics: { en: "Spending Analytics", ru: "Аналитика расходов", uz: "Xarajatlar tahlili" },
    thisMonth: { en: "This Month", ru: "Этот месяц", uz: "Bu oy" },
    totalSpent: { en: "Total Spent", ru: "Всего потрачено", uz: "Jami sarflangan" },
    totalIncome: { en: "Total Income", ru: "Общий доход", uz: "Jami daromad" },
    byCategory: { en: "By Category", ru: "По категориям", uz: "Kategoriyalar bo'yicha" },
    noData: { en: "No spending data yet", ru: "Пока нет данных о расходах", uz: "Hali xarajat ma'lumotlari yo'q" },
    startTracking: { en: "Start tracking your expenses!", ru: "Начните отслеживать расходы!", uz: "Xarajatlaringizni kuzatishni boshlang!" },
    weeklyOverview: { en: "Weekly Overview", ru: "Обзор за неделю", uz: "Haftalik ko'rinish" },
    noWeeklyData: { en: "No data for this week", ru: "Нет данных за неделю", uz: "Bu hafta uchun ma'lumot yo'q" },
    monthlyTrend: { en: "Monthly Trend", ru: "Месячный тренд", uz: "Oylik trend" },
    noMonthlyData: { en: "No monthly data yet", ru: "Нет данных за месяц", uz: "Oylik ma'lumotlar yo'q" },
    income: { en: "Income", ru: "Доходы", uz: "Daromadlar" },
    expenses: { en: "Expenses", ru: "Расходы", uz: "Xarajatlar" },
    savingsOverview: { en: "Savings Overview", ru: "Обзор накоплений", uz: "Tejamkorlik ko'rinishi" },
    totalSaved: { en: "Total Saved", ru: "Всего накоплено", uz: "Jami tejalgan" },
    target: { en: "target", ru: "цель", uz: "maqsad" },
    savingsRate: { en: "Savings Rate", ru: "Коэф. сбережений", uz: "Tejash stavkasi" },
    ofIncome: { en: "of income", ru: "от дохода", uz: "daromaddan" },
    goalsCompleted: { en: "Goals Completed", ru: "Целей достигнуто", uz: "Maqsadlar bajarildi" },
  },

  // Notifications
  notifications: {
    title: { en: "Notifications", ru: "Уведомления", uz: "Bildirishnomalar" },
    enableNotifications: { en: "Enable Notifications", ru: "Включить уведомления", uz: "Bildirishnomalarni yoqish" },
    dailyReminder: { en: "Daily Learning Reminder", ru: "Ежедневное напоминание", uz: "Kundalik eslatma" },
    dailyReminderDesc: { en: "Get reminded to complete your daily lesson", ru: "Напоминание о ежедневном уроке", uz: "Kundalik darsni tugatish eslatmasi" },
    budgetAlerts: { en: "Budget Alerts", ru: "Оповещения о бюджете", uz: "Byudjet ogohlantirishlari" },
    budgetAlertsDesc: { en: "Get notified when spending exceeds limits", ru: "Уведомление о превышении лимита", uz: "Xarajat limitdan oshganda xabar" },
    reminderTime: { en: "Reminder Time", ru: "Время напоминания", uz: "Eslatma vaqti" },
    permissionDenied: { en: "Notification permission denied", ru: "Разрешение отклонено", uz: "Bildirishnoma ruxsati rad etildi" },
    enabled: { en: "Notifications enabled!", ru: "Уведомления включены!", uz: "Bildirishnomalar yoqildi!" },
  },

  // Budget Limits
  budget: {
    limits: { en: "Budget Limits", ru: "Лимиты бюджета", uz: "Byudjet limiti" },
    limitsDescription: { en: "Set spending limits by category", ru: "Установите лимиты по категориям", uz: "Kategoriyalar bo'yicha limitlar" },
    addLimit: { en: "Add Limit", ru: "Добавить лимит", uz: "Limit qo'shish" },
    editLimit: { en: "Edit Limit", ru: "Редактировать лимит", uz: "Limitni tahrirlash" },
    noLimits: { en: "No budget limits set", ru: "Лимиты не установлены", uz: "Limitlar o'rnatilmagan" },
    createFirst: { en: "Create your first budget limit", ru: "Создайте первый лимит", uz: "Birinchi limitni yarating" },
    selectCategory: { en: "Select Category", ru: "Выберите категорию", uz: "Kategoriyani tanlang" },
    limitAmount: { en: "Limit Amount", ru: "Сумма лимита", uz: "Limit summasi" },
    period: { en: "Period", ru: "Период", uz: "Davr" },
    monthly: { en: "Monthly", ru: "Месячный", uz: "Oylik" },
    weekly: { en: "Weekly", ru: "Недельный", uz: "Haftalik" },
    exceeded: { en: "Exceeded!", ru: "Превышен!", uz: "Oshib ketdi!" },
    warning: { en: "Almost at limit", ru: "Почти достигнут", uz: "Limitga yaqin" },
    safe: { en: "On track", ru: "В норме", uz: "Normada" },
  },

  // Common
  common: {
    currency: { en: "UZS", ru: "сум", uz: "so'm" },
    sum: { en: "sum", ru: "сум", uz: "so'm" },
    close: { en: "Close", ru: "Закрыть", uz: "Yopish" },
    save: { en: "Save", ru: "Сохранить", uz: "Saqlash" },
    delete: { en: "Delete", ru: "Удалить", uz: "O'chirish" },
    edit: { en: "Edit", ru: "Редактировать", uz: "Tahrirlash" },
    min: { en: "min", ru: "мин", uz: "daq" },
    cancel: { en: "Cancel", ru: "Отмена", uz: "Bekor qilish" },
    back: { en: "Back", ru: "Назад", uz: "Orqaga" },
    loading: { en: "Loading...", ru: "Загрузка...", uz: "Yuklanmoqda..." },
    error: { en: "Error", ru: "Ошибка", uz: "Xatolik" },
    retry: { en: "Retry", ru: "Повторить", uz: "Qayta urinish" },
  },
} as const;

export type TranslationKey = keyof typeof translations;

export function t(path: string, lang: Language): string {
  const keys = path.split(".");
  let current: any = translations;
  
  for (const key of keys) {
    if (current[key] === undefined) {
      console.warn(`Translation not found: ${path}`);
      return path;
    }
    current = current[key];
  }
  
  if (typeof current === "object" && current[lang]) {
    return current[lang];
  }
  
  return path;
}
