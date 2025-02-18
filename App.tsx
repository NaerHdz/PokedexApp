import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import RootStack from './src/navigation/RootStack';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}

export default App;
