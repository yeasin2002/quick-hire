import icon1 from "@/assets/categories/Icon-1.png";
import icon2 from "@/assets/categories/Icon-2.png";
import icon3 from "@/assets/categories/Icon-3.png";
import icon4 from "@/assets/categories/Icon-4.png";
import icon5 from "@/assets/categories/Icon-5.png";
import icon6 from "@/assets/categories/Icon-6.png";
import icon7 from "@/assets/categories/Icon-7.png";
import icon0 from "@/assets/categories/Icon.png";
import type { StaticImageData } from "next/image";

type Categories = {
  icon: StaticImageData;
  title: string;
  available_jobs: number;
};

export const categories: Categories[] = [
  { icon: icon0, title: "Design", available_jobs: 235 },
  { icon: icon1, title: "Sales", available_jobs: 756 },
  { icon: icon2, title: "Marketing", available_jobs: 140 },
  { icon: icon3, title: "Finance", available_jobs: 325 },
  { icon: icon4, title: "Technology", available_jobs: 436 },
  { icon: icon5, title: "Engineering", available_jobs: 542 },
  { icon: icon6, title: "Business", available_jobs: 211 },
  { icon: icon7, title: "Human Resource", available_jobs: 346 },
];
