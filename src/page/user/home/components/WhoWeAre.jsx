import team from "../../../../assets/img/team.png";

export default function WhoWeAre() {
  return (
    <div className="flex flex-col gap-5 bg-gradient-to-r from-blue-500">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <div className="md:w-1/3 hidden md:block">
          <img src={team} alt="" className="w-full h-full" />
        </div>
        <div className="flex flex-col gap-5 md:w-1/2 p-5">
          <h1 className="text-3xl font-semibold text-center">Who We Are</h1>
          <p className="text-white">
            We are a dedicated platform focused on connecting Cambodian students with educational opportunities worldwide. 
            Our mission is to make global scholarships accessible and manageable for every aspiring student. Through our 
            advanced tracking system and AI-powered recommendations, we simplify the scholarship search and application process.
          </p>
          <p className="text-white">
            Join thousands of students who have already discovered and secured scholarships through our platform. 
            From undergraduate to postgraduate opportunities, from local to international scholarships, 
            WeLearn is your comprehensive scholarship management companion.
          </p>
        </div>
      </div>
    </div>
  );
}
