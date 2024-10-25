"use client";
import { useState } from "react";

// Definição dos tipos para as questões e respostas
type Question = {
  id: number;
  text: string;
  options: string[];
  correctAnswerIndex: number; // índice da resposta correta
};

// Array de questões para simulação
const questions: Question[] = [
  {
    id: 1,
    text: "Qual é a capital da França?",
    options: ["Berlim", "Madri", "Paris", "Lisboa", "Roma"],
    correctAnswerIndex: 2,
  },
  {
    id: 2,
    text: "Qual é o maior planeta do sistema solar?",
    options: ["Terra", "Marte", "Júpiter", "Saturno", "Vênus"],
    correctAnswerIndex: 2,
  },
  // Adicione mais questões conforme necessário
];

export default function SessionPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);
    setIsAnswerChecked(false);
    setIsCorrect(null);
  };

  const checkAnswer = () => {
    if (selectedOption !== null) {
      const answerIsCorrect =
        selectedOption === currentQuestion.correctAnswerIndex;
      setIsCorrect(answerIsCorrect);
      setIsAnswerChecked(true);
    }
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setSelectedOption(null);
      setIsAnswerChecked(false);
      setIsCorrect(null);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setSelectedOption(null);
      setIsAnswerChecked(false);
      setIsCorrect(null);
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  return (
    <div className="mx-4 my-10 p-8 bg-white shadow-lg rounded-lg place-self-center max-w-lg md:min-w-[60%] min-w-[90%]">
      <div className="mb-4 text-gray-600 text-sm">
        Questão {currentQuestionIndex + 1}/{totalQuestions}
      </div>

      <h2 className="text-xl font-semibold mb-6">{currentQuestion.text}</h2>

      <div className="space-y-4">
        {currentQuestion.options.map((option, index) => (
          <label
            key={index}
            className={`block p-4 border rounded-lg cursor-pointer ${
              selectedOption === index
                ? isAnswerChecked
                  ? isCorrect
                    ? "bg-green-500 text-white border-green-500"
                    : "bg-red-500 text-white border-red-500"
                  : "bg-blue-500 text-white border-blue-500"
                : "bg-gray-50 text-gray-800 border-gray-200"
            }`}
            onClick={() => handleOptionSelect(index)}
          >
            {option}
          </label>
        ))}
      </div>

      <div className="mt-8 flex justify-between gap-2">
        <button
          onClick={goToPreviousQuestion}
          disabled={currentQuestionIndex === 0}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Anterior
        </button>

        <button
          onClick={checkAnswer}
          disabled={selectedOption === null || isAnswerChecked}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Conferir
        </button>

        <button
          onClick={goToNextQuestion}
          disabled={currentQuestionIndex === totalQuestions - 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Próximo
        </button>
      </div>
    </div>
  );
}
