import rightMan from "@/assets/hero-man.png";
import { jobs as localJobs } from "@/data/job.data";
import { baseUrl } from "@/lib/constant";
import Image from "next/image";
import { HeroSearchForm } from "./hero-search-form";

type ApiJobsResponse = {
  data?: Array<{
    location?: string;
  }>;
  success?: boolean;
};

const getUniqueLocations = (locations: string[]): string[] => {
  return Array.from(
    new Set(
      locations
        .map((location) => location.trim())
        .filter((location) => location.length > 0),
    ),
  ).sort((a, b) => a.localeCompare(b));
};

const getApiBaseUrl = (): string | null => {
  const normalizedBaseUrl = baseUrl?.trim();
  if (!normalizedBaseUrl) {
    return null;
  }

  return normalizedBaseUrl.endsWith("/")
    ? normalizedBaseUrl.slice(0, -1)
    : normalizedBaseUrl;
};

const toApiUrl = (path: string): string | null => {
  const apiBaseUrl = getApiBaseUrl();
  if (!apiBaseUrl) {
    return null;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${apiBaseUrl}${normalizedPath}`;
};

const getLocationsFromApi = async (): Promise<string[]> => {
  const jobsApiUrl = toApiUrl("/api/jobs");
  if (!jobsApiUrl) {
    return [];
  }

  try {
    const response = await fetch(jobsApiUrl, {
      headers: {
        Accept: "application/json",
      },
      next: {
        revalidate: 60,
      },
    });

    if (!response.ok) {
      return [];
    }

    const payload = (await response.json()) as ApiJobsResponse;
    if (!payload.success || !Array.isArray(payload.data)) {
      return [];
    }

    return getUniqueLocations(
      payload.data
        .map((job) => job.location ?? "")
        .filter((location) => location.length > 0),
    );
  } catch {
    return [];
  }
};

const getLocationsFallback = (): string[] => {
  return getUniqueLocations(
    localJobs.map((job) => `${job.location.trim()}, ${job.country.trim()}`),
  );
};

export const HeroSection = async () => {
  const apiLocations = await getLocationsFromApi();
  const locations = apiLocations.length > 0 ? apiLocations : getLocationsFallback();

  return (
    <section className="relative overflow-hidden bg-[#F8F8FD]">
      <BackgroundLines />

      <div className="relative z-10 mx-auto grid w-full max-w-435 grid-cols-1 px-6 pb-12 pt-14 sm:px-10 lg:px-16 xl:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)] xl:px-24 xl:pb-0 xl:pt-16">
        <div className="max-w-182.5 pb-8 xl:pb-24">
          <h1 className="text-[54px] font-extrabold leading-[0.98] tracking-[-0.025em] text-[#25324B] sm:text-[72px] lg:text-[96px]">
            Discover
            <br />
            more than
            <br />
            <span className="text-[#26A4FF]">5000+ Jobs</span>
          </h1>

          <ScribbleMark />

          <p className="mt-8 max-w-155 text-[18px] leading-[1.45] text-[#7C8493] sm:text-[22px]">
            Great platform for the job seeker that searching for new career
            heights and passionate about startups.
          </p>

          <HeroSearchForm locations={locations} />

          <p className="mt-5 text-[16px] text-[#646D7A] sm:text-[18px] lg:text-[20px]">
            Popular : UI Designer, UX Researcher, Android, Admin
          </p>
        </div>

        <div className="relative flex items-end justify-center xl:justify-end">
          <Image
            src={rightMan}
            alt="Smiling candidate pointing to opportunities"
            priority
            className="h-auto w-full max-w-172.5 xl:max-w-none"
          />
        </div>
      </div>
    </section>
  );
};

function ScribbleMark() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 620 54"
      xmlns="http://www.w3.org/2000/svg"
      className="mt-7 h-11 w-full max-w-135 text-[#26A4FF]"
    >
      <path
        d="M10 15C145 32 292 18 600 20"
        stroke="currentColor"
        strokeWidth="6.6"
        strokeLinecap="round"
      />
      <path
        d="M5 26C170 42 380 30 560 28"
        stroke="currentColor"
        strokeWidth="5.6"
        strokeLinecap="round"
      />
      <path
        d="M52 40C170 43 458 37 605 36"
        stroke="currentColor"
        strokeWidth="3.8"
        strokeLinecap="round"
      />
      <path
        d="M599 23L619 22L602 31"
        stroke="currentColor"
        strokeWidth="6.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BackgroundLines() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 right-0 hidden w-[68%] xl:block"
    >
      <svg
        className="h-full w-full"
        viewBox="0 0 1190 900"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M180 210L720 20V410L180 600V210Z"
          stroke="#D9D7F4"
          strokeWidth="4"
          fill="none"
        />
        <path
          d="M330 340L930 120V520L330 730V340Z"
          stroke="#D9D7F4"
          strokeWidth="4"
          fill="none"
        />
        <path
          d="M70 600L640 400V870L70 1070V600Z"
          stroke="#D9D7F4"
          strokeWidth="4"
          fill="none"
        />
      </svg>
    </div>
  );
}
