import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/home';
import Players from '../screens/players';
import Game from '../screens/game';

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Players" component={Players} />
      <Stack.Screen name="Game" component={Game} />
    </Stack.Navigator>
  );
}

export default Routes;