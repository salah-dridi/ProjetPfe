import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useReducer, useRef, useEffect, useState } from 'react'
import { useDrawerProgress } from '@react-navigation/drawer'
import { colors, constant } from '../constants/constant'
import Icon, { Icons } from '../constants/Icons'
import Animated, { interpolate, useAnimatedStyle, useDerivedValue, withSpring, withTiming } from 'react-native-reanimated'
import DrawerItemList from './DrawerItemList'
import { useNavigation } from '@react-navigation/native';
import Colors from '../constants/Colors'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { municipalite } from '../infomationsmunicipalite'
const CustomDrawer = (props) => {

  const navigation = useNavigation();
  useEffect(() => {
    getData();
  }, []);
  const lienimage = '../images/'
  const [email, setEmail] = useState(null)
  const [nom, setNom] = useState(null)
  const [prenom, setPrenom] = useState(null)

  const scrollRef = useRef(null)

  const drawerProgress = useDrawerProgress();

  const viewStyles = useAnimatedStyle(() => {
    const translateX = interpolate(
      drawerProgress.value,
      [0, 1],
      [-200, 0],
    )
    return {
      transform: [{ translateX }]
    }
  })

  const viewStyles2 = (type) => useAnimatedStyle(() => {
    const val = type === 'top' ? -100 : 100;
    const translateY = interpolate(
      drawerProgress.value,
      [0, 1],
      [val, 0],
    )
    const opacity = interpolate(
      drawerProgress.value,
      [0, 1],
      [0, 1],
    )
    return {
      transform: [{ translateY }], opacity
    }
  })
  const getData = async () => {
    try {
      const useremail = await AsyncStorage.getItem('useremail')
    
      if ((useremail!== null)) {
        setEmail(useremail)

      }
    } catch (e) {
      console.error('Failed to retrieve data', e)
    }
  }
  return (
    <View style={styles.container}>
      {/* header */}
      <Animated.View style={[styles.row, styles.view, styles.marginTop, viewStyles2('top')]}>

        <Image style={styles.profile} source={require(lienimage + 'logoplage.png')} />

        <Text style={styles.headerTitle}>بلدية {municipalite.nom}</Text>
      </Animated.View>

      {/* Drawer List Item */}
      <Animated.ScrollView
        ref={scrollRef}
        {...props}
        showsVerticalScrollIndicator={false}
        style={[styles.marginVertical, viewStyles]}>
        <DrawerItemList {...props} styles={styles} />
        <Animated.View
          style={[styles.row, styles.view, styles.marginBottom, styles.mymargin]}
        >
          <TouchableOpacity style={[styles.row]}
            onPress={() => navigation.goBack()}

          >
            <Icon type={Icons.MaterialIcons} name="logout" size={30} color={colors.darkGray} style={{ padding: 10 }} />
            <Text style={{ color: colors.darkGray, fontSize: 17 }}>خروج</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          style={[styles.row, styles.view, styles.marginBottom, styles.mymargin, viewStyles2('bottom')]}>
     
            <Text style={{ color: Colors.primary }} >{email}</Text>
     
        </Animated.View>
      </Animated.ScrollView>
    </View>
  )
}

export default CustomDrawer

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view: {
    backgroundColor: Colors.white,
    borderRadius: constant.borderRadius,
    marginHorizontal: constant.SPACING / 2,
    padding: constant.SPACING / 1.5,
  },
  marginTop: {
    marginTop: constant.SPACING / 2,
  },
  marginBottom: {
    marginBottom: constant.SPACING / 2,
  },
  marginVertical: {
    marginVertical: constant.SPACING / 2,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: constant.SPACING / 2,
    justifyContent: 'space-between',
    borderRadius: constant.borderRadius,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: constant.textFontSize,
    color: colors.dark,
    paddingHorizontal: constant.SPACING,
  },
  notificationBadge: {
    paddingVertical: constant.SPACING / 5,
    paddingHorizontal: constant.SPACING / 2,
    borderRadius: constant.borderRadius / 2,
  },
  iconContainer: {
    padding: constant.SPACING / 2.4,
    borderRadius: constant.borderRadius,
    margin: constant.SPACING / 2,
    backgroundColor: colors.primary,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: colors.darkGray,
    marginVertical: constant.SPACING / 2,
  },
  headerTitle: {
    fontSize: constant.titleFontSize,
    color: colors.dark,
  },
  profile: {
    marginVertical: constant.SPACING / 2,
    marginRight: constant.SPACING,
    marginLeft: constant.SPACING / 2,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.primary,
  },
  profileText: {
    color: colors.dark,
  },
  listpadding: {
    padding: 10
  },
  mymargin: {
    marginTop: 10,
  },
})
