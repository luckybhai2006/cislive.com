import Hero from "../components/sections/Hero";
import WhyUs from "../components/sections/WhyUs";
import Services from "../components/sections/Services";
import IndustryWideSolution from "../components/sections/IndustryWideSolution";
import Journey from "../components/sections/Journey";
import TechStack from "../components/sections/TechStack";
import CreativeWork from "../components/sections/CreativeWork";
import HowWeDo from "../components/sections/HowWeDo";
import Testimonials from "../components/sections/Testimonials";

export default function Home() {
  return (
    <main>
      <Hero />
      <WhyUs />
      <Services />
      <IndustryWideSolution />
      <Journey />
      <TechStack />
      <CreativeWork />
      <HowWeDo />
      <Testimonials />
    </main>
  );
}
