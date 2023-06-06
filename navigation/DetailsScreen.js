import React, { useEffect } from 'react'
import { Dimensions, Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SharedElement } from 'react-navigation-shared-element'
import Colors from '../constants/Colors';

const { width, height } = Dimensions.get('window');

export default function DetailsScreen({ navigation, }) {


    useEffect(() => {
       
    }, [])
  
    return (
        <View style={[styles.container, { backgroundColor: Colors.primary }]}>

            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('DetailsScreen')}>
                        <Text style={styles.buttonText}>خروج</Text>
                    </TouchableOpacity>

                </View>
                <SharedElement style={styles.imageContainer}>
                    <Image source={require('../images/salah.jpg')} style={styles.image} resizeMode='center' />
                </SharedElement>
                <View style={{ margin: 20 }}>
                    <Text style={styles.bigText}>صالح الدريدي</Text>
                </View>

                <ScrollView style={{ backgroundColor: 'white', borderTopRightRadius: 30, borderTopLeftRadius: 30, padding: 10 }} >
                    <View style={styles.descriptionContainer}>
                        <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Email</Text>
                        <Text>salahdridi993@gmail.com</Text>
                    </View>
                    <View style={styles.descriptionContainer}>
                        <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Role</Text>
                        <Text>Locataire</Text>
                    </View>

                    <View style={styles.descriptionContainer}>
                        <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Telephone</Text>
                        <Text>54296740</Text>
                    </View>
                    <View style={styles.descriptionContainer}>
                        <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Adresse</Text>
                        <Text>Bizerte</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <TouchableOpacity style={[styles.btn, { backgroundColor: 'green' }]}>
                            <Text style={styles.btnText}>Update</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.btn, { backgroundColor: 'red' }]}>
                            <Text style={styles.btnText}>Delete</Text>
                        </TouchableOpacity>

                    </View>

                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topContainer: {
        height: height / 3,
        padding: 16,
        justifyContent: 'space-between',
        width: width * 0.3
    },
    bottomContainer: {
        padding: 16,
        flex: 1,
        backgroundColor: Colors.white,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        paddingTop: 80,
    },
    bigText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: Colors.white,
    },
    smallText: {
        color: Colors.white,
    },
    image: {
        width: width / 2,
        height: width / 2,
        margin: 10,
        borderRadius: 80
    },
    imageContainer: {
        position: 'absolute',
        zIndex: 999,
        top: 60,
        alignSelf: 'flex-end',
    },
    colorBtn: {
        height: 16,
        width: 16,
        borderRadius: 6,
    },
    outerCircle: {
        height: 24,
        width: 24,
        borderRadius: 6,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
    },
    variants: {
        flexDirection: 'row',
        marginVertical: 20,
        justifyContent: 'space-between',
    },
    descriptionContainer: {
        marginVertical: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    quantity: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    qtBtn: {
        borderWidth: 1,
        borderColor: Colors.darkGray,
        borderRadius: 8,
        width: 34,
        height: 34,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 10,
    },
    favoriteBtn: {
        borderRadius: 17,
        width: 34,
        height: 34,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cartBtm: {
        borderRadius: 10,
        width: 50,
        height: 45,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    button2: {
        backgroundColor: Colors.red,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    btn: {
        flex: 1,
        height: 45,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },
    btnText: {
        fontWeight: 'bold',
        fontSize: 18,
        color: Colors.white,
    },
})
