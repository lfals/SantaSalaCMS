export interface Iprofessor {
  id: string;
  banner: string;
  profile: string;
  nickname: string;
  name: string;
  social: {
    emails: string;
    linkedin?: string;
  };
  phrase: string;
  subjects: string[];
  masterSubject: string;
  description: string;
  phrases: string[];
}
