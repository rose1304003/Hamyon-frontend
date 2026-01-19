import { Settings } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

interface ProfileHeaderProps {
  name: string;
  avatar?: string;
  level: number;
  xp: number;
  xpToNext: number;
}

export function ProfileHeader({ name, level, xp, xpToNext }: ProfileHeaderProps) {
  const { t } = useLanguage();
  const progress = (xp / xpToNext) * 100;

  return (
    <div className="glass rounded-2xl p-6 animate-fade-in">
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-2xl font-bold text-amber-900 shadow-lg shadow-amber-500/30">
            {name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{name}</h2>
            <p className="text-sm text-white/60">{t("profile.financialExplorer")}</p>
          </div>
        </div>
        <button className="p-2 rounded-xl bg-white/10 active:bg-white/20 transition-colors">
          <Settings className="h-5 w-5 text-white/60" />
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div className="px-3 py-1.5 bg-amber-400/20 rounded-full">
          <span className="text-sm font-semibold text-amber-400">Level {level}</span>
        </div>
        <div className="flex-1">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-white/60">XP</span>
            <span className="font-medium text-white">{xp}/{xpToNext}</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
