import type { StepLockKeywords } from "@/types/audit";

interface StepLockAnalysisProps {
  keywords: StepLockKeywords;
}

export function StepLockAnalysis({ keywords }: StepLockAnalysisProps) {
  const categories = [
    {
      name: "Emergency (High Priority)",
      icon: "❗",
      color: "red",
      keywords: keywords.emergency,
      bgColor: "bg-red-50",
      borderColor: "border-red-400",
      iconBg: "bg-red-500",
      textColor: "text-red-800",
      tagBg: "bg-red-100",
      tagText: "text-red-800",
    },
    {
      name: "Service",
      icon: "🔧",
      color: "blue",
      keywords: keywords.service,
      bgColor: "bg-blue-50",
      borderColor: "border-blue-400",
      iconBg: "bg-blue-500",
      textColor: "text-blue-800",
      tagBg: "bg-blue-100",
      tagText: "text-blue-800",
    },
    {
      name: "Local",
      icon: "📍",
      color: "green",
      keywords: keywords.local,
      bgColor: "bg-green-50",
      borderColor: "border-green-400",
      iconBg: "bg-green-500",
      textColor: "text-green-800",
      tagBg: "bg-green-100",
      tagText: "text-green-800",
    },
    {
      name: "Problem",
      icon: "❓",
      color: "yellow",
      keywords: keywords.problem,
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-400",
      iconBg: "bg-yellow-500",
      textColor: "text-yellow-800",
      tagBg: "bg-yellow-100",
      tagText: "text-yellow-800",
    },
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-6 border-b border-gray-100">
        <h3 className="text-lg font-bold text-ink">StepLock Keyword Analysis</h3>
        <p className="text-gray-600 mt-1">Content categorized by intent priority</p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {categories.map((category) => (
            <div
              key={category.name}
              className={`${category.bgColor} border-l-4 ${category.borderColor} rounded-lg p-4`}
            >
              <div className="flex items-center mb-3">
                <div className={`w-8 h-8 ${category.iconBg} rounded-full flex items-center justify-center mr-3`}>
                  <span className="text-white text-sm">{category.icon}</span>
                </div>
                <h4 className={`font-semibold ${category.textColor}`}>{category.name}</h4>
              </div>
              <div className="space-y-2">
                {category.keywords.length > 0 ? (
                  category.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className={`inline-block ${category.tagBg} ${category.tagText} px-3 py-1 rounded-full text-sm mr-2 mb-1`}
                    >
                      {keyword}
                    </span>
                  ))
                ) : (
                  <span className="text-sm text-gray-500 italic">No keywords found</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
