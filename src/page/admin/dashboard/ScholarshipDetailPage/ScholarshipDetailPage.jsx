import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getScholarshipById } from '../../../../context/scholarship/Scholarship';
import Spinner from '../../../../ui/shared/Spinner';
import Button from '../../../../ui/shared/Button';

export default function ScholarshipDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScholarshipDetail = async () => {
      try {
        setLoading(true);
        const data = await getScholarshipById(id);
        if (data) {
          setScholarship(data);
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

    if (id) {
      fetchScholarshipDetail();
    }
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };
  const InfoCard = ({ icon, title, content, color = 'blue' }) => {
    const colorClasses = {
      blue: 'bg-blue-50 border-blue-200 text-blue-800',
      green: 'bg-green-50 border-green-200 text-green-800',
      purple: 'bg-purple-50 border-purple-200 text-purple-800',
      orange: 'bg-orange-50 border-orange-200 text-orange-800',
      red: 'bg-red-50 border-red-200 text-red-800'
    };

    if (!content) return null;

    return (
      <div className={`p-4 rounded-lg border ${colorClasses[color]}`}>
        <div className="flex items-start space-x-3">
          <span className="text-2xl">{icon}</span>
          <div className="flex-1">
            <h4 className="font-semibold text-sm mb-1">{title}</h4>
            <p className="text-sm">{content}</p>
          </div>
        </div>
      </div>
    );
  };

  InfoCard.propTypes = {
    icon: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
    color: PropTypes.oneOf(['blue', 'green', 'purple', 'orange', 'red'])
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

  if (!scholarship) {
    return (
      <div className="p-8">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
          <p className="text-gray-600">Scholarship not found</p>
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
            onClick={() => navigate('/admin/scholarships-management')}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
            </svg>
            <span>Back to Scholarships</span>
          </Button>
          
          <div className="flex space-x-3">
            <Button
              customClass="bg-amber-600 text-white hover:bg-amber-700"
              onClick={() => navigate(`/admin/scholarships-management/edit/${scholarship.id}`)}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
              Edit
            </Button>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl">
          <h1 className="text-3xl font-bold mb-4">{scholarship.title}</h1>
          <div className="flex flex-wrap items-center space-x-6 text-blue-100">
            {scholarship.host_university && (
              <div className="flex items-center space-x-2">
                <span className="text-lg">🎓</span>
                <span>{scholarship.host_university}</span>
              </div>
            )}
            {scholarship.host_country && (
              <div className="flex items-center space-x-2">
                <span className="text-lg">📍</span>
                <span>{scholarship.host_country}</span>
              </div>
            )}
            {scholarship.deadline && (
              <div className="flex items-center space-x-2">
                <span className="text-lg">📅</span>
                <span>Deadline: {formatDate(scholarship.deadline)}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Description */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="text-2xl mr-3">📝</span>
              Description
            </h2>
            <div className="prose max-w-none text-gray-700">
              <p className="whitespace-pre-wrap">{scholarship.description || 'No description available.'}</p>
            </div>
          </div>

          {/* Eligibility */}
          {scholarship.eligibility && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <span className="text-2xl mr-3">✅</span>
                Eligibility Requirements
              </h2>
              <div className="prose max-w-none text-gray-700">
                <p className="whitespace-pre-wrap">{scholarship.eligibility}</p>
              </div>
            </div>
          )}

          {/* Program Details */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="text-2xl mr-3">🎯</span>
              Program Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoCard
                icon="🎓"
                title="Degree Offered"
                content={scholarship.degree_offered}
                color="blue"
              />
              <InfoCard
                icon="⏱️"
                title="Program Duration"
                content={scholarship.program_duration}
                color="green"
              />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Information</h3>
            <div className="space-y-4">
              <InfoCard
                icon="📅"
                title="Posted Date"
                content={formatDate(scholarship.post_at)}
                color="blue"
              />
              <InfoCard
                icon="⏰"
                title="Application Deadline"
                content={formatDate(scholarship.deadline)}
                color="red"
              />
              <InfoCard
                icon="🌍"
                title="Host Country"
                content={scholarship.host_country}
                color="green"
              />
              <InfoCard
                icon="🏛️"
                title="Host University"
                content={scholarship.host_university}
                color="purple"
              />
            </div>
          </div>

          {/* Links */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">External Links</h3>
            <div className="space-y-3">
              {scholarship.official_link && (
                <a
                  href={scholarship.official_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors border border-blue-200"
                >
                  <span className="text-xl">🔗</span>
                  <div>
                    <p className="font-medium text-blue-800">Official Website</p>
                    <p className="text-sm text-blue-600 truncate">Visit official page</p>
                  </div>
                </a>
              )}
              {scholarship.link && scholarship.link !== scholarship.official_link && (
                <a
                  href={scholarship.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors border border-green-200"
                >
                  <span className="text-xl">📄</span>
                  <div>
                    <p className="font-medium text-green-800">Application Link</p>
                    <p className="text-sm text-green-600 truncate">Apply now</p>
                  </div>
                </a>
              )}
            </div>
          </div>

          {/* Admin Info */}
          <div className="bg-gray-50 rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Admin Information</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Scholarship ID:</span>
                <span className="font-mono text-gray-900">{scholarship.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Created:</span>
                <span className="text-gray-900">{formatDate(scholarship.created_at)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last Updated:</span>
                <span className="text-gray-900">{formatDate(scholarship.updated_at)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
