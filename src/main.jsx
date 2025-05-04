import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./components/RoleSelector";
import { ApolloProvider } from "@apollo/client";
import client from "./graphql/apolloClient";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);