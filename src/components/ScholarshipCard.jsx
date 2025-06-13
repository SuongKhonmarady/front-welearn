import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function ScholarshipCard({ scholarship }) {
  const formatDate = (dateString) => {
    if (!dateString) return 'No deadline specified';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (error) {
      return 'Invalid date';
    }
  };

  const truncateText = (text, maxLength = 150) => {
    if (!text) return 'No description available';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  // Simple SVG icons as components
  const CalendarIcon = () => (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );

  const GlobeIcon = () => (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  const AcademicCapIcon = () => (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    </svg>
  );

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-200">
      <div className="space-y-4">
        {/* Title */}
        <h3 className="text-xl font-semibold text-[#283d50] line-clamp-2">
          {scholarship.title || 'Untitled Scholarship'}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed">
          {truncateText(scholarship.description)}
        </p>

        {/* Metadata */}
        <div className="space-y-2 text-sm text-gray-500">
          {scholarship.host_country && (
            <div className="flex items-center gap-2">
              <GlobeIcon />
              <span>{scholarship.host_country}</span>
            </div>
          )}

          {scholarship.degree_offered && (
            <div className="flex items-center gap-2">
              <AcademicCapIcon />
              <span>{scholarship.degree_offered}</span>
            </div>
          )}

          {scholarship.deadline && (
            <div className="flex items-center gap-2">
              <CalendarIcon />
              <span className="text-red-600 font-medium">
                Deadline: {formatDate(scholarship.deadline)}
              </span>
            </div>
          )}
        </div>        {/* Action Buttons */}
        <div className="flex flex-col gap-2 pt-4 border-t border-gray-100">
          {/* View Details Button - Always show if scholarship has an ID */}
          {scholarship.id && (
            <Link
              to={`/scholarship/${scholarship.id}`}
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200 text-center"
            >
              View Details
            </Link>
          )}
        </div>

        {/* Host University */}
        {scholarship.host_university && (
          <div className="text-xs text-gray-400 pt-2 border-t border-gray-50">
            <span className="font-medium">Host Institution:</span> {scholarship.host_university}
          </div>
        )}
      </div>
    </div>
  );
}

ScholarshipCard.propTypes = {
  scholarship: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    description: PropTypes.string,
    host_country: PropTypes.string,
    degree_offered: PropTypes.string,
    deadline: PropTypes.string,
    official_link: PropTypes.string,
    link: PropTypes.string,
    host_university: PropTypes.string,
  }).isRequired,
};
