import actionTypes from "../actions/actionTypes";

const initialState = {
  start: false,
  success: false,
  hastalar: [],
  fail: false,
  errorMessage: "",
};

const hastalarReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_HASTALAR_START:
      return {
        ...state,
        start: true,
      };
    case actionTypes.FETCH_HASTALAR_SUCCESS:
      return {
        ...state,
        start: false,
        success: true,
        fail: false,
        hastalar: action.payload,
      };
    case actionTypes.FETCH_HASTALAR_FAIL:
      return {
        ...state,
        start: false,
        success: false,
        fail: true,
        errorMessage: action.payload,
      };
    case actionTypes.ADD_HASTA:
      return {
        ...state,
        hastalar: [action.payload, ...state.hastalar],
      };
    case actionTypes.DELETE_HASTA:
      const filteredDeletedHastalar = state.hastalar.filter(
        (hasta) => hasta.id !== action.payload
      );
      return {
        ...state,
        hastalar: filteredDeletedHastalar,
      };
    case actionTypes.EDIT_HASTA:
      const filteredEditedHastalar = state.hastalar.filter(
        (hasta) => hasta.id !== action.payload.id
      );
      return {
        ...state,
        hastalar: [action.payload, ...filteredEditedHastalar],
      };

    default:
      return state;
  }
};

export default hastalarReducer;
