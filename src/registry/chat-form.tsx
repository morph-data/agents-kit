"use client";

import React, { FC, PropsWithChildren, useRef } from "react";
import { AutosizeTextarea } from "./autosize-textarea";
import { ChatActionIconButton, ChatActions } from "./chat-actions";
import { Button } from "@/components/ui/button";
import { LucideArrowUp, LucidePlus } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface ChatFormProps {
  inputValue?: string;
  onInputChange?: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  onFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  actions?: React.ReactNode;
}

const ChatForm: FC<PropsWithChildren<ChatFormProps>> = (props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <Card className="p-2 rounded-3xl shadow">
      <form onSubmit={props.onSubmit} className="grid grid-cols-1 gap-2">
        {props.children}
        <AutosizeTextarea
          value={props.inputValue}
          placeholder="Type a message..."
          className="resize-none"
          variant={"ghost"}
          onChange={props.onInputChange}
          maxHeight={260}
        />
        <ChatActions>
          {props.onFileChange && (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <ChatActionIconButton>
                  <LucidePlus />
                </ChatActionIconButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => fileInputRef.current?.click()}>
                  Upload from computer
                </DropdownMenuItem>
                <input ref={fileInputRef} type="file" className="hidden" />
              </DropdownMenuContent>
            </DropdownMenu>
          )}
          {props.actions}
          <div className="flex-1" />
          <Button type="submit" size="icon" className="rounded-full">
            <LucideArrowUp />
          </Button>
        </ChatActions>
      </form>
    </Card>
  );
};

export { ChatForm };
