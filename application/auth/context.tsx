import React from "react";

interface AuthContextProps {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
}

const AuthContext = React.createContext<AuthContextProps | null>(null);

export default AuthContext;
