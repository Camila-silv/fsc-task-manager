import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";

import {
  AddIcon,
  CloudSunIcon,
  MoonIcon,
  SunIcon,
  TrashIcon,
} from "../assets/icons/index";
import {
  Button,
  Modal,
  SideBar,
  TaskItem,
  TaskSection,
} from "../components/index";

function Tasks() {
  const [showModal, setShowModal] = useState(false);

  const { reset } = useForm({
    defaultValues: {
      title: "",
      time: "morning",
      description: "",
    },
  });

  const { data: tasks } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "GET",
      });

      const tasks = await response.json();
      return tasks;
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

  const morningTasks = tasks?.filter((task) => task.time === "morning");
  const afternoonTasks = tasks?.filter((task) => task.time === "afternoon");
  const eveningTasks = tasks?.filter((task) => task.time === "evening");

  return (
    <>
      <div className="bg-brand-background mx-auto flex min-h-screen max-w-480">
        <SideBar />
        <main className="flex w-full flex-col gap-6 px-8.5 pt-17.5 pb-6">
          <header className="flex items-end justify-between gap-3">
            <div className="flex flex-col gap-1.5">
              <a
                href="#"
                title="Minhas Tarefas"
                className="text-brand-primary font-sans text-xs font-semibold"
              >
                Minhas Tarefas
              </a>
              <h2 className="text-brand-dark-blue text-xl font-semibold">
                Minhas Tarefas
              </h2>
            </div>

            <div className="flex gap-2.5">
              <Button color="ghost">
                Limpar tarefas <TrashIcon />
              </Button>

              <Button color="primary" onClick={() => setShowModal(true)}>
                Nova tarefa <AddIcon />
              </Button>
            </div>
          </header>

          <div className="flex flex-col gap-6 rounded-[10px] bg-white p-6">
            <TaskSection icon={<SunIcon />} title="Manhã">
              {morningTasks?.map((task) => {
                return <TaskItem task={task} key={task.id} tasks={tasks} />;
              })}
            </TaskSection>

            <TaskSection icon={<CloudSunIcon />} title="Tarde">
              {afternoonTasks?.map((task) => {
                return <TaskItem task={task} key={task.id} tasks={tasks} />;
              })}
            </TaskSection>

            <TaskSection icon={<MoonIcon />} title="Noite">
              {eveningTasks?.map((task) => {
                return <TaskItem task={task} key={task.id} tasks={tasks} />;
              })}
            </TaskSection>
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

export default Tasks;
