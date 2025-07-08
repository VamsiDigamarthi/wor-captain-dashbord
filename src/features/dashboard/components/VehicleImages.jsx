import { Check, X } from "lucide-react";
import { imageUrl } from "../../../Core/url";
import IconBtn from "../../../utils/IconBtn";
import { useDocRejectAcceptHook } from "../hooks/docVerifiedReject.hook";

const VehicleImages = ({ docImage, lable, setOpenModal }) => {
  const { handleAccept, handleReject } = useDocRejectAcceptHook({
    lable,
    setOpenModal,
  });

  return (
    <div className="w-full h-full flex flex-wrap gap-5 overflow-y-scroll">
      {docImage?.frontImage && lable && (
        <img
          className="w-[320px] h-[400px] object-contain border border-gray-200 rounded-md"
          src={`${imageUrl}/${docImage?.frontImage}`}
          alt={lable}
        />
      )}
      {docImage?.backImage && (
        <img
          src={`${imageUrl}/${docImage?.backImage}`}
          className="w-[320px] h-[400px] object-contain border border-gray-200 rounded-md"
          alt={lable}
        />
      )}
      {docImage?.leftImage && (
        <img
          src={`${imageUrl}/${docImage?.leftImage}`}
          className="w-[320px] h-[400px] object-contain border border-gray-200 rounded-md"
          alt={lable}
        />
      )}
      {docImage?.rightImage && (
        <img
          src={`${imageUrl}/${docImage?.rightImage}`}
          className="w-[320px] h-[400px] object-contain border border-gray-200 rounded-md"
          alt={lable}
        />
      )}
      {docImage?.helmetImage && (
        <img
          src={`${imageUrl}/${docImage?.helmetImage}`}
          className="w-[320px] h-[400px] object-contain border border-gray-200 rounded-md"
          alt={lable}
        />
      )}
      {docImage?.numberImage && (
        <img
          src={`${imageUrl}/${docImage?.numberImage}`}
          className="w-[320px] h-[400px] object-contain border border-gray-200 rounded-md"
          alt={lable}
        />
      )}
      {/* <div> */}
      <div className="w-full flex justify-end items-end gap-2.5 mb-7">
        <IconBtn
          icon={Check}
          text="Verified"
          onClick={handleAccept}
          bgColor="bg-[#22C55E]"
          iconBg="bg-white text-black"
          textColor="text-[#fff]"
        />
        <IconBtn
          icon={X}
          text="Rejecte"
          onClick={handleReject}
          bgColor="bg-[#EF4444]"
          iconBg="bg-white text-black"
          textColor="text-[#fff]"
        />
      </div>
      {/* </div> */}
    </div>
  );
};

export default VehicleImages;
