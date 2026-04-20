export interface Question {
  id: string;
  name: string;
  email: string;
  question: string;
  date: string;
  status: 'pending' | 'answered';
  answer?: string | null;
  answerDate?: string;
}

export interface QuestionsState {
  questions: Question[];
  loading: boolean;
  error: string | null;
} 