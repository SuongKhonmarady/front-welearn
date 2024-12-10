import { createContext, useReducer } from "react";
import { QuizReducer } from "./QuizReducer";

const QuizContext = createContext();
export const QuizDataProvider = ({ children }) => {
  const initialState = {
    listLevel: [],
    listQuestion :[],
    listCategory :[],
    loading: false,
  };
  const [state, dispatch] = useReducer(QuizReducer, initialState);

  return (
    <QuizContext.Provider value={{ ...state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
};
export default QuizContext;
