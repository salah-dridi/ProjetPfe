import { View, Text, TouchableOpacity, Modal, Button } from 'react-native'
import React, { useState, useEffect } from 'react';
import PlagePubliqueService from '../../../services/plagepubliqueService';
import Colors from '../../../constants/Colors';
import Icon, { Icons } from '../../../constants/Icons';
import MapView, { Circle, Polyline, Marker } from 'react-native-maps';
import { initialRegion } from '../../../constants/constant';
const Detailsplage = ({ route }) => {
    const { id_plage_publique } = route.params
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(true);
    const [espace, setEspace] = useState([])
    const [points, setPoints] = useState()
    const [modalVisibility, setModalVisibility] = useState(false);
    const [region, setRegion] = useState();
    const userService = new PlagePubliqueService()

    useEffect(() => {
        GetEspacePlagePubliqueById(id_plage_publique)
        getCentroidPlagePubliqueById(id_plage_publique)

    }, [])

    const GetEspacePlagePubliqueById = async (id) => {
        try {
            const response = await userService.GetEspacePlageById(id)
            const result = response.data.map(([longitude, latitude]) => {
                return { "longitude": longitude, "latitude": latitude };
            });

            setEspace(result)
        } catch (err) {
            console.log("erreur")
        } finally {
            setLoading(false);
        }
    }
    const getCentroidPlagePubliqueById = async (id) => {

        try {
            const response = await userService.getCentroidPlageById(id)

            const point2 = {
                "longitude": response.data[0],
                "latitude": response.data[1],
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }

            setRegion(point2)
        } catch (err) {
            console.log("erreur")
        } finally {
            setLoading2(false)
        }
    }

    const EnAttend = () => {
        return (
            <View style={{ backgroundColor: 'red', height: "30%" }} >
                <Text style={{ fontSize: 70 }}>Loading...</Text>
            </View>
        )
    }
    const close = () => {
        setModalVisibility(false);
    };
    return (
        <View style={{ flex: 1, backgroundColor: Colors.couleur2, }} >
            {loading ? (
                <EnAttend />
            ) : (
                <View style={{ marginTop: 30, marginBottom: 10 }}>
                    <Text style={{ fontSize: 40, color: Colors.primary }}>plage:</Text>

                </View>
            )}
            {loading2 ? (
                <EnAttend />
            ) : (

                <TouchableOpacity onPress={() => {
                    setModalVisibility(true);

                }} >
                    <Icon type={Icons.EvilIcons} name="location" color={Colors.primary} size={34} />
                </TouchableOpacity>

            )}

            <Modal visible={modalVisibility} animationType="fade" style={{ flex: 1, backgroundColor: Colors.primary }}>
                {loading2 ? (
                    <EnAttend />
                ) : (
                    <View style={{ flex: 1 }}>
                        <MapView style={{ flex: 1 }} region={initialRegion} onRegionChangeComplete={setRegion} mapType='satellite'>
                            <Polyline coordinates={espace} strokeWidth={4} strokeColor={Colors.primary} />

                        </MapView>
                        <Button title="Close" onPress={() => close()} />
                    </View>
                )}

            </Modal>
        </View>
    )
}

export default Detailsplage
/* {points.map((point, index) => (
                                <Marker
                                    key={index}
                                    coordinate={{ latitude: point.latitude, longitude: point.longitude }}
                                    title={point.nom}
                                    onPress={() => console.log(point)}
                                />
                            ))} */

