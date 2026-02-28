import icon1 from "@/assets/categories/Icon-1.png";
import icon2 from "@/assets/categories/Icon-2.png";
import icon3 from "@/assets/categories/Icon-3.png";
import icon4 from "@/assets/categories/Icon-4.png";
import icon5 from "@/assets/categories/Icon-5.png";
import icon6 from "@/assets/categories/Icon-6.png";
import icon7 from "@/assets/categories/Icon-7.png";
import icon0 from "@/assets/categories/Icon.png";
import logo1 from "@/assets/author-companies/company-logo-1.png";
import logo2 from "@/assets/author-companies/company-logo-2.png";
import logo3 from "@/assets/author-companies/company-logo-3.png";
import logo4 from "@/assets/author-companies/company-logo-4.png";
import logo5 from "@/assets/author-companies/company-logo-5.png";
import logo6 from "@/assets/author-companies/company-logo-6.png";
import logo0 from "@/assets/author-companies/company-logo.png";
import logoR from "@/assets/author-companies/R.png";
import type { StaticImageData } from "next/image";

const categoryIconsByFileName: Record<string, StaticImageData> = {
  "Icon-1.png": icon1,
  "Icon-2.png": icon2,
  "Icon-3.png": icon3,
  "Icon-4.png": icon4,
  "Icon-5.png": icon5,
  "Icon-6.png": icon6,
  "Icon-7.png": icon7,
  "Icon.png": icon0,
};

const categoryIconsByTitle: Record<string, StaticImageData> = {
  business: icon6,
  design: icon0,
  engineering: icon5,
  finance: icon3,
  "human resource": icon7,
  marketing: icon2,
  sales: icon1,
  technology: icon4,
};

const companyLogosByFileName: Record<string, StaticImageData> = {
  "company-logo-1.png": logo1,
  "company-logo-2.png": logo2,
  "company-logo-3.png": logo3,
  "company-logo-4.png": logo4,
  "company-logo-5.png": logo5,
  "company-logo-6.png": logo6,
  "company-logo.png": logo0,
  "R.png": logoR,
};

const getFileName = (imageUrl: string): string => {
  if (!imageUrl) {
    return "";
  }

  const normalizedPath = imageUrl.split("#")[0]?.split("?")[0] ?? "";
  const segments = normalizedPath.split("/");
  return segments.at(-1) ?? "";
};

export const resolveCategoryIcon = (
  imageUrl: string,
  title: string,
): StaticImageData => {
  const byFileName = categoryIconsByFileName[getFileName(imageUrl)];
  if (byFileName) {
    return byFileName;
  }

  return categoryIconsByTitle[title.trim().toLowerCase()] ?? icon0;
};

export const resolveCompanyLogo = (imageUrl: string): StaticImageData => {
  return companyLogosByFileName[getFileName(imageUrl)] ?? logo0;
};
