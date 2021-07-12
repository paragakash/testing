import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';

import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import Home from './Home';
import Userinfo from './Userinfo';
import { enableScreens } from 'react-native-screens'
import Easing from 'react-native/Libraries/Animated/Easing';
import { TransitionPresets,cardStyleInterpolator, createStackNavigator } from '@react-navigation/stack';


enableScreens();
const Stack = createSharedElementStackNavigator()
//const Stack =createStackNavigator()

const App = () => {
  return <NavigationContainer>
      <Stack.Navigator initialRouteName={'home'} headerMode={'none'} screenOptions={
        {

          ...TransitionPresets.SlideFromRightIOS,
          cardStyleInterpolator: ({ current }) => {
            return {
              cardStyle: {
                opacity: current.progress
              },
            }
          },
          // avoid lacking animation
          transitionSpec: {
            open: { animation: 'timing', config: { duration: 400, easing: Easing.inOut(Easing.ease) } },
            close: { animation: 'timing', config: { duration: 400, easing: Easing.inOut(Easing.ease) } }
          }
        }
      } >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="userinfo" component={Userinfo}
        />
      </Stack.Navigator>
    </NavigationContainer>
  
}

export default App

const styles = StyleSheet.create({})
