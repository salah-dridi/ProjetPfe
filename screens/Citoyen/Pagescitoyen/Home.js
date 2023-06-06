import { Modal, Button, TouchableOpacity, Text, Dimensions, StyleSheet, TouchableHighlight, TouchableWithoutFeedback, View, Image, FlatList, RefreshControl } from 'react-native'
import React, { useRef, useReducer, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../../../constants/Colors';
import Icon, { Icons } from '../../../constants/Icons';
import Animated, { Extrapolate, interpolate, interpolateColor, log, useAnimatedStyle, useDerivedValue, withSpring, withTiming } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location'
import PlageService from '../../../services/plageService';
const { height, width } = Dimensions.get('window')
const FAB_SIZE = 54;
const circleScale = (width / FAB_SIZE).toFixed(1)
const circleSize = circleScale * FAB_SIZE;
const dist = circleSize / 2 - FAB_SIZE;
const middleDist = dist / 1.41;
export default function Home() {
    const [open, toggle] = useReducer(s => !s, false)
    const [location, setLocation] = useState(null)
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [plages, setPlages] = useState([])
    const plageService = new PlageService()
    const ActionButton = ({ icon, style }) => {
        return (
            <Animated.View style={[styles.actionBtn, style]}>
                <TouchableHighlight
                    underlayColor={Colors.primary}
                    style={styles.actionBtn}

                >
                    <Icon type={Icons.MaterialIcons} name={icon} size={34} color={Colors.white} />
                </TouchableHighlight>
            </Animated.View>
        )
    }

    // const MaPosition = async () => {
    //     const { status } = await Location.requestForegroundPermissionsAsync();
    //     const user = await AsyncStorage.getItem('user')

    //     if (status !== "granted") {
    //         return;
    //     }
    //     const userlocation = await Location.getCurrentPositionAsync();
    //     const data = {

    //         latitude: userlocation.coords.latitude,
    //         longitude: userlocation.coords.longitude
    //     }
    //     try {
    //         const response = await userService.NewReclamation(data)
    //     } catch (err) {
    //         console.log(err)
    //     }
    // };

    useEffect(() => {
        const getCoordinates = async () => {
            const { status } = await Location.requestForegroundPermissionsAsync()


            if (status !== "granted") {
                return
            }
            const userlocation = await Location.getCurrentPositionAsync()
            setLocation(userlocation)
        }
        getCoordinates();
        getAllPlages();
    }, [])

    const getAllPlages = () => {
        return new Promise((resolve, reject) => {
            plageService.GetAllPlages()
                .then((res) => {
                    setPlages(res.data);
                    resolve(); // Résoudre la promesse
                })
                .catch((err) => {
                    reject(err); // Rejeter la promesse en cas d'erreur
                });
        });
    };
    const onRefresh = () => {
        setIsRefreshing(true);
        getAllPlages()
            .then(() => setIsRefreshing(false))
            .catch((err) => console.log(err)); // Gérer les erreurs éventuelles
    };

    const ListItem = ({ item, navigation }) => {
        const navigatetodeatilsplage = (id, nom, description) => {
            //   navigation.navigate('Detailsplage', { id, nom, description })
        }
        return (
            <View style={styles2.item}>
                <TouchableOpacity style={[styles2.imageContainer]}

                >
                    <Image source={{ uri: "http://192.168.43.159:3000/storages/" + item.photo }} style={styles2.image} />

                    <Text style={[styles2.text]}>{item.nom_plage}</Text>

                </TouchableOpacity>

            </View>
        )
    }
    const rotation = useDerivedValue(() => {
        return withTiming(open ? '0deg' : '135deg');
    }, [open])

    const progress = useDerivedValue(() => {
        return open ? withSpring(1) : withSpring(0)
    })

    const translation = useDerivedValue(() => {
        return open ? withSpring(1, { stiffness: 80, damping: 8 }) : withSpring(0)
    })

    const fabStyles = useAnimatedStyle(() => {
        const rotate = rotation.value;
        const backgroundColor = interpolateColor(
            progress.value,
            [0, 1],
            [Colors.primary, Colors.couleur3]
        )
        return {
            transform: [{ rotate }],
            backgroundColor,
        }
    })

    const scalingStyles = useAnimatedStyle(() => {
        const scale = interpolate(
            progress.value,
            [0, 1],
            [0, circleScale],
        )
        return {
            transform: [{ scale }]
        }
    })

    const translationStyles = (x, y, value) => (
        useAnimatedStyle(() => {
            const translate = interpolate(
                translation.value,
                [0, 1],
                [0, -value],
                { extrapolateLeft: Extrapolate.CLAMP }
            )
            const scale = interpolate(
                progress.value,
                [0, 1],
                [0, 1],
                { extrapolateLeft: Extrapolate.CLAMP }
            )
            if (x && y) {
                return {
                    transform: [{ translateX: translate }, { translateY: translate }, { scale }]
                }
            } else if (x) {
                return {
                    transform: [{ translateX: translate }, { scale }]
                }
            } else {
                return {
                    transform: [{ translateY: translate }, { scale }]
                }
            }
        })
    )
    const navigation = useNavigation();
    const handleDrawerOpen = () => {
        toggle(false)
        navigation.openDrawer();

    }
    const ActionButton3 = ({ icon, style, fonction }) => {


        return (
            <Animated.View style={[styles.actionBtn, style]}>
                <TouchableHighlight
                    underlayColor={Colors.primary}
                    style={styles.actionBtn}
                    onPress={fonction}>
                    <Icon type={Icons.Foundation} name={icon} size={34} color={Colors.white} />
                </TouchableHighlight>
            </Animated.View>
        )
    }
    const Sortir = () => {
        navigation.goBack()
    }
    const ActionButton2 = ({ icon, style }) => {

        return (
            <Animated.View style={[styles.actionBtn, style]}>
                <TouchableHighlight
                    underlayColor={Colors.primary}
                    style={styles.actionBtn}
                    onPress={Sortir}>
                    <Icon type={Icons.MaterialIcons} name={icon} size={34} color={Colors.white} />
                </TouchableHighlight>
            </Animated.View>
        )
    }

    return (
        <View style={styles.container}>

            <FlatList
                data={plages}

                numColumns={2}
                style={{ paddingVertical: 10 }}
                keyExtractor={(item, index) => item.id + index.toString()}
                renderItem={({ item }) => <ListItem item={item} navigation={navigation} />}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={onRefresh}
                        colors={[Colors.primary]}
                    />
                }
            />
            <View style={styles.fabContainer}>
                <Animated.View style={[styles.expandingCircle, scalingStyles]} />
                <TouchableWithoutFeedback onPress={toggle}>
                    <Animated.View style={[styles.fab, fabStyles]}>
                        <Icon type={Icons.EvilIcons} name="close" color={Colors.white} size={34} />
                    </Animated.View>
                </TouchableWithoutFeedback>
                <ActionButton3 style={translationStyles(false, true, dist)} icon="list" fonction={handleDrawerOpen} />
                <ActionButton style={translationStyles(true, true, middleDist)} icon="report-problem" />
                <ActionButton2 style={translationStyles(true, false, dist)} icon="logout" />
            </View>
        </View>
    )
}

const CircleStyle = {
    width: FAB_SIZE,
    height: FAB_SIZE,
    borderRadius: FAB_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        marginTop: 30
    },
    fabContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    fab: {
        ...CircleStyle,
        backgroundColor: Colors.primary,
        transform: [{ rotate: '135deg' }]
    },
    expandingCircle: {
        ...CircleStyle,

        backgroundColor: Colors.primary,
        position: 'absolute',
        zIndex: -1,
    },
    actionBtn: {
        ...CircleStyle,
        backgroundColor: Colors.primary,
        position: 'absolute',
        zIndex: -1,
    },
})
const styles2 = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.couleur2,
    },
    item: {
        width: width / 2 - 24,
        marginLeft: 16,
        marginBottom: 16,
    },
    imageContainer: {
        height: height * 0.3,
        backgroundColor: Colors.primary,
        borderRadius: 14,
        alignItems: 'center',
    },
    image: {
        height: '65%',
        width: '90%',
        borderRadius: 14,
        marginTop: 10

    },
    touch: {
        height: '70%',
        width: '100%',
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        marginVertical: 4,
    },
    text: {
        fontWeight: 'bold',
        fontSize: 15,
        color: Colors.black,
    },
})
