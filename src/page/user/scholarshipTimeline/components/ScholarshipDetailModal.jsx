import PropTypes from "prop-types";
import moment from "moment";

const ScholarshipDetailModal = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  const daysUntilDeadline = moment(data.deadline).diff(moment(), 'days');
  const isExpired = daysUntilDeadline < 0;

  const handleScroll = (e) => {
    const element = e.target;
    const scrollTop = element.scrollTop;
    const scrollHeight = element.scrollHeight;
    const clientHeight = element.clientHeight;

    const topIndicator = document.getElementById('scroll-top-indicator');
    const bottomIndicator = document.getElementById('scroll-bottom-indicator');

    if (topIndicator) {
      topIndicator.style.opacity = scrollTop > 20 ? '1' : '0';
    }
    if (bottomIndicator) {
      bottomIndicator.style.opacity = (scrollHeight - scrollTop - clientHeight) > 20 ? '1' : '0';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] p-8 relative transform transition-all overflow-hidden flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 z-10"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>        {/* Scroll Indicators */}
        <div 
          id="scroll-top-indicator" 
          className="absolute top-4 right-12 bg-white rounded-full shadow-lg opacity-0 transition-opacity duration-200 pointer-events-none z-10 p-1"
        >
          <div className="animate-bounce">
            <svg className="w-5 h-5 text-[#283d50]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        <div 
          id="scroll-bottom-indicator" 
          className="absolute bottom-20 right-12 bg-white rounded-full shadow-lg opacity-0 transition-opacity duration-200 pointer-events-none z-10 p-1"
        >
          <div className="animate-bounce">
            <svg className="w-5 h-5 text-[#283d50]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 111.414 1.414l-4 4a1 1 01-1.414 0l-4-4a1 1 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        <div className="overflow-y-auto flex-1 -mr-4 pr-4" onScroll={handleScroll}>
          <div className="space-y-6">
            {/* Header */}
            <div className="border-b border-gray-200 pb-4">
              <h2 className="text-xl font-bold text-[#283d50] mb-2">{data.title}</h2>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Deadline: {moment(data.deadline).format('MMMM Do, YYYY')}</span>
                <span>•</span>
                <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                  isExpired 
                    ? 'bg-red-100 text-red-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {isExpired 
                    ? 'Expired' 
                    : `${daysUntilDeadline} days remaining`
                  }
                </div>
              </div>
            </div>
            
            {/* Description */}
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Description</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{data.description}</p>
            </div>

            {/* Key Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Posted On</h3>
                  <p className="mt-1 text-lg font-medium text-[#283d50]">
                    {moment(data.post_at).format('MMMM Do, YYYY')}
                  </p>
                </div>

                {data.host_country && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Host Country</h3>
                    <p className="mt-1 text-lg font-medium text-[#283d50]">{data.host_country}</p>
                  </div>
                )}

                {data.program_duration && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Program Duration</h3>
                    <p className="mt-1 text-lg font-medium text-[#283d50]">{data.program_duration}</p>
                  </div>
                )}

                {data.degree_offered && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Degree Offered</h3>
                    <p className="mt-1 text-lg font-medium text-[#283d50]">{data.degree_offered}</p>
                  </div>
                )}

                {data.country && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Country</h3>
                    <p className="mt-1 text-lg font-medium text-[#283d50]">{data.country}</p>
                  </div>
                )}
              </div>
              <div className="space-y-4">
                {data.university && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">University</h3>
                    <p className="mt-1 text-lg font-medium text-[#283d50]">{data.university}</p>
                  </div>
                )}
                {data.eligibility && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Eligibility</h3>
                    <p className="mt-1 text-base text-gray-700">{data.eligibility}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>        {/* Action Buttons - Fixed at bottom */}
        <div className="mt-6 text-center pt-4 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {data.official_link ? (
              <a
                href={data.official_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-[#283d50] hover:bg-[#1e2d3d] transition-colors duration-200 w-full sm:w-auto justify-center"
              >
                Official Scholarship Link
                <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            ) : (
              <span className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-400 bg-gray-50 cursor-not-allowed w-full sm:w-auto justify-center">
                No Official Link Available
              </span>
            )}
            {data.link ? (
              <a
                href={data.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 border border-[#283d50] text-base font-medium rounded-lg text-[#283d50] hover:bg-gray-50 transition-colors duration-200 w-full sm:w-auto justify-center"
              >
                Source Information Link
                <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            ) : (
              <span className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-400 bg-gray-50 cursor-not-allowed w-full sm:w-auto justify-center">
                No Source Link Available
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

ScholarshipDetailModal.propTypes = {  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,  data: PropTypes.shape({    title: PropTypes.string,
    description: PropTypes.string,
    deadline: PropTypes.string,
    post_at: PropTypes.string,
    university: PropTypes.string,    country: PropTypes.string,
    eligibility: PropTypes.string,
    official_link: PropTypes.string,
    link: PropTypes.string,
    source_link: PropTypes.string,
    host_country: PropTypes.string,
    program_duration: PropTypes.string,
    degree_offered: PropTypes.string,
  }),
};

export default ScholarshipDetailModal;
