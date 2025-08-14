import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { StatsCard } from "@/components/dashboard/stats-card";
import { AuditSection } from "@/components/dashboard/audit-section";
import { QuickActions } from "@/components/dashboard/quick-actions";
import { CompetitorHotlist } from "@/components/dashboard/competitor-hotlist";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { LeadFlowChart } from "@/components/charts/lead-flow-chart";
import { MarketPulseChart } from "@/components/charts/market-pulse-chart";
import { 
  ChartLine, 
  DollarSign, 
  Percent, 
  Users 
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-paper">
      <Sidebar />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto bg-paper">
          <div className="p-6 space-y-6 max-w-7xl mx-auto">
            
            {/* Stats Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Total Leads"
                value="1,247"
                icon={ChartLine}
                trend="+12.5%"
                trendLabel="from last month"
                color="primary"
              />
              <StatsCard
                title="Revenue Potential"
                value="$48,200"
                icon={DollarSign}
                trend="+8.2%"
                trendLabel="this quarter"
                color="accent"
              />
              <StatsCard
                title="Conversion Rate"
                value="24.8%"
                icon={Percent}
                trend="+3.1%"
                trendLabel="vs. industry avg"
                color="highlight"
              />
              <StatsCard
                title="Competitors Added"
                value="89"
                icon={Users}
                trend="+15.3%"
                trendLabel="this week"
                color="blue"
              />
            </div>

            {/* URL Audit Section */}
            <AuditSection />

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Lead Flow Chart */}
              <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-lg font-bold text-ink">Lead Flow Trend</h3>
                  <p className="text-gray-600 mt-1">Monthly lead generation performance</p>
                </div>
                <div className="p-6">
                  <LeadFlowChart />
                </div>
              </div>

              {/* Quick Actions */}
              <QuickActions />
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CompetitorHotlist />
              
              {/* Market Pulse */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-lg font-bold text-ink">Market Pulse</h3>
                  <p className="text-gray-600 mt-1">Opportunity trends by category</p>
                </div>
                <div className="p-6">
                  <MarketPulseChart />
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <RecentActivity />

          </div>
        </main>
      </div>
    </div>
  );
}
