import { useState, useEffect, useCallback, useMemo } from 'react';
import {
  getUpcomingScholarships,
  getScholarshipsByCountry,
  getScholarshipsByDegree,
  getScholarshipsByRegion
} from "../../../context/scholarship/Scholarship";
import useDebounce from '../../../hook/useDebounce';
import ScholarshipCard from './components/ScholarshipCard';
import FilterSection from './components/FilterSection';

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
    if (filterType !== "country" && filterType !== "degree") {
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
    if ((filterType === "country" || filterType === "degree") && debouncedFilterValue !== "") {
      setSearchStatus("Searching...");
      setFilterValue(debouncedFilterValue);
    } else if ((filterType === "country" || filterType === "degree") && debouncedFilterValue === "") {
      setFilterValue("");
      setSearchStatus("");
    }
  }, [debouncedFilterValue, filterType]);
    useEffect(() => {
    if (scholarships.length > 0) {
      applyFilters();
      if (filterType === "country" || filterType === "degree") {
        setSearchStatus("");
      }
    }
  }, [filterType, filterValue, regionFilter, sortBy, scholarships, applyFilters]);

  // Update displayed results when filteredResults changes
  useEffect(() => {
    setDisplayedResults(filteredResults.slice(0, ITEMS_PER_PAGE));
    setCurrentPage(1);
  }, [filteredResults]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#283d50] to-blue-600 rounded-full mb-6">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#283d50] mb-4">
            Discover Your Perfect
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Scholarship</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore thousands of scholarship opportunities from universities worldwide. 
            Your journey to global education starts here.
          </p>
        </div>

        {/* Filter Section */}
        <div className="mb-8">
          <FilterSection
            filterType={filterType}
            setFilterType={setFilterType}
            inputValue={inputValue}
            handleInputChange={handleInputChange}
            searchStatus={searchStatus}
            regionFilter={regionFilter}
            setRegionFilter={setRegionFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
            handleFilter={handleFilter}
          />
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Results Header */}
          {!loading && filteredResults.length > 0 && (
            <div className="bg-gradient-to-r from-[#283d50] to-blue-600 px-6 py-4">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center space-x-3">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                  <span className="font-semibold">Search Results</span>
                </div>
                <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-medium">
                  {displayedResults.length} of {filteredResults.length} scholarships
                </span>
              </div>
            </div>
          )}

          {/* Results Content */}
          <div className="p-6">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>                <p className="mt-4 text-gray-600 font-medium">Finding the best scholarships for you...</p>
                <p className="text-sm text-gray-500">This won&apos;t take long</p>
              </div>
            ) : displayedResults.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {displayedResults.map((scholarship) => (
                    <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
                  ))}
                </div>
                
                {/* Show More Button */}
                {displayedResults.length < filteredResults.length && (
                  <div className="flex justify-center mt-12">
                    <button
                      onClick={handleShowMore}
                      disabled={loadingMore}
                      className="group relative px-8 py-4 bg-gradient-to-r from-[#283d50] to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-3"
                    >
                      {loadingMore ? (
                        <>
                          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Loading More...
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          Load More Scholarships
                          <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs">
                            {filteredResults.length - displayedResults.length} remaining
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <div className="relative mx-auto w-32 h-32 mb-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full"></div>
                  <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>                <h3 className="text-2xl font-bold text-gray-900 mb-4">No Scholarships Found</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  We couldn&apos;t find any scholarships matching your criteria. 
                  Try adjusting your filters or check back later for new opportunities.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button 
                    onClick={() => {
                      setFilterType("upcoming");
                      setInputValue("");
                      setRegionFilter("");
                    }}
                    className="px-6 py-3 bg-[#283d50] text-white rounded-lg hover:bg-[#1e2d3d] transition-colors font-medium"
                  >
                    Reset Filters
                  </button>
                  <button 
                    onClick={fetchInitialScholarships}
                    className="px-6 py-3 border border-[#283d50] text-[#283d50] rounded-lg hover:bg-[#283d50] hover:text-white transition-colors font-medium"
                  >
                    Refresh Results
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
