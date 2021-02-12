import { useQuery } from '@apollo/react-hooks';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ({ selector, searchKeyword, first }) => {
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

  const variables = { orderBy, orderDirection, searchKeyword, first };
	const { data, error, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
		fetchPolicy: 'cache-and-network',
    variables,
	});

  const handleFetchMore = async () => {
    const canFetchMore = !loading && data && data.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    try {
      await fetchMore({
        query: GET_REPOSITORIES,
        variables: {
          after: data.repositories.pageInfo.endCursor,
          ...variables,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const nextResult = {
            repositories: {
              ...fetchMoreResult.repositories,
              edges: [
                ...previousResult.repositories.edges,
                ...fetchMoreResult.repositories.edges,
              ],
            },
          };

          return nextResult;
        },
      });
    } catch(e) {
      console.log(e);
    }
  };

  return { 
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    loading, 
    error,
    ...result,
  };
};

export default useRepositories;
