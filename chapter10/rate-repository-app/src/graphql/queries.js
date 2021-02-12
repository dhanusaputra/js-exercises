import { gql } from 'apollo-boost';

export const GET_REPOSITORIES = gql`
	query getRepositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String, $first: Int, $after: String){
		repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword, first: $first, after: $after) {
			edges{
				node{
          id
          ownerAvatarUrl
					fullName
					description
					language
					stargazersCount
					forksCount
					reviewCount
					ratingAverage
				}
        cursor
			}
      pageInfo {
        endCursor
        startCursor
        totalCount
        hasNextPage
      }
		}
	}
`;

export const GET_REPOSITORY = gql`
	query getRepository($id: ID!, $first: Int, $after: String){
		repository(id: $id) {
      id
      url
      ownerAvatarUrl
      fullName
      description
      language
      stargazersCount
      forksCount
      reviewCount
      ratingAverage
      reviews(first: $first, after: $after){
        edges{
          node{
            id
            text
            rating
            createdAt
            user{
              id
              username
            }
          }
          cursor
        }
        pageInfo{
          hasNextPage
          totalCount
          startCursor
          endCursor
        }
      }
		}
	}
`;

export const GET_AUTHORIZED_USER = gql`
  query getAuthorizedUser($includeReviews: Boolean = false){
    authorizedUser{
      id
      username
      reviews @include(if: $includeReviews) {
        edges{
          node{
            id
            text
            rating
            createdAt
            user{
              id
              username
            }
            repositoryId
          }
          cursor
        }
        pageInfo{
          hasNextPage
          totalCount
          startCursor
          endCursor
        }
      }
    }
  }
`;
