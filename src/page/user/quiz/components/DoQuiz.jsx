import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQuestion } from "../../../../context/quiz/QuizAction";
import Choice from "./Choice";
import Button from "../../../../ui/shared/Button";
import DisplayResult from "./DisplayResult";
import Spinner from "../../../../ui/shared/Spinner";
import NotFound from "../../../../ui/shared/NotFound";
import { savePointUser } from "../../../../context/user/UserAction";
import QuizContext from "../../../../context/quiz/QuizContext";

export default function DoQuiz() {
  const { categoryId, levelId } = useParams();
  const [isSaved, setSaved] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showPoint, setShowPoint] = useState(false);
  const [choiceId, setChoiceId] = useState(0);
  const [userChoices, setUserChoices] = useState([]);
  const [score, setScore] = useState(0);
  const { listQuestion, dispatch, loading } = useContext(QuizContext);

  const savePoint = async (score, categoryId, levelId, listQuestions) => {
    setSaved(true);
    const res = await savePointUser(score, categoryId, levelId, listQuestions);
    if (res) {
      setSaved(false);
      setShowPoint(true);
      return;
    }
  };

  useEffect(() => {
    dispatch({ type: "SET_LOADING" });
    const fetchQuiz = async (categoryId, levelId) => {
      const data = await getQuestion(categoryId, levelId);
      dispatch({ type: "SET_QUESTION", payload: data });
    };
    fetchQuiz(categoryId, levelId);
  }, [categoryId, levelId, dispatch]);

  const totalQuestions = listQuestion.length;

  const handleChangeChoice = (e) => {
    const choiceId = parseInt(e.target.value);
    setChoiceId(choiceId);
  };

  const handleNextQuestion = () => {
    if (currentQuestion >= totalQuestions - 1) {
      savePoint(score, categoryId, levelId, listQuestion);
    }

    const correctAnswer = listQuestion[currentQuestion].choices.find(
      (item) => item.isCorrect === 1
    );

    if (choiceId === correctAnswer.id) {
      setScore((prevScore) => prevScore + listQuestion[currentQuestion].point);
    }

    setUserChoices([
      ...userChoices,
      { questionId: listQuestion[currentQuestion].id, choiceId },
    ]);

    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    setChoiceId(0);
  };
  if (isSaved) {
    return <Spinner isFull={true} />;
  }

  if (loading) {
    return <Spinner isFull={true} />;
  }
  if (totalQuestions === 0) {
    return <NotFound />;
  }
  if (showPoint) {
    return (
      <DisplayResult
        score={score}
        listQuestion={listQuestion}
        userChoices={userChoices}
      />
    );
  }

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Quiz</h2>
      <label
        htmlFor="complete-question"
        className="block text-lg font-medium mb-2"
      >
        Question Progress
      </label>
      <progress
        id="complete-question"
        value={currentQuestion}
        max={totalQuestions}
        className="w-full mb-4 h-4 bg-green-200 rounded"
      ></progress>

      {listQuestion[currentQuestion] && (
        <>
          <div className="flex flex-col md:flex-row justify-between items-center bg-blue-100 p-4 rounded-lg mb-4 shadow-sm">
            <p className="font-semibold text-gray-700">
              {listQuestion[currentQuestion].name}
            </p>
            <p className="font-semibold text-gray-700">
              Points: {listQuestion[currentQuestion].point}
            </p>
          </div>

          <ul className="space-y-4">
            {listQuestion[currentQuestion].choices.map((item) => (
              <Choice data={item} key={item.id} onSelect={handleChangeChoice} />
            ))}
          </ul>
        </>
      )}

      {choiceId !== 0 && (
        <div className="mt-4 flex justify-end">
          <Button
            customClass="bg-green-500 hover:bg-green-600"
            onClick={handleNextQuestion}
          >
            Next Question
          </Button>
        </div>
      )}
    </div>
  );
}
