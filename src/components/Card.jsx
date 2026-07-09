import PropTypes from "prop-types";

const Card = ({ children, number, title }) => {
  return (
    <div className="bg-brand-white flex min-h-37.25 w-full flex-col items-center justify-center gap-1.5 rounded-[10px] p-6 text-center">
      <div className="flex items-center gap-2">
        {children}
        <span className="text-brand-dark-blue font-sans text-[30px] font-semibold">
          {number}
        </span>
      </div>
      <h2 className="font-tertiary text-brand-dark-blue text-center text-[16px] font-normal">
        {title}
      </h2>
    </div>
  );
};

export default Card;

Card.propTypes = {
  children: PropTypes.node,
  number: PropTypes.number,
  title: PropTypes.string,
};
