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
    Dimensions,
    Image,
    FlatList
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import OffreService from '../../../services/offreService';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from 'react-native-paper';
import Colors from '../../../constants/Colors';
import { municipalite } from '../../../infomationsmunicipalite';

import Icon, { Icons } from '../../../constants/Icons';
import moment from 'moment';
import 'moment/locale/ar';

const { width, height } = Dimensions.get("window")

const AddNewOffre = ({ navigation }) => {
    const [selectedDate, setSelectedDate] = useState(moment(new Date()).toDate());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate2, setSelectedDate2] = useState(moment(new Date()).toDate());
    const [showDatePicker2, setShowDatePicker2] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const handleItemPress = (item) => {
        setSelectedItem(item);
    };
    const marques = [
        "parking",
        "plage"
    ]
    const formatDate = (date) => {
        const monthNames = [
            'جانفي',
            'فيفري',
            'مارس',
            'أفريل',
            'ماي',
            'جوان',
            'جويلية',
            'أوت',
            'سبتمبر',
            'أكتوبر',
            'نوفمبر',
            'ديسمبر'
        ];

        const options = {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            timeZone: 'UTC',
            numberingSystem: 'latn'
        };

        const formatter = new Intl.DateTimeFormat('ar', options);
        const formattedParts = formatter.formatToParts(date);

        const formattedDate = formattedParts.map((part) => {
            if (part.type === 'month') {
                const monthIndex = date.getMonth();
                return monthNames[monthIndex];
            }
            return part.value;
        }).join('');

        return formattedDate;
    };

    const handleDateChange = (event, date) => {
        setShowDatePicker(false);

        if (date) {
            setSelectedDate(moment(date).toDate());
            setData1({
                ...data1,
                date_debut_appel: date
            });
        }
    };

    const showDatePickerModal = () => {
        setShowDatePicker(true);
    };
    const handleDateChange2 = (event, date) => {
        setShowDatePicker2(false);

        if (date) {
            setSelectedDate2(moment(date).toDate());
            setData1({
                ...data1,
                date_fin_appel: date
            });
        }
    };
    const showDatePickerModal2 = () => {
        setShowDatePicker2(true);
    };

    const [data1, setData1] = React.useState({
        nom_offre: '',
        Change_nom_offre: false,
        isValidNomoffre: false,
        prix_debut: '',
        Change_prix_debut: false,
        isValidPrix_debut: false,
        date_debut_appel: selectedDate,
        date_fin_appel: selectedDate2,
        id_locataire: '',
        secureTextEntry: true,
    });
    const lienimage = '../../../images/'

    const offreService = new OffreService()
    const { colors } = useTheme();

    const handleValidPrixdebut = (val) => {
        if (val.trim().length >= 1) {
            setData1({
                ...data1,
                isValidPrix_debut: true
            });
        } else {
            setData1({
                ...data1,
                isValidPrix_debut: false
            });
        }
    }
    const handleValidNomoffre = (val) => {
        if (val.trim().length >= 1) {
            setData1({
                ...data1,
                isValidNomoffre: true
            });
        } else {
            setData1({
                ...data1,
                isValidNomoffre: false
            });
        }
    }



    const PrixDebutChange = (val) => {
        if (val.trim().length >= 1) {
            setData1({
                ...data1,
                prix_debut: val,
                Change_prix_debut: true,
                isValidPrix_debut: true,
            });
        } else {
            setData1({
                ...data1,
                prix_debut: val,
                Change_prix_debut: false,
                isValidPrix_debut: false,
            });
        }
    };

    const NomoffreChange = (val) => {
        if (val.trim().length >= 1) {
            setData1({
                ...data1,
                nom_offre: val,
                Change_nom_offre: true,
                isValidNomoffre: true,
            });
        } else {
            setData1({
                ...data1,
                nom_offre: val,
                Change_nom_offre: false,
                isValidNomoffre: false,
            });
        }
    };
    const AddNewOffre = async (valeur) => {
        try {
            const response = await offreService.AddNewOffre(valeur)
            Alert.alert('جيد ', 'لقد تم اضافة هذا العرض', [
                {
                    text: 'خروج',
                    onPress: () => navigation.goBack()
                }
            ]);
        } catch (err) {
            Alert.alert('لم نتمكن من اضافة هذا العرض', 'الرجاء اعادة المحاولة', [
                { text: 'حسنا' }
            ]);
        }
    }
    const Confirmer2 = () => {
        const data3 = {
            "nom_offre": data1.nom_offre,
            "prix_offre": data1.prix_debut,
            "date_debut_offre": data1.date_debut_appel,
            "date_fin_offre": data1.date_fin_appel,
            "marque_offre" :selectedItem
        }
        if (data1.isValidNomoffre && data1.isValidPrix_debut && selectedItem !=null) {
            Alert.alert(
                "تاكيد ",
                "هل انت متاكد من اضافة هذا العرض ؟",
                [
                    {
                        text: "لا",
                        style: "cancel"
                    },
                    { text: "نعم", onPress: () => AddNewOffre(data3) }
                ]
            );
        }
        else {
            Alert.alert('بيانات غير مكتملة', 'الرجاء ملا جميع الفراغات', [
                { text: 'حسنا' }
            ]);
        }
    }
    return (
        <View style={styles.container}>
            <View style={{ height: height * 0.1, backgroundColor: Colors.primary, flexDirection: 'row', alignItems: "center" }}>
                <View style={{ width: width * 0.7, height: "100%", flexDirection: 'row', alignItems: "center", justifyContent: "space-between" }}>
                    <View style={{ width: "25%", height: "80%" }}>
                        <Image source={require(lienimage + 'logoplage.png')} style={{ width: '100%', height: '100%', borderRadius: 70 }} />
                    </View>
                    <View style={{ flex: 1, margin: 10, }}>
                        <Text style={{ fontSize: 25, color: Colors.couleur1, fontWeight: 'bold', }}>بلدية {municipalite.nom} </Text>
                    </View>
                </View>
                <View style={{ width: width * 0.3, height: "70%", alignItems: "center" }}>
                    <Image source={require(lienimage + 'drapeau-tunisie.jpg')} style={{ width: '60%', height: '100%' }} />
                </View>
            </View>
            <StatusBar backgroundColor={Colors.primary} barStyle="light-content" />
            <View style={styles.header}>
                <Text style={styles.text_header}>اضافة عرض جديد</Text>

            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}
            >

                <Text style={[styles.text_footer, {
                    color: colors.text
                }]}>الفصل</Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder="اضافة فصل"
                        placeholderTextColor="#666666"
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        onChangeText={(val) => NomoffreChange(val)}
                        onEndEditing={(e) => handleValidNomoffre(e.nativeEvent.text)}
                    />
                    {data1.Change_nom_offre ?
                        <Animatable.View
                            animation="bounceIn"
                        >
                            <Feather
                                name="check-circle"
                                color="green"
                                size={20}
                            />
                        </Animatable.View>
                        : null}
                </View>
                {data1.isValidNomoffre ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>لا يوجد فصل</Text>
                    </Animatable.View>
                }
                <Text style={[styles.text_footer, {
                    color: colors.text
                }]}>سعر العروض</Text>
                <View style={styles.action}>
                    <TextInput
                        placeholder="اضافة سعر"
                        placeholderTextColor="#666666"
                        style={[styles.textInput, {
                            color: colors.text
                        }]}
                        autoCapitalize="none"
                        onChangeText={(val) => PrixDebutChange(val)}
                        onEndEditing={(e) => handleValidPrixdebut(e.nativeEvent.text)}
                    />
                    {data1.Change_prix_debut ?
                        <Animatable.View
                            animation="bounceIn"
                        >
                            <Feather
                                name="check-circle"
                                color="green"
                                size={20}
                            />
                        </Animatable.View>
                        : null}
                </View>
                {data1.isValidPrix_debut ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>لا يوجد سعر</Text>
                    </Animatable.View>
                }

                <Text style={[styles.text_footer, {
                    color: colors.text
                }]}>مدة التسويغ</Text>
                <View >
                    <TouchableOpacity
                        style={{
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexDirection: "row",
                            alignSelf: "flex-end"
                        }}
                        onPress={() => showDatePickerModal()}
                    >
                        <Text style={{ marginRight: 10, color: Colors.primary, fontSize: 15 }}>من</Text>
                        <Icons.MaterialIcons name='date-range' size={25} color={Colors.primary} />
                    </TouchableOpacity>
                    {showDatePicker && (
                        <DateTimePicker
                            value={selectedDate}
                            mode="date"
                            display="default"
                            onChange={handleDateChange}
                            locale="ar"
                        />
                    )}
                </View>


                <Text>{selectedDate ? formatDate(selectedDate) : ''}</Text>
                <View >
                    <TouchableOpacity
                        style={{
                            alignItems: "center",
                            justifyContent: "space-between",
                            flexDirection: "row",
                            alignSelf: "flex-end"
                        }}
                        onPress={() => showDatePickerModal2()}
                    >
                        <Text style={{ marginRight: 10, color: Colors.primary, fontSize: 15 }}>الى</Text>
                        <Icons.MaterialIcons name='date-range' size={25} color={Colors.primary} />
                    </TouchableOpacity>
                    {showDatePicker2 && (
                        <DateTimePicker
                            value={selectedDate2}
                            mode="date"
                            display="default"
                            onChange={handleDateChange2}
                            locale="ar"
                        />
                    )}
                </View>
                <Text>{selectedDate2 ? formatDate(selectedDate2) : ''}</Text>
                <View >
                    <FlatList
                        data={marques}

                        renderItem={({ item }) => (
                            <View style={{ flexDirection: "row" ,margin :10}} >
                                <TouchableOpacity
                                    onPress={() => handleItemPress(item)}

                                    style={{marginRight :10}}
                                >
                                    <Icon type={Icons.AntDesign} name="checkcircle" size={25} color={selectedItem === item ? 'green' : Colors.black} />
                                </TouchableOpacity>

                                <Text style={{color :selectedItem === item ? 'green' : Colors.black}}>{item}</Text>
                            </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.button2}>
                        <Text style={styles.buttonText} onPress={() => navigation.goBack()}>خروج</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => Confirmer2()}>
                        <Text style={styles.buttonText} >تاكيد</Text>
                    </TouchableOpacity>
                </View>


            </Animatable.View>

        </View>
    );
};

export default AddNewOffre;

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
        backgroundColor: Colors.primary,
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
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    button3: {
        backgroundColor: Colors.couleur1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        marginRight: 5,
        flex: 1
    },
    button4: {
        backgroundColor: Colors.green,
        paddingHorizontal: 25,
        paddingVertical: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        flex: 1
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
/* */