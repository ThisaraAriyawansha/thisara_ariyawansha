import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      {/* Add more sections like About, Projects, Contact here */}
      <Footer />
    </div>
  );
}
