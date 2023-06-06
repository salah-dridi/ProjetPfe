import { createDrawerNavigator } from '@react-navigation/drawer'
import React, { useState, useEffect } from 'react'
import { Platform, StyleSheet } from 'react-native'
import Icon, { Icons } from '../../../constants/Icons';
import DrawerScreen from '../../DrawerScreen';
import AgentService from '../../../services/agentService';
import ListOfLocataires from '../../SuperAdmin/Pagesadmin/ListOfLocataire';
import CustomDrawer from '../../../components/CustomDrawer';
const Drawer = createDrawerNavigator();

const DrawerNavLocataire = () => {
  const agentService = new AgentService()
  const [nb, setNb] = useState(0);

  const privilege = 1
  useEffect(() => {
    // nbnotif();
    // const intervalId = setInterval(nbnotif, 1000);
    // return () => clearInterval(intervalId);
  }, []);
  const ScreensArrayLocataire = [
    { route: 'Home', label: 'الصفحة الرئيسية', type: Icons.Feather, icon: 'home', component: DrawerScreen, },
    { route: 'Notifications', label: 'الإشعارات', type: Icons.Ionicons, icon: 'notifications', component: DrawerScreen, notification: nb, },
    { route: 'Cloud', label: 'الطقس', type: Icons.FontAwesome5, icon: 'cloud-sun', component: DrawerScreen, },
    { route: 'Chat', label: 'الرسائل', type: Icons.AntDesign, icon: 'wechat', component: DrawerScreen, },
    { route: 'ListOfReclamations', label: 'إدارة الشكاوي', type: Icons.MaterialCommunityIcons, icon: 'comment-alert-outline', component: DrawerScreen },
    { route: 'Settings', label: 'إدارة الحساب', type: Icons.Feather, icon: 'settings', component: DrawerScreen, },
  ];
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: styles.drawerStyles,
        drawerType: 'front',
        swipeEdgeWidth: Platform.OS === 'android' && 180,
        headerShown: false,
      }}
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      {ScreensArrayLocataire.map((_, i) => (
        <Drawer.Screen key={i} name={_.route} component={_.component}
          options={{
            item: _,
          }}
        />
      ))}

    </Drawer.Navigator>
  )
}

export default DrawerNavLocataire

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