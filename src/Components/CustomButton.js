import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

export default function CustomButton({
  title,
  disabled,
  handlePress,
  style,
  color,
}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        disabled={disabled}
        onPress={handlePress}
        style={[style, styles.buttonStyle, {backgroundColor: color}]}>
        <Text style={styles.textStyle}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    alignItems: 'center',

    height: 40,
  },
  textStyle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  container: {
    flex: 1,
    width: '100%',
    margin: 0,
    padding: 0,
  },
});
