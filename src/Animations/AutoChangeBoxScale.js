import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {color, normalize} from '../Theme/theme';
import {baseStyles} from '../styles/common';

const AutoChangeBoxScale = () => {
  const scale = useSharedValue(0.8);
  const scaleAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: scale.value,
        },
      ],
    };
  });

  useEffect(() => {
    scale.value = withRepeat(
      withTiming(1, {
        duration: 200,
        easing: Easing.bezierFn(0.8, 1, 0.8, 1),
      }),
      -1,
      true,
    );
  });

  return (
    <View style={baseStyles.container}>
      <Text style={baseStyles.titleTxt}>Auto Change Box Scale</Text>
      <View height={normalize(20)} />
      <Animated.View
        style={[styles.animatedBoxContainer, scaleAnimatedStyle]}
      />
      <View height={normalize(15)} />
    </View>
  );
};

export default AutoChangeBoxScale;

const styles = StyleSheet.create({
  animatedBoxContainer: {
    width: normalize(50),
    height: normalize(50),
    borderRadius: normalize(12),
    backgroundColor: color.blue,
  },
});
