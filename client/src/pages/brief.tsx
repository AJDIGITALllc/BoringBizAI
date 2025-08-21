import { useEffect, useState } from "react";
import { useRoute, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Download, 
  Share2, 
  FileText,
  Code2,
  Clipboard,
  ExternalLink,
  Calendar,
  Globe,
  Target,
  TrendingUp,
  Lightbulb
} from "lucide-react";
import { ZzzAnimation } from "@/components/ui/zzz-animation";

interface BriefData {
  id: string;
  competitorName: string;
  competitorUrl: string;
  opportunityScore: number;
  createdAt: string;
  landingPageCopy: string;
  jsonDeliverable: object;
  schemaMarkup: string;
  recommendations: string[];
  keyMetrics: {
    wordCount: number;
    imagesCount: number;
    linksCount: number;
    hasWebp: boolean;
  };
  stepLockKeywords: {
    emergency: string[];
    service: string[];
    problem: string[];
    local: string[];
  };
}

export default function Brief() {
  const [match, params] = useRoute("/brief/:id");
  const [briefData, setBriefData] = useState<BriefData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    // Mock data - replace with actual API call
    const mockBriefData: BriefData = {
      id: params?.id || "1",
      competitorName: "Smith & Sons Plumbing",
      competitorUrl: "smithplumbing.com",
      opportunityScore: 89,
      createdAt: new Date().toISOString(),
      landingPageCopy: `# Transform Your Local Plumbing Service Into a Modern Business

## Why This Opportunity Exists
Smith & Sons Plumbing represents a classic "boring business" goldmine - established local presence but outdated digital approach.

## Recommended Landing Page Strategy

### Hero Section
**"Emergency Plumbing Services - Available 24/7"**
- Immediate trust building with emergency availability
- Local phone number prominently displayed
- Service area map integration

### Service Highlights
- Drain cleaning and repair
- Water heater installation
- Leak detection and repair
- Emergency plumbing services

### Trust Signals
- 35+ years in business
- Licensed and insured
- Local family-owned business
- Customer testimonials

### Call-to-Action
"Call Now: (555) 123-PIPE"
- Online appointment booking
- Free estimates
- Same-day service guarantee`,
      
      jsonDeliverable: {
        competitor: "Smith & Sons Plumbing",
        url: "smithplumbing.com",
        opportunityScore: 89,
        keyFindings: [
          "Minimal web presence with outdated design",
          "No online booking system",
          "Missing local SEO optimization",
          "Limited social media engagement"
        ],
        recommendations: [
          "Implement online booking system",
          "Modernize website design",
          "Optimize for local search",
          "Create content marketing strategy"
        ],
        marketOpportunity: "High - established business with low digital competition",
        estimatedImplementationTime: "2-3 months",
        potentialROI: "150-300%"
      },
      
      schemaMarkup: `{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Smith & Sons Plumbing",
  "image": "https://smithplumbing.com/logo.jpg",
  "telephone": "+1-555-123-7473",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main Street",
    "addressLocality": "Chicago",
    "addressRegion": "IL",
    "postalCode": "60601"
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "08:00",
    "closes": "18:00"
  },
  "serviceType": "Plumbing Services",
  "areaServed": "Chicago, IL"
}`,
      
      recommendations: [
        "Add online booking system to capture 24/7 leads",
        "Implement local SEO strategy for 'emergency plumber' keywords",
        "Create mobile-first responsive design",
        "Add customer review integration",
        "Establish Google My Business optimization",
        "Create content around common plumbing issues"
      ],
      
      keyMetrics: {
        wordCount: 247,
        imagesCount: 3,
        linksCount: 8,
        hasWebp: false
      },
      
      stepLockKeywords: {
        emergency: ["24/7", "emergency", "urgent"],
        service: ["repair", "fix", "plumbing", "installation"],
        local: ["local", "chicago", "area", "nearby"],
        problem: ["broken", "leaking", "clogged", "backed up"]
      }
    };
    
    setTimeout(() => {
      setBriefData(mockBriefData);
      setLoading(false);
    }, 1000);
  }, [params?.id]);

  const exportToJSON = () => {
    if (!briefData) return;
    
    const dataStr = JSON.stringify(briefData.jsonDeliverable, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `boring-biz-brief-${briefData.id}.json`;
    link.click();
  };

  const exportToPDF = () => {
    // Mock PDF export - would integrate with PDF generation library
    alert('PDF export functionality would be implemented here');
  };

  const shareLink = () => {
    if (briefData) {
      navigator.clipboard.writeText(window.location.href);
      alert('Brief link copied to clipboard!');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-light via-white to-brand-primary/5 flex items-center justify-center">
        <div className="text-center">
          <ZzzAnimation count={3} size="large" className="justify-center mb-4" />
          <p className="font-body text-brand-secondary">Loading brief details...</p>
        </div>
      </div>
    );
  }

  if (!briefData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-light via-white to-brand-primary/5 flex items-center justify-center">
        <div className="text-center">
          <h1 className="brand-heading text-2xl mb-4">Brief Not Found</h1>
          <Link href="/dashboard">
            <Button className="brand-btn-primary">Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-light via-white to-brand-primary/5">
      {/* Header */}
      <header className="px-6 py-4 border-b bg-white/80 backdrop-blur sticky top-0 z-40">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/dashboard/competitors">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="brand-heading text-xl">{briefData.competitorName}</h1>
              <p className="brand-body text-sm text-brand-secondary">
                Brief #{briefData.id} • Generated {new Date(briefData.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={shareLink}>
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm" onClick={exportToPDF}>
              <FileText className="h-4 w-4 mr-2" />
              PDF
            </Button>
            <Button variant="outline" size="sm" onClick={exportToJSON}>
              <Download className="h-4 w-4 mr-2" />
              JSON
            </Button>
          </div>
        </div>
      </header>

      <main className="px-6 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Brief Overview */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div>
                  <h2 className="brand-heading text-2xl">{briefData.competitorName}</h2>
                  <div className="flex items-center space-x-4 mt-2">
                    <a 
                      href={`https://${briefData.competitorUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-brand-accent hover:text-brand-primary"
                    >
                      <Globe className="w-4 h-4 mr-1" />
                      {briefData.competitorUrl}
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                    <span className="flex items-center text-brand-secondary">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(briefData.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Badge className={`${briefData.opportunityScore >= 85 ? 'bg-brand-success' : 'bg-brand-primary'} text-white text-lg px-4 py-2`}>
                  {briefData.opportunityScore}
                </Badge>
                {briefData.opportunityScore >= 85 && (
                  <ZzzAnimation count={3} size="medium" />
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-3 bg-brand-light rounded-lg">
                <div className="brand-heading text-lg text-brand-primary">{briefData.keyMetrics.wordCount}</div>
                <div className="brand-body text-xs text-brand-secondary">Words</div>
              </div>
              <div className="text-center p-3 bg-brand-light rounded-lg">
                <div className="brand-heading text-lg text-brand-primary">{briefData.keyMetrics.imagesCount}</div>
                <div className="brand-body text-xs text-brand-secondary">Images</div>
              </div>
              <div className="text-center p-3 bg-brand-light rounded-lg">
                <div className="brand-heading text-lg text-brand-primary">{briefData.keyMetrics.linksCount}</div>
                <div className="brand-body text-xs text-brand-secondary">Links</div>
              </div>
              <div className="text-center p-3 bg-brand-light rounded-lg">
                <div className={`brand-heading text-lg ${briefData.keyMetrics.hasWebp ? 'text-brand-success' : 'text-red-600'}`}>
                  {briefData.keyMetrics.hasWebp ? 'Yes' : 'No'}
                </div>
                <div className="brand-body text-xs text-brand-secondary">Modern Tech</div>
              </div>
            </div>
          </Card>

          {/* Content Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="copy">Landing Copy</TabsTrigger>
              <TabsTrigger value="json">JSON Export</TabsTrigger>
              <TabsTrigger value="schema">Schema Markup</TabsTrigger>
            </TabsList>
            
            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Lightbulb className="h-5 w-5 text-brand-primary" />
                    <h3 className="brand-heading text-lg">Key Recommendations</h3>
                  </div>
                  <div className="space-y-3">
                    {briefData.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-brand-success/10 rounded-lg">
                        <div className="w-6 h-6 bg-brand-success rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-white text-xs font-bold">{index + 1}</span>
                        </div>
                        <p className="brand-body text-sm">{rec}</p>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-center space-x-2 mb-4">
                    <Target className="h-5 w-5 text-brand-accent" />
                    <h3 className="brand-heading text-lg">StepLock Keywords</h3>
                  </div>
                  <div className="space-y-3">
                    {Object.entries(briefData.stepLockKeywords).map(([category, keywords]) => (
                      <div key={category}>
                        <h4 className="brand-subheading text-sm capitalize mb-2">{category}</h4>
                        <div className="flex flex-wrap gap-1">
                          {keywords.map((keyword, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </TabsContent>
            
            {/* Landing Copy Tab */}
            <TabsContent value="copy" className="space-y-6">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="brand-heading text-lg">Landing Page Copy</h3>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => copyToClipboard(briefData.landingPageCopy)}
                  >
                    <Clipboard className="w-4 h-4 mr-2" />
                    Copy All
                  </Button>
                </div>
                <div className="prose max-w-none">
                  <pre className="bg-gray-50 p-4 rounded-lg text-sm whitespace-pre-wrap font-body">
                    {briefData.landingPageCopy}
                  </pre>
                </div>
              </Card>
            </TabsContent>
            
            {/* JSON Tab */}
            <TabsContent value="json" className="space-y-6">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="brand-heading text-lg">JSON Deliverable</h3>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => copyToClipboard(JSON.stringify(briefData.jsonDeliverable, null, 2))}
                  >
                    <Clipboard className="w-4 h-4 mr-2" />
                    Copy JSON
                  </Button>
                </div>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
                  <pre>{JSON.stringify(briefData.jsonDeliverable, null, 2)}</pre>
                </div>
              </Card>
            </TabsContent>
            
            {/* Schema Tab */}
            <TabsContent value="schema" className="space-y-6">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="brand-heading text-lg">Schema Markup</h3>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => copyToClipboard(briefData.schemaMarkup)}
                  >
                    <Clipboard className="w-4 h-4 mr-2" />
                    Copy Schema
                  </Button>
                </div>
                <div className="bg-gray-900 text-blue-400 p-4 rounded-lg text-sm overflow-x-auto">
                  <pre>{briefData.schemaMarkup}</pre>
                </div>
              </Card>
            </TabsContent>
          </Tabs>

        </div>
      </main>
    </div>
  );
}