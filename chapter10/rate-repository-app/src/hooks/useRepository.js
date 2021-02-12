import { useQuery } from '@apollo/react-hooks';

import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (variables) => {
	const { data, error, loading, fetchMore, ...result } = useQuery(GET_REPOSITORY, {
		fetchPolicy: 'cache-and-network',
    variables,
	});

  const handleFetchMore = async () => {
    const canFetchMore = !loading && data && data.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    try {
      await fetchMore({
        query: GET_REPOSITORY,
        variables: {
          after: data.repository.reviews.pageInfo.endCursor,
          ...variables,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const nextResult = {
            repository: {
              ...fetchMoreResult.repository,
              reviews: {
                ...fetchMoreResult.repository.reviews,
                edges: [
                  ...previousResult.repository.reviews.edges,
                  ...fetchMoreResult.repository.reviews.edges,
                ],
              },
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
    repository: data?.repository,
    reviews: data?.repository?.reviews,
    loading, 
    error,
    fetchMore: handleFetchMore,
    ...result,
  };
};

export default useRepository;
