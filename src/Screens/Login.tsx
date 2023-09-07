// // Login.js
// import React, { useState,useEffect, useRef } from "react";
// import { View, Text, StyleSheet,TouchableOpacity } from "react-native";
// import PhoneValidationComponent from "../Components/PhoneValidationComponent";
// import CustomButton from "../Components/CustomButton";
// import {NativeStackScreenProps} from '@react-navigation/native-stack'
// import { RootStackParamList } from '../App'

// type LoginProps=NativeStackScreenProps<RootStackParamList,"Login">

// export default function Login({navigation}:LoginProps) {

//   const [displayLogo, setDisplayLogo] = useState(true)
//   const [mobile, setMobile] = useState("");
//   const [validNum, setValidNum] = useState(false);
//   const [showButton, setShowButton] = useState(false);

//   //extracting wheter number is wright or wrong from phone validation component
//   const ValidNoExtract = (valid:boolean) => {
//     if (valid) {
//       setValidNum(true);
//       setShowButton(true); // Show the button
//     }
//   };

//   //extracting mobile number from phonevalidation component
//   const mobilenumExtract = (num:string) => {
//     setMobile(num);
//   };

//   //extracting details to shrink logo container
//   const extractLogo=(value:boolean)=>{
//      if(value){
//       setDisplayLogo(false)
//      }
//   }

//   //
//   const onFocus=()=>{
//     setDisplayLogo(false)
//   }

//   //moving Onto next Page
//   const handlepress=()=>{
//       navigation.push("Otp")
//   }

//   //making button visible when 10 numbers typed
//   useEffect(() => {
//     if(mobile.length===10){
//       setShowButton(true)
//     }
//     else{
//       setShowButton(false)
//     }
//   }, [mobile]);

//   return (
//     <View style={styles.container}>
//       {displayLogo?(
//         <View style={styles.logoContainer}>

//         </View>
//       ):(
//         <View style={styles.shrinkContainer}>

//         </View>
//       )}
//       <TouchableOpacity onPress={onFocus} style={styles.inputContainer} >
//        <PhoneValidationComponent validNo={ValidNoExtract} mobile={mobilenumExtract} onFocus={onFocus} logoCon={extractLogo}/>
//        {showButton && ( // Show the button only when showButton is true
//           <CustomButton
//             handlePress={handlepress}
//             disabled={!validNum}
//             style={styles.buttonStyle}
//             title="Get OTP"
//             color="#71c247"
//           />
//         )}

//        </TouchableOpacity>

//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,

//   },
//   logoContainer:{
//     flex:7,
//     padding:10,
//     width:"100%",
//     backgroundColor:"#71c247"
//   },
//   inputContainer:{
//     flex:7,
//     padding:10,

//   },
//   buttonStyle:{
//     width:"100%",
//     marginTop:"auto",
//   },
//   shrinkContainer:{
//     flex:1,
//     backgroundColor:"#71c247"
//   }

// });

import {StyleSheet, Text, View, LayoutAnimation} from 'react-native';
import React, {useState, useEffect} from 'react';
import CustomButton from '../Components/CustomButton';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import NewValidation from '../Components/NewValidation';
import {login} from '../Redux/Slices/UserSlice';
import {useSelector, useDispatch} from 'react-redux';

type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function Login({navigation}: LoginProps) {
  const [number, setNumber] = useState('');
  const [validNum, setValidNum] = useState(false);
  const [flexAmount, setFlexAmount] = useState(7);
  const [flexAmount2, setFlexAmount2] = useState(5);
  const [showButton, setShowButton] = useState(true);

  const ValidNoExtract = (valid: boolean) => {
    setValidNum(valid);
  };

  const numExtract = (value: boolean) => {
    setShowButton(value);
  };

  const focusInput = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setFlexAmount(1);
    setFlexAmount2(7);
  };

  const handlePress = () => {
    navigation.replace('Otp');
  };

  return (
    <View style={styles.container}>
      <View style={[styles.logoContainer, {flex: flexAmount}]}></View>
      <View
        style={[
          styles.inputContainer,
          {flex: flexAmount2, transform: [{translateY: 4}]},
        ]}>
        <NewValidation
          validNo={ValidNoExtract}
          onFocus={focusInput}
          buttonValid={numExtract}
        />
        {showButton ? (
          <></>
        ) : (
          <>
            <CustomButton
              title="Get OTP"
              style={styles.buttonStyle}
              color="#71c247"
              handlePress={handlePress}
              disabled={showButton}
            />
          </>
        )}
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
  logoContainer: {
    backgroundColor: '#71c247',
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'column',
  },
  logo: {
    backgroundColor: '#CC4499',
  },
  inputContainer: {},
  buttonStyle: {
    marginTop: 'auto',
    marginHorizontal: 10,
    marginBottom: 10,
  },
});
