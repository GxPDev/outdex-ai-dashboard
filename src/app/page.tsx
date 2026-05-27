import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import HomeRest from "../components/HomeRest";
export default function Home() {
  return (
    <main className="bg-[#F4F8FB] text-[#0F172A]">
      <Navbar />
      <Hero />
      <HomeRest />
    </main>
  );
}
