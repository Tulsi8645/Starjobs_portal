import { Job, Stats, CategoryType, SidebarItem } from './types';

export const jobs: Job[] = [
  {
    id: '1',
    title: 'Graphics Designer',
    company: 'IKEA Technologies',
    companyLogo: 'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=1',
    location: 'San Francisco, USA',
    type: 'Full Time',
    daysLeft: 7,
    category: 'Design'
  },
  {
    id: '2',
    title: 'React Developer',
    company: 'After Effect',
    companyLogo: 'https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=1',
    location: 'New York, USA',
    type: 'Full Time',
    daysLeft: 7,
    category: 'Development'
  },
  {
    id: '3',
    title: 'UI/UX Designer',
    company: 'Bonton Tech',
    companyLogo: 'https://images.pexels.com/photos/12903347/pexels-photo-12903347.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=1',
    location: 'London, UK',
    type: 'Full Time',
    daysLeft: 7,
    category: 'Design'
  },
  {
    id: '4',
    title: 'Junior QA',
    company: 'ClayCat Tech',
    companyLogo: 'https://images.pexels.com/photos/5473955/pexels-photo-5473955.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=1',
    location: 'Berlin, Germany',
    type: 'Full Time',
    daysLeft: 7,
    category: 'Testing'
  },
  {
    id: '5',
    title: 'Java Developer',
    company: 'Bond Street',
    companyLogo: 'https://images.pexels.com/photos/5473302/pexels-photo-5473302.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=1',
    location: 'Toronto, Canada',
    type: 'Full Time',
    daysLeft: 7,
    category: 'Development'
  },
  {
    id: '6',
    title: 'Graphics Designer',
    company: 'IKEA Technologies',
    companyLogo: 'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=1',
    location: 'San Francisco, USA',
    type: 'Full Time',
    daysLeft: 7,
    category: 'Design'
  }
];

export const stats: Stats = {
  jobs: 150,
  applications: 300,
  resumes: 150,
  companies: 20
};

export const categories: CategoryType[] = [
  {
    id: '1',
    name: 'Backend Developer',
    icon: 'ComputerIcon'
  },
  {
    id: '2',
    name: 'Content Writing',
    icon: 'PenIcon'
  },
  {
    id: '3',
    name: 'UI/UX Designer',
    icon: 'MonitorIcon'
  },
  {
    id: '4',
    name: 'Digital Marketing',
    icon: 'TimerIcon'
  },
  {
    id: '5',
    name: 'Frontend Developer',
    icon: 'MonitorIcon'
  },
  {
    id: '6',
    name: 'Graphic Designing',
    icon: 'PaintbrushIcon'
  }
];

export const sidebarItems: SidebarItem[] = [
  {
    id: '1',
    name: 'Profile',
    icon: 'UserIcon',
    path: '/profile'
  },
  {
    id: '2',
    name: 'Dashboard',
    icon: 'LayoutDashboardIcon',
    path: '/dashboard'
  },
  {
    id: '3',
    name: 'Insight',
    icon: 'LineChartIcon',
    path: '/insight'
  },
  {
    id: '4',
    name: 'JobList',
    icon: 'ClipboardListIcon',
    path: '/jobist'
  },
  {
    id: '5',
    name: 'Logout',
    icon: 'LogOutIcon',
    path: '/'
  }
];

export const popularJobs = [
  'Graphics Designer',
  'React Developer',
  'Frontend',
  'Backend',
  'Marketing'
];