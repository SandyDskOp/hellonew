import React, {useState, useRef} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import {parsePhoneNumberFromString} from 'libphonenumber-js/mobile';
import {login} from '../Redux/Slices/UserSlice';
import {useSelector, useDispatch} from 'react-redux';

const NewValidation = ({validNo, onFocus, buttonValid}) => {
  const dispatch = useDispatch();

  const countryRef = useRef();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [maxLength, setMaxLength] = useState(13);
  const [otp, setOtp] = useState('');

  const [countryPickerVisible, setCountryPickerVisible] = useState(false);

  const handleCountrySelect = country => {
    setSelectedCountry(country);
  };
  const generateOtp = () => {
    let newOtp = '';
    for (let i = 1; i <= 4; i++) {
      newOtp = newOtp + Math.floor(Math.random() * 9);
    }
    setOtp(newOtp);
  };

  const toggleCountryPicker = () => {
    setSelectedCountry(null);
  };

  const handlePhoneChange = value => {
    const numericInput = value.replace(/[^0-9]/g, '');
    setPhoneNumber(numericInput);
    validatePhoneNumber(value);
  };

  // Inside NewValidation component

  const validatePhoneNumber = number => {
    if (!selectedCountry) {
      setIsValid(false); // No country selected, so invalid
      return;
    }

    generateOtp();

    const fullNumber = `+${selectedCountry.callingCode[0]}${number}`;
    const parsedNumber = parsePhoneNumberFromString(fullNumber);
    setIsValid(parsedNumber ? parsedNumber.isValid() : false);

    if (parsedNumber ? parsedNumber.isValid() : false) {
      validNo(true); // Call the callback with true
      setMaxLength(number.length);

      // Dispatch the action
      dispatch(
        login({
          mobile: number, // Use the current value of number
          country: selectedCountry.name,
          state: 'Tamil Nadu',
          city: 'Madurai',
          otp: otp,
        }),
      );

      buttonValid(false);
    } else {
      validNo(false); // Call the callback with false
      buttonValid(true);
    }
  };

  // ... rest of the component

  return (
    <View style={style.container}>
      {/* <CountryPicker
        withFilter
        withFlag
        onSelect={handleCountrySelect}
        visible={selectedCountry !== null}
        selectedCountry={selectedCountry}
      /> */}

      {/* <TouchableOpacity onPress={toggleCountryPicker}>
         <Text>
          {selectedCountry
            ? `Selected Country: ${selectedCountry.name} (+${selectedCountry.callingCode[0]})`
            : 'Select Country'}
        </Text>
      </TouchableOpacity> */}

      {/* {countryPickerVisible && (
        <CountryPicker
          withFilter
          withFlag
          onSelect={handleCountrySelect}
          onClose={() => setCountryPickerVisible(false)}
        />
      )} */}

      <View style={style.inputContainer}>
        <View style={style.pickerStyle}>
          {selectedCountry ? (
            <>
              <TouchableOpacity
                onPress={toggleCountryPicker}
                style={style.touchable}>
                <Text style={{color: 'white', fontWeight: '500', fontSize: 15}}>
                  {selectedCountry.cca2}
                </Text>
                <Text style={{color: 'white', fontWeight: '500', fontSize: 15}}>
                  +{selectedCountry.callingCode[0]}
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <View style={style.pickerBox} ref={countryRef}>
                <CountryPicker
                  withFilter
                  withFlag
                  onSelect={handleCountrySelect}
                  selectedCountry={selectedCountry}
                  containerButtonStyle={StyleSheet.pickerButtonStyle}
                  placeholder="Select ▼ "
                />
              </View>
            </>
          )}
        </View>
        <TextInput
          placeholder="Enter phone number"
          value={phoneNumber}
          onChangeText={handlePhoneChange}
          keyboardType="phone-pad"
          style={style.inputStyle}
          onFocus={onFocus}
          placeholderTextColor="white"
          maxLength={maxLength}
        />
      </View>
    </View>
  );
};

export default NewValidation;

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  pickerButtonStyle: {
    color: 'white',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    width: '100%',
    padding: 10,
  },
  pickerStyle: {
    width: '30%',
    backgroundColor: '#71c247',
    color: 'white',
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    paddingHorizontal: 10,
  },
  touchable: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  inputStyle: {
    backgroundColor: '#71c247',
    width: '70%',
    borderLeftWidth: 2,
    fontSize: 15,
    fontWeight: '700',
    color: 'white',
    paddingLeft: 20,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
  },
  pickerBox: {
    padding: 4,
    flex: 1,
    flexDirection: 'column',
    color: '#252525',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
  },
});
