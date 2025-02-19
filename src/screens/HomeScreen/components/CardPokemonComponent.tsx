import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {TouchableOpacity, Text, Image, View, StyleSheet} from 'react-native';
import {Pokemon, Result} from '../../../types';
import COLORS from '../../../constants/colors';
export default function CardPokemonComponent(props: Result) {
  const [pokemon, setPokemon] = useState<Pokemon>({} as Pokemon);
  const [color, setColor] = useState<string>('');

  useEffect(() => {
    axios.get(props.url).then(response => {
      setPokemon(response.data);
      setColor(COLORS[response.data.types[0].type.name as keyof typeof COLORS]);
    });
  }, []);

  return (
    <TouchableOpacity>
      {pokemon && (
        <View style={[styles.container, {backgroundColor: color}]}>
          <Image
            style={{width: 120, height: 100}}
            source={{
              uri: pokemon.sprites?.front_default,
            }}
          />
          <Text style={styles.text}>
            {pokemon.id?.toString().padStart(3, '0')} - {pokemon.name}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    height: 150,
    width: 200,
    borderRadius: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    textTransform: 'capitalize',
  },
});
