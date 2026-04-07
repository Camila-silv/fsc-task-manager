import PropTypes from "prop-types";
import { useEffect, useState } from "react";
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
  AlertMessage,
  Button,
  Input,
  Label,
  SideBar,
  TimeSelect,
} from "../components";

const TaskDetailsPage = () => {
  const [task, setTask] = useState("");
  const { taskId } = useParams();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors, isSubmitting },
    reset,
    handleSubmit,
  } = useForm();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`http://localhost:3000/tasks/${taskId}`);
        if (!response.ok) {
          return toast.error("Algo deu errado.");
        }

        const result = await response.json();

        setTask(result);
        reset({
          title: result.title,
          time: result.time,
          description: result.description,
        });
      } catch (error) {
        console.log(`Algo deu errado, segue o erro em questão: `.error);
      }
    };

    fetchTask();
  }, [taskId, reset]);

  const changeTask = async (data) => {
    const title = data.title.trim();
    const time = data.time.trim();
    const description = data.description.trim();

    fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        time,
        description,
      }),
    });

    toast.success("Tarefa alterada com sucesso.");
  };

  const deleteTask = async () => {
    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      return toast.error("Erro ao deletar tarefa. Por favor, tente novamente.");
    }

    toast.success("Tarefa deletada com sucesso.");
    navigate(-1);
  };

  return (
    <div className="bg-brand-background mx-auto flex max-w-480">
      <SideBar />
      <main className="flex w-full flex-col gap-6 px-8.5 pt-17.5">
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
                {task.title}
              </span>
            </div>
            <h2 className="text-brand-dark-blue text-xl font-semibold">
              {task.title}
            </h2>
          </div>

          <Button color="danger" onClick={deleteTask}>
            <TrashIcon /> Deletar tarefa{" "}
            {isSubmitting && <LoaderIcon className="animate-spin" />}
          </Button>
        </header>
        <div className="w-full rounded-[10px] bg-[#FFFFFF] p-6">
          <form
            className="flex w-full flex-col gap-6"
            onSubmit={handleSubmit(changeTask)}
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

            <div className="flex flex-col gap-1">
              <Label name="description" title="Descrição" />

              <textarea
                name="description"
                id="description"
                placeholder="Descreva a tarefa"
                disabled={isSubmitting}
                className="block h-46 w-full resize-none rounded-lg border border-[#ECECEC] px-4 py-3 text-[14px] placeholder:text-[14px] placeholder:font-normal placeholder:text-[#9A9C9F] focus:outline-none"
                {...register("description", {
                  required: "A descrição é obrigatória.",
                  validate: (value) => {
                    if (!value.trim()) {
                      return "A descrição não pode ser vázia.";
                    }

                    return true;
                  },
                })}
              ></textarea>
              {errors?.description?.message && (
                <AlertMessage>{errors?.description?.message}</AlertMessage>
              )}
            </div>

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
