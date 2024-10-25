import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow-md py-4  px-5">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">QB</h1>
          <div className="flex gap-2 items-center">
            <Link legacyBehavior href={"/auth/login"}>
              <Button className="bg-green-500 hover:bg-green-700 text-white font-semibold">
                Login
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex-grow bg-gray-100 h-[400px] content-center">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-4">
            Melhore suas práticas para o vestibular
          </h2>
          <p className="text-lg mb-8">Aprendizado orientado a prática</p>
          <Button className="bg-green-500 hover:bg-green-700 text-white px-8 py-6 text-lg">
            Treinar já!
          </Button>
        </div>
      </section>

      <section id="products" className="py-16  px-2">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold mb-8 text-center">
            Nossos programas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-4 bg-white shadow-md">
              <h4 className="text-xl font-bold mb-2">Desafios diários</h4>
              <p className="mb-4">
                Tenha total compreensão sobre TODAS as matérias do edital
                através da prática.
              </p>
              <p className="text-lg font-semibold">A partir de R$99,90/mês</p>
              <Button className="mt-6 bg-green-500 text-white w-full py-6">
                Garantir!
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-blue-50 py-16  px-2">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-8">
            Por que escolher nosso programa?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="px-2 py-4">
              <h4 className="text-xl font-bold mb-2">Suporte 24h</h4>
              <p>
                Nossos especialistas estão dedicados para resolver qualquer
                problema.
              </p>
            </Card>
            <Card className="px-2 py-4">
              <h4 className="text-xl font-bold mb-2">
                Estude em qualquer horário
              </h4>
              <p>
                Oferecemos disponibilidade nos conteúdos para você estudar a
                hora que quiser.
              </p>
            </Card>
            <Card className="px-2 py-4">
              <h4 className="text-xl font-bold mb-2">Resultados comprovados</h4>
              <p>
                Mosso programa já ajudou tanto vestibulandos quanto pessoas que
                queriam apenas melhorar suas notas na escola.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16  px-2">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-8">
            O que pais e alunos dizem...
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-4 bg-white shadow-md">
              <p>
                &quot;Meu filho melhorou suas notas em matemática de 7 de média
                para 9! É incrível&quot;
              </p>
              <span className="block mt-2 text-sm font-semibold">
                - Maria P., Mãe
              </span>
            </Card>
            <Card className="p-4 bg-white shadow-md">
              <p>
                &quot;Tinha muita dificuldade em física e química mas depois de
                estudar 2h todos os dias minhas notas decolaram&rdquo;
              </p>
              <span className="block mt-2 text-sm font-semibold">
                - Josh M., Estudante do 2º ano
              </span>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-gray-100 py-16  px-2">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-3">Outros métodos</h3>
          <h4 className="mb-8 text-gray-500">
            Estude de um jeito menos digital{" "}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-4 bg-white shadow-md">
              <h4 className="text-xl font-bold mb-2">Apostilas de Exatas</h4>
              <p>
                Acesso a apostila de matemática, quimica e fisica do Ensino
                Médio
              </p>
              <p className="text-lg font-semibold mt-4">R$ 189,90</p>
              <Button className="mt-4 bg-green-500 text-white w-full px-8 py-6 font-semibold text-md">
                Comprar agora
              </Button>
            </Card>
            <Card className="p-4 bg-white shadow-md">
              <h4 className="text-xl font-bold mb-2">Apostila de Humanas</h4>
              <p>
                Acesso a apostila com questões de português, inglês, história,
                geografia do Ensino Médio
              </p>
              <p className="text-lg font-semibold mt-4">R$189,90</p>
              <Button className="mt-4 bg-green-500 text-white w-full px-8 py-6 font-semibold text-md">
                Compre agora
              </Button>
            </Card>
            <Card className="p-4 bg-white shadow-md">
              <h4 className="text-xl font-bold mb-2">Apostila completão</h4>
              <p>
                Acesso a apostila com questões de todas as matérias do ensino
                médio.
              </p>
              <p className="text-lg font-semibold mt-4">R$ 358,90</p>
              <Button className="mt-4 bg-green-500 text-white w-full px-8 py-6 font-semibold text-md">
                Compre agora
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-900 py-8 text-white">
        <div className="container mx-auto text-center">
          <p>© 2024 QB. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
