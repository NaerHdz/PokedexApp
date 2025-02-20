import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Animated, {BounceIn} from 'react-native-reanimated';
import COLORS from '../../constants/colors';
import {Props} from '../../types/params';
import TypeComponent from './components/TypeComponent';
import {Ability} from '../../types';

export default function DetailsScreen({route}: Props): React.JSX.Element {
  console.log('DetailsScreen', route.params);
  const {Pokemon} = route.params;

  return (
    <SafeAreaView>
      <View
        style={{
          backgroundColor:
            COLORS[Pokemon.types[0].type.name as keyof typeof COLORS],
          height: 330,
        }}>
        <Text style={styles.h1}>{Pokemon.name}</Text>
        <Animated.Image
          entering={BounceIn.duration(1000)}
          source={{
            uri: Pokemon.sprites?.front_default,
          }}
          style={{width: '65%', height: 230, alignSelf: 'center'}}
        />
      </View>
      <View style={styles.containterType}>
        <TypeComponent type={Pokemon.types[0].type.name} />

        {Pokemon.types.length === 2 && (
          <TypeComponent type={Pokemon.types[1].type.name} />
        )}
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          marginVertical: 30,
        }}>
        <Text style={{fontSize: 25}}>Abilities</Text>
        {Pokemon.abilities.map((ability: Ability, index: number) => (
          <Text style={{fontSize: 25}} key={index}>
            {ability.ability.name}
          </Text>
        ))}
      </View>
      <View
        style={{
          alignContent: 'flex-start',
          marginHorizontal: 40,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={{fontSize: 25}}>weight</Text>
        <Text style={{fontSize: 25}}>{Pokemon.weight}</Text>
      </View>
      <View
        style={{
          alignContent: 'flex-start',
          marginTop: 30,
        }}>
        {Pokemon.stats.map((stat: any, index: number) => (
          <View
            key={index}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: 40,
            }}>
            <Text style={{fontSize: 25}}>{stat.stat.name}</Text>
            <Text style={{fontSize: 25}}>{stat.base_stat}</Text>
          </View>
        ))}
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
    textTransform: 'capitalize',
  },
  containterType: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});
