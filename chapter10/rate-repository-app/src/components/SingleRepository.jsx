import React from 'react';
import { useParams } from 'react-router-native';
import { FlatList, View, StyleSheet } from 'react-native';
import { format } from 'date-fns';

import RepositoryItem from './RepositoryItem';
import useRepository from '../hooks/useRepository';
import Text from './Text';
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

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.reviewContainer}>
      <View style={styles.ratingContainer}>
        <Text color='primary' fontWeight='bold'>{review.rating}</Text>
      </View>
      <View style={styles.bodyContainer}>
        <View style={styles.titleContainer}>
          <Text fontWeight='bold'>{review.user.username}</Text>
          <Text color='secondary'>{format(new Date(review.createdAt), 'dd.MM.yyyy')}</Text>
        </View>
        <Text>{review.text}</Text>
      </View>
    </View>
  )
};

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, reviews } = useRepository({ id });

  if (!repository) return null;

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
    />
  )
};

export default SingleRepository;
