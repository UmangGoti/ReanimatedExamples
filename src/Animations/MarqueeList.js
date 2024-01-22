import React, {useCallback, useEffect} from 'react';
import {Platform, View, Text} from 'react-native';
import Animated, {
  cancelAnimation,
  defineAnimation,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import {baseStyles} from '../styles/common';
import {normalize} from '../Theme/theme';

const ios = Platform.OS === 'ios';

const SAFETY_MARGIN = 100;
const SingleElement = ({
  transX,
  offset = {value: 0},
  sumWidth,
  children,
  onLayout,
}) => {
  const style = useAnimatedStyle(() => {
    const transWithinRange =
      (((transX.value + SAFETY_MARGIN) % sumWidth.value) - sumWidth.value) %
      sumWidth.value;
    return {
      transform: [
        {
          translateX: transWithinRange + offset.value - SAFETY_MARGIN,
        },
      ],
    };
  });
  return (
    <Animated.View
      onLayout={onLayout}
      style={[
        {
          flexDirection: 'row',
          position: 'absolute',
        },
        style,
      ]}>
      {children}
    </Animated.View>
  );
};

const SwipeableList = ({components, height, speed}) => {
  const transX = useSharedValue(0);
  const swiping = useSharedValue(0);
  const offset = useSharedValue(100000);

  useEffect(
    useCallback(() => {
      swiping.value = withSpeed({targetSpeed: speed});
      return () => cancelAnimation(swiping);
    }, [speed, swiping]),
  );

  const translate = useDerivedValue(() => -(swiping.value + transX.value), []);

  return (
    <Animated.View>
      <Animated.View style={{height, width: '100%'}}>
        <Animated.View
          style={{
            flexDirection: 'row',
          }}>
          <SingleElement
            onLayout={e => {
              offset.value = e.nativeEvent.layout.width;
            }}
            sumWidth={offset}
            transX={translate}>
            {components.map(({view}) => view({}))}
          </SingleElement>
          <SingleElement offset={offset} sumWidth={offset} transX={translate}>
            {components.map(({view}) => view({}))}
          </SingleElement>
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
};

export default MarqueeList = ({height, items = [], renderItem, speed}) => {
  return (
    <>
      <View style={baseStyles.container}>
        <View height={normalize(20)} />
        <SwipeableList
          components={items.map((item, index) => ({
            view: ios
              ? () => renderItem({index, item})
              : ({onPressCancel, onPressStart}) =>
                  renderItem({
                    index,
                    item,
                    onPressCancel,
                    onPressStart,
                  }),
          }))}
          height={height}
          speed={speed}
        />
        <View height={normalize(15)} />
        <Text style={baseStyles.titleTxt}>Marquee List</Text>
      </View>
    </>
  );
};

function withSpeed(userConfig) {
  'worklet';

  return defineAnimation(0, () => {
    'worklet';
    const config = {
      acceleration: 10,
      targetSpeed: userConfig.targetSpeed,
    };
    if (userConfig) {
      Object.keys(userConfig).forEach(key => (config[key] = userConfig[key]));
    }

    function speed(animation, now) {
      const {lastTimestamp, current} = animation;

      const deltaTime = Math.min(now - lastTimestamp, 64);
      animation.lastTimestamp = now;
      if (config.targetSpeed > 0) {
        animation.speed = Math.min(
          config.targetSpeed,
          animation.speed + config.acceleration,
        );
      } else {
        animation.speed = Math.max(
          config.targetSpeed,
          animation.speed - config.acceleration,
        );
      }

      animation.current = current + (deltaTime / 1000) * animation.speed;
    }

    function onStart(animation, value, now) {
      animation.current = value;
      animation.lastTimestamp = now;
      animation.initialVelocity = config.velocity;
      animation.speed = 0;
    }

    return {
      onFrame: speed,
      onStart,
    };
  });
}
