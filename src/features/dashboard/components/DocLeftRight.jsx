import { Check, CircleGauge, X } from "lucide-react";
import IconBtn from "../../../utils/IconBtn";
import { imageUrl } from "../../../Core/url";
import { useDocRejectAcceptHook } from "../hooks/docVerifiedReject.hook";
import { useSurepassDataHook } from "../hooks/surepass.data.hook";

const DocLeftRight = ({
  detailsToShow,
  docImage,
  selectedImage,
  setSelectedImage,
  lable,
  setOpenModal,
}) => {
  const renderDetail = ({ label, value, index }) => {
    return value ? (
      <DetailsCard key={index} label={label} value={value} />
    ) : null;
  };

  const { handleAccept, handleReject } = useDocRejectAcceptHook({
    lable,
    setOpenModal,
  });

  const { fetchSurePassData, isLoading } = useSurepassDataHook({ lable });

  return (
    <>
      <div className="w-1/2 flex flex-col gap-2 h-full overflow-y-scroll">
        {detailsToShow.map((detail, index) =>
          renderDetail({ label: detail.label, value: detail.value, index })
        )}
        <div className="w-full flex flex-col gap-4 mb-4">
          <span
            onClick={() => setSelectedImage(docImage?.frontImage)}
            className="cursor-pointer w-full h-[270px] rounded-md outline-hidden bg-gray-100"
          >
            <img
              className="w-full h-full object-contain"
              src={`${imageUrl}/${docImage?.frontImage}`}
              alt=""
            />
          </span>
          <span
            onClick={() => setSelectedImage(docImage?.backImage)}
            className="cursor-pointer w-full h-[270px] rounded-md outline-hidden bg-gray-100"
          >
            <img
              className="w-full h-full object-contain"
              src={`${imageUrl}/${docImage?.backImage}`}
              alt=""
            />
          </span>
        </div>
      </div>
      <div className="w-1/2 border-l-2 border-gray-500 pl-2 flex flex-col gap-1.5">
        <div className="w-full h-[85%] p-2">
          <img
            className="w-full h-full object-contain"
            src={`${imageUrl}/${selectedImage}`}
            alt=""
          />
        </div>
        <div className="w-full flex justify-end items-end gap-2.5">
          <IconBtn
            icon={CircleGauge}
            text="Sure Pass"
            onClick={fetchSurePassData}
            bgColor="bg-[#fae902]"
            iconBg="bg-white text-black"
            textColor="text-[#fff]"
            isLoading={isLoading}
          />
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
      </div>
    </>
  );
};

export default DocLeftRight;

const DetailsCard = ({ label, value }) => {
  return (
    <span className="text-base font-normal">
      {label} - <span className="text-lg font-semibold ml-2">{value}</span>
    </span>
  );
};
