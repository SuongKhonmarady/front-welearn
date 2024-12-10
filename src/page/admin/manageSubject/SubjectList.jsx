import { useContext, useEffect, useState } from "react";
import {
  getExamDate,
  getSubject,
} from "../../../context/subject/SubjectAction";
import BakDoubItem from "./components/SubjectItem";
import SelectOption from "../../../ui/shared/SelectOption";
import { types } from "../../../data/dummyData";
import Button from "../../../ui/shared/Button";
import CreateBakDoub from "./components/CreateSubject";
import Spinner from "../../../ui/shared/Spinner";
import NotFound from "../../../ui/shared/NotFound";
import SubjectContext from "../../../context/subject/SubjectContext";

export default function SubjectList() {
  const { listSubject, dispatch, loading, listExamDate } =
    useContext(SubjectContext);
  const [isOpen, setIsOpen] = useState(false);
  const [selectOption, setSelectOption] = useState(1);
  const [selectExamDate, setSelectExamDate] = useState(1);

  const handleTypeChange = (event) => {
    setSelectOption(parseInt(event.target.value));
  };

  const handleExamDateChange = (event) => {
    setSelectExamDate(parseInt(event.target.value));
  };

  useEffect(() => {
    dispatch({ type: "SET_LOADING" });
    fetchExamDate().then(() => fetchSubject());
  }, [dispatch]);

  const fetchSubject = async () => {
    const data = await getSubject(selectOption, selectExamDate);
    dispatch({ type: "SET_SUBJECT", payload: data });
  };
  const fetchExamDate = async () => {
    const data = await getExamDate();
    dispatch({ type: "SET_EXAMDATE", payload: data });
  };

  if (loading) {
    return <Spinner isFull />;
  }

  return (
    <ul className="flex flex-col gap-5 p-5">
      <div className="flex flex-row gap-5">
        <SelectOption options={types} onSelectChange={handleTypeChange} />
        <SelectOption
          options={listExamDate}
          onSelectChange={handleExamDateChange}
        />
        <Button customClass="border-2" onClick={() => fetchSubject()}>
          Search
        </Button>
        <Button
          customClass="bg-green-500 text-white"
          onClick={() => setIsOpen(true)}
        >
          New BakDoub
        </Button>
      </div>
      {loading ? (
        <Spinner isFull={true} />
      ) : listSubject.length ? (
        listSubject.map((item) => <BakDoubItem data={item} key={item.id} />)
      ) : (
        <NotFound />
      )}
      {isOpen && (
        <CreateBakDoub
          onRefresh={() => fetchSubject()}
          onClose={() => setIsOpen(!isOpen)}
        />
      )}
    </ul>
  );
}
