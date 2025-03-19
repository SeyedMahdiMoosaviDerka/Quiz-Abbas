import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Event, AnswerSubmission } from '../types';
import { submitAnswers as submitAnswersApi } from '../api/events';

interface QuizContextType {
  userId: string;
  currentEvent: Event | null;
  answers: Record<string, string>;
  submittedEvents: Set<number>;
  setCurrentEvent: (event: Event | null) => void;
  setAnswer: (eventId: number, questionIndex: number, answer: string) => void;
  submitAnswers: (eventId: number) => Promise<void>;
  resetQuiz: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userId, setUserId] = useLocalStorage<string>('quizUserId', uuidv4());
  const [currentEvent, setCurrentEventState] = useState<Event | null>(null);
  const [answers, setAnswers] = useLocalStorage<Record<string, string>>(
    'quizAnswers',
    {}
  );
  const [submittedEvents, setSubmittedEvents] = useLocalStorage<Set<number>>(
    'submittedEvents',
    new Set()
  );

  const setCurrentEvent = useCallback(
    (event: Event | null) => {
      setCurrentEventState(event);
      if (event && !userId) setUserId(uuidv4());
    },
    [setUserId]
  );

  useEffect(() => {
    if (!currentEvent && !submittedEvents.size) setUserId(uuidv4());
  }, [currentEvent, submittedEvents, setUserId]);

  const setAnswer = useCallback(
    (eventId: number, questionIndex: number, answer: string) => {
      setAnswers((prev) => ({
        ...prev,
        [`${eventId}-${questionIndex}`]: answer,
      }));
    },
    [setAnswers]
  );

  const submitAnswers = useCallback(
    async (eventId: number) => {
      const eventAnswers =
        currentEvent?.quizzes.map((q, idx) => ({
          questionIndex: idx,
          answer: answers[`${eventId}-${idx}`] || '',
        })) || [];
      const submission: AnswerSubmission = {
        userId,
        eventId,
        answers: eventAnswers,
      };
      await submitAnswersApi(submission);

      setSubmittedEvents((prev) => new Set(prev).add(eventId));
      setCurrentEvent(null);
      setAnswers({});
    },
    [
      userId,
      currentEvent,
      answers,
      setSubmittedEvents,
      setAnswers,
      setCurrentEvent,
      setUserId,
    ]
  );

  const resetQuiz = useCallback(() => {
    setUserId(uuidv4());
    setAnswers({});
    setCurrentEvent(null);
  }, [setUserId, setAnswers, setCurrentEvent]);

  return (
    <QuizContext.Provider
      value={{
        userId,
        currentEvent,
        answers,
        submittedEvents,
        setCurrentEvent,
        setAnswer,
        submitAnswers,
        resetQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) throw new Error('useQuiz must be used within a QuizProvider');
  return context;
};
