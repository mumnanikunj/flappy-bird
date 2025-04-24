import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const screenHeight = Dimensions.get('screen').height;

type Props = {
  obstacleLeft: number;
  obstacleWidth: number;
  obstacleGap: number;
  obstacleHeight: number;
};

const Obstacle = ({ obstacleLeft, obstacleWidth, obstacleGap, obstacleHeight }: Props) => {
  return (
    <>
      {/* Bottom Pipe */}
      <View
        style={[
          styles.obstacle,
          {
            width: obstacleWidth,
            height: obstacleHeight,
            left: obstacleLeft,
            bottom: 0,
          },
        ]}
      />
      {/* Top Pipe */}
      <View
        style={[
          styles.obstacle,
          {
            width: obstacleWidth,
            height: screenHeight - obstacleHeight - obstacleGap,
            left: obstacleLeft,
            bottom: obstacleHeight + obstacleGap,
          },
        ]}
      />
    </>
  );
};

const styles = StyleSheet.create({
  obstacle: {
    position: 'absolute',
    backgroundColor: 'green',
  },
});

export default Obstacle;
