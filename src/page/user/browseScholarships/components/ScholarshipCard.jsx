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
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full flex flex-col">
      {/* Gradient Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 to-purple-50/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Card Header with Status and Degree */}
      <div className="relative bg-gradient-to-r from-slate-50 to-blue-50 px-6 py-4 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
            <span className="text-sm font-semibold bg-blue-100 text-blue-800 py-2 px-3 rounded-full">
              {displayDegree}
            </span>
          </div>
          <div className={`flex items-center space-x-1 text-xs font-bold py-2 px-3 rounded-full ${
            isExpired 
              ? 'bg-red-100 text-red-700' 
              : isExpiring 
                ? 'bg-amber-100 text-amber-700' 
                : 'bg-green-100 text-green-700'
          }`}>
            {isExpired ? (
              <>
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>Expired</span>
              </>
            ) : isExpiring ? (
              <>
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>{daysUntilDeadline} days</span>
              </>
            ) : (
              <>
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Open</span>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Card Content */}
      <div className="relative p-6 flex-grow">
        <h3 className="text-xl font-bold text-[#283d50] mb-4 line-clamp-2 group-hover:text-blue-700 transition-colors duration-200">
          {displayTitle}
        </h3>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center group/item">
            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3 group-hover/item:bg-blue-200 transition-colors duration-200">
              <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div className="flex-grow min-w-0">
              <p className="text-sm text-gray-500 font-medium">University</p>
              <p className="text-base font-semibold text-gray-900 truncate">{displayUniversity}</p>
            </div>
          </div>
          
          <div className="flex items-center group/item">
            <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3 group-hover/item:bg-green-200 transition-colors duration-200">
              <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h.5A2.5 2.5 0 0020 5.5v-1.5" />
              </svg>
            </div>
            <div className="flex-grow min-w-0">
              <p className="text-sm text-gray-500 font-medium">Location</p>
              <p className="text-base font-semibold text-gray-900">{displayCountry}</p>
            </div>
          </div>
          
          <div className="flex items-center group/item">
            <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3 group-hover/item:bg-purple-200 transition-colors duration-200">
              <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex-grow min-w-0">
              <p className="text-sm text-gray-500 font-medium">Deadline</p>
              <p className="text-base font-semibold text-gray-900">{formattedDeadline}</p>
            </div>
          </div>
          
          {program_duration && (
            <div className="flex items-center group/item">
              <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-3 group-hover/item:bg-orange-200 transition-colors duration-200">
                <svg className="w-5 h-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-grow min-w-0">
                <p className="text-sm text-gray-500 font-medium">Duration</p>
                <p className="text-base font-semibold text-gray-900">{displayDuration}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Card Footer */}
      <div className="relative p-6 pt-0 mt-auto">
        <button
          onClick={() => navigate(`/scholarship/${scholarship.id}`)}
          className="w-full bg-gradient-to-r from-[#283d50] to-blue-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2 group/button"
        >
          <svg className="w-5 h-5 group-hover/button:rotate-12 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>View Details</span>
          <svg className="w-4 h-4 group-hover/button:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>

      {/* Hover Effects */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
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
