import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Button from '../../../../ui/shared/Button';
import ScholarshipItem from '../../manageScholarship/components/ScholarshipItem';

const Scholarships = ({ 
  filteredAndSortedScholarships,
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  fetchScholarship
}) => {
  const navigate = useNavigate();
  const handleCreateScholarship = () => {
    navigate('/admin/scholarships-management/create');
  };
  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Scholarship Management</h1>
      </header>

      {/* Controls */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="relative w-full lg:w-1/3">
            <input
              type="text"
              placeholder="Search by title, provider, description, or country..."
              className="p-3 pl-10 pr-10 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            )}
          </div>

          <div className="flex gap-4 w-full lg:w-auto">
            <select
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="deadline">Sort by Deadline</option>
              <option value="title">Sort by Title</option>
              <option value="provider">Sort by Provider</option>
              <option value="created_at">Sort by Created</option>
            </select>

            <select
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>            <Button
              customClass="bg-green-600 text-white hover:bg-green-700 px-6 py-3"
              onClick={handleCreateScholarship}
            >
              <span className="flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                </svg>
                Create New Scholarship
              </span>
            </Button>
          </div>
        </div>
      </div>

      {/* Search Results Counter */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-800">
                {filteredAndSortedScholarships.length} {filteredAndSortedScholarships.length === 1 ? 'Scholarship' : 'Scholarships'} Found
              </p>
              {searchTerm && (
                <p className="text-sm text-gray-600">
                  Search results for: <span className="font-medium text-blue-600">&ldquo;{searchTerm}&rdquo;</span>
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <span>Sorted by:</span>
            <span className="font-medium text-gray-700 capitalize">
              {sortBy === 'created_at' ? 'Created Date' : sortBy} ({sortOrder === 'asc' ? 'A-Z' : 'Z-A'})
            </span>
          </div>
        </div>
      </div>

      {/* Scholarship List */}
      {filteredAndSortedScholarships.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-gray-200">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
            </svg>
          </div>
          <p className="text-xl text-gray-600 font-medium">No scholarships found</p>
          <p className="text-gray-500 mt-2">Try adjusting your search terms or create a new scholarship</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredAndSortedScholarships.map((scholarship) => (
            <ScholarshipItem
              key={scholarship.id}
              data={scholarship}
              onRefresh={fetchScholarship}
            />
          ))}
        </div>
      )}
    </div>
  );
};

Scholarships.propTypes = {
  filteredAndSortedScholarships: PropTypes.array.isRequired,
  searchTerm: PropTypes.string.isRequired,
  setSearchTerm: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
  setSortBy: PropTypes.func.isRequired,
  sortOrder: PropTypes.string.isRequired,
  setSortOrder: PropTypes.func.isRequired,
  fetchScholarship: PropTypes.func.isRequired
};

export default Scholarships;
