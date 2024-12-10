import { useContext, useEffect, useState } from "react";
import { updateQuestion } from "../../../../context/quiz/QuizAction";
import Button from "../../../../ui/shared/Button";
import Input from "../../../../ui/shared/Input";
import Modal from "../../../../ui/shared/Modal";
import QuizContext from "../../../../context/quiz/QuizContext";
import {
  getCategory,
  getType,
} from "../../../../context/subject/SubjectAction";
import SelectOption from "../../../../ui/shared/SelectOption";
import { levels, types, userIndentity } from "../../../../data/dummyData";

export default function UpdateQuestion({ question, onClose }) {
  const { listCategory, dispatch } = useContext(QuizContext);

  const [type, setType] = useState(1);
  const [category, setCategory] = useState(question.category.id);
  const [userIdentity, setUserIdentity] = useState(question.isGraduate);
  const [level, setLevel] = useState(question.level.id);

  const [questionData, setQuestionData] = useState({
    name: question.name,
    category_id: category,
    level_id: level,
    is_graduate: userIdentity,
    choices: question.choices.map((choice) => ({
      id: choice.id,
      name: choice.name,
      is_correct: choice.isCorrect,
    })),
  });

  useEffect(() => {
    const fetchData = async () => {
      const categoryData =
        userIdentity === 0 ? await getType(type) : await getCategory();
      dispatch({ type: "SET_CATEGORY", payload: categoryData });
    };
    fetchData();
  }, [dispatch, type, userIdentity]);

  useEffect(() => {
    setQuestionData((prevData) => ({
      ...prevData,
      category_id: category,
      level_id: level,
      is_graduate: userIdentity ? 1 : 0,
    }));
  }, [category, level, userIdentity]);

  const handleTypeChange = (event) => setType(parseInt(event.target.value));
  const handleUserIdentityChange = (event) =>
    setUserIdentity(parseInt(event.target.value));
  const handleCategoryChange = (event) =>
    setCategory(parseInt(event.target.value));
  const handleLevelChange = (event) => setLevel(parseInt(event.target.value));
  const handleInputChange = (index, field, value) => {
    setQuestionData((prevData) => {
      const updatedChoices = [...prevData.choices];
      updatedChoices[index][field] = value;
      return { ...prevData, choices: updatedChoices };
    });
  };
  const handleFieldChange = (field, value) => {
    setQuestionData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await updateQuestion(question.id, questionData);
    if (res) {
      onClose();
    }
  };

  return (
    <Modal title="Update Question" onClose={onClose}>
      <form
        onSubmit={handleSubmit}
        className="p-4 md:p-5 space-y-2 md:space-y-5"
      >
        <div className="flex flex-col md:flex-row gap-2 md:items-center">
          <label
            htmlFor="userIdentity"
            className="text-sm font-medium text-white"
          >
            Question Identity:
          </label>
          <SelectOption
            options={userIndentity}
            onSelectChange={handleUserIdentityChange}
          />

          {userIdentity === 0 && (
            <>
              <label htmlFor="type" className="text-sm font-medium text-white">
                Type:
              </label>
              <SelectOption options={types} onSelectChange={handleTypeChange} />
            </>
          )}

          <label htmlFor="category" className="text-sm font-medium text-white">
            Category:
          </label>
          <SelectOption
            options={listCategory}
            onSelectChange={handleCategoryChange}
          />
        </div>

        <div className="flex flex-col gap-2 md:gap-5">
          <div className="flex flex-row gap-2 items-center">
            <label
              htmlFor="questionName"
              className="text-sm font-medium text-white"
            >
              Question Name:
            </label>
            <Input
              style="px-5 py-2 rounded-lg border-2 text-[#283d50]"
              type="text"
              id="questionName"
              name="name"
              defaultValue={questionData.name}
              onChange={(e) => handleFieldChange("name", e.target.value)}
              required
            />

            <label htmlFor="level" className="text-sm font-medium text-white">
              Level:
            </label>
            <SelectOption options={levels} onSelectChange={handleLevelChange} />
          </div>

          <label htmlFor="choices" className="text-sm font-medium text-white">
            Choices:
          </label>
          {questionData.choices.map((choice, index) => (
            <div key={index} className="flex flex-col gap-2">
              <div className="flex flex-row items-center gap-2">
                <Input
                  style="px-5 py-2 rounded-lg border-2 text-[#283d50]"
                  type="text"
                  defaultValue={choice.name}
                  onChange={(e) =>
                    handleInputChange(index, "name", e.target.value)
                  }
                  required
                />
                <label className="text-sm font-medium text-white">
                  IsCorrect: {choice.is_correct ? "True" : "False"}
                </label>
              </div>
            </div>
          ))}
        </div>

        <Button type="submit" customClass="bg-white text-[#283d50]">
          Update
        </Button>
      </form>
    </Modal>
  );
}
