export interface User {
  email: string;
  password: string;
  name: string;
  followers: string[];
  following: string[];
  createdEvents: string[];
  likedEvents: string[];
  savedEvents: string[];
  profilePicture: string;
}
