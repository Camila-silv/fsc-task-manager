// import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

import Button from "./Button";
import InputGroup from "./InputGroup";
import TimeSelect from "./TimeSelect";

const Modal = ({ handleShowModal, handleTasks }) => {
  const titleRef = useRef();
  const timeRef = useRef();
  const descriptionRef = useRef();

  const [errors, setErrors] = useState([]);

  const addTask = () => {
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

    if (newErrors.length > 0) return;

    const newTask = {
      id: uuidv4(),
      title,
      time,
      description,
      status: "not_started",
    };

    handleTasks((tasks) => {
      return [...tasks, newTask];
    });

    handleShowModal(false);
    titleRef.current.value = "";
    descriptionRef.current.value = "";
    toast.success("Tarefa adicionada");
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
          <form className="flex w-full max-w-84 flex-col gap-4 rounded-xl bg-white p-5">
            <div className="flex flex-col items-center gap-1">
              <h2 className="text-center text-[20px] font-semibold text-[#35383E]">
                Nova Tarefa
              </h2>

              <h3 className="text-center text-[14px] font-normal text-[#9A9C9F]">
                Insira as informações abaixo
              </h3>
            </div>

            <InputGroup
              title="Título"
              name="title"
              placeholder="Título da tarefa"
              error={titleError}
              ref={titleRef}
            />

            <TimeSelect error={timeError} ref={timeRef} />

            <InputGroup
              title="Descrição"
              name="description"
              placeholder="Descreva a tarefa"
              error={descriptionError}
              ref={descriptionRef}
            />

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
                onClick={addTask}
              >
                Salvar
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
};
