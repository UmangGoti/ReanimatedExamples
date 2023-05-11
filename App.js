import React, {useEffect, useState} from 'react';
import {
  Alert,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';

import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {color, normalize, sizes} from './src/Theme/theme';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
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

function App() {
  const backgroundStyle = {
    backgroundColor: Colors.lighter,
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={'light-content'} backgroundColor={Colors.lighter} />
      <View style={{flex: 1}}>
        <ScrollView>
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
