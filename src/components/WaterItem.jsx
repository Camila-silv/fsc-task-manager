import PropTypes from "prop-types";
import { tv } from "tailwind-variants";

import { CheckIcon, LoaderIcon } from "../assets/icons/index";

const WaterItem = ({ task }) => {
  const waterItem = tv({
    base: "flex items-center justify-between gap-6 rounded-[10px] px-4 py-3 text-[14px] font-normal",
    variants: {
      color: {
        done: "bg-brand-primary/10 text-[#002C2E]",
        not_started: "text-brand-dark-blue bg-[#D9D9D9]/10",
      },
    },
    defaultVariants: {
      color: "not_started",
    },
  });

  const label = tv({
    base: "relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg",
    variants: {
      color: {
        done: "bg-brand-primary",
        not_started: "bg-[#D9D9D9]",
      },
    },
    defaultVariants: {
      color: "not_started",
    },
  });

  return (
    <div className={waterItem({ color: task.status })}>
      <div className="flex items-center gap-3">
        <label
          htmlFor={`task-${task.id}`}
          className={label({ color: task.status })}
        >
          <input
            type="checkbox"
            id={`task-${task.id}`}
            checked={task.status === "done"}
            className="absolute h-full w-full cursor-pointer opacity-0"
          />

          {task.status === "done" && <CheckIcon />}
          {task.status === "in_progress" && (
            <LoaderIcon className="animate-spin text-white" />
          )}
        </label>
        {task.title}
      </div>
    </div>
  );
};

export default WaterItem;

WaterItem.propTypes = {
  task: PropTypes.object,
};
