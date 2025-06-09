import moment from "moment";
import PropTypes from 'prop-types';

const MetadataCard = ({ scholarship }) => {
  if (!scholarship.created_at && !scholarship.updated_at) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Information</h3>
        <div className="space-y-3 text-sm">
          {scholarship.created_at && (
            <div className="flex justify-between">
              <span className="text-gray-500">Created:</span>
              <span className="text-gray-900 font-medium">
                {moment(scholarship.created_at).format('MMM DD, YYYY')}
              </span>
            </div>
          )}
          {scholarship.updated_at && (
            <div className="flex justify-between">
              <span className="text-gray-500">Updated:</span>
              <span className="text-gray-900 font-medium">
                {moment(scholarship.updated_at).format('MMM DD, YYYY')}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>  );
};

MetadataCard.propTypes = {
  scholarship: PropTypes.shape({
    created_at: PropTypes.string,
    updated_at: PropTypes.string,
  }).isRequired,
};

export default MetadataCard;
