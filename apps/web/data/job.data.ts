import logo from "@/assets/author-companies/R.png";
import logo1 from "@/assets/author-companies/company-logo-1.png";
import logo2 from "@/assets/author-companies/company-logo-2.png";
import logo3 from "@/assets/author-companies/company-logo-3.png";
import logo4 from "@/assets/author-companies/company-logo-4.png";
import logo5 from "@/assets/author-companies/company-logo-5.png";
import logo6 from "@/assets/author-companies/company-logo-6.png";
import logo0 from "@/assets/author-companies/company-logo.png";
import type { StaticImageData } from "next/image";

type JobTag = "Marketing" | "Design" | "Business" | "Technology";

type JobType = "Full Time";

type Job = {
  company: string;
  country: string;
  description: string;
  job_type: JobType;
  logo: StaticImageData;
  location: string;
  tags: JobTag[];
  title: string;
};

export const jobs: Job[] = [
  {
    title: "Email Marketing",
    company: "Revolut",
    logo,
    location: "Madrid",
    country: "Spain",
    job_type: "Full Time",
    description:
      "Revolut is looking for Email Marketing to help team market products...",
    tags: ["Marketing", "Design"],
  },
  {
    title: "Brand Designer",
    company: "Dropbox",
    logo: logo0,
    location: "San Fransisco",
    country: "US",
    job_type: "Full Time",
    description:
      "Dropbox is looking for Brand Designer to help the team think creatively...",
    tags: ["Design", "Business"],
  },
  {
    title: "Email Marketing",
    company: "Pitch",
    logo: logo1,
    location: "Berlin",
    country: "Germany",
    job_type: "Full Time",
    description:
      "Pitch is looking for Customer Manager to join marketing team...",
    tags: ["Marketing"],
  },
  {
    title: "Visual Designer",
    company: "Blinklist",
    logo: logo2,
    location: "Granada",
    country: "Spain",
    job_type: "Full Time",
    description:
      "Blinklist is looking for Visual Designer to help team design assets...",
    tags: ["Design"],
  },
  {
    title: "Product Designer",
    company: "ClassPass",
    logo: logo3,
    location: "Manchester",
    country: "UK",
    job_type: "Full Time",
    description:
      "ClassPass is looking for Product Designer to help us build better UX...",
    tags: ["Marketing", "Design"],
  },
  {
    title: "Lead Designer",
    company: "Canva",
    logo: logo4,
    location: "Ontario",
    country: "Canada",
    job_type: "Full Time",
    description:
      "Canva is looking for Lead Engineer to help develop new experiences...",
    tags: ["Design", "Business"],
  },
  {
    title: "Brand Strategist",
    company: "GoDaddy",
    logo: logo5,
    location: "Marseille",
    country: "France",
    job_type: "Full Time",
    description: "GoDaddy is looking for Brand Strategist to join the team...",
    tags: ["Marketing"],
  },
  {
    title: "Data Analyst",
    company: "Twitter",
    logo: logo6,
    location: "San Diego",
    country: "US",
    job_type: "Full Time",
    description: "Twitter is looking for Data Analyst to help team design...",
    tags: ["Technology"],
  },
];
