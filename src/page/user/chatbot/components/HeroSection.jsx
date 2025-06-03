export default function HeroSection() {

  return (
    <>
      {/* Hero Section */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-[#283d50] to-[#1e2d3d] rounded-full flex items-center justify-center shadow-lg">
            <span className="text-3xl">🤖</span>
          </div>
          <h1 className="text-4xl font-bold text-[#283d50]">
            AI Scholarship Assistant
          </h1>
        </div>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          Get personalized scholarship recommendations, application guidance, and answers to all your scholarship-related questions.
        </p>
      </div>
    </>
  );
}
