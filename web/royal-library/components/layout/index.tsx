// import { useSession } from "next-auth/react";
import { ReactNode } from "react";
import useScroll from "@/lib/hooks/use-scroll";
import Meta from "./meta";

export default function Layout({
  meta,
  children,
}: {
  meta?: {
    title?: string;
    description?: string;
    image?: string;
  };
  children: ReactNode;
}) {
  const scrolled = useScroll(50);

  return (
    <>
      <Meta {...meta} />
     
      <main className="flex w-full flex-col items-start justify-left py-8 px-44 bg-slate-50">
        {children}
      </main>
 
    </>
  );
}
