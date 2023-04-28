import React, { useEffect, useState } from 'react'
import { Text, View, Header, FlatList, Alert, TouchableOpacity, ScrollView, Table} from 'react-native'
import { WebView } from 'react-native-webview';
import styles from './styles';
import { app } from '../../firebase/config';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { async } from '@firebase/util';
import axios from 'axios';



export default function HomeScreen(props) {

    const navigation = useNavigation();

    // state variables
    const [temp, setTemp] = useState([])
    const [ hum, setHum ] = useState([]);
    const [pressure, setPressure] = useState([]);
    const [ rain, setRain ] = useState([]);
    const [ moi, setMoi ] = useState([]);
    const [TSdata, setTSdata] = useState([]);
    const [chartImageUrl, setChartImageUrl] = useState(null);
    const [weatherData, setWeatherData] = useState(null);

    const API_KEY = 'TLDSGLZ1SWUUFAMZ';
    const channel_id = '2021316';
    const WEATHER_API_KEY = 'cc233742e16683bec784085984c19b86';


    useEffect(() => {
        //alert();
        fetchTemp();
        
        fetchPressure();
        fetchHum();
        BoxHomeScreen();
        checkOptimalValues(temp, hum, pressure);
        // optimal_watering();
    }, [])

    const signOut = async () => {
        try {
            await app.auth().signOut();
            navigation.navigate('Login');
        } catch (error) {
            console.error(error);
        }
    };

    // fetching data from ThingSpeak

    const fetchTemp = async() =>{
        fetch('https://api.thingspeak.com/channels/${channel_id}}/fields/1.json?api_key=${API_KEY}}')
        
        .then((response) => response.json())
        .then((actualData) => {
            console.log(actualData);
            setTemp(actualData.feeds);
        })
        .catch((err) => {
            console.log(err.message);
        });
    };

    const fetchHum = async() => {
        fetch('https://api.thingspeak.com/channels/2021316%7D/fields/2.json?api_key=TLDSGLZ1SWUUFAMZ}')
        
        .then((response) => response.json())
        .then((actualData) => {
            console.log(actualData);
            setHum(actualData.feeds);
        })
        .catch((err) => {
            console.log(err.message);
        });
    }

    const fetchPressure = async() =>{
        fetch('https://api.thingspeak.com/channels/2021316%7D/fields/3.json?api_key=TLDSGLZ1SWUUFAMZ}')
        
        .then((response) => response.json())
        .then((actualData) => {
            console.log(actualData);
            setPressure(actualData.feeds);
        })
        .catch((err) => {
            console.log(err.message);
        });
    };

    // interface and navigation styling
    const boxes = [
        { name: 'Weather', icon: 'ios-partly-sunny', color: '#FFD017' },
        { name: 'Temperature', icon: 'ios-thermometer-outline', color: '#FD8C73' },
        { name: 'Humidity', icon: 'ios-water-outline', color: '#FF6B6B' },
        { name: 'Pressure', icon: 'ios-cloud-circle-outline', color: '#70C1B3' },
        { name: 'Soil moisture', icon: 'ios-leaf-outline', color: '#ACDF87' },
        { name: 'pH', icon: 'ios-color-filter-outline', color: '#767676' },
    ];

    const BoxHomeScreen= ()=> {
        return (
        <View style={styles.container}>
            <View style={styles.grid}>
            {boxes.map((box) => (
                <TouchableOpacity
                key={box.name}
                style={[styles.box, { backgroundColor: box.color }]}
                onPress = {()=> handleBoxPress(box)}
                >
                <Icon name={box.icon} size={40} color="#FFF" />
                <Text style={styles.boxText}>{box.name}</Text>
                </TouchableOpacity>
            ))}
            </View>
        </View>
        );
    }

    // watering recommendation alerts

    const checkOptimalValues = (temp, hum, pressure) => {
        // let count = alert_count;
        // if (count === 0) {
        //     count = 1;
        //     if(temp < 20 ){
        //         Alert.alert(
        //             "Temperature is below the optimal value",
        //             "Do you want to navigate to the Temperature Analysis?",
        // [
        //   {
        //     text: "Yes",
        //     onPress: () => {
        //       // Navigate to settings screen
        //       navigation.navigate("Temperature");
        //     },
        //   },
        //   {
        //     text: "No",
        //     style: "cancel",
        //   },
        // ]
        // );
        //     }
            // else if(temp > 25) {
            //     Alert.alert(
            //         "Temperature is above the optimal value",
            //         "Do you want to navigate to Temperature Analysis?",
            //         [
            //           {
            //             text: "Yes",
            //             onPress: () => {
            //               // Navigate to settings screen
            //               navigation.navigate("Temperature");
            //             },
            //           },
            //           {
            //             text: "No",
            //             style: "cancel",
            //           },
            //         ]
            //     );
            // }
            // if(hum < 40 ){
            //     Alert.alert(
            //         "Humidity is below the optimal value",
            //         "Do you want to navigate to humidity analysis??",
            //         [
            //           {
            //             text: "Yes",
            //             onPress: () => {
            //               // Navigate to settings screen
            //               navigation.navigate("Humidity");
            //             },
            //           },
            //           {
            //             text: "No",
            //             style: "cancel",
            //           },
            //         ]
            //     );
            // }
            // else if(hum > 60) {
            //     Alert.alert(
            //         "Humidity is higher than the optimal value",
            //         "Do you want to navigate to the humidity analysis?",
            //         [
            //           {
            //             text: "Yes",
            //             onPress: () => {
            //               // Navigate to settings screen
            //               navigation.navigate("Humidity");
            //             },
            //           },
            //           {
            //             text: "No",
            //             style: "cancel",
            //           },
            //         ]
            //     );
            // }
            // if(pressure < 1013){
            //     Alert.alert(
            //         "Pressure is lower than the optimal value",
            //         "Do you want to navigate to the Pressure Analysis?",
            //         [
            //           {
            //             text: "Yes",
            //             onPress: () => {
            //               // Navigate to settings screen
            //               navigation.navigate("Pressure");
            //             },
            //           },
            //           {
            //             text: "No",
            //             style: "cancel",
            //           },
            //         ]
            //     );
            // } 
            //else if(pressure > 1015) {
            //     Alert.alert(
            //         "Pressure is higher than the optimal value",
            //         "Do you want to navigate to the Pressure analysis?",
            //         [
            //           {
            //             text: "Yes",
            //             onPress: () => {
            //               // Navigate to settings screen
            //               navigation.navigate("Pressure");
            //             },
            //           },
            //           {
            //             text: "No",
            //             style: "cancel",
            //           },
            //         ]
            //     );
            // }
        //}
    }
    
    // Call the checkOptimalValues function with the current values of temp, hum and pressure
    

    // const alert = () => {
    //     let count = alert_count;
    //     if (count == 0) {
    //         count = 1;
    //     if(temp<20 ){
    //         Alert.alert(
    //             "Temperature is below the optimal value")
    //     }
    //     if(hum>60 ){
    
    //         Alert.alert(
    //          "Humidity is higher than the optimal value");
    //     }
    //     if(pressure>1013){
    //          Alert.alert(
    //              "Pressure is higher than the optimal value")
               
                // [
                //     {
                //         text: "View Analysis",
                //         //onPress: () => onPressAnalysis(),
                //     },
                //     {
                //         text: "Water Now",
                //         //onPress: () => onPresswater(),
                //     },
                //     {
                //         text: "Cancel",
                //         onPress: () => console.log("cancel"),
                //         style: "cancel",
                //     }
                // ]
             //}
    //     }
    // }

//     const optimal_watering = () => {
//         if (pressure[0] < 0.15) {
//             if (hum[0] < 0.40) {
//                 if (temps[0] > 20) {
//                     alert();
//                     console.log('alert')
//                 }
                    
//             }
//         }
//    }


    const handleBoxPress = (box) => {
        switch (box.name) {
            case 'Temperature':
                navigation.navigate("Temperature");
                break;
            case 'Humidity':
                navigation.navigate("Humidity");
                break;
            case 'Pressure':
                navigation.navigate("Pressure");
                break;
            case 'Weather':
                navigation.navigate("Weather");
                break;
            case 'Soil moisture':
                navigation.navigate("Soil");
                break;
            case 'pH':
                navigation.navigate("Ph");
                break;
        //   // add cases for other boxes as needed
        }
    };
    
    // formatting data fetched to display

    const renderDatatemp = ({item, index}) => {
        return (
            <View style={styles.entityContainer}>
                <Text style={styles.entityText}>
                    {JSON.stringify(item.field1)} Celsius
                </Text>
            </View>
        )
    }
    const renderDataPressure = ({item, index}) => {
        return (
            <View style={styles.entityContainer}>
                <Text style={styles.entityText}>
                    {JSON.stringify(item.field3*0.001)} kPa
                </Text>
            </View>
        )
    }

    const renderDataPercent = ({item, index}) => {
        return (
            <View style={styles.entityContainer}>
                <Text style={styles.entityText}>
                    {JSON.stringify(item.field2)} %
                </Text>
            </View>
        )
    }

    return (
        <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
            <TouchableOpacity style={styles.signOut} onPress={signOut}>
                <Text style={styles.signoutText}>Sign Out</Text>
            </TouchableOpacity>
            <Text style={styles.tagline}>Saving our Earth one drop at a time</Text>
            <TouchableOpacity style={styles.databutton} onPress={() => navigation.navigate("Analysis")}> 
                <Text style={styles.buttonText}>Data Analysis</Text> 
            </TouchableOpacity>
            {/* <Text style={styles.alertContainer}>Watering is now optimal</Text>  */}

             
            <BoxHomeScreen/>
        </View>      
        </ScrollView>  
    
 
    );
    
};

// fetching functions for data from firebase

// data fetching from firebase

// const midt = [];
// const midh = [];
// const midr = [];
// const midm = [];

    // const fetchTemps = async() => {

    //     const usersCollection = app.firestore().collection('tempsensor').orderBy('timestamp','desc');
    //     let response = await usersCollection.get();
    //         response.forEach((documentSnapshot) => {
    //                 //console.log(documentSnapshot.data());
    //                 //console.log("ID: ",documentSnapshot.id);
    //                 //const wire = documentSnapshot.data()
    //                 const num = documentSnapshot.get('temperature')
    //                 midt.push(num);
                   
    //             });
    //         setTemps(midt);
    // }

    // const fetchMoi = async() => {

    //     const usersCollection = app.firestore().collection('moisture').orderBy('timestamp','desc');
    //     let response = await usersCollection.get();
    //         response.forEach((documentSnapshot) => {
    //                 //console.log(documentSnapshot.data());
    //                 //console.log("ID: ",documentSnapshot.id);
    //                 //const wire = documentSnapshot.data()
    //                 const moisture = documentSnapshot.get('Moisture')
    //                 midm.push(moisture);
                   
    //             });
    //         setMoi(midm);
    // }

    // const fetchRain = async() => {

    //     const usersCollection = app.firestore().collection('rainfall').orderBy('timestamp','desc');
    //     let response2 = await usersCollection.get();
    //         response2.forEach((documentSnapshot) => {
    //                 //console.log(documentSnapshot.data());
    //                 //console.log("ID: ",documentSnapshot.id);
    //                 const rainfall = documentSnapshot.get('Rainfall');
    //                 midr.push(rainfall);
                
    //             });
    //         setRain(midr);
    // }
    // const optimal_watering = () => {
    //             if (temp[0] < 20) {
    //                 // if (hum[0] < 0.40) {
    //                 //     if (temps[0] > 20) {
    //                 //         alert();
    //                 console.log('alert')
    //                 Alert.alert("You should water now")
    //             } 
    // }

    // const fetchHum = async() => {
    //     const usersCollection = app.firestore().collection('weather').orderBy('timestamp','desc');
    //     let response2 = await usersCollection.get();
    //         response2.forEach((documentSnapshot) => {
    //                 //console.log(documentSnapshot.data());
    //                 //console.log("ID: ",documentSnapshot.id);
    //                 const humidity = documentSnapshot.get('Humidity');
    //                 midh.push(humidity);
        
    //             });
    //         setHum(midh);
    //}

    // displaying firebase fetched data 
               {/*  {temp &&(
               
                <View style= {[styles.listContainer, {flex:3, flexDirection:'row'}]}>
                    <Text>Temperature: </Text>
                    <FlatList
                        data= {temp}
                        renderItem ={renderDatatemp} 
                        keyExtractor={(item, index)=> {return index.toString(); }}
                        removeClippedSubviews = {true}
                        />
                </View>
             

            )}
           {/* { temps && (
                <View style={[styles.listContainer, {flex: 2, flexDirection:'row'}]}>
                    <Text>Temperature: </Text>
                    <FlatList
                        data={temps}
                        renderItem={renderDatatemp}
                        keyExtractor={(item, index) => { return index.toString(); }}
                        removeClippedSubviews={true}
                    />
                </View>
            )}  */}
            {/* { hum && (
                 <View style={[styles.listContainer, {flex: 3, flexDirection:'row'}]}>
                     <Text>Humidity from thingspeaak: </Text>
                     <FlatList
                         data={hum}
                         renderItem={renderDataPercent}
                         keyExtractor={(item, index) => { return index.toString(); }}
                         removeClippedSubviews={true}
                     />
                 </View>
             )} */}
            {/* { moi && (
                 <View style={[styles.listContainer, {flex: 4, flexDirection:'row'}]}>
                     <Text>Moisture: </Text>
                     <FlatList
                         data={moi}
                         renderItem={renderDataPercent}
                         keyExtractor={(item, index) => { return index.toString(); }}
                         removeClippedSubviews={true}
                     />
                 </View>
             )} */}
            {/* { pressure && (
                 <View style={[styles.listContainer, {flex: 5, flexDirection:'row'}]}>
                     <Text>Pressure: </Text>
                     <FlatList
                         data={pressure}
                         renderItem={renderDataPressure}
                         keyExtractor={(item, index) => { return index.toString(); }}
                         removeClippedSubviews={true}
                     />
                 </View>
            )}  */} 

