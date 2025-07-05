import { API } from "../../../Core/url";

export const getDayAttendace = async ({ from, todate }) => {
  const token = localStorage.getItem("token");

  try {
    const res = await API.get(`/attendace?fromDate=${from}&toDate=${todate}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("res", res);

    return {
      status: true,
      attendace: res?.data,
    };
  } catch (error) {
    console.log("failed to fetch attendace", error);
    return {
      status: false,
      error: "Something went wrong",
    };
  }
};

export const markAttendance = async ({ date, day, checkIn, checkOut }) => {
  const token = localStorage.getItem("token");

  try {
    const res = await API.post(
      `/attendace`,
      {
        date,
        day,
        ...(checkIn && { checkIn }),
        ...(checkOut && { checkOut }),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      status: true,
      data: res.data,
    };
  } catch (error) {
    console.error("Attendance error:", error);
    return {
      status: false,
      error: error.response?.data?.message || "Something went wrong",
    };
  }
};

export const getPaginatedAttendance = async ({
  from,
  todate,
  page = 1,
  limit = 10,
}) => {
  const token = localStorage.getItem("token");

  try {
    const res = await API.get(
      `/attendace/pagination?fromDate=${from}&toDate=${todate}&page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return {
      status: true,
      records: res?.data?.records || [],
      page: res?.data?.page,
      totalCount: res?.data?.totalCount,
      totalPages: res?.data?.totalPages,
    };
  } catch (error) {
    console.error("Failed to fetch paginated attendance", error);
    return {
      status: false,
      error: error.response?.data?.message || "Something went wrong",
    };
  }
};
