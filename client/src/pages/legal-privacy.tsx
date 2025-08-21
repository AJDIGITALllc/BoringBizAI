import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Shield, Eye, Database, Globe } from "lucide-react";

export default function LegalPrivacy() {
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
          
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Shield className="w-8 h-8 text-brand-primary" />
              <h1 className="brand-heading text-3xl md:text-4xl">Privacy Policy</h1>
            </div>
            <p className="brand-body text-xl text-brand-secondary">
              How we protect and handle your data while you discover boring business opportunities
            </p>
            <p className="brand-body text-sm text-brand-secondary mt-2">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Privacy Content */}
          <div className="space-y-8">
            
            <Card className="p-8">
              <div className="flex items-center space-x-2 mb-4">
                <Eye className="w-5 h-5 text-brand-accent" />
                <h2 className="brand-heading text-xl">Information We Collect</h2>
              </div>
              <div className="prose max-w-none brand-body text-brand-dark space-y-4">
                <p>
                  <strong>Account Information:</strong> When you create an account, we collect your name, email address, 
                  and company information to personalize your experience.
                </p>
                <p>
                  <strong>Usage Data:</strong> We collect information about how you use BoringBiz.AI, including 
                  URLs analyzed, opportunity scores generated, and dashboard interactions.
                </p>
                <p>
                  <strong>Competitor Analysis Data:</strong> URLs you submit for analysis, along with the resulting 
                  website data we collect (publicly available information only).
                </p>
                <p>
                  <strong>Integration Data:</strong> API keys and tokens you provide for Notion, Airtable, and AI services 
                  (stored securely and encrypted).
                </p>
              </div>
            </Card>

            <Card className="p-8">
              <div className="flex items-center space-x-2 mb-4">
                <Database className="w-5 h-5 text-brand-success" />
                <h2 className="brand-heading text-xl">How We Use Your Information</h2>
              </div>
              <div className="prose max-w-none brand-body text-brand-dark space-y-4">
                <p>
                  <strong>Service Delivery:</strong> To analyze competitor websites, generate opportunity scores, 
                  and provide you with actionable business insights.
                </p>
                <p>
                  <strong>Integration Services:</strong> To sync your analysis results with your Notion and Airtable 
                  workspaces as configured by you.
                </p>
                <p>
                  <strong>Product Improvement:</strong> To understand usage patterns and improve our boring business 
                  detection algorithms (all data is anonymized).
                </p>
                <p>
                  <strong>Communication:</strong> To send you analysis results, opportunity alerts, and product updates 
                  (only if you've opted in).
                </p>
              </div>
            </Card>

            <Card className="p-8">
              <div className="flex items-center space-x-2 mb-4">
                <Globe className="w-5 h-5 text-brand-primary" />
                <h2 className="brand-heading text-xl">Data Sharing and Third Parties</h2>
              </div>
              <div className="prose max-w-none brand-body text-brand-dark space-y-4">
                <p>
                  <strong>We DO NOT sell your data.</strong> Your competitor analysis and business insights remain private.
                </p>
                <p>
                  <strong>Integration Partners:</strong> We only share data with services you explicitly connect 
                  (Notion, Airtable) and only the data you choose to sync.
                </p>
                <p>
                  <strong>AI Processing:</strong> Website content may be processed by AI services (Claude, OpenAI) 
                  for analysis, but your personal data is not included.
                </p>
                <p>
                  <strong>Legal Requirements:</strong> We may disclose information if required by law or to protect 
                  our rights and users.
                </p>
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="brand-heading text-xl mb-4">Your Rights and Controls</h2>
              <div className="prose max-w-none brand-body text-brand-dark space-y-4">
                <p>
                  <strong>Access:</strong> Request a copy of all data we have about you and your analyses.
                </p>
                <p>
                  <strong>Correction:</strong> Update your profile information and analysis preferences anytime.
                </p>
                <p>
                  <strong>Deletion:</strong> Request deletion of your account and all associated data 
                  (competitor analyses will be anonymized).
                </p>
                <p>
                  <strong>Portability:</strong> Export your analysis data in JSON format for use elsewhere.
                </p>
                <p>
                  <strong>Opt-out:</strong> Disable specific features like email notifications or data syncing.
                </p>
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="brand-heading text-xl mb-4">Data Security</h2>
              <div className="prose max-w-none brand-body text-brand-dark space-y-4">
                <p>
                  We use industry-standard security measures including encryption at rest and in transit, 
                  secure API authentication, and regular security audits.
                </p>
                <p>
                  Your API keys and integration tokens are encrypted and stored securely. We never log or 
                  store your third-party credentials in plain text.
                </p>
                <p>
                  All competitor website data we collect is publicly available information only. We do not 
                  attempt to access private or restricted content.
                </p>
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="brand-heading text-xl mb-4">Contact Us</h2>
              <div className="prose max-w-none brand-body text-brand-dark">
                <p>
                  If you have questions about this Privacy Policy or your data, please contact us:
                </p>
                <div className="mt-4 space-y-2">
                  <p><strong>Email:</strong> privacy@boringbiz.ai</p>
                  <p><strong>Address:</strong> 123 Business Ave, Suite 100, Chicago, IL 60601</p>
                </div>
              </div>
            </Card>

          </div>

          {/* Bottom Navigation */}
          <div className="flex justify-between items-center mt-12 pt-8 border-t">
            <Link href="/legal/terms">
              <Button variant="outline">Terms of Service</Button>
            </Link>
            <Link href="/dashboard">
              <Button className="brand-btn-primary">Back to Dashboard</Button>
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
}