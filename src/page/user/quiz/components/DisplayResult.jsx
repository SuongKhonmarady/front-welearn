import ShareButton from "./ShareButtonComponent";

export default function DisplayResult({ score, listQuestion, userChoices }) {
  return (
    <div className="flex flex-col gap-5 p-5 bg-gray-50 ">
      <h2 className="text-2xl font-bold bg-slate-400 text-center p-3 rounded-md mb-5">
        Your Score is: {score}
      </h2>
      <ul className="flex flex-col gap-5">
        {listQuestion.map((question, index) => {
          const userChoice = userChoices.find(
            (choice) => choice.questionId === question.id
          );
          const correctAnswer = question.choices.find(
            (choice) => choice.isCorrect
          );
          const isCorrect =
            userChoice && userChoice.choiceId === correctAnswer.id;

          return (
            <li
              key={question.id}
              className="p-3 bg-white shadow-md rounded-lg flex flex-col md:flex-row items-start md:items-center gap-3"
            >
              <div className="flex flex-row gap-2">
              <p className="text-lg font-semibold">{index + 1}.</p>
              <h1 className="text-lg font-semibold">{question.name}</h1>
              </div>
              
              <p className="text-md">
                Your answer:{" "}
                {userChoice
                  ? question.choices.find(
                      (choice) => choice.id === userChoice.choiceId
                    ).name
                  : "No answer"}
              </p>
              <p className="text-md">Correct answer: {correctAnswer.name}</p>
              <p
                className={`text-md font-semibold ${
                  isCorrect ? "text-green-600" : "text-red-600"
                }`}
              >
                {isCorrect ? "Correct" : "Incorrect"}
              </p>
            </li>
          );
        })}
      </ul>
      <ShareButton/>
    </div>
  );
}
