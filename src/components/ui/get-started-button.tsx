import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import * as React from "react";

export interface GetStartedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export const GetStartedButton = React.forwardRef<HTMLButtonElement, GetStartedButtonProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={`group/btn relative overflow-hidden pr-12 ${className || ""}`}
        size="lg"
        {...props}
      >
        <span className="transition-opacity duration-500 group-hover/btn:opacity-0">
          {children || "Get Started"}
        </span>
        <i className="absolute right-1 top-1 bottom-1 rounded-sm z-10 grid w-10 place-items-center transition-all duration-500 bg-primary-foreground/15 group-hover/btn:w-[calc(100%-0.5rem)] group-active:scale-95 text-black-500">
          <ChevronRight size={16} strokeWidth={2} aria-hidden="true" />
        </i>
      </Button>
    );
  }
);

GetStartedButton.displayName = "GetStartedButton";
