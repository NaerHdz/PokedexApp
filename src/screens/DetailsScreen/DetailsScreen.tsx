import React from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Animated, {BounceIn, BounceOut} from 'react-native-reanimated';
import colors from '../../constants/colors';

export default function DetailsScreen(): React.JSX.Element {
  return (
    <SafeAreaView>
      <View style={{backgroundColor: colors.grass, height: 230}}>
        <Text style={styles.h1}>Bulbasaur</Text>
        <Animated.Image
          entering={BounceIn.duration(1000)}
          source={{
            uri: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
          }}
          style={{width: 400, height: 280, alignSelf: 'center'}}
        />
      </View>
      <View style={styles.containterType}>
        <Text style={[styles.type, {backgroundColor: colors.grass}]}>
          Grass
        </Text>
        <Text style={[styles.type, {backgroundColor: colors.poison}]}>
          Poison
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  h1: {
    fontSize: 40,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginLeft: 30,
    marginVertical: 10,
  },
  containterType: {
    marginTop: 100,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  type: {
    fontSize: 25,
    fontWeight: 'bold',
    width: 150,
    padding: 10,
    borderRadius: 20,
    textAlign: 'center',
    textShadowColor: 'rgba(255, 255, 255,1)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
});
