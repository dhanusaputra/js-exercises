import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

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
          source={item.ownerAvatarUrl}
        />
      </View>
      <View style={styles.headerInfoContainer}>
        <Text>{item.fullName}</Text>
        <Text>{item.description}</Text>
        <Text>{item.language}</Text>
      </View>
    </View>
);

const RepositoryItemBody= ({ item }) => (
  <View style={styles.bodyContainer}>
    <View style={styles.bodyItemContainer}>
      <Text>{formatCount(item.stargazersCount)}</Text>
      <Text>Stars</Text>
    </View>
    <View style={styles.bodyItemContainer}>
      <Text>{formatCount(item.forksCount)}</Text>
      <Text>Forks</Text>
    </View>
    <View style={styles.bodyItemContainer}>
      <Text>{formatCount(item.reviewCount)}</Text>
      <Text>Reviews</Text>
    </View>
    <View style={styles.bodyItemContainer}>
      <Text>{item.ratingAverage}</Text>
      <Text>Rating</Text>
    </View>
  </View>
);

const formatCount = c => {
  return c >= 1000 ? (c/1000).toFixed(1).replace(/\.0+$/, '') + 'k' : c;
};

export default RepositoryItem;
