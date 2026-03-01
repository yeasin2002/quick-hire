import { getJobsApi } from "@/lib/job-board-api";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { JobCard } from "./job-card";

export const FeaturedJobs = async () => {
  const apiJobs = await getJobsApi();
  const featuredJobs = apiJobs.length > 0 ? apiJobs : [];

  return (
    <section className="mx-auto w-full max-w-435 px-4 py-12 sm:px-8 sm:py-16 lg:px-16 xl:px-24 xl:py-20">
      <div className="flex items-center justify-between gap-4">
        <h2 className="landing-section-heading">
          Featured <span className="text-[#26A4FF]">jobs</span>
        </h2>

        <Link
          href="/jobs"
          className="hidden items-center gap-2  font-semibold leading-none text-[#4640DE] transition-colors duration-200 hover:text-[#5B56E8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4640DE] motion-reduce:transition-none lg:inline-flex font-epilogue text-[16px]"
        >
          Show all jobs
          <ArrowRight aria-hidden="true" className="size-6" strokeWidth={2.1} />
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto pb-2 lg:hidden">
        <div className="flex snap-x snap-mandatory gap-4">
          {featuredJobs.map((job) => (
            <div key={job.id} className="w-87 max-w-[86vw] shrink-0 snap-start">
              <JobCard
                id={job.id}
                logo={job.image_url}
                jobType={"Full Time" as const}
                title={job.title}
                company={job.company}
                location={job.location}
                description={job.description}
                tags={job.category}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10 hidden grid-cols-4 gap-6 lg:grid">
        {featuredJobs.map((job) => (
          <JobCard
            id={job.id}
            key={job.id}
            logo={job.image_url}
            jobType={"Full Time" as const}
            title={job.title}
            company={job.company}
            location={job.location}
            description={job.description}
            tags={job.category}
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
    </section>
  );
};
