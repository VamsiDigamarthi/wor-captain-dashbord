import { X } from "lucide-react";

const Modal = ({ children, onClose, styles = "w-[700px]" }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-lg p-6 shadow-lg max-w-[90%]  ${styles}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full flex justify-between items-center">
          <span></span>
          <X className="cursor-pointer" onClick={onClose} />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
