export type AuthenticationStatus =
  | { isAuthenticated: true; userId: number }
  | { isAuthenticated: false };
