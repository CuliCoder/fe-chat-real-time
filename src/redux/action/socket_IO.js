export const loading = "loading";
export const finish = "finish";
export const loading_request_IO = () => {
  return {
    type: loading,
  };
};
export const finish_request_IO = () => {
  return {
    type: finish,
  };
};
