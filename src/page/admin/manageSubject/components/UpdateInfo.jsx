import { useContext, useEffect, useState } from "react";
import Button from "../../../../ui/shared/Button";
import Input from "../../../../ui/shared/Input";
import Modal from "../../../../ui/shared/Modal";
import {
  getExamDate,
  getType,
  updateSubject,
} from "../../../../context/subject/SubjectAction";
import BakDoubDataContext from "../../../../context/subject/SubjectContext";
import SelectOption from "../../../../ui/shared/SelectOption";
import { types } from "../../../../data/dummyData";

export default function UpdateInfo({ id, onClose, pdfUrl }) {
  const { listCategories, listExamDates, dispatch } =
    useContext(BakDoubDataContext);

  const [file, setFile] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedExamDate, setSelectedExamDate] = useState(0);
  const [selectOption, setSelectOption] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const categories = await getType(selectOption);
      dispatch({ type: "SET_CATEGORIES", payload: categories });
    };
    fetchData().then(() => fetchExamDate());
  }, [dispatch, selectOption]);

  const fetchExamDate = async () => {
    const examDates = await getExamDate();
    dispatch({ type: "SET_EXAMDATES", payload: examDates });
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(parseInt(event.target.value));
  };
  const handleTypeChange = (event) => {
    setSelectOption(parseInt(event.target.value));
  };

  const handleExamDateChange = (event) => {
    setSelectedExamDate(parseInt(event.target.value));
  };

  const onChangePdf = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateSubject(file, selectedCategory, selectedExamDate, id);
  };

  return (
    <Modal title="update subject" onClose={onClose}>
      <form
        onSubmit={handleSubmit}
        className="p-4 md:p-5 space-y-2 md:space-y-5"
      >
        <div className="flex flex-col gap-2 md:gap-5 ">
          <div className="flex flex-col md:flex-row gap-2 md:items-center">
            <label htmlFor="title" className="text-sm font-medium text-white">
              ExamDate:
            </label>
            <SelectOption
              options={listExamDates}
              onSelectChange={handleExamDateChange}
            />
            <label htmlFor="price" className="text-sm font-medium text-white">
              Category:
            </label>
            <SelectOption
              options={listCategories}
              onSelectChange={handleCategoryChange}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-5">
            <label htmlFor="price" className="text-sm font-medium text-white">
              Type:
            </label>
            <SelectOption options={types} onSelectChange={handleTypeChange} />
            <div className="space-y-2">
              <label
                htmlFor="file"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                File:
              </label>
              <Input
                style="rounded-lg"
                type="file"
                id="file"
                accept=".pdf"
                onChange={onChangePdf}
              />
            </div>
            <iframe
              src={pdfUrl}
              className="w-[100px] h-[150px] md:w-[150px] md:h-[200px]"
            ></iframe>
          </div>
        </div>
        <Button type="submit" customClass=" bg-white  text-[#283d50]">
          Update
        </Button>
      </form>
    </Modal>
  );
}
