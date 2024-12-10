import { useState } from "react";
import Button from "../../../../ui/shared/Button";
import remove from "../../../../assets/svg/remove.svg";
import edit from "../../../../assets/svg/edit.svg";
import { removeQuestion } from "../../../../context/quiz/QuizAction";
import UpdateQuestion from "./UpdateQuestion";

export default function QuestionItem({ data }) {
  const { name, point, id, category, level } = data;
  const [isUpdate, setUpdate] = useState(false);

  const handleRemove = async (id) => {
    await removeQuestion(id);
  };

  return (
    <li className="flex flex-row gap-5 p-5 border-2 justify-between">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2 capitalize">
          <span>{id} .</span>
          <span>{name}</span>
          <span className="text-green-500">{category.name}</span>
        </div>
        <div className="flex flex-row gap-2 capitalize">
          <span>{level.name}</span>
          <span>Point : {point}</span>
        </div>
      </div>
      <div className="flex flex-row gap-5 items-center">
        <Button
          customClass="bg-green-500 text-white"
          onClick={() => setUpdate(true)}
        >
          <img src={edit} alt="editIcon" className="w-3 md:w-4" />
          Edit question
        </Button>
        <Button
          customClass="bg-red-500 text-white"
          onClick={() => handleRemove(id)}
        >
          <img src={remove} alt="removeIcon" className="w-3 md:w-4" />
          Delete question
        </Button>
        {isUpdate && (
          <UpdateQuestion question={data} onClose={() => setUpdate(false)} />
        )}
      </div>
    </li>
  );
}
