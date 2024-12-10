import PropTypes from "prop-types";
export default function Spinner({ isFull }) {
  return isFull ? (
    <div className="absolute backdrop-blur-sm inset-0 flex items-center justify-center">
      <div className="loader"></div>
    </div>
  ) : (
    <div className="loader"></div>
  );
}
Spinner.propTypes = {
  isFull: PropTypes.bool,
};
