import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Balancer from "react-wrap-balancer";

interface SelectUserModeOptionProps {
  alt: string;
  text: String;
  image: any;
}

function SelectUserModeOption({
  className,
  alt,
  text,
  image,
  ...props
}: React.ComponentPropsWithoutRef<typeof Card> & SelectUserModeOptionProps) {
  return (
    <Card
      onClick={props.onClick}
      className={cn(
        "group flex h-[230px] w-[230px] cursor-pointer flex-col justify-between overflow-hidden border border-primary/20 bg-black/15 outline-none transition-all duration-200  md:hover:bg-primary/10 md:hover:outline md:hover:outline-offset-2 md:hover:outline-primary/20",
        className,
      )}
    >
      <CardContent className="relative flex items-center justify-center p-0 md:p-4">
        <Avatar className=" h-24 w-24 rounded-none md:rounded-full">
          <AvatarImage
            className="mt-2 h-full w-full rounded-full"
            src={image}
            alt={alt}
          />
          <AvatarFallback className="relative bg-black/5">
            <svg
              className="absolute left-1/2 h-full w-full -translate-x-1/2 text-black/20"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              ></path>
            </svg>
          </AvatarFallback>
        </Avatar>
      </CardContent>
      <CardHeader className="p-4 text-sm md:p-0 md:pb-4 md:text-center">
        <CardTitle className="text-base text-primary">{alt}</CardTitle>
        <CardDescription className="text-sm font-light text-muted-foreground">
          <span>
            <Balancer>{text}</Balancer>
          </span>
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-col items-start justify-end md:hidden">
        <div className="mb-4 h-px w-full bg-primary/20" />
      </CardFooter>
    </Card>
  );
}

export default SelectUserModeOption;
