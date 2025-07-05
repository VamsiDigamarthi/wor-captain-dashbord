import { ShowError } from "../../../Core/Toast";
import { API } from "../../../Core/url";

export const handleSendImage = async (formData) => {
  try {
    const res = await API.patch("/support-uploadImage", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        // Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });

    return { status: true, msg: res?.data?.msg };
  } catch (error) {
    ShowError("Failed to upload image");
    return { status: false, error: "Failed to send " };
  }
};

export const fetchSingleSupportChatMessages = async ({ chatId, token }) => {
  try {
    const res = await API.get(`/manager/support-chats/${chatId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return {
      status: true,
      apiData: res?.data,
    };
  } catch (error) {
    console.log(error);

    ShowError("Failed to fetch messages");
    return { status: false, error: "Failed to send " };
  }
};

export const handleUnreadMessage = async ({ chatId, userId }) => {
  try {
    await API.patch("/support-chat/mark-to-read", {
      chatId,
      userId,
    });

    return true;
  } catch (error) {
    console.log(error);

    return false;
  }
};
