import React, {useEffect, useState} from 'react';
import {TouchableOpacity, Text, Image, View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import axios from 'axios';
import COLORS from '../../../constants/colors';
import {Pokemon, Result} from '../../../types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../../types/params';

export default function CardPokemonComponent(props: Result) {
  const [pokemon, setPokemon] = useState<Pokemon>({} as Pokemon);
  const [color, setColor] = useState<string>('');
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    axios.get(props.url).then(response => {
      setPokemon(response.data);
      setColor(COLORS[response.data.types[0].type.name as keyof typeof COLORS]);
    });
  }, []);

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Details', {Pokemon: pokemon});
      }}>
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
    textShadowColor: 'rgba(255, 255, 255,1)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    textTransform: 'capitalize',
  },
});
