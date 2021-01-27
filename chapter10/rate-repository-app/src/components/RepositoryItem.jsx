import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

import Text from './Text';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
  },

  // header
  headerContainer: {
    flexDirection: 'row',
    flexGrow: 1,
  },
  headerInfoContainer: {
    flex: 1,
    flexGrow: 1,
  },
  avatarContainer: {
    flexGrow: 0,
    paddingRight: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 50 / 10,
  },

  // body
  bodyContainer: {
    paddingTop: 10,
    flexDirection: 'row',
    flexGrow: 1,
  },
  bodyItemContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
});

const RepositoryItem = ({ item  }) => (
  <View style={styles.container}>
    <RepositoryItemHeader item={item}/>
    <RepositoryItemBody item={item}/>
  </View>
);

const RepositoryItemHeader = ({ item }) => (
    <View style={styles.headerContainer}>
      <View style={styles.avatarContainer}>
        <Image 
          style={styles.avatar} 
          source={{uri: item.ownerAvatarUrl}}
        />
      </View>
      <View style={styles.headerInfoContainer}>
        <Text fontWeight='bold' testID='fullName'>{item.fullName}</Text>
        <Text color='secondary' testID='description'>{item.description}</Text>
        <Text style={{ alignSelf: 'flex-start', padding: 5, borderRadius: 5, backgroundColor: '#0366d6', color: 'white' }} testID='language'>{item.language}</Text>
      </View>
    </View>
);

const RepositoryItemBody= ({ item }) => (
  <View style={styles.bodyContainer}>
    <View style={styles.bodyItemContainer}>
      <Text fontWeight='bold' testID='stargazersCount'>{formatCount(item.stargazersCount)}</Text>
      <Text color='secondary'>Stars</Text>
    </View>
    <View style={styles.bodyItemContainer}>
      <Text fontWeight='bold' testID='forksCount'>{formatCount(item.forksCount)}</Text>
      <Text color='secondary'>Forks</Text>
    </View>
    <View style={styles.bodyItemContainer}>
      <Text fontWeight='bold' testID='reviewCount'>{formatCount(item.reviewCount)}</Text>
      <Text color='secondary'>Reviews</Text>
    </View>
    <View style={styles.bodyItemContainer}>
      <Text fontWeight='bold' testID='ratingAverage'>{item.ratingAverage}</Text>
      <Text color='secondary'>Rating</Text>
    </View>
  </View>
);

const formatCount = c => {
  return c >= 1000 ? (c/1000).toFixed(1).replace(/\.0+$/, '') + 'k' : c;
};

export default RepositoryItem;
