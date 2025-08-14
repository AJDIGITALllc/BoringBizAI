import { Menu, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="ml-4 lg:ml-0 text-2xl font-semibold text-ink">Dashboard</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button className="bg-gradient-to-r from-accent to-red-500 hover:from-accent/90 hover:to-red-500/90 text-white font-medium">
            Upgrade
          </Button>
        </div>
      </div>
    </header>
  );
}
