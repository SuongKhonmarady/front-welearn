import { useContext, useEffect, useState } from "react";
import ScholarshipDataContext from "../../../context/scholarship/ScholarshipContext";
import { getScholarship } from "../../../context/scholarship/Scholarship";
import CreateScholarship from "./components/CreateScholarship";
import Button from "../../../ui/shared/Button";
import ScholarshipItem from "./components/ScholarshipItem";
import Spinner from "../../../ui/shared/Spinner";
import NotFound from "../../../ui/shared/NotFound";

export default function ScholarshipList() {
  const [isCreate, setCreate] = useState(false);
  const { listScholarship, dispatch, loading } = useContext(
    ScholarshipDataContext
  );
  useEffect(() => {
    fetchScholarship();
  }, [dispatch]);

  const fetchScholarship = async () => {
    const data = await getScholarship();
    dispatch({ type: "SET_SCHOLARSHIP", payload: data });
  };

  if (loading) {
    return <Spinner isFull />;
  }

  return (
    <div className="flex flex-col gap-5 p-5">
      <div>
        <Button
          customClass="bg-green-500 text-white"
          onClick={() => setCreate(true)}
        >
          Create Scholarship
        </Button>
      </div>

      <ul className="flex flex-col gap-5">
        {listScholarship.length ? (
          listScholarship.map((item) => (
            <ScholarshipItem data={item} key={item.id} onRefresh={()=>fetchScholarship()} />
          ))
        ) : (
          <NotFound />
        )}
      </ul>

      {isCreate && <CreateScholarship onClose={() => setCreate(false)}  />}
    </div>
  );
}
