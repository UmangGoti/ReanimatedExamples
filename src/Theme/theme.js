import {Dimensions} from 'react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

export const scaleWidth = SCREEN_WIDTH / 375;
export const scaleHeight = SCREEN_HEIGHT / 812;
export const _scale = Math.min(scaleWidth, scaleHeight);

export function normalize(size) {
  return Math.ceil(size * _scale);
}

export const color = {
  red: 'rgb(255, 0, 0)',
  green: 'rgb(0, 255, 0)',
  blue: 'rgb(0, 0, 255)',
  blue_05: 'rgba(0, 0, 255,0.5)',
  blue_04: 'rgba(0, 0, 255,0.4)',
  blue_03: 'rgba(0, 0, 255,0.3)',
  cyan: 'rgb(0, 255, 255)',
  magenta: 'rgb(255, 0, 255)',
  yellow: 'rgb(255, 255, 0)',
  purple: 'rgb(160, 32, 240)',
  black: 'rgb(0,0,0)',
  black_01: 'rgba(0,0,0,0.1)',
  black_02: 'rgba(0,0,0,0.2)',
  black_03: 'rgba(0,0,0,0.3)',
  black_04: 'rgba(0,0,0,0.4)',
  black_05: 'rgba(0,0,0,0.5)',
  black_06: 'rgba(0,0,0,0.6)',
  black_07: 'rgba(0,0,0,0.7)',
  black_08: 'rgba(0,0,0,0.8)',
  black_09: 'rgba(0,0,0,0.9)',
  white: 'rgb(255,255,255)',
  gray: 'rgb(128,128,128)',
  transparent: 'transparent',
};

export const sizes = {
  CONTAINER_PADDING: normalize(20),
  CONTAINER_PADDING_VERTICAL: normalize(24),
  CONTAINER_PADDING_HRIZONTAL: normalize(16),
  SCREEN_WIDTH: SCREEN_WIDTH,
};

export const fonts = {
  NUNITO_EXTRALIGHT_200: 'Nunito-ExtraLight',
  NUNITO_LIGHT_300: 'Nunito-Light',
  NUNITO_REGULAR_400: 'Nunito-Regular',
  NUNITO_MEDIUM_500: 'Nunito-Medium',
  NUNITO_SEMIBOLD_600: 'Nunito-SemiBold',
  NUNITO_BOLD_700: 'Nunito-Bold',
  NUNITO_EXTRABOLD_800: 'Nunito-ExtraBold',
  NUNITO_BLACK_900: 'Nunito-Black',
};
