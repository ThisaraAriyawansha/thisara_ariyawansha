import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import ClientWrapper from "@/components/loading";
import Skill from "@/components/skill";


export default function Home() {
  return (
    <ClientWrapper>
      <Navbar />
      <Hero />
      <Skill />
      <Footer />
    </ClientWrapper>
  );
}