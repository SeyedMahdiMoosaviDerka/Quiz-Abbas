export interface UserAnswer {
  id: string;
  eventId: string;
  answer: string;
}

export interface Team {
  name: string;
  country: string;
  logo?: string;
}
export interface Questions {
  title: string;
  answers: Array<{
    value: string;
    label: string;
  }>;
}
export interface Event {
  id: string;
  title: string;
  subtitle: string;
  homeTeam: Team;
  awayTeam: Team;
  questions: Questions[];
  backgroundImage?: string;
  userAnswers: UserAnswer[];
}
