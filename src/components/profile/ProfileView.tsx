import { useState } from "react";
import { motion } from "framer-motion";
import {
  Flame,
  BookOpen,
  PiggyBank,
  ChevronRight,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  X,
  Palette,
  Coins,
  Download,
} from "lucide-react";
import { ProfileHeader, StatCard } from "@/components/profile";
import { NotificationSettingsView, ThemeToggle, CurrencySettings, DataExport } from "@/components/settings";
import { useLanguage, Language } from "@/lib/i18n";
import { getUserStats, getCompletedLessonsCount, getTotalSaved } from "@/lib/storage";
import { cn } from "@/lib/utils";
import { useTelegram } from "@/hooks";

const languages: { code: Language; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
  { code: "uz", label: "O'zbek", flag: "🇺🇿" },
];

type SettingsView = "main" | "notifications" | "appearance" | "currency" | "data";

export function ProfileView() {
  const { t, language, setLanguage } = useLanguage();
  const { user } = useTelegram();
  const [currentView, setCurrentView] = useState<SettingsView>("main");
  const stats = getUserStats();
  const lessonsCompleted = getCompletedLessonsCount();
  const totalSaved = getTotalSaved();

  const formatAmount = (amount: number) => {
    if (amount >= 1000000) return (amount / 1000000).toFixed(1) + "M";
    if (amount >= 1000) return (amount / 1000).toFixed(0) + "K";
    return amount.toString();
  };

  const userName = user?.first_name || t("home.student");

  const SubViewHeader = ({ title }: { title: string }) => (
    <header className="pt-2 flex items-center gap-3 px-4">
      <button onClick={() => setCurrentView("main")} className="p-2 -ml-2 rounded-full hover:bg-white/10">
        <X className="h-5 w-5 text-white" />
      </button>
      <h1 className="text-2xl font-bold text-white">{title}</h1>
    </header>
  );

  if (currentView === "notifications") {
    return (
      <motion.div
        className="space-y-6 p-4"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
      >
        <SubViewHeader title={t("notifications.title")} />
        <NotificationSettingsView />
      </motion.div>
    );
  }

  if (currentView === "appearance") {
    return (
      <motion.div
        className="space-y-6 p-4"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
      >
        <SubViewHeader title={t("profile.appearance")} />
        <ThemeToggle />
      </motion.div>
    );
  }

  if (currentView === "currency") {
    return (
      <motion.div
        className="space-y-6 p-4"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
      >
        <SubViewHeader title={t("profile.currency")} />
        <CurrencySettings />
      </motion.div>
    );
  }

  if (currentView === "data") {
    return (
      <motion.div
        className="space-y-6 p-4"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
      >
        <SubViewHeader title={t("profile.data")} />
        <DataExport />
      </motion.div>
    );
  }

  return (
    <motion.div
      className="space-y-6 p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <header className="pt-2">
        <h1 className="text-2xl font-bold text-white">{t("profile.title")}</h1>
      </header>

      <ProfileHeader name={userName} level={stats.level} xp={stats.totalXP % 100} xpToNext={100} />

      <div>
        <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">{t("profile.statistics")}</h3>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          <StatCard label={t("profile.dayStreak")} value={stats.streak} icon={<Flame className="h-5 w-5" />} trend="up" index={0} />
          <StatCard label={t("profile.lessonsDone")} value={lessonsCompleted} icon={<BookOpen className="h-5 w-5" />} trend="neutral" index={1} />
          <StatCard label={t("profile.moneySaved")} value={formatAmount(totalSaved)} icon={<PiggyBank className="h-5 w-5" />} trend="up" index={2} />
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">{t("profile.language")}</h3>
        <div className="glass rounded-2xl overflow-hidden">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={cn(
                "w-full flex items-center justify-between p-4 border-b border-white/10 last:border-b-0 transition-colors",
                language === lang.code && "bg-white/5"
              )}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{lang.flag}</span>
                <span className="font-medium text-white">{lang.label}</span>
              </div>
              {language === lang.code && <div className="w-2 h-2 rounded-full bg-amber-400" />}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">{t("profile.settings")}</h3>
        <div className="glass rounded-2xl overflow-hidden">
          <SettingsButton icon={Bell} label={t("profile.notifications")} onClick={() => setCurrentView("notifications")} />
          <SettingsButton icon={Palette} label={t("profile.appearance")} onClick={() => setCurrentView("appearance")} />
          <SettingsButton icon={Coins} label={t("profile.currency")} onClick={() => setCurrentView("currency")} />
          <SettingsButton icon={Download} label={t("profile.data")} onClick={() => setCurrentView("data")} />
          <SettingsButton icon={Shield} label={t("profile.privacy")} onClick={() => {}} />
          <SettingsButton icon={HelpCircle} label={t("profile.help")} onClick={() => {}} isLast />
        </div>
      </div>

      <button className="w-full glass rounded-2xl p-4 flex items-center justify-center gap-2 text-red-400 active:bg-red-400/10 transition-colors">
        <LogOut className="h-5 w-5" />
        <span className="font-medium">{t("profile.signOut")}</span>
      </button>
    </motion.div>
  );
}

interface SettingsButtonProps {
  icon: typeof Bell;
  label: string;
  onClick: () => void;
  isLast?: boolean;
}

function SettingsButton({ icon: Icon, label, onClick, isLast }: SettingsButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center justify-between p-4 active:bg-white/10 transition-colors",
        !isLast && "border-b border-white/10"
      )}
    >
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 text-white/60" />
        <span className="font-medium text-white">{label}</span>
      </div>
      <ChevronRight className="h-5 w-5 text-white/40" />
    </button>
  );
}
