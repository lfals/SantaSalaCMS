interface IStudent {
  id: string;
  nickname: string;
  name: string;
  profile: string;
  banner: string;
  photos: string[];
  masterTag: string;
  phrases: string[];
  tags: string[];
  phrase: string;
  description: string;
  social: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    github?: string;
  };
}
