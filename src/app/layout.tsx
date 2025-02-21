import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const popins = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Donalds",
  description: "Order Donalds for client",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${popins.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
