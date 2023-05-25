import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {color, fonts, normalize} from '../Theme/theme';
import {baseStyles} from '../styles/common';

const ANIMATION_DURATION = 200;
const ANIMATION_DELAY = 80;
const FONT_SIZE = 60;
const ANIMATION_DISTANCE = FONT_SIZE + 60;

const SlideInUpAndDownText = () => {
  const oldCount = useSharedValue(-1);
  const newCount = useSharedValue(0);
  const byYou = useSharedValue(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    newCount.value = count;
  }, [count, newCount]);

  const entering = values => {
    'worklet';
    if (oldCount.value === -1) {
      oldCount.value = count;
      return {initialValues: {}, animations: {}};
    }

    const offset = (oldCount.value < count ? 1 : -1) * ANIMATION_DISTANCE;
    oldCount.value = count;
    const animations = {
      originY: withDelay(
        ANIMATION_DELAY,
        withTiming(values.targetOriginY, {duration: ANIMATION_DURATION}),
      ),
    };
    const initialValues = {
      originY: values.targetOriginY + offset,
    };
    return {
      initialValues,
      animations,
    };
  };

  const exiting = values => {
    'worklet';
    const offset =
      (count > (newCount.value ?? count) ? 1 : -1) * ANIMATION_DISTANCE;
    const animations = {
      originY: withDelay(
        ANIMATION_DELAY,
        withTiming(values.currentOriginY + offset, {
          duration: ANIMATION_DURATION,
        }),
      ),
    };
    const initialValues = {
      originY: values.currentOriginY,
    };
    return {
      initialValues,
      animations,
    };
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      borderColor: withTiming(byYou.value ? color.blue : color.black, {
        duration: 200,
      }),
      backgroundColor: withTiming(byYou.value ? color.blue_03 : color.white, {
        duration: 200,
      }),
    };
  });

  const animatedFontStyle = useAnimatedStyle(() => {
    return {
      color: withTiming(byYou.value ? color.blue : color.black, {
        duration: 200,
      }),
    };
  });

  const onPressAdd = () => {
    setCount(count + 1);
  };

  const onPressSubtract = () => {
    if (count > 0) {
      if (!byYou.value) {
        setCount(count - 1);
      } else {
        if (byYou.value && count > 1) {
          setCount(count - 1);
        }
      }
    }
  };

  const onPressCountBox = () => {
    if (!byYou.value) {
      setCount(count + 1);
    } else {
      setCount(count - 1);
    }
    byYou.value = !byYou.value;
  };

  return (
    <View style={baseStyles.container}>
      <Text style={baseStyles.titleTxt}>Entery/exit text animation </Text>
      <View height={normalize(20)} />
      <TouchableOpacity onPress={onPressCountBox}>
        <Animated.View style={[styles.animatedTextContainer, animatedStyles]}>
          <Animated.Text
            key={count}
            entering={entering}
            exiting={exiting}
            style={[styles.animatedText, animatedFontStyle]}>
            {count}
          </Animated.Text>
        </Animated.View>
      </TouchableOpacity>
      <View style={styles.buttonConatiner}>
        <Button onPress={onPressAdd} title={'+'} />
        <View width={normalize(20)} />
        <Button onPress={onPressSubtract} title={'-'} />
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

export default SlideInUpAndDownText;

const styles = StyleSheet.create({
  animatedTextContainer: {
    overflow: 'hidden',
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: normalize(50),
    paddingRight: normalize(50),
    paddingTop: normalize(1),
    paddingBottom: normalize(1),
    borderRadius: normalize(18),
  },
  animatedText: {
    fontFamily: fonts.NUNITO_EXTRABOLD_800,
    fontSize: FONT_SIZE,
  },
  button: {
    backgroundColor: color.black,
    width: normalize(30),
    height: normalize(30),
    borderRadius: normalize(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTitle: {
    fontFamily: fonts.NUNITO_EXTRABOLD_800,
    fontSize: 20,
    color: color.white,
  },
  buttonConatiner: {
    flexDirection: 'row',
    marginTop: normalize(12),
  },
});
