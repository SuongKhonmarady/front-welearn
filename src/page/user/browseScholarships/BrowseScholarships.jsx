import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  getUpcomingScholarships,
  getScholarshipsByCountry,
  getScholarshipsByDegree,
  getScholarshipsByRegion,
  getScholarshipsByTitle
} from "../../../context/scholarship/Scholarship";
import useDebounce from '../../../hook/useDebounce';
import ScholarshipCard from './components/ScholarshipCard';
import SEOHead from '../../../components/SEOHead';

export default function BrowseScholarships() {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(false);  
  const [filterType, setFilterType] = useState("upcoming");
  const [filterValue, setFilterValue] = useState("");
  const [inputValue, setInputValue] = useState(""); // For immediate UI feedback
  const [regionFilter, setRegionFilter] = useState("");
  const [sortBy, setSortBy] = useState("deadline");
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchStatus, setSearchStatus] = useState(""); // For user feedback
  
  // Pagination state
  const [displayedResults, setDisplayedResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const ITEMS_PER_PAGE = 10;
    // Debounce the filter value to avoid excessive API calls
  const debouncedFilterValue = useDebounce(inputValue, 600);
  
  // Memoize regions to prevent unnecessary re-renders
  const regions = useMemo(() => ({
    "Asia": ["CHINA", "INDIA", "JAPAN", "SOUTH KOREA", "SINGAPORE", "THAILAND", "VIETNAM", "MALAYSIA", "INDONESIA", "PHILIPPINES"],
    "Europe": ["FRANCE", "GERMANY", "UK", "ITALY", "SPAIN", "NETHERLANDS", "SWEDEN", "DENMARK", "SWITZERLAND", "NORWAY"],
    "North America": ["USA", "CANADA", "MEXICO"],
    "Oceania": ["AUSTRALIA", "NEW ZEALAND"],
    "Africa": ["SOUTH AFRICA", "EGYPT", "KENYA", "NIGERIA", "MOROCCO"]
  }), []);

  // Define applyFilters before it's used in useEffect
  const applyFilters = useCallback(async () => {
    setLoading(true);
    let results = [];

    try {      // First apply the main filter type
      if (filterType === "upcoming") {
        results = await getUpcomingScholarships();
      } else if (filterType === "title" && filterValue) {
        results = await getScholarshipsByTitle(filterValue);
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
      // Reset pagination when new results come in
      setCurrentPage(1);
      setDisplayedResults((results || []).slice(0, ITEMS_PER_PAGE));
    } catch (error) {
      console.error("Error applying filters:", error);
    } finally {
      setLoading(false);
    }
  }, [filterType, filterValue, regionFilter, sortBy, regions]);
  
  // Handle input changes with debounce
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setSearchStatus("Typing...");
  };
    // Define handler functions
  const handleFilter = () => {
    // For non-text inputs like dropdowns and manual filter button
    if (filterType !== "country" && filterType !== "degree" && filterType !== "title") {
      applyFilters();
    }
  };
    const fetchInitialScholarships = async () => {
    setLoading(true);
    try {
      const data = await getUpcomingScholarships();
      if (data) {
        setScholarships(data);
        setFilteredResults(data);
        // Show only first 10 items initially
        setDisplayedResults(data.slice(0, ITEMS_PER_PAGE));
        setCurrentPage(1);
      }
    } catch (error) {
      console.error("Error fetching scholarships:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to load more scholarships
  const handleShowMore = () => {
    setLoadingMore(true);
    
    setTimeout(() => {
      const nextPage = currentPage + 1;
      const startIndex = 0;
      const endIndex = nextPage * ITEMS_PER_PAGE;
      
      const newDisplayedResults = filteredResults.slice(startIndex, endIndex);
      setDisplayedResults(newDisplayedResults);
      setCurrentPage(nextPage);
      setLoadingMore(false);
    }, 500); // Small delay to show loading state
  };
  
  // Add useEffect hooks after all function definitions
  useEffect(() => {
    fetchInitialScholarships();
  }, []);
    // Listen for changes in the debounced filter value
  useEffect(() => {
    if ((filterType === "country" || filterType === "degree" || filterType === "title") && debouncedFilterValue !== "") {
      setSearchStatus("Searching...");
      setFilterValue(debouncedFilterValue);
    } else if ((filterType === "country" || filterType === "degree" || filterType === "title") && debouncedFilterValue === "") {
      setFilterValue("");
      setSearchStatus("");
    }
  }, [debouncedFilterValue, filterType]);    useEffect(() => {
    if (scholarships.length > 0) {
      applyFilters();
      if (filterType === "country" || filterType === "degree" || filterType === "title") {
        setSearchStatus("");
      }
    }
  }, [filterType, filterValue, regionFilter, sortBy, scholarships, applyFilters]);

  // Update displayed results when filteredResults changes
  useEffect(() => {
    setDisplayedResults(filteredResults.slice(0, ITEMS_PER_PAGE));
    setCurrentPage(1);  }, [filteredResults]);  return (
    <>
      {/* SEO Head Component */}      <SEOHead
        title="Browse Scholarships - Find Your Perfect Educational Opportunity"
        description="Discover thousands of scholarship opportunities worldwide. Filter by location, degree level, and criteria to find your perfect match."
        keywords="scholarships, education funding, university scholarships, international scholarships, student grants, financial aid, study abroad"
        url="/browse-scholarships"
        type="website"
      />
      
      <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Simplified Hero Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-800 rounded-lg mb-4">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-2">
            Browse Scholarships
          </h1>
          <p className="text-gray-600 text-sm sm:text-base max-w-lg mx-auto">
            Find your perfect scholarship opportunity from thousands of programs worldwide
          </p>
        </div>

        {/* Mobile-Friendly Filter Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          {/* Filter Header */}
          <div className="bg-slate-800 px-4 py-3 rounded-t-xl">
            <h3 className="text-white font-medium text-sm flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filter & Search
            </h3>
          </div>

          {/* Filter Controls */}
          <div className="p-4 space-y-4">
            {/* Filter Type - Full Width on Mobile */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Filter Type</label>
              <select
                value={filterType}
                onChange={(e) => {
                  setFilterType(e.target.value);
                  if (handleInputChange) {
                    handleInputChange({ target: { value: "" } });
                  }
                }}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm"
              >
                <option value="upcoming">🕒 Upcoming Deadlines</option>
                <option value="title">🔍 Search by Title</option>
                <option value="country">🌍 By Country</option>
                <option value="degree">🎓 By Degree Level</option>
                <option value="region">📍 By Region</option>
              </select>
            </div>

            {/* Dynamic Filter Input */}
            {filterType === "title" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Scholarship Title</label>
                <div className="relative">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Enter scholarship title..."
                    className="w-full px-3 py-2 pr-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm"
                  />
                  {searchStatus && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {searchStatus === "Searching..." ? (
                        <svg className="animate-spin h-4 w-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <span className="text-xs text-green-500">✓</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {filterType === "country" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Host Country</label>
                <div className="relative">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="e.g., USA, Canada, UK..."
                    className="w-full px-3 py-2 pr-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm"
                  />
                  {searchStatus && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {searchStatus === "Searching..." ? (
                        <svg className="animate-spin h-4 w-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <span className="text-xs text-green-500">✓</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {filterType === "degree" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Degree Level</label>
                <div className="relative">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="e.g., Bachelor, Master, PhD..."
                    className="w-full px-3 py-2 pr-10 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm"
                  />
                  {searchStatus && (
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                      {searchStatus === "Searching..." ? (
                        <svg className="animate-spin h-4 w-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <span className="text-xs text-green-500">✓</span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {filterType === "region" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Region</label>
                <select
                  value={regionFilter}
                  onChange={(e) => setRegionFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm"
                >
                  <option value="">Choose a region...</option>
                  <option value="Asia">🌏 Asia</option>
                  <option value="Europe">🇪🇺 Europe</option>
                  <option value="North America">🌎 North America</option>
                  <option value="Oceania">🌊 Oceania</option>
                  <option value="Africa">🌍 Africa</option>
                </select>
              </div>
            )}

            {/* Sort and Search Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-sm"
                >
                  <option value="deadline">⏰ Deadline (Soonest First)</option>
                  <option value="newest">✨ Newest Listings</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-transparent mb-2">Search</label>
                <button
                  onClick={handleFilter}
                  className="w-full px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors text-sm font-medium flex items-center justify-center"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search
                </button>
              </div>
            </div>

            {/* Quick Filter Tags */}
            <div className="pt-3 border-t border-gray-100">
              <p className="text-xs font-medium text-gray-700 mb-2">Quick Filters:</p>
              <div className="flex flex-wrap gap-2">
                {["USA", "UK", "Master", "PhD", "Merit"].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      if (["Master", "PhD"].includes(tag)) {
                        setFilterType("degree");
                        handleInputChange({ target: { value: tag } });
                      } else if (tag === "Merit") {
                        setFilterType("title");
                        handleInputChange({ target: { value: tag } });
                      } else {
                        setFilterType("country");
                        handleInputChange({ target: { value: tag } });
                      }
                    }}
                    className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-blue-100 hover:text-blue-700 transition-colors border border-gray-200"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          {/* Results Header */}
          {!loading && filteredResults.length > 0 && (
            <div className="bg-slate-800 px-4 py-3 rounded-t-xl">
              <div className="flex items-center justify-between text-white">
                <span className="text-sm font-medium">Search Results</span>
                <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                  {displayedResults.length} of {filteredResults.length}
                </span>
              </div>
            </div>
          )}

          {/* Results Content */}
          <div className="p-4">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-8 h-8 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-3"></div>
                <p className="text-gray-600 text-sm">Finding scholarships...</p>
              </div>
            ) : displayedResults.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {displayedResults.map((scholarship) => (
                    <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
                  ))}
                </div>
                
                {/* Show More Button */}
                {displayedResults.length < filteredResults.length && (
                  <div className="flex justify-center mt-6">
                    <button
                      onClick={handleShowMore}
                      disabled={loadingMore}
                      className="px-6 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm"
                    >
                      {loadingMore ? (
                        <>
                          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Loading...
                        </>
                      ) : (
                        <>
                          Load More
                          <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                            {filteredResults.length - displayedResults.length} more
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No Scholarships Found</h3>
                <p className="text-gray-600 mb-6 text-sm max-w-sm mx-auto">
                  Try adjusting your filters or search terms to find more opportunities.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <button 
                    onClick={() => {
                      setFilterType("upcoming");
                      setInputValue("");
                      setRegionFilter("");
                    }}
                    className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors font-medium text-sm"
                  >
                    Reset Filters
                  </button>
                  <button 
                    onClick={fetchInitialScholarships}
                    className="px-4 py-2 border border-slate-800 text-slate-800 rounded-lg hover:bg-slate-800 hover:text-white transition-colors font-medium text-sm"
                  >
                    Refresh
                  </button>                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
