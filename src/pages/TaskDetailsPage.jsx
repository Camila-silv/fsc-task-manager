import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { toast } from "sonner";

import { ArrowLeftIcon,ChevronRightIcon, TrashIcon } from "../assets/icons";
import {
  AlertMessage,
  Button,
  Input,
  Label,
  SideBar,
  TimeSelect,
} from "../components";

const TaskDetailsPage = () => {
  const titleRef = useRef();
  const timeRef = useRef();
  const descriptionRef = useRef();
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState([]);

  const addTask = async (e) => {
    e.preventDefault();
    setIsLoading(true);

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
      setIsLoading(false);
      return;
    }

    toast.success("Tarefa alterada com sucesso.");
    setIsLoading(false);
  };

  const titleError = errors.find((error) => error.inputName === "title");
  const descriptionError = errors.find(
    (error) => error.inputName === "description"
  );
  const timeError = errors.find((error) => error.inputName === "time");

  return (
    <div className="mx-auto flex max-w-480 bg-[#f8f8f8]">
      <SideBar />
      <main className="flex w-full flex-col gap-6 px-8.5 pt-17.5">
        <header className="flex items-end justify-between gap-3">
          <div className="flex flex-col gap-1.5">
            <a
              href="/"
              title="Home"
              className="mb-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-[#00ADB5] p-1"
            >
              <ArrowLeftIcon />
            </a>
            <div className="flex items-center gap-1">
              <a
                href="#"
                title="Minhas Tarefas"
                className="font-sans text-[12px] font-normal text-[#9A9C9F]"
              >
                Minhas Tarefas
              </a>
              <ChevronRightIcon />
              <span className="text-[12px] font-semibold text-[#00ADB5]">
                Ir para academia
              </span>
            </div>
            <h2 className="text-xl font-semibold text-[#35383E]">
              Ir para academia
            </h2>
          </div>

          <Button color="danger">
            <TrashIcon /> Deletar tarefa
          </Button>
        </header>
        <form
          className="flex w-full flex-col gap-6 rounded-[10px] bg-[#FFFFFF] p-6"
          onSubmit={addTask}
        >
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
              className="h-46"
            />
            {descriptionError && (
              <AlertMessage>{descriptionError.message}</AlertMessage>
            )}
          </div>
        </form>
        <div className="flex justify-end gap-2.5">
          <Button color="secondary" size="large">
            Cancelar
          </Button>
          <Button color="primary" size="large">
            Salvar
          </Button>
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
