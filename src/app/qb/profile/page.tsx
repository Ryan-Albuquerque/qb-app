"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function QBProfilePage() {
  const router = useRouter();
  const { toast } = useToast();
  const wplan = "anual";
  const [plan, setPlan] = useState<string>();
  const [firstSure, setFirstSure] = useState<boolean>(false);
  const [isDifferentPlan, setDifferentPlan] = useState<boolean>(false);

  const handleChangePassword = async () => {
    console.log("Start change password calls");
    // const response = await callRecoveryPasswordService("");
    // if (response.error) {
    //   console.error(response.error);
    //   return toast({
    //     variant: "destructive",
    //     title: response.error,
    //     duration: 5000,
    //   });
    // }

    toast({
      title: "Verifique seu email",
      variant: "success",
      duration: 5000,
    });
  };
  return (
    <>
      <div className="mx-auto md:my-14 my-8 md:w-[80%] w-[90%] flex flex-col gap-5">
        <div className="mt-5 font-semibold text-2xl">
          <h2>Olá, Ryan</h2>
        </div>

        <Card className="p-4 flex flex-col gap-4">
          <div className="flex flex-row justify-between">
            <h3 className="text-xl font-semibold">Informações básicas</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button size={"sm"} className="bg-blue-500 hover:bg-blue-700">
                  Editar informações
                </Button>
              </DialogTrigger>
              <DialogContent aria-describedby="" className="md:w-[90%] w-[70%]">
                <DialogTitle></DialogTitle>
                <div className="flex flex-col gap-3">
                  <Label className="font-semibold">Nome completo</Label>
                  <Input
                    type="text"
                    placeholder="Insira nome completo"
                    required
                    defaultValue={"ryan"}
                  ></Input>
                </div>
                <div className="flex flex-col gap-3">
                  <Label className="font-semibold">Email</Label>
                  <Input
                    type="text"
                    placeholder="Insira email"
                    required
                  ></Input>
                </div>
                <div className="flex flex-col gap-3">
                  <Label className="font-semibold">Telefone</Label>
                  <Input
                    type="text"
                    placeholder="Insira telefone"
                    required
                  ></Input>
                </div>
                <Button className="bg-green-500 hover:bg-green-700 font-semibold text-md">
                  {" "}
                  Salvar{" "}
                </Button>
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="font-semibold text-md"> Nome completo </h4>
            <p className="text-muted-foreground">Ryan da Silva Albuquerque</p>
          </div>
          <div>
            <h4 className="font-semibold">Email </h4>
            <p className="text-muted-foreground">Ryan da Silva Albuquerque</p>
          </div>
          <div>
            <h4 className="font-semibold">Telefone </h4>
            <p className="text-muted-foreground">92984551334</p>
          </div>
        </Card>

        <Card className="p-4 flex flex-col gap-4">
          <div className="flex flex-row justify-between">
            <h3 className="text-xl font-semibold">Plano</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button size={"sm"} className="bg-blue-500 hover:bg-blue-700">
                  Editar plano
                </Button>
              </DialogTrigger>
              <DialogContent aria-describedby="" className="md:w-[90%] w-[70%]">
                <DialogTitle></DialogTitle>
                <div className="flex flex-col gap-3">
                  <Label className="font-semibold">
                    Selecione o plano desejado
                  </Label>
                  <Select
                    defaultValue={wplan}
                    onValueChange={(e) => {
                      setPlan(e);
                      return e !== wplan && e !== "free"
                        ? setDifferentPlan(true)
                        : setDifferentPlan(false);
                    }}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Selecione um plano" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Planos</SelectLabel>
                        <SelectItem value="mensal">Mensal</SelectItem>
                        <SelectItem value="semestral">Semestral</SelectItem>
                        <SelectItem value="anual">Anual</SelectItem>
                        <SelectItem value="free">Usuário Free</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                {isDifferentPlan && (
                  <div className="flex flex-col gap-3">
                    {!firstSure && plan !== wplan && plan !== "free" && (
                      <Button
                        className="bg-yellow-500 hover:bg-yellow-700 font-semibold text-md"
                        onClick={() => setFirstSure(true)}
                      >
                        {" "}
                        Tem certeza?{" "}
                      </Button>
                    )}
                    {firstSure && (
                      <Button
                        className="bg-green-500 hover:bg-green-700 font-semibold text-md"
                        onClick={() => router.push("/plan/payment")}
                      >
                        {" "}
                        Confirmar{" "}
                      </Button>
                    )}
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>
          <div>
            <h4 className=" text-md">
              Seu plano atual é o <span className="font-semibold">mensal</span>{" "}
              com vencimento no próximo dia{" "}
              <span className="font-semibold">03/04/2024</span>{" "}
            </h4>
          </div>
        </Card>

        <Card className="p-4 flex flex-col gap-4">
          <div className="flex flex-row justify-between">
            <h3 className="text-xl font-semibold">Segurança</h3>
          </div>
          <div>
            <Button
              className="bg-white hover:bg-red-700 text-black hover:text-white font-semibold shadow-md"
              onClick={handleChangePassword}
            >
              Mudar Senha
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
}
