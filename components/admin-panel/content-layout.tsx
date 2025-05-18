import { Navbar } from "@/components/admin-panel/navbar";

interface ContentLayoutProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function ContentLayout({ title, description, children }: ContentLayoutProps) {
  return (
    <div>
      <Navbar title={title} />
      <div className="container pt-8 pb-8 px-4 sm:px-8">
        {description && <p className="text-muted-foreground mb-6">{description}</p>}
        {children}
      </div>
    </div>
  );
}
