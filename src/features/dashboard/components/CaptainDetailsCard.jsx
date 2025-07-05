import { CornerRightDown, X } from "lucide-react";
import IconBtn from "../../../utils/IconBtn";
import { imageUrl } from "../../../Core/url";

// Reusable component for detail row
const DetailRow = ({ label, value }) => (
  <div className="w-full flex justify-between items-center">
    <span className="text-sm text-gray-900">{label}</span>
    <span className="text-sm">{value}</span>
  </div>
);

const CaptainDetailsCard = ({ singleUser }) => {
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
          <Card txt="Aadhar ID Card" />
          <Card txt="Driver's License" />
          <Card txt="Vehicle rc" />
          <Card txt="Pan ID Card" />
        </div>
      </div>
    </div>
  );
};

export default CaptainDetailsCard;

const Card = ({ txt }) => (
  <div className="w-[200px] h-[100px] border border-[#E5E7EB] p-2 flex flex-col rounded-md shadow justify-between items-center gap-2">
    <div className="w-full flex justify-between items-center">
      <span className="text-sm">{txt}</span>
    </div>
    <span className="w-full h-[60px] bg-[#F3F4F6] rounded-md flex justify-center items-center"></span>
  </div>
);
