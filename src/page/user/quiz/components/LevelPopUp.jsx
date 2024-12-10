import { useState } from "react";
import Modal from "../../../../ui/shared/Modal";
import { useNavigate } from "react-router-dom";
import { levels } from "../../../../data/dummyData";

export default function LevelPopUp({ data }) {
  const navigate = useNavigate();

  const [isOpen, setOpen] = useState(false);
  const [category, setCategory] = useState(0);

  const handleSelectChange = (id) => {
    setOpen(!isOpen);
    setCategory(id);
  };
  const handleSelectExamDate = (id) => {
    navigate(`/question/${category}/${id}`);
  };
  return (
    <>
      <div
        onClick={() => handleSelectChange(data.id)}
        className="p-5 space-y-5 bg-white shadow-md border border-gray-200 rounded-lg cursor-pointer hover:scale-105 transition-transform duration-300"
      >
        <h1 className="text-center text-xl font-semibold text-gray-800 capitalize">
          {data.name}
        </h1>
      </div>
      {isOpen && (
        <Modal title="Select a level" onClose={() => setOpen(!isOpen)}>
          <ul className="grid grid-cols-3 md:grid-cols-5 gap-5 p-5">
            {levels.map((item) => (
              <li
                key={item.id}
                className="p-5 text-white border border-white-2 rounded-md"
                onClick={() => handleSelectExamDate(item.id)}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </Modal>
      )}
    </>
  );
}
