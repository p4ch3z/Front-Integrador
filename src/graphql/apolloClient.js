// apolloClient.js
import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql/", // Ajusta al endpoint real de tu backend
  cache: new InMemoryCache(),
  credentials: "include", // si usas cookies para autenticación
});

export default client;
