"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { type VariantProps, cva } from "class-variance-authority";
import { motion, AnimatePresence } from "framer-motion";

import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsListVariants = cva("inline-flex items-center justify-center", {
  variants: {
    variant: {
      default: "rounded-lg bg-muted p-1 text-muted-foreground",
      underline:
        "border-b border-muted rounded-none bg-background gap-2 p-0 justify-start",
      chips: "rounded-lg bg-muted p-1 text-muted-foreground gap-4",
    },
    width: {
      full: "w-full",
      fit: "w-fit",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const TabsTriggerVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-normal transition-all disabled:pointer-events-none data-[state=active]:text-foreground px-3",
  {
    variants: {
      variant: {
        default:
          "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
        underline:
          "border-b-2 border-transparent focus:border-primary ring-0 outline-none shadow-none data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary disabled:opacity-100 data-[state=active]:shadow-none rounded-none m-0 pt-1.5 pb-2 hover:bg-background-muted transition-all duration-100",
        chips:
          "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-secondary data-[state=active]:text-foreground data-[state=active]:border border border-input  data-[state=active]:border-primary",
      },
      width: {
        full: "w-full",
        fit: "w-fit",
      },
    },
    defaultVariants: {
      variant: "default",
      width: "full",
    },
  },
);

export interface TabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
    VariantProps<typeof TabsListVariants> {
  asChild?: boolean;
}

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> &
    VariantProps<typeof TabsListVariants>
>(({ className, variant, width, asChild = false, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(TabsListVariants({ variant, width, className }))}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

export interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>,
    VariantProps<typeof TabsTriggerVariants> {
  asChild?: boolean;
}

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> &
    VariantProps<typeof TabsTriggerVariants>
>(({ className, variant, width, asChild = false, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(TabsTriggerVariants({ variant, width, className }))}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <AnimatePresence>
    <motion.div
      key={props.value}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.05, type: "tween", ease: "easeInOut" }}
    >
      <TabsPrimitive.Content
        ref={ref}
        className={cn(
          "mt-5 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          className,
        )}
        {...props}
      />
    </motion.div>
  </AnimatePresence>
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
