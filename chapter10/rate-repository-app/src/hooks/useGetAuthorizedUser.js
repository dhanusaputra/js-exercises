import { useQuery } from '@apollo/react-hooks';

import { GET_AUTHORIZED_USER } from '../graphql/queries';

const useGetAuthorizedUser = () => {
	const { data, error, loading } = useQuery(GET_AUTHORIZED_USER, {
		fetchPolicy: 'cache-and-network',
	});

  return { 
    id: data?.authorizedUser?.id,
    loading, 
    error,
  };
};

export default useGetAuthorizedUser;
