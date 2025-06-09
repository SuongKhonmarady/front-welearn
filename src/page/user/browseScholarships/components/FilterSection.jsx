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
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#283d50] to-blue-600 px-6 py-4">
        <div className="flex items-center space-x-3">
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <h3 className="text-xl font-semibold text-white">Filter & Search</h3>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {/* Filter Type */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-semibold text-gray-700">
              <svg className="w-4 h-4 mr-2 text-[#283d50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              Filter Type
            </label>
            <select
              value={filterType}
              onChange={(e) => {
                setFilterType(e.target.value);
                if (handleInputChange) {
                  handleInputChange({ target: { value: "" } });
                }
              }}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm hover:shadow-md"
            >
              <option value="upcoming">🕒 Upcoming Deadlines</option>
              <option value="country">🌍 By Country</option>
              <option value="degree">🎓 By Degree Level</option>
              <option value="region">📍 By Region</option>
            </select>
          </div>

          {/* Dynamic Filter Input */}
          {filterType === "country" && (
            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-gray-700">
                <svg className="w-4 h-4 mr-2 text-[#283d50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h.5A2.5 2.5 0 0020 5.5v-1.5" />
                </svg>
                Host Country
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="e.g., USA, Canada, UK, Germany"
                  className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm hover:shadow-md"
                />
                {searchStatus && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center">
                    {searchStatus === "Searching..." ? (
                      <div className="flex items-center space-x-2">
                        <svg className="animate-spin h-4 w-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </div>
                    ) : (
                      <span className="text-xs text-green-500 bg-green-50 px-2 py-1 rounded-full">✓</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {filterType === "degree" && (
            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-gray-700">
                <svg className="w-4 h-4 mr-2 text-[#283d50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
                Degree Level
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="e.g., Bachelor, Master, PhD, Postdoc"
                  className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm hover:shadow-md"
                />
                {searchStatus && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center">
                    {searchStatus === "Searching..." ? (
                      <div className="flex items-center space-x-2">
                        <svg className="animate-spin h-4 w-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      </div>
                    ) : (
                      <span className="text-xs text-green-500 bg-green-50 px-2 py-1 rounded-full">✓</span>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {filterType === "region" && (
            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-gray-700">
                <svg className="w-4 h-4 mr-2 text-[#283d50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h.5A2.5 2.5 0 0020 5.5v-1.5" />
                </svg>
                Select Region
              </label>
              <select
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm hover:shadow-md"
              >
                <option value="">Choose a region...</option>
                {Object.keys(regions).map((region) => (
                  <option key={region} value={region}>
                    {region === "Asia" && "🌏"} 
                    {region === "Europe" && "🇪🇺"} 
                    {region === "North America" && "🌎"} 
                    {region === "Oceania" && "🌊"} 
                    {region === "Africa" && "🌍"} 
                    {" " + region}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Sort Options */}
          <div className="space-y-2">
            <label className="flex items-center text-sm font-semibold text-gray-700">
              <svg className="w-4 h-4 mr-2 text-[#283d50]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
              </svg>
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white shadow-sm hover:shadow-md"
            >
              <option value="deadline">⏰ Deadline (Soonest First)</option>
              <option value="newest">✨ Newest Listings</option>
            </select>
          </div>

          {/* Apply Button */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-transparent">Apply</label>
            <button
              onClick={handleFilter}
              className="w-full px-6 py-3 bg-gradient-to-r from-[#283d50] to-blue-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span>Search</span>
            </button>
          </div>
        </div>

        {/* Quick Filter Tags */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <p className="text-sm font-semibold text-gray-700 mb-3">Quick Filters:</p>
          <div className="flex flex-wrap gap-2">
            {["USA", "Canada", "UK", "Germany", "Australia", "Master", "PhD", "Bachelor"].map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  if (["Master", "PhD", "Bachelor"].includes(tag)) {
                    setFilterType("degree");
                    handleInputChange({ target: { value: tag } });
                  } else {
                    setFilterType("country");
                    handleInputChange({ target: { value: tag } });
                  }
                }}
                className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-blue-100 hover:text-blue-700 transition-colors duration-200 border border-gray-200 hover:border-blue-200"
              >
                {tag}
              </button>
            ))}
          </div>
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
