import { useContext, useEffect, useState, useCallback } from "react";
import ScholarshipDataContext from "../../../context/scholarship/ScholarshipContext";
import { getScholarship } from "../../../context/scholarship/Scholarship";
import CreateScholarship from "./components/CreateScholarship";
import Button from "../../../ui/shared/Button";
import ScholarshipItem from "./components/ScholarshipItem";
import Spinner from "../../../ui/shared/Spinner";
import NotFound from "../../../ui/shared/NotFound";

export default function ScholarshipList() {
  const [isCreate, setCreate] = useState(false);
  const { listScholarship, dispatch, loading } = useContext(ScholarshipDataContext);

  const fetchScholarship = useCallback(async () => {
    const data = await getScholarship();
    dispatch({ type: "SET_SCHOLARSHIP", payload: data });
  }, [dispatch]); // fetchScholarship depends on dispatch

  useEffect(() => {
    fetchScholarship();
  }, [fetchScholarship]); // Adding fetchScholarship as a dependency

  // Separate scholarships by deadline
  const upcomingScholarships = listScholarship.filter((item) => {
    const currentDate = new Date();
    const deadlineDate = new Date(item.deadline);
    return deadlineDate > currentDate; // Upcoming scholarship
  });

  const expiredScholarships = listScholarship.filter((item) => {
    const currentDate = new Date();
    const deadlineDate = new Date(item.deadline);
    return deadlineDate <= currentDate; // Expired scholarship
  });

  if (loading) {
    return <Spinner isFull />;
  }

  return (
    <div className="flex flex-col gap-5 p-5">
      <div>
        <Button customClass="bg-green-500 text-white" onClick={() => setCreate(true)}>
          Create Scholarship
        </Button>
      </div>

      {/* Upcoming Scholarships */}
      <div>
        <h2 className="text-lg font-semibold text-gray-700">Upcoming Scholarships</h2>
        <ul className="flex flex-col gap-5">
          {upcomingScholarships.length ? (
            upcomingScholarships.map((item) => (
              <ScholarshipItem data={item} key={item.id} onRefresh={() => fetchScholarship()} />
            ))
          ) : (
            <NotFound />
          )}
        </ul>
      </div>

      {/* Expired Scholarships */}
      <div>
        <h2 className="text-lg font-semibold text-gray-700">Expired Scholarships</h2>
        <ul className="flex flex-col gap-5">
          {expiredScholarships.length ? (
            expiredScholarships.map((item) => (
              <ScholarshipItem data={item} key={item.id} onRefresh={() => fetchScholarship()} />
            ))
          ) : (
            <NotFound />
          )}
        </ul>
      </div>

      {isCreate && <CreateScholarship onClose={() => setCreate(false)} />}
    </div>
  );
}
