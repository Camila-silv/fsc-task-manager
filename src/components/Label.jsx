import PropTypes from "prop-types";

const Label = ({ name, title }) => {
  return (
    <label htmlFor={name} className="text-[14px] font-semibold text-[#35383E]">
      {title}
    </label>
  );
};

export default Label;

Label.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
};
