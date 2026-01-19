import { useState } from "react";
import { Download, FileText, Table, Check } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { getTransactions, getSavingsGoals, getUserStats, getLessonProgress } from "@/lib/storage";
import { getBudgetLimits } from "@/lib/budgetLimits";
import { cn } from "@/lib/utils";

type ExportFormat = "json" | "csv";

export function DataExport() {
  const { t, language } = useLanguage();
  const [exporting, setExporting] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString(
      language === "uz" ? "uz-UZ" : language === "ru" ? "ru-RU" : "en-US"
    );
  };

  const showSuccess = (type: string) => {
    setSuccess(type);
    setTimeout(() => setSuccess(null), 2000);
  };

  const exportTransactions = (format: ExportFormat) => {
    setExporting("transactions");
    const transactions = getTransactions();
    
    setTimeout(() => {
      if (format === "json") {
        downloadFile(
          JSON.stringify(transactions, null, 2),
          "hamyon-transactions.json",
          "application/json"
        );
      } else {
        const headers = ["ID", "Title", "Category", "Amount", "Type", "Date"];
        const rows = transactions.map(t => [
          t.id,
          t.title,
          t.category,
          t.amount.toString(),
          t.type,
          formatDate(t.createdAt)
        ]);
        downloadCSV(headers, rows, "hamyon-transactions.csv");
      }
      setExporting(null);
      showSuccess("transactions");
    }, 500);
  };

  const exportSavingsGoals = (format: ExportFormat) => {
    setExporting("goals");
    const goals = getSavingsGoals();
    
    setTimeout(() => {
      if (format === "json") {
        downloadFile(
          JSON.stringify(goals, null, 2),
          "hamyon-savings-goals.json",
          "application/json"
        );
      } else {
        const headers = ["ID", "Title", "Current", "Target", "Emoji", "Created"];
        const rows = goals.map(g => [
          g.id,
          g.title,
          g.current.toString(),
          g.target.toString(),
          g.emoji,
          formatDate(g.createdAt)
        ]);
        downloadCSV(headers, rows, "hamyon-savings-goals.csv");
      }
      setExporting(null);
      showSuccess("goals");
    }, 500);
  };

  const exportAllData = () => {
    setExporting("all");
    
    setTimeout(() => {
      const allData = {
        exportDate: new Date().toISOString(),
        transactions: getTransactions(),
        savingsGoals: getSavingsGoals(),
        budgetLimits: getBudgetLimits(),
        userStats: getUserStats(),
        lessonProgress: getLessonProgress(),
      };
      
      downloadFile(
        JSON.stringify(allData, null, 2),
        "hamyon-full-backup.json",
        "application/json"
      );
      setExporting(null);
      showSuccess("all");
    }, 500);
  };

  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadCSV = (headers: string[], rows: string[][], filename: string) => {
    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n");
    downloadFile(csvContent, filename, "text/csv");
  };

  return (
    <div className="space-y-4">
      <div className="glass rounded-2xl p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-400/20 flex items-center justify-center">
            <Download className="h-5 w-5 text-amber-400" />
          </div>
          <div>
            <p className="font-medium text-white">{t("settings.exportData")}</p>
            <p className="text-sm text-white/60">{t("settings.exportDescription")}</p>
          </div>
        </div>

        {/* Export Options */}
        <div className="space-y-2">
          <ExportButton
            label={t("settings.exportTransactions")}
            icon={Table}
            isExporting={exporting === "transactions"}
            isSuccess={success === "transactions"}
            onExportJSON={() => exportTransactions("json")}
            onExportCSV={() => exportTransactions("csv")}
          />
          
          <ExportButton
            label={t("settings.exportGoals")}
            icon={FileText}
            isExporting={exporting === "goals"}
            isSuccess={success === "goals"}
            onExportJSON={() => exportSavingsGoals("json")}
            onExportCSV={() => exportSavingsGoals("csv")}
          />
        </div>
      </div>

      {/* Full Backup */}
      <button
        onClick={exportAllData}
        disabled={exporting !== null}
        className={cn(
          "w-full glass rounded-2xl p-4 flex items-center justify-center gap-2 transition-all",
          exporting === "all" || success === "all"
            ? "bg-emerald-400/20 text-emerald-400" 
            : "text-amber-400 active:bg-white/10"
        )}
      >
        {exporting === "all" || success === "all" ? (
          <Check className="h-5 w-5 animate-scale-in" />
        ) : (
          <Download className="h-5 w-5" />
        )}
        <span className="font-medium">{t("settings.exportFullBackup")}</span>
      </button>
    </div>
  );
}

interface ExportButtonProps {
  label: string;
  icon: typeof Table;
  isExporting: boolean;
  isSuccess: boolean;
  onExportJSON: () => void;
  onExportCSV: () => void;
}

function ExportButton({ label, icon: Icon, isExporting, isSuccess, onExportJSON, onExportCSV }: ExportButtonProps) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-white/10 last:border-b-0">
      <div className="flex items-center gap-3">
        {isSuccess ? (
          <Check className="h-4 w-4 text-emerald-400" />
        ) : (
          <Icon className="h-4 w-4 text-white/60" />
        )}
        <span className="text-sm font-medium text-white">{label}</span>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onExportJSON}
          disabled={isExporting}
          className="px-3 py-1.5 text-xs font-medium text-amber-400 bg-amber-400/20 rounded-lg hover:bg-amber-400/30 transition-colors"
        >
          JSON
        </button>
        <button
          onClick={onExportCSV}
          disabled={isExporting}
          className="px-3 py-1.5 text-xs font-medium text-amber-400 bg-amber-400/20 rounded-lg hover:bg-amber-400/30 transition-colors"
        >
          CSV
        </button>
      </div>
    </div>
  );
}
