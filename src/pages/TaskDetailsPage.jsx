import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
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
  const titleRef = useRef();
  const timeRef = useRef();
  const descriptionRef = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");

  const { taskId } = useParams();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`http://localhost:3000/tasks/${taskId}`);
        if (!response.ok) {
          return toast.error("Algo deu errado.");
        }

        const result = await response.json();

        titleRef.current.value = result.title;
        timeRef.current.value = result.time;
        descriptionRef.current.value = result.description;

        setTitle(result.title);
      } catch (error) {
        console.log(`Algo deu errado, segue o erro em questão: `.error);
      }
    };

    fetchTask();
  }, [taskId]);

  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const changeTask = async (e) => {
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
    setIsLoading(false);
  };

  const titleError = errors.find((error) => error.inputName === "title");
  const descriptionError = errors.find(
    (error) => error.inputName === "description"
  );
  const timeError = errors.find((error) => error.inputName === "time");

  const redirect = () => {
    navigate(-1);
  };

  const deleteTask = async () => {
    setIsLoading(true);

    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      return toast.error("Erro ao deletar tarefa. Por favor, tente novamente.");
    }

    toast.success("Tarefa deletada com sucesso.");
    navigate(-1);

    setIsLoading(false);
  };

  return (
    <div className="mx-auto flex max-w-480 bg-[#f8f8f8]">
      <SideBar />
      <main className="flex w-full flex-col gap-6 px-8.5 pt-17.5">
        <header className="flex items-end justify-between gap-3">
          <div className="flex flex-col gap-1.5">
            <Link
              onClick={redirect}
              title="Home"
              className="mb-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-[#00ADB5] p-1"
            >
              <ArrowLeftIcon />
            </Link>
            <div className="flex items-center gap-1">
              <Link
                to="/"
                title="Minhas Tarefas"
                className="font-sans text-[12px] font-normal text-[#9A9C9F]"
              >
                Minhas Tarefas
              </Link>
              <ChevronRightIcon />
              <span className="text-[12px] font-semibold text-[#00ADB5]">
                {title}
              </span>
            </div>
            <h2 className="text-xl font-semibold text-[#35383E]">{title}</h2>
          </div>

          <Button color="danger" onClick={deleteTask}>
            <TrashIcon /> Deletar tarefa{" "}
            {isLoading && <LoaderIcon className="animate-spin" />}
          </Button>
        </header>
        <div className="w-full rounded-[10px] bg-[#FFFFFF] p-6">
          <form className="flex w-full flex-col gap-6" onSubmit={changeTask}>
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

              <textarea
                name="description"
                id="description"
                placeholder="Descreva a tarefa"
                ref={descriptionRef}
                disabled={isLoading}
                className="block h-46 w-full resize-none rounded-lg border border-[#ECECEC] px-4 py-3 text-[14px] placeholder:text-[14px] placeholder:font-normal placeholder:text-[#9A9C9F] focus:outline-none"
              ></textarea>
              {descriptionError && (
                <AlertMessage>{descriptionError.message}</AlertMessage>
              )}
            </div>

            <div className="flex justify-end gap-2.5">
              <Button color="secondary" size="large">
                Cancelar
              </Button>
              <Button
                color="primary"
                size="large"
                type="submit"
                disabled={isLoading}
              >
                Salvar {isLoading && <LoaderIcon className="animate-spin" />}
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
