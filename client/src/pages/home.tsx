import { Button } from "@/components/ui/button";
import { ArrowRight, Target, Zap, TrendingUp } from "lucide-react";
import { ZzzAnimation } from "@/components/ui/zzz-animation";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-light via-white to-brand-primary/10">
      {/* Navigation */}
      <nav className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-heading font-bold text-sm">B</span>
          </div>
          <span className="font-heading font-bold text-brand-dark text-xl">BoringBiz.AI</span>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/dashboard">
            <Button variant="ghost" className="font-body">Dashboard</Button>
          </Link>
          <Link href="/analyze">
            <Button className="brand-btn-primary">Start Analysis</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20 text-center max-w-4xl mx-auto">
        <div className="mb-8">
          <ZzzAnimation count={3} size="large" className="justify-center mb-4" />
          <h1 className="font-heading font-bold text-4xl md:text-6xl text-brand-dark mb-6">
            Turn <span className="text-brand-primary">Boring</span> Into{" "}
            <span className="text-brand-success">Gold</span>
          </h1>
          <p className="font-body text-xl text-brand-secondary max-w-2xl mx-auto mb-8">
            While competitors sleep on boring businesses, we find the hidden goldmines. 
            AI-powered insights turn mundane markets into profit opportunities.
          </p>
          <Link href="/analyze">
            <Button className="brand-btn-primary text-lg px-8 py-4">
              Find Boring Opportunities <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-heading font-bold text-3xl text-center text-brand-dark mb-12">
            Why Boring = <span className="text-brand-success">Opportunity</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="brand-card p-6 text-center">
              <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-brand-primary" />
              </div>
              <h3 className="brand-subheading text-xl mb-3">Less Competition</h3>
              <p className="brand-body">
                Boring businesses are overlooked by flashy competitors. 
                More market share for you.
              </p>
            </div>

            <div className="brand-card p-6 text-center">
              <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-brand-accent" />
              </div>
              <h3 className="brand-subheading text-xl mb-3">Faster Growth</h3>
              <p className="brand-body">
                Small improvements make big impacts when everyone else is sleeping.
              </p>
            </div>

            <div className="brand-card p-6 text-center">
              <div className="w-16 h-16 bg-brand-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-brand-success" />
              </div>
              <h3 className="brand-subheading text-xl mb-3">Stable Returns</h3>
              <p className="brand-body">
                Boring businesses have predictable revenue and loyal customers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-20 bg-brand-light/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-heading font-bold text-3xl text-brand-dark mb-12">
            How It Works
          </h2>
          
          <div className="space-y-8">
            <div className="flex items-center space-x-6 p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center text-white font-heading font-bold">
                1
              </div>
              <div className="flex-1 text-left">
                <h3 className="brand-subheading text-lg mb-2">Paste Competitor URL</h3>
                <p className="brand-body text-brand-secondary">
                  Drop any business website and we'll analyze their boring-ness level
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-6 p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-brand-accent rounded-full flex items-center justify-center text-white font-heading font-bold">
                2
              </div>
              <div className="flex-1 text-left">
                <h3 className="brand-subheading text-lg mb-2">AI Finds Opportunities</h3>
                <p className="brand-body text-brand-secondary">
                  Our algorithms detect gaps, outdated content, and missed potential
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-6 p-6 bg-white rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-brand-success rounded-full flex items-center justify-center text-white font-heading font-bold">
                3
              </div>
              <div className="flex-1 text-left">
                <h3 className="brand-subheading text-lg mb-2">Get Your Action Plan</h3>
                <p className="brand-body text-brand-secondary">
                  Receive specific strategies to dominate while they sleep
                  <ZzzAnimation count={2} size="small" className="inline-flex ml-2" />
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-brand-dark text-white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading font-bold text-3xl mb-6">
            Ready to Find Gold in Boring?
          </h2>
          <p className="font-body text-xl text-brand-light mb-8">
            Join the smart money that profits while others yawn.
          </p>
          <Link href="/analyze">
            <Button className="bg-brand-primary hover:bg-brand-primary/90 text-white font-heading font-semibold px-8 py-4 text-lg">
              Start Finding Opportunities
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 bg-brand-light border-t">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-6 h-6 bg-brand-primary rounded-md flex items-center justify-center">
                <span className="text-white font-heading font-bold text-xs">B</span>
              </div>
              <span className="font-heading font-semibold text-brand-dark">BoringBiz.AI</span>
            </div>
            <p className="brand-body text-brand-secondary text-sm">
              Transform boring businesses into profitable opportunities.
            </p>
          </div>
          
          <div className="flex justify-center items-center space-x-6 text-xs text-brand-secondary">
            <Link href="/legal/privacy" className="hover:text-brand-primary">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/legal/terms" className="hover:text-brand-primary">
              Terms of Service
            </Link>
            <span>•</span>
            <span>© 2024 BoringBiz.AI</span>
          </div>
        </div>
      </footer>
    </div>
  );
}