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
import AgentService from '../../../services/agentService';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from 'react-native-paper';
import Colors from '../../../constants/Colors';
import { municipalite } from '../../../infomationsmunicipalite';
import PhoneInput from 'react-native-phone-number-input';
import { Picker } from '@react-native-picker/picker';
import Spacing from '../../../constants/Spacing';
const { width, height } = Dimensions.get("window")
const emailValidator = require('email-validator');
const AddNewAgent = ({ navigation }) => {
    const [data, setData] = React.useState({
        prenom_municipalite: '',
        Change_prenom_municipalite: false,
        isValidPrenom: false,
        nom_municipalite: '',
        Change_nom_municipalite: false,
        isValidNom: false,
        email_municipalite: '',
        Change_email_municipalite: false,
        isValidEmail: false,
        password_municipalite: '',
        Change_password_municipalite: false,
        isValidPassword: false,
        fonction_municipalite: '',
        Change_fonction_municipalite: false,
        isValidFonction: false,
        privilege_municipalite: '4',
        telephone_municipalite: '',
        Change_telephone_municipalite: false,
        isValidTelephone: false,
        adresse_municipalite: '',
        Change_adresse_municipalite: false,
        isValidAdresse: false,
        matricule_municipalite: '',
        Change_matricule_municipalite: false,
        isValidMatricule: false,
        secureTextEntry: true,
    });
    const lienimage = '../../../images/'
    const agentService = new AgentService()
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


    const handleValidFonction = (val) => {
        if (val.trim().length >= 1) {
            setData({
                ...data,
                isValidFonction: true
            });
        } else {
            setData({
                ...data,
                isValidFonction: false
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

    const handleValidMatricule = (val) => {
        if (val.trim().length >= 1) {
            setData({
                ...data,
                isValidMatricule: true
            });
        } else {
            setData({
                ...data,
                isValidMatricule: false
            });
        }
    };

    const PrenomChange = (val) => {
        if (val.trim().length >= 1) {
            setData({
                ...data,
                prenom_municipalite: val,
                Change_prenom_municipalite: true,
                isValidPrenom: true,
            });
        } else {
            setData({
                ...data,
                prenom_municipalite: val,
                Change_prenom_municipalite: false,
                isValidPrenom: false,
            });
        }
    };

    const NomChange = (val) => {
        if (val.trim().length >= 1) {
            setData({
                ...data,
                nom_municipalite: val,
                Change_nom_municipalite: true,
                isValidNom: true,
            });
        } else {
            setData({
                ...data,
                nom_municipalite: val,
                Change_nom_municipalite: false,
                isValidNom: false,
            });
        }
    };

    const EmailChange = (val) => {
        const isValid = emailValidator.validate(val);
        if (isValid) {
            setData({
                ...data,
                email_municipalite: val,
                Change_email_municipalite: true,
                isValidEmail: true,
            });
        } else {
            setData({
                ...data,
                email_municipalite: val,
                Change_email_municipalite: false,
                isValidEmail: false,
            });
        }
    };

    const PasswordChange = (val) => {
        if (val.trim().length >= 8) {
            setData({
                ...data,
                password_municipalite: val,
                isValidPassword: true,
            });
        } else {
            setData({
                ...data,
                password_municipalite: val,
                isValidPassword: false,
            });
        }
    };

    const FonctionChange = (val) => {
        if (val.trim().length >= 1) {
            setData({
                ...data,
                fonction_municipalite: val,
                Change_fonction_municipalite: true,
                isValidFonction: true,
            });
        } else {
            setData({
                ...data,
                fonction_municipalite: val,
                Change_fonction_municipalite: false,
                isValidFonction: false,
            });
        }
    };

    const TelephoneChange = (val) => {
        if (val.trim().length >= 1) {
            setData({
                ...data,
                telephone_municipalite: val,
                Change_telephone_municipalite: true,
                isValidTelephone: true,
            });
        } else {
            setData({
                ...data,
                telephone_municipalite: val,
                Change_telephone_municipalite: false,
                isValidTelephone: false,
            });
        }
    };

    const AdresseChange = (val) => {
        if (val.trim().length >= 1) {
            setData({
                ...data,
                adresse_municipalite: val,
                Change_adresse_municipalite: true,
                isValidAdresse: true,
            });
        } else {
            setData({
                ...data,
                adresse_municipalite: val,
                Change_adresse_municipalite: false,
                isValidAdresse: false,
            });
        }
    };
    const PrivilegeChange = (val) => {
        if (val.trim().length >= 1) {
            setData({
                ...data,
                privilege_municipalite: val,
            });
        } else {
            setData({
                ...data,
                privilege_municipalite: val,
            });
        }
    };

    const MatriculeChange = (val) => {
        if (val.trim().length >= 1) {
            setData({
                ...data,
                matricule_municipalite: val,
                Change_matricule_municipalite: true,
                isValidMatricule: true,
            });
        } else {
            setData({
                ...data,
                matricule_municipalite: val,
                Change_matricule_municipalite: false,
                isValidMatricule: false,
            });
        }
    }
    const AddNewAgent = async (valeur) => {
        try {
            const response = await agentService.AddNewAgent(valeur)
            Alert.alert('جيد ', 'لقد تم اضافة هذا العون بنجاح', [
                {
                    text: 'خروج',
                    onPress: () => navigation.goBack()
                }
            ]);
        } catch (err) {
            Alert.alert('لم نتمكن من اضافة هذا العون', 'الرجاء اعادة المحاولة', [
                { text: 'حسنا' }
            ]);
        }
    }
    const Confirmer = () => {
        if (data.isValidPrenom && data.isValidNom && data.isValidEmail && data.isValidPassword && data.isValidAdresse && data.isValidMatricule && data.isValidTelephone && data.isValidFonction) {

            const data1 = {
                "nom_municipalite": data.nom_municipalite,
                "prenom_municipalite": data.prenom_municipalite,
                "email_municipalite": data.email_municipalite,
                "password_municipalite": data.password_municipalite,
                "telephone_municipalite": data.telephone_municipalite,
                "fonction_municipalite": data.fonction_municipalite,
                "privilege_municipalite": data.privilege_municipalite,
                "matricule_municipalite": data.matricule_municipalite,
                "adresse_municipalite": data.adresse_municipalite
            }
            const liste = ["salah.dridi@fsb.ucar.tn", "nousrkawana029@gmail.com", "salahdridi993@gmail.com", "jeljliamin28@gmail.com"]
            if (liste.includes(data.email_municipalite)) {
                Alert.alert(
                    "تاكيد ",
                    "هل انت متاكد من اضافة هذا العون ؟",
                    [
                        {
                            text: "لا",
                            style: "cancel"
                        },
                        { text: "نعم", onPress: () => AddNewAgent(data1) }
                    ]
                );
            }
            else {
                Alert.alert('بيانات خاطئة', 'البريد الالكتروني غير متاح', [
                    { text: 'حسنا' }
                ]);
            }
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
                <Text style={styles.text_header}>إضافة عون جديد</Text>

            </View>
            <Animatable.View
                animation="fadeInUpBig"
                style={[styles.footer, {
                    backgroundColor: colors.background
                }]}
            >
                <ScrollView style={{ margin: 10 }}>
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
                        {data.Change_nom_municipalite ?
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
                        {data.Change_prenom_municipalite ?
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
                        {data.Change_email_municipalite ?
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
                        {data.Change_password_municipalite ?
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
                    }]}>السلسلة</Text>
                    <View style={styles.action}>
                        <TextInput
                            placeholder="اضافة سلسلة"
                            placeholderTextColor="#666666"
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                            autoCapitalize="none"
                            onChangeText={(val) => MatriculeChange(val)}
                            onEndEditing={(e) => handleValidMatricule(e.nativeEvent.text)}
                        />
                        {data.Change_matricule_municipalite ?
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
                    {data.isValidMatricule ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>لا توجد سلسلة</Text>
                        </Animatable.View>
                    }
                    <Text style={[styles.text_footer, {
                        color: colors.text
                    }]}>الهاتف</Text>
                    <PhoneInput
                        defaultValue={data.telephone_municipalite}
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
                    }]}>الصفة</Text>
                    <View style={styles.action}>
                        <TextInput
                            placeholder="اضافة صفة"
                            placeholderTextColor="#666666"
                            style={[styles.textInput, {
                                color: colors.text
                            }]}
                            autoCapitalize="none"
                            onChangeText={(val) => FonctionChange(val)}
                            onEndEditing={(e) => handleValidFonction(e.nativeEvent.text)}
                        />
                        {data.Change_fonction_municipalite ?
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
                    {data.isValidFonction ? null :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>لا توجد صفة</Text>
                        </Animatable.View>
                    }
                    <Text style={[styles.text_footer, {
                        color: colors.text
                    }]}>الرتبة</Text>
                    <View style={[styles.action, { justifyContent: 'flex-end' }]}>

                        <Picker
                            style={{
                                padding: 20,
                                flex: 1
                            }}
                            selectedValue={data.privilege_municipalite}
                            onValueChange={(itemValue) =>
                                PrivilegeChange(itemValue)
                            }>
                            <Picker.Item label="4" value="4" />
                            <Picker.Item label="3" value="3" />
                            <Picker.Item label="2" value="2" />
                            <Picker.Item label="1" value="1" />

                        </Picker>

                    </View>

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
                        {data.Change_adresse_municipalite ?
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
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.button2} onPress={() => navigation.goBack()}>
                            <Text style={styles.buttonText}>خروج</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => Confirmer()}>
                            <Text style={styles.buttonText}>تاكيد</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Animatable.View>
        </View>
    );
};

export default AddNewAgent;

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
