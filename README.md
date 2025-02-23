
![Agents Kit](/assets/agents-kit.gif)

## What is Agents Kit?
Agents Kit is a collection of components and utilities that help you build chat interfaces. It is designed to be flexible and easy to use, so you can focus on building your AI / chat experience.

Agents Kit is not a component library to be installed via npm, but rather a set of components that you can copy and paste into your project.

## Example

```tsx
'use client';

import { useChat } from '@ai-sdk/react';
import { ChatForm } from '@/components/agents-kit/chat-form';
import { ChatMessages } from '@/components/agents-kit/chat-messages';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div>
      <ScrollArea style={{ flex: 1 }}>
        <ChatMessages messages={messages} />
      </ScrollArea>
      <ChatForm
        inputValue={input}
        onInputChange={handleInputChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
```

## Installation

Everything you need to set up to use Agents Kit.

### Dependencies

Agents Kit depents on shadcn/ui. So you need to setup shadcn/ui first. https://ui.shadcn.com/docs/installation

If you are already using shadcn/ui, you can start using Agents Kit right away.

### Where to start?
First, take a look at the components and blocks. If you find one you like, feel free to copy and paste it into your project and give it a try.

If you want to see a Next.js + Vercel AI SDK example, visit: https://agents-kit.vercel.app/docs/example/nextjs

## Lisence

Morph is [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0) licensed.