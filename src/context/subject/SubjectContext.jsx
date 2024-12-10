import { createContext, useReducer } from "react";
import { SubjectReducer } from "./SubjectReducer";

const SubjectContext = createContext();
export const SubjectDataProvider =({ children })=> {
  const initialState = {
    subject : null,
    listSubject: [],
    listCategory : [],
    listExamDate : [],
    listQuestion : [],
    loading: false,
  };
  const [state, dispatch] = useReducer(SubjectReducer, initialState);

  return (
    <SubjectContext.Provider value={{ ...state, dispatch }}>
      {children}
    </SubjectContext.Provider>
  );
}
export default SubjectContext

