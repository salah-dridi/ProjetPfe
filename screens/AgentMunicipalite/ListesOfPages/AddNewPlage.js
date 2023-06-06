
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
  ScrollView
} from 'react-native';
import * as ImagePicker from 'expo-image-picker'
import PlageService from '../../../services/plageService';
import * as Animatable from 'react-native-animatable';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from 'react-native-paper';
import Colors from '../../../constants/Colors';
import { municipalite } from '../../../infomationsmunicipalite';
import * as Location from 'expo-location'
import Icon, { Icons } from '../../../constants/Icons';
// import { initialRegion } from '../../../constants/constant';
import MapView, { Polygon } from 'react-native-maps';
const { width, height } = Dimensions.get("window")

const AddNewPlage = ({ navigation }) => {
  const [photo, setPhoto] = useState(null);
  const [photouri, setPhotouri] = useState(null);
  const [location, setLocation] = useState(null)
  const [positions, setPositions] = useState([]);
  const [points, setPoints] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [initialRegion, setInitialRagion] = useState({})
  const [data1, setData1] = React.useState({
    nom_plage: '',
    Change_nom_plage: false,
    isValidNomplage: false,
    description_plage: '',
    Change_description_plage: false,
    isValidDescriptionplage: false,
  });
  const lienimage = '../../../images/'

  const plageService = new PlageService()
  const { colors } = useTheme();
  const NewPositions = () => {
    if (showMap === false) {
      positions.push(positions[0])
      points.push(points[0])
    }

    console.log(points)
    setShowMap(true)
  }

  const MaPosition = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      return;
    }
    const userlocation = await Location.getCurrentPositionAsync();
    const newPosition = [
      userlocation.coords.latitude,
      userlocation.coords.longitude
    ]
 
    const newPosition2 =
    {
      "latitude": userlocation.coords.latitude,
      "longitude": userlocation.coords.longitude
    }
    const region = {
      latitude: userlocation.coords.latitude,
      longitude: userlocation.coords.longitude,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    };
    const updatedPositions = [...positions, newPosition];
    const updatedPositions2 = [...points, newPosition2];
    setPositions(updatedPositions);
    setPoints(updatedPositions2)
    setInitialRagion(region)
  };
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

  }, [])
  const selectPhoto = async () => {
    try {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          console.log('Permission denied');
          return;
        }
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
      });

      if (result.assets != null) {
        setPhoto(result.assets[0].uri);
      }
    } catch (error) {
      console.log('Error selecting photo:', error);
    }
  };


  const handleValidNomplage = (val) => {
    if (val.trim().length >= 1) {
      setData1({
        ...data1,
        isValidNomplage: true
      });
    } else {
      setData1({
        ...data1,
        isValidNomplage: false
      });
    }
  }


  const NomplageChange = (val) => {
    if (val.trim().length >= 1) {
      setData1({
        ...data1,
        nom_plage: val,
        Change_nom_plage: true,
        isValidNomplage: true,
      });
    } else {
      setData1({
        ...data1,
        nom_plage: val,
        Change_nom_plage: false,
        isValidNomplage: false,
      });
    }
  };
  const handleValidDescriptionplage = (val) => {
    if (val.trim().length >= 1) {
      setData1({
        ...data1,
        isValidDescriptionplage: true
      });
    } else {
      setData1({
        ...data1,
        isValidDescriptionplage: false
      });
    }
  }


  const DescriptionplageChange = (val) => {
    if (val.trim().length >= 1) {
      setData1({
        ...data1,
        description_plage: val,
        Change_description_plage: true,
        isValidDescriptionplage: true,
      });
    } else {
      setData1({
        ...data1,
        description_plage: val,
        Change_description_plage: false,
        isValidDescriptionplage: false,
      });
    }
  };
  const Confirmer2 = () => {

    if (data1.isValidNomplage && photo && data1.isValidDescriptionplage && points.length > 3) {

      Alert.alert('تاكيد ', 'هل انت متاكد من اضافة هذا الشاطئ ؟', [
        {
          text: 'لا',
          style: 'cancel',
        },
        { text: 'نعم', onPress: () => AddNewPlage() },
      ]);
    } else {
      Alert.alert('بيانات غير مكتملة', 'الرجاء ملا جميع الفراغات', [
        { text: 'حسنا' },
      ]);
    }
  };
  const AddNewPlage = async () => {
    try {
      const data = new FormData();
      data.append('nom_plage', data1.nom_plage);
      data.append('description_plage', data1.description_plage);
      data.append('surface_plage', JSON.stringify({ type: 'Polygon', coordinates: [positions] }));
      data.append('photo', {
        uri: photo,
        type: 'image/jpeg',
        name: photo ? `photo_${Date.now()}.jpg` : '',
      });

      const response = await fetch('http:///192.168.43.159:3000/plage/AddNewPlage', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: data,
      });

      if (response.ok) {

        Alert.alert('جيد ', 'لقد تم اضافة هذا الشاطئ', [
          {
            text: 'خروج',
            onPress: () => navigation.goBack(),
          },
        ]);
      } else {
        Alert.alert('لم نتمكن من اضافة هذا الشاطئ', 'الرجاء اعادة المحاولة', [
          { text: 'حسنا' },
        ]);
      }
    } catch (error) {
      Alert.alert('لم نتمكن من اضافة هذا الشاطئ', 'الرجاء اعادة المحاولة', [
        { text: 'حسنا' },
      ]);
    }
  };
  const renderMapView = () => {
    return (
      <MapView
        style={{ height: height * 0.5, width: width }}
        initialRegion={initialRegion}
        mapType="satellite"
      >
        <Polygon
          coordinates={points}
          fillColor="rgba(255, 0, 0, 0.5)"
          strokeColor="red"
        />
      </MapView>
    );
  };
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
        <Text style={styles.text_header}>اضافة شاطئ جديد</Text>

      </View>

      <Animatable.View
        animation="fadeInUpBig"
        style={[styles.footer, {
          backgroundColor: colors.background
        }]}
      >
        <View>
          <ScrollView style={{ margin: 10 }}>
            <Text style={[styles.text_footer, {
              color: colors.text
            }]}>اسم الشاطئ</Text>
            <View style={styles.action}>
              <TextInput
                placeholder="اضافة اسم"
                placeholderTextColor="#666666"
                style={[styles.textInput, {
                  color: colors.text
                }]}
                autoCapitalize="none"
                onChangeText={(val) => NomplageChange(val)}
                onEndEditing={(e) => handleValidNomplage(e.nativeEvent.text)}
              />
              {data1.Change_nom_plage ?
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
            {data1.isValidNomplage ? null :
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>لا يوجد اسم</Text>
              </Animatable.View>
            }
            <Text style={[styles.text_footer, {
              color: colors.text
            }]}>وصف الشاطئ</Text>
            <View style={styles.action}>
              <TextInput
                placeholder="اضافة وصف"
                placeholderTextColor="#666666"
                style={[styles.textInput, {
                  color: colors.text
                }]}
                autoCapitalize="none"
                onChangeText={(val) => DescriptionplageChange(val)}
                onEndEditing={(e) => handleValidDescriptionplage(e.nativeEvent.text)}
              />
              {data1.Change_description_plage ?
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
            {data1.isValidDescriptionplage ? null :
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>لا يوجد وصف</Text>
              </Animatable.View>
            }
            <View >
              <TouchableOpacity
                style={{
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignSelf: "flex-end"
                }}
                onPress={() => selectPhoto()}
              >
                <Text style={{ marginRight: 10, color: Colors.black, fontSize: 15 }}>اختيار صورة</Text>
                <Icons.EvilIcons name='image' size={30} color={Colors.primary} />
              </TouchableOpacity>

            </View>
            {photo && <Image source={{ uri: photo }} style={{ width: width, height: height }} />}

            {photo ? null :
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>لا يوجد صورة</Text>
              </Animatable.View>
            }
            {positions.length > 2 && (
              <View style={{ marginBottom: 10 }}>
                <View >
                  <TouchableOpacity
                    style={{
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexDirection: "row",
                      alignSelf: "flex-end"
                    }}
                    onPress={() => NewPositions()}
                  >
                    <Text style={{ marginRight: 10, color: Colors.black, fontSize: 15 }}>رؤية المساحة</Text>
                    <Icons.Entypo name='location' size={30} color={Colors.primary} />
                  </TouchableOpacity>
                </View>
              </View>
            )}
            <View >

              <TouchableOpacity
                style={{
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignSelf: "flex-end"
                }}
                onPress={() => MaPosition()}
              >
                <Text style={{ marginRight: 10, color: Colors.black, fontSize: 15 }}>تحديد هذه النقطة</Text>
                <Icons.MaterialIcons name='my-location' size={30} color={Colors.primary} />
              </TouchableOpacity>

            </View>
            {showMap && renderMapView()}
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={styles.button2}>
                <Text style={styles.buttonText} onPress={() => navigation.goBack()}>خروج</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => Confirmer2()}>
                <Text style={styles.buttonText} >تاكيد</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </Animatable.View>

    </View>
  );
};

export default AddNewPlage;

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
