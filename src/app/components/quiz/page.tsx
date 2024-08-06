"use client";

import { useState } from "react";
import questions from "../../questions.json";

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [answerRemarks, setAnswerRemarks] = useState("");
  const totalQuestions = questions.length;
  const nextQuestion =
    currentQuestion < totalQuestions ? currentQuestion + 1 : currentQuestion;

  const questionText = decodeURIComponent(questions[currentQuestion].question);

  function handleNextQuestion() {
    setCurrentQuestion(currentQuestion + 1);
  }

  const temp = questions.map((item) => {
    const decodedCorrectAnswer = decodeURIComponent(item.correct_answer);
    const decodedIncorrectAnswers = item.incorrect_answers.map((answer) =>
      decodeURIComponent(answer)
    );

    const options = [decodedCorrectAnswer, ...decodedIncorrectAnswers];

    return {
      options: options,
    };
  });

  const questionCorrectAnswer = decodeURIComponent(questions[currentQuestion].correct_answer);

const checkingCorrectAnswer = (selectedOption: string) => {
    const checkingAnswer = selectedOption === questionCorrectAnswer;
    if (checkingAnswer) {
      setAnswerRemarks("correct answer");
    } else {
      setAnswerRemarks("wrong answer");
    }
    setIsOptionSelected(true);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const adjustedProgress = Math.max(progress, 5);

  return (
    <div>
      <section className="pt-4">
        <div className="container mx-auto px-5">
          <div className="flex flex-wrap">
            <div className="w-full">
              <h1 className="text-2xl uppercase font-semibold text-blue-700 text-center">
                making quiz game
              </h1>
              <div className="h-8 bg-slate-100 mt-3">
                <div
                  className="w-1/4 h-full bg-green-500"
                  style={{ width: `${adjustedProgress}%` }}
                ></div>
              </div>
              <div className="flex justify-between items-center">
                <div className="w-1/6 bg-blue-700 p-3 rounded-lg my-4">
                  <h4 className="text-white text-center text-sm">
                    Question <span>{nextQuestion}</span> of{" "}
                    <span>{totalQuestions}</span>
                  </h4>
                </div>
                <div>
                  <button
                    // onClick={handleNextQuestion}
                    onClick={() => {
                        if (isOptionSelected) {
                          setCurrentQuestion((prev) => (prev + 1) % temp.length);
                          setIsOptionSelected(false);
                          setAnswerRemarks("");
                        } else {
                          alert("Please select an option before moving to the next question.");
                        }
                      }}
                      disabled={!isOptionSelected}
                    className="py-3 px-5 text-center bg-blue-700 text-white text-xs uppercase"
                  >
                    next question
                  </button>
                </div>
              </div>
              <div className="py-3">
                <h2>{questionText}</h2>
              </div>
              <div className="flex flex-col w-1/4">
                {temp[currentQuestion].options.map((singleOption, index) => (
                  <button
                    key={index}
                    className="border-2 p-1 mb-2 border-blue-700 rounded-md text-sm hover:bg-blue-700 hover:text-white transition-all ease-in-out duration-300"
                    onClick={() => checkingCorrectAnswer(singleOption)}
                    disabled={isOptionSelected}
                  >
                    {singleOption}
                  </button>
                ))}
              </div>
              <div>
                <h1 className="text-lg py-3 uppercase font-bold"><span>{answerRemarks}</span></h1>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
