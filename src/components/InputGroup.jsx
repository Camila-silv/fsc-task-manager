import PropTypes from "prop-types";

const InputGroup = ({ label, title, type = "text", ...rest }) => {
  return (
    <div className="mb-[1.1rem]">
      <label
        htmlFor={label}
        className="text-brand-dark-blue mb-[0.4rem] block text-[0.82rem] font-bold"
      >
        {title}
      </label>
      <input
        type={type}
        id={label}
        name={label}
        className="border-brand-border bg-brand-background placeholder:text-brand-dark-blue focus:border-brand-primary flex w-full items-center rounded-[10px] border-[1.5px] px-[0.9rem] py-3 text-[0.92rem] transition outline-none placeholder:font-semibold placeholder:opacity-50 focus:bg-transparent"
        {...rest}
      />
    </div>
  );
};

export default InputGroup;

InputGroup.propTypes = {
  label: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
};
