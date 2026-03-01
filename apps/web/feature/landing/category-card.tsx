import { ArrowRight } from "lucide-react";
import type { StaticImageData } from "next/image";
import Image from "next/image";

type CategoryCardProps = {
  icon: StaticImageData | string;
  title: string;
  availableJobs: number;
};

export const CategoryCard = ({
  icon,
  title,
  availableJobs,
}: CategoryCardProps) => {
  return (
    <article className="group h-full border border-[#D6DDEB] bg-transparent px-4 py-5 md:p-8 xl:p-10">
      <div className="flex items-center gap-4 md:block">
        <Image
          src={icon}
          alt=""
          aria-hidden="true"
          className="h-11 w-auto shrink-0 md:h-14"
          width={100}
          height={100}
        />

        <div className="min-w-0 flex-1 md:mt-12">
          <h3 className="text-[20px] font-semibold leading-none tracking-[-0.02em] text-[#25324B] font-clashDisplay md:text-[34px]">
            {title}
          </h3>

          <p className="mt-2 text-[14px] leading-none text-[#7C8493] font-epilogue md:text-[22px]">
            {availableJobs} jobs available
          </p>
        </div>

        <ArrowRight
          aria-hidden="true"
          className="size-8 shrink-0 text-[#25324B] transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none md:hidden"
          strokeWidth={2.1}
        />
      </div>

      <div className="mt-4 hidden items-center justify-between gap-6 md:flex">
        <div />
        <ArrowRight
          aria-hidden="true"
          className="size-8 shrink-0 text-[#25324B] transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
          strokeWidth={2.1}
        />
      </div>
    </article>
  );
};
