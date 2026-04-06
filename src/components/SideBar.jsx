import { HomeIcon, TasksIcon } from "../assets/icons/index";

const SideBar = () => {
  return (
    <aside className="w-min-72 bg-brand-white h-screen w-72">
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
            <a
              href="#"
              title="Início"
              className="font-secondary text-brand-dark-blue hover:text-brand-primary flex items-center gap-2 rounded-[10px] bg-transparent px-6 py-3 text-sm font-semibold transition delay-150 duration-300 ease-in-out hover:bg-[#E6F7F8]"
            >
              <HomeIcon /> Início
            </a>
          </li>
          <li>
            <a
              href="#"
              title="Minhas Tarefas"
              className="font-secondary text-brand-primary hover:text-brand-primary flex items-center gap-2 rounded-[10px] bg-[#E6F7F8] px-6 py-3 text-sm font-semibold transition delay-150 duration-300 ease-in-out hover:bg-[#E6F7F8]"
            >
              <TasksIcon /> Minhas Tarefas
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
