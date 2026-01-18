import { useState, useEffect } from "react";
import { Check, X, ChevronRight, Trophy, ArrowLeft, BookOpen, Lightbulb, Zap, Clock, Target, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { LessonData } from "@/lib/lessonData";
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
  const [phase, setPhase] = useState<Phase>("content");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [newAchievements, setNewAchievements] = useState<string[]>([]);
  const [showAchievementModal, setShowAchievementModal] = useState(false);

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
      if (isPerfect) xpEarned += 25; // Perfect quiz bonus
      if (isSpeedBonus) xpEarned += 15; // Speed bonus
      
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
                {lesson.estimatedTime} daq
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
              <h2 className="font-semibold text-white">Umumiy ma'lumot</h2>
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
              <h2 className="font-semibold text-white">Asosiy nuqtalar</h2>
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
              <h3 className="font-medium text-emerald-400">Esda tuting</h3>
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
        <div className="p-4 border-t border-white/10 bg-black/30 backdrop-blur-xl">
          <motion.button
            onClick={() => setPhase("quiz")}
            className="w-full py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-amber-900 rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-amber-500/30"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Zap className="h-5 w-5" />
            Testni boshlash ({totalQuestions} savol)
            <ChevronRight className="h-5 w-5" />
          </motion.button>
        </div>
      </motion.div>
    );
  }

  // Results Phase
  if (phase === "results") {
    const finalCorrectCount = correctCount;
    const isPerfect = finalCorrectCount === totalQuestions;
    const percentage = Math.round((finalCorrectCount / totalQuestions) * 100);
    const timeSpent = Math.round((Date.now() - startTime) / 1000);
    const isSpeedBonus = timeSpent < 30 && isPerfect;
    
    let xpEarned = lesson.xpReward;
    if (isPerfect) xpEarned += 25;
    if (isSpeedBonus) xpEarned += 15;
    
    return (
      <motion.div 
        className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 p-4 flex flex-col items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {/* Achievement Modal */}
        <AnimatePresence>
          {showAchievementModal && newAchievements.length > 0 && (
            <motion.div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAchievementModal(false)}
            >
              <motion.div
                className="glass rounded-3xl p-6 max-w-sm w-full text-center"
                initial={{ scale: 0.5, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.5, y: 50 }}
                onClick={(e) => e.stopPropagation()}
              >
                <motion.div
                  className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, repeat: 2 }}
                >
                  <Sparkles className="h-10 w-10 text-amber-900" />
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-2">Yangi yutuq!</h3>
                {newAchievements.map((id) => {
                  const config = ACHIEVEMENTS_CONFIG[id as keyof typeof ACHIEVEMENTS_CONFIG];
                  return (
                    <div key={id} className="mb-3">
                      <p className="text-3xl mb-1">{config?.icon}</p>
                      <p className="text-amber-400 font-semibold">{config?.name.uz}</p>
                      <p className="text-white/60 text-sm">{config?.description.uz}</p>
                      <p className="text-amber-400 text-sm mt-1">+{config?.xpReward} XP</p>
                    </div>
                  );
                })}
                <motion.button
                  className="mt-4 px-6 py-2 bg-amber-500 text-amber-900 rounded-full font-semibold"
                  onClick={() => setShowAchievementModal(false)}
                  whileTap={{ scale: 0.95 }}
                >
                  Ajoyib!
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          className="glass rounded-3xl p-8 text-center max-w-sm w-full"
          initial={{ scale: 0.8, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          {/* Trophy Icon */}
          <motion.div 
            className={cn(
              "w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6",
              isPerfect 
                ? "bg-gradient-to-br from-amber-400 to-orange-500" 
                : percentage >= 70 
                  ? "bg-gradient-to-br from-emerald-400 to-emerald-500"
                  : "bg-gradient-to-br from-blue-400 to-blue-500"
            )}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          >
            <Trophy className={cn(
              "h-12 w-12",
              isPerfect ? "text-amber-900" : "text-white"
            )} />
          </motion.div>
          
          {/* Title */}
          <motion.h2 
            className="text-2xl font-bold text-white mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {isPerfect ? "Mukammal natija! 🎉" : percentage >= 70 ? "Yaxshi natija! 👏" : "Dars tugadi!"}
          </motion.h2>
          
          {/* Score */}
          <motion.div
            className="text-5xl font-bold mb-2"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
          >
            <span className={isPerfect ? "text-amber-400" : "text-white"}>{percentage}%</span>
          </motion.div>
          <p className="text-white/60 mb-6">
            {finalCorrectCount}/{totalQuestions} to'g'ri javob
          </p>
          
          {/* XP Earned */}
          <motion.div 
            className="bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-2xl p-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-sm text-white/60 mb-1">Siz oldingiz</p>
            <p className="text-4xl font-bold text-amber-400">+{xpEarned} XP</p>
            {isPerfect && (
              <p className="text-xs text-amber-400/80 mt-1">+25 XP Mukammal bonus!</p>
            )}
            {isSpeedBonus && (
              <p className="text-xs text-amber-400/80">+15 XP Tezlik bonus!</p>
            )}
          </motion.div>
          
          {/* Time Spent */}
          <p className="text-sm text-white/50 mb-6 flex items-center justify-center gap-1">
            <Clock className="h-4 w-4" />
            Sarflangan vaqt: {timeSpent} soniya
          </p>
          
          {/* Continue Button */}
          <motion.button
            onClick={onComplete}
            className="w-full py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-amber-900 rounded-2xl font-semibold shadow-lg shadow-amber-500/30"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Darslarga qaytish
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  // Quiz Phase
  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Header with progress */}
      <header className="p-4 border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="flex items-center gap-4 mb-3">
          <motion.button 
            onClick={() => setPhase("content")} 
            className="p-2 -ml-2 rounded-xl hover:bg-white/10 transition-colors"
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="h-5 w-5 text-white" />
          </motion.button>
          <div className="flex-1">
            <span className="text-sm text-white/60">
              Savol {currentQuestion + 1} / {totalQuestions}
            </span>
          </div>
          <span className="text-sm font-medium text-emerald-400 flex items-center gap-1">
            <Check className="h-4 w-4" />
            {correctCount} to'g'ri
          </span>
        </div>
        <Progress value={((currentQuestion + 1) / totalQuestions) * 100} className="h-2" />
      </header>

      {/* Question */}
      <div className="flex-1 p-4 flex flex-col">
        <motion.h2 
          className="text-xl font-bold text-white mb-6"
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {currentQ.question}
        </motion.h2>

        {/* Options */}
        <div className="space-y-3 flex-1">
          {currentQ.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === currentQ.correctIndex;
            const showCorrect = isAnswered && isCorrect;
            const showIncorrect = isAnswered && isSelected && !isCorrect;

            return (
              <motion.button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                disabled={isAnswered}
                className={cn(
                  "w-full p-4 rounded-2xl text-left font-medium transition-all flex items-center justify-between",
                  "border border-white/10",
                  !isAnswered && "bg-white/5 hover:bg-white/10 active:scale-[0.98]",
                  !isAnswered && isSelected && "ring-2 ring-amber-400 bg-amber-500/10",
                  showCorrect && "bg-emerald-500/20 border-emerald-400 text-emerald-400",
                  showIncorrect && "bg-red-500/20 border-red-400 text-red-400",
                  isAnswered && !showCorrect && !showIncorrect && "bg-white/5 opacity-50"
                )}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={!isAnswered ? { scale: 1.01 } : {}}
                whileTap={!isAnswered ? { scale: 0.99 } : {}}
              >
                <span className={cn(
                  "text-white",
                  showCorrect && "text-emerald-400",
                  showIncorrect && "text-red-400"
                )}>
                  {option}
                </span>
                {showCorrect && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Check className="h-5 w-5 text-emerald-400" />
                  </motion.div>
                )}
                {showIncorrect && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <X className="h-5 w-5 text-red-400" />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Explanation & Next */}
        <AnimatePresence>
          {isAnswered && (
            <motion.div 
              className="mt-6 space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Feedback */}
              <div
                className={cn(
                  "p-4 rounded-2xl text-center font-medium",
                  selectedAnswer === currentQ.correctIndex
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                    : "bg-red-500/20 text-red-400 border border-red-500/30"
                )}
              >
                {selectedAnswer === currentQ.correctIndex ? (
                  <span className="flex items-center justify-center gap-2">
                    <Check className="h-5 w-5" />
                    To'g'ri!
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <X className="h-5 w-5" />
                    Noto'g'ri
                  </span>
                )}
              </div>

              {/* Explanation */}
              {showExplanation && currentQ.explanation && (
                <motion.div 
                  className="p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                >
                  <p className="text-sm text-blue-300 flex items-start gap-2">
                    <Lightbulb className="h-4 w-4 mt-0.5 flex-shrink-0 text-blue-400" />
                    {currentQ.explanation}
                  </p>
                </motion.div>
              )}
              
              {/* Next button */}
              <motion.button
                onClick={handleNext}
                className="w-full py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-amber-900 rounded-2xl font-semibold flex items-center justify-center gap-2 shadow-lg shadow-amber-500/30"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {currentQuestion < totalQuestions - 1 ? (
                  <>
                    Keyingi savol
                    <ChevronRight className="h-5 w-5" />
                  </>
                ) : (
                  <>
                    <Trophy className="h-5 w-5" />
                    Darsni tugatish
                  </>
                )}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
