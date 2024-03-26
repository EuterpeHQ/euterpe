import { Message, UserData } from "./chat-types";
import { cn } from "@/lib/utils";
import React, { useRef } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import ChatBottombar from "./chat-bottombar";
import { AnimatePresence, motion } from "framer-motion";

interface ChatListProps {
  messages?: Message[];
  selectedUser: UserData;
  sendMessage: (newMessage: Message) => void;
  isMobile: boolean;
}

export function ChatList({
  messages,
  selectedUser,
  sendMessage,
  isMobile,
}: ChatListProps) {
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="relative flex h-full w-full flex-col overflow-y-auto overflow-x-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-32 bg-gradient-to-b from-background from-0% to-transparent to-70%" />

      <div
        ref={messagesContainerRef}
        className="no-scrollbar flex h-full w-full flex-col overflow-y-auto overflow-x-hidden"
      >
        <AnimatePresence>
          {messages?.map((message, index) => (
            <motion.div
              key={index}
              layout
              initial={{ opacity: 0, scale: 1, y: 50, x: 0, zIndex: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0, x: 0, zIndex: 0 }}
              exit={{ opacity: 0, scale: 1, y: 1, x: 0, zIndex: 0 }}
              transition={{
                zIndex: { duration: 0.1 },
                opacity: { duration: 0.1 },
                layout: {
                  type: "spring",
                  bounce: 0.3,
                  duration: messages.indexOf(message) * 0.05 + 0.2,
                },
              }}
              style={{
                originX: 0.5,
                originY: 0.5,
              }}
              className={cn(
                "flex flex-col gap-2 whitespace-pre-wrap p-4",
                message.name !== selectedUser.name
                  ? "items-end"
                  : "items-start",
              )}
            >
              <div className="flex items-center gap-3">
                {message.name === selectedUser.name && (
                  <Avatar className="flex items-center justify-center">
                    <AvatarImage
                      src={selectedUser.avatar}
                      alt={message.name}
                      width={6}
                      height={6}
                      className="h-10 w-10 object-cover object-top"
                    />
                  </Avatar>
                )}
                <span className="max-w-xs break-words rounded-xl bg-accent px-3 py-3 text-sm">
                  {message.message}
                </span>
                {message.name !== selectedUser.name && (
                  <Avatar className="flex items-center justify-center">
                    <AvatarImage
                      src="https://i.pravatar.cc/300?img=31"
                      alt={message.name}
                      width={6}
                      height={6}
                    />
                  </Avatar>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <ChatBottombar sendMessage={sendMessage} isMobile={isMobile} />
    </div>
  );
}
