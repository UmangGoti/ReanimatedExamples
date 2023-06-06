import React from 'react';
import {
  Animated,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {color, fonts, normalize, sizes} from '../Theme/theme';

const CARD_HEIGHT = normalize(200);
const CARD_TITLE = normalize(50);
const CARD_PADDING = normalize(25);
const {height} = Dimensions.get('window');

const cards = [
  {
    name: 'Shot',
    color: color.green,
    balance: 7945.52,
    cardNumber: '1234 1234 1234 1234',
    expiry: '01/23',
  },
  {
    name: 'XYZ ABC',
    color: color.blue,
    balance: 9998.02,
    cardNumber: '2345 2345 2345 2345',
    expiry: '02/23',
  },
  {
    name: 'XYZ ABC',
    color: color.red,
    balance: 4564.78,
    cardNumber: '3456 3456 3456 3456',
    expiry: '03/23',
  },
  {
    name: 'XYZ ABC',
    color: color.cyan,
    balance: 3132.32,
    cardNumber: '4321 4321 4321 4321',
    expiry: '04/23',
  },
  {
    name: 'XYZ ABC',
    color: color.magenta,
    balance: 4329.92,
    cardNumber: '5432 5432 5432 5432',
    expiry: '05/23',
  },
  {
    name: 'XYZ ABC',
    color: color.yellow,
    balance: 3424.56,
    cardNumber: '6543 6543 6543 6543',
    expiry: '06/23',
  },
  {
    name: 'XYZ ABC',
    color: color.purple,
    balance: 7683.55,
    cardNumber: '1267 7634 3277 1237',
    expiry: '07/23',
  },
];

export default class WalletCard extends React.Component {
  state = {
    y: new Animated.Value(0),
  };

  render() {
    const {y} = this.state;
    return (
      <View style={styles.container}>
        <Animated.ScrollView
          scrollEventThrottle={16}
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {y},
                },
              },
            ],
            {useNativeDriver: true},
          )}>
          <View style={StyleSheet.absoluteFill}>
            {cards.map((item, index) => {
              const inputRange = [-CARD_HEIGHT, 0];
              const outputRange = [
                CARD_HEIGHT * index,
                (CARD_HEIGHT - CARD_TITLE) * -index,
              ];
              if (index > 0) {
                inputRange.push(CARD_PADDING * index);
                outputRange.push(CARD_HEIGHT * -index);
              }
              const translateY = Animated.add(
                y,
                y.interpolate({
                  inputRange,
                  outputRange,
                  extrapolateRight: 'clamp',
                }),
              );
              return (
                <Animated.View
                  key={`${index}`}
                  style={{transform: [{translateY}]}}>
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      console.log(index);
                    }}>
                    <Card
                      cardColor={item?.color}
                      balance={item?.balance}
                      cardNumber={item?.cardNumber}
                      cardHolderName={item?.name}
                      expiry={item?.expiry}
                    />
                  </TouchableOpacity>
                </Animated.View>
              );
            })}
          </View>
        </Animated.ScrollView>
      </View>
    );
  }
}

const Card = ({cardColor, balance, cardHolderName, cardNumber, expiry}) => {
  return (
    <View style={[styles.card, {backgroundColor: cardColor}]}>
      <Text style={styles.balance}>$ {balance}</Text>
      <Text style={styles.cardNumber}>{cardNumber}</Text>
      <View style={styles.bottomContainer}>
        <Text style={styles.cardHolderName}>{cardHolderName}</Text>
        <Text style={styles.cardExpiry}>{expiry}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: sizes.CONTAINER_PADDING_HRIZONTAL,
  },
  scrollContainer: {
    height: height * 2,
  },
  card: {
    height: CARD_HEIGHT,
    borderRadius: normalize(12),
    padding: normalize(12),
    borderWidth: 3,
    borderColor: color.black,
  },
  balance: {
    fontFamily: fonts.NUNITO_BLACK_900,
    color: color.white,
    fontSize: 35,
    letterSpacing: normalize(1),
    flex: 1,
  },
  cardNumber: {
    fontFamily: fonts.NUNITO_BLACK_900,
    color: color.white,
    fontSize: 25,
    letterSpacing: normalize(1.5),
    alignSelf: 'center',
    flex: 1,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: normalize(10),
    paddingRight: normalize(10),
  },
  cardHolderName: {
    fontFamily: fonts.NUNITO_REGULAR_400,
    color: color.white,
    fontSize: 18,
  },
  cardExpiry: {
    fontFamily: fonts.NUNITO_REGULAR_400,
    color: color.white,
    fontSize: 18,
  },
});
