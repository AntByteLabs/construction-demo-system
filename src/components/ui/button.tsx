import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange disabled:opacity-50 disabled:pointer-events-none select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-ink text-white hover:bg-ink-soft",
        dark:
          "bg-ink text-white hover:bg-ink-soft",
        orange:
          "bg-orange text-white hover:bg-orange-dark",
        amber:
          "bg-orange text-white hover:bg-orange-dark",
        outline:
          "border border-ink/20 text-ink bg-transparent hover:bg-ink hover:text-white hover:border-ink",
        outlineLight:
          "border border-white/30 text-white bg-transparent hover:bg-white hover:text-ink hover:border-white",
        ghost: "text-ink hover:bg-stone",
        white:
          "bg-white text-ink hover:bg-cream border border-ink/10",
        link: "text-orange-dark underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-sm rounded-md",
        md: "h-11 px-5 text-sm rounded-md",
        lg: "h-12 px-6 text-[15px] rounded-md",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, href, children, ...props }, ref) => {
    const classes = cn(buttonVariants({ variant, size }), className);
    if (href) {
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      );
    }
    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { buttonVariants };
