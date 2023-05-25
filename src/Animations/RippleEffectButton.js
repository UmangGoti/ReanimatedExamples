import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {TapGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  measure,
  useAnimatedGestureHandler,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {color, normalize} from '../Theme/theme';
import {baseStyles} from '../styles/common';

const RippleEffectButton = () => {
  const _ref = useAnimatedRef();
  const width = useSharedValue(0);
  const height = useSharedValue(0);
  const scale = useSharedValue(0);
  const opacity = useSharedValue(1);
  const sharedRippleColor = useSharedValue(0);
  const boxColor = [
    color.red,
    color.green,
    color.blue,
    color.cyan,
    color.magenta,
    color.yellow,
    color.purple,
  ];

  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: width.value,
      height: height.value,
      backgroundColor: sharedRippleColor.value,
      opacity: opacity.value,
      transform: [{scale: scale.value}],
    };
  });

  const tap = useAnimatedGestureHandler({
    onStart: event => {
      const layout = measure(_ref);
      width.value = layout.width;
      height.value = layout.height;
      scale.value = 0;
      opacity.value = 0.6;
      scale.value = withTiming(1, {duration: 1000});
      sharedRippleColor.value = boxColor[Math.floor(Math.random() * 7)];
    },
    onActive: () => {},
    onFinish: () => {
      opacity.value = withTiming(0, {duration: 1000});
    },
  });

  return (
    <View style={baseStyles.container}>
      <Text style={baseStyles.titleTxt}>Button with Ripple Effect</Text>
      <View height={normalize(20)} />
      <View style={[styles.viewContainer]}>
        <TapGestureHandler onGestureEvent={tap}>
          <Animated.View ref={_ref} style={styles.container}>
            <Animated.View
              style={[animatedStyles, {borderRadius: normalize(12)}]}
            />
          </Animated.View>
        </TapGestureHandler>
      </View>
      <View height={normalize(15)} />
    </View>
  );
};

export default RippleEffectButton;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
    borderRadius: normalize(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewContainer: {
    width: normalize(50),
    height: normalize(50),
    borderRadius: normalize(12),
    backgroundColor: color.white,
    shadowColor: color.black,
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  animatedBoxContainer: {
    width: normalize(50),
    height: normalize(50),
    borderRadius: normalize(12),
    backgroundColor: color.blue,
  },
});
