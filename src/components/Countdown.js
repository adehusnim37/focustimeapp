import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { fontSizes, paddingSizes } from '../utils/sizes';

const convertTime = (min) => min * 1000 * 60;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const CountDown = ({ minutes, IsPaused, onProgress, onEnd }) => {
  const interval = React.useRef(null);
  const CountDown = () => {
    setMilliS((time) => {
      if (time === 0) {
        clearInterval(interval.current);
        onEnd();
        return time;
      }
      const sisaWaktu = time - 1000;
      onProgress(sisaWaktu / convertTime(minutes));
      return sisaWaktu;
    });
  };

  useEffect(() => {
    setMilliS(convertTime(minutes));
  }, [minutes]);

  useEffect(() => {
    if (IsPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(CountDown, 1000);

    return () => clearInterval(interval.current);
  }, [IsPaused]);

  const [milliS, setMilliS] = useState(convertTime(minutes));

  const menit = Math.floor(milliS / 1000 / 60) % 60;
  const detik = Math.floor(milliS / 1000) % 60;
  return (
    <Text style={styles.text}>
      {formatTime(menit)}:{formatTime(detik)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    padding: paddingSizes.lg,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'rgba(94, 132 ,22 , 0.4)',
  },
});
