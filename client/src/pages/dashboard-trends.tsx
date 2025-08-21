import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MarketPulseChart } from "@/components/charts/market-pulse-chart";
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Globe,
  Calendar,
  Filter
} from "lucide-react";
import { ZzzAnimation } from "@/components/ui/zzz-animation";

interface TrendData {
  keyword: string;
  volume: number;
  change: number;
  category: string;
  opportunities: number;
}

interface IndustryMover {
  name: string;
  category: string;
  scoreChange: number;
  currentScore: number;
  timeframe: string;
}

export default function DashboardTrends() {
  // Mock trending keywords data
  const trendingKeywords: TrendData[] = [
    { keyword: "emergency plumbing", volume: 12500, change: 23, category: "Plumbing", opportunities: 8 },
    { keyword: "local dentist", volume: 8900, change: -5, category: "Healthcare", opportunities: 12 },
    { keyword: "auto repair near me", volume: 15600, change: 18, category: "Automotive", opportunities: 6 },
    { keyword: "accounting services", volume: 6700, change: 31, category: "Professional", opportunities: 15 },
    { keyword: "lawn care", volume: 9200, change: 12, category: "Landscaping", opportunities: 9 },
    { keyword: "legal consultation", volume: 4300, change: -8, category: "Legal", opportunities: 7 }
  ];

  // Mock industry movers data
  const industryMovers: IndustryMover[] = [
    { name: "Smith & Sons Plumbing", category: "Plumbing", scoreChange: 12, currentScore: 89, timeframe: "7 days" },
    { name: "Premier Law Office", category: "Legal", scoreChange: -3, currentScore: 94, timeframe: "7 days" },
    { name: "Downtown Dental", category: "Healthcare", scoreChange: 8, currentScore: 76, timeframe: "14 days" },
    { name: "Green Thumb Landscaping", category: "Landscaping", scoreChange: 15, currentScore: 67, timeframe: "7 days" }
  ];

  // Market insights data
  const marketInsights = [
    { title: "Peak Boring Season", description: "Q1 shows highest opportunity scores for service businesses", trend: "up" },
    { title: "Local Dominance", description: "Small businesses with local focus score 23% higher", trend: "up" },
    { title: "Mobile Gap", description: "67% of analyzed sites lack mobile optimization", trend: "opportunity" },
    { title: "Content Drought", description: "Average word count decreased 12% this quarter", trend: "opportunity" }
  ];

  const getTrendIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-4 h-4 text-green-600" />;
    return <TrendingDown className="w-4 h-4 text-red-600" />;
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-brand-success";
    if (score >= 75) return "text-brand-primary"; 
    if (score >= 60) return "text-brand-accent";
    return "text-gray-600";
  };

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
                Market Trends
              </h1>
              <p className="brand-body text-brand-secondary">
                Discover trending opportunities and track market movements in boring businesses
              </p>
            </div>

            {/* Market Pulse Chart */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="brand-heading text-xl mb-2 flex items-center">
                    <Activity className="w-5 h-5 mr-2 text-brand-primary" />
                    Market Pulse
                  </h2>
                  <p className="brand-body text-brand-secondary">
                    Real-time opportunity trends across industries
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
              <MarketPulseChart />
            </Card>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Trending Keywords */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="brand-heading text-lg flex items-center">
                    <Zap className="w-5 h-5 mr-2 text-brand-accent" />
                    Trending Keywords
                  </h2>
                  <Badge variant="secondary" className="text-xs">By Volume</Badge>
                </div>
                
                <div className="space-y-4">
                  {trendingKeywords.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="brand-body font-medium">{item.keyword}</span>
                          {item.change > 15 && (
                            <ZzzAnimation count={1} size="small" />
                          )}
                        </div>
                        <div className="flex items-center space-x-4 text-xs text-brand-secondary">
                          <span>{item.volume.toLocaleString()} searches</span>
                          <span>{item.category}</span>
                          <span>{item.opportunities} opportunities</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <div className={`flex items-center space-x-1 ${item.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {getTrendIcon(item.change)}
                          <span className="text-sm font-medium">{Math.abs(item.change)}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
              
              {/* Industry Movers */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="brand-heading text-lg flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-brand-success" />
                    Industry Movers
                  </h2>
                  <Badge variant="secondary" className="text-xs">This Week</Badge>
                </div>
                
                <div className="space-y-4">
                  {industryMovers.map((mover, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="brand-body font-medium">{mover.name}</span>
                          {mover.currentScore >= 85 && (
                            <ZzzAnimation count={1} size="small" />
                          )}
                        </div>
                        <div className="flex items-center space-x-4 text-xs text-brand-secondary">
                          <span>{mover.category}</span>
                          <span className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {mover.timeframe}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <div className={`text-sm font-bold ${getScoreColor(mover.currentScore)}`}>
                            {mover.currentScore}
                          </div>
                          <div className={`flex items-center text-xs ${mover.scoreChange > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {mover.scoreChange > 0 ? (
                              <ArrowUpRight className="w-3 h-3 mr-1" />
                            ) : (
                              <ArrowDownRight className="w-3 h-3 mr-1" />
                            )}
                            {Math.abs(mover.scoreChange)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Market Insights */}
            <Card className="p-6">
              <div className="flex items-center mb-6">
                <Globe className="w-5 h-5 mr-2 text-brand-primary" />
                <h2 className="brand-heading text-lg">Market Insights</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {marketInsights.map((insight, index) => (
                  <div key={index} className="p-4 bg-gradient-to-br from-brand-light/50 to-white rounded-lg border">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="brand-subheading text-sm">{insight.title}</h3>
                      {insight.trend === "up" && <TrendingUp className="w-4 h-4 text-green-600" />}
                      {insight.trend === "opportunity" && <Zap className="w-4 h-4 text-brand-primary" />}
                    </div>
                    <p className="brand-body text-xs text-brand-secondary leading-relaxed">
                      {insight.description}
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-4 justify-center">
              <Button variant="outline">Export Trend Report</Button>
              <Button variant="outline">Set Alerts</Button>
              <Button className="brand-btn-primary">Explore Opportunities</Button>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}