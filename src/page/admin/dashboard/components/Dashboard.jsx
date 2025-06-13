import PropTypes from 'prop-types';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts';
import Button from '../../../../ui/shared/Button';

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
    </div>
  );
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
    </div>
  );
};

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  change: PropTypes.string,
  icon: PropTypes.string.isRequired,
  color: PropTypes.oneOf(['blue', 'green', 'yellow', 'red', 'purple'])
};

const Dashboard = ({ 
  scholarshipStats, 
  aggregatedScholarshipData, 
  listScholarship, 
  setCreate, 
  setCurrentView 
}) => {
  // Prepare pie chart data
  const pieChartData = [
    { name: 'Active', value: scholarshipStats.active, color: COLORS[0] },
    { name: 'Expired', value: scholarshipStats.expired, color: COLORS[3] },
    { name: 'Urgent', value: scholarshipStats.urgent, color: COLORS[2] }
  ].filter(item => item.value > 0);

  return (
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
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
        <StatCard
          title="Today New Upload"
          value={scholarshipStats.todayUploads}
          change={scholarshipStats.todayUploads > 0 ? `+${scholarshipStats.todayUploads}` : '0'}
          icon="📈"
          color="green"
        />
        <StatCard
          title="Yesterday New Upload"
          value={scholarshipStats.yesterdayUploads}
          change={scholarshipStats.yesterdayUploads > 0 ? `+${scholarshipStats.yesterdayUploads}` : '0'}
          icon="📊"
          color="purple"
        />
      </div>

      {/* Daily Analytics Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h3 className="text-xl font-semibold mb-6 text-gray-800">📊 Upload Analytics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Today Uploads</p>
                <p className="text-2xl font-bold text-blue-800">{scholarshipStats.todayUploads}</p>
                <p className="text-xs text-blue-600 mt-1">
                  {scholarshipStats.todayUploads === 1 ? '1 new scholarship' : `${scholarshipStats.todayUploads} new scholarships`}
                </p>
              </div>
              <div className="text-2xl">🌟</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">Yesterday Uploads</p>
                <p className="text-2xl font-bold text-purple-800">{scholarshipStats.yesterdayUploads}</p>
                <p className="text-xs text-purple-600 mt-1">
                  {scholarshipStats.yesterdayUploads === 1 ? '1 scholarship added' : `${scholarshipStats.yesterdayUploads} scholarships added`}
                </p>
              </div>
              <div className="text-2xl">📝</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">This Week</p>
                <p className="text-2xl font-bold text-green-800">{scholarshipStats.thisWeekUploads}</p>
                <p className="text-xs text-green-600 mt-1">
                  Past 7 days
                </p>
              </div>
              <div className="text-2xl">📅</div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700">This Month</p>
                <p className="text-2xl font-bold text-orange-800">{scholarshipStats.thisMonthUploads}</p>
                <p className="text-xs text-orange-600 mt-1">
                  Current month
                </p>
              </div>
              <div className="text-2xl">🗓️</div>
            </div>
          </div>
        </div>
        
        {/* Upload Comparison */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="text-lg font-semibold mb-4 text-gray-700">Daily Comparison</h4>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
              <span>Today: <strong>{scholarshipStats.todayUploads}</strong></span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
              <span>Yesterday: <strong>{scholarshipStats.yesterdayUploads}</strong></span>
            </div>
            <div className="flex items-center space-x-2">
              {scholarshipStats.todayUploads > scholarshipStats.yesterdayUploads ? (
                <>
                  <span className="text-green-600">📈</span>
                  <span className="text-green-600 font-medium">
                    +{scholarshipStats.todayUploads - scholarshipStats.yesterdayUploads} more than yesterday
                  </span>
                </>
              ) : scholarshipStats.todayUploads < scholarshipStats.yesterdayUploads ? (
                <>
                  <span className="text-red-600">📉</span>
                  <span className="text-red-600 font-medium">
                    {scholarshipStats.yesterdayUploads - scholarshipStats.todayUploads} less than yesterday
                  </span>
                </>
              ) : (
                <>
                  <span className="text-gray-600">➖</span>
                  <span className="text-gray-600 font-medium">Same as yesterday</span>
                </>
              )}
            </div>
          </div>
        </div>
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
  );
};

Dashboard.propTypes = {
  scholarshipStats: PropTypes.shape({
    total: PropTypes.number.isRequired,
    active: PropTypes.number.isRequired,
    expired: PropTypes.number.isRequired,
    urgent: PropTypes.number.isRequired,
    todayUploads: PropTypes.number.isRequired,
    yesterdayUploads: PropTypes.number.isRequired,
    thisWeekUploads: PropTypes.number.isRequired,
    thisMonthUploads: PropTypes.number.isRequired
  }).isRequired,
  aggregatedScholarshipData: PropTypes.array.isRequired,
  listScholarship: PropTypes.array.isRequired,
  setCreate: PropTypes.func.isRequired,
  setCurrentView: PropTypes.func.isRequired
};

export default Dashboard;
