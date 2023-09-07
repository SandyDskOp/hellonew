import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';

export default function FloatingInput({
  value,
  onChangeText,
  disable,
  color,
  controller,
  onFocus,
  label,
}) {
  const nameRef = useRef(null);
  const addresRef = useRef(null);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={onFocus}>
          <Text
            style={{
              paddingLeft: 10,
              transform: [{translateY: 2}],
              color: '#252525',
            }}>
            {label}
          </Text>
        </TouchableOpacity>
        <TextInput
          style={[
            controller ? styles.inputStyle : styles.inputStyle1,
            {backgroundColor: color},
          ]}
          onFocus={onFocus}
          value={value}
          onChangeText={onChangeText}
          editable={disable}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputStyle: {
    height: 3,
    width: '100%',
    paddingLeft: 10,
    color: '#343434',
  },
  inputStyle1: {
    height: 50,
    paddingLeft: 10,
    color: '#343434',
  },
  inputContainer: {
    borderBottomWidth: 1,
    width: '100%',
  },
});
