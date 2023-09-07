import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import OtpInput from '../Components/OtpInput';
import {useState, useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import CustomButton from '../Components/CustomButton';
import ResendTimer from '../Components/ResendTimer';
import {useSelector} from 'react-redux';
import {user} from '../Redux/Slices/Types';

type OtpProps = NativeStackScreenProps<RootStackParamList, 'Otp'>;

export default function Otp({navigation}: OtpProps): JSX.Element {
  //fetching values from redux
  const userData = useSelector((state: user) => state.user.value);

  //useStates
  const [count, setCount] = useState(0);
  const [realOtp, setRealOtp] = useState('1997');
  const [completedtOtp, setCompletedtOtp] = useState('');
  const [buttonDisable, setButtonDisable] = useState(true);
  const [color, setColor] = useState('#D1D1D1');

  //getting completed otp from otpInput
  const handleOtp = (otp: string) => {
    setCompletedtOtp(otp);
    setRealOtp(userData.otp);
  };

  //to enable button
  useEffect(() => {
    //to change disable and color of button
    if (buttonDisable) {
      setButtonDisable(true);
    } else {
      setButtonDisable(false);
      setColor('#71c247');
    }
  }, [buttonDisable]);

  //extracting button disbale factor from otpInput
  const extractButton = (value: string) => {
    if (value == 'false') {
      setButtonDisable(false);
    } else {
      setButtonDisable(true);
    }
  };

  //redirectin to login if otp entered 5 times wrong
  const checkCount = () => {
    if (realOtp != completedtOtp) {
      setCount(count + 1);
    } else {
      setCount(0);
      navigation.replace('Register');
    }
    if (count > 4) {
      navigation.replace('Login');
    }
  };
  const HandleSubmit = () => {
    checkCount();
  };
  return (
    <View style={styles.container}>
      <StatusBar />
      <View style={styles.inputContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.textStyle1}>Otp Number sent to</Text>
          <Text style={styles.textStyle2}>
            {userData.mobile} {userData.otp}
          </Text>
        </View>
        <OtpInput onComplete={handleOtp} buttonCon={extractButton} />
      </View>
      <View style={styles.timerContainer}>
        <ResendTimer />
        {count > 0 ? (
          <Text style={{color: 'red', marginVertical: 10}}>
            Enter Correct OTP
          </Text>
        ) : (
          <></>
        )}
        <CustomButton
          title="Submit"
          style={styles.buttonStyle}
          handlePress={HandleSubmit}
          disabled={buttonDisable}
          color={color}
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
  },
  inputContainer: {
    flex: 1,
    width: '100%',
  },
  textContainer: {
    flex: 0.5,
    width: '100%',
    height: 100,
    marginVertical: 10,
    paddingHorizontal: 10,
    paddingVertical: 30,
  },
  textStyle1: {
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 2,
    color: '#343434',
  },
  textStyle2: {
    fontSize: 23,
    fontWeight: '700',
    color: '#252525',
  },
  timerContainer: {
    flex: 2,
    padding: 8,
  },
  textStyleTrouble: {
    fontSize: 13,
    fontWeight: '700',
    color: '#343434',
    width: 130,
    borderBottomWidth: 1,
    paddingHorizontal: 3,
    marginHorizontal: 30,
  },
  buttonStyle: {
    marginTop: 'auto',
  },
});
