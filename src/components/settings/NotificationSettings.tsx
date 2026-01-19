import { useState, useEffect } from "react";
import { Bell, Clock, Shield, Flame } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { 
  getNotificationSettings, 
  saveNotificationSettings,
  type NotificationSettings 
} from "@/lib/storage";
import { cn } from "@/lib/utils";

export function NotificationSettingsView() {
  const { t } = useLanguage();
  const [settings, setSettings] = useState<NotificationSettings>(getNotificationSettings());
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    setIsSupported("Notification" in window);
  }, []);

  const requestPermission = async () => {
    if (!isSupported) return;

    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const newSettings = { ...settings, enabled: true };
        setSettings(newSettings);
        saveNotificationSettings(newSettings);
        
        // Show test notification
        if (Notification.permission === "granted") {
          new Notification("Hamyon", {
            body: t("notifications.enabled"),
            icon: "/icons/icon-192.png",
          });
        }
      }
    } catch (error) {
      console.error("Notification permission error:", error);
    }
  };

  const toggleSetting = (key: keyof NotificationSettings) => {
    if (key === "enabled" && !settings.enabled) {
      requestPermission();
      return;
    }

    const newSettings = { ...settings, [key]: !settings[key as keyof typeof settings] };
    setSettings(newSettings);
    saveNotificationSettings(newSettings);
  };

  const updateReminderTime = (time: string) => {
    const newSettings = { ...settings, reminderTime: time };
    setSettings(newSettings);
    saveNotificationSettings(newSettings);
  };

  return (
    <div className="space-y-4">
      {/* Enable Notifications */}
      <div className="glass rounded-2xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-400/20 flex items-center justify-center">
              <Bell className="h-5 w-5 text-amber-400" />
            </div>
            <div>
              <p className="font-medium text-white">{t("notifications.enableNotifications")}</p>
              <p className="text-sm text-white/60">
                {isSupported ? "" : "Not supported in this browser"}
              </p>
            </div>
          </div>
          <button
            onClick={() => toggleSetting("enabled")}
            disabled={!isSupported}
            className={cn(
              "w-12 h-7 rounded-full transition-colors relative",
              settings.enabled ? "bg-amber-400" : "bg-white/20"
            )}
          >
            <div
              className={cn(
                "absolute top-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform",
                settings.enabled ? "translate-x-5" : "translate-x-0.5"
              )}
            />
          </button>
        </div>
      </div>

      {settings.enabled && (
        <>
          {/* Daily Reminder */}
          <div className="glass rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-400/20 flex items-center justify-center">
                  <Flame className="h-5 w-5 text-orange-400" />
                </div>
                <div>
                  <p className="font-medium text-white">{t("notifications.dailyReminder")}</p>
                  <p className="text-sm text-white/60">{t("notifications.dailyReminderDesc")}</p>
                </div>
              </div>
              <button
                onClick={() => toggleSetting("dailyReminder")}
                className={cn(
                  "w-12 h-7 rounded-full transition-colors relative",
                  settings.dailyReminder ? "bg-amber-400" : "bg-white/20"
                )}
              >
                <div
                  className={cn(
                    "absolute top-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform",
                    settings.dailyReminder ? "translate-x-5" : "translate-x-0.5"
                  )}
                />
              </button>
            </div>
          </div>

          {/* Budget Alerts */}
          <div className="glass rounded-2xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-400/20 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-red-400" />
                </div>
                <div>
                  <p className="font-medium text-white">{t("notifications.budgetAlerts")}</p>
                  <p className="text-sm text-white/60">{t("notifications.budgetAlertsDesc")}</p>
                </div>
              </div>
              <button
                onClick={() => toggleSetting("budgetAlerts")}
                className={cn(
                  "w-12 h-7 rounded-full transition-colors relative",
                  settings.budgetAlerts ? "bg-amber-400" : "bg-white/20"
                )}
              >
                <div
                  className={cn(
                    "absolute top-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform",
                    settings.budgetAlerts ? "translate-x-5" : "translate-x-0.5"
                  )}
                />
              </button>
            </div>
          </div>

          {/* Reminder Time */}
          {settings.dailyReminder && (
            <div className="glass rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-400/20 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-blue-400" />
                  </div>
                  <p className="font-medium text-white">{t("notifications.reminderTime")}</p>
                </div>
                <input
                  type="time"
                  value={settings.reminderTime}
                  onChange={(e) => updateReminderTime(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-white/20 bg-white/10 text-white text-sm"
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
