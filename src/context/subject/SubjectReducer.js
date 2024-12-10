export const SubjectReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "SET_SUBJECT":
      return {
        ...state,
        listSubject: action.payload,
        loading: false,
      };
    case "SET_CATEGORY":
      return {
        ...state,
        listCategory: action.payload,
        loading: false,
      };
    case "SET_EXAMDATE":
      return {
        ...state,
        listExamDate: action.payload,
        loading: false,
      };
    case "SET_QUESTION":
      return {
        ...state,
        listQuestion: action.payload,
        loading: false,
      };
    case "SET_PDF":
      return {
        ...state,
        subject : action.payload,
        loading : false,
      }
  }
};
