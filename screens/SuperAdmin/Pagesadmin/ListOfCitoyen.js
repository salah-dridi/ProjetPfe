import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View, Image, RefreshControl, Alert } from 'react-native'
import Styles from '../../../constants/Styles';
import Colors from '../../../constants/Colors';
import * as Animatable from 'react-native-animatable'
import { Animations } from '../../../constants/Animations';
import Icon, { Icons } from '../../../constants/Icons';
import CitoyenService from '../../../services/citoyenService';
const { width, height } = Dimensions.get("window");
export default function ListOfCitoyen({ navigation }) {
    const lienimage = '../../../images/'
    const [isRefreshing, setIsRefreshing] = useState(false);
    const viewRef = useRef(null);
    const citoyenService = new CitoyenService()
    const [citoyens, setCitoyens] = useState([])
    const [test, setTest] = useState(false);
    const animation = Animations[Math.floor(Math.random() * Animations.length)]
    const ItemSeparator = () => <View style={styles.separator} />

    const renderItem = ({ item, index }) => (
        <ContactItem item={item} index={index} animation={animation} />)

    useEffect(() => {
        GetAllCitoyens()
    }, []);
    const GetAllCitoyens = () => {
        return new Promise((resolve, reject) => {
            citoyenService.GetAllCitoyens()
                .then((res) => {
                    setCitoyens(res.data);
                    setTest(true)
                    resolve(); // Résoudre la promesse
                })
                .catch((err) => {
                    setTest(false)
                });
        });
    };

    const onRefresh = () => {
        setIsRefreshing(true);
        GetAllCitoyens()
            .then(() => setIsRefreshing(false))
            .catch((err) => console.log(err)); // Gérer les erreurs éventuelles
    };
  
    const ContactItem = ({ item: { id_citoyen, email_citoyen }, index, animation }) => {
        const handlePress = async (id_citoyen) => {

        };

        return (

            <Animatable.View
                animation={animation}
                duration={1000}
                delay={index * 300}
            >

                <TouchableOpacity style={styles.item}
                    onPress={() => handlePress(id_citoyen)}

                >

                    <View style={styles.avatar}>

                        <Text>{index}</Text>
                    </View>
                    <View style={styles.details}>
                        <Text style={styles.name}>{email_citoyen}</Text>
                    </View>

                </TouchableOpacity>

            </Animatable.View>
        )
    }
    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
          
            <View style={[Styles.container]}>
                <Animatable.View
                    ref={viewRef}
                    easing={'ease-in-out'}
                    duration={500}
                >
                    <FlatList
                        data={citoyens}
                        keyExtractor={(_, i) => String(i)}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                        ItemSeparatorComponent={ItemSeparator}
                        refreshControl={
                            <RefreshControl
                                refreshing={isRefreshing}
                                onRefresh={onRefresh}
                                colors={[Colors.primary]}
                            />
                        }
                    />
                </Animatable.View>
            </View>



        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: Colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    avatar: {
        height: 36,
        width: 36,
        borderRadius: 18,

        alignItems: 'center',
        justifyContent: 'center',
    },
    letter: {
        color: 'white',
        fontWeight: 'bold',
    },
    details: {
        margin: 8,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'black',
    },
    role: {
        fontSize: 14,
        color: Colors.darkGray,
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: Colors.black,
    },
    listEmpty: {
        height: Dimensions.get('window').height,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
        borderRadius: 30,
    },
})
