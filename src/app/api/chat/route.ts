const text = [
  "# 🚀 Welcome to **Agents Kit**",
  "",
  "> The ultimate UI library for **LLM-powered apps**.",
  "",
  "## ✨ Key Features",
  "",
  "- 📋 **Copy & Paste Ready**: Drop components into your app instantly.",
  "- ⚛️ **Built for LLM Apps**: Optimized for real-time AI interactions.",
  "- 🎨 **Perfect with shadcn/ui**: Style beautifully with **zero effort**.",
  "",
  "---",
  "",
  "### 🛠 **Why Agents Kit?**",
  "- 🔹 **No more boilerplate** – Start building AI features **immediately**.",
  "- 🔹 **Seamless integration** – Works **out of the box** with React & Next.js.",
  "- 🔹 **Fully customizable** – Tailwind-based for easy styling.",
];

export async function POST() {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      for (const line of text) {
        if (line === "") {
          controller.enqueue(encoder.encode(`0:"\\n"\n`)); // 明示的に改行を送信
        } else {
          for (const word of line.split(" ")) {
            controller.enqueue(encoder.encode(`0:"${word} "\n`));
            await new Promise((resolve) => setTimeout(resolve, 50)); // 送信間隔を調整
          }
          controller.enqueue(encoder.encode(`0:"\\n"\n`)); // 各行の終わりに改行を送信
        }
      }

      // 終了シグナル
      const endMessage = {
        finishReason: "stop",
        usage: { promptTokens: 10, completionTokens: text.length },
        isContinued: false,
      };
      controller.enqueue(encoder.encode(`e:${JSON.stringify(endMessage)}\n`));
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
