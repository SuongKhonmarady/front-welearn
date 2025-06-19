import { Link } from 'react-router-dom';
import dog from "../../../../assets/img/scholarship.png";

export default function Hero() {
  return (
    <section className="w-full flex flex-col md:flex-row items-center py-8 px-4" role="banner" itemScope itemType="https://schema.org/WebPageElement">
      <div className="flex flex-col gap-5 p-5 md:w-1/2" itemScope itemType="https://schema.org/Article">
        <h1 className="text-4xl md:text-5xl font-bold text-[#283d50] leading-tight" itemProp="headline">
          Your Gateway to Global <br /> 
          <span className="text-[#2563eb]">Educational Opportunities</span> in 2025
        </h1>

        {/* Key Features List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-4">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium text-gray-700">100+ Global Scholarships</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium text-gray-700">Smart Deadline Tracking</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium text-gray-700">Application Management</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-sm font-medium text-gray-700">100% Free Platform</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <Link 
            to="/browse" 
            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-lg text-white bg-[#283d50] hover:bg-[#1e2d3d] transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            aria-label="Browse available scholarships and start your educational journey"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Browse Scholarships
          </Link>
          <Link 
            to="/scholarship-timeline" 
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-[#283d50] text-base font-medium rounded-lg text-[#283d50] hover:bg-[#283d50] hover:text-white transition-all duration-200"
            aria-label="View scholarship timeline and important deadlines"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            View Timeline
          </Link>
        </div>

      </div>
      <div className="hidden md:flex flex-col p-5 w-1/2 relative">
        <div className="relative">
          <img 
            src={dog} 
            alt="Happy students celebrating scholarship success - global education opportunities and funding" 
            className="w-[400px] mx-auto rounded-lg shadow-lg"
            loading="eager"
            width="400"
            height="300"
            itemProp="image"
          />
          {/* Floating Elements for Visual Appeal */}
          <div className="absolute -top-4 -right-4 bg-white rounded-full p-3 shadow-lg">
            <svg className="w-6 h-6 text-[#283d50]" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
          <div className="absolute -bottom-4 -left-4 bg-[#2563eb] rounded-full p-3 shadow-lg">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
