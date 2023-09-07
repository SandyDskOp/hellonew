import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {login} from '../Redux/Slices/UserSlice';
import {useSelector, useDispatch} from 'react-redux';
import {user} from '../Redux/Slices/Types';

export default function Home(): JSX.Element {
  const dispatch = useDispatch();
  const [userAcc, setUserAcc] = useState({
    mobile: '',
    country: '',
    fullname: '',
    state: '',
    city: '',
    address: '',
  });
  const user = useSelector((state: user) => state.user.value);

  useEffect(() => {
    setUserAcc(user);
  }, [user]);
  return (
    <View>
      <Text>USER NAME: {userAcc.fullname.toUpperCase()}</Text>
      <Text>MOBILE NO: {userAcc.mobile}</Text>
      <Text>COUNTRY: {userAcc.country}</Text>
      <Text>STATE: {userAcc.state}</Text>
      <Text>CITY: {userAcc.city}</Text>
      <Text>ADDRESS: {userAcc.address}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
