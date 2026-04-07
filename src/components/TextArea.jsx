import PropTypes from "prop-types";

import AlertMessage from "./AlertMessage";

const TextArea = ({ children, error, ...rest }) => {
  return (
    <div className="flex flex-col gap-1">
      {children}
      <textarea
        className="block h-46 w-full resize-none rounded-lg border border-[#ECECEC] px-4 py-3 text-[14px] placeholder:text-[14px] placeholder:font-normal placeholder:text-[#9A9C9F] focus:outline-none"
        {...rest}
      ></textarea>
      {error && <AlertMessage>{error}</AlertMessage>}
    </div>
  );
};

export default TextArea;

TextArea.propTypes = {
  children: PropTypes.node,
  error: PropTypes.string,
};
