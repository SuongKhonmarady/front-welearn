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

  const getButtonIcon = () => {
    if (isExpired) {
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      );
    }
    return (
      <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    );
  };

  return (
    <div className="flex flex-col">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={`group flex justify-center items-center px-6 py-3 rounded-xl font-semibold transition-all duration-200 w-full text-center space-x-2 ${
          isExpired 
            ? 'bg-gray-200 text-gray-500 cursor-not-allowed shadow-sm' 
            : useOfficialLink
              ? 'bg-gradient-to-r from-[#283d50] to-blue-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
              : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
        } ${className || ''}`}
        onClick={(e) => isExpired && e.preventDefault()}
      >
        {getButtonIcon()}
        <span>{getButtonText()}</span>
        {!isExpired && (
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
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
