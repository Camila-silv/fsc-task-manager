import PropTypes from "prop-types";

import AlertMessage from "./AlertMessage";

const Input = ({ type = "text", className, error, children, ...rest }) => {
  return (
    <div className="flex flex-col gap-1">
      {children}
      <input
        className={`placeholder:text-brand-text-gray w-full rounded-lg border border-[#ECECEC] px-4 py-3 text-[14px] placeholder:text-[14px] placeholder:font-normal focus:outline-none ${className}`}
        type={type}
        {...rest}
      />
      {error && <AlertMessage>{error}</AlertMessage>}
    </div>
  );
};

export default Input;

Input.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  error: PropTypes.string,
};
