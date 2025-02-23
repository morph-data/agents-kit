"use client";

import React, { FC, KeyboardEvent, PropsWithChildren, useRef } from "react";
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

  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = React.useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.metaKey && e.key === "Enter") {
        submitButtonRef.current?.click();
      }
    },
    []
  );

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
          onKeyDown={handleKeyDown}
        />
        <ChatActions>
          {props.onFileChange && (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <ChatActionIconButton>
                    <LucidePlus />
                  </ChatActionIconButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Upload from computer
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <input
                ref={fileInputRef}
                onChange={props.onFileChange}
                type="file"
                className="hidden"
              />
            </>
          )}
          {props.actions}
          <div className="flex-1" />
          <Button
            ref={submitButtonRef}
            type="submit"
            size="icon"
            className="rounded-full"
          >
            <LucideArrowUp />
          </Button>
        </ChatActions>
      </form>
    </Card>
  );
};

export { ChatForm };
