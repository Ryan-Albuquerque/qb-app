"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";

type FormValues = {
  document: string; // CPF
  password: string; // Password
};

// CPF validation pattern for Brazilian document number (only numbers)
const cpfPattern = /^\d{11}$/; // Only 11 digits

export default function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  // Function that runs on form submit
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Logging in with:", data);
    // Proceed with login logic, such as an API call
    router.push("/qb");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <Card className="max-w-md w-full bg-white p-6 shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Document (CPF) Input */}
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
              maxLength={11} // Only 11 digits allowed
              {...register("document", {
                required: "CPF é obrigatório",
                pattern: {
                  value: cpfPattern,
                  message: "CPF com formato inválido",
                },
              })}
              className={`w-full px-4 py-2 border ${
                errors.document ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:border-blue-500`}
              placeholder="Insira seu CPF"
            />
            {errors.document && (
              <p className="text-red-500 text-sm mt-2">
                {errors.document.message}
              </p>
            )}
          </div>

          {/* Password Input */}
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
                required: "Senha é obrigatória",
              })}
              className={`w-full px-4 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:border-blue-500`}
              placeholder="Insira sua senha"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-2">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="bg-green-600 hover:bg-green-900 text-white font-semibold w-full py-2 rounded-md"
          >
            Login
          </Button>
        </form>

        {/* Additional Links */}
        <div className="mt-4 flex justify-between items-center">
          <Link
            href="/auth/forgot-password"
            className="text-sm text-green-400 hover:underline hover:text-green-400"
          >
            Esqueci minha senha
          </Link>
          <Link href="/auth/register">
            <Button className="bg-green-400 hover:bg-green-700 text-white font-semibold py-2 rounded-md">
              Criar conta nova
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
