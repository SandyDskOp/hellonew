// PhoneValidationComponent.js
import React, {useState, useRef} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import {login} from '../Redux/Slices/UserSlice';
import {useDispatch, useSelector} from 'react-redux';

function PhoneValidationComponent({validNo, mobile, onFocus, logoCon}) {
  const dipatch = useDispatch();
  const user = useSelector(state => state.user.value);
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [value, setValue] = useState('');
  const [valid, setValid] = useState(false);
  const phoneInput = useRef(null);
  const [otp, setOtp] = useState('');

  //to create an OTP
  const generateOtp = () => {
    let newOtp = '';
    for (let i = 1; i <= 4; i++) {
      newOtp = newOtp + Math.floor(Math.random() * 9);
    }
    setOtp(newOtp);
  };

  //handle change event for phone Input
  const handleChange = async text => {
    generateOtp();
    setCountry(user.country);
    setState(user.state);
    setCity(user.city);
    //saving state in redux store
    await dipatch(
      login({
        mobile: text,
        otp: otp,
        country: country,
        state: state,
        city: city,
      }),
    );
    setValue(text); //extracting text from input to useState

    //checking whether number is right or wrong
    const checkValid = phoneInput.current?.isValidNumber(text);
    setValid(checkValid);

    //to shrinkCarousal
    if (text.length != 0) {
      logoCon(true);
    }

    //passing mobile number to parent component when validation completed
    if (checkValid) {
      validNo(true);
      mobile(text);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput onFocus={onFocus} style={styles.hiddenInput} />
      <PhoneInput
        ref={phoneInput}
        defaultValue={value}
        defaultCode="IN"
        layout="first"
        onChangeText={text => handleChange(text)}
        autoFocus
        withShadow
        containerStyle={styles.inputStyle}
        textContainerStyle={[
          styles.inputStyle1,
          {borderLeftWidth: 1, width: 0},
        ]}
        textInputStyle={[styles.textStyle, {width: 0}]}
        codeTextStyle={styles.codeStyle}
        countryPickerButtonStyle={styles.dropStyle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
  },
  inputStyle: {
    width: '100%',
    backgroundColor: '#71c247',
    height: 50,
    borderRadius: 8,
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
  },
  inputStyle1: {
    width: '100%',
    backgroundColor: '#71c247',
    height: 50,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
  },
  textStyle: {
    paddingVertical: 'auto',
    height: 50,
    fontSize: 15,
    fontWeight: '600',
    color: 'white',
  },
  hiddenInput: {
    height: 0,
    width: 0,
  },
  codeStyle: {
    position: 'relative',
    bottom: 3,
    color: 'white',
  },
  dropStyle: {
    color: 'white',
  },
});

export default PhoneValidationComponent;
