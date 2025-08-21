import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { StatsCard } from "@/components/dashboard/stats-card";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { LeadFlowChart } from "@/components/charts/lead-flow-chart";
import { MarketPulseChart } from "@/components/charts/market-pulse-chart";
import { 
  ChartLine, 
  DollarSign, 
  Percent, 
  Users,
  TrendingUp,
  Target,
  Zap
} from "lucide-react";

export default function DashboardOverview() {
  return (
    <div className="flex h-screen bg-paper">
      <Sidebar />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto bg-paper">
          <div className="p-6 space-y-6 max-w-7xl mx-auto">
            
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="brand-heading text-2xl md:text-3xl mb-2">
                Dashboard Overview
              </h1>
              <p className="brand-body text-brand-secondary">
                Track your boring business opportunities and lead generation performance
              </p>
            </div>

            {/* KPI Stats Cards */}
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
                title="Boring Opportunities"
                value="89"
                icon={Target}
                trend="+15.3%"
                trendLabel="this week"
                color="blue"
              />
            </div>

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Lead Flow Chart */}
              <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-brand-primary" />
                    <h3 className="text-lg font-bold text-ink">Lead Flow Trend</h3>
                  </div>
                  <p className="text-gray-600">Monthly boring business discovery performance</p>
                </div>
                <div className="p-6">
                  <LeadFlowChart />
                </div>
              </div>

              {/* Quick Stats Panel */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-center space-x-2 mb-2">
                    <Zap className="h-5 w-5 text-brand-accent" />
                    <h3 className="text-lg font-bold text-ink">Quick Insights</h3>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between p-3 bg-brand-success/10 rounded-lg">
                    <span className="font-body text-brand-dark text-sm">High Opportunity</span>
                    <span className="font-heading font-bold text-brand-success">23</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-brand-primary/10 rounded-lg">
                    <span className="font-body text-brand-dark text-sm">In Analysis</span>
                    <span className="font-heading font-bold text-brand-primary">12</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-brand-accent/10 rounded-lg">
                    <span className="font-body text-brand-dark text-sm">Completed</span>
                    <span className="font-heading font-bold text-brand-accent">156</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-brand-secondary/10 rounded-lg">
                    <span className="font-body text-brand-dark text-sm">Saved Markets</span>
                    <span className="font-heading font-bold text-brand-secondary">8</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Market Pulse Chart */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="text-lg font-bold text-ink mb-1">Market Pulse</h3>
                  <p className="text-gray-600">Boring opportunity trends by category</p>
                </div>
                <div className="p-6">
                  <MarketPulseChart />
                </div>
              </div>
              
              {/* Recent Activity */}
              <RecentActivity />
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}