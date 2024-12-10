import { createContext, useReducer } from "react";
import { ScholarshipReducer } from "./ScholarshipReducer";


const ScholarshipDataContext = createContext();
export const ScholarshipDataProvider =({ children })=> {
  const initialState = {
    listScholarship: [],
    loading: false,
  };
  const [state, dispatch] = useReducer(ScholarshipReducer, initialState);

  return (
    <ScholarshipDataContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ScholarshipDataContext.Provider>
  );
}
export default ScholarshipDataContext

