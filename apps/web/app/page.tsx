import {
  CtaBanner,
  ExploreByCategory,
  FeaturedJobs,
  HeroSection,
  LatestJobsOpen,
} from "@/feature/landing";
import { CompaniesTrustList } from "@/feature/landing/companies-trust-list";

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
