import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  AnimatedHorizontalSlider,
  AutoChangeBoxColor,
  AutoChangeBoxScale,
  BoxWithVelocityXDrag,
  LongTapOnBox,
  PaginationDotWithPanGesture,
  RippleEffectButton,
  RotationWithScale,
  SingleOrDoubleTapOnBox,
  SlideInUpAndDownText,
  TabToChangeColor,
  TapToMoveBox,
  TapToMoveBoxWithSpringEffect,
} from './src/Animations';
import {color, normalize, sizes} from './src/Theme/theme';
import {baseStyles} from './src/styles/common';

function App() {
  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <StatusBar barStyle={'light-content'} backgroundColor={color.white} />
      <GestureHandlerRootView style={baseStyles.gestureHandlerRootContainer}>
        <View style={styles.container2}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <SlideInUpAndDownText />
            <RippleEffectButton />
            <PaginationDotWithPanGesture />
            <TabToChangeColor />
            <AutoChangeBoxColor />
            <TapToMoveBox />
            <TapToMoveBoxWithSpringEffect />
            <AutoChangeBoxScale />
            <AnimatedHorizontalSlider />
            <LongTapOnBox />
            <SingleOrDoubleTapOnBox />
            <RotationWithScale />
            <BoxWithVelocityXDrag />
          </ScrollView>
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

export default App;

const styles = StyleSheet.create({
  container2: {flex: 1, backgroundColor: color.white},
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
  backgroundStyle: {
    backgroundColor: color.white,
    flex: 1,
  },
});
