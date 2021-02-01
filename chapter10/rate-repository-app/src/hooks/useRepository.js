import { useQuery } from '@apollo/react-hooks';

import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = ({ id }) => {
	const { data, error, loading } = useQuery(GET_REPOSITORY, {
		fetchPolicy: 'cache-and-network',
    variables: { id },
	});

  return { 
    repository: data?.repository,
    reviews: data?.repository?.reviews,
    loading, 
    error
  };
};

export default useRepository;
