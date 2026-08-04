import { Link } from "react-router";

import { TasksIcon } from "../assets/icons/index";
import { InputGroup } from "../components";

const ForgotPassword = () => {
  return (
    <>
      <div className="flex flex-col items-start justify-between gap-6 bg-[linear-gradient(160deg,#008188_0%,#00adb5_60%,#3fc4cb_100%)] px-14 py-12">
        <h1 className="flex items-center gap-[9.6px]">
          <span className="text-brand-white flex h-7.5 w-7.5 shrink items-center justify-center rounded-lg bg-[rgba(255,255,255,0.2)]">
            <TasksIcon className="h-4.5" />
          </span>
          <span className="text-brand-white font-sans text-[18px] font-bold whitespace-nowrap">
            Task Manager
          </span>
        </h1>

        <div>
          <h2 className="text-brand-white font-sans text-[32px] leading-10 font-semibold">
            Acontece com todo
            <br />
            mundo
          </h2>
          <p className="mt-[0.9rem] mb-[1.2rem] font-sans text-[15px] leading-6 font-normal text-[rgba(255,255,255,0.85)]">
            Informe seu e-mail e enviaremos um link seguro
            <br />
            para você criar uma nova senha.
          </p>
          <div className="flex flex-col gap-4.5">
            <div className="text-brand-dark-blue flex w-full max-w-70 -rotate-3 items-center gap-[0.65rem] rounded-[10px] bg-[rgba(255,255,255,0.97)] px-[0.85rem] py-4 text-[0.85rem] font-semibold">
              <span className="bg-brand-primary flex h-4.75 w-4.75 items-center justify-center rounded-[5px]">
                <svg className="h-2.75 w-2.75" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M2 6l2.5 2.5L10 3"
                    stroke="white"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </span>
              <span>Ler</span>
            </div>

            <div className="text-brand-dark-blue relative left-11.75 flex w-full max-w-70 rotate-3 items-center gap-[0.65rem] rounded-[10px] bg-[rgba(255,255,255,0.97)] px-[0.85rem] py-4 text-[0.85rem] font-semibold">
              <span className="bg-brand-process flex h-4.75 w-4.75 items-center justify-center rounded-[5px]">
                <svg className="h-2.75 w-2.75" viewBox="0 0 12 12" fill="none">
                  <circle cx="6" cy="6" r="3" fill="white"></circle>
                </svg>
              </span>
              <span>Estudar pelo menos 30min</span>
            </div>

            <div className="text-brand-dark-blue relative left-3.75 flex w-full max-w-70 -rotate-3 items-center gap-[0.65rem] rounded-[10px] bg-[rgba(255,255,255,0.97)] px-[0.85rem] py-4 text-[0.85rem] font-semibold">
              <span className="border-brand-border flex h-4.75 w-4.75 items-center justify-center rounded-[5px] border bg-transparent"></span>
              <span>Trabalhar focado</span>
            </div>
          </div>
        </div>

        <p className="font-sans text-[13px] font-normal text-[rgba(255,255,255,0.7)]">
          © 2026 Task Manager. Todos os direitos reservados.
        </p>
      </div>
      <div className="p-10">
        <div className="flex h-full w-full max-w-95 flex-col justify-center lg:mx-auto">
          <span className="text-brand-primary mb-2 text-[12.8px] font-bold tracking-[0.96px] uppercase">
            Recuperação de senha
          </span>
          <h2 className="text-brand-dark-blue mb-[0.4rem] text-[1.4rem] font-semibold">
            Esqueceu sua senha?
          </h2>
          <p className="text-brand-text-gray mb-[1.8rem] text-[0.88rem] leading-normal">
            Sem problema. Digite o e-mail associado à sua
            <br />
            conta.
          </p>
          <form action="">
            <InputGroup
              label="mail"
              title="E-mail"
              type="email"
              placeholder="exemplo@email.com"
            />

            <input
              type="submit"
              value="Enviar link de recuperação"
              className="bg-brand-primary w-full cursor-pointer rounded-[10px] border-[none] p-[0.85rem] text-[0.95rem] font-bold text-white [transition:background_0.15s_ease] hover:bg-[#008188]"
            />
          </form>

          <span className="text-brand-text-gray mt-[1.6rem] text-center text-[0.85rem]">
            Lembrou a senha?
            <Link
              to="/"
              title="Fazer login"
              className="ml-0.5 cursor-pointer font-bold text-[#008188] no-underline hover:underline"
            >
              Voltar para o login
            </Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
