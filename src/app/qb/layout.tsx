import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { LogOutIcon, UserRound } from "lucide-react";
import Link from "next/link";

export default function QBLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-lg w-full z-10 top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-green-600">
                QB
              </Link>
            </div>
            <Menubar>
              <MenubarMenu>
                <MenubarTrigger className="cursor-pointer">
                  <UserRound />
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem className="hover:bg-gray-100">
                    Perfil
                  </MenubarItem>
                  <MenubarItem className="text-red-500 hover:bg-red-700 hover:text-white ">
                    Sair{" "}
                    <MenubarShortcut>
                      <LogOutIcon className="text-red-500 font-semibold " />
                    </MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </nav>

      {children}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">
            <a href="/faq" className="hover:underline">
              FAQ
            </a>{" "}
            |{" "}
            <a href="/contact" className="hover:underline">
              Fale conosco
            </a>{" "}
            |{" "}
            <a href="/" className="hover:underline">
              Sobre nós
            </a>
          </p>
          <p className="mt-4 text-xs">
            &copy; {new Date().getFullYear()} QB. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
