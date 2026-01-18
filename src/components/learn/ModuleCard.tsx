import { ChevronRight, Lock, CheckCircle2, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ModuleCardProps {
  module: {
    id: string;
    title: string;
    icon: string;
    color: string;
    description?: string;
  };
  lessonsCount: number;
  completedCount: number;
  isLocked?: boolean;
  onClick: () => void;
}

export function ModuleCard({ 
  module, 
  lessonsCount, 
  completedCount, 
  isLocked = false,
  onClick 
}: ModuleCardProps) {
  const isComplete = completedCount === lessonsCount && lessonsCount > 0;
  const progress = lessonsCount > 0 ? (completedCount / lessonsCount) * 100 : 0;

  const colorMap: Record<string, string> = {
    emerald: "from-emerald-500/30 to-emerald-600/20 border-emerald-500/30",
    blue: "from-blue-500/30 to-blue-600/20 border-blue-500/30",
    amber: "from-amber-500/30 to-amber-600/20 border-amber-500/30",
    purple: "from-purple-500/30 to-purple-600/20 border-purple-500/30",
    rose: "from-rose-500/30 to-rose-600/20 border-rose-500/30",
  };

  const iconBgMap: Record<string, string> = {
    emerald: "bg-emerald-500/20",
    blue: "bg-blue-500/20",
    amber: "bg-amber-500/20",
    purple: "bg-purple-500/20",
    rose: "bg-rose-500/20",
  };

  const progressColorMap: Record<string, string> = {
    emerald: "from-emerald-400 to-emerald-500",
    blue: "from-blue-400 to-blue-500",
    amber: "from-amber-400 to-amber-500",
    purple: "from-purple-400 to-purple-500",
    rose: "from-rose-400 to-rose-500",
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={isLocked}
      className={cn(
        "w-full p-4 rounded-2xl text-left transition-all",
        "bg-gradient-to-br border backdrop-blur-sm",
        colorMap[module.color] || colorMap.emerald,
        isLocked ? "opacity-50" : "active:scale-[0.98]"
      )}
      whileHover={!isLocked ? { scale: 1.02, y: -2 } : {}}
      whileTap={!isLocked ? { scale: 0.98 } : {}}
    >
      <div className="flex items-center gap-4">
        {/* Module Icon */}
        <motion.div 
          className={cn(
            "w-14 h-14 rounded-xl flex items-center justify-center text-3xl",
            "shadow-lg",
            iconBgMap[module.color] || iconBgMap.emerald
          )}
          whileHover={{ rotate: 5, scale: 1.1 }}
        >
          {isLocked ? <Lock className="h-6 w-6 text-white/50" /> : module.icon}
        </motion.div>

        {/* Module Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-white truncate">
              {module.title}
            </h3>
            {isComplete && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0" />
              </motion.div>
            )}
          </div>
          
          {module.description && (
            <p className="text-xs text-white/50 mb-2 truncate">{module.description}</p>
          )}
          
          <div className="flex items-center gap-3">
            {/* Progress bar */}
            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                className={cn(
                  "h-full rounded-full bg-gradient-to-r",
                  isComplete 
                    ? "from-emerald-400 to-emerald-500" 
                    : progressColorMap[module.color] || progressColorMap.emerald
                )}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
            
            {/* Count */}
            <div className="flex items-center gap-1.5 text-xs text-white/60">
              <BookOpen className="h-3.5 w-3.5" />
              <span className="font-medium">{completedCount}/{lessonsCount}</span>
            </div>
          </div>
        </div>

        {/* Arrow */}
        {!isLocked && (
          <ChevronRight className="h-5 w-5 text-white/40 flex-shrink-0" />
        )}
      </div>
    </motion.button>
  );
}
