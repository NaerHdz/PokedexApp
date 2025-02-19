import {useState, useEffect} from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import {Root, Result} from '../../types';
import axios from 'axios';
import CardPokemonComponent from './components/CardPokemonComponent';
import {API_POKEMON} from '../../constants/urls';
import {Button, Searchbar} from 'react-native-paper';

export default function HomeScreen() {
  const [root, setRoot] = useState<Root>({} as Root);
  const [results, setResults] = useState<Array<Result>>([] as Result[]);
  const [searchQuery, setSearchQuery] = useState('');

  function fetchPokemons(url: string) {
    axios.get(url).then(response => {
      setRoot(response.data);
      setResults(response.data.results);
    });
  }

  useEffect(() => {
    axios.get(API_POKEMON).then(response => {
      setRoot(response.data);
      setResults(response.data.results);
    });
  }, []);

  return (
    <SafeAreaView style={{height: '95%'}}>
      <Searchbar
        style={styles.searchbar}
        onChangeText={setSearchQuery}
        value={searchQuery}
        placeholder="Search"
      />
      <View style={styles.btnContainer}>
        <Button
          style={styles.btn}
          mode="outlined"
          disabled={!root.previous}
          onPress={() => fetchPokemons(root.previous)}>
          Previous
        </Button>
        <Button
          style={styles.btn}
          disabled={!root.next}
          mode="outlined"
          onPress={() => fetchPokemons(root.next)}>
          Next
        </Button>
      </View>
      <FlatList
        data={results}
        keyExtractor={item => item.name}
        numColumns={2}
        renderItem={({item}) => (
          <CardPokemonComponent name={item.name} url={item.url} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchbar: {
    width: '95%',
    margin: 10,
    backgroundColor: '#fff',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  btn: {
    width: 180,
  },
});
