import React, { Component } from 'react';

import { StyleSheet, FlatList, Text, View, ActivityIndicator, Platform} from 'react-native';

export default class UsuariosBox extends Component {
    constructor(props)
    {
   
      super(props);
   
      this.state = { 
      isLoading: true
    }
    }
   
    componentDidMount() {
      
         return fetch('https://ipettcc.azurewebsites.net/api/usuario/GetCorridas',{
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
          })
           
           .then((response) => response.json())
           .then((responseJson) => {
             this.setState({
               isLoading: false,
               dataSource: responseJson
             }, function() {
               // In this block you can do something with new state.
             });
           })
           .catch((error) => {
             console.error(error);
           });
       }
   
  FlatListItemSeparator = () => {
      return (
        <View style={{height: 0.5, width: '100%', backgroundColor: '#C8C8C8'}}/>
      );
    }
  
   
    render() {
   
      if (this.state.isLoading) {
        return (
          <View style={{flex: 1, paddingTop: 20}}>
            <ActivityIndicator />
          </View>
        );
      }
   
      return (
   
  <View style={styles.MainContainer}>
    
         <FlatList 
            data={ this.state.dataSource }
            ItemSeparatorComponent = {this.FlatListItemSeparator}
            renderItem={({item}) => <Text style={styles.FlatListItemStyle}> {item.endereco},{item.numero} </Text>}
            keyExtractor={(item, index) => index} 
           />    
  </View>
              
      );
    }
  }
  const styles = StyleSheet.create({
    MainContainer: {
      justifyContent: 'center',
      flex: 1,
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 10,
      marginTop: 30,
    },
  
    item: {
      marginTop: 30,
      padding: 10,
      fontSize: 18,
      height: 44,
    },
  });
