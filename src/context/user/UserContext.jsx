import { createContext, useReducer } from "react";
import { UserReducer } from "./UserReducer";


const UserDataContext = createContext();
export const UserDataProvider =({ children })=> {
  const initialState = {
    listUser: [],
    currentUser : {},
    loading: false,
  };
  const [state, dispatch] = useReducer(UserReducer, initialState);

  return (
    <UserDataContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserDataContext.Provider>
  );
}
export default UserDataContext

