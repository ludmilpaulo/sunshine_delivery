import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import AuthNavigator from './AuthNavigator';

import { AuthContext } from '../redux/AuthContext';

import HomeNavigator from './HomeNavigator';

export default function AppNavigator() {

     // Get auth state from context
  const  {auth}  = useContext(AuthContext);



   // const user = useSelector(selectUser)
    const dispatch = useDispatch()

    console.log("usuario do redux", auth);

   

    return (
        <NavigationContainer>
            {auth ? (
                <HomeNavigator />
            ) : (
                <AuthNavigator />
            )}
        </NavigationContainer>
    )


}