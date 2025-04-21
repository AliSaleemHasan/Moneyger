"use client";
import React from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo-client";
const ApolloWrapper = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloWrapper;
