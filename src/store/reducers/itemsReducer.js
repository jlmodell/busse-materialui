export const TOGGLE = "ui/toggle";
export const ITEMS = "fetch/items";

const initialState = {
  items: ["a", "b", "c", "d"],
  toggle: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE:
      return { ...state, toggle: !state.toggle };
    case ITEMS:
      return { ...state.items };
    default:
      return { ...state };
  }
};

export const toggleSwitch = () => dispatch => {
  dispatch({ type: TOGGLE });
};
export const fetchItems = () => dispatch => {
  dispatch({ type: ITEMS });
};
