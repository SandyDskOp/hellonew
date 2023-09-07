import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';

export default function NonEditFloat({value, label}) {
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TouchableOpacity>
          <Text style={{paddingLeft: 10, color: '#252525'}}>{label}</Text>
        </TouchableOpacity>
        <TextInput
          style={[styles.inputStyle1]}
          value={value}
          editable={false}
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
    height: 5,
    width: '100%',
  },
  inputStyle1: {
    height: 40,
    backgroundColor: '#CEDEBD',
    marginTop: 5,
    paddingLeft: 10,
    color: '#343434',
  },
  inputContainer: {
    width: '100%',
  },
});
