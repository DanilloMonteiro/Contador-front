import "@/styles/globals.css";
import { Titillium_Web, Rubik } from "next/font/google";

const titilliem = Titillium_Web({
  weight: "700",
  style: "italic",
  subsets: ["latin"],
  variable: "--font-titilliem",
});

const rubik = Rubik({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-rubik",
});

export default function App({ Component, pageProps }) {
  return (
    <main className={`${titilliem.variable} ${rubik.variable} `}>
      <Component {...pageProps} />
    </main>
  );
}
