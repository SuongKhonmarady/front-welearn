import Hero from "./components/Hero";
import TeamWork from "./components/TeamWork";
import WhoWeAre from "./components/WhoWeAre";
import WhyYouChoose from "./components/WhyYouChoose";

export default function Homepage() {
  
  return (
    <div className="space-y-10">
      <Hero />
      <WhyYouChoose/>
      <WhoWeAre/>
      <TeamWork/>
    </div>
  );
}
