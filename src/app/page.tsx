import Header from "./components/Header";
import Hero from "./components/Hero";
import Capabilities from "./components/Capabilities";
import Process from "./components/Process";
import ProjectGrid from "./components/ProjectGrid";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Capabilities />
      <Process />
      <ProjectGrid />
      <Contact />
      <Footer />
    </div>
  );
}
