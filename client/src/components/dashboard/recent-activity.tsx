import { useRecentAudits } from "@/hooks/use-audit";
import { Search, Bot, Database } from "lucide-react";

const mockActivities = [
  {
    icon: Search,
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    title: "URL Audit Completed",
    description: "charlotte-diesel-repair.com",
    details: "Found 3 emergency keywords, 8 service terms",
    time: "2 minutes ago",
    status: "Success",
    statusColor: "bg-green-100 text-green-800",
  },
  {
    icon: Bot,
    iconBg: "bg-accent/10",
    iconColor: "text-accent",
    title: "Deliverables Generated",
    description: "15 page briefs created",
    details: "Emergency page templates ready for deployment",
    time: "5 minutes ago",
    status: "Generated",
    statusColor: "bg-blue-100 text-blue-800",
  },
  {
    icon: Database,
    iconBg: "bg-highlight/10",
    iconColor: "text-highlight",
    title: "Notion Integration",
    description: "Data synced successfully",
    details: "47 new records added to competitor database",
    time: "12 minutes ago",
    status: "Synced",
    statusColor: "bg-purple-100 text-purple-800",
  },
];

export function RecentActivity() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-bold text-ink">Recent Activity</h3>
        <p className="text-gray-600 mt-1">Latest audits and system updates</p>
      </div>
      <div className="divide-y divide-gray-100">
        {mockActivities.map((activity, index) => (
          <div key={index} className="p-4 hover:bg-gray-50 transition-colors duration-200">
            <div className="flex items-start">
              <div className={`w-8 h-8 ${activity.iconBg} rounded-full flex items-center justify-center mr-3 mt-1`}>
                <activity.icon className={`w-4 h-4 ${activity.iconColor}`} />
              </div>
              <div className="flex-1">
                <p className="text-ink">
                  <span className="font-medium">{activity.title}</span> - {activity.description}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {activity.details} • {activity.time}
                </p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${activity.statusColor}`}>
                {activity.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
