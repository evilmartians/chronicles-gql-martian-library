// /app/javascript/components/Subscription/index.js
import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import {
  UpdateItemSubscription,
  AddItemSubscription,
  LibraryQuery,
} from './operations.graphql';

export const useLibraryQuery = () => {
  const { data, loading, subscribeToMore } = useQuery(LibraryQuery);

  useEffect(() => {
    return subscribeToMore({
      document: UpdateItemSubscription,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const { itemUpdated } = subscriptionData.data;
        return {
          ...prev,
          items: prev.items.map((el) =>
            el.id === itemUpdated.id ? { ...el, ...itemUpdated } : el
          ),
        };
      },
    });
  }, []);

  useEffect(() => {
    return subscribeToMore({
      document: AddItemSubscription,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const { itemAdded } = subscriptionData.data;

        const alreadyInList = prev.items.find((e) => e.id === itemAdded.id);
        if (alreadyInList) {
          return prev;
        }

        return { ...prev, items: prev.items.concat([itemAdded]) };
      },
    });
  }, []);

  return { data, loading };
};
