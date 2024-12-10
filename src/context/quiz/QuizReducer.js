export const QuizReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "SET_QUESTION":
      return {
        ...state,
        listQuestion: action.payload,
        loading: false,
      };
    case "SET_CATEGORY":
      return {
        ...state,
        listCategory : action.payload,
        loading : false
      }
    case "SET_LEVEL":
      return {
        ...state,
        listLevel: action.payload,
        loading: false,
      };
  }
};
