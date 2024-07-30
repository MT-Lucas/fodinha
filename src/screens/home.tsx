import * as React from 'react';
import { Text, StyleSheet, Pressable } from 'react-native';
import theme from '../themes/colors';
import Screen from '../components/screen';

const Home = ({ navigation }) => {
  return (
    <Screen>
      <Pressable 
        onPress={() => navigation.navigate('Players')}
        style={styles.container}> 
        <Text style={styles.text}>
          {`Nova fodinha`} 
        </Text>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.primaryColor(), 
    paddingHorizontal: 40, 
    paddingVertical: 20, 
    borderRadius: 30
  },
  text: {
    color: theme.white(), 
    fontSize: 25
  },
});


export default Home;