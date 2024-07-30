import { View, StyleSheet, ImageBackground } from 'react-native';
import theme from '../themes/colors';
import FloatingButton from './floatingButton';
import { useState } from 'react';

const espadao = require('../../assets/images/espadaoDark.png');

export default function Screen({ children }) {
  const [cardsExpanded, setCardsExpanded] = useState(false);

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={espadao} 
        resizeMode='contain' 
        imageStyle={styles.image} style={styles.imageContainer}>
        {children}
      </ImageBackground>
      <View style={styles.buttonContainer}>
        <FloatingButton ontoggle={(value) => setCardsExpanded(value)} />
      </View>
      {cardsExpanded && <View style={styles.overlay}/>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: theme.black(),
  },
  imageContainer: {
    height: '100%', 
    width: '100%', 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  image: {
    opacity: 0.3, 
    marginTop: 10,
  },
  buttonContainer: {
    position: 'absolute', 
    bottom: 50, 
    right: 50
  },
  overlay: {
    position: 'absolute', 
    backgroundColor: theme.black(0.9), 
    height: '100%', 
    width: '100%'
  }
});
