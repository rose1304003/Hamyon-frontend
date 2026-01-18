import { cn } from "@/lib/utils";
import { Lock } from "lucide-react";
import { motion } from "framer-motion";
import { ACHIEVEMENTS_CONFIG } from "@/lib/gamification";

interface AchievementBadgeProps {
  achievementId: string;
  unlocked: boolean;
  size?: "sm" | "md" | "lg";
  showDetails?: boolean;
  onClick?: () => void;
}

export function AchievementBadge({ 
  achievementId, 
  unlocked, 
  size = "md",
  showDetails = false,
  onClick
}: AchievementBadgeProps) {
  const config = ACHIEVEMENTS_CONFIG[achievementId as keyof typeof ACHIEVEMENTS_CONFIG];

  if (!config) return null;

  const sizeClasses = {
    sm: "w-12 h-12 text-xl",
    md: "w-16 h-16 text-2xl",
    lg: "w-20 h-20 text-3xl",
  };

  return (
    <motion.div 
      className={cn("flex flex-col items-center gap-2", showDetails && "p-3")}
      whileHover={onClick ? { scale: 1.05 } : {}}
      whileTap={onClick ? { scale: 0.95 } : {}}
      onClick={onClick}
    >
      <motion.div
        className={cn(
          "rounded-full flex items-center justify-center transition-all relative cursor-pointer",
          sizeClasses[size],
          unlocked 
            ? "bg-gradient-to-br from-amber-400/30 to-orange-500/40 shadow-lg shadow-amber-500/20" 
            : "bg-white/10 grayscale"
        )}
        initial={unlocked ? { scale: 0 } : { scale: 1 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
      >
        {unlocked ? (
          <motion.span 
            initial={{ opacity: 0, rotate: -180 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 0.5 }}
          >
            {config.icon}
          </motion.span>
        ) : (
          <Lock className="h-5 w-5 text-white/30" />
        )}
        
        {/* Unlocked checkmark */}
        {unlocked && (
          <motion.div 
            className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <span className="text-xs text-white">✓</span>
          </motion.div>
        )}
      </motion.div>
      
      {showDetails && (
        <div className="text-center">
          <p className={cn(
            "text-sm font-medium",
            unlocked ? "text-white" : "text-white/50"
          )}>
            {config.name.uz}
          </p>
          <p className="text-xs text-white/50 mt-0.5">
            {config.description.uz}
          </p>
          {!unlocked && (
            <p className="text-xs text-amber-400 mt-1 font-medium">+{config.xpReward} XP</p>
          )}
        </div>
      )}
    </motion.div>
  );
}
