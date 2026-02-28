import { Providers } from "@/components/providers";
import { Footer, Nav } from "@/components/shared";
import { fontVariables } from "@/lib/fonts";
import "@workspace/ui/globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontVariables.join(" ")} font-sans antialiased`}>
        <Providers>
          <Nav />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
