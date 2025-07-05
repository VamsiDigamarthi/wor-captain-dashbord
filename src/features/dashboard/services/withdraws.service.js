import { ShowError } from "../../../Core/Toast";
import { API } from "../../../Core/url";

export const withdrawsApi = async ({ page, limit = 10 }) => {
  try {
    const res = await API.get(
      `/captain/withdraw-request?page=${page}&limit=${limit}`
    );
    return {
      status: true,
      apiData: res.data,
    };
  } catch (error) {
    console.log("error", error);

    ShowError(error.response.data.message || "Something Went Wrong");
    return {
      status: false,
    };
  }
};
