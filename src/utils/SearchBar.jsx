import { Search } from "lucide-react";

const SearchBar = ({
  placeholder = "Search here...!",
  icon: Icon = Search,
  value,
  onChange,
  width = "w-[280px]",
}) => {
  return (
    <div
      className={`w-[280px] h-[40px] flex justify-between items-center rounded-md border border-[#E5E7EB] bg-white px-1.5 ${width}`}
    >
      <Icon size={16} /> {/* Dynamic icon */}
      <input
        placeholder={placeholder}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-[90%] h-full bg-transparent outline-none border-none"
      />
    </div>
  );
};

export default SearchBar;
