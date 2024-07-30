import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, DarkTheme  } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import Routes from "./src/routes";
import theme from "./src/themes/colors";

const App: React.FC = () => {
  return (
    <SafeAreaProvider style={{ backgroundColor: theme.black() }}>
      <StatusBar style="light" />
      <NavigationContainer theme={DarkTheme}>
        <Routes />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
