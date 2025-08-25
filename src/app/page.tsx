import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import ClientWrapper from "@/components/loading";

export default function Home() {
  return (
    <ClientWrapper>
      <Navbar />
      <Hero />
      {/* Add more sections like About, Projects, Contact here */}
      <Footer />
    </ClientWrapper>
  );
}