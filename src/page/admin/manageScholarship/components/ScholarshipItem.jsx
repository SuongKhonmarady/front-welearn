import { useState } from 'react'
import PropTypes from 'prop-types'
import { removeScholarship, updateScholarship } from '../../../../context/scholarship/Scholarship'

const ScholarshipItem = ({ data, onRefresh }) => {
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editData, setEditData] = useState({
    title: '',
    description: '',
    post_at: '',
    deadline: '',
    link: '',
    eligibility: '',
    host_country: '',
    host_university: '',
    program_duration: '',
    degree_offered: '',
    official_link: ''
  })  // Safety check for undefined data
  if (!data) {
    return null
  }

  const {
    id,
    title,
    description,
    post_at,
    deadline,
    link,
    eligibility,
    host_country,
    host_university,
    program_duration,
    degree_offered,
    official_link
  } = data

  const handleEditClick = () => {
    setEditData({
      title: title || '',
      description: description || '',
      post_at: post_at || '',
      deadline: deadline || '',
      link: link || '',
      eligibility: eligibility || '',
      host_country: host_country || '',
      host_university: host_university || '',
      program_duration: program_duration || '',      degree_offered: degree_offered || '',
      official_link: official_link || ''
    })
    setIsEditModalOpen(true)
  }

  const handleEditSubmit = async (e) => {
    e.preventDefault()
    try {
      const success = await updateScholarship(id, editData)
      if (success) {
        setIsEditModalOpen(false)
        if (onRefresh) {
          onRefresh()
        }
      }
    } catch (error) {
      console.error('Error updating scholarship:', error)
    }
  }

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

  const InfoCard = ({ icon, title: cardTitle, content, color = 'blue' }) => {
    const colorClasses = {
      blue: 'bg-blue-50 border-blue-200 text-blue-800',
      green: 'bg-green-50 border-green-200 text-green-800',
      purple: 'bg-purple-50 border-purple-200 text-purple-800',
      orange: 'bg-orange-50 border-orange-200 text-orange-800',
      red: 'bg-red-50 border-red-200 text-red-800'
    }

    return (
      <div className={`p-4 rounded-lg border ${colorClasses[color]}`}>
        <div className="flex items-start space-x-3">
          <div className="w-5 h-5 mt-0.5 flex-shrink-0 flex items-center justify-center text-lg">
            {icon}
          </div>
          <div>
            <h4 className="font-medium text-sm mb-1">{cardTitle}</h4>
            <p className="text-sm opacity-90">{content || 'Not specified'}</p>
          </div>
        </div>
      </div>
    )
  }

  InfoCard.propTypes = {
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
    color: PropTypes.string
  }

  return (
    <>
      {/* Main Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
          </div>
          <div className="flex space-x-2 ml-4">
            <button
              onClick={() => setIsViewModalOpen(true)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              title="View Details"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </button>
            <button
              onClick={handleEditClick}
              className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors"
              title="Edit"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>            <button
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

      {/* View Details Modal */}
      {isViewModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{title}</h2>
                  <div className="flex items-center space-x-4 text-blue-100">
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
                  </div>
                </div>
                <button
                  onClick={() => setIsViewModalOpen(false)}
                  className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed">{description}</p>
              </div>

              {/* Info Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoCard
                  icon="📅"
                  title="Posted Date"
                  content={formatDate(post_at)}
                  color="blue"
                />
                <InfoCard
                  icon="⏰"
                  title="Application Deadline"
                  content={formatDate(deadline)}
                  color="red"
                />
                <InfoCard
                  icon="🎓"
                  title="Degree Offered"
                  content={degree_offered}
                  color="purple"
                />
                <InfoCard
                  icon="⏱️"
                  title="Program Duration"
                  content={program_duration}
                  color="orange"
                />
              </div>

              {/* Eligibility */}
              {eligibility && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Eligibility Criteria</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700">{eligibility}</p>
                  </div>
                </div>
              )}

              {/* Links */}
              <div className="flex flex-wrap gap-3">
                {link && (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <span>Application Link</span>
                  </a>
                )}
                {official_link && (
                  <a
                    href={official_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <span>Official Website</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-6 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Edit Scholarship</h2>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <form onSubmit={handleEditSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={editData.title}
                    onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Host University</label>
                  <input
                    type="text"
                    value={editData.host_university}
                    onChange={(e) => setEditData({ ...editData, host_university: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Host Country</label>
                  <input
                    type="text"
                    value={editData.host_country}
                    onChange={(e) => setEditData({ ...editData, host_country: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Degree Offered</label>
                  <input
                    type="text"
                    value={editData.degree_offered}
                    onChange={(e) => setEditData({ ...editData, degree_offered: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Program Duration</label>
                  <input
                    type="text"
                    value={editData.program_duration}
                    onChange={(e) => setEditData({ ...editData, program_duration: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Post Date</label>
                  <input
                    type="date"
                    value={editData.post_at}
                    onChange={(e) => setEditData({ ...editData, post_at: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Deadline</label>
                  <input
                    type="date"
                    value={editData.deadline}
                    onChange={(e) => setEditData({ ...editData, deadline: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Application Link</label>
                  <input
                    type="url"
                    value={editData.link}
                    onChange={(e) => setEditData({ ...editData, link: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Official Link</label>
                  <input
                    type="url"
                    value={editData.official_link}
                    onChange={(e) => setEditData({ ...editData, official_link: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={editData.description}
                  onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Eligibility Criteria</label>
                <textarea
                  value={editData.eligibility}
                  onChange={(e) => setEditData({ ...editData, eligibility: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

ScholarshipItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
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
