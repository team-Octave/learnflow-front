export interface User {
  userId: string;
  userEmail: string;
  nickname: string;
  role: 'MEMBER' | 'ADMIN';
  createdAt: string;
}
