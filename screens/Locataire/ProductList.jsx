import React ,{useState , useEffect}from 'react';
import { ActivityIndicator } from 'react-native';
import { View, Text, Image, FlatList } from 'react-native';
import Spacing from '../../constants/Spacing';
import Colors from '../../constants/Colors';

const products = [
    {
      title: 'Parasoles',
      Prix : '29dt',
      Nombre: '50',
     // image: require('../../images/image_parasol.jpg'),
      description: 'A stylish and functional parasol for outdoor use.',
    },
    {
      title: 'Chaise Longue',
      Prix: '19dt',
     // image: require('../../images/image_chaise_longue.jpg'),
      description: 'A comfortable and elegant chaise longue for relaxation.',
    },
    {
        title: 'Chaise',
        Prix: '10dt',
     //   image: require('../../images/image_chaise.jpg'),
        description: 'A simple and versatile chair for various settings.',
      },
      {
        title: 'Table',
        Prix: '25dt',
      //  image: require('../../images/image_table.jpeg'),
        description: 'A sturdy table for dining or working purposes.',
      },
      {
        title: 'Cabane',
        Prix: '50dt',
      //  image: require('../../images/image_cabane.jpg'),
        description: 'A cozy and compact cabin for a unique experience.',
      },
      {
        title: 'Table Petite',
        Prix: '15dt',
      //  image: require('../../images/small_table.jpg'),
        description: 'A small and portable table for tight spaces.',
      },
  ];
  
const ProductList = () => {
  const [loading,setLoading] = useState(false)
  if (loading){
    return (
      <View style={{ flex:1 , justifyContent: 'center'}}>
        <ActivityIndicator size={'large'} color={'blue'}  />
      </View>
    )
  }
  const renderItem = ({ item }) => (
    <View style={{
        padding: 5 ,
        marginBottom: Spacing * 2,
        flexDirection: 'row',
         }}>
      <Image source={item.image} style={{ width: 190, height: 160 }} />
      <View  style={{ marginLeft: Spacing }} > 
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginRight:'50%' }}>{item.title}</Text>
      <Text style={{ fontSize: 14, color: 'gray', marginBottom: 5, marginRight:'50%' }}>{item.Prix}</Text>
      <Text style={{ fontSize: 14, color: 'gray', marginBottom: 5, marginRight:'50%' }}>{item.Nombre}</Text>
      {item.description.split('\n').map((desc,index) => (
      <Text key={index} style={{ fontSize: 14, marginRight:'50%' }}>{desc}</Text>
      ))}
      </View>
    </View>
  );
        // we are using {} in the example above because we are passing props
    return (
      <View style={{  
          flex:1,
          backgroundColor: Colors.skyBlue,
          }}>
         <View style={{
                    marginTop: 60,
             }}></View>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
      />
      </View>
    );
};

export default ProductList;
