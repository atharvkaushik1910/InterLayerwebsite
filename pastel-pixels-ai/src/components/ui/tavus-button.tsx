import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import clickSound from "@/assets/sounds/keyboard-click.wav";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-sans font-medium uppercase tracking-wider text-sm transition-all duration-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]",
  {
    variants: {
      variant: {
        coral: "bg-coral text-foreground border-2 border-foreground shadow-button hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[4px] active:translate-y-[4px]",
        outline: "bg-card text-foreground border-2 border-foreground shadow-button hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[4px] active:translate-y-[4px]",
        ghost: "text-foreground hover:bg-muted border-2 border-transparent hover:scale-[0.98]",
        nav: "text-foreground hover:text-coral font-medium normal-case tracking-normal hover:translate-y-[1px]",
        green: "bg-live-green text-foreground border-2 border-foreground shadow-button hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] active:translate-x-[4px] active:translate-y-[4px]",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "coral",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> { }

const TavusButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, onMouseEnter, ...props }, ref) => {
    const audioRef = React.useRef<HTMLAudioElement | null>(null);

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => { }); // Ignore autoplay errors
      }
      onMouseEnter?.(e);
    };

    return (
      <>
        <audio ref={audioRef} src={clickSound} preload="auto" />
        <button
          className={cn(buttonVariants({ variant, size, className }))}
          ref={ref}
          onMouseEnter={handleMouseEnter}
          {...props}
        />
      </>
    );
  }
);
TavusButton.displayName = "InterLayerButton";

export { TavusButton, buttonVariants };
