import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {color, normalize} from '../Theme/theme';
import {baseStyles} from '../styles/common';

const RotationWithScale = () => {
  const rotation = useSharedValue(1);
  const scale = useSharedValue(0.1);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{rotateZ: `${rotation.value}deg`}, {scale: scale.value}],
  }));

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 1000,
        easing: Easing.linear,
      }),
      -1,
      false,
    );
    scale.value = withRepeat(
      withTiming(1, {
        duration: 1000,
        easing: Easing.bezierFn(0, 0, 1, 1),
      }),
      -1,
      true,
    );
  });

  return (
    <View style={baseStyles.container}>
      <Text style={baseStyles.titleTxt}>Rotation with scale animation</Text>
      <View height={normalize(20)} />
      <Animated.View style={[styles.animatedBoxContainer, animatedStyles]} />
      <View height={normalize(15)} />
    </View>
  );
};

export default RotationWithScale;

const styles = StyleSheet.create({
  animatedBoxContainer: {
    width: normalize(50),
    height: normalize(50),
    borderRadius: normalize(12),
    backgroundColor: color.blue,
  },
});
