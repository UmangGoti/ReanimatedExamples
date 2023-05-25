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

const LongTapOnBox = () => {
  const pressed = useSharedValue(false);

  const tap = Gesture.Tap()
    .onTouchesDown(() => {
      pressed.value = true;
    })
    .onTouchesUp(() => {
      pressed.value = false;
    });

  const animatedStyles = useAnimatedStyle(() => ({
    backgroundColor: pressed.value ? color.magenta : color.blue,
    transform: [{scale: withTiming(pressed.value ? 1.2 : 1)}],
  }));

  return (
    <View style={baseStyles.container}>
      <Text style={baseStyles.titleTxt}>Long tap on box</Text>
      <View height={normalize(20)} />
      <GestureDetector gesture={tap}>
        <Animated.View style={[styles.animatedBoxContainer, animatedStyles]} />
      </GestureDetector>
      <View height={normalize(15)} />
    </View>
  );
};

export default LongTapOnBox;

const styles = StyleSheet.create({
  animatedBoxContainer: {
    width: normalize(50),
    height: normalize(50),
    borderRadius: normalize(12),
    backgroundColor: color.blue,
  },
});
