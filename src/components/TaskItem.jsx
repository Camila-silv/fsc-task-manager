import PropTypes from "prop-types";

import CheckedIcon from "../assets/icons/checked.svg?react";
import LoaderIcon from "../assets/icons/loader.svg?react";
import TaskInfIcon from "../assets/icons/task-inf.svg?react";

const TaskItem = ({ task }) => {
  const getVariantClass = () => {
    if (task.status === "done") {
      return {
        text: "text-[#002C2E]",
        bgSolit: "bg-[var(--brand-primary)]",
        bg: "bg-[var(--brand-primary)]/10",
      };
    }

    if (task.status === "in_progress") {
      return {
        text: "text-[#ffab048e]",
        bgSolit: "bg-[var(--brand-process)]",
        bg: "bg-[var(--brand-process)]/10",
      };
    }

    return {
      text: "text-[#35383E]",
      bgSolit: "bg-[#D9D9D9]",
      bg: "bg-[#D9D9D9]/10",
    };
  };
  return (
    <div
      className={`flex items-center justify-between gap-6 rounded-[10px] px-4 py-3 text-[14px] font-normal ${getVariantClass().bg} ${getVariantClass().text}`}
    >
      <div className="flex items-center gap-3">
        <label
          htmlFor="task"
          className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg ${getVariantClass().bgSolit}`}
        >
          <input
            type="checkbox"
            id="task"
            className="absolute h-full w-full cursor-pointer opacity-0"
          />

          {task.status === "done" && <CheckedIcon />}
          {task.status === "in_progress" && (
            <LoaderIcon className="animate-spin" />
          )}
        </label>
        {task.name}
      </div>

      <a href="/" title="Mais informações da tarefa">
        <TaskInfIcon />
      </a>
    </div>
  );
};

export default TaskItem;

TaskItem.propTypes = {
  task: PropTypes.object,
};
