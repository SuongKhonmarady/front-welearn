import PropTypes from 'prop-types';

export default function ScholarshipItem({ data }) {
  const { description, post_at, link, deadline } = data;
  return (
    <li className="flex flex-col gap-3 p-5 bg-white shadow-md rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <p className="line-clamp-5 text-gray-700">
        {(description)}
      </p>
      <p className="text-red-500">Deadline: {deadline}</p>
      <p className="text-gray-500 text-sm">Posted on: {post_at}</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline mt-auto"
      >
        More Details
      </a>
    </li>
  );
}

// Prop-types validation
ScholarshipItem.propTypes = {
  data: PropTypes.shape({
    description: PropTypes.string.isRequired,
    post_at: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    deadline: PropTypes.string.isRequired
  }).isRequired,
};