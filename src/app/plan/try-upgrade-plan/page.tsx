// src/app/trial-or-master-user/page.tsx
"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function TryUpgradePlan() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <Card className="max-w-md w-full bg-white p-6 shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Bem-vindo!</h2>
        <p className="mb-4 text-center">
          Parabéns por se registrar! Deseja continuar como usuário limitado ou
          fazer upgrade?
        </p>

        <div className="flex flex-col space-y-4">
          {/* Button to continue as a trial user */}
          <Link href="/qb" className="w-full">
            <Button className="hover:bg-green-700 hover:text-white text-black bg-transparent py-2 rounded-md w-full">
              Continuar como limitado
            </Button>
          </Link>

          {/* Button to upgrade to a master user */}
          <Link href="/plan/payment" className="w-full">
            <Button className="bg-green-500 hover:bg-green-700 text-white py-2 rounded-md w-full">
              Fazer upgrade para usuário premium!
            </Button>
          </Link>

          {/* Link to products section */}
          <Link
            href="/#products"
            className="w-full text-center underline text-green-400"
          >
            Veja os produtos
          </Link>
        </div>
      </Card>
    </div>
  );
}
