import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  ExternalLink, 
  MoreHorizontal,
  TrendingUp,
  Calendar,
  Globe,
  Star,
  Eye,
  BarChart3
} from "lucide-react";
import { ZzzAnimation } from "@/components/ui/zzz-animation";

interface Competitor {
  id: string;
  name: string;
  url: string;
  reach: string;
  category: string;
  score: number;
  lastAnalyzed: string;
  status: 'active' | 'analyzing' | 'completed';
  isStarred: boolean;
}

export default function DashboardCompetitors() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCompetitor, setSelectedCompetitor] = useState<Competitor | null>(null);

  // Mock competitor data
  const competitors: Competitor[] = [
    {
      id: "1",
      name: "Smith & Sons Plumbing",
      url: "smithplumbing.com",
      reach: "Local - Chicago",
      category: "Plumbing",
      score: 89,
      lastAnalyzed: "2 hours ago",
      status: "completed",
      isStarred: true
    },
    {
      id: "2", 
      name: "Downtown Dental Care",
      url: "downtowndental.net",
      reach: "Regional - Illinois",
      category: "Healthcare",
      score: 76,
      lastAnalyzed: "1 day ago",
      status: "completed",
      isStarred: false
    },
    {
      id: "3",
      name: "City Auto Repair",
      url: "cityautorepair.com", 
      reach: "Local - Chicago",
      category: "Automotive",
      score: 82,
      lastAnalyzed: "3 days ago",
      status: "active",
      isStarred: true
    },
    {
      id: "4",
      name: "Premier Law Office",
      url: "premierlawoffice.com",
      reach: "Regional - Midwest",
      category: "Legal",
      score: 94,
      lastAnalyzed: "5 minutes ago",
      status: "completed",
      isStarred: false
    },
    {
      id: "5",
      name: "Green Thumb Landscaping",
      url: "greenthumblandscaping.net",
      reach: "Local - Suburbs",
      category: "Landscaping",
      score: 67,
      lastAnalyzed: "Analyzing...",
      status: "analyzing",
      isStarred: false
    }
  ];

  const categories = ["all", "Plumbing", "Healthcare", "Automotive", "Legal", "Landscaping"];

  const filteredCompetitors = competitors.filter(competitor => {
    const matchesSearch = competitor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         competitor.url.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || competitor.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getScoreColor = (score: number) => {
    if (score >= 85) return "bg-brand-success";
    if (score >= 75) return "bg-brand-primary"; 
    if (score >= 60) return "bg-brand-accent";
    return "bg-gray-400";
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="default" className="bg-green-100 text-green-800">Completed</Badge>;
      case "analyzing": 
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">Analyzing</Badge>;
      case "active":
        return <Badge variant="outline">Active</Badge>;
      default:
        return null;
    }
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
                Competitors
              </h1>
              <p className="brand-body text-brand-secondary">
                Track and analyze boring businesses in your target markets
              </p>
            </div>

            {/* Filters and Search */}
            <Card className="p-4">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search competitors..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category === "all" ? "All Categories" : category}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    More Filters
                  </Button>
                  <Button className="brand-btn-primary" size="sm">
                    Add Competitor
                  </Button>
                </div>
              </div>
            </Card>

            {/* Competitors Table */}
            <div className="grid grid-cols-1 gap-4">
              {filteredCompetitors.map((competitor) => (
                <Card key={competitor.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 flex-1">
                      {/* Star */}
                      <button className={`${competitor.isStarred ? 'text-yellow-400' : 'text-gray-300'} hover:text-yellow-400`}>
                        <Star className="w-4 h-4" fill={competitor.isStarred ? "currentColor" : "none"} />
                      </button>
                      
                      {/* Company Info */}
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="brand-subheading text-base">{competitor.name}</h3>
                          <a 
                            href={`https://${competitor.url}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-brand-accent hover:text-brand-primary"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-brand-secondary">
                          <span className="flex items-center">
                            <Globe className="w-3 h-3 mr-1" />
                            {competitor.url}
                          </span>
                          <span>{competitor.reach}</span>
                          <span>{competitor.category}</span>
                        </div>
                      </div>
                      
                      {/* Score */}
                      <div className="flex items-center space-x-2">
                        <Badge className={`${getScoreColor(competitor.score)} text-white`}>
                          {competitor.score}
                        </Badge>
                        {competitor.score >= 85 && (
                          <ZzzAnimation count={1} size="small" />
                        )}
                      </div>
                      
                      {/* Status */}
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(competitor.status)}
                        <span className="text-xs text-brand-secondary flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {competitor.lastAnalyzed}
                        </span>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex items-center space-x-2 ml-4">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCompetitor(competitor);
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <BarChart3 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Side Panel for Detail View */}
            {selectedCompetitor && (
              <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-xl border-l z-50 overflow-y-auto">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="brand-heading text-lg">Competitor Details</h2>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setSelectedCompetitor(null)}
                    >
                      ✕
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="brand-subheading text-base mb-2">{selectedCompetitor.name}</h3>
                      <div className="flex items-center space-x-2 text-sm text-brand-secondary">
                        <Globe className="w-4 h-4" />
                        <span>{selectedCompetitor.url}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="brand-body text-xs text-brand-secondary">Opportunity Score</span>
                        <div className="flex items-center space-x-2">
                          <span className="brand-heading text-2xl">{selectedCompetitor.score}</span>
                          {selectedCompetitor.score >= 85 && (
                            <ZzzAnimation count={2} size="small" />
                          )}
                        </div>
                      </div>
                      <div>
                        <span className="brand-body text-xs text-brand-secondary">Category</span>
                        <p className="brand-body font-medium">{selectedCompetitor.category}</p>
                      </div>
                    </div>
                    
                    <div>
                      <span className="brand-body text-xs text-brand-secondary">Market Reach</span>
                      <p className="brand-body font-medium">{selectedCompetitor.reach}</p>
                    </div>
                    
                    <div className="pt-4 space-y-2">
                      <Button className="brand-btn-primary w-full">View Full Report</Button>
                      <Button variant="outline" className="w-full">Re-analyze</Button>
                      <Button variant="ghost" className="w-full text-brand-accent">Export Data</Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
}