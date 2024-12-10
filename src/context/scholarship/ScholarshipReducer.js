export const ScholarshipReducer = (state, action) => {
    switch (action.type) {
      case "SET_LOADING":
        return {
          ...state,
          loading: true,
        };
      case "SET_SCHOLARSHIP":
        return {
          ...state,
          listScholarship: action.payload,
          loading: false,
        };
    }
  };