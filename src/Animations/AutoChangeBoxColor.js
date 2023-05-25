import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {color, normalize} from '../Theme/theme';
import {baseStyles} from '../styles/common';

const AutoChangeBoxColor = () => {
  const boxColor = [
    'rgb(255,73,74)',
    'rgb(255,170,0)',
    'rgb(0,163,217)',
    'rgb(0,163,217)',
    'rgb(115,92,255)',
    'rgb(255,73,74)',
  ];

  const colorAnimation = useSharedValue(0);
  const calculatedColor = useDerivedValue(
    () => interpolateColor(colorAnimation.value, [0, 1, 2, 3, 4, 5], boxColor),
    [colorAnimation],
  );

  useEffect(() => {
    colorAnimation.value = withRepeat(
      withTiming(6, {
        duration: 3000,
        easing: Easing.linear,
      }),
      -1,
      true,
    );
  }, [colorAnimation]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: calculatedColor.value,
    };
  });

  return (
    <View style={baseStyles.container}>
      <Text style={baseStyles.titleTxt}>Auto Change Box Color</Text>
      <View height={normalize(20)} />
      <Animated.View style={[styles.animatedBoxContainer, animatedStyles]} />
      <View height={normalize(15)} />
    </View>
  );
};

export default AutoChangeBoxColor;

const styles = StyleSheet.create({
  animatedBoxContainer: {
    width: normalize(50),
    height: normalize(50),
    borderRadius: normalize(12),
    backgroundColor: color.blue,
  },
});
