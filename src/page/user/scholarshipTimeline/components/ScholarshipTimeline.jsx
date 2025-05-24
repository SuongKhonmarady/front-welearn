import { useEffect, useRef, useState } from "react";
import { DataSet, Timeline } from "vis-timeline/standalone";
import moment from "moment";
import "vis-timeline/styles/vis-timeline-graph2d.min.css";
import PropTypes from "prop-types";
import ScholarshipDetailModal from "./ScholarshipDetailModal";

export default function ScholarshipTimeline({ scholarships }) {
  const timelineRef = useRef(null);
  const timelineInstance = useRef(null);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
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
            : 'regular-scholarship';

        return {
          id: s.id,
          content: `
          <div class="p-3 scholarship-card ${colorClass}">
            <div class="flex items-start gap-3">
              <div class="scholarship-icon">🎓</div>                <div class="flex-1">
                <div class="font-semibold text-gray-900 mb-1 line-clamp-2">${s.description ? s.description.substring(0, 150) + (s.description.length > 150 ? '...' : '') : 'No description available'}</div>
                <div class="flex flex-wrap gap-2 mt-2">
                  ${s.country ? `
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      ${s.country}
                    </span>
                  ` : ''}
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium deadline-badge">
                    Deadline: ${moment(s.deadline).format("MMM Do, YYYY")}
                  </span>
                </div>
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
    timelineInstance.current = timeline;

    timeline.on("select", function (properties) {
      const selectedId = properties.items[0];
      if (!selectedId) return;

      const selected = scholarships.find((s) => s.id === selectedId);
      if (selected) {
        setSelectedScholarship(selected);
        setModalOpen(true);
      }
    });
  }, [scholarships, view]);

  const handleViewChange = (newView) => {
    setView(newView);
  };

  return (
    <div className="space-y-4">
      {/* Timeline Controls */}
      <div className="flex items-center justify-between p-4 bg-[#f8fafc] border border-gray-200 rounded-lg shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-[#283d50]">View Range:</span>
          <div className="flex rounded-lg shadow-sm">
            <button
              onClick={() => handleViewChange('threeMonths')}
              className={`px-4 py-2 text-sm font-medium ${
                view === 'threeMonths'
                  ? 'bg-[#283d50] text-white border-[#283d50]'
                  : 'bg-white text-[#283d50] border-gray-200 hover:bg-gray-50'
              } border first:rounded-l-lg last:rounded-r-lg transition-colors`}
            >
              3 Months
            </button>
            <button
              onClick={() => handleViewChange('sixMonths')}
              className={`px-4 py-2 text-sm font-medium ${
                view === 'sixMonths'
                  ? 'bg-[#283d50] text-white border-[#283d50]'
                  : 'bg-white text-[#283d50] border-gray-200 hover:bg-gray-50'
              } border -ml-px transition-colors`}
            >
              6 Months
            </button>
            <button
              onClick={() => handleViewChange('year')}
              className={`px-4 py-2 text-sm font-medium ${
                view === 'year'
                  ? 'bg-[#283d50] text-white border-[#283d50]'
                  : 'bg-white text-[#283d50] border-gray-200 hover:bg-gray-50'
              } border -ml-px transition-colors`}
            >
              Full Year
            </button>
          </div>
        </div>
        <div className="text-sm text-[#283d50]">
          Click on a scholarship to view details
        </div>
      </div>

      {/* Timeline Container */}
      <div className="bg-[#f8fafc] border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        {scholarships.some(s => s.deadline && s.deadline.trim() !== '') ? (
          <div ref={timelineRef} className="timeline-container"></div>
        ) : (
          <div className="p-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#e5e9f0] mb-4">
              <span className="text-2xl">📅</span>
            </div>
            <h3 className="text-lg font-medium text-[#283d50] mb-1">No Scholarships Available</h3>
            <p className="text-gray-500">There are currently no scholarships with deadlines to display.</p>
          </div>
        )}
      </div>

      <ScholarshipDetailModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        data={selectedScholarship}
      />

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
