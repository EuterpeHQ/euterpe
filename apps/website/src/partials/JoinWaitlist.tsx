"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import JoinWaitlistButton from "@/components/animata/button/join-waitlist-button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { CgSpinner } from "react-icons/cg";
import Image from "next/image";
import TopologyImage from "@/assets/images/topology-1.svg";
import Balancer from "react-wrap-balancer";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "usehooks-ts";

export default function JoinWaitlist({
  open,
  setOpen,
}: {
  open?: boolean;
  setOpen?: (open: boolean) => void;
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <>
      <DesktopWaitlist open={open} onOpenChange={setOpen} />
      <MobileWaitlist open={isDesktop ? false : open} onOpenChange={setOpen} />
    </>
  );
}

function DesktopWaitlist({
  open,
  onOpenChange,
}: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          className="fixed inset-0 z-50 hidden h-full w-full items-center justify-center bg-black/80 md:flex"
        >
          <div className="relative hidden w-[32rem] flex-col items-center justify-center gap-8 overflow-hidden rounded-[40px] rounded-lg border border-[#313131] bg-black/90 p-8 shadow-xl md:flex">
            <div
              className="absolute inset-0 h-full w-full bg-black/90 bg-center opacity-[0.07]"
              style={{
                backgroundImage: `url(${TopologyImage.src})`,
              }}
            />
            <div className="z-10 flex flex-col items-center gap-8">
              <h1 className="text-center font-aeonik text-[3.25rem]/[3rem] font-semibold tracking-[-0.06rem]">
                <Balancer>Want to know when we launch?</Balancer>
              </h1>
              <p className="text-center text-xs font-light tracking-[-0.04rem] text-[#A5A5A5]">
                <Balancer>
                  Be the first to discover and support your faves. <br /> First
                  100 waitlisters get early access and insider updates
                </Balancer>
              </p>
              <SubscribeForm />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MobileWaitlist({
  open,
  onOpenChange,
}: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  return (
    <div className="block md:hidden">
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="block md:hidden">
          <div className="relative flex w-full flex-col items-center justify-center gap-8 overflow-hidden rounded-[40px] rounded-lg bg-black/90 p-8 shadow-xl">
            <div
              className="absolute inset-0 h-full w-full bg-black/90 bg-center opacity-[0.07]"
              style={{
                backgroundImage: `url(${TopologyImage.src})`,
              }}
            />
            <div className="z-10 flex flex-col items-center gap-8">
              <h1 className="text-center font-aeonik text-[2.75rem]/[2.5rem] font-semibold tracking-[-0.06rem]">
                <Balancer>Want to know when we launch?</Balancer>
              </h1>
              <p className="text-center text-xs font-light tracking-[-0.04rem] text-[#A5A5A5]">
                <Balancer>
                  Be the first to discover and support your faves. First 100
                  waitlisters get early access and insider updates
                </Balancer>
              </p>
              <SubscribeForm />
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

function SubscribeForm() {
  const FormSchema = z.object({
    email: z.string().email(),
  });
  const [isShaking, setIsShaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  const { errors } = form.formState;

  useEffect(() => {
    if (errors.email) {
      setIsShaking(true);
    }
  }, [errors]);

  function handleAnimationEnd() {
    setTimeout(() => setIsShaking(false), 200);
  }

  function onSubmit(data: z.infer<typeof FormSchema>) {
    if (errors.email) {
      setIsShaking(true);
    } else {
      console.log(JSON.stringify(data));
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        console.log("success");
      }, 3000);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full max-w-full flex-col items-center justify-center"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  className={cn(
                    "border-cream/60 text-cream/90 placeholder:text-cream/40 border-l-transparent border-r-transparent border-t-transparent focus-visible:ring-transparent",
                    {
                      "animate-shake": isShaking,
                    },
                  )}
                  placeholder="Email"
                  {...field}
                  onAnimationEnd={handleAnimationEnd}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <JoinWaitlistButton isLoading={isLoading} />
      </form>
    </Form>
  );
}
