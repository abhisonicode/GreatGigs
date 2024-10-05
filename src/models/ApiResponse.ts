export interface ApiResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  message: string;
  status: string;
}

export const ApiStatus = {
  success: "success",
  failed: "failed",
};
