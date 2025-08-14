import { Link, useLocation } from "wouter";
import { 
  BarChart3,
  Search,
  Users,
  TrendingUp,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: BarChart3, current: true },
  { name: "Lead Finder", href: "/leads", icon: Search, current: false },
  { name: "Competitors", href: "/competitors", icon: Users, current: false },
  { name: "Trends & Insights", href: "/trends", icon: TrendingUp, current: false },
  { name: "Settings", href: "/settings", icon: Settings, current: false },
];

export function Sidebar() {
  const [location] = useLocation();

  return (
    <div className="hidden lg:flex lg:w-64 lg:flex-col">
      <div className="flex flex-col flex-grow bg-white shadow-sm border-r border-gray-200">
        {/* Logo */}
        <div className="flex items-center h-16 px-6 bg-gradient-to-r from-primary to-emerald-600">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mr-3">
              <BarChart3 className="text-primary w-5 h-5" />
            </div>
            <span className="text-white font-bold text-lg">BoringBiz.ai</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => {
            const isActive = location === item.href || (item.href === "/" && location === "/dashboard");
            return (
              <Link key={item.name} href={item.href}>
                <a className={cn(
                  "group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-gray-700 hover:bg-gray-50"
                )}>
                  <item.icon className={cn(
                    "mr-3 w-5 h-5",
                    isActive ? "text-primary" : "text-gray-400"
                  )} />
                  {item.name}
                </a>
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="px-4 py-4 border-t border-gray-200">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-emerald-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">JD</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-ink">John Doe</p>
              <p className="text-xs text-gray-500">Pro Plan</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
