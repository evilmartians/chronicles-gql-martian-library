// app/javascript/components/Library
import React, { useState } from 'react';
import { Query } from 'react-apollo';
import { LibraryQuery } from './operations.graphql';
import cs from './styles';

const Library = () => {
  const [item, setItem] = useState(null);
  return (
    <Query query={LibraryQuery}>
      {({ data, loading }) => (
        <div className={cs.library}>
          {loading || !data.items
            ? 'loading...'
            : data.items.map(({ title, id, user, imageUrl, description }) => (
                <button
                  key={id}
                  className={cs.plate}
                  onClick={() => setItem({ title, imageUrl, id, description })}
                >
                  <div className={cs.title}>{title}</div>
                  <div>{description}</div>
                  {imageUrl && <img src={imageUrl} className={cs.image} />}
                  {user ? (
                    <div className={cs.user}>added by {user.email}</div>
                  ) : null}
                </button>
              ))}
        </div>
      )}
    </Query>
  );
};

export default Library;
