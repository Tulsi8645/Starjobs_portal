export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  location: string;
  type: 'Full Time' | 'Part Time' | 'Contract' | 'Internship';
  daysLeft: number;
  category: string;
}

export interface Stats {
  jobs: number;
  applications: number;
  resumes: number;
  companies: number;
}

export interface CategoryType {
  id: string;
  name: string;
  icon: string;
}

export interface SidebarItem {
  id: string;
  name: string;
  icon: string;
  path: string;
}