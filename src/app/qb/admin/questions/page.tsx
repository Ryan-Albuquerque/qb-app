"use client";
import { useState } from "react";

// Tipo para definir a estrutura de uma questão
type Question = {
  id: number;
  text: string;
  year: number;
  difficulty: "Fácil" | "Médio" | "Difícil";
  subject: string;
  subcategories?: string[];
};

// Dados simulados para as questões
const questions: Question[] = [
  {
    id: 1,
    text: "Qual é a capital da França?",
    year: 2021,
    difficulty: "Fácil",
    subject: "Geografia",
    subcategories: ["Europa", "Capitais"],
  },
  {
    id: 2,
    text: "Qual é o maior planeta do sistema solar?",
    year: 2019,
    difficulty: "Médio",
    subject: "Astronomia",
    subcategories: ["Planetas", "Sistema Solar"],
  },
  {
    id: 3,
    text: "Explique a teoria da relatividade de Einstein.",
    year: 2020,
    difficulty: "Difícil",
    subject: "Física",
    subcategories: ["Teorias", "Relatividade"],
  },
  // Adicione mais questões conforme necessário
];

// Valores únicos para os filtros
const uniqueSubjects = Array.from(new Set(questions.map((q) => q.subject)));
const uniqueDifficulties = ["Fácil", "Médio", "Difícil"];
const uniqueYears = Array.from(new Set(questions.map((q) => q.year))).sort(
  (a, b) => b - a
);

export default function QuestionsListPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(
    null
  );
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  // Função para filtrar as questões conforme o termo de busca e filtros selecionados
  const filteredQuestions = questions.filter((question) => {
    const matchesSearch = question.text
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject
      ? question.subject === selectedSubject
      : true;
    const matchesDifficulty = selectedDifficulty
      ? question.difficulty === selectedDifficulty
      : true;
    const matchesYear = selectedYear ? question.year === selectedYear : true;

    return matchesSearch && matchesSubject && matchesDifficulty && matchesYear;
  });

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Lista de Questões</h1>

      {/* Barra de pesquisa */}
      <input
        type="text"
        placeholder="Pesquisar enunciado..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />

      {/* Filtros de seleção */}
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          value={selectedSubject || ""}
          onChange={(e) => setSelectedSubject(e.target.value || null)}
          className="p-2 border rounded"
        >
          <option value="">Matéria</option>
          {uniqueSubjects.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>

        <select
          value={selectedDifficulty || ""}
          onChange={(e) => setSelectedDifficulty(e.target.value || null)}
          className="p-2 border rounded"
        >
          <option value="">Dificuldade</option>
          {uniqueDifficulties.map((difficulty) => (
            <option key={difficulty} value={difficulty}>
              {difficulty}
            </option>
          ))}
        </select>

        <select
          value={selectedYear || ""}
          onChange={(e) =>
            setSelectedYear(e.target.value ? Number(e.target.value) : null)
          }
          className="p-2 border rounded"
        >
          <option value="">Ano</option>
          {uniqueYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Lista de questões filtradas */}
      <ul className="space-y-4">
        {filteredQuestions.map((question) => (
          <li key={question.id} className="p-4 border rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-2">{question.text}</h2>
            <div className="text-sm text-gray-600 mb-2">
              Ano: {question.year} • Dificuldade: {question.difficulty}
            </div>
            <div className="text-sm">
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                {question.subject}
              </span>
              {question.subcategories && question.subcategories.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {question.subcategories.map((subcategory, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                    >
                      {subcategory}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* Mensagem caso nenhuma questão seja encontrada */}
      {filteredQuestions.length === 0 && (
        <p className="text-center text-gray-500 mt-4">
          Nenhuma questão encontrada.
        </p>
      )}
    </div>
  );
}
