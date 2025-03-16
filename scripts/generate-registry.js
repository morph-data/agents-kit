/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

// Get the base URL from the command line arguments (e.g., "http://localhost:3000")
const args = process.argv.slice(2);
if (args.length < 1) {
  console.error("Usage: node scripts/generate-registry.js <baseUrl>");
  process.exit(1);
}
const baseUrl = args[0];

// Generate the registry JSON content with dynamic baseUrl substitution
const registry = {
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "agents-kit",
  "homepage": baseUrl,
  "items": [
    // ui
    {
      "name": "autosize-textarea",
      "type": "registry:component",
      "title": "Autosize Textarea",
      "description": "A textarea that grows with content.",
      "dependencies": ["class-variance-authority"],
      "files": [
        {
          "path": "src/registry/agents-kit/autosize-textarea.tsx",
          "type": "registry:component"
        }
      ]
    },
    {
      "name": "chat-actions",
      "type": "registry:component",
      "title": "Chat Actions",
      "description": "Componennts for actions elements for chat form.",
      "registryDependencies": ["button", "toggle"],
      "files": [
        {
          "path": "src/registry/agents-kit/chat-actions.tsx",
          "type": "registry:component"
        }
      ]
    },
    {
      "name": "chat-bubble",
      "type": "registry:component",
      "title": "Chat Bubble",
      "description": "A chat bubble component.",
      "dependencies": ["class-variance-authority"],
      "files": [
        {
          "path": "src/registry/agents-kit/chat-bubble.tsx",
          "type": "registry:component"
        }
      ]
    },
    {
      "name": "message-area",
      "type": "registry:component",
      "title": "Message Area",
      "description": "A message area component.",
      "registryDependencies": [
        `${baseUrl}/r/chat-bubble.json`, 
        `${baseUrl}/r/md-renderer.json`
      ],
      "files": [
        {
          "path": "src/registry/agents-kit/message-area.tsx",
          "type": "registry:component"
        }
      ]
    },
    {
      "name": "copy-to-clipboard",
      "type": "registry:component",
      "title": "Copy to Clipbloard",
      "description": "Copy to clipboard button for codeblocks.",
      "dependencies": ["@radix-ui/react-slot", "class-variance-authority", "lucide-react"],
      "registryDependencies": [
        "button", 
        "tooltip"
      ],
      "files": [
        {
          "path": "src/registry/agents-kit/copy-to-clipboard.tsx",
          "type": "registry:component"
        }
      ]
    },
    {
      "name": "md-renderer",
      "type": "registry:component",
      "title": "Markdown Renderer",
      "description": "Render markdown content.",
      "dependencies": ["react-markdown", "remark-gfm", "react-syntax-highlighter", "@types/react-syntax-highlighter", "unified", "hast"],
      "registryDependencies": [
        `${baseUrl}/r/copy-to-clipboard.json`
      ],
      "files": [
        {
          "path": "src/registry/agents-kit/md-renderer.tsx",
          "type": "registry:component"
        }
      ]
    },
    {
      "name": "message-area",
      "type": "registry:component",
      "title": "Message Area",
      "description": "A scrollable area for chat messages.",
      "dependencies": ["@radix-ui/react-scroll-area"],
      "files": [
        {
          "path": "src/registry/agents-kit/message-area.tsx",
          "type": "registry:component"
        }
      ]
    },
    // blocks
    {
      "name": "chat-messages",
      "type": "registry:component",
      "title": "Chat Messages",
      "description": "Listing chat messages.",
      "registryDependencies": [
        `${baseUrl}/r/chat-bubble.json`, 
        `${baseUrl}/r/md-renderer.json`
      ],
      "files": [
        {
          "path": "src/registry/agents-kit/chat-messages.tsx",
          "type": "registry:component"
        }
      ]
    },
    {
      "name": "chat-form",
      "type": "registry:component",
      "title": "Chat Form",
      "description": "A chat form component.",
      "dependencies": ["lucide-react"],
      "registryDependencies": [
        "card", 
        "dropdown-menu", 
        `${baseUrl}/r/autosize-textarea.json`, 
        `${baseUrl}/r/chat-actions.json`
      ],
      "files": [
        {
          "path": "src/registry/agents-kit/chat-form.tsx",
          "type": "registry:component"
        }
      ]
    },
  ]
};

// Define the output file path (this example writes to the project root)
const outputPath = path.join(__dirname, '..', 'registry.json');

// Write the formatted JSON string to the file
fs.writeFileSync(outputPath, JSON.stringify(registry, null, 2), 'utf-8');
console.log(`Generated registry.json at ${outputPath}`);
