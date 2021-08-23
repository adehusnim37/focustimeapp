import React, { useState } from 'react';
import { View, StyleSheet, Text, Vibration, Platform } from 'react-native';
import * as Progress from 'react-native-progress';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';

import { colors } from '../utils/color';
import { fontSizes, paddingSizes } from '../utils/sizes';
import { CountDown } from '../components/Countdown';
import { RoundedButton } from '../components/RoundBtn';
import { Timing } from './timing';
import { useKeepAwake } from 'expo-keep-awake';

const DEFAULT_TIME = 0.1;
export const Timer = ({ focusSubject, onTimerEnd , clearSubject}) => {
  useKeepAwake();
  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const onProgress = (progress) => {
    setProgress(progress);
  };
  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 5000);
    } else {
      Vibration.vibrate(5000);
    }
  };
  const onEnd = () => {
    vibrate();
    setMinutes(DEFAULT_TIME); //set menit
    setProgress(1); //reset progress bar
    setIsStarted(false);
    onTimerEnd();
  };
  const changeTime = (min) => {
    setMinutes(min); //set menit
    setProgress(1); //reset progress bar
    setIsStarted(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <CountDown
          minutes={minutes}
          IsPaused={!isStarted}
          onProgress={onProgress}
          onEnd={onEnd}
        />
      </View>
      <View style={{ paddingTop: paddingSizes.xxl }}>
        <Text style={styles.title}>Fokus mengerjakan : </Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <View style={{ paddingTop: paddingSizes.md, alignItems: 'center' }}>
        <Progress.Pie
          progress={progress}
          size={125}
          color="lavender"
        />
      </View>
      <View style={styles.ButtonWrap}>
        <Timing onChangeTime={changeTime} />
      </View>
      <View style={styles.ButtonWrap}>
        {isStarted ? (
          <View style={styles.BtnCancel}>
          <RoundedButton title="pause" onPress={() => setIsStarted(false)} />
          <View style={styles.space}/>
          <RoundedButton title="clear" onPress={() => clearSubject()} />
        </View>
        ) : (
          <RoundedButton title="start" onPress={() => setIsStarted(true)} />
        )}
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: colors.white,
    textAlign: 'center',
  },
  task: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
    fontFamily: 'roboto',
    fontSize: '30'
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ButtonWrap: {
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: "center",
  },
  BtnCancel: {
    flexDirection: 'row',
    padding: 5,
    flex: 2,
    alignItems: 'center',
  },
  space: {
    width: 10,
    height: 10
  }
});
