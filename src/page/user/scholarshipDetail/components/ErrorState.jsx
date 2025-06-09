import PropTypes from 'prop-types';

const ErrorState = ({ error, onRetry, onNavigateBack }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {error ? "Error Loading Scholarship" : "Scholarship Not Found"}
        </h1>
        <p className="text-gray-600 mb-6">
          {error || "The scholarship you're looking for doesn't exist or has been removed."}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onRetry}
            className="px-6 py-3 bg-[#283d50] text-white rounded-lg hover:bg-[#1e2d3d] transition-colors duration-200"
          >
            Try Again
          </button>
          <button
            onClick={onNavigateBack}
            className="px-6 py-3 border border-[#283d50] text-[#283d50] rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            Back to Browse Scholarships
          </button>
        </div>
      </div>
    </div>  );
};

ErrorState.propTypes = {
  error: PropTypes.string,
  onRetry: PropTypes.func.isRequired,
  onNavigateBack: PropTypes.func.isRequired,
};

export default ErrorState;
