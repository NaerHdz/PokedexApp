import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Animated, {BounceIn} from 'react-native-reanimated';
import COLORS from '../../constants/colors';
import {Props} from '../../types/params';
import TypeComponent from './components/TypeComponent';
import {Ability} from '../../types';
import Icon from '@react-native-vector-icons/fontawesome6';

const icons: Record<string, string> = {
  attack: 'dumbbell',
  defense: 'shield',
  hp: 'heart',
  'special-attack': 'fire',
  'special-defense': 'shield',
  speed: 'wind',
};

export default function DetailsScreen({route}: Props): React.JSX.Element {
  const {Pokemon} = route.params;

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          backgroundColor:
            COLORS[Pokemon.types[0].type.name as keyof typeof COLORS],
          height: 330,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30,
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
      <View style={[styles.container, {justifyContent: 'space-evenly'}]}>
        {Pokemon.types.map((type: any, index: number) => (
          <TypeComponent type={type.type.name} key={index} />
        ))}
      </View>

      <View style={styles.container}>
        <Text style={styles.text}>Abilities</Text>
        {Pokemon.abilities.map((ability: Ability, index: number) => (
          <Text style={styles.text} key={index}>
            {ability.ability.name}
          </Text>
        ))}
      </View>
      <View style={[styles.container, {marginTop: 20, marginBottom: -10}]}>
        <Text style={styles.text}>weight</Text>
        <Text style={styles.text}>
          <Icon
            name="weight-hanging"
            style={{paddingRight: 15}}
            size={20}
            iconStyle="solid"
          />
          {' ' + Pokemon.weight}
        </Text>
      </View>
      <View
        style={{
          alignContent: 'flex-start',
          marginTop: 30,
        }}>
        {Pokemon.stats.map((stat: any, index: number) => (
          <View key={index} style={styles.container}>
            <Text style={styles.text}>{stat.stat.name}</Text>
            <Text style={styles.text}>
              <Icon
                name={icons[stat.stat.name] as any}
                style={{paddingRight: 15}}
                size={20}
                iconStyle="solid"
              />
              {' ' + stat.base_stat}
            </Text>
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
    textShadowColor: 'rgba(255, 255, 255,1)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
  container: {
    marginTop: 10,
    marginHorizontal: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 24,
    textTransform: 'capitalize',
  },
});
