import PropTypes from "prop-types";

const Button = ({ children, variant, size = "small", className, ...rest }) => {
  const getVariantClass = () => {
    if (variant === "primary") {
      return "bg-[#00ADB5] text-white";
    }

    if (variant === "ghost") {
      return "bg-transparent text-[#818181]";
    }

    if (variant === "secondary") {
      return "bg-[#EEEEEE] text-[#35383E]";
    }
  };

  const getSizetClass = () => {
    if (size === "small") {
      return "text-[12px] px-3 py-1 rounded-[5px]";
    }

    if (size === "large") {
      return "text-[14px] px-3 py-2 rounded-[8px]";
    }
  };

  return (
    <button
      type="button"
      className={`flex cursor-pointer items-center justify-center gap-1 font-sans font-semibold transition delay-150 hover:opacity-75 ${getVariantClass()} ${getSizetClass()} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;

Button.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.children,
  size: PropTypes.string,
  className: PropTypes.string,
};
