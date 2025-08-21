import { useState } from "react";
import { Sidebar } from "@/components/layout/sidebar";
import { Header } from "@/components/layout/header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  User, 
  Key, 
  CreditCard, 
  Bell,
  Shield,
  ExternalLink,
  Check,
  AlertCircle,
  Settings,
  Database,
  Zap
} from "lucide-react";

export default function DashboardSettings() {
  const [notificationSettings, setNotificationSettings] = useState({
    emailReports: true,
    opportunityAlerts: true,
    weeklyDigest: false,
    marketingUpdates: false
  });

  const [integrationStatus, setIntegrationStatus] = useState({
    notion: { connected: true, lastSync: "2 hours ago" },
    airtable: { connected: true, lastSync: "5 minutes ago" },
    claude: { connected: false, lastSync: "Never" },
    openai: { connected: false, lastSync: "Never" }
  });

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotificationSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex h-screen bg-paper">
      <Sidebar />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        
        <main className="flex-1 overflow-y-auto bg-paper">
          <div className="p-6 space-y-6 max-w-4xl mx-auto">
            
            {/* Page Header */}
            <div className="mb-8">
              <h1 className="brand-heading text-2xl md:text-3xl mb-2">
                Settings
              </h1>
              <p className="brand-body text-brand-secondary">
                Manage your profile, integrations, and billing preferences
              </p>
            </div>

            {/* Settings Tabs */}
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="integrations">Integrations</TabsTrigger>
                <TabsTrigger value="billing">Plan & Billing</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
              </TabsList>
              
              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-6">
                <Card className="p-6">
                  <div className="flex items-center space-x-2 mb-6">
                    <User className="w-5 h-5 text-brand-primary" />
                    <h2 className="brand-heading text-lg">Profile Information</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="brand-body text-sm font-medium mb-2 block">First Name</label>
                        <Input placeholder="John" />
                      </div>
                      <div>
                        <label className="brand-body text-sm font-medium mb-2 block">Last Name</label>
                        <Input placeholder="Doe" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="brand-body text-sm font-medium mb-2 block">Email Address</label>
                      <Input type="email" placeholder="john@company.com" />
                    </div>
                    
                    <div>
                      <label className="brand-body text-sm font-medium mb-2 block">Company</label>
                      <Input placeholder="Your Company Name" />
                    </div>
                    
                    <div>
                      <label className="brand-body text-sm font-medium mb-2 block">Role</label>
                      <Input placeholder="CEO, Marketing Manager, etc." />
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-6">
                    <Button className="brand-btn-primary">Save Changes</Button>
                  </div>
                </Card>
                
                <Card className="p-6">
                  <div className="flex items-center space-x-2 mb-6">
                    <Shield className="w-5 h-5 text-brand-accent" />
                    <h2 className="brand-heading text-lg">Security</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                      Change Password
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Enable Two-Factor Authentication
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                      Delete Account
                    </Button>
                  </div>
                </Card>
              </TabsContent>
              
              {/* Integrations Tab */}
              <TabsContent value="integrations" className="space-y-6">
                <Card className="p-6">
                  <div className="flex items-center space-x-2 mb-6">
                    <Database className="w-5 h-5 text-brand-success" />
                    <h2 className="brand-heading text-lg">Data Integrations</h2>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Notion Integration */}
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-sm">N</span>
                        </div>
                        <div>
                          <h3 className="brand-subheading">Notion</h3>
                          <p className="brand-body text-xs text-brand-secondary">
                            Sync audit results to your Notion database
                          </p>
                          {integrationStatus.notion.connected && (
                            <p className="brand-body text-xs text-green-600">
                              Last sync: {integrationStatus.notion.lastSync}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {integrationStatus.notion.connected ? (
                          <>
                            <Badge className="bg-green-100 text-green-800">
                              <Check className="w-3 h-3 mr-1" />
                              Connected
                            </Badge>
                            <Button variant="outline" size="sm">Configure</Button>
                            <Button variant="ghost" size="sm" className="text-red-600">
                              Disconnect
                            </Button>
                          </>
                        ) : (
                          <Button className="brand-btn-primary" size="sm">Connect</Button>
                        )}
                      </div>
                    </div>
                    
                    {/* Airtable Integration */}
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-brand-accent rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-sm">A</span>
                        </div>
                        <div>
                          <h3 className="brand-subheading">Airtable</h3>
                          <p className="brand-body text-xs text-brand-secondary">
                            Store competitor data in Airtable base
                          </p>
                          {integrationStatus.airtable.connected && (
                            <p className="brand-body text-xs text-green-600">
                              Last sync: {integrationStatus.airtable.lastSync}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {integrationStatus.airtable.connected ? (
                          <>
                            <Badge className="bg-green-100 text-green-800">
                              <Check className="w-3 h-3 mr-1" />
                              Connected
                            </Badge>
                            <Button variant="outline" size="sm">Configure</Button>
                            <Button variant="ghost" size="sm" className="text-red-600">
                              Disconnect
                            </Button>
                          </>
                        ) : (
                          <Button className="brand-btn-primary" size="sm">Connect</Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
                
                <Card className="p-6">
                  <div className="flex items-center space-x-2 mb-6">
                    <Key className="w-5 h-5 text-brand-primary" />
                    <h2 className="brand-heading text-lg">AI API Keys</h2>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Claude API */}
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-brand-primary rounded-lg flex items-center justify-center">
                          <Zap className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="brand-subheading">Claude API</h3>
                          <p className="brand-body text-xs text-brand-secondary">
                            Generate deliverables and content analysis
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {integrationStatus.claude.connected ? (
                          <Badge className="bg-green-100 text-green-800">Connected</Badge>
                        ) : (
                          <Badge variant="secondary">Not Connected</Badge>
                        )}
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                    </div>
                    
                    {/* OpenAI API */}
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-sm">AI</span>
                        </div>
                        <div>
                          <h3 className="brand-subheading">OpenAI API</h3>
                          <p className="brand-body text-xs text-brand-secondary">
                            Alternative AI processing and content generation
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {integrationStatus.openai.connected ? (
                          <Badge className="bg-green-100 text-green-800">Connected</Badge>
                        ) : (
                          <Badge variant="secondary">Not Connected</Badge>
                        )}
                        <Button variant="outline" size="sm">Configure</Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>
              
              {/* Billing Tab */}
              <TabsContent value="billing" className="space-y-6">
                <Card className="p-6">
                  <div className="flex items-center space-x-2 mb-6">
                    <CreditCard className="w-5 h-5 text-brand-accent" />
                    <h2 className="brand-heading text-lg">Current Plan</h2>
                  </div>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="brand-subheading text-xl">Pro Plan</h3>
                      <p className="brand-body text-brand-secondary">$49/month • Billed monthly</p>
                    </div>
                    <Badge className="bg-brand-success text-white px-3 py-1">Active</Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 bg-brand-light rounded-lg">
                      <div className="brand-heading text-2xl text-brand-primary">1,000</div>
                      <div className="brand-body text-xs text-brand-secondary">Analyses per month</div>
                    </div>
                    <div className="text-center p-4 bg-brand-light rounded-lg">
                      <div className="brand-heading text-2xl text-brand-primary">247</div>
                      <div className="brand-body text-xs text-brand-secondary">Used this month</div>
                    </div>
                    <div className="text-center p-4 bg-brand-light rounded-lg">
                      <div className="brand-heading text-2xl text-brand-success">753</div>
                      <div className="brand-body text-xs text-brand-secondary">Remaining</div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4">
                    <Button variant="outline">Change Plan</Button>
                    <Button variant="outline">View Usage</Button>
                    <Button variant="ghost" className="text-red-600">Cancel Subscription</Button>
                  </div>
                </Card>
                
                <Card className="p-6">
                  <h2 className="brand-heading text-lg mb-4">Payment Method</h2>
                  <div className="flex items-center justify-between p-4 border rounded-lg mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-brand-primary rounded-lg flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="brand-body font-medium">•••• •••• •••• 4242</p>
                        <p className="brand-body text-xs text-brand-secondary">Expires 12/25</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Update</Button>
                  </div>
                  
                  <div className="flex space-x-4">
                    <Button variant="outline">Add Payment Method</Button>
                    <Button variant="outline">Billing History</Button>
                  </div>
                </Card>
              </TabsContent>
              
              {/* Notifications Tab */}
              <TabsContent value="notifications" className="space-y-6">
                <Card className="p-6">
                  <div className="flex items-center space-x-2 mb-6">
                    <Bell className="w-5 h-5 text-brand-accent" />
                    <h2 className="brand-heading text-lg">Notification Preferences</h2>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="brand-subheading">Email Reports</h3>
                        <p className="brand-body text-sm text-brand-secondary">
                          Weekly summary of your analysis results
                        </p>
                      </div>
                      <Switch
                        checked={notificationSettings.emailReports}
                        onCheckedChange={(value) => handleNotificationChange('emailReports', value)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="brand-subheading">Opportunity Alerts</h3>
                        <p className="brand-body text-sm text-brand-secondary">
                          Instant notifications for high-scoring opportunities
                        </p>
                      </div>
                      <Switch
                        checked={notificationSettings.opportunityAlerts}
                        onCheckedChange={(value) => handleNotificationChange('opportunityAlerts', value)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="brand-subheading">Weekly Digest</h3>
                        <p className="brand-body text-sm text-brand-secondary">
                          Market trends and competitor updates
                        </p>
                      </div>
                      <Switch
                        checked={notificationSettings.weeklyDigest}
                        onCheckedChange={(value) => handleNotificationChange('weeklyDigest', value)}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="brand-subheading">Product Updates</h3>
                        <p className="brand-body text-sm text-brand-secondary">
                          New features and platform announcements
                        </p>
                      </div>
                      <Switch
                        checked={notificationSettings.marketingUpdates}
                        onCheckedChange={(value) => handleNotificationChange('marketingUpdates', value)}
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end mt-6">
                    <Button className="brand-btn-primary">Save Preferences</Button>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>

          </div>
        </main>
      </div>
    </div>
  );
}