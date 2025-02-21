import { DocsSidebar } from "@/components/docs-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container-wrapper">
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <DocsSidebar />
        <main className="prose prose-zinc min-w-full w-full py-4">
          {children}
        </main>
      </div>
    </div>
  );
}
