import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  scrollTo,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import {color, fonts, normalize} from '../Theme/theme';
import {baseStyles} from '../styles/common';

const PaginationDotWithPanGesture = () => {
  const scrollViewRef = useAnimatedRef();
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const x = useSharedValue(0);
  const size = useSharedValue(normalize(10));
  const smallDotSize = useSharedValue(normalize(6));
  const bigDotSize = useSharedValue(normalize(8));
  const translateXStarted = useSharedValue(false);

  useDerivedValue(() => {
    scrollTo(scrollViewRef, x.value, 0, true);
  });

  const scrollViewStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: translateXStarted.value ? color.black_02 : color.white,
    };
  });

  const pan = Gesture.Pan()
    .onStart(() => {
      translateXStarted.value = true;
    })
    .onChange(event => {
      let isTranslationX =
        Math.floor(Math.abs(event.translationX) % 10) === 2 ||
        Math.floor(Math.abs(event.translationX) % 10) === 6 ||
        Math.floor(Math.abs(event.translationX) % 10) === 10;
      if (
        event.translationX > 0 &&
        isTranslationX &&
        x.value < size.value * (arr.length - 1)
      ) {
        x.value = x.value + size.value;
      } else if (event.translationX < 0 && isTranslationX && x.value > 0) {
        x.value = x.value - size.value;
      }
    })
    .onEnd(() => {
      translateXStarted.value = false;
    });

  const onPressAdd = () => {
    if (x.value < size.value * (arr.length - 1)) {
      x.value = x.value + size.value;
    }
  };

  const onPressSubtract = () => {
    if (x.value > 0) {
      x.value = x.value - size.value;
    }
  };

  return (
    <View style={[baseStyles.container]}>
      <Text style={baseStyles.titleTxt}>Swipe to handle pagination dots</Text>
      <View height={normalize(20)} />
      <View style={styles.buttonContainer}>
        <Button title={'-'} onPress={onPressSubtract} />
        <View style={styles.container}>
          <GestureDetector gesture={pan}>
            <Animated.ScrollView
              ref={scrollViewRef}
              horizontal={true}
              scrollEnabled={false}
              showsHorizontalScrollIndicator={false}
              style={[styles.scrollContainer, scrollViewStyle]}
              contentContainerStyle={styles.contentContainerStyle}>
              {arr.map((item, index) => {
                const animatedStyle = useAnimatedStyle(() => {
                  return {
                    width: interpolate(
                      x.value,
                      [
                        size.value * (index - 1),
                        size.value * index,
                        size.value * (index + 1),
                      ],
                      [
                        smallDotSize.value,
                        bigDotSize.value,
                        smallDotSize.value,
                      ],
                      Extrapolate.EXTEND,
                    ),
                    height: interpolate(
                      x.value,
                      [
                        size.value * (index - 1),
                        size.value * index,
                        size.value * (index + 1),
                      ],
                      [
                        smallDotSize.value,
                        bigDotSize.value,
                        smallDotSize.value,
                      ],
                      Extrapolate.EXTEND,
                    ),
                    backgroundColor: interpolateColor(
                      x.value,
                      [
                        size.value * (index - 1),
                        size.value * index,
                        size.value * (index + 1),
                      ],
                      [color.black_05, color.blue, color.black_05],
                    ),
                  };
                });
                return (
                  <Animated.View
                    key={`Animated.View - ${index}`}
                    style={[styles.dots, animatedStyle]}
                  />
                );
              })}
            </Animated.ScrollView>
          </GestureDetector>
        </View>
        <Button title={'+'} onPress={onPressAdd} />
      </View>
    </View>
  );
};

const Button = ({onPress, title}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={styles.button}>
      <Text style={styles.buttonTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

export default PaginationDotWithPanGesture;

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    width: normalize(60),
  },
  contentContainerStyle: {alignItems: 'center'},
  scrollContainer: {
    flexDirection: 'row',
    height: normalize(30),
    borderRadius: normalize(50),
  },
  dots: {
    borderRadius: normalize(50),
    margin: normalize(5),
  },
  button: {
    backgroundColor: color.blue,
    width: normalize(30),
    height: normalize(30),
    borderRadius: normalize(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTitle: {
    fontFamily: fonts.NUNITO_BOLD_700,
    fontSize: 20,
    color: color.white,
  },
});
