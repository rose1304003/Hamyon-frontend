import { useState, useMemo } from "react";
import { ArrowLeft, GraduationCap, BookOpen, Award } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getLessonProgress, getUserStats, getLearningStats } from "@/lib/storage";
import { LESSONS, LESSON_MODULES, LessonData } from "@/lib/lessonData";
import { LevelProgress } from "./LevelProgress";
import { StreakDisplay } from "./StreakDisplay";
import { AchievementsDisplay } from "./AchievementsDisplay";
import { ModuleCard } from "./ModuleCard";
import { EnhancedLessonCard } from "./EnhancedLessonCard";
import { EnhancedQuizView } from "./EnhancedQuizView";

type ViewMode = "modules" | "lessons" | "lesson";

export function LearnView() {
  const [viewMode, setViewMode] = useState<ViewMode>("modules");
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [activeLesson, setActiveLesson] = useState<LessonData | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const progress = getLessonProgress();
  const stats = getUserStats();
  const learningStats = getLearningStats();

  // Group lessons by module
  const lessonsByModule = useMemo(() => {
    const grouped: Record<string, LessonData[]> = {};
    LESSONS.forEach((lesson) => {
      if (!grouped[lesson.moduleId]) {
        grouped[lesson.moduleId] = [];
      }
      grouped[lesson.moduleId].push(lesson);
    });
    return grouped;
  }, []);

  // Calculate module progress
  const moduleProgress = useMemo(() => {
    const result: Record<string, { total: number; completed: number }> = {};
    Object.entries(lessonsByModule).forEach(([moduleId, lessons]) => {
      result[moduleId] = {
        total: lessons.length,
        completed: lessons.filter((l) => progress[l.id]?.completed).length,
      };
    });
    return result;
  }, [lessonsByModule, progress, refreshKey]);

  // Get lessons for selected module
  const currentModuleLessons = selectedModule ? lessonsByModule[selectedModule] || [] : [];
  const currentModule = selectedModule ? LESSON_MODULES[selectedModule as keyof typeof LESSON_MODULES] : null;

  // Handle lesson completion
  const handleLessonComplete = () => {
    setActiveLesson(null);
    setViewMode("lessons");
    setRefreshKey((k) => k + 1);
  };

  // Lesson view
  if (viewMode === "lesson" && activeLesson) {
    return (
      <EnhancedQuizView
        lesson={activeLesson}
        onComplete={handleLessonComplete}
        onBack={() => {
          setActiveLesson(null);
          setViewMode("lessons");
        }}
      />
    );
  }

  // Lessons list view
  if (viewMode === "lessons" && currentModule) {
    return (
      <div className="min-h-screen p-4 space-y-6" key={refreshKey}>
        {/* Header with back button */}
        <motion.header 
          className="pt-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.button
            onClick={() => {
              setViewMode("modules");
              setSelectedModule(null);
            }}
            className="flex items-center gap-2 text-amber-400 font-medium mb-4"
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="h-4 w-4" />
            Modullar
          </motion.button>
          <div className="flex items-center gap-4">
            <motion.div 
              className="text-4xl"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              {currentModule.icon}
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold text-white">
                {currentModule.title}
              </h1>
              <p className="text-sm text-white/60">
                {moduleProgress[selectedModule]?.completed} / {moduleProgress[selectedModule]?.total} tugatildi
              </p>
            </div>
          </div>
        </motion.header>

        {/* Lessons List */}
        <motion.div 
          className="glass rounded-2xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          {currentModuleLessons.map((lesson, index) => (
            <EnhancedLessonCard
              key={lesson.id}
              lesson={lesson}
              isCompleted={progress[lesson.id]?.completed || false}
              progress={progress[lesson.id]?.completed ? 100 : (progress[lesson.id]?.currentQuestion || 0) * (100 / lesson.quiz.length)}
              onClick={() => {
                setActiveLesson(lesson);
                setViewMode("lesson");
              }}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    );
  }

  // Main modules view
  return (
    <div className="min-h-screen p-4 space-y-5 pb-28" key={refreshKey}>
      {/* Header */}
      <motion.header 
        className="pt-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-3 mb-1">
          <div className="p-2 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500">
            <GraduationCap className="h-6 w-6 text-amber-900" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">O'rganish</h1>
            <p className="text-sm text-white/60">Moliyaviy savodxonlik</p>
          </div>
        </div>
      </motion.header>

      {/* Stats Summary */}
      <motion.div 
        className="grid grid-cols-3 gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        <div className="glass rounded-xl p-3 text-center">
          <BookOpen className="h-5 w-5 text-emerald-400 mx-auto mb-1" />
          <p className="text-xl font-bold text-white">{learningStats.lessonsCompleted}</p>
          <p className="text-xs text-white/50">Darslar</p>
        </div>
        <div className="glass rounded-xl p-3 text-center">
          <Award className="h-5 w-5 text-amber-400 mx-auto mb-1" />
          <p className="text-xl font-bold text-white">{learningStats.averageScore}%</p>
          <p className="text-xs text-white/50">O'rtacha ball</p>
        </div>
        <div className="glass rounded-xl p-3 text-center">
          <GraduationCap className="h-5 w-5 text-purple-400 mx-auto mb-1" />
          <p className="text-xl font-bold text-white">{learningStats.achievementsUnlocked}</p>
          <p className="text-xs text-white/50">Yutuqlar</p>
        </div>
      </motion.div>

      {/* Level Progress */}
      <LevelProgress totalXP={stats.totalXP} />

      {/* Streak Display */}
      <StreakDisplay 
        currentStreak={stats.streak} 
        longestStreak={stats.longestStreak} 
      />

      {/* Achievements */}
      <AchievementsDisplay />

      {/* Modules */}
      <div>
        <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3 px-1">
          Modullar
        </h3>
        <div className="space-y-3">
          {Object.values(LESSON_MODULES).map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <ModuleCard
                module={module}
                lessonsCount={moduleProgress[module.id]?.total || 0}
                completedCount={moduleProgress[module.id]?.completed || 0}
                onClick={() => {
                  setSelectedModule(module.id);
                  setViewMode("lessons");
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
