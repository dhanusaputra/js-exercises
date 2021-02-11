import { gql } from 'apollo-boost';

export const GET_REPOSITORIES = gql`
	query getRepositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String, $first: Int){
		repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword, first: $first) {
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
	query getRepository($id: ID!){
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
      reviews{
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
        }
      }
		}
	}
`;

export const GET_AUTHORIZED_USER = gql`
  query getAuthorizedUser{
    authorizedUser{
      id
      username
    }
  }
`;
