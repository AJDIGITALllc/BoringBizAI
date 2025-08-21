import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, HelpCircle } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useAuditMutation } from "@/hooks/use-audit";
import { useToast } from "@/hooks/use-toast";
import { BoringOpportunityAlert, LoadingWithZzz } from "@/components/ui/zzz-animation";
import { StepLockAnalysis } from "@/components/dashboard/steplock-analysis";
import type { AuditResult } from "@/types/audit";

export default function Analyze() {
  const [url, setUrl] = useState("");
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const auditMutation = useAuditMutation();

  // Calculate opportunity score based on "boring-ness" indicators
  const calculateOpportunityScore = (result: AuditResult): number => {
    let score = 0;
    
    // Low word count = more boring = higher opportunity
    if (result.wordCount < 500) score += 25;
    else if (result.wordCount < 1000) score += 15;
    else if (result.wordCount < 2000) score += 5;
    
    // Few images = more boring = higher opportunity
    if (result.imagesCount < 5) score += 20;
    else if (result.imagesCount < 10) score += 10;
    
    // Limited links = less interactive = more boring
    if (result.linksCount < 20) score += 15;
    else if (result.linksCount < 50) score += 10;
    
    // StepLock keywords indicate competitive opportunity
    const totalKeywords = Object.values(result.stepLockKeywords).flat().length;
    if (totalKeywords > 10) score += 25;
    else if (totalKeywords > 5) score += 15;
    else if (totalKeywords > 0) score += 10;
    
    // Old-school tech = more boring = higher opportunity
    if (!result.hasWebp) score += 15;
    
    return Math.min(100, Math.max(0, score));
  };

  const handleAnalyze = async () => {
    if (!url) {
      toast({
        title: "Error",
        description: "Please enter a valid URL",
        variant: "destructive",
      });
      return;
    }

    try {
      const result = await auditMutation.mutateAsync({ url });
      setAuditResult(result);
      
      // Navigate to opportunity page with results
      const score = calculateOpportunityScore(result);
      if (score >= 75) {
        setLocation(`/opportunity/${result.id}`);
      }
      
      toast({
        title: "Analysis Complete",
        description: `Opportunity score: ${score}/100`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze URL. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-light via-white to-brand-primary/5">
      {/* Header */}
      <header className="px-6 py-4 border-b bg-white/80 backdrop-blur">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-heading font-bold text-sm">B</span>
              </div>
              <span className="font-heading font-bold text-brand-dark text-xl">BoringBiz.AI</span>
            </div>
          </div>
          <Link href="/dashboard">
            <Button variant="outline">Dashboard</Button>
          </Link>
        </div>
      </header>

      <main className="px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="font-heading font-bold text-3xl md:text-4xl text-brand-dark mb-4">
              Find Hidden Opportunities
            </h1>
            <p className="font-body text-xl text-brand-secondary max-w-2xl mx-auto">
              Paste any competitor URL and discover how boring they are. 
              The more boring, the more opportunity for you!
            </p>
          </div>

          {/* Analysis Form */}
          <div className="brand-card p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="brand-heading text-xl">Competitor URL Analysis</h2>
                <p className="brand-body text-brand-secondary mt-1">
                  Enter a website URL to analyze their boring-ness level
                </p>
              </div>
              <Button variant="ghost" size="icon">
                <HelpCircle className="h-5 w-5" />
              </Button>
            </div>

            <div className="flex space-x-4 mb-6">
              <div className="flex-1">
                <Input
                  type="url"
                  placeholder="https://competitor-website.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full text-lg py-3"
                  disabled={auditMutation.isPending}
                />
              </div>
              <Button 
                onClick={handleAnalyze}
                disabled={auditMutation.isPending || !url.trim()}
                className="brand-btn-primary px-8"
              >
                <Search className="w-5 h-5 mr-2" />
                {auditMutation.isPending ? "Analyzing..." : "Analyze"}
              </Button>
            </div>

            {/* Examples */}
            <div className="text-sm text-brand-secondary">
              <span className="mr-2">Try examples:</span>
              {[
                "https://old-plumbing-company.com",
                "https://basic-accounting-firm.net", 
                "https://simple-law-office.org"
              ].map((example, index) => (
                <button
                  key={index}
                  onClick={() => setUrl(example)}
                  className="mr-4 text-brand-primary hover:underline"
                  disabled={auditMutation.isPending}
                >
                  {example.replace("https://", "")}
                </button>
              ))}
            </div>
          </div>

          {/* Loading State */}
          {auditMutation.isPending && (
            <LoadingWithZzz 
              message="Analyzing boring-ness levels... Looking for opportunities 🔍"
              className="my-12"
            />
          )}

          {/* Results */}
          {auditResult && (
            <div className="space-y-8">
              {/* Opportunity Score Alert */}
              <BoringOpportunityAlert 
                score={calculateOpportunityScore(auditResult)}
                threshold={60}
                className="mb-8"
              />

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="brand-card p-4 text-center">
                  <div className="text-2xl font-heading font-bold text-brand-primary mb-1">
                    {calculateOpportunityScore(auditResult)}
                  </div>
                  <div className="text-sm font-body text-brand-secondary">
                    Opportunity Score
                  </div>
                </div>
                
                <div className="brand-card p-4 text-center">
                  <div className="text-2xl font-heading font-bold text-brand-dark mb-1">
                    {auditResult.wordCount.toLocaleString()}
                  </div>
                  <div className="text-sm font-body text-brand-secondary">
                    Words
                  </div>
                </div>

                <div className="brand-card p-4 text-center">
                  <div className="text-2xl font-heading font-bold text-brand-dark mb-1">
                    {auditResult.imagesCount}
                  </div>
                  <div className="text-sm font-body text-brand-secondary">
                    Images
                  </div>
                </div>

                <div className="brand-card p-4 text-center">
                  <div className="text-2xl font-heading font-bold text-brand-dark mb-1">
                    {auditResult.linksCount}
                  </div>
                  <div className="text-sm font-body text-brand-secondary">
                    Links
                  </div>
                </div>
              </div>

              {/* Basic Info */}
              <div className="brand-card p-6 mb-8">
                <h3 className="brand-heading text-lg mb-2">
                  {auditResult.title || "No title found"}
                </h3>
                <p className="brand-body text-brand-secondary mb-4">
                  {auditResult.description || "No description found"}
                </p>
                <div className="flex items-center space-x-6 text-sm text-brand-secondary">
                  <span>🌐 {new URL(auditResult.url).hostname}</span>
                  <span>📅 {new Date(auditResult.createdAt).toLocaleString()}</span>
                  <span>🖼️ WebP: {auditResult.hasWebp ? "Yes" : "No"}</span>
                </div>
              </div>

              {/* StepLock Analysis */}
              <StepLockAnalysis keywords={auditResult.stepLockKeywords} />

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href={`/opportunity/${auditResult.id}`}>
                  <Button className="brand-btn-primary">
                    🎯 View Full Opportunity Report
                  </Button>
                </Link>
                <Button 
                  variant="outline"
                  onClick={() => {
                    const dataStr = JSON.stringify(auditResult, null, 2);
                    const dataBlob = new Blob([dataStr], { type: 'application/json' });
                    const url = URL.createObjectURL(dataBlob);
                    const link = document.createElement('a');
                    link.href = url;
                    link.download = `boring-analysis-${auditResult.id}.json`;
                    link.click();
                  }}
                >
                  📄 Export Analysis
                </Button>
                <Button variant="outline">
                  🤖 Generate Action Plan
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}