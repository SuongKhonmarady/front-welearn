import { useState, useEffect, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  getUpcomingScholarships,
  getScholarshipsByCountry,
  getScholarshipsByDegree,
  getScholarshipsByRegion
} from "../../../../context/scholarship/Scholarship";
import ApplyButton from './ApplyButton';

// Scholarship Card Component
function ScholarshipCard({ scholarship }) {
  
  const {
    title,
    description,
    deadline,
    host_university,
    host_country,
    country,
    degree_offered,
    official_link,
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
    <div className="flex flex-col bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300 h-full">
      {/* Card Header with Degree & Deadline Status */}
      <div className="bg-[#f8fafc] px-4 py-2 border-b border-gray-100 flex justify-between items-center">
        <span className="text-sm font-medium bg-blue-100 text-blue-800 py-1 px-2 rounded-full">
          {displayDegree}
        </span>
        <span className={`text-xs font-medium py-1 px-2 rounded-full 
          ${isExpired 
            ? 'bg-red-100 text-red-800' 
            : isExpiring 
              ? 'bg-amber-100 text-amber-800' 
              : 'bg-green-100 text-green-800'
          }`}>          {isExpired 
            ? 'Expired' 
            : isExpiring 
              ? `${daysUntilDeadline} days left` 
              : 'Open'
          }
        </span>
      </div>
      
      {/* Card Content */}
      <div className="p-5 flex-grow">
        <h3 className="text-lg font-bold text-[#283d50] mb-3 line-clamp-2">
          {displayTitle}
        </h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center">
            <svg className="w-4 h-4 text-gray-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span className="text-sm text-gray-600 truncate">{displayUniversity}</span>
          </div>
          
          <div className="flex items-center">
            <svg className="w-4 h-4 text-gray-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h.5A2.5 2.5 0 0020 5.5v-1.5" />
            </svg>
            <span className="text-sm text-gray-600">{displayCountry}</span>
          </div>
          
          <div className="flex items-center">
            <svg className="w-4 h-4 text-gray-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm text-gray-600">
              Deadline: {formattedDeadline}
            </span>
          </div>
          
          {program_duration && (
            <div className="flex items-center">
              <svg className="w-4 h-4 text-gray-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm text-gray-600">{displayDuration}</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Card Footer with Apply Button */}
      <div className="p-4 border-t border-gray-100 bg-gray-50">
        <ApplyButton 
          deadline={deadline}
          officialLink={official_link}
          fallbackLink={scholarship.link}
        />
      </div>
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

export default function ScholarshipCardDisplay() {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(false);  
  const [filterType, setFilterType] = useState("upcoming");
  const [filterValue, setFilterValue] = useState("");
  const [regionFilter, setRegionFilter] = useState("");
  const [sortBy, setSortBy] = useState("deadline");
  const [filteredResults, setFilteredResults] = useState([]);
  
  // Memoize regions to prevent unnecessary re-renders
  const regions = useMemo(() => ({
    "Asia": ["CHINA", "INDIA", "JAPAN", "SOUTH KOREA", "SINGAPORE", "THAILAND", "VIETNAM", "MALAYSIA", "INDONESIA", "PHILIPPINES"],
    "Europe": ["FRANCE", "GERMANY", "UK", "ITALY", "SPAIN", "NETHERLANDS", "SWEDEN", "DENMARK", "SWITZERLAND", "NORWAY"],
    "North America": ["USA", "CANADA", "MEXICO"],
    "Oceania": ["AUSTRALIA", "NEW ZEALAND"],
    "Africa": ["SOUTH AFRICA", "EGYPT", "KENYA", "NIGERIA", "MOROCCO"]
  }), []);  // Define applyFilters before it's used in useEffect
  const applyFilters = useCallback(async () => {
    setLoading(true);
    let results = [];

    try {
      // First apply the main filter type
      if (filterType === "upcoming") {
        results = await getUpcomingScholarships();
      } else if (filterType === "country" && filterValue) {
        try {
          // Standardize country case to uppercase before sending to API
          results = await getScholarshipsByCountry(filterValue.toUpperCase());
        } catch (error) {
          console.error(`Error fetching scholarships for country ${filterValue}:`, error);
          // Fallback to client-side filtering if the endpoint returns an error
          const allScholarships = await getUpcomingScholarships();
          if (allScholarships) {
            const searchTerm = filterValue.toUpperCase();
            results = allScholarships.filter(s => {
              const hostCountry = (s.host_country || "").toUpperCase();
              const country = (s.country || "").toUpperCase();
              return hostCountry.includes(searchTerm) || country.includes(searchTerm);
            });
          }
        }
      } else if (filterType === "degree" && filterValue) {
        results = await getScholarshipsByDegree(filterValue);
      } else if (filterType === "region" && regionFilter) {
        // Use the backend region endpoint if available
        results = await getScholarshipsByRegion(regionFilter);
        
        // Fallback to client-side filtering if the endpoint returns no results or isn't supported
        if (!results || results.length === 0) {
          const allScholarships = await getUpcomingScholarships();
          if (allScholarships) {
            // Then filter by countries in the selected region
            results = allScholarships.filter(s => {
              const country = (s.host_country || s.country || "").toUpperCase();
              return regions[regionFilter]?.includes(country);
            });
          }
        }
      } else {
        // Default to upcoming if no valid filter is selected
        results = await getUpcomingScholarships();
      }

      // Apply sorting if results exist
      if (results && results.length > 0) {
        if (sortBy === "deadline") {
          results.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
        } else if (sortBy === "newest") {
          results.sort((a, b) => new Date(b.post_at) - new Date(a.post_at));
        }
      }

      setFilteredResults(results || []);
    } catch (error) {
      console.error("Error applying filters:", error);
    } finally {
      setLoading(false);
    }
  }, [filterType, filterValue, regionFilter, sortBy, regions]);
  
  // Define handler functions
  const handleFilter = () => {
    applyFilters();
  };
  
  const fetchInitialScholarships = async () => {
    setLoading(true);
    try {
      const data = await getUpcomingScholarships();
      if (data) {
        setScholarships(data);
        setFilteredResults(data);
      }
    } catch (error) {
      console.error("Error fetching scholarships:", error);
    } finally {
      setLoading(false);
    }
  };
  
  // Add useEffect hooks after all function definitions
  useEffect(() => {
    fetchInitialScholarships();
  }, []);
  
  useEffect(() => {
    if (scholarships.length > 0) {
      applyFilters();
    }
  }, [filterType, filterValue, regionFilter, sortBy, scholarships, applyFilters]);

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-[#283d50] mb-4">Find Your Scholarship</h2>
        
        {/* Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="w-full md:w-1/4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Filter By</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#283d50] focus:border-[#283d50]"
            >
              <option value="upcoming">Upcoming Deadlines</option>
              <option value="country">By Host Country</option>
              <option value="degree">By Degree Level</option>
              <option value="region">By Region</option>
            </select>
          </div>

          {filterType === "country" && (
            <div className="w-full md:w-1/4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <input
                type="text"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                placeholder="e.g., USA, CANADA, UK"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#283d50] focus:border-[#283d50]"
              />
            </div>
          )}

          {filterType === "degree" && (
            <div className="w-full md:w-1/4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Degree Level</label>
              <input
                type="text"
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
                placeholder="e.g., Bachelor, Master, PhD"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#283d50] focus:border-[#283d50]"
              />
            </div>
          )}

          {filterType === "region" && (
            <div className="w-full md:w-1/4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
              <select
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#283d50] focus:border-[#283d50]"
              >
                <option value="">Select a region</option>
                {Object.keys(regions).map((region) => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>
          )}

          <div className="w-full md:w-1/4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#283d50] focus:border-[#283d50]"
            >
              <option value="deadline">Deadline (Soonest First)</option>
              <option value="newest">Newest Listings</option>
            </select>
          </div>

          <div className="w-full md:w-1/4 flex items-end">
            <button
              onClick={handleFilter}
              className="w-full p-2 bg-[#283d50] text-white rounded-md hover:bg-[#1e2d3d] transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </div>

        {/* Results Display */}
        <div className="mt-4">
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-pulse flex space-x-4">
                <div className="flex-1 space-y-6 py-1">
                  <div className="h-2 bg-slate-200 rounded"></div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                      <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                    </div>
                    <div className="h-2 bg-slate-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : filteredResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResults.map((scholarship) => (
                <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No scholarships found</h3>
              <p className="mt-1 text-gray-500">Try changing your search criteria or check back later for new opportunities.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
