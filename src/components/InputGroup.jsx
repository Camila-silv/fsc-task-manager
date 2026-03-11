import PropTypes from "prop-types";

const InputGroup = ({ title, name, ...rest }) => {
  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={name}
        className="text-[14px] font-semibold text-[#35383E]"
      >
        {title}
      </label>
      <input
        name={name}
        id={name}
        className="w-full rounded-lg border border-[#ECECEC] px-4 py-3 text-[14px] placeholder:text-[14px] placeholder:font-normal placeholder:text-[#9A9C9F] focus:outline-none"
        {...rest}
      />
    </div>
  );
};

export default InputGroup;

InputGroup.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
};
