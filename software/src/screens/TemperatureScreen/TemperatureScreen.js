import React, { useEffect, useState } from 'react'
import {Text, View , FlatList, Table, ScrollView} from 'react-native'
import DropdownPicker from 'react-native-dropdown-picker';
import { WebView } from 'react-native-webview';
import styles from './styles';

export default function TemperatureScreen() {
    const [temp, setTemp] = useState([])
    const [timestamp, setTimestamp] = useState([])
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState('all');

    const [ columns, setColumns ] = useState([
        "Date",
        "Time",
        "Temperature"
       
      ])

    const table_header= ['Day', 'Time', 'Temperature']
    const API_KEY = 'TLDSGLZ1SWUUFAMZ';
    const channel_id = '2021316';
    const urlTemp = 'http://thingspeak.com/channels/2021316/charts/1?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=10&type=line&update=15';
    
    const urltvsh = 'https://thingspeak.com/apps/matlab_visualizations/499942';

    const fetchTemp = async() =>{
        fetch('https://api.thingspeak.com/channels/2021316%7D/fields/1.json?api_key=TLDSGLZ1SWUUFAMZ}')
        //fetch('https://api.thingspeak.com/channels/${channel_id}}/fields/1.json?api_key=${API_KEY}}')
        .then((response) => response.json())
      .then((actualData) => {
        console.log(actualData);
        setTemp(actualData.feeds);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const fetchTimestamp = async() =>{
    fetch('https://api.thingspeak.com/channels/2021316%7D/fields/1.json?api_key=TLDSGLZ1SWUUFAMZ}')
    
    .then((response) => response.json())
  .then((actualData) => {
    console.log(actualData);
    setTimestamp(actualData.feeds);
  })
  .catch((err) => {
    console.log(err.message);
  });
};
    

    
      const RenderTable = () => {
        const optimalValues = [
            { name: 'Temperature', value: '20-25°C' },
           
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
                style={{marginTop: 30, width: 500, height: 130}}
                javaScriptEnabled={true}
                startInLoadingState={true}
                //onLoad={() => console.log('Page loaded!')}
                //injectedJavaScript={'alert("Hello World!")'}
                //allowFullScreen={true}
                scalesPageToFit={true}
            />
            
        );
    }
    
    useEffect(() => {
        fetchTemp();
        fetchTimestamp();
    }, [])

      // formatting data fetched to display

  const format_date = timestamp.map( item => {
    const date = new Date(item.created_at).toString();
    return date;
  });

  const format_temp = temp.map(item => {
    const temperature = Number(item.field1);
    return temperature;
  });

  const data = format_date.map((item,index) => ({
    timestamp: format_date[index],
    temperature:  format_temp[index]
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
    console.log('filtering')
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
    const {timestamp, temperature} = item;
    return(
      <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
        <Text style={{ flex: 1, textAlign: 'left' , fontSize:15}}>{timestamp}</Text>
        {/* <Text style={{ flex: 1, textAlign: 'center', fontSize:17 }}>{temperature} Celsius</Text> */}
        {temperature > 25 || temperature<20 ? (
        <Text style={{ flex: 1, textAlign: 'center', fontSize:17, color: 'red' }}>
          {temperature} Celsius
        </Text>
      ) : (
        <Text style={{ flex: 1, textAlign: 'center', fontSize:17, color: 'green' }}>
          {temperature} Celsius
        </Text>
      )}
      </View>
    )
  };

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
            />
            </View>
            <View style= {styles.tableRow}>
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
                          <Text style={{ flex: 1, textAlign: 'center', fontSize:18 }}>Temperature</Text>
                        </View>
                      }
              />
            </View>
            )}
</View>
</View>
       
    {/* </View> */}
    </ScrollView>
    )
}