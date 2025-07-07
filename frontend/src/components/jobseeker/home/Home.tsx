import Stats from "./Stats";
import Hero from "./Hero";
import TrendingJobs from "./TrendingJobs";
import CallToAction from "./CallToAction";
import RecentJobs from "./RecentJobs";
import JobCategories from "./JobCategories";



export const HomePageJobSeeker = () => (
  <>
    <main className="flex-grow">
      <Hero/>
      <Stats />
      <TrendingJobs />
      <CallToAction />
      <RecentJobs />
      <JobCategories />
    </main>
  </>
);