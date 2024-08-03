import { FileImage, Paperclip, SendHorizontal, ThumbsUp } from "lucide-react";
import Link from "next/link";
import React, { useRef, useState } from "react";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Message, LoggedInUserData } from "./chat-types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const loggedInUserData: LoggedInUserData = {
  id: 2,
  avatar: "https://i.pravatar.cc/300?img=31",
  name: "Euterpe User",
};

interface ChatBottombarProps {
  sendMessage: (newMessage: Message) => void;
  isMobile: boolean;
}

export const BottombarIcons = [{ icon: FileImage }, { icon: Paperclip }];

export default function ChatBottombar({
  sendMessage,
  isMobile,
}: ChatBottombarProps) {
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleThumbsUp = () => {
    const newMessage: Message = {
      id: message.length + 1,
      name: loggedInUserData.name,
      avatar: loggedInUserData.avatar,
      message: "👍",
    };
    sendMessage(newMessage);
    setMessage("");
  };

  const handleSend = () => {
    if (message.trim()) {
      const newMessage: Message = {
        id: message.length + 1,
        name: loggedInUserData.name,
        avatar: loggedInUserData.avatar,
        message: message.trim(),
      };
      sendMessage(newMessage);
      setMessage("");

      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }

    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      setMessage((prev) => prev + "\n");
    }
  };

  return (
    <div className="flex w-full items-center justify-between gap-2 p-2">
      <div className="flex">
        {!message.trim() && !isMobile && (
          <div className="flex">
            {BottombarIcons.map((icon, index) => (
              <Link
                key={index}
                href="#"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "h-9 w-9",
                  "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white",
                )}
              >
                <icon.icon size={20} className="text-muted-foreground" />
              </Link>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence initial={false}>
        <motion.div
          key="input"
          className="relative w-full"
          layout
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{
            opacity: { duration: 0.05 },
            layout: {
              type: "spring",
              bounce: 0.15,
            },
          }}
        >
          <Input
            autoComplete="off"
            value={message}
            ref={inputRef}
            onKeyDown={handleKeyPress}
            onChange={handleInputChange}
            name="message"
            placeholder="Ask me something..."
            className="flex h-9 w-full resize-none items-center overflow-hidden bg-card text-xs"
          ></Input>
          <div className="absolute bottom-0.5 right-2"></div>
        </motion.div>

        {message.trim() ? (
          <Button
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "w-9 p-2.5",
              "shrink-0 dark:bg-surface dark:text-muted-foreground dark:hover:bg-surface dark:hover:text-white",
            )}
            onClick={handleSend}
          >
            <SendHorizontal size={20} className="text-muted-foreground" />
          </Button>
        ) : (
          <Button
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "w-9 p-2.5",
              "shrink-0 dark:bg-surface dark:text-muted-foreground dark:hover:bg-surface dark:hover:text-white",
            )}
            onClick={handleThumbsUp}
            asChild
          >
            <ThumbsUp size={20} className="text-muted-foreground" />
          </Button>
        )}
      </AnimatePresence>
    </div>
  );
}
