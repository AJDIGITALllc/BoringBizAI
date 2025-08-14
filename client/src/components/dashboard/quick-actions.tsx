import { Button } from "@/components/ui/button";
import { Search, BarChart3, Upload, Settings } from "lucide-react";

export function QuickActions() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-bold text-ink">Quick Actions</h3>
        <p className="text-gray-600 mt-1">Common tasks and shortcuts</p>
      </div>
      <div className="p-6 space-y-4">
        <Button className="w-full bg-gradient-to-r from-primary to-emerald-600 hover:from-primary/90 hover:to-emerald-600/90 text-white p-4 font-semibold">
          <Search className="w-4 h-4 mr-2" />
          Find New Leads
        </Button>
        <Button className="w-full border-2 border-accent text-accent hover:bg-accent hover:text-white p-4 font-semibold">
          <BarChart3 className="w-4 h-4 mr-2" />
          Generate Report
        </Button>
        <Button className="w-full border-2 border-highlight text-highlight hover:bg-highlight hover:text-white p-4 font-semibold">
          <Upload className="w-4 h-4 mr-2" />
          Bulk Upload URLs
        </Button>
        <Button variant="outline" className="w-full p-4 font-semibold">
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
      </div>
    </div>
  );
}
