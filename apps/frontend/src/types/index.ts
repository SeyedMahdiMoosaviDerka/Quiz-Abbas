export interface Team {
  name: string;
  country: string;
  logoUrl?: string;
}

export interface Quiz {
  id: number;
  question: string;
  options: string[];
}

export interface Event {
  id: number;
  name: string;
  info: string;
  startTime: string;
  sportType?: string;
  homeTeam: Team;
  awayTeam: Team;
  quizzes: Quiz[];
  backgroundImage?: string;
}

export interface UserAnswer {
  questionIndex: number;
  answer: string;
}

export interface AnswerSubmission {
  userId: string;
  eventId: number;
  answers: UserAnswer[];
}
