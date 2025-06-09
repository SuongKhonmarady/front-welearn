import { useState, useEffect, useMemo, useContext, useCallback } from 'react';
import { Link, useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import ScholarshipDataContext from "../../../context/scholarship/ScholarshipContext";
import { getScholarship } from "../../../context/scholarship/Scholarship";
import CreateScholarship from "../manageScholarship/components/CreateScholarship";
import ScholarshipItem from "../manageScholarship/components/ScholarshipItem";
import Spinner from "../../../ui/shared/Spinner";
import Button from "../../../ui/shared/Button";
import Logo from "../../../assets/Logo.png";
import { logOut } from "../../../context/user/UserAction";

// Helper function to get the ISO week number for a date
const getWeekNumber = (d) => {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return weekNo.toString().padStart(2, '0');
};

// Colors for pie chart
const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

// ScholarshipCard Component
const ScholarshipCard = ({ scholarship }) => {
  const deadlineDate = new Date(scholarship.deadline);
  const currentDate = new Date();
  const daysUntilDeadline = Math.ceil((deadlineDate - currentDate) / (1000 * 60 * 60 * 24));
  const isExpired = daysUntilDeadline < 0;
  const isUrgent = daysUntilDeadline <= 7 && daysUntilDeadline >= 0;

  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 border-l-4 hover:shadow-xl hover:scale-[1.02] transform transition-all duration-300 ease-in-out flex flex-col justify-between ${
      isExpired ? 'border-l-red-500' : isUrgent ? 'border-l-yellow-500' : 'border-l-blue-500'
    }`}>
      <div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-blue-700 mb-2 line-clamp-2">{scholarship.title}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            isExpired ? 'bg-red-100 text-red-800' : isUrgent ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
          }`}>
            {isExpired ? 'Expired' : isUrgent ? 'Urgent' : 'Active'}
          </span>
        </div>
        <p className="text-gray-700 text-base mb-4 line-clamp-3">{scholarship.description}</p>
      </div>
      <div>
        <div className="text-sm text-gray-600 mb-3">
          <p><strong className="font-medium">Provider:</strong> {scholarship.provider}</p>
          <p><strong className="font-medium">Deadline:</strong> {deadlineDate.toLocaleDateString()}</p>
          <p><strong className="font-medium">Days left:</strong> 
            <span className={`ml-1 ${isExpired ? 'text-red-600' : isUrgent ? 'text-yellow-600' : 'text-green-600'}`}>
              {isExpired ? 'Expired' : `${daysUntilDeadline} days`}
            </span>
          </p>
        </div>
      </div>
    </div>  );
};

ScholarshipCard.propTypes = {
  scholarship: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    provider: PropTypes.string.isRequired,
    deadline: PropTypes.string.isRequired,
    created_at: PropTypes.string,
    addedDate: PropTypes.string
  }).isRequired
};

// Statistics Card Component
const StatCard = ({ title, value, change, icon, color = "blue" }) => {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600 border-blue-200",
    green: "bg-green-50 text-green-600 border-green-200",
    yellow: "bg-yellow-50 text-yellow-600 border-yellow-200",
    red: "bg-red-50 text-red-600 border-red-200",
    purple: "bg-purple-50 text-purple-600 border-purple-200"
  };

  return (
    <div className={`${colorClasses[color]} rounded-xl p-6 border-2 shadow-lg hover:shadow-xl transition-all duration-300`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium opacity-80">{title}</p>
          <p className="text-3xl font-bold mt-1">{value}</p>
          {change && (
            <p className={`text-sm mt-1 ${change.includes('+') ? 'text-green-600' : 'text-red-600'}`}>
              {change}
            </p>
          )}
        </div>
        <div className="text-4xl opacity-80">
          {icon}
        </div>
      </div>
    </div>  );
};

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  change: PropTypes.string,
  icon: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['blue', 'green', 'yellow', 'red', 'purple'])
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [aggregatedScholarshipData, setAggregatedScholarshipData] = useState([]);
  const [currentView, setCurrentView] = useState('Dashboard');
  const [timeframe, setTimeframe] = useState('monthly');
  const [startDateFilter, setStartDateFilter] = useState('2024-01');
  const [endDateFilter, setEndDateFilter] = useState('2025-12');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('deadline');
  const [sortOrder, setSortOrder] = useState('asc');
  const [isCreate, setCreate] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { listScholarship, dispatch, loading } = useContext(ScholarshipDataContext);

  // Handle logout functionality
  const handleLogout = async () => {
    const res = await logOut();
    if (res) {
      navigate("/");
    }
  };

  const fetchScholarship = useCallback(async () => {
    const data = await getScholarship();
    dispatch({ type: "SET_SCHOLARSHIP", payload: data });
  }, [dispatch]);

  useEffect(() => {
    fetchScholarship();
  }, [fetchScholarship]);

  // Calculate statistics
  const scholarshipStats = useMemo(() => {
    const currentDate = new Date();
    
    const total = listScholarship.length;
    const active = listScholarship.filter(s => new Date(s.deadline) > currentDate).length;
    const expired = listScholarship.filter(s => new Date(s.deadline) <= currentDate).length;
    const urgent = listScholarship.filter(s => {
      const deadline = new Date(s.deadline);
      const daysUntil = Math.ceil((deadline - currentDate) / (1000 * 60 * 60 * 24));
      return daysUntil <= 7 && daysUntil >= 0;
    }).length;
    
    return { total, active, expired, urgent };
  }, [listScholarship]);

  // Aggregation logic for analytics chart
  useEffect(() => {
    if (listScholarship.length === 0) {
      setAggregatedScholarshipData([]);
      return;
    }

    const counts = {};
    const startFilterDate = startDateFilter ? new Date(`${startDateFilter}-01T00:00:00Z`) : null;
    let endFilterDate = null;
    if (endDateFilter) {
      const [year, month] = endDateFilter.split('-').map(Number);
      endFilterDate = new Date(Date.UTC(year, month, 1));
    }

    const filteredByDateRange = listScholarship.filter(scholarship => {
      const createdDate = new Date(`${scholarship.created_at || scholarship.addedDate || new Date().toISOString().split('T')[0]}T00:00:00Z`);
      const isAfterStart = !startFilterDate || createdDate >= startFilterDate;
      const isBeforeEnd = !endFilterDate || createdDate < endFilterDate;
      return isAfterStart && isBeforeEnd;
    });

    filteredByDateRange.forEach(scholarship => {
      const dateObj = new Date(scholarship.created_at || scholarship.addedDate || new Date());
      let key;

      if (timeframe === 'daily') {
        key = dateObj.toISOString().split('T')[0];
      } else if (timeframe === 'weekly') {
        key = `${dateObj.getFullYear()}-W${getWeekNumber(dateObj)}`;
      } else if (timeframe === 'monthly') {
        key = `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1).toString().padStart(2, '0')}`;
      } else if (timeframe === 'yearly') {
        key = `${dateObj.getFullYear()}`;
      }

      counts[key] = (counts[key] || 0) + 1;
    });

    const aggregatedData = Object.keys(counts).map(key => ({
      name: key,
      'Scholarships Added': counts[key]
    })).sort((a, b) => {
      const getDateForSorting = (dateString) => {
        if (dateString.includes('-W')) {
          const [yearStr, weekStr] = dateString.split('-W');
          const year = parseInt(yearStr);
          const week = parseInt(weekStr);
          const d = new Date(year, 0, 1 + (week - 1) * 7);
          d.setUTCDate(d.getUTCDate() + (1 - (d.getUTCDay() || 7)));
          return d;
        } else if (dateString.length === 7 && dateString.includes('-')) {
          return new Date(`${dateString}-01`);
        } else if (dateString.length === 4) {
          return new Date(`${dateString}-01-01`);
        }
        return new Date(dateString);
      };

      const dateA = getDateForSorting(a.name);
      const dateB = getDateForSorting(b.name);
      return dateA - dateB;
    });

    setAggregatedScholarshipData(aggregatedData);
  }, [listScholarship, timeframe, startDateFilter, endDateFilter]);

  // Filter and sort scholarships
  const filteredAndSortedScholarships = useMemo(() => {
    let currentScholarships = [...listScholarship];

    // Enhanced search functionality with safe property access
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase().trim();
      currentScholarships = currentScholarships.filter(scholarship => {
        const title = (scholarship.title || '').toLowerCase();
        const provider = (scholarship.provider || '').toLowerCase();
        const description = (scholarship.description || '').toLowerCase();
        const country = (scholarship.country || '').toLowerCase();
        const hostCountry = (scholarship.host_country || '').toLowerCase();
        
        return title.includes(lowerCaseSearchTerm) ||
               provider.includes(lowerCaseSearchTerm) ||
               description.includes(lowerCaseSearchTerm) ||
               country.includes(lowerCaseSearchTerm) ||
               hostCountry.includes(lowerCaseSearchTerm);
      });
    }

    // Enhanced sorting with better error handling
    currentScholarships.sort((a, b) => {
      let comparison = 0;
      try {
        if (sortBy === 'title') {
          const titleA = (a.title || '').toLowerCase();
          const titleB = (b.title || '').toLowerCase();
          comparison = titleA.localeCompare(titleB);
        } else if (sortBy === 'deadline') {
          const deadlineA = new Date(a.deadline || '1970-01-01');
          const deadlineB = new Date(b.deadline || '1970-01-01');
          comparison = deadlineA - deadlineB;
        } else if (sortBy === 'created_at') {
          const createdA = new Date(a.created_at || a.addedDate || '1970-01-01');
          const createdB = new Date(b.created_at || b.addedDate || '1970-01-01');
          comparison = createdA - createdB;
        } else if (sortBy === 'provider') {
          const providerA = (a.provider || '').toLowerCase();
          const providerB = (b.provider || '').toLowerCase();
          comparison = providerA.localeCompare(providerB);
        }
      } catch (error) {
        console.warn('Error in scholarship sorting:', error);
        comparison = 0;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return currentScholarships;
  }, [listScholarship, searchTerm, sortBy, sortOrder]);

  // Prepare pie chart data
  const pieChartData = [
    { name: 'Active', value: scholarshipStats.active, color: COLORS[0] },
    { name: 'Expired', value: scholarshipStats.expired, color: COLORS[3] },
    { name: 'Urgent', value: scholarshipStats.urgent, color: COLORS[2] }
  ].filter(item => item.value > 0);

  if (loading) {
    return <Spinner isFull />;
  }

  return (    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Navigation with Integrated Sidebar Functionality */}
      <nav className="bg-blue-800 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Left side - Logo and Brand */}
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center">
                <img src={Logo} alt="WeLearn Logo" className="h-10 w-10" />
              </Link>
              <div className="text-white text-xl font-bold">
                Scholarship Admin
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {['Dashboard', 'Scholarships', 'Analytics', 'Settings'].map((view) => (
                <button
                  key={view}
                  onClick={() => setCurrentView(view)}
                  className={`text-white hover:text-blue-200 transition-colors duration-200 px-3 py-2 rounded-md ${
                    currentView === view ? 'bg-blue-900 font-bold' : 'hover:bg-blue-700'
                  }`}
                >
                  {view}
                </button>              ))}
              
              <button
                onClick={handleLogout}
                className="text-white hover:text-blue-200 hover:bg-blue-700 transition-colors duration-200 px-3 py-2 rounded-md flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                </svg>
                Logout
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white hover:text-blue-200 p-2"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                    d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 border-t border-blue-700">
                {['Dashboard', 'Scholarships', 'Analytics', 'Settings'].map((view) => (
                  <button
                    key={view}
                    onClick={() => {
                      setCurrentView(view);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`block w-full text-left text-white hover:text-blue-200 hover:bg-blue-700 px-3 py-2 rounded-md transition-colors duration-200 ${
                      currentView === view ? 'bg-blue-900 font-bold' : ''
                    }`}
                  >
                    {view}
                  </button>                ))}
                
                  <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left text-white hover:text-blue-200 hover:bg-blue-700 px-3 py-2 rounded-md transition-colors duration-200 flex items-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                  </svg>
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      <div className="p-8">
        {/* Dashboard View */}
        {currentView === 'Dashboard' && (
          <div className="space-y-8">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl shadow-lg p-12 text-center">
              <h2 className="text-4xl font-extrabold mb-4">Welcome to Admin Dashboard!</h2>
              <p className="text-xl opacity-90">Manage your scholarship opportunities efficiently</p>
              <div className="mt-8">
                <Button
                  customClass="bg-white text-blue-700 hover:bg-gray-100 font-bold px-6 py-3"
                  onClick={() => setCreate(true)}
                >
                  <span className="flex items-center">
                    Create New Scholarship
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                    </svg>
                  </span>
                </Button>
              </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                title="Total Scholarships"
                value={scholarshipStats.total}
                icon="🎓"
                color="blue"
              />
              <StatCard
                title="Active Scholarships"
                value={scholarshipStats.active}
                icon="✅"
                color="green"
              />
              <StatCard
                title="Urgent (≤7 days)"
                value={scholarshipStats.urgent}
                icon="⚠️"
                color="yellow"
              />
              <StatCard
                title="Expired"
                value={scholarshipStats.expired}
                icon="❌"
                color="red"
              />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Bar Chart */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold mb-4">Scholarships Added Over Time</h3>
                {aggregatedScholarshipData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={aggregatedScholarshipData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Bar dataKey="Scholarships Added" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="text-center text-gray-500 py-8">No data available</div>
                )}
              </div>

              {/* Pie Chart */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold mb-4">Scholarship Status Distribution</h3>
                {pieChartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="text-center text-gray-500 py-8">No data available</div>
                )}
              </div>
            </div>

            {/* Recent Scholarships */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">Recent Scholarships</h3>
                <Button
                  customClass="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2"
                  onClick={() => setCurrentView('Scholarships')}
                >
                  View All
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {listScholarship.slice(0, 6).map((scholarship) => (
                  <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Scholarships View */}
        {currentView === 'Scholarships' && (
          <div className="space-y-8">
            <header className="text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Scholarship Management</h1>
              <p className="text-lg text-gray-600">Browse, search, and manage scholarship opportunities</p>
            </header>

            {/* Controls */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">                <div className="relative w-full lg:w-1/3">
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

                <div className="flex gap-4 w-full lg:w-auto">                  <select
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
                  </select>

                  <Button
                    customClass="bg-green-600 text-white hover:bg-green-700 px-6 py-3"
                    onClick={() => setCreate(true)}
                  >
                    <span className="flex items-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                      </svg>
                      Create
                    </span>
                  </Button>                </div>
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
                    </p>                    {searchTerm && (
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
        )}

        {/* Analytics View */}
        {currentView === 'Analytics' && (
          <div className="space-y-8">
            <header className="text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Analytics Dashboard</h1>
              <p className="text-lg text-gray-600">Detailed insights into scholarship data</p>
            </header>

            {/* Controls */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center gap-2">
                    <label className="text-gray-700 font-medium">From:</label>
                    <input
                      type="month"
                      className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={startDateFilter}
                      onChange={(e) => setStartDateFilter(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-gray-700 font-medium">To:</label>
                    <input
                      type="month"
                      className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={endDateFilter}
                      onChange={(e) => setEndDateFilter(e.target.value)}
                    />
                  </div>
                </div>
                <select
                  className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
            </div>

            {/* Charts */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
              <h2 className="text-2xl font-semibold mb-6">Scholarships Added Over Time</h2>
              {aggregatedScholarshipData.length > 0 ? (
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={aggregatedScholarshipData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Scholarships Added" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  No data available for the selected timeframe
                </div>
              )}
            </div>
          </div>
        )}

        {/* Settings View */}
        {currentView === 'Settings' && (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-gray-200">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">Settings</h2>
            <p className="text-lg text-gray-600">System settings and configuration options will appear here</p>
          </div>
        )}
      </div>

      {/* Create Scholarship Modal */}
      {isCreate && <CreateScholarship onClose={() => setCreate(false)} />}
    </div>
  );
}
