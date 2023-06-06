import { createStackNavigator } from '@react-navigation/stack';
import React from 'react'
import HomeG from '../screens/UserNotConnected/HomeG';
import DrawerNavAdmin from '../screens/SuperAdmin/draweradmin/DrawerNavAdmin';
import AddNewAgent from '../screens/SuperAdmin/Pagesadmin/AddNewAgent';
import LoginScreen from '../screens/LoginAndSingUP/LoginScreen';
import RegisterScreen from '../screens/LoginAndSingUP/RegisterScreen';
import DetailsAgent from '../screens/SuperAdmin/Pagesadmin/DetailsAgent';
import AddNewLocataire from '../screens/SuperAdmin/Pagesadmin/AddNewLocataire';
import DrawerNavAgent2 from '../screens/AgentMunicipalite/DrawerAgent2/DrawerNavAgent2';
import DrawerNavAgent3 from '../screens/AgentMunicipalite/DrawerAgent3/DrawerNavAgent3';
import AddNewOffre from '../screens/AgentMunicipalite/ListesOfPages/AddNewOffre';
import DetailsScreen from './DetailsScreen';
import ListeTextesPage from '../components/ListeTextesPage';
import DetailsLocataire from '../screens/SuperAdmin/Pagesadmin/DetailsLocataire';
import Detailsplage from '../screens/AgentMunicipalite/ListesOfPages/Detailsplagepublique';
import MapComponent from '../components/Carte';
import ProductList from '../screens/Locataire/ProductList';
import AddNewPlage from '../screens/AgentMunicipalite/ListesOfPages/AddNewPlage';
const Stack = createStackNavigator();
const Index = () => {
    return (
        <Stack.Navigator initialRouteName="HomeG">
            <Stack.Screen name="DrawerAdmin" component={DrawerNavAdmin} options={{ headerShown: false }} />
            <Stack.Screen name="HomeG" component={HomeG} options={{ headerShown: false }} />
            <Stack.Screen name="AddNewAgent" component={AddNewAgent} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
            <Stack.Screen name="DetailsAgent" component={DetailsAgent} options={{ headerShown: false }} />
            <Stack.Screen name="DetailsLocataire" component={DetailsLocataire} options={{ headerShown: false }} />
            <Stack.Screen name="AddNewLocataire" component={AddNewLocataire} options={{ headerShown: false }} />
            <Stack.Screen name="DrawerAgent2" component={DrawerNavAgent2} options={{ headerShown: false }} />
            <Stack.Screen name="DrawerAgent3" component={DrawerNavAgent3} options={{ headerShown: false }} />
            <Stack.Screen name="AddNewOffre" component={AddNewOffre} options={{ headerShown: false }} />
            <Stack.Screen name="DetailsPlagePublique" component={Detailsplage} options={{ headerShown: false }} />
            <Stack.Screen name="DetailsScreen" component={DetailsScreen} options={{ headerShown: false }} />
            <Stack.Screen name="ListeTextesPage" component={ListeTextesPage} options={{ headerShown: false }} />
            <Stack.Screen name="ProductList" component={ProductList} options={{ headerShown: false }} />
            <Stack.Screen name="AddNewPlage" component={AddNewPlage} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default Index
//