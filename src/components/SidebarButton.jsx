import PropTypes from "prop-types";
import { NavLink } from "react-router";
import { tv } from "tailwind-variants";

const SidebarButton = ({ to, children, ...rest }) => {
  const ancora = tv({
    base: "font-secondary hover:text-brand-primary flex items-center gap-2 rounded-[10px] px-6 py-3 text-sm font-semibold transition delay-150 duration-300 ease-in-out hover:bg-[#E6F7F8]",
    variants: {
      color: {
        selected: "text-brand-primary bg-[#E6F7F8]",
        unselected: "text-brand-dark-blue bg-transparent",
      },
    },
  });
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        ancora({ color: isActive ? "selected" : "unselected" })
      }
      {...rest}
    >
      {children}
    </NavLink>
  );
};

export default SidebarButton;

SidebarButton.propTypes = {
  to: PropTypes.string,
  children: PropTypes.node,
};
