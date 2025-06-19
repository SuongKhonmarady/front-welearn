import Hero from "./components/Hero";
// import TeamWork from "./components/TeamWork";
// import WhoWeAre from "./components/WhoWeAre";
import WhyYouChoose from "./components/WhyYouChoose";
import LatestScholarships from "./components/LatestScholarships";

export default function Homepage() {
  
  return (
    <div className="space-y-10">
      <Hero />
      <LatestScholarships />
      <WhyYouChoose/>
      {/* <WhoWeAre/> */}
      {/* <TeamWork/> */}
    </div>
  );
}
