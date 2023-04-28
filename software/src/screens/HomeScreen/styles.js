import { white } from 'colorette';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent:'center',
        //flexDirection: 'column'
    },
    
      grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 40,
      },
      box: {
        width: '48%',
        aspectRatio: 1,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
      },
      boxText: {
        color: '#FFF',
        fontWeight: 'bold',
        marginTop: 10,
        fontSize: 16,
        textAlign: 'center',
      },
    containerTable: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      headerTable: {
        flexDirection: 'row',
        backgroundColor: 'lightgray',
        padding: 10,
      },
      headerText: {
        flex: 1,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      row: {
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
      },
      field: {
        flex: 1,
        textAlign: 'center',
      },
    formContainer: {
        flexDirection: 'row',
        height: 80,
        marginTop: 40,
        marginBottom: 20,
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    heading: {
        flex: 1,
        //height: 300,
        width: 420,
        alignSelf: "center",
        marginTop: 10,
        fontSize: 22,
        
    },
    databutton: {
        marginTop: 15,
        height: 40,
        borderRadius: 5,
        backgroundColor: '#afeeee',
        width: 150,
        alignItems: "center",
        justifyContent: 'center',
        //background-image: url ("src/img/button.png")
    },
    buttonText: {
        color: 'black',
        fontSize: 17
    },
    listContainer: {

        marginTop: 20,
        padding: 10,
        backgroundColor: '#e0ffff',
        justifyContent:'left'

    },
    entityContainer: {
        marginTop: 11,
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1,
        paddingBottom: 15
    },
    entityText: {
        fontSize: 20,
        color: '#333333'
    },
    tagline : {
        fontSize: 17,
        marginTop: 15,
        color: `#008080`
    },
    header : {
        fontSize: 20,
        marginTop: 10,
        alignContent: 'center',
        fontWeight:'bold'
    },
    chartImage: {
        width: 300,
        height: 300
    },
    chartHead: {
        marginTop: 10,
        textAlign: 'left',
        fontSize:16,
        color:`#008080`
        
    },
    alertContainer: {
        borderWidth:2,
        padding:5,
        marginTop:10,
        fontSize:18,
        backgroundColor: '#90ee90'
    },
    signOut: {
        marginRight: 300,
        marginTop:10
    },

    signoutText: {
        color: '#48d1cc',
        fontSize: 16
    },
    scrollView: {
        backgroundColor: 'white',
        marginHorizontal: 20,
      },

})