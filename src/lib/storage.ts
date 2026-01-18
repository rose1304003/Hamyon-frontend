// Storage keys
const STORAGE_KEYS = {
  LESSON_PROGRESS: "hamyon_lesson_progress",
  USER_STATS: "hamyon_user_stats",
  ACHIEVEMENTS: "hamyon_achievements",
} as const;

// Lesson progress types
export interface LessonProgress {
  lessonId: string;
  completed: boolean;
  currentQuestion: number;
  correctAnswers: number;
  completedAt?: number;
  timeSpent?: number;
}

// User stats
export interface UserStats {
  streak: number;
  longestStreak: number;
  lastActiveDate: string;
  totalXP: number;
  level: number;
  lessonsCompleted: number;
  quizzesAced: number;
  achievements: string[];
  perfectQuizStreak: number;
}

// XP thresholds for level calculation
const LEVEL_THRESHOLDS = [
  0, 100, 250, 500, 800, 1200, 1700, 2300, 3000, 4000,
  5500, 7500, 10000, 15000, 20000, 30000, 50000, 75000, 100000, 150000,
];

function calculateLevelFromXP(xp: number): number {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i]) {
      return i + 1;
    }
  }
  return 1;
}

// Lesson progress storage
export function getLessonProgress(): Record<string, LessonProgress> {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.LESSON_PROGRESS);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

export function saveLessonProgress(lessonId: string, progress: LessonProgress): void {
  const allProgress = getLessonProgress();
  allProgress[lessonId] = progress;
  localStorage.setItem(STORAGE_KEYS.LESSON_PROGRESS, JSON.stringify(allProgress));
}

export function getCompletedLessonsCount(): number {
  const progress = getLessonProgress();
  return Object.values(progress).filter((p) => p.completed).length;
}

export function clearLessonProgress(lessonId: string): void {
  const allProgress = getLessonProgress();
  delete allProgress[lessonId];
  localStorage.setItem(STORAGE_KEYS.LESSON_PROGRESS, JSON.stringify(allProgress));
}

// User stats storage
export function getUserStats(): UserStats {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.USER_STATS);
    const stats = stored ? JSON.parse(stored) : getDefaultStats();
    
    // Check streak continuity
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    
    if (stats.lastActiveDate !== today && stats.lastActiveDate !== yesterday) {
      stats.streak = 0;
      stats.perfectQuizStreak = 0;
    }
    
    return stats;
  } catch {
    return getDefaultStats();
  }
}

function getDefaultStats(): UserStats {
  return {
    streak: 0,
    longestStreak: 0,
    lastActiveDate: "",
    totalXP: 0,
    level: 1,
    lessonsCompleted: 0,
    quizzesAced: 0,
    achievements: [],
    perfectQuizStreak: 0,
  };
}

export function updateUserStats(updates: Partial<UserStats>): UserStats {
  const stats = getUserStats();
  const today = new Date().toDateString();
  
  // Update streak if active today for the first time
  if (stats.lastActiveDate !== today) {
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (stats.lastActiveDate === yesterday) {
      stats.streak += 1;
    } else if (stats.lastActiveDate !== today) {
      stats.streak = 1;
    }
    stats.lastActiveDate = today;
  }
  
  // Update longest streak
  if (stats.streak > stats.longestStreak) {
    stats.longestStreak = stats.streak;
  }
  
  // Apply updates
  const newStats = { ...stats, ...updates };
  
  // Calculate level based on XP
  newStats.level = calculateLevelFromXP(newStats.totalXP);
  
  localStorage.setItem(STORAGE_KEYS.USER_STATS, JSON.stringify(newStats));
  return newStats;
}

export function addXP(amount: number): UserStats {
  const stats = getUserStats();
  return updateUserStats({ totalXP: stats.totalXP + amount });
}

export function addAchievement(achievementId: string): UserStats {
  const stats = getUserStats();
  if (!stats.achievements.includes(achievementId)) {
    return updateUserStats({ 
      achievements: [...stats.achievements, achievementId] 
    });
  }
  return stats;
}

export function incrementLessonsCompleted(): UserStats {
  const stats = getUserStats();
  return updateUserStats({ 
    lessonsCompleted: stats.lessonsCompleted + 1 
  });
}

export function incrementQuizzesAced(): UserStats {
  const stats = getUserStats();
  return updateUserStats({ 
    quizzesAced: stats.quizzesAced + 1,
    perfectQuizStreak: stats.perfectQuizStreak + 1
  });
}

export function resetPerfectQuizStreak(): void {
  updateUserStats({ perfectQuizStreak: 0 });
}

// Check and unlock achievements
export function checkAndUnlockAchievements(): string[] {
  const stats = getUserStats();
  const newAchievements: string[] = [];
  
  // First lesson
  if (stats.lessonsCompleted >= 1 && !stats.achievements.includes('first_lesson')) {
    newAchievements.push('first_lesson');
  }
  
  // Five lessons
  if (stats.lessonsCompleted >= 5 && !stats.achievements.includes('five_lessons')) {
    newAchievements.push('five_lessons');
  }
  
  // Perfect quiz
  if (stats.quizzesAced >= 1 && !stats.achievements.includes('perfect_quiz')) {
    newAchievements.push('perfect_quiz');
  }
  
  // Streak achievements
  if (stats.streak >= 3 && !stats.achievements.includes('streak_3')) {
    newAchievements.push('streak_3');
  }
  if (stats.streak >= 7 && !stats.achievements.includes('streak_7')) {
    newAchievements.push('streak_7');
  }
  if (stats.streak >= 30 && !stats.achievements.includes('streak_30')) {
    newAchievements.push('streak_30');
  }
  
  // Level achievements
  if (stats.level >= 5 && !stats.achievements.includes('level_5')) {
    newAchievements.push('level_5');
  }
  if (stats.level >= 10 && !stats.achievements.includes('level_10')) {
    newAchievements.push('level_10');
  }
  
  // Quiz master (5 perfect quizzes in a row)
  if (stats.perfectQuizStreak >= 5 && !stats.achievements.includes('quiz_streak')) {
    newAchievements.push('quiz_streak');
  }
  
  // Time-based achievements
  const hour = new Date().getHours();
  if (hour >= 0 && hour < 5 && !stats.achievements.includes('night_owl')) {
    newAchievements.push('night_owl');
  }
  if (hour >= 5 && hour < 7 && !stats.achievements.includes('early_bird')) {
    newAchievements.push('early_bird');
  }
  
  // Add all new achievements
  if (newAchievements.length > 0) {
    updateUserStats({
      achievements: [...stats.achievements, ...newAchievements]
    });
  }
  
  return newAchievements;
}

// Reset all learning progress (for testing or user request)
export function resetAllProgress(): void {
  localStorage.removeItem(STORAGE_KEYS.LESSON_PROGRESS);
  localStorage.removeItem(STORAGE_KEYS.USER_STATS);
  localStorage.removeItem(STORAGE_KEYS.ACHIEVEMENTS);
}

// Get learning statistics summary
export function getLearningStats() {
  const stats = getUserStats();
  const progress = getLessonProgress();
  const completedLessons = Object.values(progress).filter(p => p.completed);
  
  return {
    totalXP: stats.totalXP,
    level: stats.level,
    streak: stats.streak,
    longestStreak: stats.longestStreak,
    lessonsCompleted: completedLessons.length,
    quizzesAced: stats.quizzesAced,
    achievementsUnlocked: stats.achievements.length,
    averageScore: completedLessons.length > 0
      ? Math.round(
          completedLessons.reduce((acc, p) => 
            acc + (p.correctAnswers / (p.currentQuestion || 1)) * 100, 0
          ) / completedLessons.length
        )
      : 0,
  };
}
