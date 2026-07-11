import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-bold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 rounded-[2rem_1rem_2rem_1rem] hover:rounded-[1rem_2rem_1rem_2rem]",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-[2rem_1rem_2rem_1rem]",
        outline: "border-2 border-foreground bg-transparent text-foreground hover:bg-foreground/10 rounded-[1.5rem_2rem_1.5rem_2rem] hover:rounded-[2rem_1.5rem_2rem_1.5rem]",
        outlineLight: "border-2 border-card bg-transparent text-card hover:bg-card/10 rounded-[1.5rem_2rem_1.5rem_2rem] hover:rounded-[2rem_1.5rem_2rem_1.5rem]",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-[2rem_1.2rem_2rem_1.2rem] hover:rounded-[1.2rem_2rem_1.2rem_2rem]",
        ghost: "hover:bg-accent/10 hover:text-accent-foreground rounded-xl",
        link: "text-primary underline-offset-4 hover:underline",
        accent: "bg-accent text-accent-foreground hover:bg-accent/90 rounded-[1.8rem_2.2rem_1.8rem_2.2rem] hover:rounded-[2.2rem_1.8rem_2.2rem_1.8rem]",
        hero: "bg-primary text-primary-foreground hover:bg-primary/90 rounded-[2.5rem_1rem_2.5rem_1rem] hover:rounded-[1rem_2.5rem_1rem_2.5rem] font-display uppercase tracking-wider",
        heroOutline: "border-2 border-card bg-transparent text-card hover:bg-card/10 rounded-[2.5rem_1rem_2.5rem_1rem] hover:rounded-[1rem_2.5rem_1rem_2.5rem] font-display uppercase tracking-wider",
      },
      size: {
        default: "h-12 px-6 py-2",
        sm: "h-9 px-4",
        lg: "h-14 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
