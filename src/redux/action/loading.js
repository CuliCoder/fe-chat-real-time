export const loading = "loading";
export const finish = "finish";
export const loading_request = () => {
  return {
    type: loading,
  };
};
export const finish_request = () => {
  return {
    type: finish,
  };
};
