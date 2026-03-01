import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { ArrowLeft, FileImage, Plus } from "lucide-react";
import Link from "next/link";

const categories = [
  "Design",
  "Sales",
  "Marketing",
  "Finance",
  "Technology",
  "Engineering",
  "Business",
  "Human Resource",
] as const;

export function NewJobPage() {
  return (
    <section className="relative overflow-hidden bg-[#F8F8FD]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(960px_420px_at_8%_-10%,#E3E5FF_0%,transparent_64%)]"
      />

      <div className="mx-auto w-full max-w-435 px-4 py-10 sm:px-8 sm:py-14 lg:px-16 xl:px-24 xl:py-16">
        <header className="relative z-10">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-[15px] font-semibold text-[#4640DE] hover:text-[#5B56E8]"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back To Dashboard
          </Link>

          <h1 className="mt-4 text-[34px] leading-none tracking-[-0.02em] text-[#25324B] font-clashDisplay sm:text-[44px]">
            Add New Job
          </h1>
          <p className="mt-3 max-w-185 text-[17px] leading-[1.45] text-[#515B6F] font-epilogue">
            Fill in the job details below and publish when ready.
          </p>
        </header>

        <div className="relative z-10 mt-7 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <section className="rounded-2xl border border-[#D6DDEB] bg-white p-5 sm:p-6">
            <form action="#" method="post" className="space-y-5">
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <FormControl
                  id="job-title"
                  label="Title"
                  placeholder="Senior Product Designer..."
                  required
                />
                <FormControl
                  id="job-company"
                  label="Company"
                  placeholder="QuickHire..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <FormControl
                  id="job-location"
                  label="Location"
                  placeholder="Dhaka, Bangladesh..."
                  required
                />
                <div>
                  <label
                    htmlFor="job-category"
                    className="text-[14px] font-semibold text-[#25324B]"
                  >
                    Category
                  </label>
                  <select
                    id="job-category"
                    name="category"
                    defaultValue="Design"
                    className="mt-2 h-10 w-full rounded-[11px] border border-[#D6DDEB] bg-white px-3 text-[14px] text-[#25324B] outline-none focus-visible:ring-2 focus-visible:ring-[#4640DE]"
                    required
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <FormControl
                id="job-image-url"
                label="Company Logo Link"
                placeholder="https://your-image-link.com/logo.png..."
                type="url"
                required
              />

              <div className="rounded-xl border border-[#E6E9F3] bg-[#FAFBFF] p-4">
                <div className="flex items-start gap-3">
                  <FileImage aria-hidden="true" className="mt-0.5 size-5 text-[#4640DE]" />
                  <p className="text-[14px] text-[#515B6F]">
                    Paste a valid image link so your company logo appears on job
                    cards.
                  </p>
                </div>
              </div>

              <div>
                <label
                  htmlFor="job-description"
                  className="text-[14px] font-semibold text-[#25324B]"
                >
                  Description
                </label>
                <textarea
                  id="job-description"
                  name="description"
                  rows={6}
                  required
                  placeholder="Write role responsibilities, required skills, and key expectations..."
                  className="mt-2 w-full rounded-[11px] border border-[#D6DDEB] bg-white px-3 py-2.5 text-[14px] text-[#25324B] outline-none focus-visible:ring-2 focus-visible:ring-[#4640DE]"
                />
              </div>

              <div>
                <label
                  htmlFor="job-employment-type"
                  className="text-[14px] font-semibold text-[#25324B]"
                >
                  Employment Type
                </label>
                <Input
                  id="job-employment-type"
                  name="employment_type"
                  defaultValue="Full Time"
                  readOnly
                  className="mt-2 h-10 rounded-[11px] border-[#D6DDEB] bg-[#F9FAFD] text-[#25324B]"
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                <Link href="/dashboard">
                  <Button
                    type="button"
                    variant="outline"
                    className="h-11 rounded-[12px] border-[#D6DDEB] bg-white px-5 text-[#25324B] hover:bg-[#F6F7FB]"
                  >
                    Cancel
                  </Button>
                </Link>
                <Button
                  type="submit"
                  className="h-11 rounded-[12px] bg-[#4640DE] px-5 text-white hover:bg-[#5651EA]"
                >
                  <Plus aria-hidden="true" className="size-4" />
                  Add Job
                </Button>
              </div>
            </form>
          </section>

          <aside className="space-y-6">
            <section className="rounded-2xl border border-[#D6DDEB] bg-white p-5 sm:p-6">
              <h2 className="text-[24px] leading-none tracking-[-0.02em] text-[#25324B] font-clashDisplay">
                Before You Publish
              </h2>
              <ul className="mt-4 space-y-2 text-[14px] leading-[1.45] text-[#515B6F]">
                <li>Use a clear and specific job title.</li>
                <li>Choose the most relevant category.</li>
                <li>Add a short but complete job description.</li>
                <li>Check the company logo link before saving.</li>
              </ul>
            </section>

            <section className="rounded-2xl border border-[#D6DDEB] bg-white p-5 sm:p-6">
              <h2 className="text-[24px] leading-none tracking-[-0.02em] text-[#25324B] font-clashDisplay">
                Category Guide
              </h2>
              <p className="mt-2 text-[14px] text-[#515B6F]">
                Pick the category that best describes the role.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {categories.map((category) => (
                  <span
                    key={category}
                    className="inline-flex h-8 items-center rounded-full bg-[#ECEBFF] px-3 text-[12px] font-semibold text-[#4640DE]"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </section>
          </aside>
        </div>
      </div>
    </section>
  );
}

function FormControl({
  id,
  label,
  placeholder,
  required = false,
  type = "text",
}: {
  id: string;
  label: string;
  placeholder: string;
  required?: boolean;
  type?: "text" | "url";
}) {
  return (
    <div>
      <label htmlFor={id} className="text-[14px] font-semibold text-[#25324B]">
        {label}
      </label>
      <Input
        id={id}
        name={id.replace("job-", "").replaceAll("-", "_")}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete="off"
        className="mt-2 h-10 rounded-[11px] border-[#D6DDEB] bg-white text-[#25324B]"
      />
    </div>
  );
}

