import React, { useEffect, useState } from 'react'
import { Text, View, Header, FlatList, Alert, TouchableOpacity, ScrollView, Table, Image, ImageBackground} from 'react-native'
import { WebView } from 'react-native-webview';
import styles from './styles';
import { app } from '../../firebase/config';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { async } from '@firebase/util';
import axios from 'axios';


export default function WeatherScreen() {


const [weatherData, setWeatherData] = useState(null);
const WEATHER_API_KEY = 'cc233742e16683bec784085984c19b86';
const image = '../../img/weather-icon.png';


const fetchWeatherData = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`;
    const response = await axios.get(url);
    const weatherData = response.data;
    return weatherData;
  }

const getLocation = async () => {
    const city = 'Boston'
    const data = await fetchWeatherData(city);
    setWeatherData(data);
    console.log(data)
};



useEffect(() => {
   
    getLocation();
    
}, [])


return (
   
    //  <View style={styles.container}>
    <View style={styles.background}>
    <Image source={require('../../img/weather-icon.jpg')} resizeMode='repeat' style={styles.image} />
    <View style={styles.container}>
      
      {weatherData ? (
        <View style={styles.weatherContainer}>
          <Text style={styles.weatherTitle}>Weather in {weatherData.name}</Text>
          <Text style={styles.weatherText}>Temperature: {weatherData.main.temp}°C</Text>
          <Text style={styles.weatherText}>Description: {weatherData.weather[0].description}</Text>
          <Text style={styles.weatherText}>Humidity: {weatherData.main.humidity} %</Text>
          <Text style={styles.weatherText}>Pressure: {weatherData.main.pressure} hPa</Text>
        </View>
      ) : (
        <Text>Fetching weather data...</Text>
      )}
    </View>
  </View>
);
    
         {/* {weatherData && (
            <View>
             
                <Text>Weather in {weatherData.name}</Text>
                <Text>Temperature: {weatherData.main.temp}°C</Text>
                <Text>Description: {weatherData.weather[0].description}</Text>
                <Text>Humidity: {weatherData.main.humidity} %</Text>
                <Text>Pressure: {weatherData.main.pressure} hPa</Text>
 */}



            {/* </View> */}
    
   
   {/* )} */}
   {/* </View> */}


 }
