export type Message = {
  id: number;
  avatar: string;
  name: string;
  message: string;
};

interface User {
  id: number;
  avatar: string;
  messages: Message[];
  name: string;
}

export type UserData = {
  id: number;
  avatar: string;
  messages: {
    id: number;
    avatar: string;
    name: string;
    message: string;
  }[];
  name: string;
};

export type LoggedInUserData = {
  id: number;
  avatar: string;
  name: string;
};
