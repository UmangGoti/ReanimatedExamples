import React from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import {useAnimatedStyle, useSharedValue} from 'react-native-reanimated';

const App = () => {
  const rotation = useSharedValue(1);
  const savedRotation = useSharedValue(1);

  const rotationGesture = Gesture.Rotation()
    .onUpdate(e => {
      rotation.value = savedRotation.value + e.rotation;
    })
    .onEnd(() => {
      savedRotation.value = rotation.value;
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{rotateZ: `${(rotation.value / Math.PI) * 180}deg`}],
  }));

  return (
    <View style={{flex: 1}}>
      <GestureHandlerRootView style={{flex: 1}}>
        <GestureDetector gesture={rotationGesture}>
          <Animated.View style={[styles.box, animatedStyle]} />
        </GestureDetector>
      </GestureHandlerRootView>
    </View>
  );
};

export default App;
const BOX_SIZE = 200;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  box: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    borderColor: '#F5FCFF',
    alignSelf: 'center',
    backgroundColor: 'plum',
    margin: BOX_SIZE / 2,
  },
});
