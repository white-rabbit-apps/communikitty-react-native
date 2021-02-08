import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import AsyncStorage from "@react-native-community/async-storage";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";

const httpLink = createUploadLink({
  uri: `https://reshare.community/graphql`
});

const getToken = async () => {
  const session = await AsyncStorage.getItem('@communikitty-graphql:session');
  if (session) {
    return JSON.parse(session);
  }
  return {};
}

const authLink = setContext(async (req, { headers }) => {
  const token = await getToken();

  return {
    headers: {
      ...headers,
      ...token
    }
  };
});

const link = authLink.concat(httpLink);
const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          activityFeeds: {
            keyArgs: [],
            merge(existing, incoming, { args: { pageSize = 10, page = 1 }}) {
              // Slicing is necessary because the existing data is
              // immutable, and frozen in development.
              const merged = existing ? existing.slice(0) : [];
              for (let i = 0; i < incoming.length; ++i) {
                merged[(pageSize * page) + i] = incoming[i];
              }
              return merged;
            },
          },
        },
      },
    },
  })
});
export default client;