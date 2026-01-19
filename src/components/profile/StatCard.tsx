import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  index: number;
}

export function StatCard({ label, value, icon, trend = "neutral", index }: StatCardProps) {
  return (
    <div 
      className="glass rounded-2xl p-4 flex-1 min-w-[140px] animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className={cn(
        "w-10 h-10 rounded-xl flex items-center justify-center mb-3",
        trend === "up" && "bg-emerald-400/20 text-emerald-400",
        trend === "down" && "bg-red-400/20 text-red-400",
        trend === "neutral" && "bg-amber-400/20 text-amber-400"
      )}>
        {icon}
      </div>
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-sm text-white/60">{label}</p>
    </div>
  );
}
