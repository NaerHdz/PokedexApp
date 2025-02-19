import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Animated, {BounceIn, BounceOut} from 'react-native-reanimated';
import colors from '../../constants/colors';

export default function DetailsScreen(): React.JSX.Element {
  return (
    <View>
      <View>
        <Animated.Image
          entering={BounceIn.duration(1000)}
          source={{
            uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
          }}
          style={{width: 300, height: 250}}
        />
      </View>
      <Text>Bulbausar</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
