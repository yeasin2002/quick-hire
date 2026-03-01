import { AdminDashboard } from "@/feature/dashboard";
import { getAdminCategories, getAdminJobs } from "@/feature/dashboard/admin-api";

type DashboardPageProps = {
  searchParams: Promise<{
    category?: string;
    error?: string;
    notice?: string;
    q?: string;
  }>;
};

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const params = await searchParams;

  const query = (params.q ?? "").trim();
  const selectedCategory = (params.category ?? "all").trim();

  const [jobsResult, categoriesResult] = await Promise.all([
    getAdminJobs(),
    getAdminCategories(),
  ]);

  const categories = categoriesResult.ok ? categoriesResult.data : [];
  const jobs = jobsResult.ok ? jobsResult.data : [];

  const normalizedQuery = query.toLowerCase();
  const normalizedCategory = selectedCategory.toLowerCase();

  const filteredJobs = jobs.filter((job) => {
    const matchesQuery =
      normalizedQuery.length === 0 ||
      job.title.toLowerCase().includes(normalizedQuery) ||
      job.company.toLowerCase().includes(normalizedQuery) ||
      job.location.toLowerCase().includes(normalizedQuery);

    const matchesCategory =
      normalizedCategory === "all" ||
      job.category.toLowerCase() === normalizedCategory;

    return matchesQuery && matchesCategory;
  });

  const loadError =
    params.error ||
    (!jobsResult.ok ? jobsResult.message : undefined) ||
    (!categoriesResult.ok ? categoriesResult.message : undefined);

  return (
    <AdminDashboard
      categories={categories}
      error={loadError}
      jobs={filteredJobs}
      notice={params.notice}
      query={query}
      selectedCategory={selectedCategory || "all"}
    />
  );
}
