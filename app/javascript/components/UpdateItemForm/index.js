// /app/javascript/components/UpdateItemForm

import React from 'react';
import UpdateItemMutation from './operations.graphql';
import ProcessItemForm from '../ProcessItemForm';
import cs from './styles.module.css';
import { useMutation } from '@apollo/client';

const UpdateItemForm = ({
  id,
  initialTitle,
  initialDescription,
  initialImageUrl,
  onClose,
}) => {
  const [updateItem, { loading }] = useMutation(UpdateItemMutation);
  return (
    <div className={cs.overlay}>
      <div className={cs.content}>
        <ProcessItemForm
          initialImageUrl={initialImageUrl}
          initialTitle={initialTitle}
          initialDescription={initialDescription}
          buttonText="Update Item"
          loading={loading}
          onProcessItem={({ title, description, imageUrl }) => {
            updateItem({
              variables: {
                id,
                title,
                description,
                imageUrl,
              },
            });
            onClose();
          }}
        />
        <button className={cs.close} onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default UpdateItemForm;
