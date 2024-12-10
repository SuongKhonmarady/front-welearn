import { useContext, useEffect, useState } from "react";
import Modal from "../../../../ui/shared/Modal";
import Button from "../../../../ui/shared/Button";
import SelectOption from "../../../../ui/shared/SelectOption";
import { levels, types, userIndentity } from "../../../../data/dummyData";
import {
  getCategory,
  getType,
} from "../../../../context/subject/SubjectAction";
import Spinner from "../../../../ui/shared/Spinner";
import Input from "../../../../ui/shared/Input";
import { createQuestion } from "../../../../context/quiz/QuizAction";
import QuizContext from "../../../../context/quiz/QuizContext";

const CreateQuestion = ({ onClose }) => {
  const { listCategory, dispatch } = useContext(QuizContext);
  const [isLoading, setIsLoading] = useState(false);
  const [option, setOption] = useState(1);
  const [categoryId, setCategoryId] = useState(1);
  const [levelId, setLevelId] = useState(1);
  const [userIdentity, setUserIdentity] = useState(0);
  const [inputData, setInputData] = useState({
    questionName: "",
    choices: [{ name: "", is_correct: false }],
  });

  useEffect(() => {
    const fetchData = async () => {
      const category =
        userIdentity === 0 ? await getType(option) : await getCategory();
      dispatch({ type: "SET_CATEGORY", payload: category });
    };
    fetchData();
  }, [dispatch, option, userIdentity]);

  const handleTypeChange = (event) => setOption(parseInt(event.target.value));
  const handleChangeUserIdentity = (event) =>
    setUserIdentity(parseInt(event.target.value));
  const handleChangeCategory = (event) =>
    setCategoryId(parseInt(event.target.value));
  const handleChangeLevel = (event) => setLevelId(parseInt(event.target.value));

  const addChoice = () => {
    setInputData({
      ...inputData,
      choices: [...inputData.choices, { name: "", is_correct: false }],
    });
  };

  const removeChoice = (index) => {
    const updatedChoices = [...inputData.choices];
    updatedChoices.splice(index, 1);
    setInputData({
      ...inputData,
      choices: updatedChoices,
    });
  };

  const handleInputChange = (e) => {
    setInputData({
      ...inputData,
      [e.target.name]: e.target.value,
    });
  };

  const handleChoiceChange = (e, index) => {
    const { value, type, checked } = e.target;
    const updatedChoices = [...inputData.choices];
    if (type === "checkbox") {
      updatedChoices[index].is_correct = checked;
    } else {
      updatedChoices[index].name = value;
    }
    setInputData({
      ...inputData,
      choices: updatedChoices,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { questionName, choices } = inputData;
    const res = await createQuestion(
      questionName,
      categoryId,
      userIdentity,
      levelId,
      choices
    );
    if (res) {
      onClose();
      setIsLoading(false);
    }
  };

  return (
    <Modal title="Create question" onClose={onClose}>
      <form
        onSubmit={handleSubmit}
        className="p-4 md:p-5 space-y-2 md:space-y-5"
      >
        <div className="flex flex-col gap-2 md:gap-5">
          <div className="flex flex-col md:flex-row gap-2 md:items-center">
            <label
              htmlFor="examDate"
              className="text-sm font-medium text-white"
            >
              Question Identity:
            </label>
            <SelectOption
              options={userIndentity}
              onSelectChange={handleChangeUserIdentity}
            />
            {userIdentity === 0 && (
              <>
                <label
                  htmlFor="category"
                  className="text-sm font-medium text-white"
                >
                  Type:
                </label>
                <SelectOption
                  options={types}
                  onSelectChange={handleTypeChange}
                />
              </>
            )}
            <label
              htmlFor="category"
              className="text-sm font-medium text-white"
            >
              Category:
            </label>
            <SelectOption
              options={listCategory}
              onSelectChange={handleChangeCategory}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-2 md:items-center">
            <label
              htmlFor="questionName"
              className="text-sm font-medium text-white"
            >
              Question Name:
            </label>
            <Input
              style="px-5 py-2 rounded-lg border-2"
              type="text"
              id="questionName"
              name="questionName"
              onChange={handleInputChange}
              value={inputData.questionName}
              required
            />
            <label
              htmlFor="category"
              className="text-sm font-medium text-white"
            >
              Level:
            </label>
            <SelectOption options={levels} onSelectChange={handleChangeLevel} />
          </div>
          {inputData.choices.map((choice, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row gap-2 md:items-center"
            >
              <label
                htmlFor={`choice-${index}`}
                className="text-sm font-medium text-white"
              >
                Choice {index + 1}:
              </label>
              <Input
                style="px-5 py-2 rounded-lg border-2"
                type="text"
                id={`choice-${index}`}
                name={`choice-${index}`}
                onChange={(e) => handleChoiceChange(e, index)}
                required
              />
              <input
                type="checkbox"
                id={`correct-${index}`}
                name={`correct-${index}`}
                onChange={(e) => handleChoiceChange(e, index)}
                className="text-white border-gray-300 rounded focus:ring-0 focus:outline-none"
              />
              <label
                htmlFor={`correct-${index}`}
                className="text-sm font-medium text-white"
              >
                Correct
              </label>
              <button
                type="button"
                onClick={() => removeChoice(index)}
                className="text-sm font-medium text-white"
              >
                Remove
              </button>
            </div>
          ))}
          {inputData.choices.length <= 2 && (
            <button
              type="button"
              onClick={addChoice}
              className="text-sm font-medium text-white"
            >
              Add Choice
            </button>
          )}
        </div>
        {isLoading ? (
          <Spinner />
        ) : (
          <Button type="submit" customClass="bg-white text-[#283d50]">
            Submit
          </Button>
        )}
      </form>
    </Modal>
  );
};

export default CreateQuestion;
