import React, { useRef } from 'react';
import { Query, Mutation } from 'react-apollo';
import { Me, SignMeIn } from './operations.graphql';
import cs from './styles';

const UserInfo = () => {
  const input = useRef(null);

  return (
    <div className={cs.panel}>
      <Query query={Me}>
        {({ data, loading }) => {
          if (loading) return '...Loading';
          if (!data.me) {
            return (
              <Mutation
                mutation={SignMeIn}
                update={(cache, { data: { signIn } }) => {
                  cache.writeQuery({
                    query: Me,
                    data: { me: signIn.user },
                  });
                }}
              >
                {(signIn, { loading: authenticating, error /* new key */ }) =>
                  authenticating ? (
                    '...'
                  ) : (
                    <div className={cs.signIn}>
                      <form
                        onSubmit={event => {
                          event.preventDefault();
                          signIn({
                            variables: { email: input.current.value },
                          }).then(({ data: { signIn: { token } } }) => {
                            if (token) {
                              localStorage.setItem('mlToken', token);
                            }
                          });
                        }}
                      >
                        <input
                          ref={input}
                          type="email"
                          className={cs.input}
                          placeholder="your email"
                        />
                        <input
                          type="submit"
                          className={cs.button}
                          value="Sign In"
                        />
                        {error && <span className={cs.error}>{error.message}</span>}
                      </form>
                    </div>
                  )
                }
              </Mutation>
            );
          }

          const { fullName } = data.me;
          return <div className={cs.info}>😈 {fullName}</div>;
        }}
      </Query>
    </div>
  );
};

export default UserInfo;
