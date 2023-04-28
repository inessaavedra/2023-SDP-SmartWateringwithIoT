import React, { useEffect, useState } from 'react'
import {Text, View , FlatList, Table, ScrollView} from 'react-native'
import { WebView } from 'react-native-webview';
import styles from './styles';

export default function AnalysisScreen() {

    const API_KEY = 'TLDSGLZ1SWUUFAMZ';
    const channel_id = '2021316';
    const urlTemp = 'http://thingspeak.com/channels/2021316/charts/1?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=10&type=line&update=15';
    const urlHum = 'https://thingspeak.com/channels/2021316/charts/2?bgcolor=%23ffffff&color=%230000FF&dynamic=true&results=60&title=Humidity+Chart&type=line';
    const urlPres = 'https://thingspeak.com/channels/2021316/charts/3?bgcolor=%23ffffff&color=%23FFA500&dynamic=true&results=60&type=line';
    const urlSoil = 'https://thingspeak.com/channels/2021316/charts/4?bgcolor=%23ffffff&color=%2300FF00&dynamic=true&results=60&type=line';
    const urlPh = 'https://thingspeak.com/channels/2021316/charts/5?bgcolor=%23ffffff&color=%23572364&dynamic=true&results=60&type=line';

    const urltvsh = 'https://thingspeak.com/apps/matlab_visualizations/499942';


    
    
      const RenderTable = () => {
        const optimalValues = [
            { name: 'Temperature', value: '20-25°C' },
            { name: 'Humidity', value: '60-70%' },
            { name: 'Pressure (Pascals)', value: '101.3 kPa' },
            { name: 'Moisture', value: '10-30%' },
            { name: 'pH', value: '6.0-7.5' },
          ];
        return (
          <View style={styles.container}>
            <View style={styles.row}>
              <Text style={styles.headerCell}>Name</Text>
              <Text style={styles.headerCell}>Optimal Value</Text>
            </View>
            {optimalValues.map((item, index) => (
              <View key={index} style={styles.row}>
                <Text style={styles.cell}>{item.name}</Text>
                <Text style={styles.cell}>{item.value}</Text>
              </View>
            ))}
          </View>
        );
      };

    const RenderTempChart = () => {
        return(
            <WebView 
                source={{uri : urlTemp}}
                style={{marginTop: 30, marginLeft:200, width: 400, height: 100, alignSelf:'center', alignContent:'center'}}
                javaScriptEnabled={true}
                startInLoadingState={true}
                onLoad={() => console.log('Page loaded!')}
                //injectedJavaScript={'alert("Hello World!")'}
                //allowFullScreen={true}
                scalesPageToFit={true}
            />
            
        );
    }
    const RenderHumChart = () => {
        return(
            <WebView 
                source={{uri : urlHum}}
                style={{marginTop: 30,marginLeft:200, width: 400, height: 100 }}
                javaScriptEnabled={true}
                startInLoadingState={true}
                onLoad={() => console.log('Page loaded!')}
                //injectedJavaScript={'alert("Hello World!")'}
                //allowFullScreen={true}
                scalesPageToFit={true}
            />
            
        );
    }

    const RenderPresChart = () => {
        return(
            <WebView 
                source={{uri : urlPres}}
                style={{marginTop: 30,marginLeft:200, width: 400, height: 100 }}
                javaScriptEnabled={true}
                startInLoadingState={true}
                onLoad={() => console.log('Page loaded!')}
                //injectedJavaScript={'alert("Hello World!")'}
                //allowFullScreen={true}
                scalesPageToFit={true}
            />
            
        );
    }

    const RenderSoilChart = () => {
        return(
            <WebView 
                source={{uri : urlSoil}}
                style={{marginTop: 30,marginLeft:200, width: 400, height: 100 }}
                javaScriptEnabled={true}
                startInLoadingState={true}
                onLoad={() => console.log('Page loaded!')}
                //injectedJavaScript={'alert("Hello World!")'}
                //allowFullScreen={true}
                onError={(error) => console.error(error)}
                scalesPageToFit={true}
            />
            
        );
    }
    const RenderPhChart = () => {
      return(
          <WebView 
              source={{uri : urlPh}}
              style={{marginTop: 30, marginLeft:200, width: 400, height: 100, alignSelf:'center', alignContent:'center'}}
              javaScriptEnabled={true}
              startInLoadingState={true}
              onLoad={() => console.log('Page loaded!')}
              //injectedJavaScript={'alert("Hello World!")'}
              //allowFullScreen={true}
              scalesPageToFit={true}
          />
          
      );
  }

    return (

        <ScrollView>
        <View style={styles.container}>
            <Text> This are the optimal values for the crop to grow healthy: </Text>
            <Text> </Text>

            <RenderTable/>
            <Text> </Text>
          <Text>And here are the values from the sensors displayed in charts</Text>
            <Text style={styles.chartHead}> Temperature: </Text>
            <RenderTempChart/>
            <Text style={styles.chartHead}> Humidity: </Text>
            <RenderHumChart/>
            <Text style={styles.chartHead}> Pressure: </Text>
            <RenderPresChart/>
            <Text style={styles.chartHead}> Soil Moisture: </Text>
            <RenderSoilChart/>
            <Text style={styles.chartHead}> pH: </Text>
            <RenderPhChart/>
      


       
    </View>
    </ScrollView>
    )
}