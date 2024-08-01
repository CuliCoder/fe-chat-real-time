import { list_conversation } from "../action/conversation";
const initialState = {
  data: [],
};
const conservation_reducer = (state = initialState, action) => {
  switch (action.type) {
    case list_conversation:
      return {
        ...state,
        data: action.data,
      };
    default:
      return state;
  }
};
export default conservation_reducer;