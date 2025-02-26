import {useState, useEffect} from 'react';
import {FlatList, SafeAreaView, StyleSheet, View, Alert} from 'react-native';
import {Root, Result, Pokemon} from '../../types';
import axios from 'axios';
import CardPokemonComponent from './components/CardPokemonComponent';
import {API_POKEMON, API_POKEMON_TYPE} from '../../constants/urls';
import {Button, Searchbar} from 'react-native-paper';
import DropdownComponent from '../components/DropdownComponent';

export default function HomeScreen() {
  const [root, setRoot] = useState<Root>({} as Root);
  const [results, setResults] = useState<Array<Result>>([] as Result[]);
  const [pokemons, setPokemons] = useState<Pokemon>({} as Pokemon);
  const [type, setType] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  function fetchNextPrevPokemons(url: string) {
    axios.get(url).then(response => {
      setRoot(response.data);
      setResults(response.data.results);
    });
  }

  function getPokemonsByType(type: string) {
    axios
      .get(`${API_POKEMON_TYPE}/${type}/`)
      .then(response => {
        setResults(response.data.pokemon.map((item: any) => item.pokemon));
      })
      .catch(error => {
        Alert.alert('Error get pokemons by types', error.message);
      });
  }

  function fetchAllPokemons(url?: string) {
    setType('');
    axios
      .get(`${API_POKEMON}/${url || ''}`)
      .then(response => {
        if (url) {
          setPokemons(response.data);
          setRoot({} as Root);
          setResults([] as Result[]);
          return;
        }
        setRoot(response.data);
        setResults(response.data.results);
      })
      .catch(error => {
        // console.log(error);
      });
  }

  useEffect(() => {
    if (type) {
      getPokemonsByType(type);
    }
  }, [type]);

  useEffect(() => {
    fetchAllPokemons();
  }, [searchQuery]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <Searchbar
        style={styles.searchbar}
        onChangeText={text => {
          setSearchQuery(text);
          fetchAllPokemons(text);
        }}
        value={searchQuery}
        placeholder="Search"
      />
      <DropdownComponent setType={setType} />
      <View style={styles.btnContainer}>
        <Button
          style={styles.btn}
          mode="outlined"
          disabled={!root.previous}
          onPress={() => fetchNextPrevPokemons(root.previous)}>
          Previous
        </Button>
        <Button
          style={styles.btn}
          disabled={!root.next}
          mode="outlined"
          onPress={() => fetchNextPrevPokemons(root.next)}>
          Next
        </Button>
      </View>
      {results.length > 0 && !searchQuery && (
        <FlatList
          data={results}
          keyExtractor={item => item.name}
          numColumns={2}
          renderItem={({item}) => (
            <CardPokemonComponent name={item.name} url={item.url} />
          )}
        />
      )}
      {Boolean(pokemons.id) && searchQuery && (
        <FlatList
          data={[pokemons]}
          keyExtractor={item => item.name}
          numColumns={1}
          renderItem={({item}) => (
            <CardPokemonComponent
              name={item.name}
              url={`${API_POKEMON}/${item.name}`}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchbar: {
    width: '95%',
    margin: 10,
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 1,
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
