import { JobsListing } from "@/components/jobs/jobs-listing";
import { getJobsWithFallback } from "@/lib/jobs";
import { Suspense } from "react";

export default async function JobListingPage() {
  const jobs = await getJobsWithFallback();

  return (
    <Suspense fallback={<JobsListingFallback />}>
      <JobsListing jobs={jobs} />
    </Suspense>
  );
}

function JobsListingFallback() {
  return (
    <section className="bg-[#F8F8FD]">
      <div className="mx-auto w-full max-w-435 px-4 py-10 sm:px-8 sm:py-14 lg:px-16 xl:px-24 xl:py-16">
        <div className="h-9 w-52 animate-pulse rounded-lg bg-[#E8EAF5]" />
        <div className="mt-3 h-5 w-100 animate-pulse rounded-lg bg-[#ECEEF8]" />
        <div className="mt-8 h-33 animate-pulse rounded-2xl bg-[#ECEEF8]" />
        <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-62 animate-pulse rounded-2xl bg-[#ECEEF8]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
