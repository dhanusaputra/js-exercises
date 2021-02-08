import { useQuery } from '@apollo/react-hooks';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (selector) => {
  let orderBy, orderDirection = '';
  if (selector == 'latestRepositories'){
    orderBy = 'CREATED_AT';
    orderDirection = 'DESC';
  } else if (selector == 'highestRatedRepositories'){
    orderBy = 'RATING_AVERAGE';
    orderDirection = 'DESC';
  } else if (selector == 'lowestRatedRepositories'){
    orderBy = 'RATING_AVERAGE';
    orderDirection = 'ASC';
  }

	const { data, error, loading } = useQuery(GET_REPOSITORIES, {
		fetchPolicy: 'cache-and-network',
    variables: { orderBy, orderDirection },
	});

  return { 
    repositories: data?.repositories,
    loading, 
    error
  };
};

export default useRepositories;
