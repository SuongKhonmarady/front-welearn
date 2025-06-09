import PropTypes from 'prop-types';
// import './ScholarshipDetailsCard.css';

const ScholarshipDetailsCard = ({ scholarship }) => {  return (
    <div className="scholarship-card bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden lg:sticky lg:top-8 self-start transition-all duration-700 hover:shadow-3xl hover:scale-[1.02] group backdrop-blur-sm bg-white/95">
      {/* Quick Information Section */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-10 relative overflow-hidden">
        {/* Enhanced Background decoration */}
        <div className="floating-decoration absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20 blur-sm"></div>
        <div className="floating-decoration absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 -translate-x-16 blur-sm" style={{animationDelay: '2s'}}></div>
        <div className="floating-decoration absolute top-1/2 left-1/2 w-24 h-24 bg-white/5 rounded-full -translate-x-12 -translate-y-12 blur-lg" style={{animationDelay: '4s'}}></div>
          <div className="relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="pulse-glow w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20 shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white drop-shadow-sm">Scholarship Overview</h3>
              <p className="text-indigo-100 text-sm font-medium mt-1">Complete information at a glance</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-8 bg-gradient-to-b from-gray-50/50 to-white">
        {/* Quick Info Section */}
        <div className="space-y-6">
          <h4 className="text-lg font-bold text-gray-900 flex items-center">
            <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mr-2">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            Key Details
          </h4>
          
          <div className="space-y-4">
            {(scholarship.host_country || scholarship.country) && (
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-blue-100 hover:border-blue-200 transition-all duration-300 hover:shadow-md group/item">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover/item:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h.5A2.5 2.5 0 0020 5.5v-1.5" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h5 className="font-bold text-gray-900 text-sm uppercase tracking-wide mb-1">Study Location</h5>
                  <p className="text-gray-700 font-medium text-lg">{scholarship.host_country || scholarship.country}</p>
                </div>
              </div>
            )}

            {(scholarship.university || scholarship.host_university) && (
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-emerald-100 hover:border-emerald-200 transition-all duration-300 hover:shadow-md group/item">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover/item:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h5 className="font-bold text-gray-900 text-sm uppercase tracking-wide mb-1">Institution</h5>
                  <p className="text-gray-700 font-medium text-lg">{scholarship.university || scholarship.host_university}</p>
                </div>
              </div>
            )}

            {scholarship.degree_offered && (
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-purple-100 hover:border-purple-200 transition-all duration-300 hover:shadow-md group/item">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover/item:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h5 className="font-bold text-gray-900 text-sm uppercase tracking-wide mb-1">Degree Level</h5>
                  <p className="text-gray-700 font-medium text-lg">{scholarship.degree_offered}</p>
                </div>
              </div>
            )}

            {scholarship.program_duration && (
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-amber-100 hover:border-amber-200 transition-all duration-300 hover:shadow-md group/item">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover/item:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h5 className="font-bold text-gray-900 text-sm uppercase tracking-wide mb-1">Duration</h5>
                  <p className="text-gray-700 font-medium text-lg">{scholarship.program_duration}</p>
                </div>
              </div>
            )}

            {scholarship.provider && (
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-rose-100 hover:border-rose-200 transition-all duration-300 hover:shadow-md group/item">
                <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover/item:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h5 className="font-bold text-gray-900 text-sm uppercase tracking-wide mb-1">Provider</h5>
                  <p className="text-gray-700 font-medium text-lg">{scholarship.provider}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Section */}
        <div className="border-t border-gray-200 pt-8">
          <h4 className="text-lg font-bold text-gray-900 flex items-center mb-6">
            <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-lg flex items-center justify-center mr-2">
              <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            Take Action
          </h4>
          <div className="space-y-4">
            {scholarship.official_link ? (
              <a
                href={scholarship.official_link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Apply Now
              </a>
            ) : (scholarship.link || scholarship.source_link) ? (
              <a
                href={scholarship.link || scholarship.source_link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center px-6 py-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-semibold rounded-2xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                View Details
              </a>
            ) : (
              <div className="w-full inline-flex items-center justify-center px-6 py-4 bg-gray-100 text-gray-400 font-semibold rounded-2xl cursor-not-allowed">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
                </svg>
                No Link Available
              </div>
            )}

            {(scholarship.link && scholarship.official_link) || (scholarship.source_link && (scholarship.official_link || scholarship.link)) ? (
              <a
                href={scholarship.link || scholarship.source_link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center px-6 py-3 border-2 border-indigo-200 text-indigo-600 font-medium rounded-2xl hover:bg-indigo-50 transition-all duration-300"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {scholarship.source_link ? 'Source Information' : 'Additional Info'}
              </a>
            ) : null}

            <button className="w-full inline-flex items-center justify-center px-6 py-3 border-2 border-gray-200 text-gray-700 font-medium rounded-2xl hover:bg-gray-50 transition-colors duration-300">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

ScholarshipDetailsCard.propTypes = {
  scholarship: PropTypes.shape({
    host_country: PropTypes.string,
    country: PropTypes.string,
    university: PropTypes.string,
    host_university: PropTypes.string,
    degree_offered: PropTypes.string,
    program_duration: PropTypes.string,
    provider: PropTypes.string,
    description: PropTypes.string,
    eligibility: PropTypes.string,
    official_link: PropTypes.string,
    link: PropTypes.string,
    source_link: PropTypes.string,
  }).isRequired,
};

export default ScholarshipDetailsCard;
