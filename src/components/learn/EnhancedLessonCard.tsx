import { Check, Clock, Star, ChevronRight, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LessonData } from "@/lib/lessonData";

interface EnhancedLessonCardProps {
  lesson: LessonData;
  isCompleted: boolean;
  progress: number;
  onClick: () => void;
  index?: number;
}

export function EnhancedLessonCard({ lesson, isCompleted, progress, onClick, index = 0 }: EnhancedLessonCardProps) {
  const difficultyColors = {
    beginner: "bg-emerald-500/20 text-emerald-400",
    intermediate: "bg-amber-500/20 text-amber-400",
    advanced: "bg-rose-500/20 text-rose-400",
  };

  const difficultyLabels = {
    beginner: "Boshlang'ich",
    intermediate: "O'rta",
    advanced: "Yuqori",
  };

  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "w-full p-4 text-left transition-all active:scale-[0.99]",
        "border-b border-white/10 last:border-b-0",
        isCompleted && "bg-emerald-500/5"
      )}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ x: 4, backgroundColor: "rgba(255,255,255,0.03)" }}
    >
      <div className="flex items-start gap-4">
        {/* Lesson Icon with completion indicator */}
        <div className="relative">
          <motion.div 
            className={cn(
              "w-12 h-12 rounded-xl flex items-center justify-center text-2xl",
              "bg-white/10",
              isCompleted && "bg-emerald-500/20"
            )}
            whileHover={{ scale: 1.05, rotate: 5 }}
          >
            {isCompleted ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Check className="h-6 w-6 text-emerald-400" />
              </motion.div>
            ) : (
              lesson.icon
            )}
          </motion.div>
          
          {/* XP indicator */}
          {!isCompleted && (
            <div className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-amber-500 rounded-full flex items-center gap-0.5">
              <Zap className="h-2.5 w-2.5 text-amber-900" />
              <span className="text-[10px] font-bold text-amber-900">{lesson.xpReward}</span>
            </div>
          )}
        </div>

        {/* Lesson Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-medium text-white truncate">
              {lesson.title}
            </h4>
          </div>
          
          <p className="text-sm text-white/50 line-clamp-1 mb-2">
            {lesson.description}
          </p>
          
          <div className="flex items-center gap-3 flex-wrap">
            {/* Difficulty badge */}
            <span className={cn(
              "text-xs font-medium px-2 py-0.5 rounded-full",
              difficultyColors[lesson.difficulty]
            )}>
              {difficultyLabels[lesson.difficulty]}
            </span>
            
            {/* Duration */}
            <span className="flex items-center gap-1 text-xs text-white/50">
              <Clock className="h-3 w-3" />
              {lesson.estimatedTime} daq
            </span>
            
            {/* Quiz count */}
            <span className="flex items-center gap-1 text-xs text-white/50">
              <Star className="h-3 w-3" />
              {lesson.quiz.length} savol
            </span>
          </div>
          
          {/* Progress bar for in-progress lessons */}
          {!isCompleted && progress > 0 && (
            <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          )}
        </div>

        {/* Arrow */}
        <ChevronRight className="h-5 w-5 text-white/30 flex-shrink-0 mt-3" />
      </div>
    </motion.button>
  );
}
