import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment";
import { getScholarshipById } from "../../../context/scholarship/Scholarship";

const ScholarshipDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScholarship = async () => {
      try {
        setLoading(true);
        setError(null);
        const scholarshipData = await getScholarshipById(id);
        setScholarship(scholarshipData);
      } catch (error) {
        setError("Failed to load scholarship details. Please try again.");
        console.error("Error fetching scholarship:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchScholarship();
    }
  }, [id]);

  const handleGoBack = () => navigate(-1);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading scholarship details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !scholarship) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  // Calculate deadline information
  const daysUntilDeadline = scholarship.deadline ? moment(scholarship.deadline).diff(moment(), 'days') : -1;
  const isExpired = daysUntilDeadline < 0;

  // Format dates safely
  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    const date = moment(dateString);
    return date.isValid() ? date.format('MMM DD, YYYY') : 'Invalid date';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-slate-800 text-white">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button
            onClick={handleGoBack}
            className="flex items-center text-white/90 hover:text-white mb-4 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Scholarships
          </button>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="flex-1">
                <h1 className="text-xl sm:text-2xl font-bold text-white leading-tight mb-2">
                  {scholarship.title || 'Untitled Scholarship'}
                </h1>                <div className="flex flex-wrap gap-4 text-sm text-white/80">
                  <span>📅 Deadline: {formatDate(scholarship.deadline)}</span>
                  {scholarship.post_at && (
                    <span>🕐 Posted {formatDate(scholarship.post_at)}</span>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">              <div className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-medium w-fit ${
                isExpired 
                  ? 'bg-red-500/20 text-red-200 border border-red-400/30' 
                  : 'bg-green-500/20 text-green-200 border border-green-400/30'
              }`}>
                <div className={`w-2 h-2 rounded-full mr-2 ${
                  isExpired ? 'bg-red-400' : 'bg-green-400'
                }`}></div>
                {!scholarship.deadline 
                  ? 'Check deadline on official page'
                  : isExpired 
                    ? 'Application Closed' 
                    : `${daysUntilDeadline} days remaining`
                }
              </div>
                <div className="flex gap-2">
                {(scholarship.official_link || scholarship.link) && (
                  <a
                    href={scholarship.official_link || scholarship.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    Apply Now
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* About Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">About This Scholarship</h2>
            <p className="text-gray-700 leading-relaxed">
              {scholarship.description || 'Detailed information about this scholarship opportunity.'}
            </p>
          </div>          {/* Quick Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Degree Level</h3>
              <p className="text-gray-700">{scholarship.degree_offered || 'All levels'}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-2">University</h3>
              <p className="text-gray-700">{scholarship.host_university || 'Various universities'}</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Country</h3>
              <p className="text-gray-700">{scholarship.host_country || 'Not specified'}</p>
            </div>
            {scholarship.program_duration && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Duration</h3>
                <p className="text-gray-700">{scholarship.program_duration}</p>
              </div>
            )}
          </div>

          {/* Eligibility */}
          {scholarship.eligibility && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Eligibility</h2>
              <p className="text-gray-700 leading-relaxed">
                {scholarship.eligibility}
              </p>
            </div>
          )}

          {/* How to Apply */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">How to Apply</h2>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 text-blue-600 font-bold text-sm">1</div>
                <div>
                  <h3 className="font-medium text-gray-900">Review Requirements</h3>
                  <p className="text-sm text-gray-600">Check all eligibility criteria and required documents</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 text-blue-600 font-bold text-sm">2</div>
                <div>
                  <h3 className="font-medium text-gray-900">Prepare Documents</h3>
                  <p className="text-sm text-gray-600">Gather transcripts, essays, and recommendations</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 text-blue-600 font-bold text-sm">3</div>
                <div>
                  <h3 className="font-medium text-gray-900">Submit Application</h3>
                  <p className="text-sm text-gray-600">Complete application before the deadline</p>
                </div>
              </div>
            </div>
          </div>          
          {/* Resources Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Resources & Links
            </h2>            <div className="space-y-3">
              {(scholarship.link) && (
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={scholarship.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Original Scholarship Link
                  </a>
                  <button
                    onClick={() => navigator.clipboard.writeText(scholarship.official_link || scholarship.link)}
                    className="flex items-center justify-center px-4 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy Link
                  </button>
                </div>
              )}
              
              {/* Additional Resource Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 ">
                <a
                  href="/browse"
                  className="flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Browse More Scholarships
                </a>
                
              </div>
              
              {/* Help Text */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h4 className="font-medium text-blue-900 mb-1">Need Help?</h4>
                    <p className="text-sm text-blue-800">
                      Make sure to read all requirements carefully before applying. 
                      Keep all your documents ready and apply before the deadline.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipDetailPage;
