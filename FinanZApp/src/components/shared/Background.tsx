import {Dimensions, ImageBackground, StyleSheet} from 'react-native';
import React from 'react';
import ImgBlue from '../../assets/background_blue.png';
import ImgBlack from '../../assets/background_black.png';

interface Props {
  children: React.ReactNode;
  variant: 'black' | 'blue';
}
const Background = ({children, variant}: Props) => {
  return (
    <ImageBackground
      source={variant === 'black' ? ImgBlack : ImgBlue}
      resizeMode="cover"
      style={styles.image}>
      {children}
    </ImageBackground>
  );
};

export default Background;

const styles = StyleSheet.create({
  image: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
