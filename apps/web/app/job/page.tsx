import { redirect } from "next/navigation";

type JobAliasPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function JobAliasPage({ searchParams }: JobAliasPageProps) {
  const params = await searchParams;
  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (typeof value === "string" && value.trim().length > 0) {
      query.set(key, value.trim());
    }
  }

  const queryString = query.toString();
  redirect(queryString ? `/jobs?${queryString}` : "/jobs");
}
