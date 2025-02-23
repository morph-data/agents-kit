"use client";

import { ChatForm } from "@/registry/agents-kit/chat-form";
import { LucideFile, LucideX } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

export const FilePreview = ({
  file,
  onRemove,
}: {
  file: File;
  onRemove?: () => void;
}) => {
  return (
    <div className="py-2 px-3 border rounded-2xl">
      <div className="flex items-center gap-2 text-sm">
        <LucideFile />
        <span>{file.name}</span>
        <Button
          size={"icon"}
          variant={"secondary"}
          className="text-xs h-6 w-6"
          onClick={onRemove}
        >
          <LucideX />
        </Button>
      </div>
    </div>
  );
};

export const ChatFormWithFileUpload = () => {
  const [files, setFiles] = useState<File[]>([]);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("onFileChange");
    const file = e.target.files?.[0];
    if (file) {
      setFiles([...files, file]);
    }
  };

  const removeFileAtIndex = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <ChatForm onFileChange={onFileChange}>
      <div className="flex items-center gap-2 flex-wrap">
        {files.map((file, index) => (
          <FilePreview
            key={index}
            file={file}
            onRemove={() => removeFileAtIndex(index)}
          />
        ))}
      </div>
    </ChatForm>
  );
};
