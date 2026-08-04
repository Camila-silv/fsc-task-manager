import { Link } from "react-router";

import { TasksIcon } from "../assets/icons/index";
import { InputGroup } from "../components";

const Register = () => {
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
            Seu primeiro passo
            <br />
            para dias mais <br />
            produtivos
          </h2>
          <p className="mt-[0.9rem] mb-[1.2rem] font-sans text-[15px] leading-6 font-normal text-[rgba(255,255,255,0.85)]">
            Crie sua conta gratuita e comece a organizar
            <br />
            tarefas, metas de água e hábitos hoje mesmo.
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
              <span>Momento devocional</span>
            </div>

            <div className="text-brand-dark-blue relative left-11.75 flex w-full max-w-70 rotate-3 items-center gap-[0.65rem] rounded-[10px] bg-[rgba(255,255,255,0.97)] px-[0.85rem] py-4 text-[0.85rem] font-semibold">
              <span className="bg-brand-process flex h-4.75 w-4.75 items-center justify-center rounded-[5px]">
                <svg className="h-2.75 w-2.75" viewBox="0 0 12 12" fill="none">
                  <circle cx="6" cy="6" r="3" fill="white"></circle>
                </svg>
              </span>
              <span>Trabalhar focado</span>
            </div>

            <div className="text-brand-dark-blue relative left-3.75 flex w-full max-w-70 -rotate-3 items-center gap-[0.65rem] rounded-[10px] bg-[rgba(255,255,255,0.97)] px-[0.85rem] py-4 text-[0.85rem] font-semibold">
              <span className="border-brand-border flex h-4.75 w-4.75 items-center justify-center rounded-[5px] border bg-transparent"></span>
              <span>Ler</span>
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
            Começar agora
          </span>
          <h2 className="text-brand-dark-blue mb-[0.4rem] text-[1.4rem] font-semibold">
            Criar sua conta
          </h2>
          <p className="text-brand-text-gray mb-[1.8rem] text-[0.88rem] leading-normal">
            Leva menos de um minuto. Sem cartão de crédito.
          </p>
          <form action="">
            <InputGroup
              label="name"
              title="Nome completo"
              type="text"
              placeholder="Como podemos te chamar?"
            />
            <InputGroup
              label="email"
              title="E-mail"
              type="email"
              placeholder="exemplo@mail.com"
            />

            <InputGroup
              label="password"
              title="Senha"
              type="password"
              placeholder="••••••••"
            />
            <InputGroup
              label="password"
              title="Confirmar senha"
              type="password"
              placeholder="••••••••"
            />

            <div className="mb-[1.4rem] flex items-center justify-between gap-1.5">
              <label
                htmlFor="rememberme"
                className="text-brand-text-gray flex items-center gap-2 text-[0.85rem] font-medium"
              >
                <input type="checkbox" id="rememberme" name="rememberme" />
                <span>
                  Aceito os{" "}
                  <a
                    href="http://"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-brand-primary cursor-pointer font-bold no-underline"
                  >
                    termos de uso
                  </a>
                </span>
              </label>
            </div>
            <input
              type="submit"
              value="Criar conta"
              className="bg-brand-primary w-full cursor-pointer rounded-[10px] border-[none] p-[0.85rem] text-[0.95rem] font-bold text-white [transition:background_0.15s_ease] hover:bg-[#008188]"
            />
          </form>
          <div className="text-brand-text-gray after:bg-brand-border before:bg-brand-border mx-0 my-6 mt-6 mb-6 flex items-center justify-center gap-[0.8rem] text-[0.78rem] font-medium before:h-px before:flex-1 before:content-[''] after:h-px after:flex-1 after:content-['']">
            ou continue com
          </div>
          <a
            href="#"
            title="Cadastrar com Google"
            className="border-brand-border hover:border-brand-primary flex w-full cursor-pointer items-center justify-center gap-[0.6rem] rounded-[10px] border-[1.5px] bg-white p-3 text-[0.88rem] font-bold [transition:border-color_0.15s_ease,background_0.15s_ease] hover:bg-[#00acb526]"
          >
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path
                fill="#4285F4"
                d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.9c1.7-1.57 2.7-3.87 2.7-6.62z"
              ></path>
              <path
                fill="#34A853"
                d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.84.86-3.06.86-2.35 0-4.34-1.59-5.05-3.72H.98v2.33A9 9 0 0 0 9 18z"
              ></path>
              <path
                fill="#FBBC05"
                d="M3.95 10.7a5.4 5.4 0 0 1 0-3.4V4.97H.98a9 9 0 0 0 0 8.06l2.97-2.33z"
              ></path>
              <path
                fill="#EA4335"
                d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.9 11.43 0 9 0A9 9 0 0 0 .98 4.97L3.95 7.3C4.66 5.17 6.65 3.58 9 3.58z"
              ></path>
            </svg>
            Cadastrar com Google
          </a>
          <span className="text-brand-text-gray mt-[1.6rem] text-center text-[0.85rem]">
            Já tem uma conta?
            <Link
              to="/"
              title="Entrar com a sua conta"
              className="ml-1 cursor-pointer font-bold text-[#008188] no-underline hover:underline"
            >
              Entrar
            </Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default Register;
