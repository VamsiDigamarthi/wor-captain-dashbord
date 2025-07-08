import { useDispatch, useSelector } from "react-redux";
import { returnDcsType } from "./docVerifiedReject.hook";
import { useState } from "react";
import { fetchSingleUserSlice } from "../../../Redux/slice/worUsersSlice";
import {
  fetchDrivingLinces,
  fetchRcDataApi,
} from "../services/docsVerified.service";

export const useSurepassDataHook = ({ lable }) => {
  const dispatch = useDispatch();
  const { singleUser } = useSelector((state) => state.worUsers);
  const [isLoading, setIsLoading] = useState(false);

  const fetchSurePassData = async () => {
    const docsType = returnDcsType(lable);
    docsType === "dl"
      ? fetchDlSurePassData()
      : docsType === "RC"
      ? fetchRcData()
      : panDetails();
  };

  const panDetails = () => {
    singleUser?.docsNumber?.newAadharNumber?.length === 10 &&
      fetcPanDetailsFromSurepass({
        panNumber: singleUser?.docsNumber?.newAadharNumber,
      });
  };

  // PAN DETAILS FETCH
  const fetcPanDetailsFromSurepass = async ({ panNumber }) => {
    setIsLoading(true);

    const data = await fetchPanDetailsFromsurepass({
      panNumber: panNumber,
      userId: singleUser?._id ?? "",
    });

    setIsLoading(false);
    if (data) {
      dispatch(fetchSingleUserSlice(singleUser?._id));
    }
  };

  const fetchRcData = async () => {
    if (
      singleUser &&
      !singleUser?.services?.[0]?.ownerName &&
      singleUser?.services?.[0]?.rcVerificationStatuc === "pending"
    ) {
      setIsLoading(true);
      const rcDetailsResponse = await fetchRcDataApi({
        rcNumber: singleUser?.services?.[0]?.rcNumber,
        userId: singleUser?._id ?? null,
      });
      setIsLoading(false);

      if (rcDetailsResponse) {
        dispatch(fetchSingleUserSlice(singleUser?._id));
      }
    }
  };

  const fetchDlSurePassData = async () => {
    if (
      singleUser &&
      !singleUser?.licenseCardDetails?.name &&
      singleUser?.adminDocsVerified?.adminLicenVerified === "pending"
    ) {
      setIsLoading(true);
      const dlRes = await fetchDrivingLinces({
        licNume: singleUser?.docsNumber.newLicenNumber,
        dob: singleUser?.docsNumber?.dob,
        userId: singleUser?._id,
      });
      setIsLoading(false);
      if (dlRes) {
        dispatch(fetchSingleUserSlice(singleUser?._id));
      }
    }
  };

  return {
    fetchSurePassData,
    isLoading,
  };
};
