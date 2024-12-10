import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getExamDate } from "../../../../context/subject/SubjectAction";
import Modal from "../../../../ui/shared/Modal";

export default function BakDoubItem({ data }) {
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const [categoryId, setCategoryId] = useState(0);
  const [examDate, setExamDate] = useState([]);

  const handleSelectChange = (id) => {
    setOpen(!isOpen);
    setCategoryId(id);
  };
  const handleSelectExamDate = (id) => {
    navigate(`/pdf/${categoryId}/${id}`);
  };

  useEffect(() => {
    const fetchExamDate = async () => {
      if (isOpen) {
        const data = await getExamDate();
        setExamDate(data);
      }
    };
    fetchExamDate();
  }, [isOpen]);

  return (
    <>
      <li
        onClick={() => handleSelectChange(data.id)} // Pass data.id to the function
        className="flex flex-col gap-3 p-5 bg-white shadow-md rounded-lg border border-gray-200 hover:shadow-lg transition-shadow duration-300"
      >
        <h1 className="text-center text-xl font-semibold text-gray-800 capitalize">{data.name}</h1>
      </li>
      {isOpen && (
        <Modal title="Select a year" onClose={() => setOpen(!isOpen)}>
          <ul className="grid grid-cols-3 md:grid-cols-5 gap-5 p-5">
            {examDate.map((item) => (
              <li
                key={item.id}
                className="p-5 text-white border border-white-2 rounded-md"
              >
                <p onClick={() => handleSelectExamDate(item.id)}>{item.name}</p>
              </li>
            ))}
          </ul>
        </Modal>
      )}
    </>
  );
}
