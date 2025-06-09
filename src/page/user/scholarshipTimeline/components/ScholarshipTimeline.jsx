import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataSet, Timeline } from "vis-timeline/standalone";
import moment from "moment";
import "vis-timeline/styles/vis-timeline-graph2d.min.css";
import PropTypes from "prop-types";

export default function ScholarshipTimeline({ scholarships }) {
  const navigate = useNavigate();
  const timelineRef = useRef(null);
  const timelineInstance = useRef(null);
  const [view, setView] = useState('sixMonths'); // 'threeMonths', 'sixMonths', 'year'

  useEffect(() => {
    if (!timelineRef.current) return;

    if (timelineInstance.current) {
      timelineInstance.current.destroy();
    }

    const container = timelineRef.current;
    const groups = new DataSet([{ id: 1, content: "" }]);    // Filter out scholarships without deadlines
    const validScholarships = scholarships.filter(s => s && s.deadline && s.deadline.trim() !== '');

    const items = new DataSet(
      validScholarships.map((s) => {
        // Ensure we have all required properties
        const scholarship = {
          id: s.id,
          description: s.description || '',
          deadline: s.deadline,
          post_at: s.post_at || moment().format(),
          title: s.title || 'Untitled Scholarship',
          country: s.country || ''
        };
        
        const daysUntilDeadline = moment(scholarship.deadline).diff(moment(), 'days');
        const colorClass = daysUntilDeadline < 7 
          ? 'urgent-scholarship'
          : daysUntilDeadline < 30
            ? 'soon-scholarship'
            : 'regular-scholarship';        return {
          id: s.id,
          content: `
            <div class="scholarship-card ${colorClass}">
              <div class="card-body">
                <h3 class="card-title">${s.title ? s.title.substring(0, 80) + (s.title.length > 80 ? '...' : '') : 'Untitled Scholarship'}</h3>
                <div class="card-info">
                  ${s.country ? `<span class="location">📍 ${s.country}</span>` : ''}
                  <span class="deadline">📅 ${moment(s.deadline).format("MMM Do")}</span>
                </div>
                <div class="days-remaining ${colorClass}">
                  ${daysUntilDeadline >= 0 ? `${daysUntilDeadline} days left` : 'Expired'}
                </div>
              </div>
            </div>
          `,start: s.post_at,  // Fallback to current date if post_at is missing
          end: s.deadline,
          group: 1,
          className: colorClass,
          title: `${s.title} - Deadline: ${moment(s.deadline).format("MMM Do, YYYY")}`,
        };
      })
    );

    const viewRanges = {
      threeMonths: {
        start: moment().subtract(2, 'weeks'),
        end: moment().add(3, 'months')
      },
      sixMonths: {
        start: moment().subtract(1, 'month'),
        end: moment().add(6, 'months')
      },
      year: {
        start: moment().startOf('year'),
        end: moment().endOf('year')
      }
    };

    const options = {
      ...viewRanges[view],
      showCurrentTime: true,
      showMajorLabels: true,
      showMinorLabels: true,
      stack: true,
      stackSubgroups: true,
      zoomable: true,
      horizontalScroll: true,
      verticalScroll: true,
      maxHeight: 450,
      minHeight: 400,
      orientation: { axis: "top" },
      margin: { item: { horizontal: 10, vertical: 10 } },
      template: function (item) {
        return item.content;
      }
    };

    const timeline = new Timeline(container, items, groups, options);
    timelineInstance.current = timeline;    timeline.on("select", function (properties) {
      const selectedId = properties.items[0];
      if (!selectedId) return;

      const selected = scholarships.find((s) => s.id === selectedId);
      if (selected) {
        // Navigate to the scholarship detail page
        navigate(`/scholarship/${selected.id}`);
      }
    });
  }, [scholarships, view, navigate]);

  const handleViewChange = (newView) => {
    setView(newView);
  };
  return (
    <div className="space-y-6">
      {/* Enhanced Timeline Controls */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Timeline View</h2>
              <p className="text-sm text-gray-500">Visualize scholarship deadlines chronologically</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600">Range:</span>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => handleViewChange('threeMonths')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
                  view === 'threeMonths'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                3M
              </button>
              <button
                onClick={() => handleViewChange('sixMonths')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
                  view === 'sixMonths'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                6M
              </button>
              <button
                onClick={() => handleViewChange('year')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200 ${
                  view === 'year'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                1Y
              </button>
            </div>
          </div>
        </div>
        
        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-gray-100">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Status:</span>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-400 to-blue-500"></div>
            <span className="text-sm text-gray-600">Open</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500"></div>
            <span className="text-sm text-gray-600">Soon (≤30 days)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-red-400 to-red-500"></div>
            <span className="text-sm text-gray-600">Urgent (≤7 days)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-gray-400 to-gray-500"></div>
            <span className="text-sm text-gray-600">Expired</span>
          </div>
        </div>
      </div>      {/* Enhanced Timeline Container */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {scholarships.some(s => s.deadline && s.deadline.trim() !== '') ? (
          <div className="timeline-wrapper">
            <div ref={timelineRef} className="timeline-container"></div>
            <div className="timeline-footer">
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Click any scholarship card to view detailed information</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-50 to-indigo-100 mb-6">
              <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Scholarships in Timeline</h3>
            <p className="text-gray-500 max-w-md mx-auto">There are currently no scholarships with deadlines to display in the timeline view. Check back later for new opportunities!</p>
          </div>        )}
      </div>

      <style>{`
        .timeline-container {
          background: #f8fafc;
          padding: 1rem;
        }

        .vis-timeline {
          border: none;
          font-family: inherit;
        }

        .vis-panel.vis-center,
        .vis-panel.vis-left,
        .vis-panel.vis-right {
          border-color: #e5e7eb;
        }

        .vis-item {
          border-radius: 0.5rem;
          border-color: transparent !important;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          transition: all 0.2s;
        }

        .vis-item.regular-scholarship {
          background-color: #EEF2FF;
          border-left: 4px solid #6366F1 !important;
        }

        .vis-item.soon-scholarship {
          background-color: #FEF3C7;
          border-left: 4px solid #F59E0B !important;
        }

        .vis-item.urgent-scholarship {
          background-color: #FEE2E2;
          border-left: 4px solid #EF4444 !important;
        }

        .vis-item:hover {
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          transform: translateY(-1px);
        }

        .vis-item.vis-selected {
          box-shadow: 0 0 0 2px #4F46E5 !important;
        }

        .vis-item.vis-selected .scholarship-icon {
          background: rgba(79, 70, 229, 0.1);
        }

        .scholarship-icon {
          font-size: 1.5rem;
          width: 2.5rem;
          height: 2.5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.05);
          border-radius: 0.5rem;
        }

        .regular-scholarship .scholarship-icon {
          color: #6366F1;
        }

        .soon-scholarship .scholarship-icon {
          color: #F59E0B;
        }

        .urgent-scholarship .scholarship-icon {
          color: #EF4444;
        }

        .deadline-badge {
          background: rgba(0, 0, 0, 0.05);
          color: inherit;
        }

        .vis-time-axis .vis-text {
          color: #283d50;
          font-size: 0.875rem;
        }

        .vis-time-axis .vis-grid.vis-minor {
          border-color: #f1f5f9;
        }

        .vis-time-axis .vis-grid.vis-major {
          border-color: #e5e7eb;
        }

        .vis-timeline .vis-today {
          background-color: rgba(79, 70, 229, 0.1);
        }

        .vis-timeline .vis-current-time {
          background-color: #4F46E5;
          width: 2px;
        }

        .scholarship-card {
          min-height: 100px;
          max-height: 160px;
          overflow: hidden;
          width: 100%;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}</style>
    </div>
  );
}

ScholarshipTimeline.propTypes = {
  scholarships: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      post_at: PropTypes.string.isRequired,
      deadline: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      university: PropTypes.string,
      country: PropTypes.string,
      eligibility: PropTypes.string,
    })
  ).isRequired,
};
