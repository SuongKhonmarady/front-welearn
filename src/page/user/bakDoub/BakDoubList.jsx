import { useContext, useEffect, useState } from "react";
import SelectOption from "../../../ui/shared/SelectOption";
import { getType } from "../../../context/subject/SubjectAction";
import { types } from "../../../data/dummyData";
import BakDoubItem from "./components/BakDoubItem";
import SubjectContext from "../../../context/subject/SubjectContext";
import Spinner from "../../../ui/shared/Spinner";

export default function BakDoubList() {
  const [option, setOption] = useState(1);

  const handleSelectChange = (event) => {
    const selectedOption = parseInt(event.target.value);
    setOption(selectedOption);
  };

  const { listCategory, dispatch , loading } = useContext(SubjectContext);
  useEffect(() => {
    dispatch({ type: "SET_LOADING" });
    const getCategory = async (option) => {
      const data = await getType(option);
      dispatch({ type: "SET_CATEGORY", payload: data });
    };
    getCategory(option);
  }, [option, dispatch]);

  if(loading){
    return <Spinner isFull/>
  }

  return (
    <div className="flex flex-col gap-5 p-6 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-700">BakDoub Answer</h1>
      <div>
        <SelectOption options={types} onSelectChange={handleSelectChange} />
      </div>
      <ul className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {listCategory.map((item) => (
          <BakDoubItem data={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
}
