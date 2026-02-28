import {
  CompaniesTrustList,
  CtaBanner,
  ExploreByCategory,
  FeaturedJobs,
  HeroSection,
  LatestJobsOpen,
} from "@/feature/landing";

export default function Page() {
  return (
    <div>
      <HeroSection />
      <CompaniesTrustList />
      <ExploreByCategory />
      <CtaBanner />
      <FeaturedJobs />
      <LatestJobsOpen />
    </div>
  );
}
