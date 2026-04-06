import { useEffect, useState } from "react";
import { toast } from "sonner";

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
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:3000/tasks");
        if (!response.ok) {
          return toast.error("Algo deu errado.");
        }

        const result = await response.json();
        setTasks(result);
      } catch (error) {
        console.log(`Algo deu errado, segue o erro em questão: `.error);
      }
    };

    fetchTasks();
  }, []);

  const morningTasks = tasks?.filter((task) => task.time === "morning");
  const afternoonTasks = tasks?.filter((task) => task.time === "afternoon");
  const eveningTasks = tasks?.filter((task) => task.time === "evening");

  return (
    <>
      <div className="bg-brand-background mx-auto flex max-w-480">
        <SideBar />
        <main className="flex w-full flex-col gap-6 px-8.5 pt-17.5">
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
              {morningTasks.map((task) => {
                return (
                  <TaskItem
                    task={task}
                    key={task.id}
                    handleTasks={setTasks}
                    tasks={tasks}
                  />
                );
              })}
            </TaskSection>

            <TaskSection icon={<CloudSunIcon />} title="Tarde">
              {afternoonTasks.map((task) => {
                return (
                  <TaskItem
                    task={task}
                    key={task.id}
                    handleTasks={setTasks}
                    tasks={tasks}
                  />
                );
              })}
            </TaskSection>

            <TaskSection icon={<MoonIcon />} title="Noite">
              {eveningTasks.map((task) => {
                return (
                  <TaskItem
                    task={task}
                    key={task.id}
                    handleTasks={setTasks}
                    tasks={tasks}
                  />
                );
              })}
            </TaskSection>
          </div>
        </main>
      </div>

      {showModal && (
        <Modal
          handleShowModal={setShowModal}
          handleTasks={setTasks}
          isLoading={isLoading}
          handleIsLoading={setIsLoading}
        />
      )}
    </>
  );
}

export default Tasks;
