import { Trophy, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { ACHIEVEMENTS_CONFIG } from "@/lib/gamification";
import { AchievementBadge } from "./AchievementBadge";
import { getUserStats } from "@/lib/storage";
import { useState } from "react";

interface AchievementsDisplayProps {
  compact?: boolean;
}

export function AchievementsDisplay({ compact = true }: AchievementsDisplayProps) {
  const [showAll, setShowAll] = useState(false);
  const stats = getUserStats();
  const unlockedAchievements = stats.achievements || [];
  const allAchievementIds = Object.keys(ACHIEVEMENTS_CONFIG);
  const unlockedCount = unlockedAchievements.length;

  const displayedAchievements = showAll 
    ? allAchievementIds 
    : allAchievementIds.slice(0, 8);

  return (
    <motion.div 
      className="glass rounded-2xl p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-amber-500/20">
            <Trophy className="h-5 w-5 text-amber-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white">Yutuqlar</h3>
            <p className="text-xs text-white/50">Moliyaviy muvaffaqiyatlar</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-white/60">
            {unlockedCount}/{allAchievementIds.length}
          </span>
          <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(unlockedCount / allAchievementIds.length) * 100}%` }}
              transition={{ duration: 0.5, delay: 0.3 }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
        {displayedAchievements.map((id, index) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <AchievementBadge
              achievementId={id}
              unlocked={unlockedAchievements.includes(id)}
              size="sm"
            />
          </motion.div>
        ))}
      </div>

      {!showAll && allAchievementIds.length > 8 && (
        <motion.button
          className="w-full mt-4 pt-3 border-t border-white/10 flex items-center justify-center gap-2 text-sm text-amber-400 font-medium"
          onClick={() => setShowAll(true)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Hammasini ko'rish
          <ChevronRight className="h-4 w-4" />
        </motion.button>
      )}

      {showAll && (
        <motion.button
          className="w-full mt-4 pt-3 border-t border-white/10 flex items-center justify-center gap-2 text-sm text-white/60"
          onClick={() => setShowAll(false)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Kamroq ko'rsatish
        </motion.button>
      )}
    </motion.div>
  );
}
