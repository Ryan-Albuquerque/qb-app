"use client";
import { useState } from "react";

type Question = {
  id: number;
  text: string;
  year: number;
  difficulty: "Fácil" | "Médio" | "Difícil";
  subcategory: string; // Subcategoria de única escolha
  options: string[];
  correctAnswerIndex: number;
};

// Definindo dificuldades e anos possíveis
const difficulties = ["Fácil", "Médio", "Difícil"];
const currentYear = new Date().getFullYear();

// Lista de subcategorias pré-definidas para selecionar
const subcategoriesList = [
  "Álgebra",
  "Geometria",
  "Trigonometria",
  "Cálculo",
  "Física",
  "Química",
];

type QuestionFormProps = {
  onSave: (question: Question) => void; // Função de callback para salvar a questão
  question?: Question; // Questão opcional para edição
};

export default function QuestionFormPage({
  onSave,
  question,
}: QuestionFormProps) {
  const [text, setText] = useState<string>(question?.text || "");
  const [year, setYear] = useState<number>(question?.year || currentYear);
  const [difficulty, setDifficulty] = useState<string>(
    question?.difficulty || "Fácil"
  );
  const [subcategory, setSubcategory] = useState<string>(
    question?.subcategory || subcategoriesList[0]
  );
  const [options, setOptions] = useState<string[]>(
    question?.options || ["", "", "", ""]
  );
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number>(
    question?.correctAnswerIndex || 0
  );

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleSave = () => {
    const newQuestion: Question = {
      id: question ? question.id : Date.now(),
      text,
      year,
      difficulty: difficulty as Question["difficulty"],
      subcategory,
      options,
      correctAnswerIndex,
    };
    onSave(newQuestion);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-semibold mb-6">
        {question ? "Editar Questão" : "Nova Questão"}
      </h1>

      <label className="block mb-4">
        <span className="text-gray-700">Enunciado</span>
        <textarea
          className="mt-1 p-2 w-full border rounded"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Digite o enunciado da questão"
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-700">Ano</span>
        <input
          type="number"
          className="mt-1 p-2 w-full border rounded"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          min="2000"
          max={currentYear}
        />
      </label>

      <label className="block mb-4">
        <span className="text-gray-700">Dificuldade</span>
        <select
          className="mt-1 p-2 w-full border rounded"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          {difficulties.map((diff) => (
            <option key={diff} value={diff}>
              {diff}
            </option>
          ))}
        </select>
      </label>

      <label className="block mb-4">
        <span className="text-gray-700">Subcategoria</span>
        <select
          className="mt-1 p-2 w-full border rounded"
          value={subcategory}
          onChange={(e) => setSubcategory(e.target.value)}
        >
          {subcategoriesList.map((sub) => (
            <option key={sub} value={sub}>
              {sub}
            </option>
          ))}
        </select>
      </label>

      <div className="mb-4">
        <span className="text-gray-700">Respostas</span>
        {options.map((option, index) => (
          <div key={index} className="flex items-center mt-2">
            <input
              type="radio"
              name="correctAnswer"
              checked={correctAnswerIndex === index}
              onChange={() => setCorrectAnswerIndex(index)}
              className="mr-2"
            />
            <input
              type="text"
              className="p-2 w-full border rounded"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              placeholder={`Opção ${index + 1}`}
            />
          </div>
        ))}
      </div>

      <button
        onClick={handleSave}
        className="w-full px-4 py-2 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        {question ? "Salvar Alterações" : "Adicionar Questão"}
      </button>
    </div>
  );
}
