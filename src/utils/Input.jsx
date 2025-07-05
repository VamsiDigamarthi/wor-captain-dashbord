const Input = ({ label, type = "text", value, onChange, name, error }) => {
  return (
    <div className="w-full flex flex-col gap-1">
      <p className="text-[11px] font-medium">{label}</p>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full h-[43px] bg-white border rounded-md outline-none px-2 text-sm ${
          error ? "border-red-500" : "border-[#282828]"
        }`}
      />
      {error && <p className="text-[11px] text-red-500">{error}</p>}
    </div>
  );
};

export default Input;
