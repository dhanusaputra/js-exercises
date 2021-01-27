import React from 'react';
import { render } from '@testing-library/react-native'

import { RepositoryListContainer } from '../../components/RepositoryList'

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        pageInfo: {
          totalCount: 8,
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      const formatCount = c => {
        return c >= 1000 ? (c/1000).toFixed(1).replace(/\.0+$/, '') + 'k' : c;
      };

      const { getAllByTestId } = render(<RepositoryListContainer repositories={repositories} />);

      expect(getAllByTestId('fullName')[0]).toHaveTextContent(repositories.edges[0].node.fullName);
      expect(getAllByTestId('description')[0]).toHaveTextContent(repositories.edges[0].node.description);
      expect(getAllByTestId('language')[0]).toHaveTextContent(repositories.edges[0].node.language);
      expect(getAllByTestId('forksCount')[0]).toHaveTextContent(formatCount(repositories.edges[0].node.forksCount));
      expect(getAllByTestId('stargazersCount')[0]).toHaveTextContent(formatCount(repositories.edges[0].node.stargazersCount));
      expect(getAllByTestId('reviewCount')[0]).toHaveTextContent(formatCount(repositories.edges[0].node.reviewCount));
      expect(getAllByTestId('ratingAverage')[0]).toHaveTextContent(repositories.edges[0].node.ratingAverage);

      expect(getAllByTestId('fullName')[1]).toHaveTextContent(repositories.edges[1].node.fullName);
      expect(getAllByTestId('description')[1]).toHaveTextContent(repositories.edges[1].node.description);
      expect(getAllByTestId('language')[1]).toHaveTextContent(repositories.edges[1].node.language);
      expect(getAllByTestId('forksCount')[1]).toHaveTextContent(formatCount(repositories.edges[1].node.forksCount));
      expect(getAllByTestId('stargazersCount')[1]).toHaveTextContent(formatCount(repositories.edges[1].node.stargazersCount));
      expect(getAllByTestId('reviewCount')[1]).toHaveTextContent(formatCount(repositories.edges[1].node.reviewCount));
      expect(getAllByTestId('ratingAverage')[1]).toHaveTextContent(repositories.edges[1].node.ratingAverage);
    });
  });
});
