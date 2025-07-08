import { useDispatch, useSelector } from "react-redux";
import { handleRejectDocsApi } from "../services/docsVerified.service";
import { fetchSingleUserSlice } from "../../../Redux/slice/worUsersSlice";

export const returnDcsType = (lable) => {
  return lable === "Aadhar ID Card"
    ? "aadhar"
    : lable === "Driver's License"
    ? "dl"
    : lable === "Vehicle Image"
    ? "Vehicle Image"
    : "RC";
};

export const useDocRejectAcceptHook = ({ lable, setOpenModal }) => {
  const dispatch = useDispatch();
  const { singleUser } = useSelector((state) => state.worUsers);

  const handleReject = async () => {
    const docsType = returnDcsType(lable);

    const data = await handleRejectDocsApi({
      id: singleUser?._id,
      docsType,
      status: "rejected",
    });

    if (data) {
      dispatch(fetchSingleUserSlice(singleUser?._id));
      setOpenModal(false);
    }
  };
  const handleAccept = async () => {
    const docsType = returnDcsType(lable);
    const data = await handleRejectDocsApi({
      id: singleUser?._id,
      docsType,
      status: "verified",
    });
    if (data) {
      dispatch(fetchSingleUserSlice(singleUser?._id));
      setOpenModal(false);
    }
  };

  return {
    handleAccept,
    handleReject,
  };
};
