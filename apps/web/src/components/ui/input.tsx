import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          `font-aeonik flex h-10 w-full rounded border-0 bg-[#212121] px-3 py-2 text-xs text-black opacity-80 shadow-input transition file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[0.688rem] placeholder:text-[#797979] focus-visible:outline-none focus-visible:ring-[2px] focus-visible:ring-neutral-400 disabled:cursor-not-allowed disabled:opacity-50 group-hover/input:shadow-none dark:text-white dark:shadow-[0px_0px_1px_0.8px_#606060] dark:focus-visible:ring-neutral-600`,
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
