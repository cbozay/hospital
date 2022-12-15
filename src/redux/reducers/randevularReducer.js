import actionTypes from "../actions/actionTypes";

const initialState = {
  start: false,
  success: false,
  randevular: [],
  fail: false,
  errorMessage: "",
};

const randevularReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_RANDEVULAR_START:
      return {
        ...state,
        start: true,
      };
    case actionTypes.FETCH_RANDEVULAR_SUCCESS:
      return {
        ...state,
        start: false,
        success: true,
        randevular: action.payload,
        fail: false,
        errorMessage: "",
      };
    case actionTypes.FETCH_RANDEVULAR_FAIL:
      return {
        ...state,
        start: false,
        success: false,
        fail: true,
        errorMessage: action.payload,
      };
    case actionTypes.ADD_RANDEVU:
      return {
        ...state,
        randevular: [action.payload, ...state.randevular],
      };
    case actionTypes.DELETE_RANDEVU:
      const filteredDeletedRandevular = state.randevular.filter(
        (randevu) => randevu.id !== action.payload
      );
      return {
        ...state,
        randevular: filteredDeletedRandevular,
      };
    case actionTypes.EDIT_RANDEVU:
      const filteredEditRandevular = state.randevular.filter(
        (randevu) => randevu.id !== action.payload.id
      );
      return {
        ...state,
        randevular: [action.payload, ...filteredEditRandevular],
      };

    default:
      return state;
  }
};

export default randevularReducer;
