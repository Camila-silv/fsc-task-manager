import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  AddIcon,
  GlassWaterIcon,
  LoaderIcon,
  Tasks2Icon,
  TasksIcon,
  TrashIcon,
} from "../assets/icons";
import { Button, Card, TaskItem } from "../components";
import { useDeleteTask } from "../hook/data/use-delete-task";
import { useGetTasks } from "../hook/data/use-get-tasks";
import { Modal, SideBar } from "../layouts";

function Home() {
  const [showModal, setShowModal] = useState(false);
  const { data: tasks } = useGetTasks();

  const { reset } = useForm({
    defaultValues: {
      title: "",
      time: "morning",
      description: "",
    },
  });

  const handleCancelClick = () => {
    reset({
      title: "",
      time: "morning",
      description: "",
    });
    setShowModal(false);
  };

  const { mutate: deleteTask } = useDeleteTask();

  const handleDeletedTasks = () => {
    tasks.forEach((task) => {
      deleteTask(task.id);
    });
  };

  const completedTasks = tasks?.filter((task) => task.status === "done");
  const tasksProgress = tasks?.filter((task) => task.status === "in_progress");

  return (
    <>
      <div className="bg-brand-background mx-auto flex min-h-screen max-w-480">
        <SideBar />
        <main className="flex w-full flex-col gap-6 px-8.5 pt-17.5 pb-6">
          <header className="flex items-end justify-between gap-3">
            <div className="flex flex-col gap-1.5">
              <a
                href="/"
                title="Início"
                className="text-brand-primary font-sans text-xs font-semibold"
              >
                Início
              </a>
              <h2 className="text-brand-dark-blue text-xl font-semibold">
                Início
              </h2>
            </div>

            <div className="flex gap-2.5">
              <Button color="ghost" onClick={handleDeletedTasks}>
                Limpar tarefas <TrashIcon />
              </Button>

              <Button color="primary" onClick={() => setShowModal(true)}>
                Nova tarefa <AddIcon />
              </Button>
            </div>
          </header>
          <div className="grid grid-cols-1 gap-8.5 lg:grid-cols-4">
            <Card number={tasks?.length} title="Tarefas disponíveis">
              <Tasks2Icon className="text-brand-primary h-6 w-6 shrink" />
            </Card>

            <Card number={completedTasks?.length} title="Tarefas concluídas">
              <TasksIcon className="text-brand-primary h-6 w-6 shrink" />
            </Card>

            <Card number={tasksProgress?.length} title="Tarefas em andamento">
              <LoaderIcon className="text-brand-primary h-6 w-6 shrink" />
            </Card>

            <Card number="..." title="Água">
              <GlassWaterIcon className="text-brand-primary h-6 w-6 shrink" />
            </Card>
          </div>
          <div className="grid h-full grid-cols-1 gap-8 lg:grid-cols-5">
            <div className="bg-brand-white flex flex-col gap-6 rounded-[10px] p-6 lg:col-span-3">
              <header>
                <h2 className="text-brand-dark-blue font-sans text-[20px] font-semibold">
                  Tarefas
                </h2>
                <p className="text-brand-text-gray font-sans text-[14px] font-normal">
                  Resumo das tarefas disponíveis
                </p>
              </header>

              <div className="flex h-full flex-col gap-3">
                {tasks?.map((task) => {
                  return <TaskItem task={task} key={task.id} />;
                })}
              </div>
            </div>

            <div className="bg-brand-white flex flex-col gap-6 rounded-[10px] p-6 lg:col-span-2">
              <header>
                <h2 className="text-brand-dark-blue font-sans text-[20px] font-semibold">
                  Água
                </h2>
                <p className="text-brand-text-gray font-sans text-[14px] font-normal">
                  Beba sua meta diária de água
                </p>
              </header>
            </div>
          </div>
        </main>
      </div>

      {showModal && (
        <Modal
          setShowModal={setShowModal}
          handleCancelClick={handleCancelClick}
        />
      )}
    </>
  );
}

export default Home;
