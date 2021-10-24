// app/javascript/components/AddItemForm/index.js
import React from 'react';
import AddItemMutation from './operations.graphql';
import ProcessItemForm from '../ProcessItemForm';
import { useMutation } from '@apollo/client';

const AddItemForm = () => {
  const [addItem, { loading }] = useMutation(AddItemMutation);
  return (
    <ProcessItemForm
      buttonText="Add Item"
      loading={loading}
      onProcessItem={({ title, description, imageUrl }) =>
        addItem({
          variables: {
            title,
            description,
            imageUrl,
          },
        })
      }
    />
  );
};

export default AddItemForm;
