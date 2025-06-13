import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { scholarshipService } from '../../../../services/scholarshipService';
import ScholarshipCard from '../../../../components/ScholarshipCard';

export default function LatestScholarships() {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLatestScholarships();
  }, []);
  const fetchLatestScholarships = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await scholarshipService.getLatestScholarships(10);
      
      // Handle different response structures
      let scholarshipData;
      if (response.success && response.data) {
        // Laravel success response format
        scholarshipData = response.data;
      } else if (response.data) {
        // Direct data response
        scholarshipData = response.data;
      } else if (Array.isArray(response)) {
        // Array response
        scholarshipData = response;
      } else {
        scholarshipData = [];
      }
      
      // Ensure we have an array and limit to 10 items
      const finalData = Array.isArray(scholarshipData) ? scholarshipData.slice(0, 10) : [];
      setScholarships(finalData);
      
      console.log('Fetched scholarships:', finalData.length, 'items');
    } catch (err) {
      console.error('Failed to fetch scholarships:', err);
      setError('Failed to load scholarships. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Custom SVG icon
  const SparklesIcon = () => (
    <svg className="h-8 w-8 text-[#283d50]" fill="currentColor" viewBox="0 0 24 24">
      <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813A3.75 3.75 0 007.466 7.89l.813-2.846A.75.75 0 019 4.5zM18 1.5a.75.75 0 01.728.568l.258 1.036c.236.94.97 1.674 1.91 1.91l1.036.258a.75.75 0 010 1.456l-1.036.258c-.94.236-1.674.97-1.91 1.91l-.258 1.036a.75.75 0 01-1.456 0l-.258-1.036a2.625 2.625 0 00-1.91-1.91l-1.036-.258a.75.75 0 010-1.456l1.036-.258a2.625 2.625 0 001.91-1.91l.258-1.036A.75.75 0 0118 1.5zM16.5 15a.75.75 0 01.712.513l.394 1.183c.15.447.5.799.948.948l1.183.395a.75.75 0 010 1.422l-1.183.395c-.447.15-.799.5-.948.948l-.395 1.183a.75.75 0 01-1.422 0l-.395-1.183a1.5 1.5 0 00-.948-.948l-1.183-.395a.75.75 0 010-1.422l1.183-.395c.447-.15.799-.5.948-.948l.395-1.183A.75.75 0 0116.5 15z" clipRule="evenodd" />
    </svg>
  );

  const LoadingSkeleton = () => (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 animate-pulse">
      <div className="space-y-4">
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        </div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>
        <div className="flex gap-2 pt-4">
          <div className="h-8 bg-gray-200 rounded flex-1"></div>
          <div className="h-8 bg-gray-200 rounded flex-1"></div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-12 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <SparklesIcon />
            <h2 className="text-3xl font-bold text-[#283d50]">
              Latest Scholarship Opportunities
            </h2>
          </div>          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover the newest scholarship opportunities from around the world. 
            Don&apos;t miss out on these fresh funding opportunities for your education.
          </p>
          {/* Debug info - remove in production */}
          {!loading && !error && (
            <p className="text-sm text-gray-400 mt-2">
              Showing {scholarships.length} latest scholarships
            </p>
          )}
        </div>

        {/* Error State */}
        {error && (
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={fetchLatestScholarships}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <LoadingSkeleton key={index} />
            ))}
          </div>
        )}

        {/* Scholarships Grid */}
        {!loading && !error && (
          <>
            {scholarships.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {scholarships.map((scholarship, index) => (
                  <ScholarshipCard 
                    key={scholarship.id || index} 
                    scholarship={scholarship} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="bg-white border border-gray-200 rounded-lg p-8 max-w-md mx-auto">
                  <SparklesIcon />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2 mt-4">
                    No Scholarships Found
                  </h3>                  <p className="text-gray-500">
                    We&apos;re working on adding new scholarship opportunities. Check back soon!
                  </p>
                </div>
              </div>
            )}            {/* View All Button */}
            {scholarships.length > 0 && (
              <div className="text-center mt-12">
                <Link
                  to="/browse"
                  className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-[#283d50] hover:bg-[#1e2d3d] transition-colors duration-200"
                >
                  View All Scholarships
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
