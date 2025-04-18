import "./globals.css";

export const metadata = {
  title: "NewsNext",
  description: "Web Dev Project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
