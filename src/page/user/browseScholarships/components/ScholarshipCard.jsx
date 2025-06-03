import PropTypes from 'prop-types';
import moment from 'moment';
import ApplyButton from '../components/ApplyButton';

export default function ScholarshipCard({ scholarship }) {
  const {
    title,
    description,
    deadline,
    host_university,
    host_country,
    country,
    degree_offered,
    official_link,
    program_duration
  } = scholarship;

  // Format deadline
  const formattedDeadline = moment(deadline).format('DD MMM YYYY');
  
  // Calculate days until deadline
  const daysUntilDeadline = moment(deadline).diff(moment(), 'days');
  const isExpiring = daysUntilDeadline <= 30;
  const isExpired = daysUntilDeadline < 0;
  
  // Determine display values with fallbacks
  const displayTitle = title || description?.substring(0, 60) || "Scholarship Opportunity";
  const displayUniversity = host_university || "Various Universities";
  const displayCountry = host_country || country || "International";
  const displayDegree = degree_offered || "All Levels";
  const displayDuration = program_duration || "Duration not specified";

  return (
    <div className="flex flex-col bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300 h-full">
      {/* Card Header with Degree & Deadline Status */}
      <div className="bg-[#f8fafc] px-4 py-2 border-b border-gray-100 flex justify-between items-center">
        <span className="text-sm font-medium bg-blue-100 text-blue-800 py-1 px-2 rounded-full">
          {displayDegree}
        </span>
        <span className={`text-xs font-medium py-1 px-2 rounded-full 
          ${isExpired 
            ? 'bg-red-100 text-red-800' 
            : isExpiring 
              ? 'bg-amber-100 text-amber-800' 
              : 'bg-green-100 text-green-800'
          }`}>
          {isExpired 
            ? 'Expired' 
            : isExpiring 
              ? `${daysUntilDeadline} days left` 
              : 'Open'
          }
        </span>
      </div>
      
      {/* Card Content */}
      <div className="p-5 flex-grow">
        <h3 className="text-lg font-bold text-[#283d50] mb-3 line-clamp-2">
          {displayTitle}
        </h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center">
            <svg className="w-4 h-4 text-gray-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span className="text-sm text-gray-600 truncate">{displayUniversity}</span>
          </div>
          
          <div className="flex items-center">
            <svg className="w-4 h-4 text-gray-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h.5A2.5 2.5 0 0020 5.5v-1.5" />
            </svg>
            <span className="text-sm text-gray-600">{displayCountry}</span>
          </div>
          
          <div className="flex items-center">
            <svg className="w-4 h-4 text-gray-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm text-gray-600">
              Deadline: {formattedDeadline}
            </span>
          </div>
          
          {program_duration && (
            <div className="flex items-center">
              <svg className="w-4 h-4 text-gray-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm text-gray-600">{displayDuration}</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Card Footer with Apply Button */}
      <div className="p-4 border-t border-gray-100 bg-gray-50">
        <ApplyButton 
          deadline={deadline}
          officialLink={official_link}
          fallbackLink={scholarship.link}
        />
      </div>
    </div>
  );
}

ScholarshipCard.propTypes = {
  scholarship: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    deadline: PropTypes.string.isRequired,
    host_university: PropTypes.string,
    host_country: PropTypes.string,
    country: PropTypes.string,
    degree_offered: PropTypes.string,
    program_duration: PropTypes.string,
    official_link: PropTypes.string,
    link: PropTypes.string
  }).isRequired
};
