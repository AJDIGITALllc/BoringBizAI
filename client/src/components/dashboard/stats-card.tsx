import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend: string;
  trendLabel: string;
  color: "primary" | "accent" | "highlight" | "blue";
}

export function StatsCard({ title, value, icon: Icon, trend, trendLabel, color }: StatsCardProps) {
  const colorClasses = {
    primary: "bg-primary/10 text-primary",
    accent: "bg-accent/10 text-accent",
    highlight: "bg-highlight/10 text-highlight",
    blue: "bg-blue-100 text-blue-600",
  };

  const trendColorClasses = {
    primary: "text-primary",
    accent: "text-accent",
    highlight: "text-primary",
    blue: "text-blue-600",
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center">
        <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center", colorClasses[color])}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-ink">{value}</p>
        </div>
      </div>
      <div className="mt-4">
        <span className={cn("text-sm font-medium", trendColorClasses[color])}>↗ {trend}</span>
        <span className="text-sm text-gray-500 ml-1">{trendLabel}</span>
      </div>
    </div>
  );
}
