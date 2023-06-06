import { createDrawerNavigator } from '@react-navigation/drawer'
import React, { useState, useEffect } from 'react'
import { Platform, StyleSheet, View, Text, Dimensions, Image } from 'react-native'
import Icon, { Icons } from '../../../constants/Icons';
import DrawerScreen from '../../DrawerScreen';
import GestionUsers from '../Pagesadmin/GestionUsers';
import AgentService from '../../../services/agentService';
import GestionPlacesPub from '../../AgentMunicipalite/ListesOfPages/GestionPlacesPub';
import GestionPlacesPriv from '../../AgentMunicipalite/ListesOfPages/GestionPlacesPriv';
import GestionRecAndOff from '../../AgentMunicipalite/ListesOfPages/GestionRecAndOff';
import CustomDrawer from '../../../components/CustomDrawer';
import Colors from '../../../constants/Colors';
import Home from '../../Citoyen/Pagescitoyen/Home';
const { width, height } = Dimensions.get("window")
import { municipalite } from '../../../infomationsmunicipalite';
const Drawer = createDrawerNavigator();
const lienimage = '../../../images/'
const DrawerNavAdmin = () => {
  const agentService = new AgentService()
  const [nb, setNb] = useState(0);
  useEffect(() => {
    // nbnotif();
    // const intervalId = setInterval(nbnotif, 1000);
    // return () => clearInterval(intervalId);
  }, []);
  const ScreensArrayAdmin = [
    { route: 'Home', label: 'الصفحة الرئيسية', type: Icons.Feather, icon: 'home', component:Home, },
    { route: 'Notifications', label: 'الإشعارات', type: Icons.Ionicons, icon: 'notifications', component: DrawerScreen, notification: nb, },
    { route: 'Cloud', label: 'الطقس', type: Icons.FontAwesome5, icon: 'cloud-sun', component: DrawerScreen, },
    { route: 'Chat', label: 'الرسائل', type: Icons.AntDesign, icon: 'wechat', component: DrawerScreen, },
    { route: 'AdminUS', label: 'إدارة المستخدمين', type: Icons.MaterialIcons, icon: 'admin-panel-settings', component: GestionUsers, },
    { route: 'AdminPB', label: 'إدارة الأماكن العمومية', type: Icons.MaterialIcons, icon: 'public', component: GestionPlacesPub, },
    { route: 'AdminPV', label: 'إدارة الأماكن الخاصة', type: Icons.MaterialIcons, icon: 'local-library', component: GestionPlacesPriv, },
    { route: 'AdminRO', label: 'إدارة العروض و الشكاوي', type: Icons.Ionicons, icon: 'md-newspaper-sharp', component: GestionRecAndOff, },
    { route: 'Settings', label: 'إدارة الحساب', type: Icons.Feather, icon: 'settings', component: DrawerScreen, },
  ];
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
      <Drawer.Navigator
        screenOptions={{
          drawerStyle: styles.drawerStyles,
          drawerType: 'front',
          swipeEdgeWidth: Platform.OS === 'android' && 180,
          headerShown: false,
        }}
        drawerContent={(props) => <CustomDrawer {...props} />}
      >

        {ScreensArrayAdmin.map((_, i) => (

          <Drawer.Screen key={i} name={_.route} component={_.component}
            options={{
              item: _,
            }}
          />
        ))}

      </Drawer.Navigator>
    </View>
  )
}

export default DrawerNavAdmin

const styles = StyleSheet.create({
  drawerStyles: {
    width: 260,
    backgroundColor: 'transparent',
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'white'
  },
})