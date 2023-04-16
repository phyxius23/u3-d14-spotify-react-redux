import { IS_PLAYING } from "../actions";

const initialState = {
  content: null,
}

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_PLAYING:
      return {
        ...state,
        content: action.payload
      }
    default:
      return state;
  }
};
export default playerReducer;