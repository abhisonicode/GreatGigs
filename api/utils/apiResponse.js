export const apiResponse = (status, data, message = "") => {
  const response = {};
  if (status === ApiStatus.SUCCESS) {
    response.status = "success";
  } else if (status === ApiStatus.FAILED) {
    response.status = "failed";
  }
  response.data = data;
  response.message = message;
  return response;
};

export const ApiStatus = {
  SUCCESS: 1,
  FAILED: 0,
};
