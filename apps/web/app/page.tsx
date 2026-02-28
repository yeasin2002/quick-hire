import {
  CompaniesTrustList,
  ExploreByCategory,
  FeaturedJobs,
  HeroSection,
} from "@/feature/landing";

export default function Page() {
  return (
    <div>
      <HeroSection />
      <CompaniesTrustList />
      <ExploreByCategory />
      <FeaturedJobs />
    </div>
  );
}
