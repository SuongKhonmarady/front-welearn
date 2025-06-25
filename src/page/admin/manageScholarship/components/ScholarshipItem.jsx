import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { removeScholarship } from '../../../../context/scholarship/Scholarship'

const ScholarshipItem = ({ data, onRefresh }) => {
  const navigate = useNavigate()

  // Safety check for undefined data
  if (!data) {
    return null
  }
  const {
    id,
    slug,
    title,
    description,
    deadline,
    host_country,
    host_university
  } = data

  // Generate admin URL for scholarship detail
  const getAdminScholarshipUrl = () => {
    if (slug) {
      return `/admin/scholarships-management/${slug}`;
    }
    return `/admin/scholarships-management/${id}`;
  };

  // Generate admin URL for scholarship edit
  const getAdminScholarshipEditUrl = () => {
    if (slug) {
      return `/admin/scholarships-management/edit/${slug}`;
    }
    return `/admin/scholarships-management/edit/${id}`;
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this scholarship?')) {
      try {
        const success = await removeScholarship(id)
        if (success && onRefresh) {
          onRefresh()
        }
      } catch (error) {
        console.error('Error deleting scholarship:', error)
      }
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified'
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } catch {
      return dateString
    }
  }

  return (
    <>
      {/* Main Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 
              className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer transition-colors"
              onClick={() => navigate(getAdminScholarshipUrl())}
            >
              {title}
            </h3>
            <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
          </div>
          <div className="flex space-x-2 ml-4">
            <button
              onClick={() => navigate(getAdminScholarshipUrl())}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="View Details"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
            <button
              onClick={() => navigate(getAdminScholarshipEditUrl())}
              className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
              title="Edit"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button
              onClick={handleDelete}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Delete"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 text-sm text-gray-600">
          {host_university && (
            <div className="flex items-center space-x-1">
              <span className="text-lg">🎓</span>
              <span>{host_university}</span>
            </div>
          )}
          {host_country && (
            <div className="flex items-center space-x-1">
              <span className="text-lg">📍</span>
              <span>{host_country}</span>
            </div>
          )}
          {deadline && (
            <div className="flex items-center space-x-1">
              <span className="text-lg">📅</span>
              <span>Due: {formatDate(deadline)}</span>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

ScholarshipItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    slug: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    post_at: PropTypes.string,
    deadline: PropTypes.string,
    link: PropTypes.string,
    eligibility: PropTypes.string,
    host_country: PropTypes.string,
    host_university: PropTypes.string,
    program_duration: PropTypes.string,
    degree_offered: PropTypes.string,
    official_link: PropTypes.string
  }).isRequired,
  onRefresh: PropTypes.func
}

export default ScholarshipItem
