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
  white: 'rgb(255,255,255)',
  gray: 'rgb(128,128,128)',
};

export const sizes = {
  CONTAINER_PADDING: normalize(20),
  CONTAINER_PADDING_VERTICAL: normalize(24),
  CONTAINER_PADDING_HRIZONTAL: normalize(16),
};
