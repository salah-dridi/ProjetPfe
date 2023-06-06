import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Platform,
    StyleSheet,
    StatusBar,
    Alert,
    ScrollView,
    Dimensions,
    Image,
    Button
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from 'react-native-paper';
import Colors from '../../../constants/Colors';
import { municipalite } from '../../../infomationsmunicipalite';
import PhoneInput from 'react-native-phone-number-input';
import { Picker } from '@react-native-picker/picker';
import Spacing from '../../../constants/Spacing';
const { width, height } = Dimensions.get("window")
import { useNavigation } from '@react-navigation/native';
import LocataireService from '../../../services/locataireService';
const DetailsLocataire = ({ route }) => {
    const { id_locataire } = route.params;
    const lienimage = '../../../images/'
    const locataireService = new LocataireService()
    const { colors } = useTheme();
    const navigation = useNavigation();
    const [email, setEmail] = useState();
    const [nom, setNom] = useState();
    const [prenom, setPrenom] = useState();
    const [telephone, setTelephone] = useState();
    const [adresse, setAdresse] = useState();

    useEffect(() => {
        GetLocataireById(id_locataire)
    }, []);
    const GetLocataireById = async (id) => {
        try {
            const response = await locataireService.GetLocataireById(id)
            setEmail(response.data[0].email_locataire)
            setNom(response.data[0].nom_locataire)
            setPrenom(response.data[0].prenom_locataire)
            setTelephone(response.data[0].telephone_locataire)
            setAdresse(response.data[0].adresse_locataire)
        } catch (err) {
            console.log("erreur")
        }
    }
    const DeleteLocataireById = async (id) => {
        try {
            const response = await locataireService.DeleteLocataireById(id)
            navigation.goBack()
        } catch (err) {
            console.log("erreur")
        }
    }
    return (
        <View style={styles.container}>
            <View style={{ height: height * 0.2 }}>
                <Image source={require(lienimage + 'salah.jpg')} style={{ width: '100%', height: '120%' }} />
                <TouchableOpacity style={styles.button2} onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonText}>خروج</Text>
                </TouchableOpacity>

            </View>
            <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />

            <Animatable.View
                animation="fadeInUpBig"
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}
            >
                <ScrollView style={{ margin: 10 }}>
                    <Text>{nom}</Text>
                    <Text>{prenom}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.button3} onPress={() => DeleteLocataireById(id_locataire)}>
                            <Text style={styles.buttonText}>حذف</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>تعديل</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Animatable.View>
        </View>
    );
};
export default DetailsLocataire

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary
    },
    header: {
        justifyContent: 'flex-end',
        paddingHorizontal: 10,
        paddingBottom: 10
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    //'white'
    //Colors.couleur1
    text_header: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 25,
        margin: 10
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18,
        marginTop: 10
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        backgroundColor: Colors.green,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
        margin: 10,
        flex: 1
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    button2: {
        backgroundColor: Colors.red,
        width: 60,
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginLeft: 10,
        position: 'absolute'
    },
    button3: {
        backgroundColor: 'red',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    buttonText2: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
});
const styles2 = StyleSheet.create({
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
