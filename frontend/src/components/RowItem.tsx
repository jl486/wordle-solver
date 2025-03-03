import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const rowItemVariants = cva(
  "inline-flex items-center justify-center w-14 h-14 border-2 border-solid border-gray-light m-[2.5px] font-bold text-center uppercase text-3xl",
  {
    variants: {
      variant: {
        default: "bg-background-light dark:bg-background-dark border-border-light dark:border-border-dark",
        current: "bg-background-light dark:bg-background-dark border-border-current-light dark:border-border-current-dark",
        gray: "bg-gray-light dark:bg-gray-dark border-gray-light dark:border-gray-dark text-white",
        yellow: "bg-yellow-light dark:bg-yellow-dark border-yellow-light dark:border-yellow-dark text-white",
        green: "bg-green-light dark:bg-green-dark border-green-light dark:border-green-dark text-white"
      }
    }
  }
);

interface RowItemProps extends VariantProps<typeof rowItemVariants> {
  className?: string;
  children?: string;
}

export function RowItem({ className, variant, children, ...props }: RowItemProps) {
  return (
    <div
      className={twMerge(clsx(rowItemVariants({ variant }), className))}
      {...props}
    >
      {children}
    </div>
  );
}
