// SALES REDUCER
export const SET_DATES = "SET_DATES";

const initialState = {
  start: '',
  end: ''
};

export const salesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATES:
        return {
            ...state,
            start: action.payload.start,
            end: action.payload.end
        }
    default:
      return state;
  }
};