"use client";

import type { JobRecord } from "@/lib/jobs";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { cn } from "@workspace/ui/lib/utils";
import { Search, Sparkles } from "lucide-react";
import { parseAsString, useQueryStates } from "nuqs";
import { useMemo } from "react";
import { JobResultCard } from "./job-result-card";

type JobsListingProps = {
  jobs: JobRecord[];
};

const ALL_OPTION = "__all__";

const getComparableLocation = (value: string): string => {
  return value.trim().toLowerCase();
};

const getComparableText = (value: string): string => {
  return value.trim().toLowerCase();
};

export function JobsListing({ jobs }: JobsListingProps) {
  const [query, setQuery] = useQueryStates(
    {
      category: parseAsString.withDefault(""),
      location: parseAsString.withDefault(""),
      search: parseAsString.withDefault(""),
    },
    {
      clearOnDefault: true,
      history: "replace",
      shallow: false,
    },
  );

  const categories = useMemo(() => {
    return Array.from(new Set(jobs.map((job) => job.category.trim()))).sort(
      (a, b) => a.localeCompare(b),
    );
  }, [jobs]);

  const locations = useMemo(() => {
    return Array.from(new Set(jobs.map((job) => job.location.trim()))).sort(
      (a, b) => a.localeCompare(b),
    );
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    const normalizedSearch = getComparableText(query.search);
    const normalizedCategory = getComparableText(query.category);
    const normalizedLocation = getComparableLocation(query.location);

    return jobs.filter((job) => {
      const searchable = `${job.title} ${job.company} ${job.description} ${job.category} ${job.location}`;
      const matchesSearch =
        normalizedSearch.length === 0 ||
        getComparableText(searchable).includes(normalizedSearch);

      const matchesCategory =
        normalizedCategory.length === 0 ||
        getComparableText(job.category) === normalizedCategory;

      const matchesLocation =
        normalizedLocation.length === 0 ||
        getComparableLocation(job.location) === normalizedLocation;

      return matchesSearch && matchesCategory && matchesLocation;
    });
  }, [jobs, query.category, query.location, query.search]);

  const hasActiveFilters =
    query.search.length > 0 ||
    query.category.length > 0 ||
    query.location.length > 0;

  return (
    <section className="relative overflow-hidden bg-[#F8F8FD]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(780px_360px_at_5%_-12%,#E3E5FF_0%,transparent_64%)]"
      />

      <div className="mx-auto w-full max-w-435 px-4 py-10 sm:px-8 sm:py-14 lg:px-16 xl:px-24 xl:py-16">
        <header className="relative z-10">
          <p className="inline-flex items-center gap-2 rounded-full border border-[#D6DDEB] bg-white px-4 py-1.5 text-[12px] font-semibold text-[#4640DE] font-epilogue sm:text-[13px]">
            <Sparkles aria-hidden="true" className="size-3.5" />
            Explore Opportunities
          </p>

          <h1 className="mt-4 text-[34px] leading-none tracking-[-0.02em] text-[#25324B] font-clashDisplay sm:text-[44px]">
            Find Your Next Role
          </h1>
          <p className="mt-3 max-w-190 text-[16px] leading-normal text-[#515B6F] font-epilogue sm:text-[18px]">
            Browse all published jobs, search by title or company, and narrow
            results by category and location.
          </p>
        </header>

        <section className="relative z-10 mt-7 rounded-2xl border border-[#D6DDEB] bg-white p-4 shadow-[0_20px_45px_rgba(19,34,68,0.06)] sm:p-5">
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.45fr)_minmax(0,0.45fr)]">
            <div className="relative">
              <label htmlFor="jobs-search" className="sr-only">
                Search jobs
              </label>
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-[#7C8493]"
              />
              <Input
                id="jobs-search"
                name="search"
                value={query.search}
                onChange={(event) => {
                  void setQuery({ search: event.target.value || null });
                }}
                autoComplete="off"
                spellCheck={false}
                placeholder="Search by title, company, or keyword…"
                className="h-11 border-[#D6DDEB] bg-[#FCFCFF] pl-9 text-[14px] text-[#25324B] placeholder:text-[#7C8493]"
              />
            </div>

            <Select
              value={query.category || ALL_OPTION}
              onValueChange={(value) => {
                void setQuery({
                  category: value === ALL_OPTION ? null : value,
                });
              }}
            >
              <label htmlFor="jobs-category-filter" className="sr-only">
                Filter by category
              </label>
              <SelectTrigger
                id="jobs-category-filter"
                aria-label="Filter by category"
                className="min-h-11 w-full border-[#D6DDEB] bg-[#FCFCFF] text-[#25324B]"
              >
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL_OPTION}>All categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={query.location || ALL_OPTION}
              onValueChange={(value) => {
                void setQuery({
                  location: value === ALL_OPTION ? null : value,
                });
              }}
            >
              <label htmlFor="jobs-location-filter" className="sr-only">
                Filter by location
              </label>
              <SelectTrigger
                id="jobs-location-filter"
                aria-label="Filter by location"
                className="min-h-11  w-full border-[#D6DDEB] bg-[#FCFCFF] text-[#25324B]"
              >
                <SelectValue placeholder="All locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL_OPTION}>All locations</SelectItem>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[13px] text-[#7C8493] font-epilogue sm:text-[14px]">
              Showing {filteredJobs.length} of {jobs.length} jobs
            </p>
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                void setQuery({
                  category: null,
                  location: null,
                  search: null,
                });
              }}
              disabled={!hasActiveFilters}
              className={cn(
                "h-9 rounded-[10px] px-3 text-[13px] font-semibold text-[#4640DE] hover:bg-[#ECEBFF] hover:text-[#4640DE]",
                !hasActiveFilters && "text-[#9FA7B8]",
              )}
            >
              Clear Filters
            </Button>
          </div>
        </section>

        {filteredJobs.length > 0 ? (
          <div className="relative z-10 mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredJobs.map((job) => (
              <JobResultCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="relative z-10 mt-7 rounded-2xl border border-dashed border-[#D6DDEB] bg-white/90 px-6 py-12 text-center">
            <h2 className="text-[24px] leading-none tracking-[-0.02em] text-[#25324B] font-clashDisplay">
              No matching jobs found
            </h2>
            <p className="mx-auto mt-3 max-w-145 text-[15px] leading-[1.45] text-[#515B6F] font-epilogue">
              Try a different keyword, category, or location to find relevant
              openings.
            </p>
            <Button
              type="button"
              onClick={() => {
                void setQuery({
                  category: null,
                  location: null,
                  search: null,
                });
              }}
              className="mt-6 h-10 rounded-[12px] bg-[#4640DE] px-5 text-white hover:bg-[#5853EA]"
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
