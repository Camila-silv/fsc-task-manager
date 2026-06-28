import { useState } from "react";
import { useForm } from "react-hook-form";

import { AddIcon, TrashIcon } from "../assets/icons";
import { Button } from "../components";
import { Modal, SideBar } from "../layouts";

function Home() {
  const [showModal, setShowModal] = useState(false);

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
              <Button color="ghost">
                Limpar tarefas <TrashIcon />
              </Button>

              <Button color="primary" onClick={() => setShowModal(true)}>
                Nova tarefa <AddIcon />
              </Button>
            </div>
          </header>
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
