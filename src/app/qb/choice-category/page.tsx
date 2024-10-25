"use client";
import React, { useEffect, useState } from "react";
import { NestedCheckbox } from "@/components/custom/choiceCategory";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const subjectData: Record<string, unknown> = {
  Science: {
    Physics: {
      "Quantum Mechanics": {
        "Quantum Field Theory": false,
        "String Theory": false,
      },
      "Classical Mechanics": false,
    },
    Chemistry: {
      "Organic Chemistry": false,
      "Inorganic Chemistry": false,
    },
    Biology: false,
  },
  Math: {
    Algebra: false,
    Geometry: false,
    Calculus: false,
  },
  Humanities: {
    History: {
      "World History": false,
      "American History": false,
    },
    Literature: false,
    Philosophy: false,
  },
};

// Definindo anos e dificuldades para os filtros
const availableYears = [
  new Date().getFullYear() - 2,
  new Date().getFullYear() - 1,
  new Date().getFullYear(),
];
const difficulties = ["Fácil", "Médio", "Difícil"];

export default function Categories() {
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedYears, setSelectedYears] = useState<number[]>([]); // Pré-selecionando os últimos 3 anos
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>(
    []
  ); // Pré-selecionando "Médio"

  useEffect(() => {
    console.log("Itens selecionados em categorias:", selectedSubjects);
    console.log("Anos selecionados:", selectedYears);
    console.log("Dificuldades selecionadas:", selectedDifficulties);
  }, [selectedSubjects, selectedYears, selectedDifficulties]);

  const toggleYearSelection = (year: number) => {
    setSelectedYears((prev) =>
      prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]
    );
  };

  const toggleDifficultySelection = (difficulty: string) => {
    setSelectedDifficulties((prev) =>
      prev.includes(difficulty)
        ? prev.filter((d) => d !== difficulty)
        : [...prev, difficulty]
    );
  };

  return (
    <div className="m-3 p-4 border-2 rounded-md shadow-lg">
      <h1 className="text-center my-6 text-2xl font-semibold">Categorias</h1>

      <p className="text-gray-600 text-center mb-5">
        Configure seus exercícios
      </p>

      {/* Filtro de Anos com Dropdown Multiseleção */}
      <div className="mb-5">
        <h2>Filtrar por Ano</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className={`mt-2 w-full bg-${
                selectedYears.length ? "green" : "blue"
              }-600 hover:bg-${selectedYears.length ? "green" : "blue"}-700`}
            >
              {selectedYears.length
                ? selectedYears.join(", ")
                : "Selecionar Anos"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full">
            {availableYears.map((year) => (
              <DropdownMenuCheckboxItem
                className="w-full"
                key={year}
                checked={selectedYears.includes(year)}
                onCheckedChange={() => toggleYearSelection(year)}
              >
                {year}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Filtro de Dificuldade com Dropdown Multiseleção */}
      <div className="mb-5">
        <h2>Filtrar por Dificuldade</h2>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className={`mt-2 w-full bg-${
                selectedDifficulties.length ? "green" : "blue"
              }-600 hover:bg-${
                selectedDifficulties.length ? "green" : "blue"
              }-700`}
            >
              {selectedDifficulties.length
                ? selectedDifficulties.join(", ")
                : "Selecionar Dificuldade"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {difficulties.map((difficulty) => (
              <DropdownMenuCheckboxItem
                key={difficulty}
                checked={selectedDifficulties.includes(difficulty)}
                onCheckedChange={() => toggleDifficultySelection(difficulty)}
              >
                {difficulty}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Renderiza o componente NestedCheckbox */}
      <NestedCheckbox data={subjectData} setSelected={setSelectedSubjects} />

      {/* Exibe as seleções */}
      <div className="mt-6 p-4 bg-gray-100 rounded-md">
        <h2 className="text-lg font-medium">Seleções Atuais:</h2>
        <ul className="mt-2 list-disc list-inside">
          <li>
            <strong>Categorias:</strong>{" "}
            {selectedSubjects.length
              ? selectedSubjects.join(", ")
              : "Nenhum item selecionado"}
          </li>
          <li>
            <strong>Anos:</strong>{" "}
            {selectedYears.length
              ? selectedYears.join(", ")
              : "Nenhum ano selecionado"}
          </li>
          <li>
            <strong>Dificuldades:</strong>{" "}
            {selectedDifficulties.length
              ? selectedDifficulties.join(", ")
              : "Nenhuma dificuldade selecionada"}
          </li>
        </ul>
      </div>
    </div>
  );
}
