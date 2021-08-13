export const ROLE_ORDINARY = 0;

export const ROLE_ADMIN = 1;

export default interface User {
  id: string;
  username: string;
  role: 0 | 1;
}
