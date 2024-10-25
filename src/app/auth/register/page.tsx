"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

type FormValues = {
  document: string; // CPF
  name: string; // Nome
  email: string; // Email
  phone: string; // Número de telefone
  password: string; // Senha
  confirmPassword: string; // Confirmar Senha
};

// Padrão de validação para CPF (apenas números)
const cpfPattern = /^\d{11}$/; // Apenas 11 dígitos

// Padrão de validação de email
const emailPattern = /^\S+@\S+\.\S+$/;

// Padrão de validação de telefone (formato brasileiro)
const phonePattern = /^\d{10,11}$/; // 10 ou 11 dígitos

export default function Register() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FormValues>();

  // Função que é executada ao enviar o formulário
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Registrando com:", data);
    // Prosseguir com a lógica de registro, como uma chamada de API
    router.push("/plan/try-upgrade-plan");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <Card className="max-w-md w-full bg-white p-6 shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Registrar</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Campo de Documento (CPF) */}
          <div className="mb-4">
            <label
              htmlFor="document"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              CPF
            </label>
            <input
              type="text"
              id="document"
              maxLength={11} // Apenas 11 dígitos permitidos
              {...register("document", {
                required: "O CPF é obrigatório",
                pattern: {
                  value: cpfPattern,
                  message: "Formato de CPF inválido. Use 11 dígitos.",
                },
              })}
              className={`w-full px-4 py-2 border ${
                errors.document ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:border-blue-500`}
              placeholder="Digite seu CPF"
            />
            {errors.document && (
              <p className="text-red-500 text-sm mt-2">
                {errors.document.message}
              </p>
            )}
          </div>

          {/* Campo de Nome */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Nome
            </label>
            <input
              type="text"
              id="name"
              {...register("name", { required: "O nome é obrigatório" })}
              className={`w-full px-4 py-2 border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:border-blue-500`}
              placeholder="Digite seu nome"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-2">{errors.name.message}</p>
            )}
          </div>

          {/* Campo de Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "O email é obrigatório",
                pattern: {
                  value: emailPattern,
                  message: "Formato de email inválido",
                },
              })}
              className={`w-full px-4 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:border-blue-500`}
              placeholder="Digite seu email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-2">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Campo de Telefone */}
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Telefone
            </label>
            <input
              type="text"
              id="phone"
              maxLength={11} // Comprimento máximo para número de telefone brasileiro
              {...register("phone", {
                required: "O número de telefone é obrigatório",
                pattern: {
                  value: phonePattern,
                  message:
                    "Formato de telefone inválido. Use 10 ou 11 dígitos.",
                },
              })}
              className={`w-full px-4 py-2 border ${
                errors.phone ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:border-blue-500`}
              placeholder="Digite seu número de telefone"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-2">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Campo de Senha */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Senha
            </label>
            <input
              type="password"
              id="password"
              {...register("password", {
                required: "A senha é obrigatória",
                minLength: {
                  value: 8,
                  message: "A senha deve ter pelo menos 8 caracteres",
                },
              })}
              className={`w-full px-4 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:border-blue-500`}
              placeholder="Digite sua senha"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-2">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Campo de Confirmar Senha */}
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Confirmar Senha
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...register("confirmPassword", {
                required: "Por favor, confirme sua senha",
                validate: (value) => {
                  const { password } = getValues(); // Acessar o valor do campo senha
                  return value === password || "As senhas não correspondem";
                },
              })}
              className={`w-full px-4 py-2 border ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:border-blue-500`}
              placeholder="Confirme sua senha"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-2">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {/* Botão de Enviar */}
          <Button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white w-full py-2 rounded-md"
          >
            Registrar
          </Button>
        </form>

        {/* Links Adicionais */}
        <div className="mt-4 text-center">
          <Link
            href="/auth/login"
            className="text-sm text-green-500 hover:underline"
          >
            Já tem uma conta? Fazer login
          </Link>
        </div>
      </Card>
    </div>
  );
}
