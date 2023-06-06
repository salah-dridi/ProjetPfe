import {TouchableOpacity, Text, Dimensions, StyleSheet, View, Image, FlatList, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../constants/Colors';
import { Icons } from '../constants/Icons';
import { useNavigation } from '@react-navigation/native';
import { municipalite } from '../infomationsmunicipalite';
import { LinearGradient } from 'expo-linear-gradient';

import PlageService from '../services/plageService';
const { height, width } = Dimensions.get('window')
const FAB_SIZE = 54;
const circleScale = (width / FAB_SIZE).toFixed(1)
const circleSize = circleScale * FAB_SIZE;
const dist = circleSize / 2 - FAB_SIZE;

export default function AccueilScreen({navigation}) {
  const lienimage = '../images/'
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

  const ListItem = ({ item, navigation }) => {
    const navigatetodeatilsplage = (id_plage) => {

    }
    return (
      <View style={styles2.item}>
        <TouchableOpacity style={[styles2.imageContainer]}
          onPress={() => navigatetodeatilsplage(item.id_plage)}
        >
          <Image source={require('../images/plage3.jpg')} style={styles2.image} />

          <Text style={[styles2.text]}>{item.nom_plage}</Text>

        </TouchableOpacity>

      </View>
    )
  }


  return (
    <View style={styles.container}>
        <LinearGradient colors={['#50B2C0','#50B2C0', '#f1f4ff', '#FBC252']} style={styles.container}>
        <View style={styles.header}>
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
        </LinearGradient>
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
  header: {
    height: 90,                      // Adjust the height as needed
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',             // Set the position to absolute
    top: 0,                           // Position the header at the top
    left: 0,                          // Align the header to the left
    right: 0,                         // Align the header to the right
    borderWidth: 0.51, 
    borderColor: '#008b8b',
    borderRadius: 5,   
    backgroundColor: Colors.primary, 
    flexDirection: 'row', 
    alignItems: "center" ,
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
