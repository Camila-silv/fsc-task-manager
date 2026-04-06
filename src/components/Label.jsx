import PropTypes from "prop-types";

const Label = ({ name, title }) => {
  return (
    <label
      htmlFor={name}
      className="text-brand-dark-blue text-[14px] font-semibold"
    >
      {title}
    </label>
  );
};

export default Label;

Label.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
};
