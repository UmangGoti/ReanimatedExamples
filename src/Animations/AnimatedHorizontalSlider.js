import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {color, normalize} from '../Theme/theme';
import {baseStyles} from '../styles/common';

const sliderWidth = normalize(295);

const AnimatedHorizontalSlider = () => {
  const animatedWidth = useSharedValue(sliderWidth / 2);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: animatedWidth.value,
    };
  });

  const tap = Gesture.Tap().onFinalize(event => {
    animatedWidth.value = withSpring(event.x);
  });

  return (
    <View style={baseStyles.container}>
      <Text style={baseStyles.titleTxt}>Animated Horizontal Slider</Text>
      <View height={normalize(20)} />
      <GestureDetector gesture={tap}>
        <View style={styles.outerContainer}>
          <Animated.View
            style={[styles.animatedBoxContainer, animatedStyles]}
          />
        </View>
      </GestureDetector>
      <View height={normalize(15)} />
    </View>
  );
};

export default AnimatedHorizontalSlider;

const styles = StyleSheet.create({
  outerContainer: {
    width: sliderWidth,
    borderWidth: 1,
    borderRadius: normalize(50),
    borderColor: color.black,
  },
  animatedBoxContainer: {
    width: sliderWidth,
    backgroundColor: color.blue,
    height: normalize(10),
    borderRadius: normalize(50),
  },
});
