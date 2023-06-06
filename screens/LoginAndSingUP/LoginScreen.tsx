import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Spacing from "../../constants/Spacing";
import FontSize from "../../constants/FontSize";
import Colors from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import AppTextInput from "../../components/AppTextInput";
import axios from 'axios';
import AgentService from "../../services/agentService";
import LocataireService from "../../services/locataireService";
import CitoyenService from "../../services/citoyenService";
import AsyncStorage from "@react-native-async-storage/async-storage";



const LoginScreen = ({ navigation }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const agentService = new AgentService()
  const locataireService = new LocataireService()
  const citoyenService = new CitoyenService()

  const onloginMunicipalite = async () => {

    const data3 = {
      "email_municipalite": email,
      "password_municipalite": password,
    }
    try {
      const response = await agentService.LoginMunicipalite(data3)
      const userid = response.data.id_municipalite
      const useremail = response.data.email_municipalite
      await AsyncStorage.setItem('userid', userid.toString());
      await AsyncStorage.setItem('useremail', useremail.toString());
      GotoMunicipalite(response.data.privilege_municipalite);
    } catch (error4) {
      console.log(error4.response.data)
      if (error4.response.status === 401) {
        if (error4.response.data === "password Authentication failed") {
          Alert.alert(
            "Erreur",
            "Mot de passe invalide",
            [{ text: "OK" }]
          );
        } else {
          Alert.alert(
            "Erreur",
            "user invalide",
            [{ text: "OK" }]
          );
        }
      } else {
        Alert.alert(
          "Erreur",
          "Une hahah erreur s'est produite. Veuillez réessayer plus tard.",
          [{ text: "OK" }]
        );
      }
    }
  };
  const onloginLocataire = async () => {
    const data2 = {
      "email_locataire": email,
      "password_locataire": password,
    }
    try {
      const response2 = await locataireService.LoginLocataire(data2)
      const userid = response2.data.id_locataire
      await AsyncStorage.setItem('userid', userid.toString());
      navigation.navigate("DrawerAdmin")
    } catch (error2) {
      if (error2.response.status === 401) {
        if (error2.response.data === "password Authentication failed") {
          Alert.alert(
            "Erreur",
            "Mot de passe invalide",
            [{ text: "OK" }]
          );
        } else {
          onloginCitoyen()
        }
      } else {
        Alert.alert(
          "Erreur",
          "Une erreur s'est produite. Veuillez réessayer plus tard.",
          [{ text: "OK" }]
        );
      }
    }
  }

  const onloginCitoyen = async () => {
    const data = {
      "email_citoyen": email,
      "password_citoyen": password,
    }
    // console.log(data)
    try {
      const response3 = await citoyenService.LoginCitoyen(data)
      const userid = response3.data.id_citoyen
      await AsyncStorage.setItem('userid', userid.toString());
      navigation.navigate("AddNewLocataire")
    } catch (error3) {
      if (error3.response.status === 401) {
        if (error3.response.data === "password Authentication failed") {
          console.log(error3.response.data)
          Alert.alert(
            "Erreur",
            "Mot de passe invalide",
            [{ text: "OK" }]
          );
        } else {
          onloginMunicipalite()
        }
      } else {
        Alert.alert(
          "Erreur",
          "Une erreur s'est produite. Veuillez réessayer plus tard.",
          [{ text: "OK" }]
        );
        console.log('salah')
      }
    }


  }

  const GotoMunicipalite = (privilege) => {
    if (privilege == 1) {
      navigation.navigate('DrawerAdmin')
    } else if (privilege == 2) {
      navigation.navigate('DrawerAgent2')
    } else if (privilege == 3) {
      navigation.navigate('DrawerAgent3')
    } else if (privilege == 4) {
      navigation.navigate('DrawerAgent4')
    }
  }

  const validateEmail = (text: string) => {
    // basic email validation
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(text)) {
      setEmailError("Invalid email");
    } else {
      setEmailError("");
    }
    setEmail(text);
  };

  const validatePassword = (text: string) => {
    // password must contain at least one number, and be at least 8 characters long
    const passwordRegex = /^(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (!passwordRegex.test(text)) {
      setPasswordError(
        "password must contain at least one number, and be at least 8 characters long"
      );
    } else {
      setPasswordError("");
    }
    setPassword(text);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View
          style={{
            marginTop: 10,
            padding: Spacing * 2,
          }}
        >
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: FontSize.xLarge,
                color: Colors.primary,

                marginVertical: Spacing * 3,
              }}
            >
              Connectez-vous
            </Text>
            <Text
              style={{

                fontSize: FontSize.large,
                maxWidth: "65%",
                textAlign: "center",
              }}
            >
              Content de vous revoir, vous avez manqué !
            </Text>
          </View>
          <View
            style={{
              marginVertical: Spacing * 3,
            }}
          >
            <AppTextInput
              placeholder="Email"
              onChangeText={validateEmail}
              error={emailError}
            />
            <AppTextInput
              placeholder="Password"
              onChangeText={validatePassword}
              error={passwordError}
              secureTextEntry
            />
          </View>

          <TouchableOpacity>
            <Text
              style={{

                fontSize: FontSize.small,
                color: Colors.primary,
                alignSelf: "flex-end",
              }}
            >
              Mot de passe oublié ?
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('DrawerAdmin')}
            style={{
              padding: Spacing * 2,
              backgroundColor: Colors.primary,
              marginVertical: Spacing * 3,
              borderRadius: Spacing,
              shadowColor: Colors.primary,
              shadowOffset: {
                width: 0,
                height: Spacing,
              },
              shadowOpacity: 0.3,
              shadowRadius: Spacing,
            }}
          >
            <Text
              style={{

                color: Colors.onPrimary,
                textAlign: "center",
                fontSize: FontSize.large,
              }}
            >
              Sign in
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Register")}
            style={{
              padding: Spacing,
            }}
          >
            <Text
              style={{

                color: Colors.text,
                textAlign: "center",
                fontSize: FontSize.small,
              }}
            >
              Créer un nouveau compte
            </Text>
          </TouchableOpacity>

          <View
            style={{
              marginVertical: Spacing * 3,
            }}
          >
            <Text
              style={{

                color: Colors.primary,
                textAlign: "center",
                fontSize: FontSize.small,
              }}
            >
              Ou continuer avec
            </Text>

            <View
              style={{
                marginTop: Spacing,
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  padding: Spacing,
                  backgroundColor: Colors.gray,
                  borderRadius: Spacing / 2,
                  marginHorizontal: Spacing,
                }}
              >
                <Ionicons
                  name="logo-google"
                  color={Colors.text}
                  size={Spacing * 2}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  padding: Spacing,
                  backgroundColor: Colors.gray,
                  borderRadius: Spacing / 2,
                  marginHorizontal: Spacing,
                }}
              >
                <Ionicons
                  name="logo-apple"
                  color={Colors.text}
                  size={Spacing * 2}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  padding: Spacing,
                  backgroundColor: Colors.gray,
                  borderRadius: Spacing / 2,
                  marginHorizontal: Spacing,
                }}
              >
                <Ionicons
                  name="logo-facebook"
                  color={Colors.text}
                  size={Spacing * 2}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default LoginScreen;
