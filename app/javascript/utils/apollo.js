// app/javascript/utils/apollo.js

// client, cache, links, observable
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  Observable,
  split,
} from '@apollo/client';

import { onError } from '@apollo/client/link/error';

import ActionCable from 'actioncable';
import ActionCableLink from 'graphql-ruby-client/subscriptions/ActionCableLink';

const CABLE_PORT = '3000';

const getCableUrl = () => {
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  const host = window.location.hostname;
  const authToken = localStorage.getItem('mlToken');
  return `${protocol}//${host}:${CABLE_PORT}/cable?token=${authToken}`;
};

const createActionCableLink = () => {
  const cable = ActionCable.createConsumer(getCableUrl());
  return new ActionCableLink({ cable });
};

const hasSubscriptionOperation = ({ query: { definitions } }) =>
  definitions.some(
    ({ kind, operation }) =>
      kind === 'OperationDefinition' && operation === 'subscription'
  );

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

  const mlToken = localStorage.getItem('mlToken');
  if (mlToken) {
    tokens['Authorization'] = localStorage.getItem('mlToken');
  }

  return tokens;
};

// link with token
const createLinkWithToken = () =>
  new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        ...getTokens(),
      },
    }));

    return forward(operation);
  });

// log erors
const logError = (error) => console.error(error);
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
      split(
        hasSubscriptionOperation,
        createActionCableLink(),
        createHttpLink()
      ),
    ]),
    cache,
  });
};
