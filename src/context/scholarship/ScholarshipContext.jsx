import { createContext, useReducer } from "react";
import { ScholarshipReducer } from "./ScholarshipReducer";
import PropTypes from 'prop-types';

const ScholarshipDataContext = createContext();

export const ScholarshipDataProvider = ({ children }) => {
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
};

ScholarshipDataProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default ScholarshipDataContext;

