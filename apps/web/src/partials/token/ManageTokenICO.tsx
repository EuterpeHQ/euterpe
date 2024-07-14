"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import Spacer from "@/components/ui/spacer";
import Balancer from "react-wrap-balancer";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export default function ManageTokenICO() {
  return (
    <div className="w-full bg-surfaceVariant p-6">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold">Launch an ICO</h2>

        <Badge variant="outline">Beta</Badge>
      </div>
      <p className="max-w-xl text-sm text-muted-foreground">
        <Balancer>
          Set up an Initial Coin Offering for your token. You can use this
          feature to set up an initial coin offering for your token.
        </Balancer>
      </p>
      <Spacer size={24} />
      <ICOForm />
    </div>
  );
}
function ICOForm() {
  const FormSchema = z.object({
    deposit: z.string({ required_error: "A deposit amount is required." }),
    date: z.date({
      required_error: "A date of birth is required.",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="deposit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deposit</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  className={cn(
                    "w-full",
                    !field.value && "text-muted-foreground",
                  )}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                The amount of tokens you want to deposit into your ICO
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="mb-1">Launch Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      size="sm"
                      variant={"outline"}
                      className={cn(
                        "w-48 pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Your ICO will be launched on this date
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
}
