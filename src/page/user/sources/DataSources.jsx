import { Helmet } from 'react-helmet-async';

const DataSources = () => {
  return (
    <>
      <Helmet>
        <title>Data Sources & Credits - OpenScholarships</title>
        <meta name="description" content="Data sources and credits for scholarship information on OpenScholarships platform" />
        <meta name="robots" content="index, follow" />
      </Helmet>
        <div className="bg-gray-50 py-6 sm:py-12 -mx-5 -mt-5">
        <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#283d50] mb-6 sm:mb-8">Data Sources & Credits</h1>
            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
              <strong>Last updated:</strong> {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>{/* Introduction */}
            <section className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-[#283d50] mb-3 sm:mb-4">About Our Data Sources</h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">
                OpenScholarships aggregates scholarship information from various public sources to provide students with a comprehensive database of educational opportunities. We believe in transparency and giving proper credit to the organizations and websites that make this information available.
              </p>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                All scholarship data is collected from publicly available sources. We do not claim ownership of this information and encourage users to visit the original sources for the most up-to-date details and application procedures.
              </p>
            </section>

            {/* Primary Data Sources */}
            <section className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-[#283d50] mb-3 sm:mb-4">🌟 Primary Data Sources</h2>
              <div className="space-y-4 sm:space-y-6">
                <div className="border-2 border-blue-200 rounded-lg p-4 sm:p-6 bg-blue-50">
                  <h3 className="text-lg sm:text-xl font-semibold text-blue-800 mb-2 sm:mb-3">Opportunities Corners</h3>
                  <p className="text-sm sm:text-base text-blue-700 mb-3">
                    A comprehensive platform providing scholarship opportunities and educational funding information for students worldwide.
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <a 
                      href="https://opportunitiescorners.com/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-sm sm:text-base text-blue-600 hover:text-blue-800 font-medium hover:underline break-all"
                    >
                      📖 Visit opportunitiescorners.com
                    </a>
                    <span className="text-xs sm:text-sm text-blue-600 bg-blue-100 px-2 sm:px-3 py-1 rounded-full self-start sm:self-auto">
                      Primary Source
                    </span>
                  </div>
                </div>

                <div className="border-2 border-green-200 rounded-lg p-4 sm:p-6 bg-green-50">
                  <h3 className="text-lg sm:text-xl font-semibold text-green-800 mb-2 sm:mb-3">Scholarships Corner</h3>
                  <p className="text-sm sm:text-base text-green-700 mb-3">
                    Dedicated scholarship information website offering detailed scholarship listings, application guidance, and educational opportunities.
                  </p>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <a 
                      href="https://scholarshipscorner.website/" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-sm sm:text-base text-green-600 hover:text-green-800 font-medium hover:underline break-all"
                    >
                      📖 Visit scholarshipscorner.website
                    </a>
                    <span className="text-xs sm:text-sm text-green-600 bg-green-100 px-2 sm:px-3 py-1 rounded-full self-start sm:self-auto">
                      Primary Source
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gray-100 rounded-lg">
                <p className="text-xs sm:text-sm text-gray-700">
                  <strong>Note:</strong> These are our primary data sources. We regularly scrape publicly available scholarship information from these platforms to keep our database current and comprehensive.
                </p>
              </div>
            </section>            {/* Government Sources */}
            <section className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-[#283d50] mb-3 sm:mb-4">🏛️ Government & Official Sources</h2>
              <div className="space-y-3 sm:space-y-4">
                <div className="border-l-4 border-blue-500 pl-3 sm:pl-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">U.S. Department of Education</h3>
                  <p className="text-sm sm:text-base text-gray-600">Federal student aid and scholarship information</p>
                  <a href="https://studentaid.gov" target="_blank" rel="noopener noreferrer" className="text-sm sm:text-base text-blue-600 hover:underline break-all">
                    studentaid.gov
                  </a>
                </div>
                
                <div className="border-l-4 border-green-500 pl-3 sm:pl-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">Fulbright Commission</h3>
                  <p className="text-sm sm:text-base text-gray-600">International exchange and scholarship programs</p>
                  <a href="https://fulbrightcommission.org" target="_blank" rel="noopener noreferrer" className="text-sm sm:text-base text-blue-600 hover:underline break-all">
                    fulbrightcommission.org
                  </a>
                </div>
              </div>
            </section>

            {/* University Sources */}
            <section className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-[#283d50] mb-3 sm:mb-4">🎓 University & Educational Institution Sources</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                <div className="border border-gray-200 rounded-lg p-3 sm:p-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Major Universities</h3>
                  <ul className="text-sm sm:text-base text-gray-600 space-y-1">
                    <li>• Harvard University Scholarship Office</li>
                    <li>• Stanford University Financial Aid</li>
                    <li>• MIT Student Financial Services</li>
                    <li>• Oxford University Funding</li>
                    <li>• Cambridge University Scholarships</li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-3 sm:p-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Educational Platforms</h3>
                  <ul className="text-sm sm:text-base text-gray-600 space-y-1">
                    <li>• College Board Scholarship Search</li>
                    <li>• University websites and portals</li>
                    <li>• Educational institution databases</li>
                    <li>• Academic consortium websites</li>
                  </ul>
                </div>
              </div>
            </section>            {/* Foundation Sources */}
            <section className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-[#283d50] mb-3 sm:mb-4">🏢 Foundation & Organization Sources</h2>
              <div className="space-y-3 sm:space-y-4">
                <div className="border-l-4 border-purple-500 pl-3 sm:pl-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">Gates Foundation</h3>
                  <p className="text-sm sm:text-base text-gray-600">Educational opportunity and scholarship programs</p>
                </div>
                
                <div className="border-l-4 border-orange-500 pl-3 sm:pl-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">Rhodes Trust</h3>
                  <p className="text-sm sm:text-base text-gray-600">Rhodes Scholarship and related programs</p>
                </div>
                
                <div className="border-l-4 border-red-500 pl-3 sm:pl-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">Various Private Foundations</h3>
                  <p className="text-sm sm:text-base text-gray-600">Corporate scholarships, community foundations, and private donors</p>
                </div>
              </div>
            </section>

            {/* Data Collection Notice */}
            <section className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-[#283d50] mb-3 sm:mb-4">📊 Data Collection & Updates</h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 sm:p-6">
                <h3 className="text-base sm:text-lg font-semibold text-blue-800 mb-2 sm:mb-3">How We Collect Data</h3>
                <ul className="text-sm sm:text-base text-blue-700 space-y-2">
                  <li>• <strong>Automated Web Scraping:</strong> We use Python-based automated tools to collect publicly available scholarship information</li>
                  <li>• <strong>GitHub Actions Automation:</strong> Our scraping system runs on scheduled intervals using GitHub Actions</li>
                  <li>• <strong>Primary Sources:</strong> Currently scraping from Opportunities Corners and Scholarships Corner websites</li>
                  <li>• <strong>Regular Updates:</strong> Our database is updated automatically to ensure current information</li>
                  <li>• <strong>Quality Control:</strong> We verify and clean data to provide accurate scholarship details</li>
                  <li>• <strong>Source Attribution:</strong> All scholarships maintain links back to their original sources</li>
                </ul>
              </div>
              
              <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <h4 className="text-sm sm:text-base font-semibold text-yellow-800 mb-2">🔄 Update Frequency</h4>
                <p className="text-xs sm:text-sm text-yellow-700">
                  Our automated scraping system checks for new scholarships and updates existing information regularly through scheduled GitHub Actions workflows.
                </p>
              </div>
            </section>            {/* Disclaimer */}
            <section className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-[#283d50] mb-3 sm:mb-4">⚠️ Important Disclaimer</h2>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 sm:p-6">
                <ul className="text-sm sm:text-base text-gray-700 space-y-2 sm:space-y-3">
                  <li>• <strong>Information Accuracy:</strong> While we strive for accuracy, scholarship details may change. Always verify information on the original source website.</li>
                  <li>• <strong>Application Process:</strong> Apply directly through the original scholarship provider&rsquo;s website, not through OpenScholarships.</li>
                  <li>• <strong>Eligibility:</strong> Scholarship eligibility requirements are set by the original providers, not by OpenScholarships.</li>
                  <li>• <strong>Contact:</strong> For specific scholarship questions, contact the original scholarship provider directly.</li>
                </ul>
              </div>
            </section>

            {/* Copyright Notice */}
            <section className="mb-6 sm:mb-8">
              <h2 className="text-xl sm:text-2xl font-semibold text-[#283d50] mb-3 sm:mb-4">📝 Copyright & Attribution</h2>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">
                All scholarship information remains the property of its original publishers. OpenScholarships serves as an aggregation platform to help students discover opportunities more easily.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="border border-blue-200 rounded-lg p-3 sm:p-4">
                  <h4 className="text-sm sm:text-base font-semibold text-blue-800 mb-2">Opportunities Corners</h4>
                  <p className="text-xs sm:text-sm text-gray-600 mb-2">We respect and acknowledge the original content and scholarship listings from opportunitiescorners.com</p>
                  <p className="text-xs text-blue-600">All rights remain with the original publisher</p>
                </div>
                
                <div className="border border-green-200 rounded-lg p-3 sm:p-4">
                  <h4 className="text-sm sm:text-base font-semibold text-green-800 mb-2">Scholarships Corner</h4>
                  <p className="text-xs sm:text-sm text-gray-600 mb-2">We respect and acknowledge the original content and scholarship listings from scholarshipscorner.website</p>
                  <p className="text-xs text-green-600">All rights remain with the original publisher</p>
                </div>
              </div>
              
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">
                If you are a representative from Opportunities Corners, Scholarships Corner, or any other scholarship provider and would like your information removed or updated, please contact us immediately.
              </p>
              <div className="bg-gray-100 p-3 sm:p-4 rounded-lg">
                <p className="text-sm sm:text-base text-gray-700 mb-2"><strong>Contact for Data Issues:</strong></p>
                <p className="text-sm sm:text-base text-gray-700">Email: data@openscholarships.me</p>
                <p className="text-sm sm:text-base text-gray-700">Response Time: Within 48 hours</p>
                <p className="text-xs sm:text-sm text-gray-700 mt-2">We will promptly address any concerns from original content publishers.</p>
              </div>
            </section>

            {/* Respect Notice */}
            <section className="bg-green-50 border border-green-200 rounded-lg p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-semibold text-green-800 mb-3 sm:mb-4">🙏 Our Commitment</h2>
              <p className="text-sm sm:text-base text-green-700 leading-relaxed mb-3 sm:mb-4">
                We respect the intellectual property and terms of service of all data sources. Our goal is to help students access educational opportunities while maintaining ethical data practices.
              </p>
              <ul className="text-sm sm:text-base text-green-700 space-y-2">
                <li>• We follow robots.txt guidelines</li>
                <li>• We implement respectful crawling practices</li>
                <li>• We provide proper attribution and links</li>
                <li>• We respond promptly to removal requests</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default DataSources;
