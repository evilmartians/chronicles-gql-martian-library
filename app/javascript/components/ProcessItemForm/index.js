// app/javascript/components/ProcessItemForm/index.js

import React, { useState } from 'react';
import cs from './styles';

const ProcessItemForm = ({
  initialTitle = '',
  initialDescription = '',
  initialImageUrl = '',
  onProcessItem,
  buttonText,
  loading,
  errors,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  return (
    <div className={cs.form}>
      {errors && (
        <div className={cs.errors}>
          <div className="error">{errors.fullMessages.join('; ')}</div>
        </div>
      )}
      <input
        type="text"
        placeholder="title"
        value={title}
        className={cs.input}
        onChange={e => setTitle(e.currentTarget.value)}
      />
      <input
        type="text"
        placeholder="description"
        value={description}
        className={cs.input}
        onChange={e => setDescription(e.currentTarget.value)}
      />

      <input
        type="text"
        placeholder="url"
        value={imageUrl}
        className={cs.input}
        onChange={e => setImageUrl(e.currentTarget.value)}
      />
      {loading ? (
        '...Loading'
      ) : (
        <button
          onClick={() => onProcessItem({ title, description, imageUrl })}
          className={cs.button}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
};

export default ProcessItemForm;
