"use client";

import { useState } from "react";
import questions from "../../app/questions.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [totalCorrectAnswers, setTotalCorrectAnswers] = useState(0);
  const [totalWrongAnswers, setTotalWrongAnswers] = useState(0);
  const [totalAnsweredQuestions, setTotalAnsweredQuestions] = useState(0);
  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [answerRemarks, setAnswerRemarks] = useState("");
  const [quizCompleted, setQuizCompleted] = useState(false);
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
    setTotalAnsweredQuestions(totalAnsweredQuestions + 1);
    // setTotalAnsweredQuestions(prev => prev + 1);
    if (checkingAnswer) {
      setTotalCorrectAnswers(totalCorrectAnswers + 1);
      // setTotalAnsweredQuestions(prev => prev + 1);
      setAnswerRemarks("correct!");
      setScore(score + 1);
    } else {
      setTotalWrongAnswers(totalWrongAnswers + 1);
      // setTotalAnsweredQuestions(prev => prev + 1);
      setAnswerRemarks("Sorry!");
    }
    setIsOptionSelected(true);

    if (totalAnsweredQuestions + 1 === totalQuestions) {
      setQuizCompleted(true);
      console.log("completed.");
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setTotalCorrectAnswers(0);
    setTotalWrongAnswers(0);
    setTotalAnsweredQuestions(0);
    setIsOptionSelected(false);
    setAnswerRemarks("");
    setQuizCompleted(false);
    setCurrentIndex(null);
  };

  const currentScore =
    totalAnsweredQuestions > 0
      ? (totalCorrectAnswers / totalAnsweredQuestions) * 100
      : 0;
  const maxScore =
    totalAnsweredQuestions > 0
      ? ((totalCorrectAnswers + (totalQuestions - totalAnsweredQuestions)) /
          totalQuestions) *
        100
      : 0;
  const minScore = (totalCorrectAnswers / totalQuestions) * 100;

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const adjustedProgress = Math.max(progress, 5);

  const percentageScore = (score / totalQuestions) * 100;

  return (
    <div>
      <section className="pt-4">
        <div className="container h-220 mx-auto w-1/2 border-4 border-slate-200">
          <div className="flex flex-wrap">
            <div className="w-full">
              {!quizCompleted ? (
                <div>
                  <div className="h-6 bg-slate-100">
                    <div
                      className="w-1/4 h-full bg-slate-400"
                      style={{ width: `${adjustedProgress}%` }}
                    ></div>
                  </div>

                  <div className="px-14 pb-10">
                    <div className="flex justify-between items-center text-black">
                      <div className="pt-3 mt-4">
                        <h4 className="text-xl font-semibold text-black">
                          Question <span className="text-black">{nextQuestion}</span> of{" "}
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
                        <h6 className="text-black">
                          <span className="text-xs text-black">
                            <FontAwesomeIcon
                              icon={faStar}
                              className="text-xs"
                            />
                          </span>
                        </h6>
                      ) : questionDifficulty == "medium" ? (
                        <h6 className="text-black">
                          <span className="text-xs text-black">
                            <FontAwesomeIcon
                              icon={faStar}
                              className="text-xs"
                            />
                            <FontAwesomeIcon
                              icon={faStar}
                              className="text-xs"
                            />
                          </span>
                        </h6>
                      ) : questionDifficulty == "hard" ? (
                        <h6 className="text-black">
                          <span className="text-xs text-black">
                            <FontAwesomeIcon
                              icon={faStar}
                              className="text-xs"
                            />
                            <FontAwesomeIcon
                              icon={faStar}
                              className="text-xs"
                            />
                            <FontAwesomeIcon
                              icon={faStar}
                              className="text-xs"
                            />
                          </span>
                        </h6>
                      ) : (
                        <h6></h6>
                      )}
                    </div>
                    <div className="py-3">
                      <h2 className="text-black">{questionText}</h2>
                    </div>
                    <div className="flex flex-row flex-wrap justify-between gap-4">
                      {temp[currentQuestion].options.map(
                        (singleOption, index: number) => (
                          <button
                            key={index}
                            className={`text-black border-2 p-2 mb-2 border-slate-500 rounded-md text-sm w-2/5  ${
                              index == currentIndex
                                ? "bg-black border-black text-white border-2"
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
                      <h1 className="text-lg py-3 uppercase font-bold text-center text-black">
                        <span className="text-black">{answerRemarks}</span>
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
                                setCurrentIndex(null);
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
                        <div className="flex items-center justify-between mt-3 mb-2">
                          <div className="text-xs text-black">
                            {/* Score: {percentageScore.toFixed(2)}% */}
                            Score: {currentScore.toFixed(2)}%
                          </div>
                          {/* <p>Current Score: {currentScore.toFixed(2)}%</p> */}
                          {/* <p className="text-xs">Min Score: {minScore.toFixed(2)}%</p> */}
                          <p className="text-xs text-black">
                            Max Score: {maxScore.toFixed(2)}%
                          </p>
                        </div>
                        <div className="flex items-center border-black border rounded overflow-hidden ">
                          <div className="w-full bg-white h-8 relative">
                            <div
                              style={{
                                width: `${currentScore}%`,
                              }}
                              className={`bg-slate-500 h-full w-0`}
                            ></div>
                            <div
                              style={{
                                width: `${maxScore}%`,
                              }}
                              className="bg-slate-300 h-full absolute top-0 left-0 opacity-50"
                            ></div>
                            <div
                              style={{
                                width: `${minScore}%`,
                              }}
                              className="bg-black h-full absolute top-0 left-0 opacity-50"
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="bg-white mt-5 p-3">
                    <p className="mb-4 text-black">Quiz has been completed!</p>
                    <button
                      onClick={resetQuiz}
                      className="px-4 text-sm py-2 bg-white text-black border border-black rounded cursor-pointer"
                    >
                      Start Quiz Again
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
