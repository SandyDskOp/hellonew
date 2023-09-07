import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Image,
  TouchableHighlight,
  Alert,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {login} from '../Redux/Slices/UserSlice';
import {useSelector, useDispatch} from 'react-redux';
import {user} from '../Redux/Slices/Types';
import CustomButton from '../Components/CustomButton';
import {RootStackParamList} from '../App';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import FloatingInput from '../Components/FloatingInput';
import NonEditFloat from '../Components/NonEditFloat';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

type registerProps = NativeStackScreenProps<RootStackParamList, 'Register'>;

export default function Register({navigation}: registerProps): JSX.Element {
  //getting dispatch functions
  const dispatch = useDispatch();

  //useStates
  const [fullname, setFullname] = useState('');
  const [mobile, setMobile] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [address, setAddress] = useState('');

  //usestate for display controls
  const [nameControl, setNameControl] = useState(true);
  const [addressControl, setAddressControl] = useState(true);

  //getting data from redux
  const user = useSelector((state: user) => state.user.value);

  //setting datas to usestates from redux
  useEffect(() => {
    setFullname(user.fullname),
      setMobile(user.mobile),
      setCountry(user.country),
      setState(user.state),
      setCity(user.city),
      setAddress(user.address);
  }, []);

  //flooating effect on name box
  const nameFocus = () => {
    setNameControl(false);
    if (address) {
      setAddressControl(false);
    } else {
      setAddressControl(true);
    }
  };

  //floating effect on address box
  const addressFocus = () => {
    if (!fullname) {
      setNameControl(true);
    } else {
      setNameControl(false);
    }
    setAddressControl(false);
  };

  //  const handleRelease=()=>{

  //   if(address){
  //     setAddressControl(false)
  //    }
  //    else{
  //     setAddressControl(true)
  //    }
  //    if(!fullname){
  //     setNameControl(true)
  //    }
  //    else{
  //     setNameControl(false)
  //    }
  //   Keyboard.dismiss()
  //  }

  // const handleNameChange = (text: string) => {
  //   // Remove special characters using regex
  //   const sanitizedText = text.replace(/[^a-zA-Z ]/g, '');
  //   // Append the sanitized input text to the existing fullname (if it's defined)
  //   setFullname((prevFullname) =>
  //     prevFullname ? prevFullname.toUpperCase() + sanitizedText : sanitizedText
  //   );
  // };

  //name box onchange
  const handleNameChange = (text: string) => {
    setFullname(text); // Update fullname directly without transforming to uppercase
  };
  //address box onchange
  const handleAddresChange = (text: string) => {
    setAddress(text);
  };
  //updating redux
  const updateState = () => {
    dispatch(
      login({
        fullname: fullname,
        mobile: mobile,
        country: country,
        state: state,
        city: city,
        address: address,
      }),
    );
  };

  const exitApp = () => {
    Alert.alert('Exit', 'Are you sure you want exit', [
      {
        text: 'yes',
        onPress: () => navigation.pop(),
      },
      {
        text: 'cancel',
        onPress: () => null,
      },
    ]);
  };
  //taking to home without registering
  const handleCrossPress = () => {
    navigation.replace('Home');
  };

  //submitting actions
  const handleSubmit = () => {
    if (fullname != '' && address != '') {
      updateState();
      navigation.replace('Home');
    } else {
      Alert.alert('Empty Fields', 'Fill all the fields');
    }
  };
  return (
    <View style={styles.container}>
      <View style={[styles.headerContainer]}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: '700',
            color: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 15,
            marginHorizontal: 15,
          }}>
          BASIC DETAILS
        </Text>
        <TouchableHighlight
          style={{alignItems: 'center'}}
          onPress={handleCrossPress}>
          <Text
            style={{
              fontSize: 30,
              marginLeft: 'auto',
              marginRight: 10,
              paddingTop: 5,
              color: 'white',
            }}>
            x
          </Text>
        </TouchableHighlight>
      </View>
      <KeyboardAwareScrollView
        style={styles.container2}
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={100}>
        <ScrollView style={styles.inputContainer}>
          <View style={styles.floatContainer}>
            <FloatingInput
              value={fullname}
              onChangeText={handleNameChange}
              disable={true}
              color="#FFFFFF"
              controller={nameControl}
              onFocus={nameFocus}
              label="FullName"
            />
          </View>
          <View style={styles.floatContainer}>
            <NonEditFloat label="Mobile Number" value={mobile} />
          </View>
          <View style={styles.floatContainer}>
            <NonEditFloat label="Country" value={country} />
          </View>
          <View style={styles.floatContainer}>
            <NonEditFloat label="State" value={state} />
          </View>
          <View style={styles.floatContainer}>
            <NonEditFloat label="City" value={city} />
          </View>

          <View style={styles.floatContainer}>
            <FloatingInput
              value={address}
              onChangeText={handleAddresChange}
              disable={true}
              color="#FFFFFF"
              controller={addressControl}
              onFocus={addressFocus}
              label="Address"
            />
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <CustomButton
            style={styles.buttonStyle}
            disabled={false}
            title="Complete Profile"
            color="#71c247"
            handlePress={handleSubmit}
          />
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container2: {
    flex: 11,
  },
  headerContainer: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#71c247',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileImageWrap: {
    flex: 3,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  imageStyle: {
    height: 50,
    width: 50,
    borderRadius: 25,
    margin: 20,
  },
  inputContainer: {
    flex: 12,
    width: '100%',
    paddingHorizontal: 10,
    paddingTop: 100,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center', // Align text and input vertically
    marginVertical: 8,
    elevation: 5,
  },
  inputWrapper1: {
    flexDirection: 'row',
    alignItems: 'center', // Align text and input vertically
    marginVertical: 8,
    backgroundColor: '#C6C1BD',
  },
  labelAndInput: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    alignItems: 'center',
  },
  textStyle: {
    flex: 1,
    paddingHorizontal: 10,
    // Align text to the right
  },
  inputStyle: {
    flex: 2, // Adjust the flex to give more space to input
    paddingVertical: 5, // Adjust vertical padding
    paddingHorizontal: 10,
    textAlign: 'right',
    color: '#000033',
  },
  buttonContainer: {
    flex: 2,
    padding: 10,
  },
  buttonStyle: {
    marginTop: 'auto',
  },
  floatContainer: {
    height: 70,
    width: '100%',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingBottom: 20, // Adjust this value to control the space between content and the button
  },
});
