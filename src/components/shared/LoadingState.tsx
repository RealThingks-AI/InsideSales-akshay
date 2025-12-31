import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface LoadingStateProps {
  variant?: "spinner" | "skeleton" | "page";
  message?: string;
  className?: string;
  rows?: number;
  columns?: number;
}

export const LoadingState = ({
  variant = "spinner",
  message = "Loading...",
  className,
  rows = 5,
  columns = 6,
}: LoadingStateProps) => {
  if (variant === "page") {
    return (
      <div className={cn("flex items-center justify-center h-64", className)}>
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground text-sm">{message}</p>
        </div>
      </div>
    );
  }

  if (variant === "skeleton") {
    return (
      <div className={cn("w-full", className)}>
        {/* Header */}
        <div className="flex gap-4 p-3 border-b bg-muted/30">
          {Array.from({ length: columns }).map((_, i) => (
            <Skeleton 
              key={`header-${i}`} 
              className="h-4 flex-1" 
              style={{ maxWidth: i === 0 ? 40 : undefined }}
            />
          ))}
        </div>
        
        {/* Rows */}
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div 
            key={`row-${rowIndex}`} 
            className="flex gap-4 p-3 border-b"
            style={{ animationDelay: `${rowIndex * 100}ms` }}
          >
            {Array.from({ length: columns }).map((_, colIndex) => (
              <Skeleton 
                key={`cell-${rowIndex}-${colIndex}`} 
                className="h-4 flex-1"
                style={{ maxWidth: colIndex === 0 ? 40 : undefined }}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }

  // Default spinner variant
  return (
    <div className={cn("flex items-center justify-center py-8", className)}>
      <Loader2 className="h-6 w-6 animate-spin text-primary" />
      {message && <span className="ml-2 text-muted-foreground text-sm">{message}</span>}
    </div>
  );
};
