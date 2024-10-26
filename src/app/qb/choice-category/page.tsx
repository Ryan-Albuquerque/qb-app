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
import { useRouter } from "next/navigation";

interface Node {
  label: string;
  checked: boolean;
  childrenNodes: Node[];
  parent: Node | null;
  isOpen: boolean;
}

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
  const [selectedSubjects, setSelectedSubjects] = useState<Node[]>([]);
  const [selectedYears, setSelectedYears] = useState<number[]>([]); // Pré-selecionando os últimos 3 anos
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>(
    []
  );
  const [parsedSubjects, setParsedSubjects] = useState<string[]>([]); // Pré-selecion

  const router = useRouter();

  useEffect(() => {
    const collectHighestLevelSelections = (nodes: Node[]) => {
      const highestLevels: string[] = [];

      const isNodeValidForSelection = (node: Node) => {
        let current: Node | null = node;
        while (current) {
          if (highestLevels.includes(current.label)) return false;
          current = current.parent;
        }
        return true;
      };

      const traverseNodes = (nodes: Node[]) => {
        nodes.forEach((node) => {
          if (node.checked) {
            const allChildrenChecked = node.childrenNodes.every(
              (child) => child.checked
            );

            if (isNodeValidForSelection(node)) {
              highestLevels.push(node.label);
            }

            if (!allChildrenChecked) {
              node.childrenNodes.forEach((child) => {
                if (child.checked && !highestLevels.includes(child.label)) {
                  highestLevels.push(child.label);
                }
              });
            }
          }
          traverseNodes(node.childrenNodes);
        });
      };

      traverseNodes(nodes);
      setParsedSubjects(highestLevels);
    };
    collectHighestLevelSelections(selectedSubjects);
  }, [setSelectedSubjects, selectedSubjects]);
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
    <div className="m-3 p-4 border-2 rounded-md shadow-lg w-[85%] justify-self-center">
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
      <NestedCheckbox
        data={subjectData}
        setSelectedNode={setSelectedSubjects}
      />
      <div className="mt-5">
        <Button
          onClick={() =>
            router.push(
              `/qb/session?categories=${parsedSubjects.join(
                ","
              )}&difficulty=${selectedDifficulties.join(
                ","
              )}&year=${selectedYears.join(",")}`
            )
          }
          className="w-full bg-green-600 hover:bg-green-700"
          type="submit"
          disabled={
            selectedDifficulties.length === 0 ||
            selectedYears.length === 0 ||
            parsedSubjects.length === 0
          }
        >
          Começar
        </Button>
      </div>
    </div>
  );
}
