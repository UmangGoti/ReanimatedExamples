import React, {useEffect, useRef, useState} from 'react';
import {Dimensions, StatusBar, StyleSheet, Text, View} from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {color, normalize, sizes} from '../Theme/theme';

const {width} = Dimensions.get('window');
const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 24;
const TOAST_HEIGHT = normalize(50);
const TOAST_WIDTH = width - sizes.CONTAINER_PADDING_HRIZONTAL;
const DEFAULT_TOP_TRANSLATEY = TOAST_HEIGHT + 3 * STATUS_BAR_HEIGHT;
const DEFAULT_BOTTOM_TRANSLATEY = TOAST_HEIGHT + STATUS_BAR_HEIGHT;

const Toast = ({
  position = 'bottom',
  isLeadingBar = false,
  isBottomBar = false,
  statusBarColor = color.blue,
  showToast = false,
  onHide = () => {},
}) => {
  const [isVisible, setVisible] = useState(false);
  const timerRef = useRef();
  const translateY = useSharedValue(
    position === 'top' ? -DEFAULT_TOP_TRANSLATEY : DEFAULT_BOTTOM_TRANSLATEY,
  );

  const leadingBar = useSharedValue(TOAST_HEIGHT);
  const bottomBar = useSharedValue(TOAST_WIDTH);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });

  const animatedLeadingBar = useAnimatedStyle(() => {
    return {
      height: leadingBar.value,
    };
  });

  const animatedBottomBar = useAnimatedStyle(() => {
    return {
      width: bottomBar.value,
    };
  });

  const afterCall = () => {
    'worklet';
    runOnJS(setVisible)(false);
    runOnJS(onHide)(true);
  };

  const startTimer = () => {
    timerRef.current = setTimeout(() => {
      translateY.value = withSpring(
        position === 'top'
          ? -DEFAULT_TOP_TRANSLATEY
          : DEFAULT_BOTTOM_TRANSLATEY,
        undefined,
        afterCall,
      );
    }, 3000);
  };

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = undefined;
    }
  };

  useEffect(() => {
    if (isVisible) {
      if (isLeadingBar) {
        leadingBar.value = withTiming(
          0,
          {duration: 3000, easing: Easing.linear},
          () => {
            leadingBar.value = TOAST_HEIGHT;
          },
        );
      }

      if (isBottomBar) {
        bottomBar.value = withTiming(
          0,
          {duration: 3000, easing: Easing.linear},
          () => {
            bottomBar.value = TOAST_WIDTH;
          },
        );
      }

      startTimer();
    }

    return () => clearTimer();
  }, [isVisible, setVisible]);

  const show = () => {
    if (!isVisible) {
      setVisible(true);
      translateY.value = withSpring(
        position === 'top' ? TOAST_HEIGHT : -TOAST_HEIGHT,
      );
    }
  };

  useEffect(() => {
    if (!isVisible && showToast) {
      setVisible(true);
      show();
    }
  }, [showToast]);

  return (
    <View style={{flex: 1}}>
      <Animated.View
        style={[styles.animatedContainer, styles[position], animatedStyle]}>
        <View style={styles.animatedInnerContainer}>
          <View
            style={{
              // overflow: 'hidden',
              backgroundColor: color.white,
              borderRadius: normalize(4),
            }}>
            <View
              style={{
                flexDirection: 'row',
                height: TOAST_HEIGHT,
              }}>
              {isLeadingBar && (
                <View
                  style={[
                    styles.leadingBar,
                    {backgroundColor: statusBarColor},
                  ]}>
                  <Animated.View
                    style={[styles.leadingBar, animatedLeadingBar]}
                  />
                </View>
              )}
              <View style={{padding: normalize(5)}}>
                <Text>Toast!</Text>
              </View>
            </View>
            {isBottomBar && (
              <View style={styles.bottomBar}>
                <Animated.View
                  style={[
                    styles.bottomBar,
                    animatedBottomBar,
                    {backgroundColor: statusBarColor},
                  ]}
                />
              </View>
            )}
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

export default Toast;

const styles = StyleSheet.create({
  innerContainer: {flex: 1},
  animatedContainer: {
    width: TOAST_WIDTH,
    alignSelf: 'center',
    position: 'absolute',
    backgroundColor: color.white,
  },
  animatedInnerContainer: {
    backgroundColor: color.white,
    height: normalize(50),
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: normalize(4),
    elevation: 2,
    shadowColor: color.black,
    borderRadius: normalize(4),
  },
  top: {
    top: 0,
  },
  bottom: {
    bottom: 0,
  },
  leadingBar: {
    width: normalize(5),
    height: TOAST_HEIGHT,
    backgroundColor: color.gray,
    overflow: 'hidden',
  },
  bottomBar: {
    width: TOAST_WIDTH,
    height: normalize(5),
    backgroundColor: color.gray,
    overflow: 'hidden',
  },
});
