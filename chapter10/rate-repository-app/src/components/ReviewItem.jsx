import React from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { format } from 'date-fns';
import { useHistory } from 'react-router-native';

import useDeleteReview from '../hooks/useDeleteReview';
import Text from './Text';
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


const ReviewItem = ({ review, refetch, showButton }) => {
  return (
    <View style={styles.container}>
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
      { showButton && <ReviewItemButton review={review} refetch={refetch}/> }
    </View>
  )
};

const ReviewItemButton = ({ review, refetch }) => {
  const history = useHistory();

  const [deleteReview] = useDeleteReview();

  const onDelete = (values) => {
    const { id } = values;
    try {
      Alert.alert(
        'Delete review',
        'Are you sure you want to delete this review?',
        [
          {
            text: 'CANCEL',
            style: 'cancel'
          },
          {
            text: 'DELETE',
            onPress: async () => {
              const response = await deleteReview({ id });
              console.log(response);
              refetch();
            }
          }
        ],
        { cancelable: false }
      )
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <View style={styles.buttonsContainer}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => history.push(`/${review.repositoryId}`)}>
          <Text type='button' fontWeight='bold'>View repository</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={onDelete}>
          <Text type='redButton' fontWeight='bold'>Delete review</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
};

export default ReviewItem;
