import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import MapView, { Marker, Polygon } from 'react-native-maps';

const MapComponent = () => {
    const mapRef = useRef(null);
    const [markers, setMarkers] = useState([]);
    const [polygons, setPolygons] = useState([]);

    const handleMarkerPress = (coordinate) => {
        setMarkers([...markers, coordinate]);
    };

    const handlePolygonCreate = () => {
        if (markers.length >= 3) {
            setPolygons([...polygons, markers]);
            setMarkers([]);
        }
    };

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                onPress={(event) => handleMarkerPress(event.nativeEvent.coordinate)}
            >
                {markers.map((coordinate, index) => (
                    <Marker key={index} coordinate={coordinate} />
                ))}
                {polygons.map((coordinates, index) => (
                    <Polygon key={index} coordinates={coordinates} />
                ))}
            </MapView>
            <TouchableOpacity style={styles.button} onPress={handlePolygonCreate}>
                <Text style={styles.buttonText}>Créer un polygone</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        flex: 1,
        width: '100%',
    },
    button: {
        position: 'absolute',
        bottom: 20,
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default MapComponent;
