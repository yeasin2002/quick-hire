import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Plus, Search, Trash2 } from "lucide-react";
import Link from "next/link";

type AdminJob = {
  category:
    | "Business"
    | "Design"
    | "Engineering"
    | "Finance"
    | "Human Resource"
    | "Marketing"
    | "Sales"
    | "Technology";
  company: string;
  created_at: string;
  description: string;
  employment_type: "Full Time";
  id: string;
  image_url: string;
  location: string;
  title: string;
};

const adminJobs: AdminJob[] = [
  {
    id: "job_01",
    title: "Email Marketing",
    company: "Revolut",
    location: "Madrid, Spain",
    category: "Marketing",
    image_url: "/assets/author-companies/R.png",
    employment_type: "Full Time",
    description:
      "Revolut is looking for Email Marketing to help team market products...",
    created_at: "2026-02-27T08:12:00.000Z",
  },
  {
    id: "job_02",
    title: "Brand Designer",
    company: "Dropbox",
    location: "San Fransisco, US",
    category: "Design",
    image_url: "/assets/author-companies/company-logo.png",
    employment_type: "Full Time",
    description:
      "Dropbox is looking for Brand Designer to help the team think creatively...",
    created_at: "2026-02-26T14:30:00.000Z",
  },
  {
    id: "job_03",
    title: "Data Analyst",
    company: "Twitter",
    location: "San Diego, US",
    category: "Technology",
    image_url: "/assets/author-companies/company-logo-6.png",
    employment_type: "Full Time",
    description: "Twitter is looking for Data Analyst to help team design...",
    created_at: "2026-02-25T16:05:00.000Z",
  },
  {
    id: "job_04",
    title: "Brand Strategist",
    company: "GoDaddy",
    location: "Marseille, France",
    category: "Marketing",
    image_url: "/assets/author-companies/company-logo-5.png",
    employment_type: "Full Time",
    description: "GoDaddy is looking for Brand Strategist to join the team...",
    created_at: "2026-02-24T09:45:00.000Z",
  },
];

const formatDateTime = (value: string): string => {
  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
};

const newestJob = [...adminJobs].sort(
  (a, b) =>
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
)[0];

const categoryMap = adminJobs.reduce<Record<string, number>>((acc, job) => {
  acc[job.category] = (acc[job.category] ?? 0) + 1;
  return acc;
}, {});

const categorySummary = Object.entries(categoryMap).sort((a, b) => b[1] - a[1]);

export function AdminDashboard() {
  return (
    <section className="relative overflow-hidden bg-[#F8F8FD]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(980px_420px_at_88%_-8%,#DBDCF8_0%,transparent_64%)]"
      />

      <div className="mx-auto w-full max-w-435 px-4 py-10 sm:px-8 sm:py-14 lg:px-16 xl:px-24 xl:py-16">
        <header className="relative z-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium tracking-[0.04em] text-[#7C8493] uppercase">
              Admin Panel
            </p>
            <h1 className="mt-2 text-[34px] leading-none tracking-[-0.02em] text-[#25324B] font-clashDisplay sm:text-[44px]">
              Job Management Dashboard
            </h1>
            <p className="mt-3 max-w-175 text-[17px] leading-[1.45] text-[#515B6F] font-epilogue">
              View jobs, browse categories, and add new openings from one place.
            </p>
          </div>

          <Link href="/dashboard/new-job">
            <Button className="h-11 rounded-[12px] bg-[#4640DE] px-4 text-white hover:bg-[#5651EA]">
              <Plus aria-hidden="true" className="size-4" />
              Add New Job
            </Button>
          </Link>
        </header>

        <div className="relative z-10 mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            label="Total Jobs"
            value={`${adminJobs.length}`}
            meta="All active job posts"
          />
          <MetricCard
            label="Total Categories"
            value={`${categorySummary.length}`}
            meta="Used across your posts"
          />
          <MetricCard
            label="Newest Post"
            value={newestJob ? newestJob.title : "No jobs yet"}
            meta={newestJob ? formatDateTime(newestJob.created_at) : "Add your first job"}
          />
          <MetricCard
            label="Team Action"
            value="Add Jobs"
            meta="Use the button on top right"
          />
        </div>

        <div className="relative z-10 mt-7 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
          <section className="rounded-2xl border border-[#D6DDEB] bg-white">
            <div className="border-b border-[#E6E9F3] p-5 sm:p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-[24px] leading-none tracking-[-0.02em] text-[#25324B] font-clashDisplay">
                    Jobs
                  </h2>
                  <p className="mt-2 text-[15px] text-[#515B6F]">
                    View and manage all job posts.
                  </p>
                </div>

                <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
                  <div className="relative w-full sm:w-80">
                    <label htmlFor="admin-job-search" className="sr-only">
                      Search jobs
                    </label>
                    <Search
                      aria-hidden="true"
                      className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#7C8493]"
                    />
                    <Input
                      id="admin-job-search"
                      name="admin_job_search"
                      autoComplete="off"
                      type="search"
                      placeholder="Search by title, company, location..."
                      aria-label="Search by title, company, location"
                      className="h-10 rounded-[11px] border-[#D6DDEB] bg-white pl-9 text-[#25324B]"
                    />
                  </div>
                  <Link href="/dashboard/new-job">
                    <Button
                      variant="outline"
                      className="h-10 rounded-[11px] border-[#D6DDEB] bg-white px-4 text-[#25324B] hover:bg-[#F6F7FB]"
                    >
                      Add Job
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="hidden overflow-x-auto md:block">
              <table className="w-full min-w-[760px] border-collapse">
                <thead>
                  <tr className="bg-[#FAFBFF] text-left text-[13px] tracking-[0.02em] text-[#7C8493] uppercase">
                    <th className="px-6 py-3 font-medium">Job</th>
                    <th className="px-6 py-3 font-medium">Category</th>
                    <th className="px-6 py-3 font-medium">Type</th>
                    <th className="px-6 py-3 font-medium">Added On</th>
                    <th className="px-6 py-3 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {adminJobs.map((job) => (
                    <tr key={job.id} className="border-t border-[#EDF0F7]">
                      <td className="px-6 py-4">
                        <p className="text-[16px] font-semibold text-[#25324B]">
                          {job.title}
                        </p>
                        <p className="mt-1 text-[14px] text-[#515B6F]">
                          {job.company}
                          <span className="mx-1.5 text-[#C5CAD7]">•</span>
                          {job.location}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-[15px] text-[#25324B]">
                        {job.category}
                      </td>
                      <td className="px-6 py-4 text-[15px] text-[#25324B]">
                        {job.employment_type}
                      </td>
                      <td className="px-6 py-4 text-[15px] text-[#515B6F] tabular-nums">
                        {formatDateTime(job.created_at)}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 rounded-[10px] px-2.5 text-[#D44545] hover:bg-[#FFEDED] hover:text-[#C23333]"
                        >
                          <Trash2 aria-hidden="true" className="size-4" />
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="space-y-3 p-4 md:hidden">
              {adminJobs.map((job) => (
                <article
                  key={`${job.id}-mobile`}
                  className="rounded-xl border border-[#E6E9F3] p-4"
                >
                  <p className="text-[16px] font-semibold text-[#25324B]">
                    {job.title}
                  </p>
                  <p className="mt-1 text-[14px] text-[#515B6F]">
                    {job.company}
                    <span className="mx-1.5 text-[#C5CAD7]">•</span>
                    {job.location}
                  </p>
                  <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-[#515B6F]">
                    <span>{job.category}</span>
                    <span>{job.employment_type}</span>
                    <span>{formatDateTime(job.created_at)}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2 h-8 rounded-[10px] px-2.5 text-[#D44545] hover:bg-[#FFEDED] hover:text-[#C23333]"
                  >
                    <Trash2 aria-hidden="true" className="size-4" />
                    Delete
                  </Button>
                </article>
              ))}
            </div>
          </section>

          <aside className="space-y-6">
            <section className="rounded-2xl border border-[#D6DDEB] bg-white p-5 sm:p-6">
              <h2 className="text-[24px] leading-none tracking-[-0.02em] text-[#25324B] font-clashDisplay">
                Categories
              </h2>
              <p className="mt-2 text-[15px] text-[#515B6F]">
                Jobs grouped by category.
              </p>

              <div className="mt-5 space-y-3">
                {categorySummary.map(([category, count]) => (
                  <div
                    key={category}
                    className="rounded-xl border border-[#ECEEF5] p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-[16px] font-semibold text-[#25324B]">
                        {category}
                      </p>
                      <span className="rounded-full bg-[#ECEBFF] px-3 py-1 text-[12px] font-semibold text-[#4640DE]">
                        {count} {count === 1 ? "job" : "jobs"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-2xl border border-[#D6DDEB] bg-white p-5 sm:p-6">
              <h2 className="text-[24px] leading-none tracking-[-0.02em] text-[#25324B] font-clashDisplay">
                Quick Tips
              </h2>
              <ul className="mt-4 space-y-2 text-[14px] leading-[1.45] text-[#515B6F]">
                <li>Use clear job titles so candidates understand the role quickly.</li>
                <li>Keep descriptions short and focused on responsibilities.</li>
                <li>Pick the right category to improve job discoverability.</li>
              </ul>
            </section>
          </aside>
        </div>
      </div>
    </section>
  );
}

function MetricCard({
  label,
  meta,
  value,
}: {
  label: string;
  meta: string;
  value: string;
}) {
  return (
    <article className="rounded-2xl border border-[#D6DDEB] bg-white px-5 py-5">
      <p className="text-[14px] font-medium text-[#7C8493]">{label}</p>
      <p className="mt-3 text-[34px] leading-none tracking-[-0.03em] text-[#25324B] font-clashDisplay">
        {value}
      </p>
      <p className="mt-2 text-[14px] text-[#515B6F]">{meta}</p>
    </article>
  );
}

