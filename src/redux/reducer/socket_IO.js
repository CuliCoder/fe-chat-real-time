import { loading, finish } from "../action/socket_IO";
const initialState = {
  loading: false,
};
const loading_reducer = (state = initialState, action) => {
  switch (action.type) {
    case loading:
      return {
        ...state,
        loading: true,
      };
    case finish:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
export default loading_reducer;