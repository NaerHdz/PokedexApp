import {StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import COLORS from '../../../constants/colors';

export default function TypeComponent({type}: {type: string}) {
  return (
    <Text
      style={[
        styles.type,
        {
          backgroundColor: COLORS[type as keyof typeof COLORS],
        },
      ]}>
      {type}
    </Text>
  );
}

const styles = StyleSheet.create({
  type: {
    fontSize: 25,
    fontWeight: 'bold',
    width: 150,
    padding: 10,
    borderRadius: 20,
    textTransform: 'capitalize',
    textAlign: 'center',
    textShadowColor: 'rgba(255, 255, 255,1)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
  },
});
