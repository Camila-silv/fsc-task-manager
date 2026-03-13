import PropTypes from "prop-types";

const Input = ({ type = "text", className, ...rest }) => {
  return (
    <input
      className={`w-full rounded-lg border border-[#ECECEC] px-4 py-3 text-[14px] placeholder:text-[14px] placeholder:font-normal placeholder:text-[#9A9C9F] focus:outline-none ${className}`}
      type={type}
      {...rest}
    />
  );
};

export default Input;

Input.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
};
