import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
import {
  Button,
  Input,
  Label,
  SideBar,
  TextArea,
  TimeSelect,
} from "../components";

const TaskDetailsPage = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const { data: task } = useQuery({
    queryKey: ["task", taskId],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "GET",
      });

      const getTask = await response.json();
      return getTask;
    },
  });

  const { mutate: deleteTask } = useMutation({
    mutationKey: ["deleteTask"],
    mutationFn: async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error();
      }
    },
  });

  const { mutate: updateTask } = useMutation({
    mutationKey: ["updateTask", taskId],
    mutationFn: async (data) => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: data?.title?.trim(),
          description: data?.description?.trim(),
          time: data?.time,
        }),
      });

      if (!response.ok) {
        throw new Error();
      }

      return response.json();
    },
  });

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
        queryClient.setQueryData(["task", taskId], data);
        toast.success("Tarefa alterada com sucesso.");
      },
      onError: () => toast.error("Ocorreu um erro ao alterar a tarefa."),
    });
  };

  const handleClickDeleteTask = async () => {
    deleteTask([undefined], {
      onSuccess: () => {
        queryClient.setQueryData(["tasks"], (currentTasks) => {
          return currentTasks.filter(
            (currentTask) => currentTask.id !== taskId
          );
        });
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
