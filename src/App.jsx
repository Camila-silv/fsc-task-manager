import { useEffect, useState } from "react";

import AddTaskIcon from "../src/assets/icons/add-task.svg?react";
import CloudSunIcon from "../src/assets/icons/cloud-sun.svg?react";
import MoonIcon from "../src/assets/icons/moon.svg?react";
import SunIcon from "../src/assets/icons/sun.svg?react";
import TrashIcon from "../src/assets/icons/trash.svg?react";
import Button from "./components/Button";
import SideBar from "./components/SideBar";
import TaskItem from "./components/TaskItem";
import TaskSection from "./components/TaskSection";

function App() {
  const [morningTasks, setMorningTasks] = useState([]);
  const [afternoonTasks, setAfternoonTasks] = useState([]);
  const [eveningTasks, setEveningTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:3000/tasks");
        if (!response.ok) {
          return console.log("Algo deu errado.");
        }

        const result = await response.json();

        setMorningTasks(result.filter((task) => task.time === "morning"));
        setAfternoonTasks(result.filter((task) => task.time === "afternoon"));
        setEveningTasks(result.filter((task) => task.time === "evening"));
      } catch (error) {
        console.log(`Algo deu errado, segue o erro em questão: `.error);
      } finally {
        console.log("eh isto.");
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="mx-auto flex max-w-480 bg-[#f8f8f8]">
      <SideBar />
      <main className="flex w-full flex-col gap-6 px-8.5 pt-17.5">
        <header className="flex items-end justify-between gap-3">
          <div className="flex flex-col gap-1.5">
            <a
              href=";"
              title="Minhas Tarefas"
              className="font-sans text-xs font-semibold text-[#00ADB5]"
            >
              Minhas Tarefas
            </a>
            <h2 className="text-xl font-semibold text-[#35383E]">
              Minhas Tarefas
            </h2>
          </div>

          <div className="flex gap-2.5">
            <Button variant="ghost">
              Limpar tarefas <TrashIcon />
            </Button>

            <Button variant="primary">
              Nova tarefa <AddTaskIcon />
            </Button>
          </div>
        </header>

        <div className="flex flex-col gap-6 rounded-[10px] bg-white p-6">
          <TaskSection icon={<SunIcon />} title="Manhã">
            {morningTasks.map((task) => {
              return <TaskItem task={task} key={task.id} />;
            })}
          </TaskSection>

          <TaskSection icon={<CloudSunIcon />} title="Tarde">
            {afternoonTasks.map((task) => {
              return <TaskItem task={task} key={task.id} />;
            })}
          </TaskSection>

          <TaskSection icon={<MoonIcon />} title="Noite">
            {eveningTasks.map((task) => {
              return <TaskItem task={task} key={task.id} />;
            })}
          </TaskSection>
        </div>
      </main>
    </div>
  );
}

export default App;
