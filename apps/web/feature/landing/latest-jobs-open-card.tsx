import type { LatestJobTag } from "@/data";
import type { StaticImageData } from "next/image";
import Image from "next/image";

type LatestJobsOpenCardProps = {
  company: string;
  country: string;
  employmentType: "Full-Time";
  location: string;
  logo: StaticImageData;
  tags: LatestJobTag[];
  title: string;
};

const tagStyles: Record<LatestJobTag, string> = {
  Marketing: "border-[#FFB836] text-[#FFB836]",
  Design: "border-[#4640DE] text-[#4640DE]",
};

export const LatestJobsOpenCard = ({
  logo,
  title,
  company,
  location,
  country,
  employmentType,
  tags,
}: LatestJobsOpenCardProps) => {
  return (
    <article className="border border-[#ECEEF5] bg-white px-5 py-4 sm:px-7 sm:py-5">
      <div className="flex items-start gap-4 sm:gap-5">
        <Image
          src={logo}
          alt={`${company} logo`}
          className="h-12 w-12 shrink-0 object-contain"
        />

        <div className="min-w-0 flex-1">
          <h3 className="truncate text-[18px] font-semibold leading-none text-[#25324B] font-epilogue sm:text-[20px]">
            {title}
          </h3>

          <p className="mt-3 truncate text-[15px] leading-none text-[#515B6F] font-epilogue sm:text-[16px]">
            {company} <span className="mx-2 text-[#B8BCC7]">•</span>
            {location}, {country}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2 sm:gap-3">
            <span className="inline-flex h-8 items-center rounded-full bg-[#E7F6F2] px-3 text-[14px] font-semibold leading-none text-[#56CDAD] sm:h-9 sm:px-4">
              {employmentType}
            </span>

            <span aria-hidden="true" className="h-6 w-px bg-[#D6DDEB]" />

            {tags.map((tag) => (
              <span
                key={tag}
                className={`inline-flex h-8 items-center rounded-full border px-3 text-[14px] font-semibold leading-none sm:h-9 sm:px-4 ${tagStyles[tag]}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
};
