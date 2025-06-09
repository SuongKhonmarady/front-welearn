import moment from "moment";
import PropTypes from 'prop-types';

const HeroSection = ({ scholarship, onBackClick, daysUntilDeadline, isExpired }) => {
  return (
    <div className="relative bg-gradient-to-r from-[#283d50] to-[#1e3a5f] overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="absolute inset-0 bg-pattern"></div>
      
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={onBackClick}
          className="inline-flex items-center text-white/90 hover:text-white mb-6 transition-colors duration-200 group"
        >
          <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Scholarships
        </button>

        {/* Header Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                    {scholarship.title || 'Untitled Scholarship'}
                  </h1>
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium">Deadline: {moment(scholarship.deadline).format('MMMM Do, YYYY')}</span>
                </div>
                {scholarship.post_at && (
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Posted {moment(scholarship.post_at).format('MMM DD, YYYY')}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-4">
              <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
                isExpired 
                  ? 'bg-red-100 text-red-700 border-2 border-red-200' 
                  : 'bg-green-100 text-green-700 border-2 border-green-200'
              }`}>
                <div className={`w-2 h-2 rounded-full mr-2 ${
                  isExpired ? 'bg-red-500' : 'bg-green-500'
                }`}></div>
                {isExpired 
                  ? 'Application Closed' 
                  : `${daysUntilDeadline} days remaining`
                }
              </div>
              
              {/* Quick Action Buttons */}
              <div className="flex gap-2">
                {scholarship.official_link ? (
                  <a
                    href={scholarship.official_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Apply Now
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                ) : null}
                
                <button className="inline-flex items-center px-4 py-3 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors duration-200 shadow-sm">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>  );
};

HeroSection.propTypes = {
  scholarship: PropTypes.shape({
    title: PropTypes.string,
    deadline: PropTypes.string,
    post_at: PropTypes.string,
    official_link: PropTypes.string,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,
  daysUntilDeadline: PropTypes.number.isRequired,
  isExpired: PropTypes.bool.isRequired,
};

export default HeroSection;
