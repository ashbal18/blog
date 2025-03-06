export interface UserState {
  objectId: string | null;
  name: string;
  email: string;
}


export interface BlogInput {
  title: string;
  category: string;
  content: string;
  thumbnail: string;
}

export interface IAuthor {
  objectId: string;
  name: string;
  email: string;
}


export interface IBlog {
  image: string;
  objectId: string;
  title: string;
  category: string;
  content: string;
  thumbnail: string;
  author: IAuthor
}