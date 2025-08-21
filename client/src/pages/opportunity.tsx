import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Share2, Lightbulb, TrendingUp, Target } from "lucide-react";
import { Link, useRoute } from "wouter";
import { BoringOpportunityAlert, ZzzAnimation } from "@/components/ui/zzz-animation";
import { StepLockAnalysis } from "@/components/dashboard/steplock-analysis";
import type { AuditResult } from "@/types/audit";

export default function Opportunity() {
  const [match, params] = useRoute("/opportunity/:id");
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock data for now - replace with actual API call
  useEffect(() => {
    const mockAudit: AuditResult = {
      id: params?.id || "1",
      url: "https://boring-plumbing.com",
      title: "Smith & Sons Plumbing - Local Plumbers Since 1987",
      description: "We fix pipes and do plumbing stuff. Call us for repairs.",
      h1: "Smith & Sons Plumbing",
      wordCount: 247,
      imagesCount: 3,
      scriptsCount: 2,
      linksCount: 8,
      hasWebp: false,
      links: ["https://boring-plumbing.com/about", "https://boring-plumbing.com/services"],
      stepLockKeywords: {
        emergency: ["24/7", "emergency", "urgent"],
        service: ["repair", "fix", "plumbing"],
        local: ["local", "area", "nearby"],
        problem: ["broken", "leaking", "clogged"]
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setTimeout(() => {
      setAuditResult(mockAudit);
      setLoading(false);
    }, 1000);
  }, [params?.id]);

  const calculateOpportunityScore = (result: AuditResult): number => {
    let score = 0;
    if (result.wordCount < 500) score += 25;
    else if (result.wordCount < 1000) score += 15;
    if (result.imagesCount < 5) score += 20;
    if (result.linksCount < 20) score += 15;
    const totalKeywords = Object.values(result.stepLockKeywords).flat().length;
    if (totalKeywords > 10) score += 25;
    if (!result.hasWebp) score += 15;
    return Math.min(100, Math.max(0, score));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-light via-white to-brand-primary/5 flex items-center justify-center">
        <div className="text-center">
          <ZzzAnimation count={3} size="large" className="justify-center mb-4" />
          <p className="font-body text-brand-secondary">Loading opportunity details...</p>
        </div>
      </div>
    );
  }

  if (!auditResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-light via-white to-brand-primary/5 flex items-center justify-center">
        <div className="text-center">
          <h1 className="brand-heading text-2xl mb-4">Opportunity Not Found</h1>
          <Link href="/analyze">
            <Button className="brand-btn-primary">Analyze New URL</Button>
          </Link>
        </div>
      </div>
    );
  }

  const score = calculateOpportunityScore(auditResult);
  const opportunityLevel = score >= 90 ? "GOLDMINE" : score >= 75 ? "HIGH" : score >= 60 ? "MEDIUM" : "LOW";
  const opportunities = [
    "Outdated website design - Easy to outrank with modern UX",
    "Minimal content - Create comprehensive service guides",
    "No social media presence - Capture their audience",
    "Missing local SEO - Dominate local searches",
    "No online booking system - Convenience advantage"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-light via-white to-brand-primary/5">
      {/* Header */}
      <header className="px-6 py-4 border-b bg-white/80 backdrop-blur">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/analyze">
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
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </header>

      <main className="px-6 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          
          {/* Opportunity Header */}
          <div className="text-center">
            <div className="inline-flex items-center space-x-3 mb-4">
              <span className={`px-4 py-2 rounded-full text-sm font-heading font-semibold ${
                score >= 90 ? 'bg-brand-success text-white' :
                score >= 75 ? 'bg-brand-primary text-white' :
                score >= 60 ? 'bg-brand-accent text-white' :
                'bg-gray-400 text-white'
              }`}>
                {opportunityLevel} OPPORTUNITY
              </span>
              <ZzzAnimation count={score >= 90 ? 4 : score >= 75 ? 3 : 2} />
            </div>
            <h1 className="font-heading font-bold text-3xl md:text-4xl text-brand-dark mb-2">
              {auditResult.title}
            </h1>
            <p className="font-body text-xl text-brand-secondary max-w-2xl mx-auto">
              {new URL(auditResult.url).hostname}
            </p>
          </div>

          {/* Opportunity Score Alert */}
          <BoringOpportunityAlert 
            score={score}
            threshold={50}
            className="max-w-4xl mx-auto"
          />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column - Opportunities & Analysis */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Key Opportunities */}
              <div className="brand-card p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Lightbulb className="h-5 w-5 text-brand-primary" />
                  <h2 className="brand-heading text-xl">Key Opportunities Found</h2>
                </div>
                <div className="space-y-3">
                  {opportunities.map((opportunity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-brand-success/10 rounded-lg">
                      <div className="w-6 h-6 bg-brand-success rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs font-bold">{index + 1}</span>
                      </div>
                      <p className="brand-body text-brand-dark">{opportunity}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* StepLock Keyword Analysis */}
              <StepLockAnalysis keywords={auditResult.stepLockKeywords} />

              {/* Competitive Insights */}
              <div className="brand-card p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Target className="h-5 w-5 text-brand-accent" />
                  <h2 className="brand-heading text-xl">Competitive Insights</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <h3 className="font-heading font-semibold text-red-800 mb-2">Their Weaknesses</h3>
                    <ul className="text-sm text-red-700 space-y-1">
                      <li>• Minimal content ({auditResult.wordCount} words)</li>
                      <li>• Few images ({auditResult.imagesCount})</li>
                      <li>• Limited interactivity ({auditResult.linksCount} links)</li>
                      <li>• {!auditResult.hasWebp ? "No modern image formats" : "Using modern formats"}</li>
                    </ul>
                  </div>
                  <div className="p-4 bg-brand-success/10 border border-brand-success/20 rounded-lg">
                    <h3 className="font-heading font-semibold text-brand-success mb-2">Your Advantages</h3>
                    <ul className="text-sm text-brand-success space-y-1">
                      <li>• Create comprehensive content</li>
                      <li>• Use high-quality visuals</li>
                      <li>• Build interactive experiences</li>
                      <li>• Implement modern web standards</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Stats & Actions */}
            <div className="space-y-6">
              
              {/* Quick Stats */}
              <div className="brand-card p-6">
                <h3 className="brand-heading text-lg mb-4">Analysis Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-body text-brand-secondary">Opportunity Score</span>
                    <span className="font-heading font-bold text-2xl text-brand-primary">{score}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-body text-brand-secondary">Content Volume</span>
                    <span className="font-heading font-semibold">{auditResult.wordCount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-body text-brand-secondary">Visual Assets</span>
                    <span className="font-heading font-semibold">{auditResult.imagesCount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-body text-brand-secondary">Navigation</span>
                    <span className="font-heading font-semibold">{auditResult.linksCount} links</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-body text-brand-secondary">Modern Tech</span>
                    <span className={`font-heading font-semibold ${auditResult.hasWebp ? 'text-brand-success' : 'text-red-600'}`}>
                      {auditResult.hasWebp ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Items */}
              <div className="brand-card p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <TrendingUp className="h-5 w-5 text-brand-primary" />
                  <h3 className="brand-heading text-lg">Next Steps</h3>
                </div>
                <div className="space-y-3">
                  <Button className="w-full brand-btn-primary justify-start">
                    🤖 Generate Action Plan
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    📊 Export to Notion
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    📈 Track Competitor
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    🎯 Similar Opportunities
                  </Button>
                </div>
              </div>

              {/* Success Prediction */}
              <div className="brand-card p-6 bg-gradient-to-br from-brand-success/5 to-brand-primary/5 border-brand-success/20">
                <h3 className="brand-heading text-lg mb-3 text-brand-success">Success Prediction</h3>
                <div className="text-center">
                  <div className="text-3xl font-heading font-bold text-brand-success mb-2">
                    {score >= 90 ? '95%' : score >= 75 ? '80%' : score >= 60 ? '65%' : '40%'}
                  </div>
                  <p className="text-sm font-body text-brand-secondary">
                    Probability of market penetration with proper execution
                  </p>
                </div>
                <div className="mt-4 p-3 bg-white/50 rounded-lg">
                  <p className="text-xs font-accent text-brand-primary text-center">
                    💤 While they sleep, you could capture {score >= 90 ? '60%' : score >= 75 ? '40%' : '25%'} of their market share
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center py-12">
            <div className="max-w-2xl mx-auto">
              <ZzzAnimation count={3} className="justify-center mb-6" />
              <h2 className="font-heading font-bold text-2xl text-brand-dark mb-4">
                Ready to Turn This Boring Business Into Gold?
              </h2>
              <p className="font-body text-brand-secondary mb-6">
                Don't let this opportunity slip away while others are sleeping.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button className="brand-btn-primary px-8">
                  🚀 Generate Full Strategy
                </Button>
                <Link href="/analyze">
                  <Button variant="outline">
                    🔍 Analyze Another Competitor
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}