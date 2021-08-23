import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Platform , AsyncStorage} from 'react-native';
import { Focus } from './src/features/focus/Focus';
import { colors } from './src/utils/color';
import { Timer } from './src/timer/timer';
import { paddingSizes } from './src/utils/sizes';
import { FocusHistory } from './src/features/focus/FocusHistory';

const STATUSES = {
  COMPLETE: 1,
  CANCELLED: 2,
};
export default function App() {
  const [focusSubject, setFocusSubject, clearSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const addFocusHistory = (subject, status) => {
    setFocusHistory([...focusHistory, { subject, status }]);
  };
  
  const onClear = () => {
    setFocusHistory([]);
  };

  const saveFocusHistory = async () => {
    try {
      AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
    } catch (e) {
      console.log(e);
    }
  };
  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('focusHistory');

      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadFocusHistory();
  }, []);

  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            addFocusHistory(focusSubject, STATUSES.COMPLETE);
            setFocusSubject(null);
          }}
          clearSubject={() => {
            addFocusHistory(focusSubject, STATUSES.CANCELLED);
            setFocusSubject(null);
          }}
        />
      ) : (
        <>
          <Focus addSubject={setFocusSubject} />
          <FocusHistory focusHistory={focusHistory} setFocusHistory={setFocusHistory} onClear={onClear} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    fontStyl: 'bold',
    justifyContent: 'center',
    paddingTop: paddingSizes.xl,
    flex: 1,
    backgroundColor: colors.blueOcean,
  },
});
