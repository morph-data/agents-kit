import { DocsSidebar } from "@/components/docs-sidebar";
import { Toc } from "@/components/ui/toc";

export default function DocsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container-wrapper">
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <DocsSidebar />
        <div className="grid grid-cols-[1fr_200px] md:gap-6 lg:gap-10">
          <main className="content prose prose-zinc min-w-full w-full py-4 pb-40">
            {children}
          </main>
          <Toc />
        </div>
      </div>
    </div>
  );
}
