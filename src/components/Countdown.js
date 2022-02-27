import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { colors } from '../utils/colors';
import { spacing, fontSizes } from '../utils/sizes';

const minutesToMillis = (min) => min * 1000 * 60;
const formatTime = (time) => time < 10 ? `0${time}` : time;

export const Countdown = ({
  minutes = 1,
  isPaused,
  onProgress,
  onEnd,
}) => {
  const interval = React.useRef(null);
  const [millis, setMillis] = useState(null);
  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;

  const countdown = () => {
    setMillis((time) => {
      if(time === 0) {
        clearInterval(interval.current);
        return time
      }

      const timeLeft = time - 1000;

      return timeLeft;
    })
  }

  useEffect(() => {
    setMillis(minutesToMillis(minutes));
  },[minutes])

  useEffect(() => {
    onProgress(millis / minutesToMillis(minutes));
    if(millis === 0) {
      onEnd();
    }
  }, [millis])

  useEffect(() => {
    if (isPaused) {
      if(interval.current) clearInterval(interval.current);
      return
    }

    interval.current = setInterval(countdown, 1000);

    return () => clearInterval(interval.current);
  }, [isPaused]) 

  return (
    <Text style={styles.text}>{formatTime(minute)}:{formatTime(seconds)}</Text>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.black,
    padding: spacing.lg,
    backgroundColor: 'rgba(94,132, 226, 0.3)',
  }
})