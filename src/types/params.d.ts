import {Pokemon} from '.';

export type RootStackParamList = {
  Home: undefined;
  Details: {Pokemon: Pokemon};
};

type Props = NativeStackScreenProps<RootStackParamList>;
