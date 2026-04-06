import PropTypes from "prop-types";

const Input = ({ type = "text", className, ...rest }) => {
  return (
    <input
      className={`placeholder:text-brand-text-gray w-full rounded-lg border border-[#ECECEC] px-4 py-3 text-[14px] placeholder:text-[14px] placeholder:font-normal focus:outline-none ${className}`}
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
