import { useMutation } from '@apollo/react-hooks';

import { AUTHORIZE } from '../graphql/mutations';

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHORIZE);

  const signIn = async ({ username, password }) => {
    const response = await mutate({ variables: { username, password } });
    return response;
  };

  return [signIn, result];
};

export default useSignIn;
