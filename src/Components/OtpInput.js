import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import {useState, useEffect, useRef} from 'react';

export default function OtpInput({onComplete, buttonCon}) {
  const [otp, setOtp] = useState(['', '', '', '']);
  const refs = [useRef(), useRef(), useRef(), useRef()];

  const handleChange = (value, index) => {
    //to get values from otp Boxes
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    //To move between OTP boxes
    if (value !== '' && index <= 2) {
      refs[index + 1].current.focus();
    } else if (value == '' && index > 0) {
      refs[index - 1].current.focus();
    }

    // Check if all OTP digits are filled
    if (newOtp.every(digit => digit !== '')) {
      const fullOtp = newOtp.join('');
      onComplete(fullOtp);
      buttonCon('false');
    } else if (newOtp.some(digit => digit == '')) {
      onComplete(null);
      buttonCon('true');
    }
  };
  return (
    <View style={styles.container}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          ref={refs[index]}
          value={digit}
          onChangeText={value => handleChange(value, index)}
          keyboardType="numeric"
          maxLength={1}
          style={styles.inputStyle}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  inputStyle: {
    borderWidth: 1,
    borderRadius: 7,
    borderColor: '#8EAC50',
    backgroundColor: '#71c247',
    elevation: 6,
    shadowOffset: {
      height: 3,
      width: 3,
    },
    width: 87,
    height: 50,
    fontSize: 25,
    fontWeight: '500',
    color: '#252525',
    textAlign: 'center',
  },
});
