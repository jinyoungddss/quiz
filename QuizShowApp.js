
import { useState } from "react";

const sampleQuestions = [
  {
    question:
      "어느날 동생이랑 같이 피자를 먹기로 했어요. 한조각은 1/2, 다른조각은 1/3이네요? 어느 조각이 더 많이 먹을 수 있을까요?",
    options: ["1/2조각", "1/3조각"],
    answer: 0,
  },
  {
    question:
      "친구랑 시험을 누가 더 잘칠까 내기를 했어요. 친구는 시험지의 1/2를 맞추고, 나는 1/3을 맞췄네요. 누가 더 잘쳤을까요?",
    options: ["친구", "나"],
    answer: 0,
  },
  {
    question:
      "나는 오늘 케이크의 1/2를 먹고, 내일 케이크의 1/3을 먹을것입니다. 언제 더 케이크를 많이 먹었나요?",
    options: ["오늘", "내일"],
    answer: 0,
  },
];

export default function QuizShow() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const question = sampleQuestions[currentQuestion];
  const isLastQuestion = currentQuestion === sampleQuestions.length - 1;
  const isFirstQuestion = currentQuestion === 0;

  const nextQuestion = () => {
    setSelectedOption(null);
    setShowAnswer(false);
    if (!isLastQuestion) setCurrentQuestion(currentQuestion + 1);
  };

  const prevQuestion = () => {
    setSelectedOption(null);
    setShowAnswer(false);
    if (!isFirstQuestion) setCurrentQuestion(currentQuestion - 1);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 text-center">
      <h1 className="text-2xl font-bold mb-4">퀴즈쇼 🎉</h1>
      <div className="bg-white rounded-2xl shadow p-6">
        <p className="text-lg mb-4">
          <span className="font-semibold text-gray-500 text-sm">
            문제 {currentQuestion + 1} / {sampleQuestions.length}
          </span>
          <br />
          {question.question}
        </p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {question.options.map((opt, idx) => (
            <button
              key={idx}
              className={`p-3 rounded-xl border text-lg transition-all
                ${selectedOption === idx ? "bg-blue-100 border-blue-500" : "bg-gray-100 border-gray-300"}`}
              onClick={() => setSelectedOption(idx)}
              disabled={showAnswer}
            >
              {opt}
            </button>
          ))}
        </div>
        {!showAnswer ? (
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600"
            onClick={() => setShowAnswer(true)}
            disabled={selectedOption === null}
          >
            정답 확인하기
          </button>
        ) : (
          <div>
            {selectedOption === question.answer ? (
              <p className="text-green-600 text-xl font-semibold mt-4">정답입니다! 🎉</p>
            ) : (
              <p className="text-red-500 text-xl font-semibold mt-4">아쉽네요! 정답은 "{question.options[question.answer]}"입니다.</p>
            )}
          </div>
        )}
        <div className="flex justify-between mt-6">
          <button
            onClick={prevQuestion}
            disabled={isFirstQuestion}
            className="bg-gray-200 px-4 py-2 rounded-xl disabled:opacity-50"
          >
            이전 문제
          </button>
          <button
            onClick={nextQuestion}
            disabled={isLastQuestion}
            className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 disabled:opacity-50"
          >
            다음 문제
          </button>
        </div>
      </div>
    </div>
  );
}
