import {StyleSheet} from 'react-native';
import {color, fonts, sizes} from '../Theme/theme';

export const baseStyles = StyleSheet.create({
  rootView: {backgroundColor: color.white, flex: 1},
  rootSafeAreaView: {},
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: sizes.CONTAINER_PADDING_HRIZONTAL,
    paddingVertical: sizes.CONTAINER_PADDING_VERTICAL,
    borderBottomColor: color.black_01,
    borderBottomWidth: 1,
  },
  containerWithShadow: {
    alignItems: 'center',
    paddingHorizontal: sizes.CONTAINER_PADDING_HRIZONTAL,
    paddingVertical: sizes.CONTAINER_PADDING_VERTICAL,
    borderBottomColor: color.black_01,
    borderBottomWidth: 1,
    flex: 1,
    backgroundColor: color.white,
    shadowColor: color.black,
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  gestureHandlerRootContainer: {
    flex: 1,
  },
  titleTxt: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: color.black,
    fontFamily: fonts.NUNITO_LIGHT_300,
  },
  buttonTxt: {
    fontFamily: fonts.NUNITO_REGULAR_400,
    textAlign: 'justify',
    color: color.black,
  },
});
