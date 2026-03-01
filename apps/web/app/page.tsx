import {
  CtaBanner,
  ExploreByCategory,
  FeaturedJobs,
  HeroSection,
  LatestJobsOpen,
  TrustedCompanies,
} from "@/feature/landing";

export default function Page() {
  return (
    <div>
      <HeroSection />
      <TrustedCompanies />
      <ExploreByCategory />
      <CtaBanner />
      <FeaturedJobs />
      <LatestJobsOpen />
    </div>
  );
}
