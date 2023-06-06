import { Modal, Button, TouchableOpacity, Text, Dimensions, StyleSheet, TouchableHighlight, TouchableWithoutFeedback, View, Image, FlatList, RefreshControl } from 'react-native'
import React, { useRef, useReducer, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../../constants/Colors';
import Icon, { Icons } from '../../constants/Icons';
import Animated, { Extrapolate, interpolate, interpolateColor, log, useAnimatedStyle, useDerivedValue, withSpring, withTiming } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location'
import { municipalite } from '../../infomationsmunicipalite';
import PlageService from '../../services/plageService';
const { height, width } = Dimensions.get('window')
const FAB_SIZE = 54;
const circleScale = (width / FAB_SIZE).toFixed(1)
const circleSize = circleScale * FAB_SIZE;
const dist = circleSize / 2 - FAB_SIZE;

export default function HomeG() {
  const lienimage = '../../images/'
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [plages, setPlages] = useState([])
  const [test, setTest] = useState(false);
  const plageService = new PlageService()
  useEffect(() => {
    getAllPlages();
  }, [])

  const getAllPlages = () => {
    return new Promise((resolve, reject) => {
      plageService.GetAllPlages()
        .then((res) => {
          setPlages(res.data);
          setTest(true)
          resolve(); // Résoudre la promesse
        })
        .catch(() => {
          setTest(false)
        });
    });
  };
  const onRefresh = () => {
    setIsRefreshing(true);
    getAllPlages()
      .then(() => setIsRefreshing(false))
      .catch((err) => console.log(err)); // Gérer les erreurs éventuelles
  };
  const navigatetologin = () => {
    navigation.navigate('Login')
  }
  const ListItem = ({ item, navigation }) => {
    const navigatetodeatilsplage = (id_plage) => {

    }
    return (
      <View style={styles2.item}>
        <TouchableOpacity style={[styles2.imageContainer]}
          onPress={() => navigatetodeatilsplage(item.id_plage)}
        >
       
          <Image source={{ uri: "http://192.168.43.159:3000/storages/" + item.photo }} style={styles2.image} />
          <Text style={[styles2.text]}>{item.nom_plage}</Text>

        </TouchableOpacity>

      </View>
    )
  }

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={{ height: height * 0.1, backgroundColor: Colors.primary, flexDirection: 'row', alignItems: "center" }}>
        <View style={{ width: width * 0.7, height: "100%", flexDirection: 'row', alignItems: "center", justifyContent: "space-between" }}>
          <View style={{ width: "25%", height: "80%" }}>
            <Image source={require(lienimage + 'logoplage.png')} style={{ width: '100%', height: '100%', borderRadius: 70 }} />
          </View>
          <View style={{ flex: 1, margin: 10, }}>
            <Text style={{ fontSize: 25, color: Colors.couleur1 }}>بلدية {municipalite.nom}</Text>
          </View>
        </View>
        <View style={{ width: width * 0.3, height: "70%", alignItems: "center" }}>
          <Image source={require(lienimage + 'drapeau-tunisie.jpg')} style={{ width: '60%', height: '100%' }} />
        </View>

      </View>

      <View style={styles2.container}>
        <View style={{
          height: height * 0.07,
          backgroundColor: Colors.white,
          borderBottomWidth: 2,
          borderBottomColor: Colors.primary,
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
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={{ marginRight: 10, color: Colors.primary, fontSize: 20 }}>تسجيل الدخول</Text>
              <Icons.AntDesign name='pluscircle' size={30} color={Colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
        <FlatList
          data={plages}
          numColumns={2}
          style={{ paddingVertical: 10 }}
          keyExtractor={(item, index) => item.id_plage + index.toString()}
          renderItem={({ item }) => <ListItem item={item} navigation={navigation} />}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              colors={[Colors.primary]}
            />
          }
        />

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
//'blue'
//Colors.white
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
