import PropTypes from "prop-types";

const ScholarshipDetailModal = ({ isOpen, onClose, data }) => {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg max-w-2xl w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 text-xl hover:text-red-500"
        >
          ✖️
        </button>
        <h2 className="text-2xl font-bold mb-4">{data.description}</h2>
        <p className="mb-2"><strong>Deadline:</strong> {data.deadline}</p>
        <p className="mb-2"><strong>Posted At:</strong> {data.post_at}</p>
        <p className="mb-2"><strong>University:</strong> {data.university || "N/A"}</p>
        <p className="mb-2"><strong>Country:</strong> {data.country || "N/A"}</p>
        <p className="mb-2"><strong>Eligibility:</strong> {data.eligibility || "N/A"}</p>
        <a
          href={data.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline mt-4 inline-block"
        >
          Visit Official Page
        </a>
      </div>
    </div>
  );
};
ScholarshipDetailModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    data: PropTypes.shape({
      description: PropTypes.string,
      deadline: PropTypes.string,
      post_at: PropTypes.string,
      university: PropTypes.string,
      country: PropTypes.string,
      eligibility: PropTypes.string,
      link: PropTypes.string,
    }),
  };

export default ScholarshipDetailModal;
