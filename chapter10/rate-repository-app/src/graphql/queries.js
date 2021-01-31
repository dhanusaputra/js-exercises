import { gql } from 'apollo-boost';

export const GET_REPOSITORIES = gql`
	query getRepositories{
		repositories {
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
		}
	}
`;
