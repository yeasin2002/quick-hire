import type { StaticImageData } from "next/image";
import Image from "next/image";

type JobTag = "Marketing" | "Design" | "Business" | "Technology";

type JobCardProps = {
  company: string;
  country: string;
  description: string;
  jobType: "Full Time";
  location: string;
  logo: StaticImageData;
  tags: JobTag[];
  title: string;
};

const tagStyles: Record<JobTag, string> = {
  Marketing: "bg-[#FFF4E8] text-[#FFB836]",
  Design: "bg-[#E7F6F2] text-[#56CDAD]",
  Business: "bg-[#ECEBFF] text-[#4640DE]",
  Technology: "bg-[#FFEDED] text-[#FF6550]",
};

export const JobCard = ({
  logo,
  jobType,
  title,
  company,
  location,
  country,
  description,
  tags,
}: JobCardProps) => {
  return (
    <article className="border border-[#D6DDEB] bg-transparent px-6 py-5 sm:px-8 sm:py-6">
      <div className="flex items-start justify-between gap-4">
        <Image
          src={logo}
          alt={`${company} logo`}
          className="h-12 w-12 object-contain"
        />

        <span className="inline-flex h-13 items-center border border-[#4640DE] px-5 text-[18px] font-medium leading-none text-[#4640DE]">
          {jobType}
        </span>
      </div>

      <h3 className="mt-4 text-[18px] font-semibold leading-none tracking-[-0.02em] text-[#25324B] font-epilogue">
        {title}
      </h3>

      <p className="mt-2 leading-none text-[#515B6F] font-epilogue text-base ">
        {company} <span className="mx-2 text-[#B8BCC7]">•</span>
        {location}, {country}
      </p>

      <p className="mt-4 line-clamp-2 max-w-[96%] text-[22px] leading-[1.45] text-[#7C8493] font-intern">
        {description}
      </p>

      <div className="mt-7 flex flex-wrap gap-3">
        {tags.map((tag) => (
          <span
            key={tag}
            className={`inline-flex h-9 items-center rounded-full  px-5 text-[14px] font-semibold leading-none ${tagStyles[tag]}`}
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
};
