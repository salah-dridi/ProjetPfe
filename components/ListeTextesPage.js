import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import { colors } from '../constants/constant';
import Icon, { Icons } from '../constants/Icons';
const { width, height } = Dimensions.get("window")
const ListeTextesPage = () => {
    const texts = ['Texte 1', 'Texte 2', 'Texte 3', 'Texte 4'];
    const [selectedItem, setSelectedItem] = useState(null);

    const handleItemPress = (item) => {
        setSelectedItem(item);
        console.log(item); // Affiche l'élément sélectionné dans la console
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={texts}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <View style={{
                            marginLeft: 10,
                            marginRight: 10,
                            marginTop: 8,
                            alignItems: "center",
                        }}>
                            <TouchableOpacity
                                style={[
                                    styles.button,
                                ]}
                                onPress={() => handleItemPress(item)}
                            >
                                <Text style={[
                                    styles.buttonText,
                                    selectedItem === item && styles.selectedButtonText
                                ]}>اختيار</Text>
                                <Icon type={Icons.AntDesign} name="checkcircle" size={30} color={selectedItem === item ? 'green' : colors.black} style={{ padding: 10 }} />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.text}>{item}</Text>
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white,
    },
    item: {
        width: width * 0.8,
        height: height * 0.4,
        backgroundColor: Colors.primary,
        margin: 20,
        borderRadius: 40
    },
    button: {
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        alignSelf: "flex-end",
    },
    selectedButton: {
        backgroundColor: 'green', // Change la couleur du bouton en vert pour l'élément sélectionné
    },
    buttonText: {
        marginRight: 10,
        color: Colors.black,
        fontSize: 20
    },
    selectedButtonText: {
        color: 'green', // Change la couleur du texte en vert pour l'élément sélectionné
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        margin: 10
    },
});

export default ListeTextesPage;
