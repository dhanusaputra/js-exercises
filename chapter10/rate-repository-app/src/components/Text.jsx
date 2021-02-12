import React from 'react';
import { Text as NativeText, StyleSheet } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
    margin: 3,
  },
  colorSecondary: {
    color: theme.colors.secondary,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
  typeButton: {
    backgroundColor: theme.colors.primary,
    color: 'white',
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
  },
  typeRedButton: {
    backgroundColor: '#d6394c',
    color: 'white',
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
  },
});

const Text = ({ color, fontSize, fontWeight, type, style, ...props }) => {
  const textStyle = [
    styles.text,
    color === 'secondary' && styles.colorSecondary,
    color === 'primary' && styles.colorPrimary,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontWeight === 'bold' && styles.fontWeightBold,
    type === 'button' && styles.typeButton,
    type === 'redButton' && styles.typeRedButton,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;
