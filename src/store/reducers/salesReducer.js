// SALES REDUCER
export const SET_START = "SET_START";
export const SET_END = "SET_END";

const initialState = {
  start: localStorage.getItem("start") || null,
  end: localStorage.getItem("end") || null
};

export const salesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_START:
      return {
        ...state,
        start: action.payload
      };
    case SET_END:
      return {
        ...state,
        end: action.payload
      };
    default:
      return state;
  }
};
