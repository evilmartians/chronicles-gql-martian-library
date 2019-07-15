// /app/javascript/components/UpdateItemForm

import React from 'react';
import { Mutation } from 'react-apollo';
import { UpdateItemMutation } from './operations.graphql';
import ProcessItemForm from '../ProcessItemForm';
import cs from './styles';

const UpdateItemForm = ({
  id,
  initialTitle,
  initialDescription,
  initialImageUrl,
  onClose,
  onErrors,
  errors,
}) => (
  <div className={cs.overlay}>
    <div className={cs.content}>
      <Mutation mutation={UpdateItemMutation}>
        {(updateItem, { loading }) => (
          <ProcessItemForm
            initialImageUrl={initialImageUrl}
            initialTitle={initialTitle}
            initialDescription={initialDescription}
            errors={errors}
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
                optimisticResponse: {
                  __typename: 'Mutation',
                  updateItem: {
                    __typename: 'UpdateItemMutationPayload',
                    item: {
                      id,
                      __typename: 'Item',
                      title,
                      description,
                      imageUrl,
                    },
                    errors: null,
                  },
                },
              }).then(({ data }) => {
                onErrors(data.updateItem.errors);
              });
              onClose();
            }}
          />
        )}
      </Mutation>
      <button className={cs.close} onClick={onClose}>
        Close
      </button>
    </div>
  </div>
);

export default UpdateItemForm;
