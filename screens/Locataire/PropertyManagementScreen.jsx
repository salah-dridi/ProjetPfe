import React, { useState } from 'react';
import { View, TextInput, Button, Text, ScrollView,SafeAreaView,Image } from 'react-native';
import Colors from '../../constants/Colors';
import Spacing from '../../constants/Spacing';
import FontSize from '../../constants/FontSize';
import AppTextInput from '../../components/AppTextInput';

const PropertyManagementScreen = () => {
  const [properties, setProperties] = useState([]);
  const [property, setProperty] = useState({
    prix_parasole: 0,
    nb_parasole: 0,
    prix_chaise_long: 0,
    nb_chaise_long: 0,
    prix_chaise: 0,
    nb_chaise: 0,
    prix_table: 0,
    nb_table: 0,
    prix_cabane: 0,
    nb_cabane: 0,
    prix_table_petite: 0,
    nb_table_petite: 0,
  });

  const addProperty = () => {
    const newProperty = {
      id: Date.now(),
      ...property,
    };

    setProperties([...properties, newProperty]);
    setProperty({
      prix_parasole: 0,
      nb_parasole: 0,
      prix_chaise_long: 0,
      nb_chaise_long: 0,
      prix_chaise: 0,
      nb_chaise: 0,
      prix_table: 0,
      nb_table: 0,
      prix_cabane: 0,
      nb_cabane: 0,
      prix_table_petite: 0,
      nb_table_petite: 0,
    });
  };

  const deleteProperty = id => {
    const updatedProperties = properties.filter(property => property.id !== id);
    setProperties(updatedProperties);
  };

  const updateProperty = (id, updatedProperty) => {
    const updatedProperties = properties.map(property => {
      if (property.id === id) {
        return {
          ...property,
          ...updatedProperty,
        };
      }
      return property;
    });

    setProperties(updatedProperties);
  };
  const sharedImage = require('../../images/image_parasol.jpg');
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <ScrollView>
        <View style={{
            marginTop: 10,
            padding: Spacing ,
            backgroundColor: Colors.active,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            position: 'relative',
            alignItems : 'flex-end',  
          }}
          >     
            {[
                { key: 'prix_parasole', label: 'Prix Parasol :', image: sharedImage },
                { key: 'nb_parasole', label: 'Nombre de Parasols :', image: sharedImage },
                { key: 'prix_chaise_long', label: 'Prix Chaise Longue :', image: require('../../images/image_chaise_longue.jpg') },
                { key: 'nb_chaise_long', label: 'Nb Chaises Longues :', image: require('../../images/image_chaise_longue.jpg') },
                { key: 'prix_chaise', label: 'Prix Chaise :', image: require('../../images/image_chaise.jpg') },
                { key: 'nb_chaise', label: 'Nombre de Chaises :', image: require('../../images/image_chaise.jpg') },
                { key: 'prix_table', label: 'Prix Table :', image: require('../../images/image_table.jpeg') },
                { key: 'nb_table', label: 'Nombre de Tables :', image: require('../../images/image_table.jpeg') },
                { key: 'prix_cabane', label: 'Prix Cabane :', image: require('../../images/image_cabane.jpg') },
                { key: 'nb_cabane', label: 'Nombre de Cabanes :', image: require('../../images/image_cabane.jpg')},
                { key: 'prix_table_petite', label: 'Prix Table Petite :', image: require('../../images/small_table.jpg') },
                { key: 'nb_table_petite', label: 'Nombre de Petites Tables :', image: require('../../images/small_table.jpg') },
            ].map(({ key, label, image }) => (
                <View key={key}>
                <Image source={image} style={{ width: 190, height: 150 }} />
                <Text style={{
                    fontSize: FontSize.small,
                    maxWidth: "70%",
                    }}
                 >{label}</Text>
                
                <AppTextInput 
                style={{
                    borderWidth: 3,
                    borderColor: Colors.primary,
                    shadowOffset: { width: 4, height: Spacing },
                    shadowColor: Colors.primary,
                    shadowOpacity: 0.2,
                    shadowRadius: Spacing,
                    padding: Spacing/2,
                    backgroundColor: Colors.textinput,
                    borderRadius: Spacing,
                    marginVertical: Spacing,
                    maxWidth:'50%'
                }}
                    value={property[key].toString()}
                    onChangeText={text => setProperty({ ...property, [key]: parseFloat(text) })}
                    placeholder={`Entrez ${label}`}
                    keyboardType="numeric"
                />
                </View>
            ))}

            <Button title="Ajouter" onPress={addProperty} />



      {properties.map(property => (
        <View key={property.id}>
          {Object.entries(property).map(([key, value]) => (
            <Text key={key}>{key}: {value}</Text>
          ))}

          <Button
            title="Modifier"
            onPress={() => {
              // Implement logic to open a screen or modal for property modification
              // You can pass property.id and property as props
            }}
          />

          <Button
            title="Supprimer"
            onPress={() => deleteProperty(property.id)}
          />
        </View>
      ))}
    </View>
    </ScrollView>
    </SafeAreaView>
  );
};

export default PropertyManagementScreen;
