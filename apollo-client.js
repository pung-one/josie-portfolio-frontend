import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://strapi-production-cf79.up.railway.app/graphql",
  cache: new InMemoryCache(),
});

export default client;
