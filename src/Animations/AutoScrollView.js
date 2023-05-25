import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {color, normalize} from '../Theme/theme';
import {baseStyles} from '../styles/common';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

const CARD_HEIGHT = normalize(150);
const CARD_MARGIN = normalize(10);
const itemHeight = CARD_HEIGHT + CARD_MARGIN;

const AutoScrollView = () => {
  const colorArray = [
    color.red,
    color.green,
    color.cyan,
    color.magenta,
    color.yellow,
    color.purple,
  ];
  const viewHeight = itemHeight * colorArray.length;

  const translationY = useSharedValue(0);

  useEffect(() => {
    translationY.value = withRepeat(
      withTiming(-viewHeight, {
        duration: 20000,
        easing: Easing.linear,
      }),
      -1,
      true,
    );
  }, [translationY, viewHeight]);

  const animatedContainer = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translationY.value}],
    };
  });
  return (
    <View style={baseStyles.container}>
      <Text style={baseStyles.titleTxt}>Auto ScrollView</Text>
      <View height={normalize(20)} />
      <View style={styles.animatedBoxContainer}>
        <Animated.View style={animatedContainer}>
          {colorArray.map((item, index) => (
            <View
              key={index}
              style={[styles.animatedBox, {backgroundColor: item}]}
            />
          ))}
        </Animated.View>
      </View>
      <View height={normalize(15)} />
    </View>
  );
};

export default AutoScrollView;

const styles = StyleSheet.create({
  animatedBoxContainer: {
    overflow: 'hidden',
    height: itemHeight,
  },
  animatedBox: {
    width: normalize(100),
    height: normalize(150),
    borderRadius: 12,
    margin: normalize(10),
  },
});
