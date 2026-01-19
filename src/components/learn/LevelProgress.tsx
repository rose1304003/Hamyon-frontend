import { Star, Zap, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { calculateLevel, getXPProgress, getLevelTitle, getLevelColor, LEVEL_THRESHOLDS } from "@/lib/gamification";
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/lib/i18n";

interface LevelProgressProps {
  totalXP: number;
  showDetails?: boolean;
}

export function LevelProgress({ totalXP, showDetails = true }: LevelProgressProps) {
  const { language } = useLanguage();
  const level = calculateLevel(totalXP);
  const { current, next, progress } = getXPProgress(totalXP);
  const title = getLevelTitle(level, language);
  const levelColor = getLevelColor(level);

  const texts = {
    nextLevel: { uz: "Keyingi darajaga", ru: "До следующего уровня", en: "To next level" },
    xpNeeded: { uz: "XP kerak", ru: "XP нужно", en: "XP needed" },
  };

  return (
    <motion.div 
      className="glass rounded-2xl p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-4">
        {/* Level Badge - Animated */}
        <div className="relative">
          <motion.div 
            className={cn(
              "w-16 h-16 rounded-2xl flex items-center justify-center",
              "bg-gradient-to-br shadow-lg",
              levelColor
            )}
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-3xl font-bold text-white drop-shadow-lg">{level}</span>
          </motion.div>
          <motion.div 
            className="absolute -bottom-1 -right-1 bg-amber-400 rounded-full p-1 shadow-lg"
            animate={{ 
              scale: [1, 1.2, 1],
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Star className="h-4 w-4 text-amber-900 fill-current" />
          </motion.div>
        </div>

        {/* Progress Info */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-white">{title}</h3>
            <span className="text-sm text-amber-400 font-medium flex items-center gap-1">
              <Zap className="h-4 w-4" />
              {totalXP.toLocaleString()} XP
            </span>
          </div>
          
          <Progress value={progress} className="h-3 mb-1" />
          
          <div className="flex justify-between text-xs text-white/60">
            <span>{current.toLocaleString()} / {next.toLocaleString()} XP</span>
            <span className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              Level {level + 1}
            </span>
          </div>
        </div>
      </div>

      {showDetails && level < LEVEL_THRESHOLDS.length && (
        <motion.div 
          className="mt-4 pt-4 border-t border-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <p className="text-sm text-white/60">
              {texts.nextLevel[language]}
            </p>
            <p className="text-sm font-medium text-amber-400">
              {(next - current).toLocaleString()} {texts.xpNeeded[language]}
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
