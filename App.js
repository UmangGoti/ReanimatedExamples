import React, {useEffect} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  interpolateColor,
  scrollTo,
  useAnimatedRef,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDecay,
  withRepeat,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {color, normalize, sizes} from './src/Theme/theme';
const {width, heigth} = Dimensions.get('window');

function BoxChangeColor() {
  const boxColor = [
    color.red,
    color.green,
    color.blue,
    color.cyan,
    color.magenta,
    color.yellow,
    color.purple,
  ];

  const sharedBackgroundColor = useSharedValue(
    boxColor[Math.floor(Math.random() * 6)],
  );

  const animatedStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: sharedBackgroundColor.value,
    };
  });

  return (
    <View style={styles.container}>
      <Text style={styles.titleTxt}>Change Box Color</Text>
      <View height={normalize(20)} />
      <Animated.View style={[styles.animatedBoxContainer, animatedStyles]} />
      <View height={normalize(15)} />
      <Text
        onPress={() =>
          (sharedBackgroundColor.value =
            boxColor[Math.floor(Math.random() * 6)])
        }
        style={styles.buttonTxt}>
        Change Color
      </Text>
    </View>
  );
}

function AutoChangeBoxColor() {
  const boxColor = [
    'rgb(255,73,74)',
    'rgb(255,170,0)',
    'rgb(0,163,217)',
    'rgb(0,163,217)',
    'rgb(115,92,255)',
    'rgb(255,73,74)',
  ];

  const colorAnimation = useSharedValue(0);
  const calculatedColor = useDerivedValue(
    () => interpolateColor(colorAnimation.value, [0, 1, 2, 3, 4, 5], boxColor),
    [colorAnimation],
  );

  useEffect(() => {
    colorAnimation.value = withRepeat(
      withTiming(5, {
        duration: 3000,
        easing: Easing.linear,
      }),
      -1,
      true,
    );
  }, [colorAnimation]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      backgroundColor: calculatedColor.value,
    };
  });

  return (
    <View style={styles.container}>
      <Text style={styles.titleTxt}>Auto Change Box Color</Text>
      <View height={normalize(20)} />
      <Animated.View style={[styles.animatedBoxContainer, animatedStyles]} />
      <View height={normalize(15)} />
    </View>
  );
}

function BoxMove() {
  const offset = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateX: offset.value}],
    };
  });

  return (
    <View style={styles.container}>
      <Text style={styles.titleTxt}>Move The Box</Text>
      <View height={normalize(20)} />
      <Animated.View style={[styles.animatedBoxContainer, animatedStyles]} />
      <View height={normalize(15)} />
      <Text
        onPress={() =>
          (offset.value =
            Math.random() < 0.5
              ? Math.random() * (-width / 2) + normalize(50)
              : Math.random() * (width / 2) - normalize(50))
        }
        style={styles.buttonTxt}>
        Move
      </Text>
    </View>
  );
}

function BoxScale() {
  const scale = useSharedValue(0.9);
  const scaleAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: scale.value,
        },
      ],
    };
  });

  useEffect(() => {
    scale.value = withRepeat(
      withTiming(1, {
        duration: 250,
        easing: Easing.bezierFn(0.9, 1, 0.9, 1),
      }),
      -1,
      true,
    );
  });

  return (
    <View style={styles.container}>
      <Text style={styles.titleTxt}>Auto Change Box Scale</Text>
      <View height={normalize(20)} />
      <Animated.View
        style={[
          styles.animatedBoxContainer,
          scaleAnimatedStyle,
          {transform: [{scale: 1}]},
        ]}
      />
      <View height={normalize(15)} />
    </View>
  );
}

function BoxMoveWithSpring() {
  const offset = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateX: offset.value}],
    };
  });

  return (
    <View style={styles.container}>
      <Text style={styles.titleTxt}>Move Box With Spring Effect</Text>
      <View height={normalize(20)} />
      <Animated.View style={[styles.animatedBoxContainer, animatedStyles]} />
      <View height={normalize(15)} />
      <Text
        onPress={() =>
          (offset.value = withSpring(
            Math.random() < 0.5
              ? Math.random() * (-width / 2) + normalize(50)
              : Math.random() * (width / 2) - normalize(50),
          ))
        }
        style={styles.buttonTxt}>
        Move
      </Text>
    </View>
  );
}

function BoxMoveWithDampingAndStiffness() {
  const offset = useSharedValue(0);

  const defaultSpringAnimatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateX: withSpring(offset.value)}],
    };
  });

  const customSpringAnimatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withSpring(offset.value, {
            damping: 30,
            stiffness: 100,
          }),
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <Text style={styles.titleTxt}>
        Move Box With Default And Damping With Stiffness Spring Effect
      </Text>
      <View height={normalize(20)} />
      <Animated.View
        style={[styles.animatedBoxContainer, defaultSpringAnimatedStyles]}
      />
      <View height={normalize(5)} />
      <Animated.View
        style={[styles.animatedBoxContainer, customSpringAnimatedStyles]}
      />
      <View height={normalize(15)} />
      <Text
        onPress={() =>
          (offset.value =
            Math.random() < 0.5
              ? Math.random() * (-width / 2) + normalize(50)
              : Math.random() * (width / 2) - normalize(50))
        }
        style={styles.buttonTxt}>
        Move
      </Text>
    </View>
  );
}

function AnimatedSlider() {
  const sliderWidth = normalize(295);

  const animatedWidth = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: animatedWidth.value,
    };
  });

  return (
    <View style={styles.container}>
      <Text style={styles.titleTxt}>Animated Slider</Text>
      <View height={normalize(20)} />
      <View
        style={{
          width: sliderWidth,
          borderWidth: 1,
          borderRadius: normalize(50),
          borderColor: color.black,
        }}>
        <Animated.View
          style={[
            styles.animatedBoxContainer,
            animatedStyles,
            {height: normalize(10), borderRadius: normalize(50)},
          ]}
        />
      </View>
      <View height={normalize(15)} />
      <Text
        onPress={() =>
          (animatedWidth.value = withSpring(
            Math.random() < 0.5
              ? Math.random() * sliderWidth
              : Math.random() * sliderWidth,
          ))
        }
        style={styles.buttonTxt}>
        Move
      </Text>
    </View>
  );
}

function TapGesture() {
  const pressed = useSharedValue(false);

  const tap = Gesture.Tap()
    .onTouchesDown(() => {
      pressed.value = true;
    })
    .onTouchesUp(() => {
      pressed.value = false;
    });

  const animatedStyles = useAnimatedStyle(() => ({
    backgroundColor: pressed.value ? color.magenta : color.blue,
    transform: [{scale: withTiming(pressed.value ? 1.2 : 1)}],
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.titleTxt}>Long Press Event</Text>
      <View height={normalize(20)} />
      <GestureHandlerRootView
        style={(styles.container, {borderBottomWidth: 0})}>
        <GestureDetector gesture={tap}>
          <Animated.View
            style={[styles.animatedBoxContainer, animatedStyles]}
          />
        </GestureDetector>
      </GestureHandlerRootView>
    </View>
  );
}

function DoubleTapGesture() {
  const pressed = useSharedValue(false);
  const backgroundColor = useSharedValue(color.blue);

  const singleTap = Gesture.Tap()
    .maxDuration(250)
    .numberOfTaps(1)
    .onStart(() => {
      pressed.value = !pressed.value;
      backgroundColor.value = color.green;
    });

  const doubleTap = Gesture.Tap()
    .maxDuration(250)
    .numberOfTaps(2)
    .onStart(() => {
      pressed.value = !pressed.value;
      backgroundColor.value = color.magenta;
    });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{scale: withTiming(pressed.value ? 1.2 : 1)}],
    backgroundColor: pressed.value ? backgroundColor.value : color.blue,
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.titleTxt}>Double Tap</Text>
      <View height={normalize(20)} />
      <GestureHandlerRootView
        style={(styles.container, {borderBottomWidth: 0})}>
        <GestureDetector gesture={Gesture.Exclusive(doubleTap, singleTap)}>
          <Animated.View
            style={[styles.animatedBoxContainer, animatedStyles]}
          />
        </GestureDetector>
      </GestureHandlerRootView>
    </View>
  );
}

function BoxRotation() {
  const rotation = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{rotateZ: `${rotation.value}deg`}],
  }));

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 1000,
        easing: Easing.linear,
      }),
      -1,
      false,
    );
  });

  return (
    <View style={styles.container}>
      <Text style={styles.titleTxt}>Rotation</Text>
      <View height={normalize(20)} />
      <Animated.View style={[styles.animatedBoxContainer, animatedStyle]} />
    </View>
  );
}

function BoxWithDrag() {
  const pressed = useSharedValue(false);
  const offset = useSharedValue(0);

  const pan = Gesture.Pan()
    .onBegin(() => {
      pressed.value = true;
    })
    .onChange(event => {
      offset.value = event.translationX;
    })
    .onFinalize(() => {
      offset.value = withSpring(0);
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
    <View style={styles.container}>
      <Text style={styles.titleTxt}>Box Drag Event</Text>
      <View height={normalize(20)} />
      <GestureHandlerRootView
        style={[styles.container, {borderBottomWidth: 0}]}>
        <GestureDetector gesture={pan}>
          <Animated.View
            style={[
              styles.animatedBoxContainer,
              animatedStyle,
              {cursor: 'grab'},
            ]}
          />
        </GestureDetector>
      </GestureHandlerRootView>
    </View>
  );
}

function BoxVelocityXDrag() {
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
    <View style={styles.container} onLayout={onLayout}>
      <Text style={styles.titleTxt}>Box Drag Event with velocityX</Text>
      <View height={normalize(20)} />
      <GestureHandlerRootView
        style={[styles.container, {borderBottomWidth: 0}]}>
        <GestureDetector gesture={pan}>
          <Animated.View
            style={[
              styles.animatedBoxContainer,
              animatedStyle,
              {cursor: 'grab'},
            ]}
          />
        </GestureDetector>
      </GestureHandlerRootView>
    </View>
  );
}

function PaginationDot() {
  const scrollViewRef = useAnimatedRef();

  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const x = useSharedValue(0);
  const size = useSharedValue(normalize(10));
  const smallDotSize = useSharedValue(normalize(8));
  const bigDotSize = useSharedValue(normalize(10));
  const translateXStarted = useSharedValue(false);
  useDerivedValue(() => {
    scrollTo(scrollViewRef, x.value, 0, true);
  });

  const scrollViewStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: translateXStarted.value ? color.cyan : color.white,
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
    if (x.value < size.value * (arr.length - 1)) x.value = x.value + size.value;
  };

  const onPressSubtract = () => {
    if (x.value > 0) x.value = x.value - size.value;
  };

  return (
    <View style={[styles.container]}>
      <Text style={styles.titleTxt}>Swipe to handle pagination dots</Text>
      <View
        style={{
          flexDirection: 'row',
          height: normalize(40),
        }}>
        <Text
          style={{
            color: color.black,
            fontSize: normalize(20),
            width: normalize(20),
            height: normalize(20),
          }}
          onPress={onPressSubtract}>
          -
        </Text>
        <GestureHandlerRootView style={{flex: 1}}>
          <GestureDetector gesture={pan}>
            <Animated.ScrollView
              ref={scrollViewRef}
              horizontal={true}
              scrollEnabled={false}
              showsHorizontalScrollIndicator={false}
              style={[
                {
                  width: normalize(120),
                  borderRadius: normalize(50),
                  paddingRight: normalize(10),
                  alignSelf: 'center',
                  flexDirection: 'row',
                },
                scrollViewStyle,
              ]}
              contentContainerStyle={{alignItems: 'center'}}>
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
                      [color.black, color.blue, color.black],
                    ),
                  };
                });
                return (
                  <Animated.View
                    key={`Animated.View - ${index}`}
                    style={[
                      {
                        borderRadius: normalize(50),
                        margin: normalize(5),
                      },
                      animatedStyle,
                      ,
                    ]}
                  />
                );
              })}
            </Animated.ScrollView>
          </GestureDetector>
        </GestureHandlerRootView>
        <Text
          style={{
            color: color.black,
            fontSize: normalize(20),
            width: normalize(20),
            height: normalize(20),
          }}
          onPress={onPressAdd}>
          +
        </Text>
      </View>
    </View>
  );
}

function App() {
  const backgroundStyle = {
    backgroundColor: color.white,
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={'light-content'} backgroundColor={Colors.lighter} />
      <View style={{flex: 1, backgroundColor: color.white}}>
        <ScrollView>
          <PaginationDot />
          <BoxChangeColor />
          <AutoChangeBoxColor />
          <BoxMove />
          <BoxScale />
          <BoxMoveWithSpring />
          <BoxMoveWithDampingAndStiffness />
          <AnimatedSlider />
          <TapGesture />
          <DoubleTapGesture />
          <BoxRotation />
          <BoxVelocityXDrag />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: sizes.CONTAINER_PADDING_HRIZONTAL,
    paddingVertical: sizes.CONTAINER_PADDING_VERTICAL,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    borderBottomWidth: 1,
    flex: 1,
  },
  titleTxt: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
  buttonTxt: {
    fontWeight: '400',
    textAlign: 'justify',
    color: '#000',
  },
  animatedBoxContainer: {
    width: normalize(50),
    height: normalize(50),
    borderRadius: normalize(12),
    backgroundColor: color.blue,
  },
});
