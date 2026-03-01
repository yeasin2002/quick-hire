"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@workspace/ui/components/select";
import { ChevronDown, MapPin, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { type FormEvent, useMemo, useState } from "react";

type HeroSearchFormProps = {
  locations: string[];
};

const ALL_LOCATIONS = "__all_locations__";

export function HeroSearchForm({ locations }: HeroSearchFormProps) {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState(ALL_LOCATIONS);

  const locationOptions = useMemo(() => {
    return [...locations].sort((a, b) => a.localeCompare(b));
  }, [locations]);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const params = new URLSearchParams();
    const normalizedKeyword = keyword.trim();

    if (normalizedKeyword.length > 0) {
      params.set("search", normalizedKeyword);
    }

    if (location !== ALL_LOCATIONS) {
      params.set("location", location);
    }

    const query = params.toString();
    router.push(query ? `/job?${query}` : "/job");
  };

  return (
    <form
      onSubmit={onSubmit}
      className="mt-11 w-full max-w-360 min-w-220 bg-white p-3 shadow-[0_16px_50px_rgba(37,50,75,0.08)] z-50"
      aria-label="filter-search-job"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="flex min-w-0 flex-1 items-center gap-4 px-3 py-2">
          <Search
            aria-hidden="true"
            className="size-8 shrink-0 text-[#25324B]"
            strokeWidth={2.2}
          />

          <div className="min-w-0 flex-1">
            <label htmlFor="search-keyword" className="sr-only">
              Job title or keyword
            </label>
            <input
              id="search-keyword"
              name="search"
              type="text"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="Job title or keyword"
              className="w-full border-b border-[#CFD4E2] bg-transparent pb-3 text-[17px] text-[#25324B] outline-none placeholder:text-[#B2B7C4] focus-visible:border-[#4D4DED] sm:text-[18px]"
            />
          </div>
        </div>

        <div className="hidden h-16 w-px bg-[#E7EAF2] md:block" />

        <div className="flex min-w-0 flex-1 items-center gap-4 px-3 py-2">
          <MapPin
            aria-hidden="true"
            className="size-8 shrink-0 text-[#25324B]"
            strokeWidth={2.2}
          />

          <div className="min-w-0 flex-1">
            <label htmlFor="search-location" className="sr-only">
              Location
            </label>
            <div className="relative border-b border-[#CFD4E2] pb-2.5">
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger
                  id="search-location"
                  aria-label="Location"
                  className="h-auto w-full rounded-none border-none bg-transparent px-0 pb-0 pt-0 text-[17px] text-[#25324B] shadow-none focus-visible:border-none focus-visible:ring-0 sm:text-[18px] [&_svg]:hidden"
                >
                  <SelectValue placeholder="Choose location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ALL_LOCATIONS}>All locations</SelectItem>
                  {locationOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <ChevronDown
                aria-hidden="true"
                className="pointer-events-none absolute right-0 top-1/2 size-6 -translate-y-1/2 text-[#7F8794]"
                strokeWidth={2.6}
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="h-20 shrink-0 bg-[#4640DE] px-8 text-[18px] font-semibold leading-none text-[#F8FAFF] transition-colors duration-200 hover:bg-[#5B56E8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8380F0] motion-reduce:transition-none md:min-w-[320px]"
        >
          Search my job
        </button>
      </div>
    </form>
  );
}
