import React, { useRef, useEffect } from 'react';
import cs from './styles.module.css';
import { useQuery, useMutation } from '@apollo/client';
import { Me, SignMeIn } from './operations.graphql';

const UserInfo = () => {
  const { data, loading } = useQuery(Me);
  const [signIn, { data: signInPayload, error }] = useMutation(SignMeIn, {
    update(cache, mutationResult) {
      const me = mutationResult?.data?.signIn?.user;
      if (me)
        cache.writeQuery({
          query: Me,
          data: { me },
        });
    },
  });

  const input = useRef(null);

  const token = signInPayload?.signIn.token;
  const me = data?.me;

  useEffect(() => {
    if (token) {
      localStorage.setItem('mlToken', token);
    }
  }, [token]);

  if (loading) return '...Loading';

  if (!me) {
    return (
      <form
        onSubmit={(event) => {
          event.preventDefault();
          signIn({
            variables: { email: input.current.value },
          });
        }}
      >
        <input
          ref={input}
          type="email"
          className={cs.input}
          placeholder="your email"
        />
        {error && <span>{error.message}</span>}
      </form>
    );
  }

  return <div className={cs.info}>😈 {me?.fullName}</div>;
};

export default UserInfo;
