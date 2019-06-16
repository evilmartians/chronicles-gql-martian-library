// client
import { ApolloClient } from 'apollo-client';
// cache
import { InMemoryCache } from 'apollo-cache-inmemory';
// links
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink, Observable } from 'apollo-link';
export const createCache = () => {
  const cache = new InMemoryCache();
  if (process.env.NODE_ENV === 'development') {
    window.secretVariableToStoreCache = cache;
  }
  return cache;
};

const getTokens = () => {
  const tokens = {
    'X-CSRF-Token': document
      .querySelector('meta[name="csrf-token"]')
      .getAttribute('content'),
  };
  const authToken = localStorage.getItem('mlToken');
  return authToken ? { ...tokens, Authorization: authToken } : tokens;
};

const tokens = getTokens();
const setTokenForOperation = async operation =>
  operation.setContext({
    headers: {
      ...tokens,
    },
  });

// link with token
const createLinkWithToken = () =>
  new ApolloLink(
    (operation, forward) =>
      new Observable(observer => {
        let handle;
        Promise.resolve(operation)
          .then(setTokenForOperation)
          .then(() => {
            handle = forward(operation).subscribe({
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer),
            });
          })
          .catch(observer.error.bind(observer));
        return () => {
          if (handle) handle.unsubscribe();
        };
      })
  );

// log erors
const logError = error => console.error(error);
// create error link
const createErrorLink = () =>
  onError(({ graphQLErrors, networkError, operation }) => {
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
  });

const createHttpLink = () =>
  new HttpLink({
    uri: '/graphql',
    credentials: 'include',
  });

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
