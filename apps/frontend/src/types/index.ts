// frontend/src/types/index.ts
export interface Team {
  name: string;
  country: string;
  logoUrl?: string; // Optional, matches backend
}

export interface Quiz {
  id: number;
  question: string;
  options: string[];
}

export interface Event {
  id: number; // Changed from string to number to match backend
  name: string; // Renamed from title to match backend
  info: string; // Renamed from subtitle to match backend
  startTime: string; // ISO string, will be parsed as needed
  sportType?: string; // Optional, matches backend
  homeTeam: Team;
  awayTeam: Team;
  quizzes: Quiz[]; // Renamed from questions to match backend
  backgroundImage?: string; // Frontend-specific, not from backend
}

export interface UserAnswer {
  questionIndex: number; // Matches backend Answer entity
  answer: string;
}

export interface AnswerSubmission {
  userId: string;
  eventId: number;
  answers: UserAnswer[];
}
