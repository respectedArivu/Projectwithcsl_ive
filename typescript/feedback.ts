// typescript/feedback.ts
export type Feedback = {
  name: string;
  email: string;
  message: string;
  rating?: number;
  submitted_at?: string;
  $: any; // Contentstack metadata
};

export type Feedbacks = Feedback[];
