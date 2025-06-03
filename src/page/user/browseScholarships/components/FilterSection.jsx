import { useMemo } from 'react';
import PropTypes from 'prop-types';

export default function FilterSection({
  filterType,
  setFilterType,
  inputValue,
  handleInputChange,
  regionFilter,
  setRegionFilter,
  sortBy,
  setSortBy,
  handleFilter,
  searchStatus
}) {
  // Memoize regions to prevent unnecessary re-renders
  const regions = useMemo(() => ({
    "Asia": ["CHINA", "INDIA", "JAPAN", "SOUTH KOREA", "SINGAPORE", "THAILAND", "VIETNAM", "MALAYSIA", "INDONESIA", "PHILIPPINES"],
    "Europe": ["FRANCE", "GERMANY", "UK", "ITALY", "SPAIN", "NETHERLANDS", "SWEDEN", "DENMARK", "SWITZERLAND", "NORWAY"],
    "North America": ["USA", "CANADA", "MEXICO"],
    "Oceania": ["AUSTRALIA", "NEW ZEALAND"],
    "Africa": ["SOUTH AFRICA", "EGYPT", "KENYA", "NIGERIA", "MOROCCO"]
  }), []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      
      {/* Filter Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="w-full md:w-1/4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Filter By</label>          <select
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
              // Clear input values when changing filter type by calling parent's handler
              if (handleInputChange) {
                handleInputChange({ target: { value: "" } });
              }
            }}
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
            <div className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="e.g., USA, CANADA, UK"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#283d50] focus:border-[#283d50]"
              />
              {searchStatus && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center">
                  {searchStatus === "Searching..." ? (
                    <svg className="animate-spin h-4 w-4 text-[#283d50] mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : null}
                  <span className="text-xs text-gray-500">{searchStatus}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {filterType === "degree" && (
          <div className="w-full md:w-1/4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Degree Level</label>
            <div className="relative">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="e.g., Bachelor, Master, PhD"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#283d50] focus:border-[#283d50]"
              />
              {searchStatus && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center">
                  {searchStatus === "Searching..." ? (
                    <svg className="animate-spin h-4 w-4 text-[#283d50] mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : null}
                  <span className="text-xs text-gray-500">{searchStatus}</span>
                </div>
              )}
            </div>
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
    </div>
  );
}

FilterSection.propTypes = {
  filterType: PropTypes.string.isRequired,
  setFilterType: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  regionFilter: PropTypes.string.isRequired,
  setRegionFilter: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
  setSortBy: PropTypes.func.isRequired,
  handleFilter: PropTypes.func.isRequired,
  searchStatus: PropTypes.string.isRequired,
};
