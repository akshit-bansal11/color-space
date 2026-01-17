import type { Metadata } from "next";
import "./globals.css";
import InitialDialogue from "@/components/popups/InitialDialogue";
import MainWrapper from "@/components/MainWrapper";

export const metadata: Metadata = {
  title: "Akshit Bansal",
  description: "Portfolio of Akshit Bansal",
  icons: {
    icon: "/assets/images/abLogoWhite.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-neutral-900 py-4">
        <InitialDialogue />
        <MainWrapper>{children}</MainWrapper>
      </body>
    </html>
  );
}
