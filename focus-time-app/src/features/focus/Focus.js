import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../../components/RoundBtn';
import { fontSizes, paddingSizes } from '../../utils/sizes';
import { colors } from '../../utils/color';

export const Focus = ({ addSubject }) => {
  const [subject, setSubject] = useState(null);
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Fokus apa yang kamu kerjakan! </Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={{ flex: 1, marginRight: 20 }}
            placeholder="tulis apa yang ingin dilakukan !"
            onSubmitEditing={({ nativeEvent }) => {
              setSubject(nativeEvent.text);
            }}
          />
          <View style={styles.addSubject}>
            <RoundedButton
              size={50}
              title="+"
              onPress={() => {
                addSubject(subject);
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: paddingSizes.md,
    flex: 1,
  },
  title: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: fontSizes.lg,
  },
  titleContainer: {
    flex: 0.5,
    padding: paddingSizes.md,
    justifyContent: 'center',
  },
  inputContainer: {
    paddingTop: paddingSizes.md,
    flexDirection: 'row',
  },
  addSubject: {
    paddingTop: 5
  }
});
