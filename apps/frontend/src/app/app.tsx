import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface Event {
  id: number;
  name: string;
  startTime: string;
  info: string;
}

interface Quiz {
  id: number;
  question: string;
  answers: string[];
}

function App() {
  const [userId] = useState(uuidv4());
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/events')
      .then((res) => res.json())
      .then((res) => setEvents(res.data));
  }, []);

  const startQuiz = (event: Event) => {
    setSelectedEvent(event);
    fetch(`http://localhost:3000/api/events/${event.id}/quizzes`)
      .then((res) => res.json())
      .then((res) => setQuizzes(res.data));
  };

  const submitAnswer = (answerIndex: number) => {
    const newAnswers = [...answers, answerIndex];
    setAnswers(newAnswers);

    if (currentQuizIndex < quizzes.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
    } else {
      quizzes.forEach((quiz, idx) => {
        fetch('http://localhost:3000/api/answers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId,
            quizId: quiz.id,
            selectedAnswer: newAnswers[idx],
          }),
        });
      });
    }
  };

  if (
    selectedEvent &&
    quizzes.length > 0 &&
    currentQuizIndex < quizzes.length
  ) {
    const quiz = quizzes[currentQuizIndex];
    return (
      <div>
        <h2>{quiz.question}</h2>
        {quiz.answers.map((answer, idx) => (
          <button key={idx} onClick={() => submitAnswer(idx)}>
            {answer}
          </button>
        ))}
      </div>
    );
  }

  if (selectedEvent && currentQuizIndex >= quizzes.length) {
    return (
      <div>
        <h2>Summary</h2>
        {quizzes.map((quiz, idx) => (
          <p key={quiz.id}>
            {quiz.question}: {quiz.answers[answers[idx]]}
          </p>
        ))}
      </div>
    );
  }

  return (
    <div>
      <h1>Sports Events</h1>
      {events.map((event) => (
        <div key={event.id}>
          <h2>{event.name}</h2>
          <p>{new Date(event.startTime).toLocaleString()}</p>
          <p>{event.info}</p>
          <button onClick={() => startQuiz(event)}>Start Quiz</button>
        </div>
      ))}
    </div>
  );
}

export default App;
