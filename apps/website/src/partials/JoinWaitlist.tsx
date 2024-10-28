"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import JoinWaitlistButton from "@/components/animata/button/join-waitlist-button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import TopologyImage from "@/assets/images/topology-1.svg";
import Balancer from "react-wrap-balancer";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { useMediaQuery } from "usehooks-ts";
import { RxCross2 } from "react-icons/rx";
import Link from "next/link";
import { FaXTwitter } from "react-icons/fa6";
import { useFormspark } from "@formspark/use-formspark";

const FORMSPARK_FORM_ID = "x4K2BPMRB";

export default function JoinWaitlist({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <>
      <DesktopWaitlist open={open} setOpen={setOpen} />
      <MobileWaitlist open={isDesktop ? false : open} setOpen={setOpen} />
    </>
  );
}

function DesktopWaitlist({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const modal = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickHandler = ({ target }: { target: any }) => {
      if (!modal.current) return;
      if (!open || modal.current.contains(target)) return;
      setOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  useEffect(() => {
    const keyHandler = (event: KeyboardEvent) => {
      if (!open || event.key !== "Escape") return;
      setOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

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
          <div
            ref={modal}
            className="relative hidden w-[32rem] flex-col items-center justify-center gap-8 overflow-hidden rounded-[40px] rounded-lg border border-[#313131] bg-black/90 p-8 shadow-xl md:flex"
          >
            <div
              className="absolute inset-0 h-full w-full bg-black/90 bg-center opacity-[0.07]"
              style={{
                backgroundImage: `url(${TopologyImage.src})`,
              }}
            />
            <div className="reddit z-10 flex flex-col items-center gap-8">
              <RxCross2
                className="absolute right-5 top-5 h-6 w-6 cursor-pointer text-[#A5A5A5]"
                onClick={() => setOpen(false)}
              />
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
              <div className="-mt-8 flex gap-1 text-center font-pulp text-[0.813rem] font-light tracking-[-0.04rem] text-[#A5A5A5]">
                Follow
                <Link
                  href="https://x.com/euterpehq/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline hover:underline-offset-2"
                >
                  @euterpehq{" "}
                </Link>
                on <FaXTwitter className="h-4 w-4" />
                for the latest updates
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function MobileWaitlist({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <div className="block md:hidden">
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="flex md:hidden">
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
              <div className="-mt-8 flex gap-1 text-center font-pulp text-[0.813rem] font-light tracking-[-0.04rem] text-[#A5A5A5]">
                Follow
                <Link
                  href="https://x.com/euterpehq/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline hover:underline-offset-2"
                >
                  @euterpehq{" "}
                </Link>
                on <FaXTwitter className="h-4 w-4" />
                for the latest updates
              </div>
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
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });
  const [submit, submitting] = useFormspark({
    formId: FORMSPARK_FORM_ID,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { errors } = form.formState;

  useEffect(() => {
    if (errors.email) {
      setIsShaking(true);
    }
  }, [errors]);

  function handleAnimationEnd() {
    setTimeout(() => setIsShaking(false), 200);
  }

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (errors.email) {
      setIsShaking(true);
    } else {
      setIsSubmitted(false);
      await submit({ email: data.email });
      setIsSubmitted(true);
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
        <JoinWaitlistButton
          isSubmitting={submitting}
          isSubmitted={isSubmitted}
        />
      </form>
    </Form>
  );
}
