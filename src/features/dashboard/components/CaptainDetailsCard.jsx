import { CornerRightDown, X } from "lucide-react";
import IconBtn from "../../../utils/IconBtn";
import { imageUrl } from "../../../Core/url";
import DocumentCard from "./DocumentCard";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// Reusable component for detail row
const DetailRow = ({ label, value }) => (
  <div className="w-full flex justify-between items-center">
    <span className="text-sm text-gray-900">{label}</span>
    <span className="text-sm">{value}</span>
  </div>
);

const CaptainDetailsCard = () => {
  const { singleUser } = useSelector((state) => state.worUsers);
  const addressDetails = singleUser?.aadharCardDetails?.address;

  const formattedAddress =
    addressDetails?.country?.length > 0
      ? `${addressDetails?.house} - ${addressDetails?.village} - ${addressDetails?.dist} - ${addressDetails?.country}`
      : "----------------";
  const partnerDetails = {
    "Full Name": singleUser?.name,
    "Contact Number": singleUser?.mobile,
    "Date Of Birth": singleUser?.dob,
    Email: singleUser?.email,
    Address: formattedAddress,
  };

  const [docData, setDocData] = useState([
    { label: "Aadhar ID Card", verified: false },
    { label: "Driver's License", verified: false },
    { label: "Vehicle rc", verified: false },
    { label: "Vehicle Image", verified: false },
  ]);

  useEffect(() => {
    if (singleUser) {
      setDocData([
        {
          label: "Aadhar ID Card",
          verified:
            singleUser?.adminDocsVerified?.adminAadharVerified === "verified"
              ? "Verified"
              : singleUser?.adminDocsVerified?.adminAadharVerified ===
                "rejected"
              ? "Rejected"
              : "In-Progress",
        },
        {
          label: "Driver's License",
          verified:
            singleUser?.adminDocsVerified?.adminLicenVerified === "verified"
              ? "Verified"
              : singleUser?.adminDocsVerified?.adminLicenVerified === "rejected"
              ? "Rejected"
              : "In-Progress",
        },
        {
          label: "Vehicle rc",
          verified:
            singleUser?.services?.[0]?.rcVerificationStatuc === "verified"
              ? "Verified"
              : singleUser?.services?.[0]?.rcVerificationStatuc === "rejected"
              ? "Rejected"
              : "In-Progress",
        },
        {
          label: "Vehicle Image",
          verified:
            singleUser?.services?.[0]?.vehicleImageVerification === "verified"
              ? "Verified"
              : singleUser?.services?.[0]?.vehicleImageVerification ===
                "rejected"
              ? "Rejected"
              : "In-Progress",
        },
      ]);
    }
  }, [singleUser]);

  return (
    <div className="w-full flex flex-col gap-3 bg-[#F9FAFB] p-4 rounded-md">
      <div className="w-full flex items-center gap-3">
        <div className="w-[120px] h-[120px] bg-red-100 rounded-md overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={`${imageUrl}/${singleUser?.profilePic}`}
            alt={singleUser?.name}
          />
        </div>

        <div className="flex flex-col justify-center items-start gap-1 flex-1">
          <h2 className="text-2xl font-semibold">{singleUser?.name}</h2>
          <span className="text-sm text-gray-700">
            #{singleUser?._id?.slice(0, 15)}
          </span>

          <div className="flex items-center gap-2.5 mt-2">
            <IconBtn
              icon={CornerRightDown}
              text="Accept"
              bgColor="bg-green-600"
              textColor="text-white"
              iconBg="bg-white text-green-600"
              onClick={() => alert("Accepted")}
            />
            <IconBtn
              icon={X}
              text="Reject"
              bgColor="bg-red-600"
              textColor="text-white"
              iconBg="bg-white text-red-600"
              onClick={() => alert("Rejected")}
            />
          </div>
        </div>
      </div>

      <div className="w-full bg-white rounded-md p-3 flex flex-col gap-2">
        <h2 className="text-lg font-semibold">Partner’s Detail</h2>

        <div className="w-full flex flex-col gap-2.5">
          {Object.entries(partnerDetails).map(([label, value]) => (
            <DetailRow key={label} label={label} value={value} />
          ))}
        </div>
      </div>
      <div className="w-full bg-white rounded-md p-3">
        <h2 className="text-lg font-semibold">Verification Documents</h2>
        <div className="w-full flex flex-wrap gap-1">
          {docData?.map((doc) => (
            <DocumentCard
              txt={doc?.label}
              key={doc?.label}
              verified={doc?.verified}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CaptainDetailsCard;
