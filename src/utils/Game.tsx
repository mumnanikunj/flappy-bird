import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  Text,
} from 'react-native';
import Bird from '../components/Bird';
import Obstacle from '../components/Obstance';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const Game = () => {
  const birdLeft = screenWidth / 2;
  const [birdBottom, setBirdBottom] = useState(screenHeight / 2);
  const [obstacleLeft, setObstacleLeft] = useState(screenWidth);
  const [obstacleHeight, setObstacleHeight] = useState(Math.random() * 300);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const gravity = 5;
  const jumpHeight = 30;
  const obstacleWidth = 50;
  const gap = 200;

  let gameTimer: NodeJS.Timeout;
  let obstacleTimer: NodeJS.Timeout;

  // Gravity
  useEffect(() => {
    if (!gameOver) {
      gameTimer = setInterval(() => {
        setBirdBottom(prev => {
          if (prev > 0) return prev - gravity;
          else {
            clearInterval(gameTimer);
            setGameOver(true);
            return 0;
          }
        });
      }, 30);
    }

    return () => clearInterval(gameTimer);
  }, [gameOver]);

  // Obstacles
  useEffect(() => {
    if (!gameOver) {
      if (obstacleLeft > -obstacleWidth) {
        obstacleTimer = setInterval(() => {
          setObstacleLeft(prev => prev - 5);
        }, 30);
      } else {
        setObstacleLeft(screenWidth);
        setObstacleHeight(Math.random() * 300);
        setScore(score => score + 1);
      }
    }
    return () => clearInterval(obstacleTimer);
  }, [obstacleLeft, gameOver]);

  // Collision
  useEffect(() => {
    if (
      birdLeft + 30 >= obstacleLeft &&
      birdLeft <= obstacleLeft + obstacleWidth &&
      (birdBottom <= obstacleHeight || birdBottom >= obstacleHeight + gap)
    ) {
      setGameOver(true);
    }
  }, [birdBottom, obstacleLeft]);

  const jump = () => {
    if (!gameOver && birdBottom < screenHeight) {
      setBirdBottom(prev => prev + jumpHeight);
    } else if (gameOver) {
      setBirdBottom(screenHeight / 2);
      setObstacleLeft(screenWidth);
      setScore(0);
      setGameOver(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={jump}>
      <View style={styles.container}>
        <Bird birdBottom={birdBottom} birdLeft={birdLeft} />
        <Obstacle
          obstacleLeft={obstacleLeft}
          obstacleWidth={obstacleWidth}
          obstacleHeight={obstacleHeight}
          obstacleGap={gap}
        />
        <Text style={styles.score}>{score}</Text>
        {gameOver && (
          <Text style={styles.gameOver}>Game Over! Tap to restart</Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'skyblue',
  },
  score: {
    position: 'absolute',
    top: 50,
    left: 20,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  gameOver: {
    position: 'absolute',
    top: screenHeight / 2 - 50,
    width: '100%',
    textAlign: 'center',
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Game;
