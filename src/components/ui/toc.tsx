"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import * as tocbot from "tocbot";

export const Toc = () => {
  const pathname = usePathname();

  useEffect(() => {
    tocbot.init({
      tocSelector: ".toc",
      contentSelector: ".content",
      headingSelector: "h2, h3",
    });

    return () => tocbot.destroy();
  }, [pathname]);

  return (
    <div className="mt-8 flex flex-col gap-3 text-sm">
      <div className="font-medium">On this page</div>
      <nav className="toc text-muted-foreground **:[.toc-list-item]:mb-3 **:[.toc-link]:mb-2 **:[.is-collapsible]:pl-3 **:[.is-collapsible]:mt-2" />
    </div>
  );
};
