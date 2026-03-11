import { AnimatePresence,motion } from "framer-motion";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";

import Button from "./Button";
import InputGroup from "./InputGroup";

const Modal = ({ handleShowModal, showModal }) => {
  return (
    <>
      {createPortal(
        <AnimatePresence>
          {showModal && (
            <motion.div
              className="fixed top-0 left-0 z-40 flex h-full w-full items-center justify-center bg-[#09090B1F]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.form
                className="flex w-full max-w-84 flex-col gap-4 rounded-xl bg-white p-5"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex flex-col items-center gap-1">
                  <h2 className="text-center text-[20px] font-semibold text-[#35383E]">
                    Nova Tarefa
                  </h2>

                  <h3 className="text-center text-[14px] font-normal text-[#9A9C9F]">
                    Insira as informações abaixo
                  </h3>
                </div>

                <InputGroup
                  title="Título"
                  name="name"
                  placeholder="Título da tarefa"
                />

                <div className="flex flex-col gap-1">
                  <label
                    htmlFor="time"
                    className="text-[14px] font-semibold text-[#35383E]"
                  >
                    Horário
                  </label>

                  <select
                    name="time"
                    id="time"
                    className="w-full rounded-lg border border-[#ECECEC] px-4 py-3 text-[14px] focus:outline-none"
                  >
                    <option value="">Selecione</option>
                    <option value="Manhã">Manhã</option>
                    <option value="Tarde">Tarde</option>
                    <option value="Noite">Noite</option>
                  </select>
                </div>

                <InputGroup
                  title="Descrição"
                  name="description"
                  placeholder="Descreva a tarefa"
                />

                <div className="flex items-center gap-3">
                  <Button
                    variant="secondary"
                    size="large"
                    className="w-full"
                    onClick={() => handleShowModal(false)}
                  >
                    Cancelar
                  </Button>

                  <Button variant="primary" size="large" className="w-full">
                    Salvar
                  </Button>
                </div>
              </motion.form>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

export default Modal;

Modal.propTypes = {
  handleShowModal: PropTypes.func,
  showModal: PropTypes.bool,
};
