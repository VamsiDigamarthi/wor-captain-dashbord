const SelectInput = ({
  label,
  value,
  onChange,
  name,
  options,
  error,
  isDisplayLable = true,
  selectTex = "Role",
}) => {
  return (
    <div className="w-full flex flex-col gap-1">
      {isDisplayLable && <p className="text-[11px] font-medium">{label}</p>}
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full h-[43px] bg-white border rounded-md outline-none px-2 text-sm ${
          error ? "border-red-500" : "border-[#282828]"
        }`}
      >
        <option value="">Select {selectTex}</option>
        {options.map((opt, i) => (
          <option key={i} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {error && <p className="text-[11px] text-red-500">{error}</p>}
    </div>
  );
};

export default SelectInput;
