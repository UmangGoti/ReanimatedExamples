import React, {Fragment, useCallback, useMemo} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {
  AnimatedHorizontalSlider,
  AnimatedLikeWithCount,
  AnimatedNumberSlider,
  AutoChangeBoxColor,
  AutoChangeBoxScale,
  AutoScrollView,
  BoxWithVelocityXDrag,
  CircularProgressbar,
  LongTapOnBox,
  PaginationDotWithPanGesture,
  RippleEffectButton,
  RotationWithScale,
  SingleOrDoubleTapOnBox,
  SlideInUpAndDownText,
  TabToChangeColor,
  TapToMoveBox,
  TapToMoveBoxWithSpringEffect,
  MarqueeList,
  SoundWave,
} from './src/Animations';
import {color, fonts, normalize, sizes} from './src/Theme/theme';
import {baseStyles} from './src/styles/common';
import {NavigationContainer} from '@react-navigation/native';

function App() {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.backgroundStyle}>
        <StatusBar barStyle={'light-content'} backgroundColor={color.white} />
        <GestureHandlerRootView style={baseStyles.gestureHandlerRootContainer}>
          <View style={styles.container2}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <SoundWave />
              <AnimatedLikeWithCount />
              <AnimatedNumberSlider />
              <CircularProgressbar />
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
              <AutoScrollView />
            </ScrollView>
          </View>
        </GestureHandlerRootView>
      </SafeAreaView>
    </NavigationContainer>
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
