import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Download, HelpCircle } from "lucide-react";
import { useAuditMutation } from "@/hooks/use-audit";
import { useToast } from "@/hooks/use-toast";
import { StepLockAnalysis } from "./steplock-analysis";
import { BoringOpportunityAlert, LoadingWithZzz } from "@/components/ui/zzz-animation";
import type { AuditResult } from "@/types/audit";

export function AuditSection() {
  const [url, setUrl] = useState("");
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
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
    if (!result.hasWebp) score += 15; // No modern image formats
    
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
      toast({
        title: "Success",
        description: "URL analysis completed successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to analyze URL. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleExport = () => {
    if (auditResult) {
      const dataStr = JSON.stringify(auditResult, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `audit-${auditResult.id}.json`;
      link.click();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-ink">Competitor URL Audit</h2>
            <p className="text-gray-600 mt-1">Analyze competitor websites and extract valuable insights</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <HelpCircle className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex space-x-4 mb-6">
          <div className="flex-1">
            <Input
              type="url"
              placeholder="https://competitor-website.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full"
            />
          </div>
          <Button 
            onClick={handleAnalyze}
            disabled={auditMutation.isPending}
            className="brand-btn-primary"
          >
            <Search className="w-4 h-4 mr-2" />
            {auditMutation.isPending ? "Analyzing..." : "Analyze URL"}
          </Button>
        </div>

        {/* Loading State with ZZZ Animation */}
        {auditMutation.isPending && (
          <LoadingWithZzz 
            message="Analyzing boring-ness levels... Looking for opportunities 🔍"
            className="my-8"
          />
        )}

        {auditResult && (
          <div className="space-y-6">
            {/* Opportunity Score Alert with ZZZ Animation */}
            <BoringOpportunityAlert 
              score={calculateOpportunityScore(auditResult)}
              threshold={70}
              className="mb-6"
            />
            {/* Basic Info Card */}
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-ink mb-2">{auditResult.title || "No title found"}</h3>
                  <p className="text-gray-600 mb-4">{auditResult.description || "No description found"}</p>
                  <div className="flex items-center space-x-6 text-sm text-gray-500">
                    <span>🌐 {new URL(auditResult.url).hostname}</span>
                    <span>📅 Analyzed {new Date(auditResult.createdAt).toLocaleString()}</span>
                  </div>
                </div>
                <Button onClick={handleExport} variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    📄
                  </div>
                  <p className="text-2xl font-bold text-ink">{auditResult.wordCount.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Words</p>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    🖼️
                  </div>
                  <p className="text-2xl font-bold text-ink">{auditResult.imagesCount}</p>
                  <p className="text-sm text-gray-600">Images</p>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-highlight/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    🔗
                  </div>
                  <p className="text-2xl font-bold text-ink">{auditResult.linksCount}</p>
                  <p className="text-sm text-gray-600">Links</p>
                </div>
              </div>
            </div>

            {/* StepLock Analysis */}
            <StepLockAnalysis keywords={auditResult.stepLockKeywords} />

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <Button className="bg-primary hover:bg-primary/90 text-white font-semibold">
                🤖 Generate Deliverables
              </Button>
              <Button variant="outline">
                📄 Export JSON
              </Button>
              <Button variant="outline">
                📝 Save to Notion
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
