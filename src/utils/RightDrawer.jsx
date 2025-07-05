import React from "react";

const RightDrawer = ({ isOpen, onClose, children, width = "w-[400px]" }) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-[rgba(0,0,0,0.5)] z-40"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg transition-transform duration-300 z-50 ${width} ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 h-full overflow-y-auto">{children}</div>
      </div>
    </>
  );
};

export default RightDrawer;
