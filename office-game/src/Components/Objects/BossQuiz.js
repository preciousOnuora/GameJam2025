import React, { useState, useEffect } from "react";
import './BossQuiz.css';

import JennySpritehappy from "../../sprites/player/Jenny/Jenny-openmouth.png";  
import JennySpritesad from "../../sprites/player/Jenny/Jenny-closemouth.png";  

const BossQuiz = ({ onQuizComplete }) => {
  const questions = [
    { id: 1, question: "On average, how much less retirement income are women on track to receive compared to men?", options: ["£2,000 less", "£7,000 less", "£12,000 less"], correctAnswer: "£7,000 less" },
    { id: 2, question: "Around how many women in the UK miss out on auto-enrolment because they earn under £10,000 a year?", options: ["500,000", "1.4 million", "5 million"], correctAnswer: "1.4 million" },
    { id: 3, question: "True or False? Taking a 2.5-year career break can cut a mother’s pension pot by £8,000.", options: ["True", "False"], correctAnswer: "True" },
    { id: 4, question: "What % of divorced women don’t discuss pensions during divorce?", options: ["20%", "40%", "60%"], correctAnswer: "60%" },
    { id: 5, question: "Who is more likely to work part-time in the UK?", options: ["Men", "Women"], correctAnswer: "Women" },
    { id: 6, question: "You’ve had several jobs and have multiple old pensions. What would you prefer?", options: ["Keep them separate", "Combine them into one so it’s simpler to track and manage"], correctAnswer: "Combine them into one so it’s simpler to track and manage" },
    { id: 7, question: "If you put £80 into your pension, how much does the government usually top it up by?", options: ["£10", "£20", "£40"], correctAnswer: "£20" },
    { id: 8, question: "What’s happening in 2028 to the pension access age?", options: ["Still 55 - patience is a virtue", "Rising to 57 - a little extra waiting never hurt", "Dropping to 50 - early birds get the worms"], correctAnswer: "Rising to 57 - a little extra waiting never hurt" },
    { id: 9, question: "True or False? You can combine old pensions into one pot to keep things simple.", options: ["True", "False"], correctAnswer: "True" },
    { id: 10, question: "Why do women often end up with smaller pensions than men?", options: [
        "Because time off for childcare and career breaks reduces contributions",
        "Because Lloyds horse eats it 🐴",
        "Because they stash it in secret chocolate funds 🍫",
        "Because they hide it under the mattress"
      ], correctAnswer: "Because time off for childcare and career breaks reduces contributions" }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [passed, setPassed] = useState(null);

  useEffect(() => {
    if (quizCompleted) return;
    if (timeLeft <= 0) {
      handleNextQuestion();
      return;
    }
    const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, quizCompleted]);

  const handleAnswerSelect = (answer) => {
    if (selectedAnswer) return;
    setSelectedAnswer(answer);

    if (answer === questions[currentQuestion].correctAnswer) {
      setScore(prev => prev + 1);
      setFeedback("✅ Correct!");
    } else {
      setFeedback(`❌ Wrong! Correct: ${questions[currentQuestion].correctAnswer}`);
    }

    setTimeout(() => {
      setFeedback('');
      handleNextQuestion();
    }, 1200);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer('');
      setTimeLeft(30);
    } else {
      const didPass = score >= 8; // pass if 8 or more correct
      setPassed(didPass);
      setQuizCompleted(true);
    }
  };

  const handleComplete = () => {
    const passed = score >= 8;
    onQuizComplete(passed, score, questions.length);
  };

  // --- WIN MODAL ---
  if (quizCompleted && passed) {
    return (
      <div className="quiz-overlay">
        <div className="boss-quiz win">
          <img src={JennySpritehappy} alt="Jenny Winning" className="jenny-bounce" />
          <p>Your Score: <strong>{score} / {questions.length}</strong></p>
          <p className="pass">✅ Promotion earned!</p>
          <button className="complete-btn" onClick={handleComplete}>
            Return to Office
          </button>
        </div>
      </div>
    );
  }

  // --- LOSE MODAL ---
  if (quizCompleted && !passed) {
    return (
      <div className="quiz-overlay">
        <div className="boss-quiz lose">
          <div className="jenny-cry-container">
            <img src={JennySpritesad} alt="Jenny Losing" className="jenny-cry" />
            <div className="tear left"></div>
            <div className="tear right"></div>
          </div>
          <p>Your Score: <strong>{score} / {questions.length}</strong></p>
          <p className="fail">❌ Maybe next time!</p>
          <button className="complete-btn" onClick={handleComplete}>
            Return to Office
          </button>
        </div>
      </div>
    );
  }

  // --- MAIN QUIZ ---
  return (
    <div className="quiz-overlay">
      <div className="boss-quiz">
        <div className="quiz-header">
          <h2>🏢 FINAL BOSS</h2>
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <div className="timer-bar">
            <div className="timer-fill" style={{ width: `${(timeLeft / 30) * 100}%` }}></div>
          </div>
        </div>

        <div className="question-card">
          <h3>{questions[currentQuestion].question}</h3>
          <div className="options-container">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={`option-btn  
                  ${selectedAnswer === option ? 'selected' : ''}  
                  ${feedback && option === questions[currentQuestion].correctAnswer ? 'correct' : ''}  
                  ${feedback && selectedAnswer === option && selectedAnswer !== questions[currentQuestion].correctAnswer ? 'wrong' : ''}`}
                onClick={() => handleAnswerSelect(option)}
              >
                {option}
              </button>
            ))}
          </div>
          {feedback && (
            <div className={`feedback ${feedback.includes("Correct") ? 'fade-in-correct' : 'fade-in-wrong'}`}>
              {feedback}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BossQuiz;
