import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';

import useGetMyReviews from '../hooks/useGetMyReviews';
import ReviewItem from './ReviewItem';
import theme from '../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
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
  
  buttonContainer: {
    flex: 1,
    flexGrow: 1,
  },
  
  buttonsContainer: {
    backgroundColor: 'white',
    paddingBottom: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const Review = () => {
  const { reviews, refetch } = useGetMyReviews();

  if (!reviews) return null;


	const reviewNodes = reviews
    ? reviews.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={reviewNodes}
      renderItem={({ item }) => <ReviewItem review={item} refetch={refetch} showButton />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
    />
  )
};

export default Review;
