import {
  CompaniesTrustList,
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
      <FeaturedJobs />
      <LatestJobsOpen />
    </div>
  );
}
