import { getCategoriesApi } from "@/lib/job-board-api";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { CategoryCard } from "./category-card";

export const ExploreByCategory = async () => {
  const apiCategories = await getCategoriesApi();
  const categories = apiCategories.length > 0 ? apiCategories : [];

  return (
    <section className="landing-section-container">
      <div className="flex items-center justify-between gap-4">
        <h2 className="landing-section-heading">
          Explore by <span className="text-[#26A4FF]">category</span>
        </h2>

        <Link
          href="/jobs"
          className="hidden items-center gap-2  font-semibold leading-none text-[#4640DE] transition-colors duration-200 hover:text-[#5B56E8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4640DE] motion-reduce:transition-none lg:inline-flex font-epilogue text-[16px]"
        >
          Show all jobs
          <ArrowRight aria-hidden="true" className="size-6" strokeWidth={2.1} />
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 md:mt-10 md:gap-6 md:grid-cols-2 xl:grid-cols-4">
        {categories?.map((item) => {
          return (
            <CategoryCard
              key={item.title}
              icon={item.image_url}
              title={item.title}
              availableJobs={item.available_jobs}
            />
          );
        })}
      </div>

      <Link
        href="#"
        className="mt-8 inline-flex items-center gap-2 text-[16px] font-semibold leading-none text-[#4640DE] transition-colors duration-200 hover:text-[#5B56E8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4640DE] motion-reduce:transition-none md:hidden"
      >
        Show all jobs
        <ArrowRight aria-hidden="true" className="size-5" strokeWidth={2.1} />
      </Link>
    </section>
  );
};
