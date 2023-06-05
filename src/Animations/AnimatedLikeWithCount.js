import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  Easing,
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {color, fonts, normalize} from '../Theme/theme';
import {baseStyles} from '../styles/common';

const boxHeight = normalize(50);
const translateY = boxHeight + normalize(15);

const AnimatedLikeWithCount = () => {
  const scale = useSharedValue(1);
  const y = useSharedValue(0);
  const [count, setCount] = useState(1);

  const tap = Gesture.Tap()
    .onBegin(() => {
      scale.value = withSpring(0.8);
    })
    .onFinalize(() => {
      scale.value = withSpring(1);
      y.value = withTiming(
        1,
        {
          duration: 400,
          mass: 1,
          damping: 100,
          stiffness: 1,
          easing: Easing.out(Easing.quad),
        },
        () => {
          y.value = withTiming(0, {
            duration: 900,
            easing: Easing.out(Easing.quad),
          });
        },
      );
      runOnJS(setCount)(count + 1);
    });

  useEffect(() => {}, [count]);

  const animatedBoxScale = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    };
  });

  const animatedTextPopUp = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withSpring(
            interpolate(y.value, [0, 1], [0, -translateY]),
          ),
        },
      ],
      opacity: withSpring(interpolate(y.value, [0, 1], [0, 1])),
    };
  });

  return (
    <View style={baseStyles.container}>
      <View height={normalize(20)} />
      <GestureDetector gesture={tap}>
        <View style={styles.gestureContainer}>
          <Animated.View style={[styles.countContainer, animatedTextPopUp]}>
            <Text style={styles.count}>{count}</Text>
          </Animated.View>
          <Animated.View
            style={[
              styles.animatedBoxContainer,
              animatedBoxScale,
            ]}></Animated.View>
        </View>
      </GestureDetector>
      <View height={normalize(15)} />
      <Text style={baseStyles.titleTxt}>Tap Button</Text>
    </View>
  );
};

export default AnimatedLikeWithCount;

const styles = StyleSheet.create({
  animatedBoxContainer: {
    width: normalize(50),
    height: normalize(50),
    borderRadius: normalize(12),
    backgroundColor: color.blue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gestureContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  countContainer: {
    borderRadius: normalize(8),
    paddingLeft: normalize(10),
    paddingRight: normalize(10),
    paddingTop: normalize(3),
    paddingBottom: normalize(3),
    backgroundColor: color.blue_03,
    borderWidth: 1,
    borderColor: color.blue,
    position: 'absolute',
  },
  count: {
    color: color.white,
    fontFamily: fonts.NUNITO_BOLD_700,
    fontSize: 15,
  },
});
