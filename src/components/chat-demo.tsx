"use client";

import { useChat } from "@ai-sdk/react";
import { ChatForm } from "@/registry/agents-kit/chat-form";
import { ChatMessages } from "@/registry/agents-kit/chat-messages";
import { ScrollArea } from "@/components/ui/scroll-area";

export function ChatDemo() {
  const { messages, input, handleInputChange, handleSubmit, status } =
    useChat();

  return (
    <div
      className={`
      flex flex-col items-stretch justify-center 
      prose max-w-none prose-sm prose-p:my-0
    `}
    >
      {messages.length === 0 && (
        <div className="mb-2 flex flex-col items-center">
          <h2 className="text-3xl font-bold">How Can I help you?</h2>
        </div>
      )}
      {messages.length > 0 && (
        <ScrollArea style={{ flex: 1 }}>
          <ChatMessages messages={messages} status={status} />
        </ScrollArea>
      )}
      <ChatForm
        inputValue={input}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
