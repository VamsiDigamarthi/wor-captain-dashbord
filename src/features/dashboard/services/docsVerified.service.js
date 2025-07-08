import { ShowError } from "../../../Core/Toast";
import { API } from "../../../Core/url";

const surePassApiKay =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczODczOTM2NCwianRpIjoiNDQwNjBkNWMtODA5NC00MTYxLWEyODktMTQ5M2JmOGNhNjQxIiwidHlwZSI6ImFjY2VzcyIsImlkZW50aXR5IjoiZGV2Lm51aHZpbjAyQHN1cmVwYXNzLmlvIiwibmJmIjoxNzM4NzM5MzY0LCJleHAiOjIzNjk0NTkzNjQsImVtYWlsIjoibnVodmluMDJAc3VyZXBhc3MuaW8iLCJ0ZW5hbnRfaWQiOiJtYWluIiwidXNlcl9jbGFpbXMiOnsic2NvcGVzIjpbInVzZXIiXX19.FKrt3pav4Ls7zcOojQ51GijcW-YImN62xNhkx2K_4uY";

export const handleRejectDocsApi = async ({ id, docsType, status }) => {
  try {
    await API.patch("/manager/verified-captains", { id, status, docsType });

    return true;
  } catch (error) {
    console.log("Error updated docs status", error);
    ShowError(error?.reasponse?.data?.message || "Error updated docs status");
    return false;
  }
};

export const fetchPanDetailsFromsurepass = async ({ panNumber, userId }) => {
  try {
    const response = await axios.post(
      "https://kyc-api.surepass.app/api/v1/pan/pan",
      {
        id_number: panNumber?.toUpperCase(),
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${surePassApiKay}`,
        },
      }
    );
    console.log("response", response.data?.data);

    await panDataUploadToOwnServer({ data: response.data?.data, userId });

    return true;
  } catch (error) {
    errorMsgApi(
      error?.response?.data?.message || "failde to upload DL Details"
    );
    return false;
  }
};

const panDataUploadToOwnServer = async ({ data, userId }) => {
  try {
    await API.patch(`/captain/pan-updated/${userId}`, { data });
    return true;
  } catch (error) {
    console.log("Error updated docs status", error);
    return false;
  }
};

// RC DETAILS
export const fetchRcDataApi = async ({ userId, rcNumber }) => {
  try {
    const response = await axios.post(
      "https://kyc-api.surepass.app/api/v1/rc/rc-full",
      {
        id_number: rcNumber,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${surePassApiKay}`,
        },
      }
    );

    const data = await somethingRcData({
      data: response.data?.data,
      userId,
      rcNumber,
    });

    if (data) {
      return true;
    }
  } catch (error) {
    console.log(error?.response?.data?.message, "------------------");

    ShowError(error?.response?.data?.message || "failde to upload RC Number");
    return false;
  }
};

async function somethingRcData({ data, userId, rcNumber }) {
  try {
    await API.patch(`/captain/rc-details-update/${userId}/${rcNumber}`, {
      data,
    });
    return true;
  } catch (error) {
    console.log("Error updated docs status", error);
    return false;
  }
}

// DL DATA
export const fetchDrivingLinces = async ({ licNume, dob, userId }) => {
  try {
    const response = await axios.post(
      "https://kyc-api.surepass.app/api/v1/driving-license/driving-license",
      {
        id_number: licNume,
        dob: dob,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${surePassApiKay}`,
        },
      }
    );

    console.log("bofere own server", response.data?.data);

    await somethingLicenseData({ data: response.data?.data, userId });

    return true;
  } catch (error) {
    console.log(error.response?.data?.message, "message");
    if (error.response?.data?.message === "Verification Failed") {
      errorMsgApi("failde to upload DL Details");
    }
    errorMsgApi(
      error?.response?.data?.message || "failde to upload DL Details"
    );
    return false;
  }
};

async function somethingLicenseData({ data, userId }) {
  try {
    await API.patch(`/captain/lince-details-update/${userId}`, { data });
    return true;
  } catch (error) {
    console.log("Error updated docs status", error);
    return false;
  }
}
