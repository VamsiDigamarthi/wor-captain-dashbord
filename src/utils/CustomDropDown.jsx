export default function CustomDropDown({
  options,
  value,
  setValue,
  placeholder = "Select an option",
  onChange,
}) {
  return (
    <select
      className="bg-white border border-gray-500 rounded-lg py-2"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">{placeholder}</option>
      {options?.map((option, index) => (
        <option value={option.value}>{option.title}</option>
      ))}
    </select>
  );
}
