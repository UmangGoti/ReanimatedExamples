import React from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {color, normalize} from '../Theme/theme';
import {baseStyles} from '../styles/common';
import {StyleSheet, Text, View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';

const TabToChangeColor = () => {
  const boxColor = [
    color.red,
    color.green,
    color.blue,
    color.cyan,
    color.magenta,
    color.yellow,
    color.purple,
  ];

  const sharedBackgroundColor = useSharedValue(
    boxColor[Math.floor(Math.random() * 6)],
  );

  const animatedStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: sharedBackgroundColor.value,
    };
  });

  const tap = Gesture.Tap().onEnd(() => {
    sharedBackgroundColor.value = boxColor[Math.floor(Math.random() * 7)];
  });

  return (
    <View style={baseStyles.container}>
      <Text style={baseStyles.titleTxt}>Change Box Color</Text>
      <View height={normalize(20)} />
      <GestureDetector gesture={tap}>
        <Animated.View style={[styles.animatedBoxContainer, animatedStyles]} />
      </GestureDetector>
      <View height={normalize(15)} />
    </View>
  );
};

export default TabToChangeColor;

const styles = StyleSheet.create({
  animatedBoxContainer: {
    width: normalize(50),
    height: normalize(50),
    borderRadius: normalize(12),
    backgroundColor: color.blue,
  },
});
