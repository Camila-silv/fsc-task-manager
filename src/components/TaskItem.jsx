import PropTypes from "prop-types";
import { tv } from "tailwind-variants";

import CheckedIcon from "../assets/icons/checked.svg?react";
import LoaderIcon from "../assets/icons/loader.svg?react";
import TaskInfIcon from "../assets/icons/task-inf.svg?react";
import TrashIcon from "../assets/icons/trash.svg?react";
import Button from "./Button";

const TaskItem = ({ task, handleTasks, tasks }) => {
  const taskItem = tv({
    base: "flex items-center justify-between gap-6 rounded-[10px] px-4 py-3 text-[14px] font-normal",
    variants: {
      color: {
        done: "bg-[var(--brand-primary)]/10 text-[#002C2E]",
        in_progress: "bg-[var(--brand-process)]/10 text-[#724c00]",
        not_started: "bg-[#D9D9D9]/10 text-[#35383E]",
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
        done: "bg-[var(--brand-primary)]",
        in_progress: "bg-[var(--brand-process)]",
        not_started: "bg-[#D9D9D9]",
      },
    },
    defaultVariants: {
      color: "not_started",
    },
  });

  const handleTaskState = (id) => {
    handleTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id !== id) return task;

        switch (task.status) {
          case "not_started":
            return {
              ...task,
              status: "in_progress",
            };
          case "in_progress":
            return {
              ...task,
              status: "done",
            };
          case "done":
            return {
              ...task,
              status: "not_started",
            };
          default:
            return task;
        }
      });
    });
  };

  const deleteTask = async (id) => {
    const result = tasks.filter((task) => task.id !== id);
    handleTasks(result);
  };

  return (
    <div className={taskItem({ color: task.status })}>
      <div className="flex items-center gap-3">
        <label
          htmlFor={`task-${task.id}`}
          className={label({ color: task.status })}
        >
          <input
            type="checkbox"
            onChange={() => handleTaskState(task.id)}
            id={`task-${task.id}`}
            checked={task.status === "done"}
            className="absolute h-full w-full cursor-pointer opacity-0"
          />

          {task.status === "done" && <CheckedIcon />}
          {task.status === "in_progress" && (
            <LoaderIcon className="animate-spin" />
          )}
        </label>
        {task.title}
      </div>

      <div className="flex items-center gap-2">
        <Button color="ghost" onClick={() => deleteTask(task.id)}>
          <TrashIcon />
        </Button>

        <a href="#" title="Mais informações da tarefa">
          <TaskInfIcon />
        </a>
      </div>
    </div>
  );
};

export default TaskItem;

TaskItem.propTypes = {
  task: PropTypes.object,
  tasks: PropTypes.array,
  handleTasks: PropTypes.func,
};
