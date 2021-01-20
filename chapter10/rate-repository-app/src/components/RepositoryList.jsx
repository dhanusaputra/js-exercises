import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/react-hooks';

import RepositoryItem from './RepositoryItem';
import { GET_REPOSITORIES } from '../graphql/queries';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListContainer = ({ data }) => {
  if (!data) return null;

  return (
    <FlatList
      data={data.repositories.edges}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <RepositoryItem item={item.node}/>
      )}
    />
  );
};

const RepositoryList = () => {
  const { data } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
  });

  return <RepositoryListContainer repositories={data} />;
}

export default RepositoryList;
