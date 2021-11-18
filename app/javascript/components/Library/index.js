// app/javascript/components/Library
import React, { useState } from 'react';
import cs from './styles.module.css';
import UpdateItemForm from '../UpdateItemForm';
import { useLibraryQuery } from './useLibraryQuery';

const Library = () => {
  const [item, setItem] = useState(null);
  const { data, loading } = useLibraryQuery();
  return (
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
      {item !== null && (
        <UpdateItemForm
          id={item.id}
          initialTitle={item.title}
          initialDescription={item.description}
          initialImageUrl={item.imageUrl}
          onClose={() => setItem(null)}
        />
      )}
    </div>
  );
};

export default Library;
