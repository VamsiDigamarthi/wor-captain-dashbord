import { Download } from "lucide-react";
import SearchBar from "./SearchBar";
import DateRangePicker from "./DateRangePicker";
import FilterCard from "./FilterCard";

const FilterMain = ({
  title = "Passenger’s",
  btnText = "export",
  Icon = Download,
  donwOrAddFun,
  setSearchText,
  searchText,
  dateRange,
  filterOptions,
  handleChangeFilter,
  isDisplayFilter = true,
  isdisplayBtn = true,
}) => {
  return (
    <div className="w-full rounded-lg bg-[#F8F8F8] p-4 flex flex-col gap-1">
      <div className="w-full flex justify-between items-center">
        <h3 className="text-lg font-semibold">{title} Lists </h3>
        {isdisplayBtn && (
          <button
            onClick={donwOrAddFun}
            className="min-w-[110px] px-3 h-[40px] bg-[#EA4C89] flex justify-center gap-1 items-center rounded-md"
          >
            <Icon className="text-white" size={20} />
            <span className="text-white font-semibold text-lg">{btnText}</span>
          </button>
        )}
      </div>
      <div className="flex justify-between items-center">
        <SearchBar onChange={setSearchText} value={searchText} />
        <div className="flex gap-3 items-center">
          <DateRangePicker onChange={dateRange} />
          {isDisplayFilter && (
            <FilterCard
              Icon={Icon}
              btnText={btnText}
              options={filterOptions}
              onChange={handleChangeFilter}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterMain;
