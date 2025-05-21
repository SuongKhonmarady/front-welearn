import PropTypes from 'prop-types';
import moment from 'moment';

export default function ApplyButton({ deadline, officialLink, fallbackLink, className }) {
  // Calculate days until deadline
  const daysUntilDeadline = moment(deadline).diff(moment(), 'days');
  const isExpired = daysUntilDeadline < 0;
  
  // Determine which link to use and what button text to display
  const useOfficialLink = !!officialLink;
  const useSourceLink = !officialLink && !!fallbackLink;
  const link = officialLink || fallbackLink;
  
  // Button text based on link type and deadline status
  const getButtonText = () => {
    if (isExpired) return 'Deadline Passed';
    if (useOfficialLink) return 'Apply Official';
    if (useSourceLink) return 'Source Link';
    return 'Apply Now';
  };

  return (
    <div className="flex flex-col">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex justify-center items-center px-4 py-2 rounded-md ${
          isExpired 
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
            : useOfficialLink
              ? 'bg-[#283d50] text-white hover:bg-[#1e2d3d]'
              : 'bg-blue-600 text-white hover:bg-blue-700'
        } transition-colors w-full text-center ${className || ''}`}
        onClick={(e) => isExpired && e.preventDefault()}
      >
        {getButtonText()}
        {!isExpired && (
          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        )}
      </a>
    </div>
  );
}

ApplyButton.propTypes = {
  deadline: PropTypes.string.isRequired,
  officialLink: PropTypes.string,
  fallbackLink: PropTypes.string,
  className: PropTypes.string
};
