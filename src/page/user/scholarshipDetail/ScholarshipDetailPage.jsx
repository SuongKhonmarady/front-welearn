import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment";
import { getScholarshipById } from "../../../context/scholarship/Scholarship";
import SEOHead from "../../../components/SEOHead";

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
    <>
      {/* SEO Head Component */}
      <SEOHead
        title={scholarship.title ? `${scholarship.title.substring(0, 40)}` : 'Scholarship Details'}
        description={scholarship.description ? `${scholarship.description.substring(0, 150)}...` : 'Detailed information about this scholarship opportunity.'}
        keywords={`scholarship, ${scholarship.provider || 'education'}, ${scholarship.hostCountry || 'international'}, funding, education`}
        url={`/scholarship/${id}`}
        type="article"
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#283d50] to-[#1e3a5f] text-white">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <button
              onClick={handleGoBack}
              className="flex items-center text-white/90 hover:text-white mb-6 transition-colors group"
            >
              <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              Back to Scholarships
            </button>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-white/20 shadow-2xl">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-3">
                    {scholarship.title || 'Untitled Scholarship'}
                  </h1>
                  <div className="flex flex-wrap gap-6 text-sm text-white/80">
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Deadline: {formatDate(scholarship.deadline)}
                    </span>
                    {scholarship.post_at && (
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Posted {formatDate(scholarship.post_at)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium w-fit border-2 ${
                  isExpired 
                    ? 'bg-red-500/20 text-red-200 border-red-400/50' 
                    : 'bg-green-500/20 text-green-200 border-green-400/50'
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
                <div className="flex gap-3">
                  {(scholarship.official_link || scholarship.link) && (
                    <a
                      href={scholarship.official_link || scholarship.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      Apply Now
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>      {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Main Content Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* About Section */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#283d50] to-blue-600 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-[#283d50]">About This Scholarship</h2>
                </div>
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 leading-relaxed text-base">
                    {scholarship.description || 'Detailed information about this scholarship opportunity. This scholarship provides students with the opportunity to advance their education and achieve their academic goals.'}
                  </p>
                </div>
              </div>

              {/* Eligibility Section */}
              {scholarship.eligibility && (
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-[#283d50]">Eligibility Requirements</h2>
                  </div>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed text-base">
                      {scholarship.eligibility}
                    </p>
                  </div>
                </div>
              )}

              {/* How to Apply */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-[#283d50]">How to Apply</h2>
                </div>
                <div className="space-y-4">
                  {[
                    { step: 1, title: "Review Requirements", description: "Check all eligibility criteria and required documents carefully" },
                    { step: 2, title: "Prepare Documents", description: "Gather transcripts, essays, recommendations, and other required materials" },
                    { step: 3, title: "Submit Application", description: "Complete and submit your application before the deadline" }
                  ].map((item) => (
                    <div key={item.step} className="flex gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#283d50] to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold text-sm shadow-md">
                        {item.step}
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#283d50] mb-1">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Column */}
            <div className="space-y-6">
              {/* Quick Info Cards */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-lg font-bold text-[#283d50] mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Quick Information
                </h3>
                <div className="space-y-4">
                  {[
                    { label: "Degree Level", value: scholarship.degree_offered || 'Check in offical page'},
                    { label: "University", value: scholarship.host_university || 'Various universities'},
                    { label: "Country", value: scholarship.host_country || 'Not specified'},
                    ...(scholarship.program_duration ? [{ label: "Duration", value: scholarship.program_duration}] : [])
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                      <span className="text-lg">{item.icon}</span>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{item.label}</p>
                        <p className="text-gray-700 text-sm">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>            {/* Resources & Actions */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
                <h3 className="text-lg font-bold text-[#283d50] mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Resources & Actions
                </h3>
                
                <div className="space-y-3">
                  {scholarship.link && (
                    <a
                      href={scholarship.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-[#283d50] to-blue-600 text-white font-semibold rounded-xl hover:from-[#1e3a5f] hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      View Original Link
                    </a>
                  )}
                  
                  <button
                    onClick={() => navigator.clipboard.writeText(scholarship.official_link || scholarship.link)}
                    className="flex items-center justify-center w-full px-4 py-3 border-2 border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy Link
                  </button>
                  
                  {/* Additional Resource Links */}
                  <div className="border-t pt-3 mt-3">
                    <a
                      href="/browse"
                      className="flex items-center justify-center w-full px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors duration-200"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      Browse More Scholarships
                    </a>
                  </div>
                </div>
              </div>

              {/* Help & Support */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">Need Help?</h4>
                    <p className="text-sm text-blue-800 leading-relaxed">
                      Make sure to read all requirements carefully before applying. 
                      Keep all your documents ready and apply before the deadline.
                      For any questions, visit our support center or contact us directly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ScholarshipDetailPage;
