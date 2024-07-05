import { Message, UserData } from "./chat-types";
import ChatTopbar from "./chat-topbar";
import { ChatList } from "./chat-list";
import React from "react";

interface ChatProps {
  messages?: Message[];
  selectedUser: UserData;
  isMobile: boolean;
  onSend?: (message: Message) => Promise<{ response: Message }>;
}

export function Chat({ messages, selectedUser, isMobile, onSend }: ChatProps) {
  const [messagesState, setMessages] = React.useState<Message[]>(
    messages ?? [],
  );

  const sendMessage = async (newMessage: Message) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    if (onSend) {
      const { response } = await onSend(newMessage);
      setMessages((prevMessages) => [...prevMessages, response]);
    }
  };

  return (
    <div className="flex h-full w-full flex-col justify-between">
      <ChatTopbar selectedUser={selectedUser} />

      <ChatList
        messages={messagesState}
        selectedUser={selectedUser}
        sendMessage={sendMessage}
        isMobile={isMobile}
      />
    </div>
  );
}
