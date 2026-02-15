import "./globals.scss";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { ClerkProvider } from "@clerk/nextjs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "@/providers/ThemeProvider";

import localFont from "next/font/local";

const inter = localFont({
  src: [
    { path: "../fonts/Inter-Regular.woff2", weight: "400" },
    { path: "../fonts/Inter-Medium.woff2", weight: "500" },
    { path: "../fonts/Inter-SemiBold.woff2", weight: "600" },
    { path: "../fonts/Inter-Bold.woff2", weight: "700" },
  ],
  variable: "--font-inter",
  display: "swap",
});

// export const metadata: Metadata = {
//   title: "Plataforma Ethos CPAC Escola de Psícologia",
//   description: "Ethos CPAC Escola de psicologia",
// };
export const metadata: Metadata = {
  title: {
    default: "ETHOS CPAC – Gestão Escolar",
    template: "%s | ETHOS",
  },
  description:
    "Sistema de gestão escolar para administração de alunos, professores, turmas e comunicação institucional.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      {/* <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  const saved = localStorage.getItem('theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const theme = saved || (prefersDark ? 'dark' : 'light');
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {}
              })();
            `,
          }}
        />
      </head> */}

      <body className={inter.className}>
        <ThemeProvider>
          {children}
          <ToastContainer position="bottom-right" theme="colored" />
        </ThemeProvider>

        <Script
          src="https://unpkg.com/video.js/dist/video.min.js"
          strategy="beforeInteractive"
        />

        <Script
          src="https://unpkg.com/cloudinary-video-player/dist/cld-video-player.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}


// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     // <ClerkProvider>
//     <html lang="en">
//       <head>
//         <script
//           dangerouslySetInnerHTML={{
//             __html: `
//         (function () {
//           const saved = localStorage.getItem('theme');
//           const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
//           const theme = saved || (prefersDark ? 'dark' : 'light');
//           document.documentElement.setAttribute('data-theme', theme);
//         })();
//       `,
//           }}
//         />
//       </head>

//      <body className={inter.className}>
//   <ThemeProvider>
//     {children}
//     <ToastContainer position="bottom-right" theme="colored" />
//   </ThemeProvider>

//   {/* Video.js */}
//   <Script
//     src="https://unpkg.com/video.js/dist/video.min.js"
//     strategy="beforeInteractive"
//   />

//   {/* Cloudinary Player */}
//   <Script
//     src="https://unpkg.com/cloudinary-video-player/dist/cld-video-player.min.js"
//     strategy="afterInteractive"
//   />
// </body>

//     </html>
//     // </ClerkProvider>
//   );
// }
