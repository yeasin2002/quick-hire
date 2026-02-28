import rightMan from "@/assets/hero-man.png";
import { ChevronDown, MapPin, Search } from "lucide-react";
import Image from "next/image";

export const HeroSection = () => {
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

          <form
            className="mt-11 w-full max-w-260 bg-white p-3 shadow-[0_16px_50px_rgba(37,50,75,0.08)]"
            action="#"
            method="post"
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
                    name="keyword"
                    type="text"
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
                  <div className="flex items-center gap-2 border-b border-[#CFD4E2] pb-3">
                    <input
                      id="search-location"
                      name="location"
                      type="text"
                      defaultValue="Florence, Italy"
                      className="w-full bg-transparent text-[17px] text-[#25324B] outline-none sm:text-[18px]"
                    />
                    <ChevronDown
                      aria-hidden="true"
                      className="size-6 shrink-0 text-[#7F8794]"
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
