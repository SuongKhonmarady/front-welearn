import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import moment from "moment";
import { getScholarshipById } from "../../../context/scholarship/Scholarship";
import {
  LoadingState,
  ErrorState,
  HeroSection,
  MetadataCard,
  ScholarshipDetailsCard
} from "./components";

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

  // Handler functions
  const handleRetry = () => window.location.reload();
  const handleNavigateBack = () => navigate('/browse');
  const handleGoBack = () => navigate(-1);

  // Loading state
  if (loading) {
    return <LoadingState />;
  }

  // Error state
  if (error || !scholarship) {
    return (
      <ErrorState 
        error={error}
        onRetry={handleRetry}
        onNavigateBack={handleNavigateBack}
      />
    );
  }

  // Calculate deadline information
  const daysUntilDeadline = moment(scholarship.deadline).diff(moment(), 'days');
  const isExpired = daysUntilDeadline < 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <HeroSection 
        scholarship={scholarship}
        onBackClick={handleGoBack}
        daysUntilDeadline={daysUntilDeadline}
        isExpired={isExpired}
      />      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Scholarship Description */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">About This Scholarship</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {scholarship.description || 'Detailed information about this scholarship opportunity.'}
                </p>
              </div>
            </div>

            {/* Eligibility Section */}
            {scholarship.eligibility && (
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Eligibility Requirements</h2>
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed">
                    {scholarship.eligibility}
                  </p>
                </div>
              </div>
            )}

            {/* Application Process */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Apply</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Review Requirements</h3>
                    <p className="text-gray-700">Carefully read through all eligibility criteria and required documents.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Prepare Documents</h3>
                    <p className="text-gray-700">Gather all necessary documents including transcripts, essays, and recommendations.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Submit Application</h3>
                    <p className="text-gray-700">Complete and submit your application before the deadline.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <ScholarshipDetailsCard scholarship={scholarship} />
            <MetadataCard scholarship={scholarship} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipDetailPage;
