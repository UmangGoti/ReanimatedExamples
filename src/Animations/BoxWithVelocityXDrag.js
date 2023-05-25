import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withTiming,
} from 'react-native-reanimated';
import {color, normalize} from '../Theme/theme';
import {baseStyles} from '../styles/common';

const BoxWithVelocityXDrag = () => {
  const pressed = useSharedValue(false);
  const offset = useSharedValue(0);
  const store = {width: 0};
  const SIZE = normalize(20);

  const onLayout = event => {
    store.width = event.nativeEvent.layout.width;
  };

  const pan = Gesture.Pan()
    .onStart(() => {
      pressed.value = true;
    })
    .onChange(event => {
      offset.value += event.changeX;
    })
    .onFinalize(event => {
      offset.value = withDecay({
        velocity: event.velocityX / 500,
        rubberBandEffect: true,
        clamp: [-(store.width / 2) + SIZE / 2, store.width / 2 - SIZE / 2],
      });
      pressed.value = false;
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: offset.value},
        {scale: withTiming(pressed.value ? 1.2 : 1)},
      ],
      backgroundColor: pressed.value ? color.red : color.blue,
    };
  });

  return (
    <View style={baseStyles.container} onLayout={onLayout}>
      <Text style={baseStyles.titleTxt}>Tap to move box</Text>
      <View height={normalize(20)} />
      <GestureDetector gesture={pan}>
        <Animated.View style={[styles.animatedBoxContainer, animatedStyle]} />
      </GestureDetector>
      <View height={normalize(15)} />
    </View>
  );
};

export default BoxWithVelocityXDrag;

const styles = StyleSheet.create({
  animatedBoxContainer: {
    width: normalize(50),
    height: normalize(50),
    borderRadius: normalize(12),
    backgroundColor: color.blue,
    cursor: 'grab',
  },
});
