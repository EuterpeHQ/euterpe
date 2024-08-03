import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { UserData } from "./chat-types";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

interface ChatTopbarProps {
  selectedUser: UserData;
}

export const TopbarIcons = [{ icon: Info }];

export default function ChatTopbar({ selectedUser }: ChatTopbarProps) {
  return (
    <div className="flex h-20 w-full items-center justify-between border-b-[0.5px] p-4">
      <div className="flex items-center gap-2">
        <div className="h-full rounded-full border border-primary bg-transparent p-0.5">
          <Avatar className="flex items-center justify-center">
            <AvatarImage
              src="/images/plumes.webp"
              alt="avatar"
              width={6}
              height={6}
              className="h-10 w-10 object-cover object-top"
            />
          </Avatar>
        </div>

        <div className="flex flex-col">
          <span className="font-medium text-muted-foreground">
            {selectedUser.name}
          </span>
          <span className="text-[0.688rem] text-muted-foreground">
            You can talk to me about anything music
          </span>
        </div>
      </div>

      <div>
        <TooltipProvider>
          <Tooltip>
            {/* <Button>
                <Info size={20} className="text-muted-foreground" />
              </Button> */}
            <Button
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "w-9 p-2.5",
                "dark:bg-surface dark:text-muted-foreground dark:hover:text-white",
              )}
              asChild
            >
              <TooltipTrigger>
                <Info size={20} className="text-muted-foreground" />
              </TooltipTrigger>
            </Button>
            <TooltipContent>
              <p className="text-xs">
                Plumes is still under development,
                <br /> and may sometimes forget to reply
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
