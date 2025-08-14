import { Button } from "@/components/ui/button";

const mockCompetitors = [
  {
    name: "Charlotte Diesel Pros",
    url: "charlotte-diesel.com",
    icon: "🚛",
    score: 87,
    scoreColor: "bg-primary/10 text-primary",
  },
  {
    name: "Quick Fix HVAC",
    url: "quickfixhvac.com",
    icon: "🔧",
    score: 92,
    scoreColor: "bg-accent/10 text-accent",
  },
  {
    name: "Home Repair Express",
    url: "homerepairexpress.com",
    icon: "🏠",
    score: 78,
    scoreColor: "bg-highlight/10 text-highlight",
  },
];

export function CompetitorHotlist() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-ink">Competitor Hotlist</h3>
            <p className="text-gray-600 mt-1">Recently analyzed competitors</p>
          </div>
          <Button variant="ghost" className="text-primary hover:text-primary/80 font-medium text-sm">
            View All
          </Button>
        </div>
      </div>
      <div className="divide-y divide-gray-100">
        {mockCompetitors.map((competitor, index) => (
          <div key={index} className="p-4 hover:bg-gray-50 transition-colors duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-blue-600 text-lg">{competitor.icon}</span>
                </div>
                <div>
                  <p className="font-medium text-ink">{competitor.name}</p>
                  <p className="text-sm text-gray-500">{competitor.url}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${competitor.scoreColor}`}>
                  Score: {competitor.score}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
