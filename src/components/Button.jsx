import PropTypes from "prop-types";
import { tv } from "tailwind-variants";

const Button = ({
  children,
  color = "primary",
  size = "small",
  type = "button",
  className,
  ...rest
}) => {
  const button = tv({
    base: "flex cursor-pointer items-center justify-center gap-1 font-sans font-semibold transition delay-150 hover:opacity-75",
    variants: {
      color: {
        primary: "bg-brand-primary text-white",
        ghost: "text-brand-dark-gray bg-transparent",
        secondary: "bg-brand-light-gray text-brand-dark-blue",
        danger: "bg-brand-danger text-white",
      },
      size: {
        small: "rounded-[5px] px-3 py-1 text-[12px]",
        large: "rounded-[8px] px-3 py-2 text-[14px]",
      },
    },
    defaultVariants: {
      color: "primary",
      size: "small",
    },
  });

  return (
    <button
      type={type}
      className={button({ color, size, className })}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;

Button.propTypes = {
  color: PropTypes.string,
  children: PropTypes.children,
  size: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
};
