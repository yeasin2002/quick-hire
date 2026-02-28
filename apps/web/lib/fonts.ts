import { Epilogue, Red_Hat_Display } from "next/font/google";
import localFont from "next/font/local";

const clashDisplay = localFont({
  src: [
    {
      path: "../public/clash-display/ClashDisplay-Extralight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/clash-display/ClashDisplay-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/clash-display/ClashDisplay-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/clash-display/ClashDisplay-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/clash-display/ClashDisplay-Semibold.otf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/clash-display/ClashDisplay-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-clashDisplay",
  display: "swap",
});

const RedHatDisplay = Red_Hat_Display({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-red-hat",
});

const epilogue = Epilogue({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-epilogue",
});

const fontList = [RedHatDisplay, epilogue, clashDisplay];

export const fontVariables = fontList.map((f) => f.variable);
