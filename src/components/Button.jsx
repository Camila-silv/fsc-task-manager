import PropTypes from "prop-types";

const Button = ({ children, variant }) => {
  const getVariantClass = () => {
    if (variant === "primary") {
      return "bg-[#00ADB5] text-white";
    }

    if (variant === "ghost") {
      return "bg-transparent text-[#818181]";
    }
  };

  return (
    <button
      className={`flex cursor-pointer items-center gap-1 rounded-[5px] px-3 py-1 font-sans text-[12px] font-semibold transition delay-150 hover:opacity-75 ${getVariantClass()}`}
    >
      {children}
    </button>
  );
};

export default Button;

Button.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.children,
};
