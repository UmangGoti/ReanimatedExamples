import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {color, normalize} from '../Theme/theme';
import {baseStyles} from '../styles/common';
import {StyleSheet, Text, View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

const SingleOrDoubleTapOnBox = () => {
  const pressed = useSharedValue(false);
  const backgroundColor = useSharedValue(color.blue);

  const singleTap = Gesture.Tap()
    .maxDuration(250)
    .numberOfTaps(1)
    .onStart(() => {
      pressed.value = !pressed.value;
      backgroundColor.value = color.green;
    });

  const doubleTap = Gesture.Tap()
    .maxDuration(250)
    .numberOfTaps(2)
    .onStart(() => {
      pressed.value = !pressed.value;
      backgroundColor.value = color.magenta;
    });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{scale: withTiming(pressed.value ? 1.2 : 1)}],
    backgroundColor: pressed.value ? backgroundColor.value : color.blue,
  }));
  return (
    <View style={baseStyles.container}>
      <Text style={baseStyles.titleTxt}>Single or double tap on box</Text>
      <View height={normalize(20)} />
      <GestureDetector gesture={Gesture.Exclusive(doubleTap, singleTap)}>
        <Animated.View style={[styles.animatedBoxContainer, animatedStyles]} />
      </GestureDetector>
      <View height={normalize(15)} />
    </View>
  );
};

export default SingleOrDoubleTapOnBox;

const styles = StyleSheet.create({
  animatedBoxContainer: {
    width: normalize(50),
    height: normalize(50),
    borderRadius: normalize(12),
    backgroundColor: color.blue,
  },
});
