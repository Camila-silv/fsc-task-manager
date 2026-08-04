import { Link } from "react-router";

import { HomeIcon, OutIcon, TasksIcon } from "../assets/icons/index";
import { SidebarButton } from "../components";

const SideBar = () => {
  return (
    <aside className="w-min-72 bg-brand-white flex w-72 max-w-60 flex-col justify-between gap-6">
      <div>
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
              <SidebarButton to="/home" title="Início">
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
      </div>

      <Link
        to="/"
        title=""
        className="font-secondary text-brand-text-gray hover:bg-brand-primary/10 mx-2 mb-2 flex items-center gap-2 rounded-sm px-6 py-3 text-[14px] font-semibold transition delay-150 hover:text-[#002C2E]"
      >
        <OutIcon />
        <span>Sair</span>
      </Link>
    </aside>
  );
};

export default SideBar;
