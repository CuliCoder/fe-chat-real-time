export const new_message = "new_message";
export const new_Message = (message) => {
  return {
    type: new_message,
    message
  };
};
export const load_all_message = "load_all_message";
export const load_all_Message = (message,user_id) => {
  return {
    type: load_all_message,
    data: { 
      message,
      user_id,
    },
  };
};