import { useContext, useEffect } from "react";
import ScholarshipDataContext from "../../../context/scholarship/ScholarshipContext";
import { getScholarship } from "../../../context/scholarship/Scholarship";
import ScholarshipTimeline from "./components/Scholarshiptimeline";
import Spinner from "../../../ui/shared/Spinner";
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
    <div className="min-h-screen bg-gradient-to-b from-[#f1f5f9] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-[#283d50] mb-4">
              Discover Your Perfect Scholarship
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Explore opportunities from around the world and find the scholarship that matches your academic goals.
            </p>
          </div>

          {/* Scholarship Timeline Section */}
          <section className="bg-white rounded-2xl shadow-xl p-8 transform transition-all hover:shadow-2xl">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">🎓</span>
                <h2 className="text-3xl font-bold text-[#283d50]">Scholarships Timeline</h2>
              </div>
              <p className="text-gray-600 ml-12">Track deadlines and plan your applications efficiently</p>
            </div>
            <div className="bg-[#f8fafc] rounded-xl p-4">
              <ScholarshipTimeline scholarships={listScholarship} />
            </div>
          </section>

          {/* Scholarship Recommender Section */}
          <section className="bg-white rounded-2xl shadow-xl p-8 transform transition-all hover:shadow-2xl">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">🤖</span>
                <h2 className="text-3xl font-bold text-[#283d50]">AI Scholarship Assistant</h2>
              </div>
              <p className="text-gray-600 ml-12">Get personalized scholarship recommendations and guidance</p>
            </div>
            <ScholarshipChat />
          </section>
        </div>
      </div>
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