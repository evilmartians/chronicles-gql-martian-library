// app/javascript/components/Library/index.js
import React from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import UserInfo from '../UserInfo';

const LibraryQuery = gql`
  {
    items {
      id
      title
      user {
        email
      }
    }
  }
`;

export default () => {
  const { data, loading } = useQuery(LibraryQuery);
  return (
    <div>
      <UserInfo />
      {loading
        ? 'loading...'
        : data.items.map(({ title, id, user }) => (
            <div key={id}>
              <b>{title}</b> {user ? `added by ${user.email}` : null}
            </div>
          ))}
    </div>
  );
};
