// app/javascript/components/Provider/index.js
import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { createCache, createClient } from '../../utils/apollo';

export default ({ children }) => (
  <ApolloProvider client={createClient(createCache())}>
    {children}
  </ApolloProvider>
);