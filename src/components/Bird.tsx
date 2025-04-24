import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';

type Props = {
  birdBottom: Animated.Value;
  birdLeft: number;
};

const Bird = ({ birdBottom, birdLeft }: Props) => {
  return (
    <Animated.View
      style={[
        styles.bird,
        {
          bottom: birdBottom,
          left: birdLeft,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  bird: {
    position: 'absolute',
    backgroundColor: 'gold',
    width: 30,
    height: 30,
    borderRadius: 25,
  },
});

export default Bird;
