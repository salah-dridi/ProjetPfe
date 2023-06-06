import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View, Image, RefreshControl } from 'react-native'
import Styles from '../../../constants/Styles';
import Colors from '../../../constants/Colors';
import * as Animatable from 'react-native-animatable'
import { Animations } from '../../../constants/Animations';
import PlageService from '../../../services/plageService';
import Icon, { Icons } from '../../../constants/Icons';
const { width, height } = Dimensions.get("window");
export default function ListOfPlages({ navigation }) {
    const lienimage = '../../../images/'
    const [isRefreshing, setIsRefreshing] = useState(false);
    const viewRef = useRef(null);
    const plageService = new PlageService()
    const [plages, setPlages] = useState([])
    const animation = Animations[Math.floor(Math.random() * Animations.length)]
    const ItemSeparator = () => <View style={styles.separator} />

    const renderItem = ({ item, index }) => (
        <ContactItem item={item} index={index} animation={animation} />)

    useEffect(() => {
        GetAllPlages();
    }, []);
    const GetAllPlages = () => {
        return new Promise((resolve, reject) => {
            plageService.GetAllPlages()
                .then((res) => {
                    setPlages(res.data);
                  
                    resolve(); // Résoudre la promesse
                })
                .catch((err) => {
                  
                });
        });
    };

 
    const onRefresh = () => {
        setIsRefreshing(true);
        GetAllPlages()
            .then(() => setIsRefreshing(false))
            .catch((err) => console.log(err)); // Gérer les erreurs éventuelles
    };

    const ContactItem = ({ item: { id_plage, nom_plage,photo }, index, animation }) => {

        return (

            <Animatable.View
                animation={animation}
                duration={1000}
                delay={index * 300}
            >

                <TouchableOpacity style={styles.item}
                 
                >

                    <View style={styles.avatar}>

                        <Image
                            source={{ uri: "http://localhost:3000/storages/" + photo }}
                            style={styles.image}
                            resizeMode="cover"
                        />
                    </View>
                    <View style={styles.details}>
                        <Text style={styles.name}>{nom_plage}</Text>
                     
                    </View>

                </TouchableOpacity>

            </Animatable.View>
        )
    }
    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <View style={{
                height: height * 0.07,
                backgroundColor: Colors.primary
            }}>
                <View style={{
                    marginLeft: 10,
                    marginRight: 10,
                    marginTop: 8,
                    alignItems: "center",

                }}>

                    <TouchableOpacity
                        style={{
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexDirection: "row",
                            alignSelf: "flex-end"
                        }}
                      onPress={()=>navigation.navigate("AddNewPlage")}
                    >
                        <Text style={{ marginRight: 10, color: Colors.white, fontSize: 20 }}>إضافة شاطئ</Text>
                        <Icons.AntDesign name='pluscircle' size={30} color={Colors.white} />
                    </TouchableOpacity>


                </View>

            </View>
            <View style={{
                height: height * 0.07,
                backgroundColor: Colors.primary,
                borderBottomColor: Colors.primary,
                borderBottomRightRadius: 30,
                borderBottomLeftRadius: 30
            }}>
                <View style={{
                    marginLeft: 10,
                    marginRight: 10,
                    marginTop: 8,
                    alignItems: "center",

                }}>

                    <TouchableOpacity
                        style={{
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexDirection: "row",
                            alignSelf: "flex-end"
                        }}
                        onPress={() => onRefresh()}
                    >
                        <Text style={{ marginRight: 10, color: Colors.white, fontSize: 20 }}>تحديث</Text>
                        <Icons.FontAwesome name='refresh' size={30} color={Colors.white} />
                    </TouchableOpacity>


                </View>

            </View>

            <View style={[Styles.container]}>
                <Animatable.View
                    ref={viewRef}
                    easing={'ease-in-out'}
                    duration={500}
                >
                    <FlatList
                        data={plages}
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
