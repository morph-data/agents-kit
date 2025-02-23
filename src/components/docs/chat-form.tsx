"use client";

import { ChatForm } from "@/registry/chat-form";

export const ChatFormWithFileUpload = () => {
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log(file);
    }
  };

  return <ChatForm onFileChange={onFileChange} />;
};
