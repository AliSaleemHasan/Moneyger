"use client";
import { User } from "generated";
import React, { FC } from "react";
import { createContext } from "react";

interface IAuthProviderProps {
  user?: Partial<User>;
  children: React.ReactNode;
}

export const UserContext = createContext<Partial<User> | undefined>(undefined);

const AuthProvider: FC<IAuthProviderProps> = ({ user, children }) => {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default AuthProvider;
