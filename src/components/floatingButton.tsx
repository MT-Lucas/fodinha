import React from 'react';
import { StyleSheet, SafeAreaView, View, Pressable, Text } from 'react-native';
import Animated, {
  withDelay,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import theme from '../themes/colors';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedView = Animated.createAnimatedComponent(View);

const SPRING_CONFIG = {
  duration: 1200,
  overshootClamping: true,
  dampingRatio: 0.8,
};

const OFFSET = 40;

const FloatingActionButton = ({ isExpanded = false, index = 0, buttonLetter = '', buttonText= '', doubleButton = '' }) => {
  const animatedStyles = useAnimatedStyle(() => {
    const moveValue = isExpanded.value ? OFFSET * index : 0;
    const translateValue = withSpring(-moveValue, SPRING_CONFIG);
    const delay = isExpanded.value ? index * 100 : index * 10;

    const scaleValue = isExpanded.value ? 1 : 0;

    return {
      transform: [
        { translateY: translateValue },
        {
          scale: withDelay(delay, withTiming(scaleValue)),
        },
      ],
      opacity: withTiming(isExpanded.value ? 1 : 0, {duration: 150})
    };
  });

  return (
    <AnimatedView style={[animatedStyles, { position: 'absolute', flexDirection: 'row', justifyContent: 'flex-end', width: 200, right: 10 }]}>
      <Text style={{ color: theme.white(), fontSize: 15, marginRight: 10 }}>
        {buttonText}
      </Text>
      <View style={[ styles.shadow, styles.button ]}>
        <Text style={{ fontSize: 14 }}>
          {buttonLetter}
        </Text>
      </View>
      {Boolean(doubleButton) &&
        <View style={[ styles.shadow, styles.button, { marginLeft : 10 } ]}>
          <Text style={{ fontSize: 14 }}>
            {doubleButton}
          </Text>
        </View> 
      }
    </AnimatedView>
  );
};

export default function floatingButton({ ontoggle = (val: boolean) => {}}) {
  const isExpanded = useSharedValue(false);

  const handlePress = () => {
    ontoggle(!isExpanded.value);
    isExpanded.value = !isExpanded.value;
  };

  const plusIconStyle = useAnimatedStyle(() => {
    const moveValue = interpolate(Number(isExpanded.value), [0, 1], [0, 2]);
    const translateValue = withTiming(moveValue);
    const rotateValue = isExpanded.value ? '-90deg' : '25deg';

    return {
      transform: [
        { translateX: translateValue },
        { rotate: withTiming(rotateValue) },
      ],
    };
  });

  return (
    <SafeAreaView>
      <View style={styles.mainContainer}>
        <View style={styles.buttonContainer}>
          <AnimatedPressable
            onPress={handlePress}
            style={[styles.shadow, mainButtonStyles.button]}>
            <Animated.View style={[plusIconStyle]}>
              <MaterialCommunityIcons name="cards-playing" size={30} />
            </Animated.View>
          </AnimatedPressable>
          <FloatingActionButton
            isExpanded={isExpanded}
            index={1}
            buttonText={'4'}
            buttonLetter={'♣️'}
            doubleButton={'❤'}
          />
          <FloatingActionButton
            isExpanded={isExpanded}
            index={2}
            buttonText={'5'}
            buttonLetter={'♣️'}
            doubleButton={'❤'}
          />
          <FloatingActionButton
            isExpanded={isExpanded}
            index={3}
            buttonLetter={'♣️'}
            buttonText={'6'}
            doubleButton={'❤'}
          />
          <FloatingActionButton
            isExpanded={isExpanded}
            index={4}
            buttonLetter={'♣️'}
            buttonText={'7'}
            doubleButton={'❤'}
          />
          <FloatingActionButton
            isExpanded={isExpanded}
            index={5}
            buttonText={'10'}
            buttonLetter={'🫅'}
          />
          <FloatingActionButton
            isExpanded={isExpanded}
            index={6}
            buttonText={'11'}
            buttonLetter={'👸'}
          />
          <FloatingActionButton
            isExpanded={isExpanded}
            index={7}
            buttonText={'12'}
            buttonLetter={'👑'}
          />
          <FloatingActionButton
            isExpanded={isExpanded}
            index={8}
            buttonText={'1'}
            buttonLetter={'♣️'}
            doubleButton={'❤'}
          />
          <FloatingActionButton
            isExpanded={isExpanded}
            index={9}
            buttonText={'2'}
            buttonLetter={'♣️'}
            doubleButton={'❤'}
          />
          <FloatingActionButton
            isExpanded={isExpanded}
            index={10}
            buttonText={'3'}
            buttonLetter={'♣️'}
            doubleButton={'❤'}
          />
          <FloatingActionButton
            isExpanded={isExpanded}
            index={11}
            buttonText={'7 ouros '}
            buttonLetter={'🟡'}
          />
          <FloatingActionButton
            isExpanded={isExpanded}
            index={12}
            buttonText={'7 Espadas '}
            buttonLetter={'⚔️'}
          />
          <FloatingActionButton
            isExpanded={isExpanded}
            index={13}
            buttonText={'Pauzão'}
            buttonLetter={'🪵'}
          />
          <FloatingActionButton
            isExpanded={isExpanded}
            index={14}
            buttonText={'Espadão'}
            buttonLetter={'🗡'}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const mainButtonStyles = StyleSheet.create({
  button: {
    zIndex: 1,
    height: 56,
    width: 56,
    borderRadius: 100,
    backgroundColor: theme.primaryColor(),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

const styles = StyleSheet.create({
  mainContainer: {
    position: 'relative',
    height: 260,
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button: {
    width: 30,
    height: 30,
    backgroundColor: theme.primaryColor(),
    borderRadius: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonContainer: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 1
  },
  shadow: {
    shadowColor: theme.black(0.7),
    shadowOffset: { width: -0.5, height: 3.5 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});