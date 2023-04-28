import { white } from 'colorette';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 2,
        alignItems: 'center',
        backgroundColor: 'white',
        justifyContent:'center',
        //flexDirection: 'column'
        borderWidth: 1,
        borderColor: 'black',
        padding: 25,
    },

    chartHead: {
        marginTop: 10,
        textAlign: 'left',
        fontSize:16,
        color:`#008080`

        
    },
    containerTable: {
        borderWidth: 1,
        borderColor: 'black',
        alignItems:'center',
        padding: 10,
      },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
      },
      headerCell: {
        fontWeight: 'bold',
        flex: 1,
      },
      cell: {
        flex: 1,
      },
      tableContainer: {
        flex: 1,
        marginVertical: 10,
        marginHorizontal: 20,
      },
      tableHeader: {
        fontSize:10,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 5,
      },
      tableCell: {
        flex:1,
        paddingVertical: 10,
        paddingHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
      },
      tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 5,
      },
      entityContainer: {
        flex: 1,
      },
      entityText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
      },
})