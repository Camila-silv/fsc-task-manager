// import { AnimatePresence, motion } from "framer-motion";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { v4 as uuid } from "uuid";

import { LoaderIcon } from "../assets/icons";
import { Button, Input, Label, TimeSelect } from "../components/index";

const Modal = ({ handleCancelClick, setShowModal }) => {
  const queryClient = useQueryClient();
  const { mutate: addTask } = useMutation({
    mutationKey: "addTask",
    mutationFn: async (data) => {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        body: JSON.stringify({
          id: uuid(),
          title: data.title.trim(),
          time: data.time.trim(),
          description: data.description.trim(),
          status: "not_started",
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
  } = useForm({
    defaultValues: {
      title: "",
      time: "morning",
      description: "",
    },
  });

  const handleClickAddTask = async (data) => {
    addTask(
      {
        id: uuid(),
        title: data.title.trim(),
        time: data.time.trim(),
        description: data.description.trim(),
        status: "not_started",
      },
      {
        onSuccess: () => {
          queryClient.setQueryData("tasks", (currentTasks) => {
            return [
              ...currentTasks,
              {
                id: uuid(),
                title: data.title.trim(),
                time: data.time.trim(),
                description: data.description.trim(),
                status: "not_started",
              },
            ];
          });
          toast.success("Tarefa adicionada com sucesso.");
          setShowModal(false);
          reset({
            title: "",
            time: "morning",
            description: "",
          });
        },
        onError: () => toast.error("Erro ao adicionar tarefa."),
      }
    );
  };

  return (
    <>
      {createPortal(
        <div className="fixed top-0 left-0 z-40 flex h-full w-full items-center justify-center bg-[#09090B1F]">
          <form
            className="flex w-full max-w-84 flex-col gap-4 rounded-xl bg-white p-5"
            onSubmit={handleSubmit(handleClickAddTask)}
          >
            <div className="flex flex-col items-center gap-1">
              <h2 className="text-brand-dark-blue text-center text-[20px] font-semibold">
                Nova Tarefa
              </h2>

              <h3 className="text-brand-text-gray] text-center text-[14px] font-normal">
                Insira as informações abaixo
              </h3>
            </div>

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
              error={errors?.title?.message}
              disabled={isSubmitting}
              {...register("time", {
                required: "O período é obrigatório.",
                validate: (value) => {
                  if (!value.trim()) {
                    return "Selecione um período.";
                  }

                  return true;
                },
              })}
            />

            <Input
              name="description"
              id="description"
              placeholder="Descreva a tarefa"
              disabled={isSubmitting}
              {...register("description", {
                required: "A descrição é obrigatório.",
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
            </Input>

            <div className="flex items-center gap-3">
              <Button
                color="secondary"
                size="large"
                className="w-full"
                onClick={handleCancelClick}
              >
                Cancelar
              </Button>

              <Button
                color="primary"
                size="large"
                className="w-full"
                type="submit"
                disabled={isSubmitting}
              >
                Salvar {isSubmitting && <LoaderIcon className="animate-spin" />}
              </Button>
            </div>
          </form>
        </div>,
        document.body
      )}
    </>
  );
};

export default Modal;

Modal.propTypes = {
  handleCancelClick: PropTypes.func,
  setShowModal: PropTypes.bool,
};
