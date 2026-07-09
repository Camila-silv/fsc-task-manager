import PropTypes from "prop-types";
import { Link } from "react-router";
import { toast } from "sonner";
import { tv } from "tailwind-variants";

import {
  CheckIcon,
  DetailsIcon,
  LoaderIcon,
  TrashIcon,
} from "../assets/icons/index";
import { Button } from "../components/index";
import { useDeleteTask } from "../hook/data/use-delete-task";
import { useUpdateTask } from "../hook/data/use-update-task";

const TaskItem = ({ task }) => {
  const { mutate: updateTask } = useUpdateTask(task.id);

  const { mutate: deleteTask } = useDeleteTask();

  const getNewStatus = () => {
    if (task.status === "not_started") {
      return "in_progress";
    }
    if (task.status === "in_progress") {
      return "done";
    }
    return "not_started";
  };

  const handleTaskCheckboxClick = async () => {
    updateTask(
      {
        status: getNewStatus(),
      },
      {
        onSuccess: () => {
          toast.success("Tarefa atualizada com sucesso.");
        },
        onError: () => toast.error("Ocorreu um erro ao atualizar a tarefa."),
      }
    );
  };

  const handleClickDeleteTask = async () => {
    deleteTask(task.id, {
      onSuccess: () => {
        toast.success("Tarefa deletada com sucesso.");
      },
      onError: () => toast.error("Ocorreu um erro ao deletar a tarefa."),
    });
  };

  const taskItem = tv({
    base: "flex items-center justify-between gap-6 rounded-[10px] px-4 py-3 text-[14px] font-normal",
    variants: {
      color: {
        done: "bg-brand-primary/10 text-[#002C2E]",
        in_progress: "bg-brand-process/10 text-[#724c00]",
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
        in_progress: "bg-brand-process",
        not_started: "bg-[#D9D9D9]",
      },
    },
    defaultVariants: {
      color: "not_started",
    },
  });

  return (
    <div className={taskItem({ color: task.status })}>
      <div className="flex items-center gap-3">
        <label
          htmlFor={`task-${task.id}`}
          className={label({ color: task.status })}
        >
          <input
            type="checkbox"
            onChange={handleTaskCheckboxClick}
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

      <div className="flex items-center gap-2">
        <Button color="ghost" onClick={() => handleClickDeleteTask(task.id)}>
          <TrashIcon />
        </Button>

        <Link title="Mais informações da tarefa" to={`/tasks/${task.id}`}>
          <DetailsIcon />
        </Link>
      </div>
    </div>
  );
};

export default TaskItem;

TaskItem.propTypes = {
  task: PropTypes.object,
};
