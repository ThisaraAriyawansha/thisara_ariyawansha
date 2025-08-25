import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import ClientWrapper from "@/components/loading";
import Skill from "@/components/skill";
import Project from "@/components/Project";



export default function Home() {
  return (
    <ClientWrapper>
      <Navbar />
      <Hero />
      <Skill />
      <Project />
      <Footer />
    </ClientWrapper>
  );
}