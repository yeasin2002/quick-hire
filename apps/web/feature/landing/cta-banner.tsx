import ctaImage from "@/assets/cta-dashboard-img.png";
import Image from "next/image";
import Link from "next/link";

export const CtaBanner = () => {
  return (
    <section className="landing-section-container">
      <div className="relative overflow-hidden bg-[#4640DE] text-white [clip-path:polygon(0_14%,46%_0,100%_0,100%_92%,80%_100%,0_100%)] md:[clip-path:polygon(0_18%,11%_0,100%_0,100%_74%,90%_88%,90%_100%,0_100%)]">
        <div className="relative z-10 grid grid-cols-1 gap-10 px-8 pb-0 pt-24 sm:px-10 sm:pt-28 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-6 lg:px-18 lg:pt-20 xl:px-22">
          <div className="max-w-155 pb-0 text-center lg:pb-20 lg:text-left">
            <h2 className="text-[42px] font-semibold leading-[1.03] tracking-[-0.02em]  sm:text-[66px] lg:text-[74px] font-clashDisplay">
              Start posting jobs today
            </h2>

            <p className="mt-7 text-[23px] leading-none text-[#E8EAFF]  sm:text-[30px] lg:text-[24px] font-epilogue">
              Start posting jobs for only $10.
            </p>

            <Link
              href="#"
              className="mt-9 inline-flex h-25 w-full max-w-180 items-center justify-center bg-white px-8 text-[36px] font-semibold leading-none text-[#4640DE] transition-colors duration-200 hover:bg-[#F2F3FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white motion-reduce:transition-none lg:mt-10 lg:h-17.5 lg:w-auto lg:min-w-62.5 lg:max-w-none lg:px-10 lg:text-[18px]"
            >
              Sign Up For Free
            </Link>
          </div>

          <div className="relative -mx-8 sm:-mx-10 lg:mx-0 lg:self-end">
            <Image
              src={ctaImage}
              alt="Employer dashboard preview"
              className="h-auto w-[120%] max-w-none object-contain sm:w-[112%] lg:w-230 lg:max-w-none lg:translate-x-7 lg:translate-y-10 xl:w-245"
              priority
            />
          </div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 right-0 h-24 w-50 bg-[#F8F8FD] [clip-path:polygon(100%_0,100%_100%,0_100%)] sm:h-28 sm:w-58 md:h-32 md:w-68 lg:h-0 lg:w-0"
        />
      </div>
    </section>
  );
};
