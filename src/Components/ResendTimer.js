import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useState, useEffect} from 'react';

export default function ResendTimer() {
  const [seconds, setSeconds] = useState(40);
  const [buttonDisabe, setButtonDisabe] = useState(true);
  const [color, setColor] = useState('#000000');

  //incrementing seconds
  useEffect(() => {
    setTimeout(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        setButtonDisabe(false);
        setColor('#0000FF');
      }
    }, 1000);
  }, [seconds]);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.textStyle1}>Didn't receive OTP?</Text>
        <TouchableOpacity disabled={buttonDisabe}>
          <Text style={{color: color}}>Resend</Text>
        </TouchableOpacity>
      </View>
      <Text>0:{seconds} seconds</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textContainer: {
    flexDirection: 'row',
  },
  textStyle1: {
    fontSize: 15,
    fontWeight: '700',
  },
});
