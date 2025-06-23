import PropTypes from 'prop-types';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

export default function ScholarshipCard({ scholarship }) {
  const navigate = useNavigate();
  
  const {
    title,
    description,
    deadline,
    host_university,
    host_country,
    country,
    degree_offered,
    program_duration
  } = scholarship;

  // Format deadline
  const formattedDeadline = moment(deadline).format('MMM DD, YYYY');
  
  // Calculate days until deadline
  const daysUntilDeadline = moment(deadline).diff(moment(), 'days');
  const isExpiring = daysUntilDeadline <= 30;
  const isExpired = daysUntilDeadline < 0;
  
  // Determine display values with fallbacks
  const displayTitle = title || description?.substring(0, 60) || "Scholarship Opportunity";
  const displayUniversity = host_university || "Various Universities";
  const displayCountry = host_country || country || "International";
  const displayDegree = degree_offered || "All Levels";

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 h-full flex flex-col">
      {/* Card Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-1">
            {displayTitle}
          </h3>
          <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${
            isExpired 
              ? 'bg-red-100 text-red-700' 
              : isExpiring 
                ? 'bg-amber-100 text-amber-700' 
                : 'bg-green-100 text-green-700'
          }`}>
            {isExpired ? (
              <>
                <div className="w-2 h-2 bg-red-500 rounded-full mr-1"></div>
                Closed
              </>
            ) : isExpiring ? (
              <>
                <div className="w-2 h-2 bg-amber-500 rounded-full mr-1"></div>
                {daysUntilDeadline}d left
              </>
            ) : (
              <>
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                Open
              </>
            )}
          </div>        </div>
        
        {/* Degree Badge - Only show if degree is available */}
        {degree_offered && (
          <div className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            🎓 {displayDegree}
          </div>
        )}
      </div>
      
      {/* Card Content */}
      <div className="p-4 flex-grow">
        <div className="space-y-3">
          {/* University */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-gray-500 font-medium">University</p>
              <p className="text-sm font-medium text-gray-900 truncate">{displayUniversity}</p>
            </div>
          </div>
          
          {/* Location */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-gray-500 font-medium">Location</p>
              <p className="text-sm font-medium text-gray-900">{displayCountry}</p>
            </div>
          </div>
          
          {/* Deadline */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs text-gray-500 font-medium">Deadline</p>
              <p className="text-sm font-medium text-gray-900">{formattedDeadline}</p>
            </div>
          </div>
          
          {/* Duration (if available) */}
          {program_duration && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-500 font-medium">Duration</p>
                <p className="text-sm font-medium text-gray-900">{program_duration}</p>
              </div>
            </div>
          )}
        </div>
      </div>      {/* Card Footer */}
      <div className="p-4 pt-0 mt-auto">
        <button
          onClick={() => navigate(`/scholarship/${scholarship.id}`)}
          className="w-full bg-slate-800 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-slate-700 transition-colors duration-200 flex items-center justify-center gap-2 text-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          View Details
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>      </div>
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
