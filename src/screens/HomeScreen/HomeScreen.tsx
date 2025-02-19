import {useState, useEffect} from 'react';
import {Button, Text, View} from 'react-native';
import Animated, {useSharedValue, withSpring} from 'react-native-reanimated';
import {Pokemon, Result, Root} from '../../types';

export default function HomeScreen() {
  const [root, setRoot] = useState<Root>({} as Root);
  const [results, setResults] = useState<Array<Result>>([] as Result[]);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon')
      .then(response => response.json())
      .then(json => {
        setRoot(json);
        setResults(json.results);
      });
  }, []);

  return (
    <View style={{flex: 1, alignItems: 'center'}}>
      {results && <Text>{results[0].name}</Text>}
    </View>
  );
}
