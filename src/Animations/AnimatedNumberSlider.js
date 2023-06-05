import React from 'react';
import {Dimensions, Platform, StyleSheet, View} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {color, fonts, sizes} from '../Theme/theme';

const {width} = Dimensions.get('window');

const ITEM_SIZE = (width - 2 * sizes.CONTAINER_PADDING_HRIZONTAL) * 0.4;
const ITEM_SPACE = (width - ITEM_SIZE) / 2;

const AnimatedRenderItem = ({item, index, scrollX}) => {
  const animatedStyle = useAnimatedStyle(() => {
    const input = [
      ITEM_SIZE * (index - 1),
      ITEM_SIZE * index,
      ITEM_SIZE * (index + 1),
    ];
    return {
      transform: [
        {
          scale: interpolate(
            scrollX.value,
            input,
            [0.6, 1, 0.6],
            Extrapolate.CLAMP,
          ),
        },
      ],
      opacity: interpolate(
        scrollX.value,
        input,
        [0.5, 1, 0.5],
        Extrapolate.CLAMP,
      ),
    };
  });

  return (
    <View
      style={{
        width: ITEM_SIZE,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Animated.Text style={[styles.text, animatedStyle]}>{item}</Animated.Text>
    </View>
  );
};

const AnimatedNumberSlider = () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const scrollX = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollX.value = event.contentOffset.x;
  });

  const renderItem = ({item, index}) => {
    return <AnimatedRenderItem item={item} index={index} scrollX={scrollX} />;
  };

  return (
    <View style={styles.container}>
      <Animated.FlatList
        data={data}
        keyExtractor={(item, index) => `AnimatedFlatList-${index}`}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_SIZE}
        decelerationRate="fast"
        bounces={false}
        onScroll={scrollHandler}
        renderItem={renderItem}
        style={{flexGrow: 0}}
        contentContainerStyle={{
          paddingHorizontal: ITEM_SPACE,
        }}
      />
    </View>
  );
};

export default AnimatedNumberSlider;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: color.white,
    borderBottomColor: color.black_01,
    borderBottomWidth: 1,
  },
  text: {
    fontSize: Platform.OS === 'ios' ? ITEM_SIZE * 0.8 : ITEM_SIZE * 0.6,
    color: color.black,
    textAlign: 'center',
    fontFamily: fonts.NUNITO_BOLD_700,
  },
});
