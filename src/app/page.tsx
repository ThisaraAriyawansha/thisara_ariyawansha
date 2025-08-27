import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import ClientWrapper from "@/components/loading";
import Skill from "@/components/skill";
import Project from "@/components/Project";
import Banner from "@/components/Banner";
import About from "@/components/About";





export default function Home() {
  return (
    <ClientWrapper>
      <Navbar />
      <Hero />
      <Banner />
      <Skill />
      <Project />
      <About />
      <Footer />
    </ClientWrapper>
  );
}