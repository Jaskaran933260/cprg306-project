import "./globals.css";

export const metadata = {
  title: "NewsNext",
  description: "cprg306-project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
