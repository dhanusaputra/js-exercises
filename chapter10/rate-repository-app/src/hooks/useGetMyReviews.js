import { useQuery } from '@apollo/react-hooks';

import { GET_AUTHORIZED_USER } from '../graphql/queries';

const useGetMyReviews = () => {
	const { data, error, loading, refetch } = useQuery(GET_AUTHORIZED_USER, {
		fetchPolicy: 'cache-and-network',
    variables: { includeReviews: true }
	});

  return { 
    id: data?.authorizedUser?.id,
    reviews: data?.authorizedUser?.reviews,
    loading, 
    error,
    refetch,
  };
};

export default useGetMyReviews;
