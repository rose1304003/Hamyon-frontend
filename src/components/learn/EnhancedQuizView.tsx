import { useState, useEffect } from "react";
import { Check, X, ChevronRight, Trophy, ArrowLeft, BookOpen, Lightbulb, Zap, Clock, Target, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { LessonData } from "@/lib/lessonData";
import { useLanguage } from "@/lib/i18n";
import { saveLessonProgress, addXP, incrementLessonsCompleted, incrementQuizzesAced, resetPerfectQuizStreak, checkAndUnlockAchievements } from "@/lib/storage";
import { Progress } from "@/components/ui/progress";
import { ACHIEVEMENTS_CONFIG } from "@/lib/gamification";

interface EnhancedQuizViewProps {
  lesson: LessonData;
  onComplete: () => void;
  onBack: () => void;
}

type Phase = "content" | "quiz" | "results";

export function EnhancedQuizView({ lesson, onComplete, onBack }: EnhancedQuizViewProps) {
  const { language } = useLanguage();
  const [phase, setPhase] = useState<Phase>("content");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [newAchievements, setNewAchievements] = useState<string[]>([]);
  const [showAchievementModal, setShowAchievementModal] = useState(false);

  const texts = {
    min: { en: "min", ru: "мин", uz: "daq" },
    overview: { en: "Overview", ru: "Обзор", uz: "Umumiy ma'lumot" },
    keyPoints: { en: "Key Points", ru: "Ключевые моменты", uz: "Asosiy nuqtalar" },
    remember: { en: "Remember", ru: "Запомните", uz: "Esda tuting" },
    startQuiz: { en: "Start Quiz", ru: "Начать тест", uz: "Testni boshlash" },
    questions: { en: "questions", ru: "вопросов", uz: "savol" },
    question: { en: "Question", ru: "Вопрос", uz: "Savol" },
    of: { en: "of", ru: "из", uz: "dan" },
    correct: { en: "Correct!", ru: "Правильно!", uz: "To'g'ri!" },
    incorrect: { en: "Incorrect", ru: "Неправильно", uz: "Noto'g'ri" },
    correctAnswerWas: { en: "Correct answer was:", ru: "Правильный ответ:", uz: "To'g'ri javob:" },
    nextQuestion: { en: "Next", ru: "Далее", uz: "Keyingi" },
    finishQuiz: { en: "Finish", ru: "Завершить", uz: "Tugatish" },
    lessonComplete: { en: "Lesson Complete!", ru: "Урок завершён!", uz: "Dars tugadi!" },
    youScored: { en: "You scored", ru: "Ваш результат", uz: "Natijangiz" },
    perfect: { en: "Perfect Score! 🎉", ru: "Идеальный результат! 🎉", uz: "Mukammal natija! 🎉" },
    goodJob: { en: "Good job!", ru: "Хорошая работа!", uz: "Yaxshi ish!" },
    keepPracticing: { en: "Keep practicing!", ru: "Продолжайте практиковаться!", uz: "Mashq qilishni davom eting!" },
    xpEarned: { en: "XP Earned", ru: "Получено XP", uz: "Olingan XP" },
    perfectBonus: { en: "Perfect Bonus", ru: "Бонус за идеал", uz: "Mukammal bonus" },
    backToLessons: { en: "Back to Lessons", ru: "К урокам", uz: "Darslarga qaytish" },
    newAchievement: { en: "New Achievement!", ru: "Новое достижение!", uz: "Yangi yutuq!" },
    close: { en: "Close", ru: "Закрыть", uz: "Yopish" },
  };

  const questions = lesson.quiz || [];
  const totalQuestions = questions.length;
  const currentQ = questions[currentQuestion] || { question: '', options: [], correctIndex: 0, explanation: '' };

  useEffect(() => {
    if (phase === "quiz" && startTime === 0) {
      setStartTime(Date.now());
    }
  }, [phase, startTime]);

  const handleSelectAnswer = (index: number) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
    setIsAnswered(true);
    setShowExplanation(true);
    
    if (index === currentQ.correctIndex) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setShowExplanation(false);
    } else {
      // Quiz complete - calculate results
      const finalCorrectCount = correctCount + (selectedAnswer === currentQ.correctIndex ? 1 : 0);
      const isPerfect = finalCorrectCount === totalQuestions;
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      const isSpeedBonus = timeSpent < 30 && isPerfect;
      
      // Calculate XP with bonuses
      let xpEarned = lesson.xpReward;
      if (isPerfect) xpEarned += 25;
      if (isSpeedBonus) xpEarned += 15;
      
      // Update stats
      addXP(xpEarned);
      incrementLessonsCompleted();
      
      if (isPerfect) {
        incrementQuizzesAced();
      } else {
        resetPerfectQuizStreak();
      }
      
      // Save progress
      saveLessonProgress(lesson.id, {
        lessonId: lesson.id,
        completed: true,
        currentQuestion: totalQuestions,
        correctAnswers: finalCorrectCount,
        completedAt: Date.now(),
        timeSpent,
      });
      
      // Check for new achievements
      const unlockedAchievements = checkAndUnlockAchievements();
      if (unlockedAchievements.length > 0) {
        setNewAchievements(unlockedAchievements);
        setShowAchievementModal(true);
      }
      
      setPhase("results");
    }
  };

  // Content Phase - Show lesson content first
  if (phase === "content") {
    return (
      <motion.div 
        className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Header */}
        <header className="p-4 flex items-center gap-4 border-b border-white/10 bg-black/20 backdrop-blur-sm">
          <motion.button 
            onClick={onBack} 
            className="p-2 -ml-2 rounded-xl hover:bg-white/10 transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="h-5 w-5 text-white" />
          </motion.button>
          <div className="flex-1">
            <h1 className="font-semibold text-white line-clamp-1">
              {lesson.title}
            </h1>
            <div className="flex items-center gap-3 text-xs text-white/60">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {lesson.estimatedTime} {texts.min[language]}
              </span>
              <span className="flex items-center gap-1 text-amber-400">
                <Zap className="h-3 w-3" />
                +{lesson.xpReward} XP
              </span>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-4 space-y-5 overflow-auto pb-24">
          {/* Description Card */}
          <motion.div 
            className="glass rounded-2xl p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 rounded-xl bg-blue-500/20">
                <BookOpen className="h-5 w-5 text-blue-400" />
              </div>
              <h2 className="font-semibold text-white">{texts.overview[language]}</h2>
            </div>
            <p className="text-white/70 text-sm leading-relaxed">{lesson.description}</p>
          </motion.div>

          {/* Key Points Card */}
          <motion.div 
            className="glass rounded-2xl p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-xl bg-amber-500/20">
                <Lightbulb className="h-5 w-5 text-amber-400" />
              </div>
              <h2 className="font-semibold text-white">{texts.keyPoints[language]}</h2>
            </div>
            <div className="space-y-3">
              {lesson.content.map((point, index) => (
                <motion.div 
                  key={index} 
                  className="flex gap-3 items-start"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <span className="w-6 h-6 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-amber-900 text-sm font-bold flex items-center justify-center flex-shrink-0">
                    {index + 1}
                  </span>
                  <p className="text-white/80 text-sm leading-relaxed">{point}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Tips */}
          <motion.div 
            className="rounded-2xl p-4 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <Target className="h-5 w-5 text-emerald-400" />
              <h3 className="font-medium text-emerald-400">{texts.remember[language]}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {lesson.keyPoints.map((tip, index) => (
                <motion.span 
                  key={index}
                  className="px-3 py-1.5 bg-white/10 rounded-full text-sm text-white/80"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                >
                  {tip}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Start Quiz Button */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-emerald-900 via-emerald-900/95 to-transparent">
          <motion.button
            onClick={() => setPhase("quiz")}
            className="w-full py-4 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl text-amber-900 font-bold text-lg shadow-lg shadow-amber-500/30 flex items-center justify-center gap-3"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {texts.startQuiz[language]}
            <span className="text-sm opacity-80">({totalQuestions} {texts.questions[language]})</span>
            <ChevronRight className="h-5 w-5" />
          </motion.button>
        </div>
      </motion.div>
    );
  }

  // Quiz Phase
  if (phase === "quiz") {
    const progressPercent = ((currentQuestion + 1) / totalQuestions) * 100;
    
    return (
      <motion.div 
        className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Header with progress */}
        <header className="p-4 border-b border-white/10 bg-black/20 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-3">
            <motion.button 
              onClick={onBack}
              className="p-2 -ml-2 rounded-xl hover:bg-white/10"
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft className="h-5 w-5 text-white" />
            </motion.button>
            <span className="text-sm text-white/60">
              {texts.question[language]} {currentQuestion + 1} {texts.of[language]} {totalQuestions}
            </span>
            <span className="flex items-center gap-1 text-amber-400 text-sm">
              <Zap className="h-4 w-4" />
              +{lesson.xpReward}
            </span>
          </div>
          <Progress value={progressPercent} className="h-2" />
        </header>

        {/* Question */}
        <div className="flex-1 p-4 flex flex-col">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 flex flex-col"
          >
            <h2 className="text-xl font-semibold text-white mb-6 leading-relaxed">
              {currentQ.question}
            </h2>

            {/* Options */}
            <div className="space-y-3">
              {currentQ.options.map((option, index) => {
                const isSelected = selectedAnswer === index;
                const isCorrect = index === currentQ.correctIndex;
                const showResult = isAnswered;
                
                return (
                  <motion.button
                    key={index}
                    onClick={() => handleSelectAnswer(index)}
                    disabled={isAnswered}
                    className={cn(
                      "w-full p-4 rounded-2xl text-left transition-all",
                      "border-2",
                      !showResult && "bg-white/10 border-transparent hover:bg-white/15",
                      showResult && isCorrect && "bg-emerald-500/20 border-emerald-500",
                      showResult && isSelected && !isCorrect && "bg-rose-500/20 border-rose-500",
                      showResult && !isSelected && !isCorrect && "opacity-50"
                    )}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileTap={!isAnswered ? { scale: 0.98 } : {}}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm",
                        !showResult && "bg-white/20",
                        showResult && isCorrect && "bg-emerald-500 text-white",
                        showResult && isSelected && !isCorrect && "bg-rose-500 text-white"
                      )}>
                        {showResult && isCorrect ? (
                          <Check className="h-4 w-4" />
                        ) : showResult && isSelected ? (
                          <X className="h-4 w-4" />
                        ) : (
                          String.fromCharCode(65 + index)
                        )}
                      </div>
                      <span className="flex-1 text-white">{option}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Explanation */}
            <AnimatePresence>
              {showExplanation && currentQ.explanation && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={cn(
                    "mt-6 p-4 rounded-2xl",
                    selectedAnswer === currentQ.correctIndex
                      ? "bg-emerald-500/20 border border-emerald-500/30"
                      : "bg-rose-500/20 border border-rose-500/30"
                  )}
                >
                  <p className={cn(
                    "font-semibold mb-2",
                    selectedAnswer === currentQ.correctIndex ? "text-emerald-400" : "text-rose-400"
                  )}>
                    {selectedAnswer === currentQ.correctIndex 
                      ? texts.correct[language]
                      : texts.incorrect[language]}
                  </p>
                  <p className="text-white/80 text-sm">{currentQ.explanation}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Next Button */}
          {isAnswered && (
            <motion.button
              onClick={handleNext}
              className="mt-4 w-full py-4 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl text-amber-900 font-bold text-lg flex items-center justify-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileTap={{ scale: 0.98 }}
            >
              {currentQuestion < totalQuestions - 1 ? texts.nextQuestion[language] : texts.finishQuiz[language]}
              <ChevronRight className="h-5 w-5" />
            </motion.button>
          )}
        </div>
      </motion.div>
    );
  }

  // Results Phase
  const finalCorrect = correctCount + (selectedAnswer === currentQ.correctIndex ? 1 : 0);
  const isPerfect = finalCorrect === totalQuestions;
  const percentage = Math.round((finalCorrect / totalQuestions) * 100);
  
  let xpEarned = lesson.xpReward;
  if (isPerfect) xpEarned += 25;
  
  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 flex flex-col items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Trophy Icon */}
      <motion.div
        className={cn(
          "w-24 h-24 rounded-3xl flex items-center justify-center mb-6",
          isPerfect 
            ? "bg-gradient-to-br from-amber-400 to-orange-500" 
            : "bg-gradient-to-br from-emerald-400 to-teal-500"
        )}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
      >
        <Trophy className="h-12 w-12 text-white" />
      </motion.div>

      {/* Title */}
      <motion.h1 
        className="text-2xl font-bold text-white mb-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {texts.lessonComplete[language]}
      </motion.h1>
      
      {/* Score */}
      <motion.p 
        className="text-white/60 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        {texts.youScored[language]} {finalCorrect}/{totalQuestions} ({percentage}%)
      </motion.p>

      {/* Score Card */}
      <motion.div
        className="w-full max-w-sm glass rounded-2xl p-6 mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {isPerfect && (
          <div className="text-center mb-4 p-3 bg-amber-500/20 rounded-xl">
            <Sparkles className="h-6 w-6 text-amber-400 mx-auto mb-1" />
            <p className="text-amber-400 font-semibold">{texts.perfect[language]}</p>
          </div>
        )}
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-white/60">{texts.xpEarned[language]}</span>
            <span className="text-amber-400 font-bold flex items-center gap-1">
              <Zap className="h-4 w-4" />
              +{lesson.xpReward} XP
            </span>
          </div>
          {isPerfect && (
            <div className="flex items-center justify-between">
              <span className="text-white/60">{texts.perfectBonus[language]}</span>
              <span className="text-emerald-400 font-bold">+25 XP</span>
            </div>
          )}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            <span className="text-white font-medium">Total</span>
            <span className="text-xl font-bold text-amber-400">+{xpEarned} XP</span>
          </div>
        </div>
      </motion.div>

      {/* Back Button */}
      <motion.button
        onClick={onComplete}
        className="w-full max-w-sm py-4 bg-gradient-to-r from-amber-400 to-orange-500 rounded-2xl text-amber-900 font-bold text-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        whileTap={{ scale: 0.98 }}
      >
        {texts.backToLessons[language]}
      </motion.button>

      {/* Achievement Modal */}
      <AnimatePresence>
        {showAchievementModal && newAchievements.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="w-full max-w-sm glass rounded-3xl p-6 text-center"
            >
              <motion.div
                className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center"
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-4xl">{ACHIEVEMENTS_CONFIG[newAchievements[0] as keyof typeof ACHIEVEMENTS_CONFIG]?.icon}</span>
              </motion.div>
              
              <h2 className="text-xl font-bold text-white mb-2">{texts.newAchievement[language]}</h2>
              <p className="text-lg text-amber-400 font-semibold mb-4">
                {ACHIEVEMENTS_CONFIG[newAchievements[0] as keyof typeof ACHIEVEMENTS_CONFIG]?.name[language]}
              </p>
              <p className="text-white/60 text-sm mb-6">
                {ACHIEVEMENTS_CONFIG[newAchievements[0] as keyof typeof ACHIEVEMENTS_CONFIG]?.description[language]}
              </p>
              
              <button
                onClick={() => setShowAchievementModal(false)}
                className="w-full py-3 bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl text-amber-900 font-bold"
              >
                {texts.close[language]}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
