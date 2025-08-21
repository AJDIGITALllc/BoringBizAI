import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Upload, 
  MapPin, 
  Building2, 
  Star,
  TrendingUp,
  Users,
  Globe
} from "lucide-react";
import { ZzzAnimation } from "@/components/ui/zzz-animation";

export default function DashboardLeadFinder() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");

  // Mock data for suggestions and results
  const keywordSuggestions = [
    "plumbing services", "accounting firms", "law offices", 
    "dental practices", "auto repair", "landscaping"
  ];

  const savedMarkets = [
    { name: "Local Plumbers - Chicago", leads: 47, score: 85 },
    { name: "Accounting Services - Dallas", leads: 32, score: 78 },
    { name: "Law Offices - Miami", leads: 28, score: 92 }
  ];

  const competitorResults = [
    { name: "Smith & Sons Plumbing", url: "smithplumbing.com", score: 89, category: "Plumbing" },
    { name: "Downtown Dental", url: "downtowndental.net", score: 76, category: "Healthcare" },
    { name: "City Auto Repair", url: "cityautorepair.com", score: 82, category: "Automotive" }
  ];

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
                Lead Finder
              </h1>
              <p className="brand-body text-brand-secondary">
                Discover boring businesses with hidden opportunities in your target markets
              </p>
            </div>

            {/* Search Tabs */}
            <Tabs defaultValue="search" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="search">Search by Location / Industry</TabsTrigger>
                <TabsTrigger value="import">Import CSV</TabsTrigger>
                <TabsTrigger value="saved">Saved Markets</TabsTrigger>
              </TabsList>
              
              {/* Search Tab */}
              <TabsContent value="search" className="space-y-6">
                <Card className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div>
                      <label className="brand-body text-sm font-medium mb-2 block">Location</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="Enter city, state, or ZIP"
                          value={selectedLocation}
                          onChange={(e) => setSelectedLocation(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="brand-body text-sm font-medium mb-2 block">Industry</label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          placeholder="e.g., plumbing, accounting"
                          value={selectedIndustry}
                          onChange={(e) => setSelectedIndustry(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div className="flex items-end">
                      <Button className="brand-btn-primary w-full">
                        <Search className="w-4 h-4 mr-2" />
                        Find Opportunities
                      </Button>
                    </div>
                  </div>

                  {/* Keyword Suggestions */}
                  <div>
                    <h3 className="brand-subheading text-sm mb-3">Suggested Keywords</h3>
                    <div className="flex flex-wrap gap-2">
                      {keywordSuggestions.map((keyword, index) => (
                        <Badge 
                          key={index}
                          variant="secondary"
                          className="cursor-pointer hover:bg-brand-primary hover:text-white"
                          onClick={() => setSelectedIndustry(keyword)}
                        >
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>

                {/* Competitor Results Carousel */}
                <div>
                  <h3 className="brand-heading text-lg mb-4 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-brand-primary" />
                    Boring Opportunities Found
                    <ZzzAnimation count={2} size="small" className="ml-2" />
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {competitorResults.map((competitor, index) => (
                      <Card key={index} className="p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="brand-subheading text-sm">{competitor.name}</h4>
                            <p className="brand-body text-xs text-brand-secondary">{competitor.url}</p>
                          </div>
                          <Badge 
                            variant={competitor.score >= 85 ? "default" : "secondary"}
                            className={competitor.score >= 85 ? "bg-brand-success" : ""}
                          >
                            {competitor.score}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="brand-body text-xs text-brand-secondary">{competitor.category}</span>
                          <Button size="sm" variant="outline">Analyze</Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              {/* Import CSV Tab */}
              <TabsContent value="import" className="space-y-6">
                <Card className="p-8 text-center">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-brand-secondary" />
                  <h3 className="brand-heading text-lg mb-2">Import Competitor List</h3>
                  <p className="brand-body text-brand-secondary mb-6">
                    Upload a CSV file with competitor URLs to batch analyze boring opportunities
                  </p>
                  <div className="max-w-md mx-auto space-y-4">
                    <Input type="file" accept=".csv" />
                    <Button className="brand-btn-primary w-full">
                      Upload & Analyze
                    </Button>
                  </div>
                  <div className="mt-6 text-left max-w-md mx-auto">
                    <p className="brand-body text-xs text-brand-secondary mb-2">Expected CSV format:</p>
                    <pre className="bg-gray-50 p-2 rounded text-xs">
name,url,category{'\n'}Smith Plumbing,smithplumbing.com,Plumbing{'\n'}City Dental,citydental.net,Healthcare
                    </pre>
                  </div>
                </Card>
              </TabsContent>
              
              {/* Saved Markets Tab */}
              <TabsContent value="saved" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="brand-heading text-lg">Your Saved Markets</h3>
                  <Button variant="outline" size="sm">
                    <Star className="w-4 h-4 mr-2" />
                    Create New Market
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {savedMarkets.map((market, index) => (
                    <Card key={index} className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="brand-subheading text-sm">{market.name}</h4>
                        <Badge className="bg-brand-success">{market.score}</Badge>
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-1">
                          <Users className="w-4 h-4 text-brand-secondary" />
                          <span className="brand-body text-sm text-brand-secondary">{market.leads} leads</span>
                        </div>
                        {market.score >= 85 && (
                          <ZzzAnimation count={1} size="small" />
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="flex-1">View</Button>
                        <Button size="sm" className="brand-btn-primary flex-1">Analyze</Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

          </div>
        </main>
      </div>
    </div>
  );
}