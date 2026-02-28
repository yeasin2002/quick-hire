import { Epilogue, Red_Hat_Display } from "next/font/google";

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

const fontList = [RedHatDisplay, epilogue];

export const fontVariables = fontList.map((f) => f.variable);
