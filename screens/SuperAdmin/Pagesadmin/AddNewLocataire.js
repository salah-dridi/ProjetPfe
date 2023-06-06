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
    FlatList,
    RefreshControl
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import OffreService from '../../../services/offreService';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from 'react-native-paper';
import Colors from '../../../constants/Colors';
import { municipalite } from '../../../infomationsmunicipalite';
import PhoneInput from 'react-native-phone-number-input';
import Icon, { Icons } from '../../../constants/Icons';
import moment from 'moment';
import 'moment/locale/ar';
import LocataireService from '../../../services/locataireService';
const { width, height } = Dimensions.get("window")
const emailValidator = require('email-validator');
const AddNewLocataire = ({ navigation }) => {
    const [selectedDate, setSelectedDate] = useState(moment(new Date()).toDate());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate2, setSelectedDate2] = useState(moment(new Date()).toDate());
    const [showDatePicker2, setShowDatePicker2] = useState(false);
    const [modalVisibility1, setModalVisibility1] = useState(false);
    const [viewvisible, setviewvisible] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [offres, setOffres] = useState([])
    const handleItemPress = (item) => {
        setSelectedItem(item);
    };

    const changerview = () => {
        setSelectedItem(null)
        setviewvisible(true)
    }
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
    useEffect(() => {
        GetOffresNonLouer();
    }, []);
    const GetOffresNonLouer = () => {
        return new Promise((resolve, reject) => {
            offreService.GetOffresNonLouer()
                .then((res) => {
                    setOffres(res.data);
                    resolve(); // Résoudre la promesse
                })
                .catch((err) => {

                });
        });
    };
  

    const [data, setData] = React.useState({
        prenom_locataire: '',
        Change_prenom_locataire: false,
        isValidPrenom: false,
        nom_locataire: '',
        Change_nom_locataire: false,
        isValidNom: false,
        email_locataire: '',
        Change_email_locataire: false,
        isValidEmail: false,
        password_locataire: '',
        Change_password_locataire: false,
        isValidPassword: false,
        telephone_locataire: '',
        Change_telephone_locataire: false,
        isValidTelephone: false,
        adresse_locataire: '',
        Change_adresse_locataire: false,
        isValidAdresse: false,
        cin_locataire: '',
        Change_cin_locataire: false,
        isValidCin: false,
    });
    const [data1, setData1] = React.useState({
        id_offre: '',
        nom_offre: '',
        Change_nom_offre: false,
        isValidNomoffre: false,
        prix_debut: '',
        Change_prix_debut: false,
        isValidPrix_debut: false,
        date_debut_appel: selectedDate,
        date_fin_appel: selectedDate2,
        id_locataire: '',
    });
    const lienimage = '../../../images/'
    const locataireService = new LocataireService()
    const offreService = new OffreService()
    const { colors } = useTheme();
    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }
    
  

    const handleValidPrenom = (val) => {
        if (val.trim().length >= 1) {
            setData({
                ...data,
                isValidPrenom: true
            });
        } else {
            setData({
                ...data,
                isValidPrenom: false
            });
        }
    }
    const handleValidNom = (val) => {
        if (val.trim().length >= 1) {
            setData({
                ...data,
                isValidNom: true
            });
        } else {
            setData({
                ...data,
                isValidNom: false
            });
        }
    }
    const handleValidEmail = (val) => {
        const isValid = emailValidator.validate(val);
        if (isValid) {
            setData({
                ...data,
                isValidEmail: true
            });
        } else {
            setData({
                ...data,
                isValidEmail: false
            });
        }
    };

    const handleValidAdresse = (val) => {
        if (val.trim().length >= 1) {
            setData({
                ...data,
                isValidAdresse: true
            });
        } else {
            setData({
                ...data,
                isValidAdresse: false
            });
        }
    };

    const handleValidCin = (val) => {
        if (val.trim().length === 8) {
            setData({
                ...data,
                isValidCin: true
            });
        } else {
            setData({
                ...data,
                isValidCin: false
            });
        }
    };

    const PrenomChange = (val) => {
        if (val.trim().length >= 1) {
            setData({
                ...data,
                prenom_locataire: val,
                Change_prenom_locataire: true,
                isValidPrenom: true,
            });
        } else {
            setData({
                ...data,
                prenom_locataire: val,
                Change_prenom_locataire: false,
                isValidPrenom: false,
            });
        }
    };

    const NomChange = (val) => {
        if (val.trim().length >= 1) {
            setData({
                ...data,
                nom_locataire: val,
                Change_nom_locataire: true,
                isValidNom: true,
            });
        } else {
            setData({
                ...data,
                nom_locataire: val,
                Change_nom_locataire: false,
                isValidNom: false,
            });
        }
    };

    const EmailChange = (val) => {
        const isValid = emailValidator.validate(val);
        if (isValid) {
            setData({
                ...data,
                email_locataire: val,
                Change_email_locataire: true,
                isValidEmail: true,
            });
        } else {
            setData({
                ...data,
                email_locataire: val,
                Change_email_locataire: false,
                isValidEmail: false,
            });
        }
    };

    const PasswordChange = (val) => {
        if (val.trim().length >= 8) {
            setData({
                ...data,
                password_locataire: val,
                isValidPassword: true,
            });
        } else {
            setData({
                ...data,
                password_locataire: val,
                isValidPassword: false,
            });
        }
    };



    const TelephoneChange = (val) => {
        if (val.trim().length >= 1) {
            setData({
                ...data,
                telephone_locataire: val,
                Change_telephone_locataire: true,
                isValidTelephone: true,
            });
        } else {
            setData({
                ...data,
                telephone_locataire: val,
                Change_telephone_locataire: false,
                isValidTelephone: false,
            });
        }
    };

    const AdresseChange = (val) => {
        if (val.trim().length >= 1) {
            setData({
                ...data,
                adresse_locataire: val,
                Change_adresse_locataire: true,
                isValidAdresse: true,
            });
        } else {
            setData({
                ...data,
                adresse_locataire: val,
                Change_adresse_locataire: false,
                isValidAdresse: false,
            });
        }
    };


    const CinChange = (val) => {
        if (val.trim().length === 8) {
            setData({
                ...data,
                cin_locataire: val,
                Change_cin_locataire: true,
                isValidCin: true,
            });
        } else {
            setData({
                ...data,
                cin_locataire: val,
                Change_cin_locataire: false,
                isValidCin: false,
            });
        }
    }
    const AjouterLocataire = async (valeur) => {

        try {
            const response = await locataireService.AddNewLocataire(valeur)
            const data3 = {
                "nom_offre": data1.nom_offre,
                "prix_offre": data1.prix_debut,
                "date_debut_offre": data1.date_debut_appel,
                "date_fin_offre": data1.date_fin_appel,
                "id_locataire": response.data.id_locataire
            }
           
            const response2 = await offreService.UpdateOffreById(selectedItem.id_offre, data3)
            Alert.alert('جيد ', 'لقد تم اضافة هذا المستاجر بنجاح', [
                {
                    text: 'خروج',
                    onPress: () => navigation.goBack()
                }
            ]);
        } catch (err) {
            Alert.alert('لم نتمكن من اضافة هذا المستاجر', 'الرجاء اعادة المحاولة', [
                { text: 'حسنا' }
            ]);
        }
    }
    const Confirmer = () => {
        if (data1.isValidNomoffre && data.isValidPrenom && data.isValidNom && data.isValidEmail && data.isValidPassword && data.isValidCin && data.isValidTelephone) {

            const data4 = {
                "nom_locataire": data.nom_locataire,
                "prenom_locataire": data.prenom_locataire,
                "email_locataire": data.email_locataire,
                "password_locataire": data.password_locataire,
                "telephone_locataire": data.telephone_locataire,
                "cin_locataire": data.cin_locataire,
                "adresse_locataire": data.adresse_locataire
            }

            Alert.alert(
                "تاكيد ",
                "هل انت متاكد من اضافة هذا المستاجر ؟",
                [
                    {
                        text: "لا",
                        style: "cancel"
                    },
                    { text: "نعم", onPress: () => AjouterLocataire(data4) }
                ]
            );
            // const liste = ["salah.dridi@fsb.ucar.tn", "nousrkawana029@gmail.com", "salahdridi993@gmail.com",]
            // if (liste.includes(data.email_locataire)) {
            //     Alert.alert(
            //         "تاكيد ",
            //         "هل انت متاكد من اضافة هذا المستاجر ؟",
            //         [
            //             {
            //                 text: "لا",
            //                 style: "cancel"
            //             },
            //             { text: "نعم", onPress: () => AjouterLocataire(data4) }
            //         ]
            //     );
            // }
            // else {
            //     Alert.alert('بيانات خاطئة', 'البريد الالكتروني غير متاح', [
            //         { text: 'حسنا' }
            //     ]);
            // }
        }
        else {
            Alert.alert('بيانات غير مكتملة', 'الرجاء ملا جميع الفراغات', [
                { text: 'حسنا' }
            ]);
        }
    }
    const Confirmer2 = () => {
        if (selectedItem === null) {
            Alert.alert('لا يوجد عرض', ' الرجاء اختيار عرض', [
                { text: 'حسنا' }
            ]);

        }
        else {
            Alert.alert(
                "تاكيد ",
                "هل انت متاكد من اختيار هذا العرض ؟",
                [
                    {
                        text: "لا",
                        style: "cancel"
                    },
                    { text: "نعم", onPress: () => changeroffre() }
                ]
            );
        }
    }
    const changeroffre = () => {
        setData1({
            ...data1,
            nom_offre: selectedItem.nom_offre,
            date_debut_appel: new Date(selectedItem.date_debut_offre),
            date_fin_appel: new Date(selectedItem.date_fin_offre),
            id_offre: selectedItem.id_offre,
            prix_debut: selectedItem.prix_offre,
            isValidNomoffre: true
        });
    
        setviewvisible(true)
    }
    const onRefresh = () => {
        setIsRefreshing(true);
        GetOffresNonLouer()
            .then(() => setIsRefreshing(false))
            .catch((err) => console.log(err)); // Gérer les erreurs éventuelles
    };
    if (viewvisible === true) {
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
                    <Text style={styles.text_header}>إضافة مستاجر جديد</Text>

                </View>
                <Animatable.View
                    animation="fadeInUpBig"
                    style={[styles.footer, {
                        backgroundColor: colors.background
                    }]}
                >
                    <View>
                        <ScrollView style={{ margin: 10 }} >
                            <Text style={[styles.text_footer, {
                                color: colors.text
                            }]}>اللقب</Text>
                            <View style={styles.action}>
                                <TextInput
                                    placeholder="اضافة لقب"
                                    placeholderTextColor="#666666"
                                    style={[styles.textInput, {
                                        color: colors.text
                                    }]}
                                    autoCapitalize="none"
                                    onChangeText={(val) => NomChange(val)}
                                    onEndEditing={(e) => handleValidNom(e.nativeEvent.text)}
                                />
                                {data.Change_nom_locataire ?
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
                            {data.isValidNom ? null :
                                <Animatable.View animation="fadeInLeft" duration={500}>
                                    <Text style={styles.errorMsg}>لا يوجد لقب</Text>
                                </Animatable.View>
                            }
                            <Text style={[styles.text_footer, {
                                color: colors.text
                            }]}>الاسم</Text>
                            <View style={styles.action}>
                                <TextInput
                                    placeholder="اضافة اسم"
                                    placeholderTextColor="#666666"
                                    style={[styles.textInput, {
                                        color: colors.text
                                    }]}
                                    autoCapitalize="none"
                                    onChangeText={(val) => PrenomChange(val)}
                                    onEndEditing={(e) => handleValidPrenom(e.nativeEvent.text)}
                                />
                                {data.Change_prenom_locataire ?
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
                            {data.isValidPrenom ? null :
                                <Animatable.View animation="fadeInLeft" duration={500}>
                                    <Text style={styles.errorMsg}>لا يوجد اسم</Text>
                                </Animatable.View>
                            }
                            <Text style={[styles.text_footer, {
                                color: colors.text
                            }]}>البريد الالكتروني</Text>
                            <View style={styles.action}>
                                <TextInput
                                    placeholder="اضافة بريد الكتروني"
                                    placeholderTextColor="#666666"
                                    style={[styles.textInput, {
                                        color: colors.text
                                    }]}
                                    autoCapitalize="none"
                                    onChangeText={(val) => EmailChange(val)}
                                    onEndEditing={(e) => handleValidEmail(e.nativeEvent.text)}
                                />
                                {data.Change_email_locataire ?
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
                            {data.isValidEmail ? null :
                                <Animatable.View animation="fadeInLeft" duration={500}>
                                    <Text style={styles.errorMsg}>بريد الكتروني غير صحيح</Text>
                                </Animatable.View>
                            }
                            <Text style={[styles.text_footer, {
                                color: colors.text
                            }]}>كلمة السر</Text>
                            <View style={styles.action}>
                                <TouchableOpacity
                                    onPress={updateSecureTextEntry}
                                >
                                    {data.secureTextEntry ?
                                        <Feather
                                            name="eye-off"
                                            color="grey"
                                            size={20}
                                        />
                                        :
                                        <Feather
                                            name="eye"
                                            color="grey"
                                            size={20}
                                        />
                                    }
                                </TouchableOpacity>
                                <TextInput
                                    placeholder="اضافة كلمة السر"
                                    placeholderTextColor="#666666"
                                    secureTextEntry={data.secureTextEntry ? true : false}
                                    style={[styles.textInput, {
                                        color: colors.text
                                    }]}
                                    autoCapitalize="none"
                                    onChangeText={(val) => PasswordChange(val)}
                                />
                                {data.Change_password_locataire ?
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
                            {data.isValidPassword ? null :
                                <Animatable.View animation="fadeInLeft" duration={500}>
                                    <Text style={styles.errorMsg}>كلمة سر غير مناسبة</Text>
                                </Animatable.View>
                            }
                            <Text style={[styles.text_footer, {
                                color: colors.text
                            }]}>رقم بطاقة التعريف</Text>
                            <View style={styles.action}>
                                <TextInput
                                    placeholder="اضافة رقم"
                                    placeholderTextColor="#666666"
                                    style={[styles.textInput, {
                                        color: colors.text
                                    }]}
                                    autoCapitalize="none"
                                    onChangeText={(val) => CinChange(val)}
                                    onEndEditing={(e) => handleValidCin(e.nativeEvent.text)}
                                />
                                {data.Change_cin_locataire ?
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
                            {data.isValidCin ? null :
                                <Animatable.View animation="fadeInLeft" duration={500}>
                                    <Text style={styles.errorMsg}>رقم بطاقة التعريف غير مناسب</Text>
                                </Animatable.View>
                            }
                            <Text style={[styles.text_footer, {
                                color: colors.text
                            }]}>الهاتف</Text>
                            <PhoneInput
                                defaultValue={data.telephone_locataire}
                                defaultCode='TN'
                                placeholder="اضافة رقم الهاتف"
                                onChangeText={(val) => {
                                    TelephoneChange(val)
                                }}

                            />
                            {data.isValidTelephone ? null :
                                <Animatable.View animation="fadeInLeft" duration={500}>
                                    <Text style={styles.errorMsg}>رقم الهاتف غير صحيح</Text>
                                </Animatable.View>
                            }
                            <Text style={[styles.text_footer, {
                                color: colors.text
                            }]}>العنوان</Text>
                            <View style={styles.action}>
                                <TextInput
                                    placeholder="اضافة عنوان"
                                    placeholderTextColor="#666666"
                                    style={[styles.textInput, {
                                        color: colors.text
                                    }]}
                                    autoCapitalize="none"
                                    onChangeText={(val) => AdresseChange(val)}
                                    onEndEditing={(e) => handleValidAdresse(e.nativeEvent.text)}
                                />
                                {data.Change_adresse_locataire ?
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
                            {data.isValidAdresse ? null :
                                <Animatable.View animation="fadeInLeft" duration={500}>
                                    <Text style={styles.errorMsg}>لا يوجد عنوان</Text>
                                </Animatable.View>
                            }
                            {data1.isValidNomoffre ? null :
                                <Animatable.View animation="fadeInLeft" duration={500}>
                                    <Text style={styles.errorMsg}>لا يوجد فصل</Text>
                                </Animatable.View>
                            }
                            {!data1.isValidNomoffre ? null :
                                <View>
                                    <Text style={[styles.text_footer, {
                                        color: Colors.pink
                                    }]}>الفصل :</Text>
                                    <Text style={[styles.text_footer, {
                                        color: colors.text
                                    }]}>{data1.nom_offre}</Text>
                                    <Text style={[styles.text_footer, {
                                        color: Colors.pink
                                    }]}>السعر :</Text>
                                    <Text style={[styles.text_footer, {
                                        color: colors.text,
                                        textAlign: 'right'
                                    }]}>{data1.prix_debut}</Text>
                                    <Text style={[styles.text_footer, {
                                        color: Colors.pink
                                    }]}>مدة التسويغ :</Text>
                                    <Text style={[styles.text_footer, {
                                        color: colors.text
                                    }]}>من :</Text>
                                    <Text style={[styles.text_footer, {
                                        color: colors.text
                                    }]}>{formatDate(data1.date_debut_appel)}</Text>
                                    <Text style={[styles.text_footer, {
                                        color: colors.text
                                    }]}>الى :</Text>
                                    <Text style={[styles.text_footer, {
                                        color: colors.text
                                    }]}>{formatDate(data1.date_fin_appel)}</Text>
                                </View>
                            }
                            <View style={{ flexDirection: 'row', margin: 10 }}>
                                <TouchableOpacity style={styles.button3} onPress={() => setviewvisible(false)}>
                                    <Text style={styles.buttonText}>اختيار عرض مسجل</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button4} onPress={() => navigation.navigate('AddNewOffre')}>
                                    <Text style={styles.buttonText}>اضافة عرض جديد</Text>
                                </TouchableOpacity>
                            </View>


                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity style={styles.button2} onPress={() => navigation.goBack()}>
                                    <Text style={styles.buttonText}>خروج</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={() => Confirmer()}>
                                    <Text style={styles.buttonText}>تاكيد</Text>
                                </TouchableOpacity>
                            </View>


                        </ScrollView>
                    </View>


                </Animatable.View>

            </View>
        );
    } else {
        return (

            <View style={{ flex: 1 }}>
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

                <View style={styles2.header}>
                    <Text style={styles.text_header}>إختيار طلبات عروض</Text>

                </View>

                <View style={styles2.container}>
                    <FlatList
                        data={offres}
                        refreshControl={
                            <RefreshControl
                                refreshing={isRefreshing}
                                onRefresh={onRefresh}
                                colors={[Colors.primary]}
                            />
                        }
                        renderItem={({ item }) => (
                            <View style={styles2.item}>
                                <View style={{
                                    marginLeft: 10,
                                    marginRight: 10,
                                    marginTop: 8,
                                    alignItems: "center",
                                }}>
                                    <TouchableOpacity
                                        style={[
                                            styles2.button,
                                        ]}
                                        onPress={() => handleItemPress(item)}
                                    >

                                        <Icon type={Icons.AntDesign} name="checkcircle" size={30} color={selectedItem === item ? 'green' : Colors.white} style={{ padding: 10 }} />
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles2.text}>{item.nom_offre}</Text>
                            </View>
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
                <View style={{ flexDirection: 'row', backgroundColor: 'white' }}>
                    <TouchableOpacity style={styles.button2} onPress={() => changerview()}>
                        <Text style={styles.buttonText}>خروج</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => Confirmer2()}>
                        <Text style={styles.buttonText}>تاكيد</Text>
                    </TouchableOpacity>
                </View>
            </View>

        )

    }
};

export default AddNewLocataire;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary
    },

    header: {
        justifyContent: 'flex-end',
        paddingHorizontal: 10,
        paddingBottom: 10,

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
        margin: 10,

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
const styles2 = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white,
    },
    header: {
        justifyContent: 'flex-end',
        paddingHorizontal: 10,
        paddingBottom: 10,
        backgroundColor: Colors.primary
    },
    item: {
        width: width * 0.8,
        height: height * 0.4,
        backgroundColor: Colors.primary,
        margin: 20,
        borderRadius: 40
    },
    button: {
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        alignSelf: "flex-end",
    },
    selectedButton: {
        backgroundColor: 'green', // Change la couleur du bouton en vert pour l'élément sélectionné
    },
    buttonText: {
        marginRight: 10,
        color: Colors.black,
        fontSize: 20
    },
    selectedButtonText: {
        color: 'green', // Change la couleur du texte en vert pour l'élément sélectionné
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        margin: 10
    },
});

/* <Modal visible={modalVisibility1} animationType="fade" style={{ flex: 1, backgroundColor: Colors.primary }}>
             
                    <View style={{ flex: 1 }}>
                       
                        <Button title="Close" onPress={() =>setModalVisibility1(false)} />
                    </View>
           
            </Modal> 
            
            
            <Modal visible={modalVisibility1} animationType="fade" style={{ flex: 1 }}>

              

            </Modal>
            
            
            
            
            
             
            
            */