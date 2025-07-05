import { Phone, Wallet, X } from "lucide-react";
import { ShowError } from "../../../Core/Toast";
import { API } from "../../../Core/url";

const WithdrawDrawer = ({ singleRecord, setDrawer, fetchWidthDraws }) => {
  let bgColor = "";
  let textColor = "";

  switch (singleRecord?.isPayed) {
    case true:
      bgColor = "bg-green-100";
      textColor = "text-green-700";
      break;
    case false:
      bgColor = "bg-yellow-100";
      textColor = "text-yellow-700";
      break;
    default:
      bgColor = "bg-yellow-100";
      textColor = "text-yellow-700";
  }

  const handlePay = async () => {
    try {
      const res = await API.patch(
        `/captain/withdraw-request-pay/${singleRecord?._id}`,
        {
          amount: singleRecord?.money,
        }
      );
      setDrawer(false);
      fetchWidthDraws({ page: 1 });
    } catch (error) {
      ShowError("Somthing went wrong");
    }
  };

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="w-full flex justify-between items-center">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-semibold">Issue Details</h3>
          <button
            className={`flex items-center gap-0.5 px-2 py-1 text-sm font-medium rounded-full ${bgColor} ${textColor}`}
          >
            <X size={15} />
            {singleRecord?.isPayed ? "Completed" : "Pending"}
          </button>
        </div>
        <X onClick={() => setDrawer(false)} />
      </div>
      <div className="w-full flex items-center gap-0.5">
        <span className="w-[50px] h-[50px] rounded-full bg-red-50"></span>
        <div className="flex flex-col gap-0.5">
          <span>{singleRecord?.user?.name}</span>
          <span>{singleRecord?.user?._id?.slice(0, 10)}</span>
        </div>
      </div>
      <div className="w-full flex flex-wrap gap-1">
        <div className="w-[150px] h-[60px] bg-[#F9FAFB] rounded-md p-1 ">
          <span className="flex items-center gap-0.5 text-sm text-gray-900">
            <Phone size={12} className="mt-1" />
            phone
          </span>
          <span>{singleRecord?.user?.mobile}</span>
        </div>
        <div className="w-[150px] h-[60px] bg-[#F9FAFB] rounded-md p-1 ">
          <span className="flex items-center gap-0.5 text-sm text-gray-900">
            <Wallet size={15} className="mt-1" />
            Balance
          </span>
          <span>₹ {singleRecord?.user?.walletBalance}</span>
        </div>
      </div>
      <div className="w-full flex flex-col gap-2.5">
        <h2 className="text-lg font-semibold">Withdrawal Request Details</h2>
        <div>
          <span className="text-[#6B7280] text-sm">Requested Amount</span>
          <h3 className="text-lg font-semibold">{singleRecord?.money}</h3>
        </div>
        <div>
          <span className="text-[#6B7280] text-sm">Payment Method</span>
          <h3 className="text-lg font-semibold">{singleRecord?.paymnetBank}</h3>
        </div>
        <div>
          <span className="text-[#6B7280] text-sm">UPI ID</span>
          <h3 className="text-lg font-semibold">
            {singleRecord?.upiId} {singleRecord?.bankName}{" "}
            {singleRecord?.accountNumber}
          </h3>
        </div>
      </div>
      {!singleRecord?.isPayed && (
        <div className="w-full flex justify-end items-center">
          <button
            onClick={handlePay}
            className="px-4 py-2 bg-[#22C55E] text-white rounded-md cursor-pointer"
          >
            Completed
          </button>
        </div>
      )}
    </div>
  );
};

export default WithdrawDrawer;
