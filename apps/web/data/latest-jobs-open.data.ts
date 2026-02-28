import logo0 from "@/assets/author-companies/company-logo.png";
import logo1 from "@/assets/author-companies/company-logo-1.png";
import logo2 from "@/assets/author-companies/company-logo-2.png";
import logo3 from "@/assets/author-companies/company-logo-3.png";
import logo4 from "@/assets/author-companies/company-logo-4.png";
import logo5 from "@/assets/author-companies/company-logo-5.png";
import logo6 from "@/assets/author-companies/company-logo-6.png";
import logo7 from "@/assets/author-companies/R.png";
import type { StaticImageData } from "next/image";

export type LatestJobTag = "Marketing" | "Design";

export type LatestJobOpen = {
  company: string;
  country: string;
  employment_type: "Full-Time";
  location: string;
  logo: StaticImageData;
  tags: LatestJobTag[];
  title: string;
};

export const latestJobsOpen: LatestJobOpen[] = [
  {
    title: "Social Media Assistant",
    company: "Nomad",
    location: "Paris",
    country: "France",
    employment_type: "Full-Time",
    logo: logo2,
    tags: ["Marketing", "Design"],
  },
  {
    title: "Social Media Assistant",
    company: "Netlify",
    location: "Paris",
    country: "France",
    employment_type: "Full-Time",
    logo: logo4,
    tags: ["Marketing", "Design"],
  },
  {
    title: "Brand Designer",
    company: "Dropbox",
    location: "San Fransisco",
    country: "USA",
    employment_type: "Full-Time",
    logo: logo0,
    tags: ["Marketing", "Design"],
  },
  {
    title: "Brand Designer",
    company: "Maze",
    location: "San Fransisco",
    country: "USA",
    employment_type: "Full-Time",
    logo: logo3,
    tags: ["Marketing", "Design"],
  },
  {
    title: "Interactive Developer",
    company: "Terraform",
    location: "Hamburg",
    country: "Germany",
    employment_type: "Full-Time",
    logo: logo6,
    tags: ["Marketing", "Design"],
  },
  {
    title: "Interactive Developer",
    company: "Udacity",
    location: "Hamburg",
    country: "Germany",
    employment_type: "Full-Time",
    logo: logo5,
    tags: ["Marketing", "Design"],
  },
  {
    title: "HR Manager",
    company: "Packer",
    location: "Lucern",
    country: "Switzerland",
    employment_type: "Full-Time",
    logo: logo1,
    tags: ["Marketing", "Design"],
  },
  {
    title: "HR Manager",
    company: "Webflow",
    location: "Lucern",
    country: "Switzerland",
    employment_type: "Full-Time",
    logo: logo7,
    tags: ["Marketing", "Design"],
  },
];
