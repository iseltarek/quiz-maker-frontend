export interface AuthResponse {
  verificationToken: string;
  user: {
    id: number;
    email: string;
    username: string;
    role: string;
  };
}
