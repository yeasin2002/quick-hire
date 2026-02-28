import { categories } from "@/data";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { CategoryCard } from "./category-card";

export const ExploreByCategory = () => {
  return (
    <section className="mx-auto w-full max-w-[1740px] px-4 py-12 sm:px-8 sm:py-16 lg:px-16 xl:px-24 xl:py-20">
      <h2 className="text-[32px] font-semibold leading-[1.08] tracking-[-0.02em] text-[#25324B] sm:text-5xl font-clashDisplay">
        Explore by <span className="text-[#4640DE]">category</span>
      </h2>

      <div className="mt-6 grid grid-cols-1 gap-4 md:mt-10 md:gap-6 md:grid-cols-2 xl:grid-cols-4">
        {categories.map((item) => {
          return (
            <CategoryCard
              key={item.title}
              icon={item.icon}
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
