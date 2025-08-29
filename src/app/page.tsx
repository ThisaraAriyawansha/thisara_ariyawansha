import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import ClientWrapper from "@/components/loading";
import Skill from "@/components/skill";
import Project from "@/components/Project";
import Banner from "@/components/Banner";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Landing from "@/components/Landing";
import Innovation from "@/components/Innovation";
import Experience from "@/components/Experience";
import AboutMe from "@/components/AboutMe";
import ShowcaseSection from "@/components/ShowcaseSection";









export default function Home() {
  return (
    <ClientWrapper>
      <Navbar />
      <Hero />
      <Banner />
      <Skill />
      <Innovation />
      <ShowcaseSection />
      <Project />
      <Experience />
      <AboutMe />
      <About />
      <Contact />
      <Footer />
    </ClientWrapper>
  );
}