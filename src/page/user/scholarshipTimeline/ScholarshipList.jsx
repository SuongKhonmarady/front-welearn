import { useContext, useEffect } from "react";
import ScholarshipDataContext from "../../../context/scholarship/ScholarshipContext";
import { getScholarship } from "../../../context/scholarship/Scholarship";
import ScholarshipTimeline from "./components/ScholarshipTimeline";
import Spinner from "../../../ui/shared/Spinner";
import SEOHead from "../../../components/SEOHead";

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
    <>
      {/* SEO Head Component */}
      <SEOHead
        title="Scholarship Timeline - Track Application Deadlines"
        description="Stay updated with upcoming scholarship deadlines and never miss an opportunity. Visual timeline of scholarship application dates and deadlines."
        keywords="scholarship timeline, application deadlines, scholarship calendar, education funding timeline, student grants deadlines"
        url="/scholarship-timeline"
        type="website"
      />
      
      <div className="min-h-screen bg-gradient-to-b from-[#f1f5f9] to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#283d50] mb-4">
            Scholarship Timeline
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Stay updated with upcoming scholarship deadlines and never miss an opportunity.
          </p>
        </div>

        <ScholarshipTimeline scholarships={listScholarship} />
      </div>
    </div>
    </>
  );
}