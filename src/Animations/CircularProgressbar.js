import React, {useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {Circle, G, Svg} from 'react-native-svg';
import {color, normalize} from '../Theme/theme';
import {baseStyles} from '../styles/common';

const SVG_WIDTH = normalize(60);
const SVG_HEIGHT = normalize(60);
const STROKE_WIDTH = normalize(3.5);
const CENTER_OFF_CIRCLE = SVG_HEIGHT / 2;
const CIRCLE_RADIUS = SVG_HEIGHT / 2 - STROKE_WIDTH;
const circumference = 2 * Math.PI * CIRCLE_RADIUS;

const CircularProgressbar = () => {
  const AnimatedCircle = Animated.createAnimatedComponent(Circle);
  const animatedStrokeDashoffset = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: animatedStrokeDashoffset.value,
    };
  });

  useEffect(() => {
    animatedStrokeDashoffset.value = withTiming(circumference * Math.random(), {
      duration: 300,
      easing: Easing.linear,
    });
  });

  const getPersentage = angle => {
    return (100 * angle).toFixed(0);
  };

  return (
    <View style={baseStyles.container}>
      <Text style={baseStyles.titleTxt}>Circular Progress Bar</Text>
      <View height={normalize(20)} />
      <TouchableOpacity
        onPress={() => {
          animatedStrokeDashoffset.value = withTiming(
            circumference * Math.random(),
            {
              duration: 300,
              easing: Easing.linear,
            },
          );
        }}
        activeOpacity={1}>
        <View style={styles.svgViewContainer}>
          <Svg
            width={SVG_WIDTH}
            height={SVG_HEIGHT}
            viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}>
            <G rotation={'-90'} origin={`${SVG_HEIGHT / 2}, ${SVG_HEIGHT / 2}`}>
              <BackgroundCircle />
              <AnimatedCircle
                animatedProps={animatedProps}
                cx={'50%'}
                cy={'50%'}
                fill={color.transparent}
                r={CIRCLE_RADIUS}
                strokeWidth={STROKE_WIDTH}
                stroke={color.blue}
                strokeLinecap="round"
                strokeDasharray={circumference}
              />
            </G>
          </Svg>
          <Svg width={SVG_WIDTH} height={SVG_HEIGHT}>
            <G rotation={'-90'} origin={`${SVG_HEIGHT / 2}, ${SVG_HEIGHT / 2}`}>
              <BackgroundCircle />
              <AnimatedCircle
                animatedProps={animatedProps}
                cx={CENTER_OFF_CIRCLE}
                cy={CENTER_OFF_CIRCLE}
                fill={color.transparent}
                r={CIRCLE_RADIUS}
                strokeWidth={STROKE_WIDTH}
                stroke={color.magenta}
                strokeLinecap="round"
                strokeDasharray={circumference}
              />
            </G>
          </Svg>
          <Svg width={SVG_WIDTH} height={SVG_HEIGHT}>
            <G rotation={'-90'} origin={`${SVG_HEIGHT / 2}, ${SVG_HEIGHT / 2}`}>
              <BackgroundCircle />
              <AnimatedCircle
                animatedProps={animatedProps}
                cx={CENTER_OFF_CIRCLE}
                cy={CENTER_OFF_CIRCLE}
                fill={color.transparent}
                r={CIRCLE_RADIUS}
                strokeWidth={STROKE_WIDTH}
                stroke={color.purple}
                strokeLinecap="round"
                strokeDasharray={circumference}
              />
            </G>
          </Svg>
          <Svg width={SVG_WIDTH} height={SVG_HEIGHT}>
            <G rotation={'-90'} origin={`${SVG_HEIGHT / 2}, ${SVG_HEIGHT / 2}`}>
              <BackgroundCircle />
              <AnimatedCircle
                animatedProps={animatedProps}
                cx={CENTER_OFF_CIRCLE}
                cy={CENTER_OFF_CIRCLE}
                fill={color.transparent}
                r={CIRCLE_RADIUS}
                strokeWidth={STROKE_WIDTH}
                stroke={color.green}
                strokeLinecap="round"
                strokeDasharray={circumference}
              />
            </G>
          </Svg>
        </View>
      </TouchableOpacity>
      <View height={normalize(15)} />
    </View>
  );
};

const BackgroundCircle = () => {
  return (
    <Circle
      cx={CENTER_OFF_CIRCLE}
      cy={CENTER_OFF_CIRCLE}
      fill={color.transparent}
      r={CIRCLE_RADIUS}
      strokeWidth={STROKE_WIDTH}
      stroke={color.white}
      strokeLinecap="round"
      strokeDasharray={circumference}
    />
  );
};

export default CircularProgressbar;

const styles = StyleSheet.create({
  svgViewContainer: {
    backgroundColor: '#4bb6e8',
    borderRadius: normalize(12),
    width: normalize(320),
    height: normalize(90),
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    shadowOffset: {width: 5, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: normalize(12),
    elevation: 2,
    shadowColor: color.black,
  },
});
