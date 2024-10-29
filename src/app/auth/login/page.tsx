"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { callLoginService } from "@/lib/services/auth";
import { useToast } from "@/hooks/use-toast";

const cpfPattern = /^\d{11}$/;

export default function Login() {
  const { toast } = useToast();
  const formSchema = z.object({
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
  });
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      document: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log("Start login calls");
    const response = await callLoginService(data);
    if (response.error) {
      console.error(response.error);
      return toast({
        variant: "destructive",
        title: response.error,
        duration: 5000,
      });
    }

    toast({
      title: "Login realizado com sucesso",
      variant: "success",
      duration: 5000,
    });
    router.push("/qb");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <Card className="max-w-md w-full bg-white p-6 shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <Form {...form}>
          <form
            className="flex gap-6 flex-col"
            onSubmit={form.handleSubmit(onSubmit)}
          >
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
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-900 text-white font-semibold w-full py-3 rounded-md"
            >
              Login
            </Button>
          </form>
        </Form>

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
