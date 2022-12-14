import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, ref, string } from "yup";

import { NavBar } from "./NavBar";
import { Menu } from "./Menu";
import { api } from "../data/api";

import { GiArchiveRegister } from "react-icons/gi";

const schema = object({
  name: string()
    .required("Campo obrigatório")
    .min(3, "Nome deve conter 3 letras ou mais"),
  username: string().required("Campo obrigatório"),
  email: string().required("Campo obrigatório"),
  password: string()
    .required("Campo obrigatório")
    .min(8, "A senha deve ter no minimo 8 caracteres"),
  confirmPassword: string()
    .required("Campo obrigatório")
    .oneOf([ref("password"), null], "As senhas devem ser iguais"),
});

export const RegisterUsers = () => {
  const desc = "Register users";
  const color = '#22C55E'

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleClickSubimit = async (data: any) => {
    const post = await api.postUsers({
      name: data.name,
      username: data.username,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <>
      <section className="flex ">
        <Menu />
        <div className="w-full">
          <NavBar color={color} desc={desc} />
          <div className="flex  justify-center items-center h-screen bg-grayBG w-full p-12">
            <div className="flex bg-white w-2/6 flex-col items-center  rounded-md p-6">
              
                <div className="mb-6">
                  <div className="flex justify-center items-center flex-col gap-3">
                    <GiArchiveRegister size={60} className="text-green-500" />
                    <h1 className="font-bold text-2xl">Registre um usuário</h1>
                  </div>
                </div>

                <form
                  className="flex flex-col w-4/5 "
                  onSubmit={handleSubmit(handleClickSubimit)}
                >
                  <>
                    <label className=" ">Nome Completo</label>
                    <input
                      type="text"
                      className="border rounded-md drop-shadow h-8 focus:outline-none mb-3 "
                      {...register("name")}
                    />
                    <span className="text-red-500 my-1 text-xs">
                      <>{errors?.name?.message}</>
                    </span>
                  </>
                  <>
                    <label>Nome de usuário</label>
                    <input
                      type="text"
                      className="border rounded-md drop-shadow h-8 focus:outline-none mb-3"
                      {...register("username")}
                    />
                    <span className="text-red-500 my-1 text-xs">
                      <>{errors?.username?.message}</>
                    </span>
                  </>
                  <>
                    <label>Email</label>
                    <input
                      type="email"
                      autoComplete="current-email"
                      className="border rounded-md drop-shadow h-8 focus:outline-none mb-3"
                      {...register("email")}
                    />
                    <span className="text-red-500 my-1 text-xs">
                      <>{errors?.email?.message}</>
                    </span>
                  </>
                  <>
                    <label>Senha</label>
                    <input
                      type="password"
                      {...register("password")}
                      autoComplete="current-password"
                      className="border rounded-md drop-shadow h-8 focus:outline-none mb-3"
                    />
                    <span className="text-red-500 my-1 text-xs">
                      <>{errors?.password?.message}</>
                    </span>
                  </>
                  <>
                    <label>Confirme a senha</label>
                    <input
                      type="password"
                      autoComplete="current-password"
                      className="border rounded-md drop-shadow h-8 focus:outline-none mb-6"
                      {...register("confirmPassword")}
                    />
                    <span className="text-red-500 my-1 text-xs">
                      <>{errors?.confirmPassword?.message}</>
                    </span>
                  </>
                  <div className="flex justify-center items-center">
                    <button
                      type="submit"
                      className=" border text-white text-xl rounded-md drop-shadow bg-green-500 hover:bg-green-300 w-4/5 p-2"
                    >
                      Cadastrar
                    </button>
                  </div>
                </form>
              
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
