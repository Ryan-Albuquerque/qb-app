"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { callRegisterService } from "@/lib/services/auth";

const cpfPattern = /^\d{11}$/;

const phonePattern = /^\d{10,11}$/;

export default function Register() {
  const router = useRouter();
  const { toast } = useToast();
  const formSchema = z
    .object({
      document: z
        .string({ required_error: "CPF é obrigatório" })
        .max(11, {
          message: "Valor máximo permitido é de 11 números",
        })
        .regex(cpfPattern, {
          message: "CPF deve ser válido e informado apenas números",
        }),
      password: z
        .string({
          required_error: "Senha é obrigatória",
        })
        .min(8, {
          message: "Senha deve ser ter no mínimo 8 caracteres",
        }),
      confirmPassword: z.string({
        required_error: "Confirmação de Senha é obrigatória",
      }),
      phone: z
        .string({
          required_error: "Telefone é obrigatório",
        })
        .regex(phonePattern, {
          message: "Telefone deve ser no formato válido",
        }),
      email: z
        .string({
          required_error: "Email é obrigatório",
        })
        .email({
          message: "Email deve ser válido",
        }),
      name: z
        .string({
          required_error: "Nome é obrigatório",
        })
        .min(2, {
          message: "Deve ter mais de dois caracteres",
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      path: ["confirmPassword"],
      message: "As senhas devem ser iguais",
    });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      confirmPassword: "",
      document: "",
      email: "",
      name: "",
      password: "",
      phone: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log("Start register calls");
    const response = await callRegisterService(data);
    if (response.error) {
      console.error(response.error);
      return toast({
        variant: "destructive",
        title: response.error,
        duration: 5000,
      });
    }

    toast({
      title: "Cadastro realizado com sucesso",
      variant: "success",
      duration: 5000,
    });
    router.push("/plan/try-upgrade-plan");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <Card className="max-w-md w-full bg-white p-6 shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Registrar</h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Insira seu Nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="document"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Documento (CPF)</FormLabel>
                  <FormControl>
                    <Input
                      maxLength={11}
                      placeholder="Insira seu CPF"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Insira seu email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input
                      maxLength={11}
                      placeholder="Insira seu telefone"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Insira sua senha"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirme sua Senha</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Insira sua confirmação de senha"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white w-full py-2 rounded-md"
            >
              Registrar
            </Button>
          </form>
        </Form>

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
