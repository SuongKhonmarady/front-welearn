import { createContext, useReducer } from "react";
import { UserReducer } from "./UserReducer";
import PropTypes from 'prop-types';

const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const initialState = {
    listUser: [],
    currentUser: {},
    loading: false,
  };
  const [state, dispatch] = useReducer(UserReducer, initialState);

  return (
    <UserDataContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserDataContext.Provider>
  );
};

UserDataProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default UserDataContext;

