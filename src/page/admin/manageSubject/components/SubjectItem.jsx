// import { useState } from "react";
import { removeSubject } from "../../../../context/subject/SubjectAction";
import Button from "../../../../ui/shared/Button";
import PropTypes from 'prop-types';

export default function BakDoubItem({ data, onRefresh }) {
  const { category, examdate, id } = data;
  // const [isUpdate, setIsUpdate] = useState(false);

  const removeBakDoub = async (id) => {
    const res = await removeSubject(id);
    if (res === true && typeof onRefresh === "function") {
      onRefresh();
    }
  };
  return (
    <li className="flex flex-col md:flex-row gap-5 border-2 justify-between items-center p-5">
      <div className="flex flex-col gap-2">
        <p className="text-gray-500">Category : {category.name}</p>
        <p className="text-gray-500">ExamDate : {examdate.name}</p>
      </div>
      <div className="flex flex-row md:flex-col gap-2">
        <Button
          customClass="bg-red-500 text-white"
          onClick={() => removeBakDoub(id)}
        >
          Remove
        </Button>
      </div>
    </li>
  );
}
BakDoubItem.propTypes = {
  data: PropTypes.shape({
    category: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    examdate: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  onRefresh: PropTypes.func.isRequired,
};