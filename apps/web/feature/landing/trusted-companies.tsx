import company4 from "@/assets/companies/amd-logo-1.png";
import company2 from "@/assets/companies/intel-3.png";
import company5 from "@/assets/companies/talkit 1.png";
import company3 from "@/assets/companies/tesla-9 1.png";
import company1 from "@/assets/companies/vodafone-2017-logo.png";
import Image from "next/image";

const companies = [
  { name: "Vodafone", logo: company1, className: "h-10 w-auto sm:h-12" },
  { name: "Intel", logo: company2, className: "h-10 w-auto sm:h-12" },
  { name: "Tesla", logo: company3, className: "h-9 w-auto sm:h-11" },
  { name: "AMD", logo: company4, className: "h-10 w-auto sm:h-12" },
  { name: "Talkit", logo: company5, className: "h-10 w-auto sm:h-12" },
];

export const TrustedCompanies = () => {
  return (
    <section className="bg-[#F8F8FA]">
      <div className="mx-auto w-full max-w-435 px-6 py-14 sm:px-10 sm:py-16 lg:px-16 xl:px-24 xl:py-20">
        <h2 className="text-[18px] font-epilogue text-gray-500">
          Companies we helped grow
        </h2>

        <div className="mt-12 grid grid-cols-2 gap-x-10 gap-y-10 sm:mt-14 sm:grid-cols-3 lg:mt-16 lg:grid-cols-5 lg:gap-x-14 xl:gap-x-20">
          {companies.map((company) => (
            <div
              key={company.name}
              className="flex min-h-14 items-center justify-start lg:min-h-16"
            >
              <Image
                src={company.logo}
                alt={company.name}
                className={`${company.className} object-contain opacity-70 grayscale`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
