import React from 'react';
import { View, StyleSheet, FlatList, Text, SafeAreaView } from 'react-native';

import { fontSizes, paddingSizes } from '../../utils/sizes';
import { RoundedButton } from '../../components/RoundBtn';

const HistoryItem = ({ item, index, status }) => {
  return <Text style={styles.historyItem}>{item.subject}</Text>;
};

export const FocusHistory = ({ focusHistory, onClear }) => {
  const clearHistory = () => {
    onClear();
  };
  return (
    <>
      <SafeAreaView
        style={{ flex: 0.5, alignItems: 'center', paddingBottom: 100 }}>
       
        {!!focusHistory.length && (
          <>
           <Text style={styles.title}>Hal yang kamu fokuskan</Text>
            <FlatList
              style={{ flex: 1, fontSize: 30 }}
              contentContainerStyle={{ flex: 1, alignItems: 'center' }}
              data={focusHistory}
              renderItem={HistoryItem}
            />
            <View style={styles.clearContainer}>
              <RoundedButton
                size={125}
                title="Hapus"
                onPress={() => onClear()}
              />
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  historyItem: (status) => ({
    color: status > 0 ? 'green' : 'red',
    fontSize: 45,
  }),
  title: {
    fontSize: 30,
    fontFamily: 'roboto',
    color: 'white',
  },
  clearContainer: {
    alignItems: 'center',
    fontFamily: 'roboto',
    fontSize: 10,
    padding: paddingSizes.md,
  },
});
