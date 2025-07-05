const IconBtn = ({
  icon: Icon, // icon component (e.g., <Plus /> or <Trash />)
  text = "Click Me", // button text
  onClick, // click handler
  bgColor = "bg-blue-600", // button background
  textColor = "text-white", // text color
  iconBg = "bg-white text-blue-600", // icon container styles
}) => {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer flex items-center justify-start gap-2 px-3 rounded-md w-[140px] h-[40px] ${bgColor} ${textColor}`}
    >
      <div
        className={`w-[28px] h-[28px] rounded-full flex items-center justify-center ${iconBg}`}
      >
        {Icon && <Icon size={16} />}
      </div>
      <span className="text-sm font-medium">{text}</span>
    </button>
  );
};

export default IconBtn;
