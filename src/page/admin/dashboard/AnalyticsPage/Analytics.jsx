import PropTypes from 'prop-types';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const Analytics = ({ 
  scholarshipStats,
  aggregatedScholarshipData,
  timeframe,
  setTimeframe,
  startDateFilter,
  setStartDateFilter,
  endDateFilter,
  setEndDateFilter
}) => {
  // Debug logging
  console.log('Analytics Data:', aggregatedScholarshipData);
  console.log('Data Length:', aggregatedScholarshipData.length);
  
  // Ensure data has the correct structure
  const validatedData = aggregatedScholarshipData.map(item => ({
    ...item,
    'Scholarships Added': item['Scholarships Added'] || item.count || 0
  }));
  
  return (
    <div className="space-y-8">

      {/* Quick Analytics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium">Today&apos;s Uploads</p>
              <p className="text-3xl font-bold">{scholarshipStats.todayUploads}</p>
              <p className="text-blue-100 text-xs mt-1">
                {scholarshipStats.todayUploads > scholarshipStats.yesterdayUploads ? '↗️ More than yesterday' : 
                 scholarshipStats.todayUploads < scholarshipStats.yesterdayUploads ? '↘️ Less than yesterday' : 
                 '➡️ Same as yesterday'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium">This Week</p>
              <p className="text-3xl font-bold">{scholarshipStats.thisWeekUploads}</p>
              <p className="text-purple-100 text-xs mt-1">Last 7 days</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">This Month</p>
              <p className="text-3xl font-bold">{scholarshipStats.thisMonthUploads}</p>
              <p className="text-green-100 text-xs mt-1">Current month</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm font-medium">Total Active</p>
              <p className="text-3xl font-bold">{scholarshipStats.active}</p>
              <p className="text-orange-100 text-xs mt-1">Available now</p>
            </div>
            <div className="text-3xl">🎓</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2">
              <label className="text-gray-700 font-medium">📅 From:</label>
              <input
                type="month"
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                value={startDateFilter}
                onChange={(e) => setStartDateFilter(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-gray-700 font-medium">📅 To:</label>
              <input
                type="month"
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                value={endDateFilter}
                onChange={(e) => setEndDateFilter(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="text-gray-700 font-medium">📊 View:</label>
            <select
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition-colors"
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
            >
              <option value="daily">📆 Daily View</option>
              <option value="weekly">📈 Weekly View</option>
              <option value="monthly">📊 Monthly View</option>
              <option value="yearly">📋 Yearly View</option>
            </select>
          </div>
        </div>
      </div>

      {/* Enhanced Charts */}
      <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Scholarship Upload Trends</h2>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Uploads ({timeframe})</span>
            </div>            {validatedData.length > 0 && (
              <span className="bg-gray-100 px-3 py-1 rounded-full font-medium">
                Total: {validatedData.reduce((sum, item) => sum + item['Scholarships Added'], 0)} scholarships
              </span>
            )}
          </div>
        </div>        {validatedData.length > 0 ? (
          <div className="space-y-4">
            <ResponsiveContainer width="100%" height={450}>
              <BarChart 
                data={validatedData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 60,
                }}
                barCategoryGap="20%"
                maxBarSize={60}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 12, fill: '#374151' }}
                  angle={timeframe === 'daily' ? -45 : 0}
                  textAnchor={timeframe === 'daily' ? 'end' : 'middle'}
                  height={timeframe === 'daily' ? 80 : 60}
                  interval={aggregatedScholarshipData.length > 10 ? 'preserveStartEnd' : 0}
                  axisLine={{ stroke: '#e5e7eb' }}
                  tickLine={{ stroke: '#e5e7eb' }}
                />
                <YAxis 
                  allowDecimals={false} 
                  tick={{ fontSize: 12, fill: '#374151' }}
                  axisLine={{ stroke: '#e5e7eb' }}
                  tickLine={{ stroke: '#e5e7eb' }}
                  domain={[0, 'dataMax + 2']}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#1f2937',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                    fontSize: '14px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  }}
                  formatter={(value) => [
                    `${value} ${value === 1 ? 'scholarship' : 'scholarships'}`,
                    'Uploaded'
                  ]}
                  labelFormatter={(label) => {
                    if (timeframe === 'daily') {
                      const date = new Date(label);
                      return date.toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      });
                    } else if (timeframe === 'weekly') {
                      return `Week ${label.split('-W')[1]}, ${label.split('-W')[0]}`;
                    } else if (timeframe === 'monthly') {
                      const [year, month] = label.split('-');
                      const date = new Date(year, month - 1);
                      return date.toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long' 
                      });
                    }
                    return label;
                  }}
                />
                <Legend 
                  wrapperStyle={{
                    paddingTop: '20px',
                    fontSize: '14px'
                  }}
                />
                <Bar 
                  dataKey="Scholarships Added" 
                  fill="#3B82F6" 
                  radius={[4, 4, 0, 0]}
                  stroke="#2563EB"
                  strokeWidth={1}
                  name="Scholarships Added"
                />
              </BarChart>
            </ResponsiveContainer>
            
            {/* Data Summary */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-700 mb-3">📈 Period Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">                <div className="bg-white p-3 rounded-lg border">
                  <p className="text-xs text-gray-500">Highest Day</p>
                  <p className="font-bold text-blue-600">
                    {Math.max(...validatedData.map(d => d['Scholarships Added']))}
                  </p>
                </div>
                <div className="bg-white p-3 rounded-lg border">
                  <p className="text-xs text-gray-500">Average</p>
                  <p className="font-bold text-green-600">
                    {(validatedData.reduce((sum, item) => sum + item['Scholarships Added'], 0) / validatedData.length).toFixed(1)}
                  </p>
                </div>
                <div className="bg-white p-3 rounded-lg border">
                  <p className="text-xs text-gray-500">Total Days</p>
                  <p className="font-bold text-purple-600">{validatedData.length}</p>
                </div>
                <div className="bg-white p-3 rounded-lg border">
                  <p className="text-xs text-gray-500">Active Days</p>
                  <p className="font-bold text-orange-600">
                    {validatedData.filter(d => d['Scholarships Added'] > 0).length}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Data Available</h3>
            <p className="text-gray-500 mb-4">
              No scholarship data found for the selected timeframe and date range.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-blue-700 text-sm">
                💡 Try adjusting your date range or timeframe to see more data.
              </p>
            </div>
          </div>
        )}
      </div>      {/* Recent Activity */}
      {timeframe === 'daily' && validatedData.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">🕐 Recent Daily Activity</h2>
          <div className="space-y-3">
            {validatedData.slice(-7).reverse().map((day, index) => (
              <div key={day.name} className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${day['Scholarships Added'] > 0 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <span className="font-medium text-gray-700">
                    {new Date(day.name).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                  {index === 0 && <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">Latest</span>}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-gray-800">{day['Scholarships Added']}</span>
                  <span className="text-sm text-gray-500">
                    {day['Scholarships Added'] === 1 ? 'upload' : 'uploads'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

Analytics.propTypes = {
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
  timeframe: PropTypes.string.isRequired,
  setTimeframe: PropTypes.func.isRequired,
  startDateFilter: PropTypes.string.isRequired,
  setStartDateFilter: PropTypes.func.isRequired,
  endDateFilter: PropTypes.string.isRequired,
  setEndDateFilter: PropTypes.func.isRequired
};

export default Analytics;
