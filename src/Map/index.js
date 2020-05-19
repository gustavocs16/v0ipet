import React, { Fragment } from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Permission from 'expo-permissions'
import Search from '../Search';
import Directions from '../Directions';
import { getPixelSize } from '../utils';
import markerImage from '../Assets/petpata.png';

import { LocationBox, LocationText, LocationTimeBox, LocationTimeText, LocationTimeTextSmall, Container} from './styles';
//import { Container} from '../Details/styles'
import { Text } from 'react-native-animatable';



export default class Map extends React.Component {

    state = {
        region: null,
        destination: {
            latitude: -25.460131,
            longitude: -49.185384,
            
        },

        tempo: null,

        places:[
            {
                id:1,
                title:'Gustavo de Melo',
                description:'Pet nome: Theo',
                latitude: -25.460131,
                longitude: -49.185384,
            },
            {
                id:2,
                title:'Henrique Fischer',
                description:'Pet nome: Nick',
                latitude: -25.4066943,
                longitude: -49.2108561,
            },
            {
                id:3,
                title:'Ana Camargo',
                description:'Pet nome: Perola',
                latitude: -25.4104806,
                longitude:-49.2053639,
            },
            {
                id:4,
                title:'Lays Kamilla',
                description:'Pet nome: Panqueca',
                latitude:-25.400786,
                longitude:-49.20671
            }

        ],

    };
    async componentDidMount() {
        await Permission.askAsync(Permission.LOCATION);
        navigator.geolocation.getCurrentPosition(
            ({ coords: { latitude, longitude } }) => {
                this.setState({
                    region: {
                        latitude,
                        longitude,
                        latitudeDelta: 0.0143,
                        longitudeDelta: 0.0134
                    }
                });
                
            }, //sucesso
            () => { }, //erro
            {
                timeout: 2000,
                enableHighAccuracy: true,
                maximumAge: 1000,
            }
        )
        
    }
// Teste de atualizar coordenadas
    /*async componentWillUpdate(){
        //navigator.geolocation.fitToCoordinates
        this.MapView.fitToCoordinates(result.coordinates, {
            edgePadding: {
                right: getPixelSize(50),
                left: getPixelSize(50),
                top: getPixelSize(50),
                bottom: getPixelSize(50)
            }

        }, 
        {
            timeout: 2000,
            enableHighAccuracy: true,
            maximumAge: 1000,
        });
       
    }*/
    //
    handleLocationSelected = (data, { geometry }) => {
        const { location: { lat: latitude, lng: longitude } } = geometry;
        this.setState({
            destination: {
                latitude,
                longitude,
                title: data.structured_formatting.main_text,
            }
        })
    }
    render() {
        const { region, destination, distancia, tempo } = this.state;
        return (
            
            <View style={{ flex: 1 }}>
                <Text >Corridas iPet</Text>
                <MapView style={{ flex: 1 }}
                    region={region}
                    showsUserLocation
                    loadingEnabled
                    ref={el => this.MapView = el}>

                        {this.state.places.map(place => (
                            <MapView.Marker
                            key={place.id}
                            coordinate={{latitude: place.latitude,
                                longitude:place.longitude}}
                            icon={require('../Assets/petpata.png')}
                            title={place.title}
                            description={place.description}
                            
                                />
                        ))}
                      
                      
                          <Fragment>
                        <Directions
                        
                            origin={region}
                            destination={destination}
                            params={
                                [
                                    {
                                        key: "travelmode",
                                        value: "driving"        // may be "walking", "bicycling" or "transit" as well
                                      },
                                      {
                                        key: "dir_action",
                                        value: "navigate"       // this instantly initializes navigation using the given travel mode
                                      }
                                ]
                            }
                            waypoints= {[
                                {
                                    latitude: -25.4104806,
                                    longitude:-49.2053639
                                },
                                {
                                    latitude:-25.400786,
                                    longitude:-49.20671
                                },
                                
                                {
                                    latitude: -25.4066943,
                                    longitude: -49.2108561,
                                }
                                
                            ]}
                            
                            onReady={
                                result => {
                                    console.log(`Distância: ${result.distance} Km`)
                                    console.log(`Duração: ${Math.floor(result.duration)} Minutos.`)
                                    this.setState({distancia:`: ${Math.floor(result.distance)} Km`});
                                    this.setState({tempo:`: ${Math.floor(result.duration)} Minutos.`});
                                    //console.log(this.state.tempo)
                                    
                                        this.MapView.fitToCoordinates(result.coordinates, {
                                            edgePadding: {
                                                right: getPixelSize(50),
                                                left: getPixelSize(50),
                                                top: getPixelSize(50),
                                                bottom: getPixelSize(50)
                                            }
                            
                                        });
                                }
                            } />
                        
                    </Fragment>
                      
                    
                    
                    
                   
                </MapView>
                
               <Container >
                        <Text>Distância total{this.state.distancia}</Text>
                        <Text>Duração de viagem{this.state.tempo}</Text>
               </Container>
               
            </View>
            
        );
        
    }









}
