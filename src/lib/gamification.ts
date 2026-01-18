// Gamification System - XP, Levels, Achievements, Badges
// Premium gamification with advanced progression system

export interface Achievement {
  id: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: number;
  xpReward: number;
}

export interface GamificationStats {
  totalXP: number;
  level: number;
  streak: number;
  longestStreak: number;
  lessonsCompleted: number;
  quizzesAced: number;
  achievements: string[];
  lastActiveDate: string;
}

// XP thresholds for each level - progressive difficulty curve
export const LEVEL_THRESHOLDS = [
  0,      // Level 1
  100,    // Level 2
  250,    // Level 3
  500,    // Level 4
  800,    // Level 5
  1200,   // Level 6
  1700,   // Level 7
  2300,   // Level 8
  3000,   // Level 9
  4000,   // Level 10
  5500,   // Level 11
  7500,   // Level 12
  10000,  // Level 13
  15000,  // Level 14
  20000,  // Level 15
  30000,  // Level 16 - Master
  50000,  // Level 17 - Grand Master
  75000,  // Level 18 - Legend
  100000, // Level 19 - Mythic
  150000, // Level 20 - Ultimate
];

export const LEVEL_TITLES = {
  en: [
    "Beginner", "Learner", "Explorer", "Achiever", "Expert",
    "Master", "Champion", "Legend", "Guru", "Wizard",
    "Sage", "Titan", "Hero", "Elite", "Ultimate",
    "Grand Master", "Mythic Hero", "Legendary", "Immortal", "Transcendent"
  ],
  ru: [
    "Новичок", "Ученик", "Исследователь", "Достигатель", "Эксперт",
    "Мастер", "Чемпион", "Легенда", "Гуру", "Волшебник",
    "Мудрец", "Титан", "Герой", "Элита", "Ультимат",
    "Грандмастер", "Мифический", "Легендарный", "Бессмертный", "Трансцендент"
  ],
  uz: [
    "Boshlang'ich", "O'quvchi", "Tadqiqotchi", "Muvaffaqiyatli", "Ekspert",
    "Usta", "Chempion", "Afsona", "Guru", "Sehrgar",
    "Dono", "Titan", "Qahramon", "Elita", "Oliy",
    "Katta Usta", "Afsonaviy", "Legendar", "Abadiy", "Yuksak"
  ]
};

// Level colors for visual progression
export const LEVEL_COLORS = [
  "from-gray-400 to-gray-500",       // 1
  "from-green-400 to-green-500",     // 2
  "from-blue-400 to-blue-500",       // 3
  "from-indigo-400 to-indigo-500",   // 4
  "from-purple-400 to-purple-500",   // 5
  "from-pink-400 to-pink-500",       // 6
  "from-rose-400 to-rose-500",       // 7
  "from-orange-400 to-orange-500",   // 8
  "from-amber-400 to-amber-500",     // 9
  "from-yellow-400 to-yellow-500",   // 10
  "from-emerald-400 to-emerald-500", // 11
  "from-teal-400 to-teal-500",       // 12
  "from-cyan-400 to-cyan-500",       // 13
  "from-sky-400 to-sky-500",         // 14
  "from-violet-400 to-violet-500",   // 15
  "from-fuchsia-400 to-fuchsia-500", // 16
  "from-red-500 to-orange-500",      // 17
  "from-yellow-500 to-red-500",      // 18
  "from-purple-500 to-pink-500",     // 19
  "from-amber-300 via-yellow-400 to-orange-500", // 20
];

export const ACHIEVEMENTS_CONFIG = {
  first_lesson: {
    id: "first_lesson",
    xpReward: 50,
    icon: "🎯",
    name: { en: "First Steps", ru: "Первые шаги", uz: "Birinchi qadamlar" },
    description: { 
      en: "Complete your first lesson", 
      ru: "Завершите первый урок",
      uz: "Birinchi darsni tugating"
    }
  },
  streak_3: {
    id: "streak_3",
    xpReward: 75,
    icon: "🔥",
    name: { en: "On Fire", ru: "В ударе", uz: "Qizib ketdi" },
    description: { 
      en: "Maintain a 3-day streak", 
      ru: "Поддерживайте серию 3 дня",
      uz: "3 kunlik streakni saqlang"
    }
  },
  streak_7: {
    id: "streak_7",
    xpReward: 150,
    icon: "⚡",
    name: { en: "Week Warrior", ru: "Воин недели", uz: "Hafta jangchisi" },
    description: { 
      en: "Maintain a 7-day streak", 
      ru: "Поддерживайте серию 7 дней",
      uz: "7 kunlik streakni saqlang"
    }
  },
  streak_30: {
    id: "streak_30",
    xpReward: 500,
    icon: "👑",
    name: { en: "Monthly Master", ru: "Месячный мастер", uz: "Oylik usta" },
    description: { 
      en: "Maintain a 30-day streak", 
      ru: "Поддерживайте серию 30 дней",
      uz: "30 kunlik streakni saqlang"
    }
  },
  perfect_quiz: {
    id: "perfect_quiz",
    xpReward: 100,
    icon: "💯",
    name: { en: "Perfectionist", ru: "Перфекционист", uz: "Mukammal" },
    description: { 
      en: "Get 100% on a quiz", 
      ru: "Получите 100% на тесте",
      uz: "Testda 100% oling"
    }
  },
  five_lessons: {
    id: "five_lessons",
    xpReward: 200,
    icon: "📚",
    name: { en: "Bookworm", ru: "Книголюб", uz: "Kitobxon" },
    description: { 
      en: "Complete 5 lessons", 
      ru: "Завершите 5 уроков",
      uz: "5 ta darsni tugating"
    }
  },
  all_lessons: {
    id: "all_lessons",
    xpReward: 500,
    icon: "🏆",
    name: { en: "Graduate", ru: "Выпускник", uz: "Bitiruvchi" },
    description: { 
      en: "Complete all lessons", 
      ru: "Завершите все уроки",
      uz: "Barcha darslarni tugating"
    }
  },
  budget_master: {
    id: "budget_master",
    xpReward: 100,
    icon: "💰",
    name: { en: "Budget Master", ru: "Мастер бюджета", uz: "Byudjet ustasi" },
    description: { 
      en: "Stay within budget for a month", 
      ru: "Оставайтесь в бюджете месяц",
      uz: "Bir oy byudjetda qoling"
    }
  },
  saver: {
    id: "saver",
    xpReward: 150,
    icon: "🐷",
    name: { en: "Super Saver", ru: "Супер экономист", uz: "Super tejamkor" },
    description: { 
      en: "Reach a savings goal", 
      ru: "Достигните цели сбережений",
      uz: "Tejash maqsadiga erishing"
    }
  },
  level_5: {
    id: "level_5",
    xpReward: 200,
    icon: "⭐",
    name: { en: "Rising Star", ru: "Восходящая звезда", uz: "Ko'tarilayotgan yulduz" },
    description: { 
      en: "Reach level 5", 
      ru: "Достигните 5 уровня",
      uz: "5-darajaga yeting"
    }
  },
  level_10: {
    id: "level_10",
    xpReward: 500,
    icon: "🌟",
    name: { en: "Financial Star", ru: "Финансовая звезда", uz: "Moliyaviy yulduz" },
    description: { 
      en: "Reach level 10", 
      ru: "Достигните 10 уровня",
      uz: "10-darajaga yeting"
    }
  },
  speed_demon: {
    id: "speed_demon",
    xpReward: 150,
    icon: "⚡",
    name: { en: "Speed Demon", ru: "Скоростной демон", uz: "Tezkor" },
    description: { 
      en: "Complete a quiz in under 30 seconds", 
      ru: "Пройдите тест менее чем за 30 секунд",
      uz: "Testni 30 soniyadan kam vaqtda tugating"
    }
  },
  night_owl: {
    id: "night_owl",
    xpReward: 75,
    icon: "🦉",
    name: { en: "Night Owl", ru: "Ночная сова", uz: "Tungi boyqush" },
    description: { 
      en: "Complete a lesson after midnight", 
      ru: "Завершите урок после полуночи",
      uz: "Yarim tundan keyin dars tugating"
    }
  },
  early_bird: {
    id: "early_bird",
    xpReward: 75,
    icon: "🐤",
    name: { en: "Early Bird", ru: "Ранняя пташка", uz: "Erta qush" },
    description: { 
      en: "Complete a lesson before 7 AM", 
      ru: "Завершите урок до 7 утра",
      uz: "Ertalab soat 7 dan oldin dars tugating"
    }
  },
  module_master: {
    id: "module_master",
    xpReward: 250,
    icon: "🎓",
    name: { en: "Module Master", ru: "Мастер модуля", uz: "Modul ustasi" },
    description: { 
      en: "Complete all lessons in a module", 
      ru: "Завершите все уроки в модуле",
      uz: "Moduldagi barcha darslarni tugating"
    }
  },
  quiz_streak: {
    id: "quiz_streak",
    xpReward: 300,
    icon: "🎯",
    name: { en: "Quiz Master", ru: "Мастер тестов", uz: "Test ustasi" },
    description: { 
      en: "Get 100% on 5 quizzes in a row", 
      ru: "Получите 100% на 5 тестах подряд",
      uz: "Ketma-ket 5 ta testda 100% oling"
    }
  }
};

export function calculateLevel(xp: number): number {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i]) {
      return i + 1;
    }
  }
  return 1;
}

export function getXPProgress(xp: number): { current: number; next: number; progress: number } {
  const level = calculateLevel(xp);
  const currentThreshold = LEVEL_THRESHOLDS[level - 1] || 0;
  const nextThreshold = LEVEL_THRESHOLDS[level] || LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
  
  const xpInLevel = xp - currentThreshold;
  const xpNeeded = nextThreshold - currentThreshold;
  const progress = Math.min((xpInLevel / xpNeeded) * 100, 100);
  
  return { current: xpInLevel, next: xpNeeded, progress };
}

export function getLevelTitle(level: number, language: "en" | "ru" | "uz" = "uz"): string {
  const index = Math.min(level - 1, LEVEL_TITLES[language].length - 1);
  return LEVEL_TITLES[language][index];
}

export function getLevelColor(level: number): string {
  const index = Math.min(level - 1, LEVEL_COLORS.length - 1);
  return LEVEL_COLORS[index];
}

// Calculate bonus XP based on various factors
export function calculateBonusXP(params: {
  isPerfect: boolean;
  timeBonus: boolean;
  streakBonus: number;
}): number {
  let bonus = 0;
  
  if (params.isPerfect) bonus += 25;
  if (params.timeBonus) bonus += 15;
  if (params.streakBonus >= 7) bonus += 20;
  else if (params.streakBonus >= 3) bonus += 10;
  
  return bonus;
}
