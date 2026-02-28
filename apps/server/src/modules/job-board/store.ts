import { randomUUID } from "node:crypto";

export const CATEGORY_TITLES = [
  "Design",
  "Sales",
  "Marketing",
  "Finance",
  "Technology",
  "Engineering",
  "Business",
  "Human Resource",
] as const;

export type JobCategory = (typeof CATEGORY_TITLES)[number];
export type JobEmploymentType = "Full Time";

export type Category = {
  available_jobs: number;
  image_url: string;
  title: JobCategory;
};

export type Job = {
  category: JobCategory;
  company: string;
  created_at: string;
  description: string;
  employment_type: JobEmploymentType;
  id: string;
  image_url: string;
  location: string;
  title: string;
};

export type Application = {
  cover_note: string;
  created_at: string;
  email: string;
  id: string;
  job_id: string;
  name: string;
  resume_link: string;
};

type CreateJobInput = Omit<Job, "created_at" | "id">;
type CreateApplicationInput = Omit<Application, "created_at" | "id">;

const categoriesStore: Category[] = [
  {
    title: "Design",
    available_jobs: 235,
    image_url: "https://ik.imagekit.io/quickhire/categories/design.png",
  },
  {
    title: "Sales",
    available_jobs: 756,
    image_url: "https://ik.imagekit.io/quickhire/categories/sales.png",
  },
  {
    title: "Marketing",
    available_jobs: 140,
    image_url: "https://ik.imagekit.io/quickhire/categories/marketing.png",
  },
  {
    title: "Finance",
    available_jobs: 325,
    image_url: "https://ik.imagekit.io/quickhire/categories/finance.png",
  },
  {
    title: "Technology",
    available_jobs: 436,
    image_url: "https://ik.imagekit.io/quickhire/categories/technology.png",
  },
  {
    title: "Engineering",
    available_jobs: 542,
    image_url: "https://ik.imagekit.io/quickhire/categories/engineering.png",
  },
  {
    title: "Business",
    available_jobs: 211,
    image_url: "https://ik.imagekit.io/quickhire/categories/business.png",
  },
  {
    title: "Human Resource",
    available_jobs: 346,
    image_url: "https://ik.imagekit.io/quickhire/categories/human-resource.png",
  },
];

const jobsStore: Job[] = [
  {
    id: "job_01",
    title: "Email Marketing",
    company: "Revolut",
    location: "Madrid, Spain",
    category: "Marketing",
    image_url: "https://ik.imagekit.io/quickhire/companies/revolut.png",
    employment_type: "Full Time",
    description:
      "Revolut is looking for Email Marketing to help team market products.",
    created_at: new Date().toISOString(),
  },
  {
    id: "job_02",
    title: "Brand Designer",
    company: "Dropbox",
    location: "San Fransisco, US",
    category: "Design",
    image_url: "https://ik.imagekit.io/quickhire/companies/dropbox.png",
    employment_type: "Full Time",
    description:
      "Dropbox is looking for Brand Designer to help the team think creatively.",
    created_at: new Date().toISOString(),
  },
  {
    id: "job_03",
    title: "Email Marketing",
    company: "Pitch",
    location: "Berlin, Germany",
    category: "Marketing",
    image_url: "https://ik.imagekit.io/quickhire/companies/pitch.png",
    employment_type: "Full Time",
    description: "Pitch is looking for Customer Manager to join marketing team.",
    created_at: new Date().toISOString(),
  },
  {
    id: "job_04",
    title: "Visual Designer",
    company: "Blinklist",
    location: "Granada, Spain",
    category: "Design",
    image_url: "https://ik.imagekit.io/quickhire/companies/blinklist.png",
    employment_type: "Full Time",
    description:
      "Blinklist is looking for Visual Designer to help team design assets.",
    created_at: new Date().toISOString(),
  },
  {
    id: "job_05",
    title: "Product Designer",
    company: "ClassPass",
    location: "Manchester, UK",
    category: "Design",
    image_url: "https://ik.imagekit.io/quickhire/companies/classpass.png",
    employment_type: "Full Time",
    description:
      "ClassPass is looking for Product Designer to help us build better UX.",
    created_at: new Date().toISOString(),
  },
  {
    id: "job_06",
    title: "Lead Designer",
    company: "Canva",
    location: "Ontario, Canada",
    category: "Design",
    image_url: "https://ik.imagekit.io/quickhire/companies/canva.png",
    employment_type: "Full Time",
    description:
      "Canva is looking for Lead Engineer to help develop new experiences.",
    created_at: new Date().toISOString(),
  },
  {
    id: "job_07",
    title: "Brand Strategist",
    company: "GoDaddy",
    location: "Marseille, France",
    category: "Marketing",
    image_url: "https://ik.imagekit.io/quickhire/companies/godaddy.png",
    employment_type: "Full Time",
    description: "GoDaddy is looking for Brand Strategist to join the team.",
    created_at: new Date().toISOString(),
  },
  {
    id: "job_08",
    title: "Data Analyst",
    company: "Twitter",
    location: "San Diego, US",
    category: "Technology",
    image_url: "https://ik.imagekit.io/quickhire/companies/twitter.png",
    employment_type: "Full Time",
    description: "Twitter is looking for Data Analyst to help team design.",
    created_at: new Date().toISOString(),
  },
];

const applicationsStore: Application[] = [];

export const getCategories = (): Category[] => {
  return categoriesStore;
};

export const getJobs = (): Job[] => {
  return jobsStore;
};

export const getJobById = (id: string): Job | undefined => {
  return jobsStore.find((job) => job.id === id);
};

export const createJob = (payload: CreateJobInput): Job => {
  const createdJob: Job = {
    id: `job_${randomUUID()}`,
    created_at: new Date().toISOString(),
    ...payload,
  };

  jobsStore.unshift(createdJob);

  const category = categoriesStore.find((item) => item.title === payload.category);
  if (category) {
    category.available_jobs += 1;
  }

  return createdJob;
};

export const deleteJob = (id: string): Job | undefined => {
  const index = jobsStore.findIndex((job) => job.id === id);
  if (index === -1) {
    return undefined;
  }

  const [deletedJob] = jobsStore.splice(index, 1);
  if (!deletedJob) {
    return undefined;
  }

  const category = categoriesStore.find((item) => item.title === deletedJob.category);
  if (category && category.available_jobs > 0) {
    category.available_jobs -= 1;
  }

  for (let i = applicationsStore.length - 1; i >= 0; i -= 1) {
    if (applicationsStore[i]?.job_id === id) {
      applicationsStore.splice(i, 1);
    }
  }

  return deletedJob;
};

export const createApplication = (
  payload: CreateApplicationInput,
): Application => {
  const application: Application = {
    id: `application_${randomUUID()}`,
    created_at: new Date().toISOString(),
    ...payload,
  };

  applicationsStore.unshift(application);
  return application;
};

export const getApplications = (): Application[] => {
  return applicationsStore;
};
