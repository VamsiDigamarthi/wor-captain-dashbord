import { Download, MonitorCheckIcon } from "lucide-react";
import SearchBar from "../../../utils/SearchBar";
import SelectInput from "../../../utils/SelectInput";

const roles = ["All", "UPI", "Bank"];

const WithdrawFilter = ({ donwOrAddFun, btnText = "Donwload" }) => {
  return (
    <div className="w-full rounded-lg bg-[#F8F8F8] p-4 flex flex-col gap-1">
      <div className="w-full flex justify-between items-center">
        <h3 className="text-lg font-semibold">Payment WithDraw</h3>
        <button
          onClick={donwOrAddFun}
          className="min-w-[110px] px-3 h-[40px] bg-[#EA4C89] flex justify-center gap-1 items-center rounded-md"
        >
          <Download className="text-white" size={20} />
          <span className="text-white font-semibold text-lg">{btnText}</span>
        </button>
      </div>
      <div className="w-full flex justify-between items-center ">
        <SearchBar icon={MonitorCheckIcon} placeholder="Driver ID" />
        <SearchBar icon={MonitorCheckIcon} placeholder="Transaction ID" />
        <div className="w-[300px]">
          <SelectInput
            label="Payment Method"
            name="role"
            // value={form.role}
            // onChange={handleChange}
            options={roles}
            // error={errors.role}
            isDisplayLable={false}
            selectTex="Payment Method"
          />
        </div>
      </div>
    </div>
  );
};

export default WithdrawFilter;
