import { useContext, useEffect, useState } from "react";
import { getCategory, getType } from "../../../context/subject/SubjectAction";
import SelectOption from "../../../ui/shared/SelectOption";
import { types } from "../../../data/dummyData";
import QuizContext from "../../../context/quiz/QuizContext";
import LevelPopUp from "./components/LevelPopUp";

export default function QuizList({ isGraduate }) {
  const [option, setOption] = useState(1);

  const handleSelectChange = (event) => {
    const selectedOption = parseInt(event.target.value);
    setOption(selectedOption);
  };

  const { listCategory, dispatch } = useContext(QuizContext);

  useEffect(() => {
    dispatch({ type: "SET_LOADING" });
    const fetchData = async (option) => {
      const data = isGraduate ? await getCategory() : await getType(option);
      dispatch({ type: "SET_CATEGORY", payload: data });
    };
    fetchData(option);
  }, [option, dispatch, isGraduate]);

  return (
    <div className="flex flex-col gap-5 p-5 bg-gray-50">
      <h1 className="text-2xl font-bold text-gray-700">Quiz</h1>
      {!isGraduate && (
        <div className="mb-4">
          <SelectOption options={types} onSelectChange={handleSelectChange} />
        </div>
      )}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {listCategory.map((item) => (
          <LevelPopUp data={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}
