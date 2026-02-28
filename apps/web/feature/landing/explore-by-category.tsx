import { categories as fallbackCategories } from "@/data/categories.data";
import { resolveCategoryIcon } from "@/lib/job-board-assets";
import { getCategoriesApi } from "@/lib/job-board-api";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { CategoryCard } from "./category-card";

export const ExploreByCategory = async () => {
  const apiCategories = await getCategoriesApi();
  const categories =
    apiCategories.length > 0
      ? apiCategories.map((category) => ({
          availableJobs: category.available_jobs,
          icon: resolveCategoryIcon(category.image_url, category.title),
          title: category.title,
        }))
      : fallbackCategories.map((category) => ({
          availableJobs: category.available_jobs,
          icon: category.icon,
          title: category.title,
        }));

  return (
    <section className="landing-section-container">
      <h2 className="landing-section-heading">
        Explore by <span className="text-[#26A4FF]">category</span>
      </h2>

      <div className="mt-6 grid grid-cols-1 gap-4 md:mt-10 md:gap-6 md:grid-cols-2 xl:grid-cols-4">
        {categories.map((item) => {
          return (
            <CategoryCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              availableJobs={item.availableJobs}
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
