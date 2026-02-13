import * as React from "react";
import { cn } from "@/lib/utils";

interface WindowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  indicator?: "coral" | "green" | "amber";
  children: React.ReactNode;
}

const WindowCard = React.forwardRef<HTMLDivElement, WindowCardProps>(
  ({ className, title, indicator = "coral", children, ...props }, ref) => {
    const indicatorClass = {
      coral: "bg-coral",
      green: "bg-live-green",
      amber: "bg-amber",
    }[indicator];

    return (
      <div
        ref={ref}
        className={cn("window-chrome", className)}
        {...props}
      >
        {title && (
          <div className="window-title-bar">
            <div className={cn("window-indicator", indicatorClass)} />
            <span className="text-foreground">{title}</span>
          </div>
        )}
        <div className="relative">
          {children}
        </div>
      </div>
    );
  }
);
WindowCard.displayName = "WindowCard";

export { WindowCard };
