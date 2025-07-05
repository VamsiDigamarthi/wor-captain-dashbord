import React, { useState, useRef, useEffect } from "react";
import { Filter } from "lucide-react";

export const filterOptions = [
  "All Users",
  "Verified Partner",
  "Not Verified",
  // "Verification Pending",
  // "Blocked Users",
];

const FilterCard = ({ onChange, options }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("All Users");
  const ref = useRef();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (option) => {
    setSelected(option);
    onChange(option);
    setOpen(false);
  };

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-[170px] h-[40px] flex items-center justify-center gap-2 border border-[#E5E7EB] rounded-md bg-white  text-sm"
      >
        <Filter size={16} />
        <span className="ml-1">{selected}</span>
      </button>

      {open && (
        <ul className="absolute z-50 mt-1 -ml-12 w-[150px] bg-white shadow rounded-md text-sm">
          {options.map((option, idx) => (
            <li
              key={idx}
              onClick={() => handleSelect(option)}
              className={`px-3 py-3 hover:bg-gray-100 cursor-pointer border-b border-[#B0B0B0] ${
                option === selected ? "font-semibold text-blue-600" : ""
              }`}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FilterCard;
