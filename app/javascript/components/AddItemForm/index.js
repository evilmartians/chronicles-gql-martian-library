// app/javascript/components/AddItemForm/index.js
import React from 'react';
import AddItemMutation from './operations.graphql';
import LibraryQuery from '../Library/operations.graphql';
import ProcessItemForm from '../ProcessItemForm';
import { useMutation } from '@apollo/client';

const AddItemForm = () => {
  const [addItem, { loading }] = useMutation(AddItemMutation, {
    // adding the second argument to 'addItem' method
    update: (cache, { data: { addItem, errors } }) => {
      const item = addItem.item;
      if (item) {
        const currentItems = cache.readQuery({ query: LibraryQuery });
        cache.writeQuery({
          query: LibraryQuery,
          data: {
            items: [item].concat(currentItems.items),
          },
        });
      }
    },
  });
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
      errors={errors}
    />
  );
};

export default AddItemForm;
