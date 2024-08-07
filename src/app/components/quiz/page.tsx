"use client";

import { useState } from "react";
import questions from "../../questions.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(undefined);
  const [answerRemarks, setAnswerRemarks] = useState("");
  const totalQuestions = questions.length;
  const nextQuestion =
    currentQuestion < totalQuestions ? currentQuestion + 1 : currentQuestion;

  const questionText = decodeURIComponent(questions[currentQuestion].question);
  const questionCategory = decodeURIComponent(
    questions[currentQuestion].category
  );
  const questionDifficulty = decodeURIComponent(
    questions[currentQuestion].difficulty
  );

  function handleNextQuestion() {
    setCurrentQuestion(currentQuestion + 1);
  }

  // const shuffleArray = (array: string[]) => {
  //   for (let i = array.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [array[i], array[j]] = [array[j], array[i]];
  //   }
  //   return array;
  // };

  // const shuffleArray = (array) => {
  //   return array
  //     .map((item) => ({ sort: Math.random(), value: item }))
  //     .sort((a, b) => a.sort - b.sort)
  //     .map((item) => item.value);
  // };

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

  // const shuffledOptions = shuffleArray(temp[currentQuestion].options);

  const questionCorrectAnswer = decodeURIComponent(
    questions[currentQuestion].correct_answer
  );

  const checkingCorrectAnswer = (selectedOption: string, index: number) => {
    setCurrentIndex(index);
    const checkingAnswer = selectedOption === questionCorrectAnswer;
    if (checkingAnswer) {
      setAnswerRemarks("correct!");
      setScore(score + 1);
    } else {
      setAnswerRemarks("Sorry!");
    }
    setIsOptionSelected(true);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const adjustedProgress = Math.max(progress, 5);

  const percentageScore = (score / totalQuestions) * 100;

  return (
    <div>
      {currentQuestion <= totalQuestions - 1 ? (
        <section className="pt-4">
          <div className="container mx-auto w-1/2 border-4 border-slate-200">
            <div className="flex flex-wrap">
              <div className="w-full">
                <div className="h-6 bg-slate-100">
                  <div
                    className="w-1/4 h-full bg-slate-400"
                    style={{ width: `${adjustedProgress}%` }}
                  ></div>
                </div>

                <div className="px-14 pb-10">
                  <div className="flex justify-between items-center">
                    <div className="pt-3 mt-4">
                      <h4 className="text-xl font-semibold">
                        Question <span>{nextQuestion}</span> of{" "}
                        <span>{totalQuestions}</span>
                      </h4>
                    </div>
                  </div>
                  <div>
                    <h6 className="text-xs text-slate-400">
                      {questionCategory}
                    </h6>
                  </div>
                  <div>
                    {questionDifficulty == "easy" ? (
                      <h6>
                        <span className="text-xs">
                          <FontAwesomeIcon icon={faStar} />
                          <FontAwesomeIcon
                            className="text-slate-200"
                            icon={faStar}
                          />
                          <FontAwesomeIcon
                            className="text-slate-200"
                            icon={faStar}
                          />
                          <FontAwesomeIcon
                            className="text-slate-200"
                            icon={faStar}
                          />
                          <FontAwesomeIcon
                            className="text-slate-200"
                            icon={faStar}
                          />
                        </span>
                      </h6>
                    ) : questionDifficulty == "medium" ? (
                      <h6>
                        <span className="text-xs">
                          <FontAwesomeIcon icon={faStar} />
                          <FontAwesomeIcon icon={faStar} />
                          <FontAwesomeIcon
                            className="text-slate-200"
                            icon={faStar}
                          />
                          <FontAwesomeIcon
                            className="text-slate-200"
                            icon={faStar}
                          />
                          <FontAwesomeIcon
                            className="text-slate-200"
                            icon={faStar}
                          />
                        </span>
                      </h6>
                    ) : questionDifficulty == "hard" ? (
                      <h6>
                        <span className="text-xs">
                          <FontAwesomeIcon icon={faStar} />
                          <FontAwesomeIcon icon={faStar} />
                          <FontAwesomeIcon icon={faStar} />
                          <FontAwesomeIcon
                            className="text-slate-200"
                            icon={faStar}
                          />
                          <FontAwesomeIcon
                            className="text-slate-200"
                            icon={faStar}
                          />
                        </span>
                      </h6>
                    ) : (
                      <h6></h6>
                    )}
                  </div>
                  <div className="py-3">
                    <h2>{questionText}</h2>
                  </div>
                  <div className="flex flex-row flex-wrap justify-between gap-4">
                    {temp[currentQuestion].options.map(
                      (singleOption, index: number) => (
                        <button
                          key={index}
                          className={`border-2 p-2 mb-2 border-slate-500 rounded-md text-sm w-2/5  ${
                            index == currentIndex
                              ? "bg-black border-black text-white"
                              : ""
                          }  focus:outline-none  transition-all ease-in-out duration-300`}
                          onClick={() =>
                            checkingCorrectAnswer(singleOption, index)
                          }
                          disabled={isOptionSelected}
                        >
                          {singleOption}
                        </button>
                      )
                    )}
                  </div>
                  <div>
                    <h1 className="text-lg py-3 uppercase font-bold text-center">
                      <span>{answerRemarks}</span>
                    </h1>

                    {isOptionSelected && (
                      <div className="text-center">
                        <button
                          onClick={() => {
                            if (isOptionSelected) {
                              setCurrentQuestion(
                                (prev) => (prev + 1) % temp.length
                              );
                              setIsOptionSelected(false);
                              setAnswerRemarks("");
                              setCurrentIndex(undefined);
                            } else {
                              alert(
                                "Please select an option before moving to the next question."
                              );
                            }
                          }}
                          disabled={!isOptionSelected}
                          className="py-3 px-5 text-center bg-zinc-100 border-2 font-medium border-black rounded text-black text-xs capitalize"
                        >
                          next question
                        </button>
                      </div>
                    )}

                    <div>
                      Score: {score} / {totalQuestions} (
                      {percentageScore.toFixed(2)}%)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <h6>quiz is completed.</h6>
      )}
    </div>
  );
}
