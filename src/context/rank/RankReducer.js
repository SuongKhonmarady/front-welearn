export const RankReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "SET_RANKS":
      return {
        ...state,
        listRanks: action.payload,
        loading: false,
      };
    case "SET_CATEGORY":
      return {
        ...state,
        listCategory: action.payload,
      };
  }
};
