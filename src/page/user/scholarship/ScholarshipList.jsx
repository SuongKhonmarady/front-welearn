import { useContext, useEffect } from "react";
import ScholarshipDataContext from "../../../context/scholarship/ScholarshipContext";
import { getScholarship } from "../../../context/scholarship/Scholarship";
import ScholarshipItem from "./components/ScholarshipItem";
import Spinner from "../../../ui/shared/Spinner";
import NotFound from "../../../ui/shared/NotFound";

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
      <h1 className="text-2xl font-bold text-gray-700">Scholarships</h1>
      {listScholarship.length ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {listScholarship.map((item) => (
            <ScholarshipItem data={item} key={item.id} />
            
          ))}
        </ul>
      ) : (
        <NotFound />
      )}
    </div>
  );
}
