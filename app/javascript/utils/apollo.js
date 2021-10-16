// app/javascript/utils/apollo.js

// client, cache, links, observable
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  Observable,
} from '@apollo/client';

import { onError } from '@apollo/client/link/error';


export const createCache = () => {
  const cache = new InMemoryCache();
  if (process.env.NODE_ENV === 'development') {
    window.secretVariableToStoreCache = cache;
  }
  return cache;
};


const getToken = () =>
  document.querySelector('meta[name="csrf-token"]').getAttribute('content');

// link with token
const createLinkWithToken = () =>
  new ApolloLink(
    (operation, forward) => {
      console.log('link!')
      operation.setContext(({ headers = {} }) => ({
        headers: {
          ...headers,
          'X-CSRF-Token': getToken(),
        }
      }));

      return forward(operation);
    }
  );

// log erors
const logError = (error) => console.error(error);
// create error link
const createErrorLink = () => onError(({ graphQLErrors, networkError, operation }) => {
  if (graphQLErrors) {
    logError('GraphQL - Error', {
      errors: graphQLErrors,
      operationName: operation.operationName,
      variables: operation.variables,
    });
  }
  if (networkError) {
    logError('GraphQL - NetworkError', networkError);
  }
})

const createHttpLink = () => new HttpLink({
  uri: '/graphql',
  credentials: 'include',
})

export const createClient = (cache, requestLink) => {
  return new ApolloClient({
    link: ApolloLink.from([
      createErrorLink(),
      createLinkWithToken(),
      createHttpLink(),
    ]),
    cache,
  });
};