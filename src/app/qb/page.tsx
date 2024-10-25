// src/app/home/page.tsx
"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CardCarousel } from "@/components/ui/carousel";

export default function HomePage() {
  const router = useRouter();
  return (
    <>
      <CardCarousel />

      {/* Get Started Button Section */}
      <section className="mt-12 w-full text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Pronto para melhorar sua nota da escola ou do vestibular?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Comece resolvendo questões e monitore seu progresso!
          </p>
          <Button
            className="bg-green-500 hover:bg-green-700 text-white p-6 rounded-lg text-lg"
            onClick={() => {
              router.push("/qb/choice-category");
            }}
          >
            Começar agora
          </Button>
        </div>
      </section>

      {/* Last Sessions of Resolution Questions Section */}
      <section className="mt-16 w-full">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Ultimas sessões de respostas
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Example Session Cards */}
            <Card className="bg-white p-6 shadow-lg rounded-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Session 1: Math Practice
              </h3>
              <p className="text-gray-600 mb-4">Completed on Oct 10, 2024</p>
              <Button
                onClick={() => router.push("/qb/last-solved")}
                className="bg-green-400 hover:bg-green-600 text-white p-4 w-full"
              >
                Resume Session
              </Button>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
