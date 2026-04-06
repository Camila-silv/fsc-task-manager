import PropTypes from "prop-types";

const TaskSection = ({ icon, title, children }) => {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-brand-text-gray flex items-center gap-[6.4px] text-[14px] font-semibold">
        {icon} {title}
      </h2>
      <hr className="text-[#F4F4F5]" />
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
};

export default TaskSection;

TaskSection.propTypes = {
  icon: PropTypes.element,
  title: PropTypes.string,
  children: PropTypes.children,
};
