import React from 'react';
import { useParams } from 'react-router-native';
import { FlatList, View, StyleSheet } from 'react-native';

import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';
import useRepository from '../hooks/useRepository';
import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },

  infoContainer: {
    marginBottom: 10,
  },

  reviewContainer: {
    backgroundColor: 'white',
    padding: 10,
    flexDirection: 'row',
  },

  ratingContainer: {
    flexGrow: 0,
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
    textAlign: 'center',
    justifyContent: 'center',
    borderColor: theme.colors.primary,
    borderWidth: 3,
    marginRight: 10,
  },

  bodyContainer: {
    flex: 1,
    flexGrow: 1,
  },

  titleContainer: {
    marginBottom: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = ({ repository }) => {
  return (
    <View style={styles.infoContainer}>
      <RepositoryItem item={repository} showButton/>
    </View>
  )
};

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, reviews, fetchMore } = useRepository({
    id,
    first: 4,
  });

  if (!repository) return null;

  const onEndReach = () => {
    fetchMore();
  };

	const reviewNodes = reviews
    ? reviews.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={ () => <RepositoryInfo repository={repository} />}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  )
};

export default SingleRepository;
