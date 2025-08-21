import { cn } from "@/lib/utils";

interface ZzzAnimationProps {
  /** Number of Z's to display (1-4) */
  count?: number;
  /** Size variant */
  size?: "small" | "medium" | "large";
  /** Custom className */
  className?: string;
  /** Show only when condition is met */
  show?: boolean;
  /** Custom emoji/character to float */
  character?: string;
}

export function ZzzAnimation({ 
  count = 3, 
  size = "medium", 
  className,
  show = true,
  character = "💤"
}: ZzzAnimationProps) {
  if (!show) return null;

  const getSizeClass = (size: string) => {
    switch (size) {
      case "small": return "zzz-small";
      case "large": return "zzz-large";
      default: return "zzz";
    }
  };

  const zCount = Math.min(Math.max(1, count), 4);

  return (
    <div className={cn("relative inline-flex items-center space-x-1", className)}>
      {Array.from({ length: zCount }).map((_, index) => (
        <span 
          key={index}
          className={cn(getSizeClass(size), "text-brand-primary")}
          style={{ 
            animationDelay: `${index * 0.5}s`,
            position: 'relative',
            zIndex: zCount - index
          }}
        >
          {character}
        </span>
      ))}
    </div>
  );
}

interface BoringOpportunityAlertProps {
  /** Opportunity score (0-100) */
  score: number;
  /** Show alert when score is above this threshold */
  threshold?: number;
  /** Custom message */
  message?: string;
  /** Additional className */
  className?: string;
}

export function BoringOpportunityAlert({ 
  score, 
  threshold = 75, 
  message,
  className 
}: BoringOpportunityAlertProps) {
  const isHighOpportunity = score >= threshold;
  
  if (!isHighOpportunity) return null;

  const getOpportunityMessage = (score: number) => {
    if (score >= 90) return "This is SO boring... 💰 GOLDMINE DETECTED!";
    if (score >= 85) return "Perfect level of boring 🎯 High opportunity!";
    if (score >= 75) return "Nicely boring 😴 Good opportunity found!";
    return "Somewhat boring 💤 Worth investigating...";
  };

  return (
    <div className={cn(
      "brand-success-highlight flex items-center space-x-3 p-4 rounded-lg",
      className
    )}>
      <ZzzAnimation 
        count={score >= 90 ? 4 : score >= 85 ? 3 : 2}
        size={score >= 90 ? "large" : score >= 85 ? "medium" : "small"}
        show={true}
      />
      <div className="flex-1">
        <div className="font-accent text-brand-success font-semibold">
          {message || getOpportunityMessage(score)}
        </div>
        <div className="text-sm text-brand-secondary mt-1">
          Opportunity Score: {score}/100
        </div>
      </div>
    </div>
  );
}

interface LoadingWithZzzProps {
  /** Loading message */
  message?: string;
  /** Show ZZZ animation during loading */
  showZzz?: boolean;
  /** Custom className */
  className?: string;
}

export function LoadingWithZzz({ 
  message = "Analyzing boring-ness levels...",
  showZzz = true,
  className 
}: LoadingWithZzzProps) {
  return (
    <div className={cn("flex items-center justify-center space-x-3 p-6", className)}>
      <div className="animate-spin rounded-full h-6 w-6 border-2 border-brand-primary border-t-transparent"></div>
      <div className="font-body text-brand-dark">
        {message}
      </div>
      {showZzz && (
        <ZzzAnimation 
          count={2}
          size="small"
          character="😴"
        />
      )}
    </div>
  );
}