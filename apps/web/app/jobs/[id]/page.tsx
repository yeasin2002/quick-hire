import { ApplyNowForm } from "@/components/jobs/apply-now-form";
import { getJobWithFallbackById } from "@/lib/jobs";
import { ArrowLeft, Calendar, MapPin, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type JobDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const formatPostedDate = (value?: string): string => {
  if (!value) {
    return "Recently posted";
  }

  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.valueOf())) {
    return "Recently posted";
  }

  return parsedDate.toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const toDescriptionParagraphs = (description: string): string[] => {
  const chunks = description
    .split("\n")
    .map((part) => part.trim())
    .filter((part) => part.length > 0);

  return chunks.length > 0 ? chunks : [description];
};

export default async function SingleJobPage({ params }: JobDetailPageProps) {
  const { id } = await params;
  const job = await getJobWithFallbackById(id);

  if (!job) {
    notFound();
  }

  const descriptionParagraphs = toDescriptionParagraphs(job.description);

  return (
    <section className="relative overflow-hidden bg-[#F8F8FD]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_420px_at_5%_-12%,#E3E5FF_0%,transparent_64%)]"
      />

      <div className="mx-auto w-full max-w-435 px-4 py-10 sm:px-8 sm:py-14 lg:px-16 xl:px-24 xl:py-16">
        <Link
          href="/jobs"
          className="relative z-10 inline-flex items-center gap-2 text-[15px] font-semibold text-[#4640DE] transition-colors hover:text-[#5B56E8]"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          Back To Jobs
        </Link>

        <div className="relative z-10 mt-5 rounded-2xl border border-[#D6DDEB] bg-white p-5 sm:p-7">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex min-w-0 items-start gap-4">
              <div className="relative size-14 shrink-0 overflow-hidden rounded-xl border border-[#ECEEF5] bg-[#F8F8FD]">
                <Image
                  src={job.imageUrl}
                  alt={`${job.company} logo`}
                  fill
                  sizes="56px"
                  className="object-contain p-2.5"
                />
              </div>

              <div className="min-w-0">
                <p className="text-[14px] font-semibold text-[#7C8493] font-epilogue">
                  {job.company}
                </p>
                <h1 className="mt-2 text-[32px] leading-[1.08] tracking-[-0.02em] text-[#25324B] font-clashDisplay sm:text-[42px]">
                  {job.title}
                </h1>

                <div className="mt-4 flex flex-wrap items-center gap-2.5 text-[13px] text-[#515B6F] font-epilogue">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F2F4FA] px-3 py-1">
                    <MapPin aria-hidden="true" className="size-3.5" />
                    {job.location}
                  </span>

                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ECEBFF] px-3 py-1 text-[#4640DE]">
                    <Tag aria-hidden="true" className="size-3.5" />
                    {job.category}
                  </span>

                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E7F6F2] px-3 py-1 text-[#1E7A64]">
                    <Calendar aria-hidden="true" className="size-3.5" />
                    {formatPostedDate(job.createdAt)}
                  </span>
                </div>
              </div>
            </div>

            <span className="inline-flex h-8 w-fit items-center rounded-full bg-[#ECEBFF] px-4 text-[13px] font-semibold text-[#4640DE]">
              {job.employmentType}
            </span>
          </div>
        </div>

        <div className="relative z-10 mt-7 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(0,0.9fr)]">
          <article className="rounded-2xl border border-[#D6DDEB] bg-white p-5 sm:p-7">
            <h2 className="text-[28px] leading-none tracking-[-0.02em] text-[#25324B] font-clashDisplay">
              Job Description
            </h2>

            <div className="mt-5 space-y-4 text-[16px] leading-[1.7] text-[#515B6F] font-epilogue">
              {descriptionParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>

          <aside className="h-fit rounded-2xl border border-[#D6DDEB] bg-white p-5 sm:p-7">
            <h2 className="text-[28px] leading-none tracking-[-0.02em] text-[#25324B] font-clashDisplay">
              Apply Now
            </h2>
            <p className="mt-3 text-[14px] leading-[1.45] text-[#515B6F] font-epilogue">
              Submit your application details and we will share it with the
              hiring team.
            </p>

            <div className="mt-5">
              <ApplyNowForm jobId={job.id} />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
