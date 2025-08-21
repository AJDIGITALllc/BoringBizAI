import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, FileText, AlertTriangle, CheckCircle, Scale } from "lucide-react";

export default function LegalTerms() {
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
              <Scale className="w-8 h-8 text-brand-primary" />
              <h1 className="brand-heading text-3xl md:text-4xl">Terms of Service</h1>
            </div>
            <p className="brand-body text-xl text-brand-secondary">
              Agreement for using BoringBiz.AI to discover business opportunities
            </p>
            <p className="brand-body text-sm text-brand-secondary mt-2">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Terms Content */}
          <div className="space-y-8">
            
            <Card className="p-8">
              <div className="flex items-center space-x-2 mb-4">
                <CheckCircle className="w-5 h-5 text-brand-success" />
                <h2 className="brand-heading text-xl">Acceptance of Terms</h2>
              </div>
              <div className="prose max-w-none brand-body text-brand-dark space-y-4">
                <p>
                  By accessing and using BoringBiz.AI ("the Service"), you accept and agree to be bound by 
                  these Terms of Service. If you do not agree to these terms, please do not use the Service.
                </p>
                <p>
                  BoringBiz.AI is a business analysis platform that helps users identify opportunities in 
                  "boring" or traditional businesses through AI-powered competitor analysis.
                </p>
              </div>
            </Card>

            <Card className="p-8">
              <div className="flex items-center space-x-2 mb-4">
                <FileText className="w-5 h-5 text-brand-accent" />
                <h2 className="brand-heading text-xl">Service Description</h2>
              </div>
              <div className="prose max-w-none brand-body text-brand-dark space-y-4">
                <p>
                  <strong>Website Analysis:</strong> Our service analyzes publicly available competitor websites 
                  to identify business opportunities and generate actionable insights.
                </p>
                <p>
                  <strong>Opportunity Scoring:</strong> We provide "boring-ness" scores based on various factors 
                  including content volume, design modernity, and competitive positioning.
                </p>
                <p>
                  <strong>Integration Services:</strong> We offer integrations with Notion, Airtable, and AI services 
                  to streamline your workflow and data management.
                </p>
                <p>
                  <strong>Deliverables:</strong> Generated reports include landing page copy, JSON data exports, 
                  and schema markup recommendations.
                </p>
              </div>
            </Card>

            <Card className="p-8">
              <div className="flex items-center space-x-2 mb-4">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                <h2 className="brand-heading text-xl">Acceptable Use</h2>
              </div>
              <div className="prose max-w-none brand-body text-brand-dark space-y-4">
                <p>
                  <strong>Permitted Uses:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Analyzing competitor websites for legitimate business research</li>
                  <li>Generating insights for your own business development</li>
                  <li>Using our analysis tools for market research and opportunity identification</li>
                  <li>Exporting data for your internal business planning</li>
                </ul>
                
                <p className="mt-6">
                  <strong>Prohibited Uses:</strong>
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Attempting to access private or restricted website content</li>
                  <li>Using the service for illegal, harmful, or unethical purposes</li>
                  <li>Overwhelming websites with excessive requests</li>
                  <li>Reselling or redistributing our analysis data without permission</li>
                  <li>Reverse engineering our scoring algorithms</li>
                </ul>
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="brand-heading text-xl mb-4">Account Responsibilities</h2>
              <div className="prose max-w-none brand-body text-brand-dark space-y-4">
                <p>
                  <strong>Account Security:</strong> You are responsible for maintaining the confidentiality 
                  of your account credentials and for all activities under your account.
                </p>
                <p>
                  <strong>API Keys:</strong> Any third-party API keys you provide (Notion, Airtable, AI services) 
                  remain your responsibility. Ensure you have proper permissions for their use.
                </p>
                <p>
                  <strong>Data Accuracy:</strong> While we strive for accuracy, you should verify all analysis 
                  results before making business decisions.
                </p>
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="brand-heading text-xl mb-4">Subscription and Billing</h2>
              <div className="prose max-w-none brand-body text-brand-dark space-y-4">
                <p>
                  <strong>Billing Cycles:</strong> Subscriptions are billed monthly or annually based on your 
                  selected plan. Charges are processed automatically.
                </p>
                <p>
                  <strong>Usage Limits:</strong> Each plan includes a specific number of analyses per month. 
                  Additional usage may incur extra charges.
                </p>
                <p>
                  <strong>Cancellation:</strong> You may cancel your subscription at any time. Service continues 
                  until the end of your current billing period.
                </p>
                <p>
                  <strong>Refunds:</strong> We offer pro-rated refunds for unused portions of annual subscriptions 
                  cancelled within 30 days.
                </p>
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="brand-heading text-xl mb-4">Limitation of Liability</h2>
              <div className="prose max-w-none brand-body text-brand-dark space-y-4">
                <p>
                  BoringBiz.AI provides business analysis tools and insights for informational purposes. 
                  We do not guarantee specific business outcomes or results.
                </p>
                <p>
                  <strong>No Business Advice:</strong> Our service provides data analysis, not professional 
                  business or legal advice. Consult qualified professionals for business decisions.
                </p>
                <p>
                  <strong>Third-Party Content:</strong> We analyze publicly available website content but are 
                  not responsible for the accuracy or legality of competitor websites.
                </p>
                <p>
                  <strong>Service Availability:</strong> While we strive for 99.9% uptime, we cannot guarantee 
                  uninterrupted service availability.
                </p>
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="brand-heading text-xl mb-4">Intellectual Property</h2>
              <div className="prose max-w-none brand-body text-brand-dark space-y-4">
                <p>
                  <strong>BoringBiz.AI Content:</strong> All algorithms, analysis methods, branding, and platform 
                  content remain the intellectual property of BoringBiz.AI.
                </p>
                <p>
                  <strong>Your Data:</strong> You retain ownership of your account data, analysis results, 
                  and any content you create using our platform.
                </p>
                <p>
                  <strong>Generated Content:</strong> AI-generated landing page copy and recommendations are 
                  provided for your use, but you should review and customize them for your needs.
                </p>
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="brand-heading text-xl mb-4">Changes to Terms</h2>
              <div className="prose max-w-none brand-body text-brand-dark space-y-4">
                <p>
                  We may update these Terms of Service periodically. Significant changes will be communicated 
                  via email and through the platform. Continued use after changes constitutes acceptance.
                </p>
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="brand-heading text-xl mb-4">Contact Information</h2>
              <div className="prose max-w-none brand-body text-brand-dark">
                <p>
                  For questions about these Terms of Service, please contact us:
                </p>
                <div className="mt-4 space-y-2">
                  <p><strong>Email:</strong> legal@boringbiz.ai</p>
                  <p><strong>Address:</strong> 123 Business Ave, Suite 100, Chicago, IL 60601</p>
                </div>
              </div>
            </Card>

          </div>

          {/* Bottom Navigation */}
          <div className="flex justify-between items-center mt-12 pt-8 border-t">
            <Link href="/legal/privacy">
              <Button variant="outline">Privacy Policy</Button>
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