import React from 'react';
import {Image, Text, View} from 'react-native';
import Animated from 'react-native-reanimated';
import {Pokemon} from '../../types';

export default function DetailsScreen(props: Pokemon) {
  return (
    <View>
      <Animated.Image
        source={{
          uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png',
        }}
        style={{width: 150, height: 150}}
        sharedTransitionTag="tag"
      />
      <Text>Eevee</Text>
    </View>
  );
}
