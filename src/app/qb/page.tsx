// src/app/home/page.tsx
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CardCarousel } from "@/components/ui/carousel";

export default function HomePage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-lg w-full z-10 top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-blue-600">
                SAT Solver
              </Link>
            </div>
            <div className="hidden md:flex space-x-4">
              <Link href="/" className="text-gray-800 hover:text-blue-600">
                Home
              </Link>
              <Link
                href="/features"
                className="text-gray-800 hover:text-blue-600"
              >
                Features
              </Link>
              <Link
                href="/pricing"
                className="text-gray-800 hover:text-blue-600"
              >
                Pricing
              </Link>
              <Link
                href="/contact"
                className="text-gray-800 hover:text-blue-600"
              >
                Contact
              </Link>
            </div>
            {/* Mobile Menu */}
            <div className="md:hidden">
              <button className="text-gray-800 focus:outline-none">Menu</button>
            </div>
          </div>
        </div>
      </nav>

      <CardCarousel />

      {/* Get Started Button Section */}
      <section className="mt-12 w-full text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Ready to Improve Your SAT Score?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Get started with solving SAT questions and track your progress!
          </p>
          <Button
            className="bg-green-500 hover:bg-green-700 text-white py-3 px-6 rounded-lg text-lg"
            onClick={() => {
              router.push("/qb/choice-category");
            }}
          >
            Get Started Now
          </Button>
        </div>
      </section>

      {/* Last Sessions of Resolution Questions Section */}
      <section className="mt-8 w-full">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Last Sessions of Resolution
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Example Session Cards */}
            <Card className="bg-white p-6 shadow-lg rounded-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Session 1: Math Practice
              </h3>
              <p className="text-gray-600 mb-4">Completed on Oct 10, 2024</p>
              <Button className="bg-blue-500 text-white py-2 w-full">
                Resume Session
              </Button>
            </Card>

            <Card className="bg-white p-6 shadow-lg rounded-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Session 2: Verbal Practice
              </h3>
              <p className="text-gray-600 mb-4">Completed on Oct 12, 2024</p>
              <Button className="bg-blue-500 text-white py-2 w-full">
                Resume Session
              </Button>
            </Card>

            <Card className="bg-white p-6 shadow-lg rounded-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Session 3: Full Test Practice
              </h3>
              <p className="text-gray-600 mb-4">Completed on Oct 14, 2024</p>
              <Button className="bg-blue-500 text-white py-2 w-full">
                Resume Session
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">
            <a href="/faq" className="hover:underline">
              FAQ
            </a>{" "}
            |{" "}
            <a href="/contact" className="hover:underline">
              Contact Us
            </a>{" "}
            |{" "}
            <a href="/about" className="hover:underline">
              About Us
            </a>
          </p>
          <p className="mt-4 text-xs">
            &copy; {new Date().getFullYear()} SAT Solver. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
