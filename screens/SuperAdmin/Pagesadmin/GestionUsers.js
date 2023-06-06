import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useRef } from 'react'
import { StyleSheet,  TouchableOpacity, View, Dimensions } from 'react-native'
import Icon, { Icons } from '../../../constants/Icons';
import * as Animatable from 'react-native-animatable';
import Colors from '../../../constants/Colors';
import ListOfAgents from './ListOfAgents';
import ListOfLocataires from './ListOfLocataire';
import ListOfCitoyen from './ListOfCitoyen';
const { width, height } = Dimensions.get("window")
const TabArr = [
    { route: 'ListOfAgents', label: 'إدارة الأعوان', type: Icons.FontAwesome5, icon: 'user-tie', component: ListOfAgents },
    { route: 'ListOfLocataires', label: 'إدارة المستأجرين', type: Icons.FontAwesome5, icon: 'house-user', component: ListOfLocataires },
    { route: 'ListOfCitoyens', label: 'إدارة الحرفاء', type: Icons.FontAwesome5, icon: 'users', component: ListOfCitoyen },
];
const Tab = createBottomTabNavigator();
const animate1 = { 0: { scale: .5, translateY: 7 }, .92: { translateY: -34 }, 1: { scale: 1.2, translateY: -24 } }
const animate2 = { 0: { scale: 1.2, translateY: -24 }, 1: { scale: 1, translateY: 7 } }
const circle1 = { 0: { scale: 0 }, 0.3: { scale: .9 }, 0.5: { scale: .2 }, 0.8: { scale: .7 }, 1: { scale: 1 } }
const circle2 = { 0: { scale: 1 }, 1: { scale: 0 } }

const TabButton = (props) => {
    const { item, onPress, accessibilityState } = props;
    const focused = accessibilityState.selected;
    const viewRef = useRef(null);
    const circleRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        if (focused) {
            viewRef.current.animate(animate1);
            circleRef.current.animate(circle1);
            textRef.current.transitionTo({ scale: 1 });
        } else {
            viewRef.current.animate(animate2);
            circleRef.current.animate(circle2);
            textRef.current.transitionTo({ scale: 0 });
        }
    }, [focused])

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={1}
            style={styles.container}>
            <Animatable.View
                ref={viewRef}
                duration={1000}
                style={styles.container}>
                <View style={styles.btn}>
                    <Animatable.View
                        ref={circleRef}
                        style={styles.circle} />
                    <Icon type={item.type} name={item.icon} color={focused ? Colors.white : Colors.primary} />
                </View>
                <Animatable.Text
                    ref={textRef}
                    style={styles.text}>
                    {item.label}
                </Animatable.Text>
            </Animatable.View>
        </TouchableOpacity>
    )
}
const GestionUsers = () => {
   
    return (
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarStyle: styles.tabBar,
                }}
            >
                {TabArr.map((item, index) => {
                    return (
                        <Tab.Screen key={index} name={item.route} component={item.component}
                            options={{
                                tabBarShowLabel: false,
                                tabBarButton: (props) => <TabButton {...props} item={item} />
                            }}
                        />
                    )
                })}

            </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    tabBar: {
        position: 'relative',
        borderRadius: 16,
        height: height * 0.1,
        right: 3,
        left: 3,
        bottom: 3,
        width: width * 0.98
    },
    btn: {
        width: 50,
        height: 50,
        borderRadius: 25,
        borderWidth: 4,
        borderColor: Colors.white,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center'
    },
    circle: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primary,
        borderRadius: 25,
    },
    text: {
        fontSize: 10,
        textAlign: 'center',
        color: Colors.primary,
    }
})

export default GestionUsers
