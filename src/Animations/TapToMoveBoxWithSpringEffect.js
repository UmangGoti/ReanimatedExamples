import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {color, normalize} from '../Theme/theme';
import {baseStyles} from '../styles/common';

const TapToMoveBoxWithSpringEffect = () => {
  const offset = useSharedValue(0);
  const {width} = Dimensions.get('window');

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateX: offset.value}],
    };
  });

  const tap = Gesture.Tap().onEnd(() => {
    offset.value = withSpring(
      Math.random() < 0.5
        ? Math.random() * (-width / 2) + 50
        : Math.random() * (width / 2) - 50,
    );
  });

  return (
    <View style={baseStyles.container}>
      <Text style={baseStyles.titleTxt}>
        Tap to move box with spring effect
      </Text>
      <View height={normalize(20)} />
      <GestureDetector gesture={tap}>
        <Animated.View style={[styles.animatedBoxContainer, animatedStyles]} />
      </GestureDetector>
      <View height={normalize(15)} />
    </View>
  );
};

export default TapToMoveBoxWithSpringEffect;

const styles = StyleSheet.create({
  animatedBoxContainer: {
    width: normalize(50),
    height: normalize(50),
    borderRadius: normalize(12),
    backgroundColor: color.blue,
  },
});
