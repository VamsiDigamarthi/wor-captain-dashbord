import { BeatLoader } from "react-spinners";
const IconBtn = ({
  icon: Icon,
  text = "Click Me",
  onClick,
  bgColor = "bg-blue-600",
  textColor = "text-white",
  iconBg = "bg-white text-blue-600",
  isLoading = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer flex items-center justify-start gap-2 px-3 rounded-md w-[140px] h-[40px] ${bgColor} ${textColor}`}
    >
      {isLoading ? (
        <BeatLoader color="#fff" size={10} />
      ) : (
        <>
          <div
            className={`w-[28px] h-[28px] rounded-full flex items-center justify-center ${iconBg}`}
          >
            {Icon && <Icon size={16} />}
          </div>
          <span className="text-sm font-medium">{text}</span>
        </>
      )}
    </button>
  );
};

export default IconBtn;
