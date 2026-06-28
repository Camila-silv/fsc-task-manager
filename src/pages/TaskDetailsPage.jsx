import PropTypes from "prop-types";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "sonner";

import {
  ArrowLeftIcon,
  ChevronRightIcon,
  LoaderIcon,
  TrashIcon,
} from "../assets/icons";
import { Button, Input, Label, TextArea, TimeSelect } from "../components";
import { useDeleteTask } from "../hook/data/use-delete-task";
import { useGetTask } from "../hook/data/use-get-task";
import { useUpdateTask } from "../hook/data/use-update-task";
import { SideBar } from "../layouts";

const TaskDetailsPage = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const { data: task } = useGetTask(taskId);

  const { mutate: deleteTask } = useDeleteTask(taskId);

  const { mutate: updateTask } = useUpdateTask(taskId);

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    if (task) {
      reset(task);
    }
  }, [task, reset]);

  const handleClickChangeTask = async (data) => {
    updateTask(data, {
      onSuccess: () => {
        toast.success("Tarefa alterada com sucesso.");
      },
      onError: () => toast.error("Ocorreu um erro ao alterar a tarefa."),
    });
  };

  const handleClickDeleteTask = async () => {
    deleteTask(undefined, {
      onSuccess: () => {
        toast.success("Tarefa deletada com sucesso.");
        navigate(-1);
      },
      onError: () => toast.error("Ocorreu um erro ao deletar a tarefa."),
    });
  };

  return (
    <div className="bg-brand-background mx-auto flex min-h-screen max-w-480">
      <SideBar />
      <main className="flex w-full flex-col gap-6 px-8.5 pt-17.5 pb-6">
        <header className="flex items-end justify-between gap-3">
          <div className="flex flex-col gap-1.5">
            <Link
              to="/"
              title="Home"
              className="bg-brand-primary mb-1.5 flex h-7 w-7 items-center justify-center rounded-full p-1"
            >
              <ArrowLeftIcon />
            </Link>
            <div className="flex items-center gap-1">
              <Link
                to="/"
                title="Minhas Tarefas"
                className="text-brand-text-gray font-sans text-[12px] font-normal"
              >
                Minhas Tarefas
              </Link>
              <ChevronRightIcon />
              <span className="text-brand-primary text-[12px] font-semibold">
                {task?.title}
              </span>
            </div>
            <h2 className="text-brand-dark-blue text-xl font-semibold">
              {task?.title}
            </h2>
          </div>

          <Button color="danger" onClick={handleClickDeleteTask}>
            <TrashIcon /> Deletar tarefa{" "}
            {isSubmitting && <LoaderIcon className="animate-spin" />}
          </Button>
        </header>
        <div className="w-full rounded-[10px] bg-[#FFFFFF] p-6">
          <form
            className="flex w-full flex-col gap-6"
            onSubmit={handleSubmit(handleClickChangeTask)}
          >
            <Input
              name="title"
              id="title"
              placeholder="Título da tarefa"
              disabled={isSubmitting}
              {...register("title", {
                required: "O título é obrigatório.",
                validate: (value) => {
                  if (!value.trim()) {
                    return "O título não pode ser vázio.";
                  }

                  return true;
                },
              })}
              error={errors?.title?.message}
            >
              <Label name="title" title="Título" />
            </Input>

            <TimeSelect
              error={errors?.time?.message}
              disabled={isSubmitting}
              {...register("time", {
                required: "Selecione um período",
                validate: (value) => {
                  if (!value.trim()) {
                    return "Escolha um período.";
                  }

                  return true;
                },
              })}
            />

            <TextArea
              name="description"
              id="description"
              placeholder="Descreva a tarefa"
              disabled={isSubmitting}
              {...register("description", {
                required: "A descrição é obrigatória.",
                validate: (value) => {
                  if (!value.trim()) {
                    return "A descrição não pode ser vázia.";
                  }

                  return true;
                },
              })}
              error={errors?.description?.message}
            >
              <Label name="description" title="Descrição" />
            </TextArea>

            <div className="flex justify-end gap-2.5">
              <Button
                color="primary"
                size="large"
                type="submit"
                disabled={isSubmitting}
              >
                Salvar {isSubmitting && <LoaderIcon className="animate-spin" />}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default TaskDetailsPage;

TaskDetailsPage.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
};
