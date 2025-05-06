import { useEffect, useRef, useState } from "react";
import { DataSet, Timeline } from "vis-timeline/standalone";
import moment from "moment";
import "vis-timeline/styles/vis-timeline-graph2d.min.css";
import PropTypes from "prop-types";
import ScholarshipDetailModal from "./ScholarshipDetailModal"; // Import the modal

export default function ScholarshipTimeline({ scholarships }) {
  const timelineRef = useRef(null);
  const timelineInstance = useRef(null);
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!timelineRef.current) return;

    if (timelineInstance.current) {
      timelineInstance.current.destroy();
    }

    const container = timelineRef.current;
    const groups = new DataSet([{ id: 1, content: "" }]);

    const items = new DataSet(
      scholarships.map((s) => ({
        id: s.id,
        content: `${s.description}`,
        start: s.post_at,
        end: s.deadline,
        group: 1,
        className: "timeline-item",
        title: `${s.description} - Deadline: ${moment(s.deadline).format("MMM Do")}`,
      }))
    );

    const options = {
      start: moment().startOf("year"),
      end: moment().endOf("year"),
      showCurrentTime: true,
      stack: true,
      zoomable: true,
      horizontalScroll: true,
      verticalScroll: false,
      maxHeight: 500,
      orientation: { axis: "top" },
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
  }, [scholarships]);

  return (
    <>
      <div ref={timelineRef}></div>
      <ScholarshipDetailModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        data={selectedScholarship}
      />
    </>
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
