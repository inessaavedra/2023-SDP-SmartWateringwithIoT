import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen, RegistrationScreen, HomeScreen, AnalysisScreen, TemperatureScreen, HumidityScreen, PressureScreen, WeatherScreen , SoilScreen, PhScreen} from './src/screens';
import styles from './src/screens/HomeScreen/styles.js'
import { app } from './src/firebase/config';
// if (!global.btoa) {  global.btoa = encode }
// if (!global.atob) { global.atob = decode }

const Stack = createStackNavigator();

export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Listen for Firebase authentication state changes
    app.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
      } else {
        setUser(null);
      }
    });
  }, []);


  return (
    <NavigationContainer>
      <Stack.Navigator>
        { user ? (
          <>
            <Stack.Screen name="Home">
              {props => <HomeScreen {...props} extraData={user} />}
            </Stack.Screen>
            <Stack.Screen name="Temperature" component={TemperatureScreen} />
            <Stack.Screen name="Humidity" component={HumidityScreen} />
            <Stack.Screen name="Pressure" component={PressureScreen} />
            <Stack.Screen name="Weather" component={WeatherScreen} />
            <Stack.Screen name="Soil" component={SoilScreen} />
            <Stack.Screen name="Ph" component={PhScreen} />




            <Stack.Screen name="Analysis" component={AnalysisScreen} />
           

          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName='Login' >
    //       <Stack.Screen name="Login" component={LoginScreen} />
    //       <Stack.Screen name="Registration" component={RegistrationScreen} />
    //       <Stack.Screen name="Home" options={{title:'Smart Water', headerTitleStyle:{fontSize:22, color:'black', fontWeight:'bold'}, headerBackground: () => (<Image
    //         style={styles.heading}
    //         source={require('./src/img/header.png')}
    //       />)}}>
    //         {props => <HomeScreen {...props} extraData={user}/>}
    //       </Stack.Screen>
    //       <Stack.Screen name="Analysis" component={AnalysisScreen} />
    //   </Stack.Navigator>
    // </NavigationContainer>