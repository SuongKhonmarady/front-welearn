import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getScholarshipById, updateScholarship } from '../../../../context/scholarship/Scholarship';
import Spinner from '../../../../ui/shared/Spinner';
import Button from '../../../../ui/shared/Button';

export default function EditScholarshipPage() {
  const { id, slug } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
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
  });

  useEffect(() => {
    const fetchScholarship = async () => {
      try {
        setLoading(true);
        // Use slug if available, otherwise use id
        const identifier = slug || id;
        const data = await getScholarshipById(identifier);
        if (data) {
          setFormData({
            title: data.title || '',
            description: data.description || '',
            post_at: data.post_at ? data.post_at.split(' ')[0] : '', // Format for date input
            deadline: data.deadline || '',
            link: data.link || '',
            eligibility: data.eligibility || '',
            host_country: data.host_country || '',
            host_university: data.host_university || '',
            program_duration: data.program_duration || '',
            degree_offered: data.degree_offered || '',
            official_link: data.official_link || '',
            id: data.id // Store the original ID for updates
          });
        } else {
          setError('Scholarship not found');
        }
      } catch (err) {
        setError('Failed to load scholarship details');
        console.error('Error fetching scholarship:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id || slug) {
      fetchScholarship();
    }
  }, [id, slug]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      // Use the original ID for updating (updateScholarship expects ID)
      const scholarshipId = id || (formData.id);
      const success = await updateScholarship(scholarshipId, formData);
      if (success) {
        const detailUrl = slug 
          ? `/admin/scholarships-management/slug/${slug}`
          : `/admin/scholarships-management/${scholarshipId}`;
        navigate(detailUrl);
      }
    } catch (error) {
      console.error('Error updating scholarship:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Spinner isFull />;
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <div className="text-red-400 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.1c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-red-800 mb-2">{error}</h3>
          <Button
            customClass="mt-4 bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => navigate('/admin/scholarships-management')}
          >
            Back to Scholarships
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <Button
            customClass="flex items-center space-x-2 text-gray-600 hover:text-gray-800 bg-gray-100 hover:bg-gray-200"
            onClick={() => {
              const detailUrl = slug 
                ? `/admin/scholarships-management/${slug}`
                : `/admin/scholarships-management/${id}`;
              navigate(detailUrl);
            }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            <span>Back to Details</span>
          </Button>
        </div>

        <div className="bg-gradient-to-r from-amber-600 to-orange-600 text-white p-8 rounded-2xl">
          <h1 className="text-3xl font-bold mb-2">Edit Scholarship</h1>
          <p className="text-amber-100">Update scholarship information and details</p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <span className="text-2xl mr-3">📝</span>
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Posted Date
                </label>
                <input
                  type="date"
                  name="post_at"
                  value={formData.post_at}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Application Deadline
                </label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Institution Information */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <span className="text-2xl mr-3">🏛️</span>
              Institution Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Host University
                </label>
                <input
                  type="text"
                  name="host_university"
                  value={formData.host_university}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Host Country
                </label>
                <input
                  type="text"
                  name="host_country"
                  value={formData.host_country}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Degree Offered
                </label>
                <input
                  type="text"
                  name="degree_offered"
                  value={formData.degree_offered}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Program Duration
                </label>
                <input
                  type="text"
                  name="program_duration"
                  value={formData.program_duration}
                  onChange={handleChange}
                  placeholder="e.g., 2 years, 4 years"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Eligibility */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <span className="text-2xl mr-3">✅</span>
              Eligibility Requirements
            </h2>
            <div>
              <textarea
                name="eligibility"
                value={formData.eligibility}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter eligibility criteria and requirements..."
              />
            </div>
          </div>

          {/* Links */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <span className="text-2xl mr-3">🔗</span>
              External Links
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Application Link
                </label>
                <input
                  type="url"
                  name="link"
                  value={formData.link}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Official Website
                </label>
                <input
                  type="url"
                  name="official_link"
                  value={formData.official_link}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <Button
              type="button"
              customClass="px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-300"
              onClick={() => navigate(`/admin/scholarships-management/${id}`)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              customClass="px-6 py-3 bg-blue-600 text-white hover:bg-blue-700"
              disabled={saving}
            >
              {saving ? (
                <div className="flex items-center space-x-2">
                  <svg className="animate-spin w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                  <span>Saving...</span>
                </div>
              ) : (
                'Save Changes'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
