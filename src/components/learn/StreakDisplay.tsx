import { Flame, Calendar, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";

interface StreakDisplayProps {
  currentStreak: number;
  longestStreak?: number;
}

export function StreakDisplay({ currentStreak, longestStreak = 0 }: StreakDisplayProps) {
  const { language } = useLanguage();
  
  // Day names in different languages
  const dayNames: Record<string, string[]> = {
    uz: ['Y', 'D', 'S', 'Ch', 'P', 'J', 'Sh'],
    ru: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    en: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  };

  const texts = {
    dailyStreak: { uz: "Kunlik streak", ru: "Ежедневная серия", en: "Daily Streak" },
    longest: { uz: "Eng uzun", ru: "Лучший", en: "Best" },
    days: { uz: "kun", ru: "дн.", en: "days" },
    day: { uz: "kun", ru: "дн.", en: "day" },
    weekStreak: { uz: "Ajoyib! Bir haftalik streak!", ru: "Отлично! Недельная серия!", en: "Amazing! One week streak!" },
    keepGoing: { uz: "Zo'r ketayapsiz! Davom eting!", ru: "Отлично идёте! Продолжайте!", en: "Great progress! Keep going!" },
    goodStart: { uz: "Yaxshi boshlandingiz!", ru: "Хорошее начало!", en: "Good start!" },
  };

  // Generate last 7 days
  const days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return {
      day: dayNames[language][date.getDay()],
      isActive: i >= 7 - Math.min(currentStreak, 7),
      isToday: i === 6,
    };
  });

  return (
    <motion.div 
      className="glass rounded-2xl p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <motion.div 
            className={cn(
              "p-2.5 rounded-xl",
              currentStreak > 0 
                ? "bg-gradient-to-br from-orange-400 to-red-500" 
                : "bg-white/10"
            )}
            animate={currentStreak > 0 ? {
              scale: [1, 1.1, 1],
            } : {}}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Flame className={cn(
              "h-5 w-5",
              currentStreak > 0 ? "text-white" : "text-white/40"
            )} />
          </motion.div>
          <div>
            <h3 className="font-semibold text-white">{texts.dailyStreak[language]}</h3>
            <div className="flex items-center gap-2 text-xs text-white/60">
              <Trophy className="h-3 w-3" />
              <span>{texts.longest[language]}: {longestStreak} {texts.days[language]}</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <motion.p 
            className={cn(
              "text-3xl font-bold",
              currentStreak > 0 ? "text-orange-400" : "text-white/40"
            )}
            key={currentStreak}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            {currentStreak}
          </motion.p>
          <p className="text-xs text-white/60">{texts.day[language]}</p>
        </div>
      </div>

      {/* Week visualization */}
      <div className="flex justify-between gap-1">
        {days.map((day, index) => (
          <motion.div 
            key={index} 
            className="flex flex-col items-center gap-1.5 flex-1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <motion.div
              className={cn(
                "w-full aspect-square rounded-lg flex items-center justify-center transition-all",
                day.isActive 
                  ? "bg-gradient-to-br from-orange-400 to-red-500 shadow-lg shadow-orange-500/30" 
                  : "bg-white/10",
                day.isToday && "ring-2 ring-amber-400 ring-offset-2 ring-offset-transparent"
              )}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {day.isActive ? (
                <Flame className="h-4 w-4 text-white" />
              ) : (
                <Calendar className="h-4 w-4 text-white/40" />
              )}
            </motion.div>
            <span className={cn(
              "text-xs",
              day.isToday ? "text-amber-400 font-semibold" : "text-white/50"
            )}>
              {day.day}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Motivation message */}
      {currentStreak > 0 && (
        <motion.div 
          className="mt-4 pt-3 border-t border-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-xs text-center text-white/60">
            {currentStreak >= 7 
              ? `🎉 ${texts.weekStreak[language]}` 
              : currentStreak >= 3 
                ? `🔥 ${texts.keepGoing[language]}`
                : `💪 ${texts.goodStart[language]}`}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
