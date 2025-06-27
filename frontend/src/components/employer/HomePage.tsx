import Header from "../layout/Header";
import Footer from "../layout/Footer";
import Hero from "./home/Hero";
import Stats from "./home/Stats";
import TrendingJobs from "./home/TrendingJobs";
import JobCategories from "./home/JobCategories";
import RecentJobs from "./home/RecentJobs";
import CallToAction from "./home/CallToAction";



export default function HomePageEmployer() {
  return (
    <>
      <Header />
      <main className="flex-grow">
        <Hero />
        <Stats />
        <TrendingJobs />
        <CallToAction />
        <RecentJobs />
        <JobCategories />
      </main>
      <Footer />
    </>
  )
}