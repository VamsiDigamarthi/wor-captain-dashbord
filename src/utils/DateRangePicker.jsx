import { useState, useRef, useEffect } from "react";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const DateRangePicker = ({ onChange }) => {
  const [open, setOpen] = useState(false);
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const ref = useRef();

  // Close on outside click
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

  const handleSelect = (ranges) => {
    const selected = [ranges.selection];
    setRange(selected);
    onChange(ranges.selection); // send to parent
  };

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="h-[40px] border border-[#E5E7EB] rounded-md bg-white  px-3 text-sm"
      >
        {`${format(range[0].startDate, "dd/MM/yyyy")} - ${format(
          range[0].endDate,
          "dd/MM/yyyy"
        )}`}
      </button>

      {open && (
        <div className="absolute z-50 mt-2 -ml-40">
          <DateRange
            editableDateInputs={true}
            onChange={handleSelect}
            moveRangeOnFirstSelection={false}
            ranges={range}
          />
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
