import React, { useEffect, useState } from 'react'
import {Text, View , FlatList, Table, ScrollView, Modal} from 'react-native'
import DropdownPicker from 'react-native-dropdown-picker';
import { WebView } from 'react-native-webview';
import styles from './styles';

export default function HumidityScreen() {
  const [hum, setHum] = useState([]);
  const [timestamp, setTimestamp] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState('all');



  const urlHum = 'https://thingspeak.com/channels/2021316/charts/2?bgcolor=%23ffffff&color=%230000FF&dynamic=true&results=60&title=Humidity+Chart&type=line';
  const urlTemp = 'http://thingspeak.com/channels/2021316/charts/1?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=10&type=line&update=15';
  const urltvsh = 'https://thingspeak.com/apps/matlab_visualizations/499942';

  const API_KEY = 'TLDSGLZ1SWUUFAMZ';
  const channel_id = '2021316';

  useEffect(() => {
    fetchTimestamp();
    fetchHum();
  }, [])

  // fetch humidity data

  const fetchHum = async() => {
    fetch('https://api.thingspeak.com/channels/2021316%7D/fields/2.json?api_key=TLDSGLZ1SWUUFAMZ}')
        
    .then((response) => response.json())
    .then((actualData) => {
      setHum(actualData.feeds);
    })
    .catch((err) => {
      console.log(err.message);
    });
  }

  // fetch date and time data

  const fetchTimestamp = async() =>{
    try {
    let response = await fetch('https://api.thingspeak.com/channels/2021316%7D/fields/2.json?api_key=TLDSGLZ1SWUUFAMZ}')
    let actualData = await response.json()
    setTimestamp(actualData.feeds);
    }
    catch (err) {
      console.log(err.message);
    };
  };
    
    
  const RenderTable = () => {
    const optimalValues = [
      { name: 'Humidity', value: '60-70%' },
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

  const RenderHumChart = () => {
    return(
      <WebView 
        source={{uri : urlHum}}
        style={{marginTop: 30, width: 400, height: 130 }}
        javaScriptEnabled={true}
        startInLoadingState={true}
        //onLoad={() => console.log('Page loaded!')}
        scalesPageToFit={true}
      />    
    );
  };

  // formatting data fetched to display

  const format_date = timestamp.map( item => {
      const date = new Date(item.created_at).toString();
      return date;
  });

  const format_hum = hum.map(item => {
    const humidity = Number(item.field2);
    return humidity;
  });

  const data = format_date.map((item,index) => ({
    timestamp: format_date[index],
    humidity:  format_hum[index]
  }));
        
  // dropdown picker to filter dates
  const options = [
    {label: 'Last 24 hours', value: 'last24hrs'},
    {label: 'Last 7 days', value: 'last7days'},
    {label: 'Last month', value: 'lastmonth'},
    {label: 'All time', value: 'all'}
  ];

  const onSelectChange = (value) => {
    setValue(value);
  };

  // filter and finish formatting data

  const filterData = () => {
    if (value === 'last24hrs') {
      console.log('24hrs')
      return data.filter(item => {
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const timestamp = new Date(item.timestamp);
        return timestamp > twentyFourHoursAgo;
      });
    } else if (value === 'last7days') {
      return data.filter(item => {
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        const timestamp = new Date(item.timestamp);
        return timestamp > sevenDaysAgo;
      });
    } else if (value === 'lastmonth') {
      return data.filter(item => {
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        const timestamp = new Date(item.timestamp);
        return timestamp > thirtyDaysAgo;
      });
    } else {
      return data;
    }
  };
  
  const ordered_data = filterData().reverse();

    const renderData = ({item}) => {
      const {timestamp, humidity} = item;
      return(
        <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
          <Text style={{ flex: 1, textAlign: 'left' , fontSize:15}}>{timestamp}</Text>
          <Text style={{ flex: 1, textAlign: 'center', fontSize:17 }}>{humidity === 0 ? "N/A" : `${humidity}%`}</Text>
        </View>
      )
    };

    return (
        <ScrollView>
        <View style={styles.container}>
            <Text> This are the optimal humidity value for the crop to grow healthy: </Text>
            <Text> </Text>
            <RenderTable/>
            <Text> </Text>
          <Text>And here are the values from the sensors displayed in charts</Text>
          <Text style={styles.chartHead}> Humidity: </Text>
        <RenderHumChart/>
        <View style={{ flex: 1 }}>
        <DropdownPicker
        dropDownDirection="TOP"
        open={open}
        value={value}
        items={options}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        containerStyle={{ height: 50, width:200, zIndex:5000, elevation:1000}}
        onChangeItem={(item) => onSelectChange(item.value)}
        placeholder="Select a time range"
        defaultValue={value}
        // onSelectItem={(item) => {
        //   console.log(item.label);
        // }}
        //onValueChange={(value) => console.log('valuechange')}
        // onOpen={() => console.log('hi!')}
        // dropDownContainerStyle={{ backgroundColor: 'red',zIndex: 3000, elevation: 1000 }}
        />
        </View>
          <View style = {styles.tableRow}>
            {ordered_data && ( 
            <View style= {[styles.tableCell, {flex:3, flexDirection:'row'}]}>
                   <FlatList
                       data= {ordered_data}
                       renderItem ={renderData} 
                       keyExtractor={(item, index)=> index.toString() }
                      removeClippedSubviews = {true}
                      ListHeaderComponent={
                        <View style={styles.tableHeader}>
                          <Text style={{ flex: 1, textAlign: 'left', fontSize:18}}>Timestamp</Text>
                          <Text style={{ flex: 1, textAlign: 'center', fontSize:18 }}>Humidity</Text>
                        </View>
                      }
              />
            </View>
            )}
          </View> 
    </View>
    </ScrollView>
    )
}