interface UserAnswer {
  questionIndex: number;
  answer: string;
}

export class CreateAnswerDto {
  userId: string;
  eventId: number;
  answers: UserAnswer[];
}
