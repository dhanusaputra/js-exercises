import React, { useState } from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useHistory } from 'react-router-native';
import RNPickerSelect from 'react-native-picker-select';
import { Searchbar } from 'react-native-paper';

import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListHeader = ({ setSelector, search, setSearch }) => {
  return (
    <View>
      <Searchbar
        placeholder='Search'
        onChangeText={(value) => setSearch(value)}
        value={search}
      />
      <RNPickerSelect
        onValueChange={(value) => setSelector(value)}
        items={[
          { label: 'Latest repositories', value: 'latestRepositories' },
          { label: 'Highest rated repositories', value: 'highestRatedRepositories' },
          { label: 'Lowest rated repositories', value: 'lowestRatedRepositories' },
        ]}
      />
    </View>
  );
};

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    return (
      <RepositoryListHeader
        setSelector={this.props.setSelector}
        search={this.props.search}
        setSearch={this.props.setSearch}
      />
    );
  };

  render() {
    return (
      <FlatList
        data={this.props.repositories}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => this.props.history.push(`/${item.id}`)}>
            <RepositoryItem item={item}/>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
        ListHeaderComponent={this.renderHeader}
        onEndReached={this.props.onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

const RepositoryList = () => {
  const [selector, setSelector] = useState('latestRepositories');
  const [searchKeyword, setSearch] = useState('');

  const history = useHistory();

  const { repositories, fetchMore } = useRepositories({
    selector,
    searchKeyword,
    first: 8,
  });

  const onEndReach = () => {
    console.log('something');
    fetchMore();
  }
  
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  return( 
      <RepositoryListContainer 
        repositories={repositoryNodes} 
        onEndReach={onEndReach}
        history={history} 
        setSelector={setSelector}
        search={searchKeyword}
        setSearch={setSearch}
      />
  );
}

export default RepositoryList;
