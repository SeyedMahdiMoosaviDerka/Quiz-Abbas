const SummaryCard = () => {
  const event = {
    name: 'Juventus Turin vs SSC Napoli',
    details: 'Serie A - Sunday 20:45',
    reward: '50.00 USDT',
    questions: [
      {
        question: 'Number of goals?',
        userAnswer: '3',
        correctAnswer: '3',
        isCorrect: true,
      },
      {
        question: 'First team to score?',
        userAnswer: 'Juventus Turin',
        correctAnswer: 'SSC Napoli',
        isCorrect: false,
      },
      {
        question: 'Will there be a penalty?',
        userAnswer: 'Yes',
        correctAnswer: 'Yes',
        isCorrect: true,
      },
      {
        question: 'Total corners?',
        userAnswer: '5',
        correctAnswer: '5',
        isCorrect: true,
      },
      {
        question: 'Player to score first?',
        userAnswer: 'Victor Osimhen',
        correctAnswer: 'Victor Osimhen',
        isCorrect: true,
      },
    ],
    totalScore: '4/5',
  };

  return (
    <div className="max-w-md mx-auto bg-[#2A2E34] shadow-lg p-6 text-white mt-10 rounded-[6px]">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold flex items-center justify-center gap-2">
          <span role="img" aria-label="summery">
            📋
          </span>
          Summary
        </h2>
        <h3 className="text-lg mt-2">{event.name}</h3>
        <p className="text-sm text-gray-400">{event.details}</p>
        <p className="text-lg mt-3 flex items-center justify-center gap-2">
          <span role="img" aria-label="hoorey">
            🎉
          </span>
          You won
          <span className="text-[#00FF85] font-bold">{event.reward}</span>!
        </p>
      </div>

      <div className="space-y-4">
        {event.questions.map((q, index) => (
          <div key={index} className="bg-[#1E2226] rounded-lg p-4">
            <p className="text-sm font-medium">
              Question {index + 1}: {q.question}
            </p>
            <p className="text-sm mt-1">Your Answer: {q.userAnswer}</p>
            <p className="text-sm flex items-center gap-2">
              Correct Answer: {q.correctAnswer}
              {q.isCorrect ? (
                <span role="img" aria-label="ok" className="text-[#00FF85]">
                  ✅
                </span>
              ) : (
                <span className="text-red-500">❌</span>
              )}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <p className="text-lg">
          Total Score:{' '}
          <span className="text-[#00FF85]">{event.totalScore}</span>
        </p>
        <div className="flex justify-center gap-4 mt-4">
          <button className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200">
            Retry
          </button>
          <button className="bg-[#00FF85] text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors duration-200">
            Back to Events
          </button>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
