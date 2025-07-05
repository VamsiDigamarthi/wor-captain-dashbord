import { Eye, File, X } from "lucide-react";
import CustomDropDown from "../../../utils/CustomDropDown";
import CustomButton from "../../../utils/CustomButton";
import ConversationHistoryItem from "./ConversationHistoryItem";

export default function EscalationSidebar({ onClose }) {
  return (
    <div className="flex flex-col">
      <button onClick={onClose} className="cursor-pointer self-end">
        <X />
      </button>

      <h2 className="text-[#ea4c89] font-semibold text-xl">
        Escalate Support Ticket
      </h2>

      <div className="mt-2">
        <p className="font-semibold text-xl">Ticket Information</p>
        <p className="text-gray-500">Ticket ID: #123456789</p>
        <p className="text-gray-500">Date Created: 2024-01-15</p>
        <p className="text-gray-500">User Name: Sarah Miller</p>
        <p className="text-gray-500">Contact Info: sarah.miller@email.com</p>
        <p className="text-gray-500">Current Status: Open</p>
      </div>

      <div className="mt-2">
        <p className="font-semibold text-xl">Issue Description</p>
        <p className="text-gray-500">
          The passenger is disputing a charge for a ride taken on January 14th.
          They claim the ride was shorter than what was charged and are
          requesting a refund for the difference.
        </p>
      </div>

      <div className="mt-2">
        <p className="font-semibold text-xl mb-2">Conversation History</p>
        <ConversationHistoryItem text={"Manchidi"} date={"12/12/12"} />
        <ConversationHistoryItem text={"Manchidi"} date={"12/12/12"} />
        <ConversationHistoryItem
          text={"Manchidi"}
          date={"12/12/12"}
          showLine={false}
        />
      </div>

      <AttachMentItem />
      <AttachMentItem />
      <AttachMentItem />

      <div className="w-full">
        <label className="text-gray-600">Issue Type</label>
        <CustomDropDown
          options={[
            { value: "payment", title: "Payment Issue" },
            { value: "verification", title: "Verification Issue" },
          ]}
        />
      </div>

      <div className="w-full flex gap-2 my-2">
        <CustomButton
          text={"Cancel"}
          onClick={onClose}
          bg="bg-white"
          className={"text-black border py-3"}
        />
        <CustomButton text={"Escalate Now"} className={"text-white py-3"} />
      </div>
    </div>
  );
}

function AttachMentItem({ file, open }) {
  return (
    <div className="bg-gray-300 rounded-lg flex justify-between my-2 w-full p-2">
      <div className="items-center flex gap-2">
        <File />
        <span>{file?.fileName || "No Name"}</span>
      </div>

      <button onClick={() => open(file)}>
        <Eye />
      </button>
    </div>
  );
}
