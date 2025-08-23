import { createContext } from "react";

type AuthValue = {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
};

const AuthContext = createContext<AuthValue>({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
});

export default AuthContext;
