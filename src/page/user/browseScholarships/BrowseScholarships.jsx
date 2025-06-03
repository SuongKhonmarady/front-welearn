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
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-[#283d50] mb-4">Find Your Scholarship</h2>
        
        {/* Results count indicator */}
        {!loading && filteredResults.length > 0 && (
          <div className="mb-4 text-sm text-gray-600">
            Showing {displayedResults.length} of {filteredResults.length} scholarships
          </div>
        )}
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
            </div>          ) : displayedResults.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayedResults.map((scholarship) => (
                  <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
                ))}
              </div>
              
              {/* Show More Button */}
              {displayedResults.length < filteredResults.length && (
                <div className="flex justify-center mt-8">
                  <button
                    onClick={handleShowMore}
                    disabled={loadingMore}
                    className="px-6 py-3 bg-[#283d50] text-white rounded-lg hover:bg-[#1e2d3d] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
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
                        Show More
                        <span className="text-sm">
                          ({displayedResults.length} of {filteredResults.length})
                        </span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </>
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
