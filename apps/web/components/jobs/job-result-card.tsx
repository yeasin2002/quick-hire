import { ArrowRight, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { JobRecord } from "@/lib/jobs";
import React from "react";
interface Props extends React.ComponentProps<"div"> {
  job: JobRecord;
}

export const JobResultCard = ({ job }: Props) => {
  return (
    <article
      key={job.id}
      className="group h-full rounded-2xl border border-[#D6DDEB] bg-white p-5 transition-colors hover:border-[#B8B5FF] hover:bg-[#FCFCFF] sm:p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <div className="relative size-12 shrink-0 overflow-hidden rounded-xl border border-[#ECEEF5] bg-[#F8F8FD]">
            <Image
              src={job.imageUrl}
              alt={`${job.company} logo`}
              fill
              sizes="48px"
              className="object-contain p-2"
            />
          </div>
          <div className="min-w-0">
            <p className="truncate text-[13px] font-semibold text-[#25324B] font-epilogue">
              {job.company}
            </p>
            <p className="mt-1 truncate text-[12px] text-[#7C8493] font-epilogue">
              {job.location}
            </p>
          </div>
        </div>

        <span className="inline-flex h-7 items-center rounded-full bg-[#E7F6F2] px-3 text-[12px] font-semibold text-[#2F9D84]">
          {job.employmentType}
        </span>
      </div>

      <h2 className="mt-5 line-clamp-2 text-[22px] leading-[1.15] tracking-[-0.02em] text-[#25324B] font-clashDisplay">
        {job.title}
      </h2>

      <p className="mt-3 line-clamp-3 text-[14px] leading-[1.5] text-[#515B6F] font-epilogue">
        {job.description}
      </p>

      <div className="mt-6 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-[12px] font-semibold text-[#7C8493]">
          <MapPin aria-hidden="true" className="size-3.5" />
          <span className="truncate">{job.location}</span>
        </div>

        <span className="inline-flex h-8 items-center rounded-full bg-[#ECEBFF] px-3 text-[12px] font-semibold text-[#4640DE]">
          {job.category}
        </span>
      </div>

      <Link
        href={`/jobs/${job.id}`}
        className="mt-6 inline-flex items-center gap-2 text-[14px] font-semibold text-[#4640DE] transition-colors hover:text-[#5B56E8]"
      >
        View Details
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform group-hover:translate-x-0.5"
        />
      </Link>
    </article>
  );
};
