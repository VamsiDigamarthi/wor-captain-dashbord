import { useState } from "react";
import Modal from "../../../utils/Modal";
import DocVerificationModal from "../Modal/DocVerificationModal";

const DocumentCard = ({ txt, verified }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div
        onClick={() => setOpenModal(true)}
        className="cursor-pointer w-[200px] h-[100px] border border-[#E5E7EB] p-2 flex flex-col rounded-md shadow justify-between items-center gap-2"
      >
        <div className="w-full flex justify-between items-center">
          <span className="text-sm">{txt}</span>
        </div>
        <span className="w-full h-[60px] bg-[#F3F4F6] text-black rounded-md flex justify-center items-center">
          <p
            style={{
              color:
                verified === "Verified"
                  ? "green"
                  : verified === "Rejected"
                  ? "red"
                  : "lime",
            }}
            className="text-sm font-semibold "
          >
            {verified}
          </p>
        </span>
      </div>
      {openModal && (
        <Modal styles="w-[85%] h-[90%]" onClose={() => setOpenModal(false)}>
          <DocVerificationModal setOpenModal={setOpenModal} lable={txt} />
        </Modal>
      )}
    </>
  );
};

export default DocumentCard;
