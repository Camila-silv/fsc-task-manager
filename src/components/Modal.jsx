// import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";
import { v4 as uuid } from "uuid";

import { LoaderIcon } from "../assets/icons";
import {
  AlertMessage,
  Button,
  Input,
  Label,
  TimeSelect,
} from "../components/index";

const Modal = ({
  handleShowModal,
  handleTasks,
  isLoading,
  handleIsLoading,
}) => {
  const titleRef = useRef();
  const timeRef = useRef();
  const descriptionRef = useRef();

  const [errors, setErrors] = useState([]);

  const addTask = async (e) => {
    e.preventDefault();
    handleIsLoading(true);

    const newErrors = [];

    const title = titleRef.current.value;
    const time = timeRef.current.value;
    const description = descriptionRef.current.value;

    if (!title.trim()) {
      newErrors.push({
        inputName: "title",
        message: "Digite um titulo válido.",
      });
    }

    if (!time.trim()) {
      newErrors.push({
        inputName: "time",
        message: "Selecione um horário.",
      });
    }

    if (!description.trim()) {
      newErrors.push({
        inputName: "description",
        message: "Digite uma descrição válida.",
      });
    }

    setErrors(newErrors);

    if (newErrors.length > 0) {
      handleIsLoading(false);
      return;
    }

    const newTask = {
      id: uuid(),
      title,
      time,
      description,
      status: "not_started",
    };

    const response = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });

    if (!response.ok) {
      return toast.error(
        "Erro ao adicionar tarefa. Por favor, tente novamente."
      );
    }

    handleTasks((tasks) => {
      return [...tasks, newTask];
    });

    titleRef.current.value = "";
    descriptionRef.current.value = "";
    toast.success("Tarefa adicionada com sucesso.");
    handleIsLoading(false);
    handleShowModal(false);
  };

  const titleError = errors.find((error) => error.inputName === "title");
  const descriptionError = errors.find(
    (error) => error.inputName === "description"
  );
  const timeError = errors.find((error) => error.inputName === "time");

  return (
    <>
      {createPortal(
        <div className="fixed top-0 left-0 z-40 flex h-full w-full items-center justify-center bg-[#09090B1F]">
          <form
            className="flex w-full max-w-84 flex-col gap-4 rounded-xl bg-white p-5"
            onSubmit={addTask}
          >
            <div className="flex flex-col items-center gap-1">
              <h2 className="text-center text-[20px] font-semibold text-[#35383E]">
                Nova Tarefa
              </h2>

              <h3 className="text-center text-[14px] font-normal text-[#9A9C9F]">
                Insira as informações abaixo
              </h3>
            </div>

            <div className="flex flex-col gap-1">
              <Label name="title" title="Título" />
              <Input
                name="title"
                id="title"
                placeholder="Título da tarefa"
                ref={titleRef}
                disabled={isLoading}
              />
              {titleError && <AlertMessage>{titleError.message}</AlertMessage>}
            </div>

            <TimeSelect error={timeError} ref={timeRef} disabled={isLoading} />

            <div className="flex flex-col gap-1">
              <Label name="description" title="Descrição" />
              <Input
                name="description"
                id="description"
                placeholder="Descreva a tarefa"
                ref={descriptionRef}
                disabled={isLoading}
              />
              {descriptionError && (
                <AlertMessage>{descriptionError.message}</AlertMessage>
              )}
            </div>

            <div className="flex items-center gap-3">
              <Button
                color="secondary"
                size="large"
                className="w-full"
                onClick={() => handleShowModal(false)}
              >
                Cancelar
              </Button>

              <Button
                color="primary"
                size="large"
                className="w-full"
                type="submit"
                disabled={isLoading}
              >
                Salvar {isLoading && <LoaderIcon className="animate-spin" />}
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
  handleShowModal: PropTypes.func,
  handleTasks: PropTypes.func,
  handleIsLoading: PropTypes.func,
  isLoading: PropTypes.bool,
};
