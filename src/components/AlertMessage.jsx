import PropTypes from "prop-types";

const AlertMessage = ({ children }) => {
  return (
    <span className="mt-1.25 block text-[10px] text-red-700">{children}</span>
  );
};

export default AlertMessage;

AlertMessage.propTypes = {
  children: PropTypes.element,
};
