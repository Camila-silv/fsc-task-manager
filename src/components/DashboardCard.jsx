import PropTypes from "prop-types";

const DashboardCard = ({ className, title, parag, children }) => {
  return (
    <div
      className={`bg-brand-white flex flex-col gap-6 rounded-[10px] p-6 ${className}`}
    >
      <header>
        <h2 className="text-brand-dark-blue font-sans text-[20px] font-semibold">
          {title}
        </h2>
        <p className="text-brand-text-gray font-sans text-[14px] font-normal">
          {parag}
        </p>
      </header>

      {children}
    </div>
  );
};

export default DashboardCard;

DashboardCard.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  parag: PropTypes.string,
  children: PropTypes.element,
};
