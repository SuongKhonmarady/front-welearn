import PropTypes from "prop-types";
import moment from "moment";

const ScholarshipDetailModal = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  const daysUntilDeadline = moment(data.deadline).diff(moment(), 'days');
  const isExpired = daysUntilDeadline < 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative transform transition-all">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="space-y-6">
          {/* Header */}
          <div>
            <h2 className="text-2xl font-bold text-[#283d50] mb-2">{data.description}</h2>
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
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

          {/* Key Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Deadline</h3>
                <p className="mt-1 text-lg font-medium text-[#283d50]">
                  {moment(data.deadline).format('MMMM Do, YYYY')}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Posted On</h3>
                <p className="mt-1 text-lg font-medium text-[#283d50]">
                  {moment(data.post_at).format('MMMM Do, YYYY')}
                </p>
              </div>
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

          {/* Action Button */}
          <div className="mt-8 text-center">
            <a
              href={data.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-[#283d50] hover:bg-[#1e2d3d] transition-colors duration-200"
            >
              Visit Official Page
              <svg className="ml-2 -mr-1 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

ScholarshipDetailModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.shape({
    description: PropTypes.string,
    deadline: PropTypes.string,
    post_at: PropTypes.string,
    university: PropTypes.string,
    country: PropTypes.string,
    eligibility: PropTypes.string,
    link: PropTypes.string,
  }),
};

export default ScholarshipDetailModal;
