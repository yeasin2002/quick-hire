import { NewJobPage } from "@/feature/dashboard";
import { getAdminCategories } from "@/feature/dashboard/admin-api";

type DashboardNewJobPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function DashboardNewJobPage({
  searchParams,
}: DashboardNewJobPageProps) {
  const params = await searchParams;
  const categoriesResult = await getAdminCategories();

  return (
    <NewJobPage
      categories={categoriesResult.ok ? categoriesResult.data : []}
      error={params.error || (!categoriesResult.ok ? categoriesResult.message : undefined)}
    />
  );
}
