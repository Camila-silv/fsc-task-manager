import { HomeIcon, TasksIcon } from "../assets/icons/index";
import { SidebarButton } from "../components";

const SideBar = () => {
  return (
    <aside className="w-min-72 bg-brand-white w-72 max-w-60">
      <div className="flex flex-col gap-4 px-8 py-6">
        <h1 className="text-brand-primary text-xl font-semibold">
          Task Manager
        </h1>
        <p className="text-xs font-normal text-[#09090B]">
          Um simples{" "}
          <span className="text-brand-primary font-semibold">
            organizador de tarefas
          </span>
        </p>
      </div>
      <nav className="p-2">
        <ul className="flex flex-col gap-2">
          <li>
            <SidebarButton to="/" title="Início">
              <HomeIcon /> Início
            </SidebarButton>
          </li>
          <li>
            <SidebarButton to="/tasks" title="Minhas Tarefas">
              <TasksIcon /> Minhas Tarefas
            </SidebarButton>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
