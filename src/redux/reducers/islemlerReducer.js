import actionTypes from "../actions/actionTypes";

const initialState = {
  start: false,
  success: false,
  islemler: [],
  fail: false,
  errorMessage: "",
};

const İslemlerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ISLEMLER_START:
      return {
        ...state,
        start: true,
      };
    case actionTypes.FETCH_ISLEMLER_SUCCESS:
      return {
        ...state,
        start: false,
        success: true,
        fail: false,
        errorMessage: "",
        islemler: action.payload,
      };
    case actionTypes.FETCH_ISLEMLER_FAIL:
      return {
        ...state,
        start: false,
        success: false,
        fail: true,
        errorMessage: action.payload,
      };
    case actionTypes.ADD_ISLEM:
      return {
        ...state,
        islemler: [action.payload, ...state.islemler],
      };
    case actionTypes.DELETE_ISLEM:
      const filteredDeletedIslemler = state.islemler.filter(
        (islem) => islem.id !== action.payload
      );
      return {
        ...state,
        islemler: filteredDeletedIslemler,
      };

    default:
      return state;
  }
};

export default İslemlerReducer;
