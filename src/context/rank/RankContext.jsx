import { createContext, useReducer } from "react";
import {RankReducer} from "./RankReducer";

const RankDataContext = createContext();
export const RankDataProvider = ({ children }) => {
  const initialState = {
    listRanks: [],
    listCategory : [],
    loading: false,
  };
  const [state, dispatch] = useReducer(RankReducer, initialState);

  return (
    <RankDataContext.Provider value={{ ...state, dispatch }}>
      {children}
    </RankDataContext.Provider>
  );
};
export default RankDataContext;