"use client"

import { useState } from "react";

export default function home() {


    const questions = [
        {
			questionText: 'At the start of the game play',
			answerOptions: [
				{ answerText: 'Electric Company', isCorrect: false },
				{ answerText: 'Water Works', isCorrect: false },
				{ answerText: 'Chance', isCorrect: true },
				{ answerText: 'Community Chest', isCorrect: false },
			],
		},
        {
			questionText: 'At the start of the game play 02',
			answerOptions: [
				{ answerText: 'Electric Company', isCorrect: false },
				{ answerText: 'Water Works', isCorrect: false },
				{ answerText: 'Chance', isCorrect: true },
				{ answerText: 'Community Chest', isCorrect: false },
			],
		},
        {
			questionText: 'The iPhone was created by which company?',
			answerOptions: [
				{ answerText: 'Apple', isCorrect: true },
				{ answerText: 'Intel', isCorrect: false },
				{ answerText: 'Amazon', isCorrect: false },
				{ answerText: 'Microsoft', isCorrect: false },
			],
		},
		{
			questionText: 'How many Harry Potter books are there?',
			answerOptions: [
				{ answerText: '1', isCorrect: false },
				{ answerText: '4', isCorrect: false },
				{ answerText: '6', isCorrect: false },
				{ answerText: '7', isCorrect: true },
			],
		},
    ]

    const [currentQuestion, setCurrentQuestion] = useState(0);

    const handleAnswerClick = (isCorrect: boolean) => {
        // if (isCorrect) {
        //   setScore(score + 1);
        // }
        // Move to the next question
        setCurrentQuestion(currentQuestion + 1);
      };

      

      function renderQuestion(){

        const question = questions[currentQuestion];

        return(

            <div>

                <h2>{question.questionText}</h2>

                <ul>
                {question.answerOptions.map((option, index) => (
                    <li key={index} className="">
                    <button
                        className="border-2 border-black p-1"
                        onClick={() => handleAnswerClick(option.isCorrect)}
                        
                    >
                        {option.answerText}
                    </button>
                    </li>
                ))}
                </ul>
        </div>
        )
      }

      const progress = (currentQuestion / questions.length) * 100;

    return (
        <>

    <div className="progress-bar h-6 bg-green-700" style={{ width: `${progress}%` }} />
      {currentQuestion < questions.length ? (
        <div>
          {renderQuestion()}
          <p>Progress: {Math.round(progress)}%</p>
        </div>
      ) : (
        <div>
          <h2>Quiz completed!</h2>
          {/* <p>Your score: {score}/{questions.length}</p> */}
        </div>
      )}

    {/* </div> */}
        
            
        </>
    );
}