import { latestJobsOpen } from "@/data";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { LatestJobsOpenCard } from "./latest-jobs-open-card";

export const LatestJobsOpen = () => {
  return (
    <section className="relative overflow-hidden bg-[#F8F8FD]">
      <SectionLines />

      <div className="landing-section-container relative z-10">
        <div className="flex items-center justify-between gap-4">
          <h2 className="landing-section-heading">
            Latest <span className="text-[#26A4FF]"> jobs open</span>
          </h2>

          <Link
            href="#"
            className="hidden items-center gap-2 text-[16px] font-semibold leading-none text-[#4640DE] transition-colors duration-200 hover:text-[#5B56E8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4640DE] motion-reduce:transition-none lg:inline-flex"
          >
            Show all jobs
            <ArrowRight
              aria-hidden="true"
              className="size-6"
              strokeWidth={2.1}
            />
          </Link>
        </div>

        <div className="mt-8 overflow-x-auto pb-2 lg:hidden">
          <div className="flex snap-x snap-mandatory gap-4">
            {latestJobsOpen.map((job) => (
              <div
                key={`${job.company}-${job.title}-${job.location}`}
                className="w-[350px] max-w-[86vw] shrink-0 snap-start"
              >
                <LatestJobsOpenCard
                  logo={job.logo}
                  title={job.title}
                  company={job.company}
                  location={job.location}
                  country={job.country}
                  employmentType={job.employment_type}
                  tags={job.tags}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 hidden grid-cols-2 gap-4 lg:grid xl:gap-5">
          {latestJobsOpen.map((job) => (
            <LatestJobsOpenCard
              key={`${job.company}-${job.title}-${job.location}`}
              logo={job.logo}
              title={job.title}
              company={job.company}
              location={job.location}
              country={job.country}
              employmentType={job.employment_type}
              tags={job.tags}
            />
          ))}
        </div>

        <Link
          href="#"
          className="mt-8 inline-flex items-center gap-2 text-[16px] font-semibold leading-none text-[#4640DE] transition-colors duration-200 hover:text-[#5B56E8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4640DE] motion-reduce:transition-none lg:hidden"
        >
          Show all jobs
          <ArrowRight aria-hidden="true" className="size-5" strokeWidth={2.1} />
        </Link>
      </div>
    </section>
  );
};

function SectionLines() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 right-0 hidden w-[52%] lg:block"
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 870 980"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M240 10L860 -280V280L240 560V10Z"
          stroke="#DBDCF8"
          strokeWidth="4"
          fill="none"
        />
        <path
          d="M160 300L780 10V570L160 860V300Z"
          stroke="#DBDCF8"
          strokeWidth="4"
          fill="none"
        />
        <path
          d="M130 680L750 390V950L130 1240V680Z"
          stroke="#DBDCF8"
          strokeWidth="4"
          fill="none"
        />
      </svg>
    </div>
  );
}
