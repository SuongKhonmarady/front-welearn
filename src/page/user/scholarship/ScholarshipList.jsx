import { useContext, useEffect } from "react";
import ScholarshipDataContext from "../../../context/scholarship/ScholarshipContext";
import { getScholarship } from "../../../context/scholarship/Scholarship";
// import ScholarshipItem from "./components/ScholarshipItem";
import ScholarshipTimeline from "./components/Scholarshiptimeline";
import Spinner from "../../../ui/shared/Spinner";
// import NotFound from "../../../ui/shared/NotFound";
import PropTypes from 'prop-types';
import ScholarshipChat from './components/ScholarshipChat';

export default function ScholarshipList() {
  const { listScholarship, dispatch, loading } = useContext(ScholarshipDataContext);

  useEffect(() => {
    dispatch({ type: "SET_LOADING" });
    const fetchData = async () => {
      const data = await getScholarship();
      dispatch({ type: "SET_SCHOLARSHIP", payload: data });
    };
    fetchData();
  }, [dispatch]);

  if (loading) {
    return <Spinner isFull />;
  }

  return (
    <div className="flex flex-col gap-5 p-6 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-700">Scholarships timeline</h1>
      <ScholarshipTimeline scholarships={listScholarship} />
      <h1 className="text-2xl font-bold mb-4">Scholarship Recommender</h1>
      <ScholarshipChat />
    </div>
  );
}
ScholarshipTimeline.propTypes = {
  scholarships: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      deadline: PropTypes.string.isRequired, // Assuming deadline is a string; adjust if necessary
    })
  ).isRequired,
};