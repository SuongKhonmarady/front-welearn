import dog from "../../../../assets/img/Hero.png";

export default function Hero() {
  return (
    <div className="w-full flex flex-col md:flex-row items-center">
      <div className="flex flex-col gap-5 p-5 md:w-1/2">
        <h1 className="text-4xl font-bold text-[#283d50]">
          Your Gateway to Global <br /> Educational Opportunities
        </h1>
        <p className="text-gray-600 text-lg">
          Welcome to WeLearn - your dedicated platform for discovering and tracking global scholarship opportunities. 
          Our AI-powered system helps you find, track, and apply for scholarships worldwide. Never miss a deadline 
          and find the perfect funding opportunity for your educational journey.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <a href="/scholarship" className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-[#283d50] hover:bg-[#1e2d3d] transition-colors duration-200">
            Explore Scholarships
          </a>
          <a href="/authentication" className="inline-flex items-center justify-center px-6 py-3 border border-[#283d50] text-base font-medium rounded-lg text-[#283d50] hover:bg-gray-50 transition-colors duration-200">
            Get Started
          </a>
        </div>
      </div>
      <div className="hidden md:flex flex-col p-5 w-1/2">
        <img src={dog} alt="heroImage" className="w-[500px] mx-auto" />
      </div>
    </div>
  );
}
