// src/app/payment/page.tsx
"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type PaymentValues = {
  plan: string; // Campo adicionado para o plano do produto
  installments: number; // Campo adicionado para o número de parcelas
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
};

// Define planos usando Record para melhor segurança de tipo
const plans: Record<string, number> = {
  mensal: 10, // Preço do Plano Mensal
  "3-meses": 25, // Preço do Plano de 3 Meses
  "6-meses": 45, // Preço do Plano de 6 Meses
  "1-ano": 80, // Preço do Plano Anual
};

// Limites de parcelamento por plano
const installmentsLimits: Record<string, number> = {
  "3-meses": 3, // 1-3 Parcelas para Plano de 3 Meses
  "6-meses": 6, // 1-6 Parcelas para Plano de 6 Meses
  "1-ano": 12, // 1-12 Parcelas para Plano Anual
};

export default function Payment() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PaymentValues>();

  const [selectedPlanPrice, setSelectedPlanPrice] = useState<number>(0); // Estado para o preço do plano selecionado
  const [, setInstallments] = useState<number | null>(null); // Estado para as parcelas

  const onSubmit: SubmitHandler<PaymentValues> = (data) => {
    console.log("Processando pagamento:", data);
    // Aqui você lidaria com a lógica de pagamento (por exemplo, chamada API)

    router.push("/qb");
  };

  // Monitorar a seleção do plano para atualizar o preço dinamicamente
  const plan = watch("plan");
  const selectedInstallments = watch("installments");

  // Atualiza o preço e o número de parcelas sempre que o plano selecionado muda
  useEffect(() => {
    if (plan && plans[plan]) {
      setSelectedPlanPrice(plans[plan]);
      setInstallments(null); // Redefinir parcelas ao mudar de plano
    } else {
      setSelectedPlanPrice(0); // Redefinir preço se nenhum plano válido for selecionado
      setInstallments(null); // Redefinir parcelas
    }
  }, [plan]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <Card className="max-w-md w-full bg-white p-6 shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Detalhes do Pagamento
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Seleção do Plano do Produto */}
          <div className="mb-4">
            <label
              htmlFor="plan"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Selecione um Plano
            </label>
            <select
              id="plan"
              {...register("plan", {
                required: "Por favor, selecione um plano",
              })}
              className={`w-full px-4 py-2 border ${
                errors.plan ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:border-blue-500`}
            >
              <option value="">--Selecione o Plano--</option>
              <option value="mensal">Plano Mensal - $10</option>
              <option value="3-meses">Plano de 3 Meses - $25</option>
              <option value="6-meses">Plano de 6 Meses - $45</option>
              <option value="1-ano">Plano Anual - $80</option>
            </select>
            {errors.plan && (
              <p className="text-red-500 text-sm mt-2">{errors.plan.message}</p>
            )}
          </div>

          {/* Campo para Número do Cartão */}
          <div className="mb-4">
            <label
              htmlFor="cardNumber"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Número do Cartão
            </label>
            <input
              type="text"
              id="cardNumber"
              {...register("cardNumber", {
                required: "O número do cartão é obrigatório",
              })}
              className={`w-full px-4 py-2 border ${
                errors.cardNumber ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:border-blue-500`}
              placeholder="Digite o número do seu cartão"
            />
            {errors.cardNumber && (
              <p className="text-red-500 text-sm mt-2">
                {errors.cardNumber.message}
              </p>
            )}
          </div>

          {/* Campo para Nome do Titular do Cartão */}
          <div className="mb-4">
            <label
              htmlFor="cardHolder"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Nome do Titular do Cartão
            </label>
            <input
              type="text"
              id="cardHolder"
              {...register("cardHolder", {
                required: "O nome do titular do cartão é obrigatório",
              })}
              className={`w-full px-4 py-2 border ${
                errors.cardHolder ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:border-blue-500`}
              placeholder="Digite o nome do titular do cartão"
            />
            {errors.cardHolder && (
              <p className="text-red-500 text-sm mt-2">
                {errors.cardHolder.message}
              </p>
            )}
          </div>

          {/* Campo para Data de Validade */}
          <div className="mb-4">
            <label
              htmlFor="expiryDate"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Data de Validade (MM/AA)
            </label>
            <input
              type="text"
              id="expiryDate"
              {...register("expiryDate", {
                required: "A data de validade é obrigatória",
              })}
              className={`w-full px-4 py-2 border ${
                errors.expiryDate ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:border-blue-500`}
              placeholder="MM/AA"
            />
            {errors.expiryDate && (
              <p className="text-red-500 text-sm mt-2">
                {errors.expiryDate.message}
              </p>
            )}
          </div>

          {/* Campo para CVV */}
          <div className="mb-4">
            <label
              htmlFor="cvv"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              CVV
            </label>
            <input
              type="text"
              id="cvv"
              {...register("cvv", { required: "O CVV é obrigatório" })}
              className={`w-full px-4 py-2 border ${
                errors.cvv ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:border-blue-500`}
              placeholder="Digite o CVV"
            />
            {errors.cvv && (
              <p className="text-red-500 text-sm mt-2">{errors.cvv.message}</p>
            )}
          </div>

          {/* Campo de Parcelamento */}
          {plan && plan !== "mensal" && (
            <div className="mb-4">
              <label
                htmlFor="installments"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Número de Parcelas
              </label>
              <select
                id="installments"
                {...register("installments", {
                  required: "Por favor, selecione o número de parcelas",
                })}
                className={`w-full px-4 py-2 border ${
                  errors.installments ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:border-blue-500`}
              >
                <option value="">--Selecione Parcelas--</option>
                {Array.from({ length: installmentsLimits[plan] }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} {i + 1 === 1 ? "parcela" : "parcelas"}
                  </option>
                ))}
              </select>
              {errors.installments && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.installments.message}
                </p>
              )}
            </div>
          )}

          {/* Exibição do Preço do Plano Selecionado */}
          {plan && (
            <div className="mt-4 p-4 bg-gray-100 rounded-md border border-gray-300">
              <h3 className="text-lg font-semibold">Resumo da Cobrança</h3>
              <p className="text-gray-700">
                Plano Selecionado:{" "}
                <span className="font-bold">{plan.replace("-", " ")}</span>
              </p>
              {selectedInstallments && (
                <>
                  <p className="text-gray-700">
                    Parcelas:{" "}
                    <span className="font-bold">
                      {selectedInstallments} parcela(s) de $
                      {(selectedPlanPrice / selectedInstallments).toFixed(2)}
                    </span>
                  </p>
                </>
              )}
              <p className="text-gray-700 mt-4">
                Preço Total:{" "}
                <span className="font-bold">${selectedPlanPrice}</span>
              </p>
            </div>
          )}

          {/* Botão de Enviar */}
          <Button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white w-full py-2 rounded-md mt-6"
          >
            Pagar Agora
          </Button>
        </form>
      </Card>
    </div>
  );
}
