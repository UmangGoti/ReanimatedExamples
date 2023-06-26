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
import React, {useEffect} from 'react';
import {baseStyles} from '../styles/common';
import {Dimensions, StyleSheet, View} from 'react-native';

const {width} = Dimensions.get('window');
const boxWidth = 2 * normalize(50);

const AnimatedScaleColorWithRotationOfBox = () => {
  const boxColor = ['#00FDFF', '#FF2F92'];

  const translateX = useSharedValue(0);
  const rotateZ = useSharedValue(0);
  const scale = useSharedValue(0.2);
  const colorAnimation = useSharedValue(0);
  const calculatedColor = useDerivedValue(
    () => interpolateColor(colorAnimation.value, [0, 1], boxColor),
    [colorAnimation],
  );

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translateX.value},
        {rotateZ: `${rotateZ.value}deg`},
        {scale: scale.value},
      ],
      backgroundColor: calculatedColor.value,
    };
  });

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(width - boxWidth, {
        duration: 900,
        easing: Easing.inOut(Easing.linear),
      }),
      -1,
      true,
      undefined,
    );
    rotateZ.value = withRepeat(
      withTiming(360, {
        duration: 900,
        easing: Easing.inOut(Easing.linear),
      }),
      -1,
      true,
      undefined,
    );
    scale.value = withRepeat(
      withTiming(1, {
        duration: 900,
        easing: Easing.inOut(Easing.linear),
      }),
      -1,
      true,
      undefined,
    );
    colorAnimation.value = withRepeat(
      withTiming(1, {
        duration: 900,
        easing: Easing.inOut(Easing.linear),
      }),
      -1,
      true,
      undefined,
    );
  }, [translateX]);

  return (
    <View style={[baseStyles.container, {alignItems: 'flex-start'}]}>
      <View height={normalize(20)} />
      <Animated.View style={[styles.animatedBoxContainer, animatedStyles]} />
      <View height={normalize(15)} />
    </View>
  );
};

export default AnimatedScaleColorWithRotationOfBox;

const styles = StyleSheet.create({
  animatedBoxContainer: {
    width: normalize(50),
    height: normalize(50),
    borderRadius: normalize(12),
    backgroundColor: color.red,
  },
});
