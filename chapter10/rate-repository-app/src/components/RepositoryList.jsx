import React, { useState } from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useHistory } from 'react-router-native';
import RNPickerSelect from 'react-native-picker-select';

import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositorySelector = ({ setSelector }) => {
  return (
    <RNPickerSelect
      onValueChange={(value) => setSelector(value)}
      items={[
        { label: 'Latest repositories', value: 'latestRepositories' },
        { label: 'Highest rated repositories', value: 'highestRatedRepositories' },
        { label: 'Lowest rated repositories', value: 'lowestRatedRepositories' },
      ]}
    />
  );
};

export const RepositoryListContainer = ({ repositories, history, setSelector }) => {
	const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => history.push(`/${item.id}`)}>
          <RepositoryItem item={item}/>
        </TouchableOpacity>
      )}
      keyExtractor={item => item.id}
      ListHeaderComponent={ () => <RepositorySelector setSelector={setSelector}/>}
    />
  );
};

const RepositoryList = () => {
  const [selector, setSelector] = useState('latestRepositories');
  const { repositories } = useRepositories(selector);
  const history = useHistory();

  return <RepositoryListContainer repositories={repositories} history={history} setSelector={setSelector}/>;
}

export default RepositoryList;
