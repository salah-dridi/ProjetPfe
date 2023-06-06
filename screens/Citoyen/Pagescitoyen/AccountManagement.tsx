import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import Colors from "../../../constants/Colors";
import Spacing from "../../../constants/Spacing";
import FontSize from "../../../constants/FontSize";
import Font from "../../../constants/Font";
import AppTextInput from "../../../components/AppTextInput";

type AccountFormData = {
  username: string;
  password: string;
  email: string;
};


const AccountManagement = ({ navigation }) => {
  const [formData, setFormData] = useState<AccountFormData>({
    username: '',
    password: '',
    email: '',
  });

  const [oldPassword, setOldPassword] = useState('');
  const [oldEmail, setOldEmail] = useState('');

  const handleSubmit = () => {
    let updateFields = {};
  
    if (oldPassword !== formData.password) {
      updateFields = { ...updateFields, password: formData.password };
    }
  
    if (oldEmail !== formData.email) {
      updateFields = { ...updateFields, email: formData.email };
    }
  
    if (Object.keys(updateFields).length === 0) {
      // Show error message to the user if no fields are modified
      console.log('No fields modified!');
      return;
    }
  
    // Make API request to update user's account info with updateFields values
    // Display success message to the user
    console.log('Account updated successfully with fields:', updateFields);
  };

  const handleInputChange = (name: keyof AccountFormData, value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

 return (
  <ScrollView >

    <View
      style={{
        marginTop: 10,
        padding: Spacing *2,
      }}
    >
      <Text
        style={{
          fontSize: FontSize.xLarge,
          color: Colors.primary,
          fontFamily: Font["poppins-bold"],
          marginVertical: Spacing * 3,
        }}
      >
        ادارة الحساب
      </Text>

      <AppTextInput
        placeholder="اسم المستخدم"
        onChangeText={(value) => handleInputChange('username', value)}
        value={formData.username}
      />
      <AppTextInput
        placeholder="كلمة المرور القديمة"
        secureTextEntry={true}
        onChangeText={(value) => setOldPassword(value)}
        value={oldPassword}
      />
      <AppTextInput
        placeholder="البريد الإلكتروني القديم"
        onChangeText={(value) => setOldEmail(value)}
        value={oldEmail}
      />
      <AppTextInput
        placeholder="كلمة المرور الجديدة"
        secureTextEntry={true}
        onChangeText={(value) => handleInputChange('password', value)}
        value={formData.password}
      />
      <AppTextInput
        placeholder="بريد إلكتروني جديد"
        onChangeText={(value) => handleInputChange('email', value)}
        value={formData.email}
      />

      <TouchableOpacity
      onPress={handleSubmit}
           style={{
           padding: Spacing * 1.5,
           backgroundColor: Colors.primary,
           marginVertical: Spacing * 1,
           marginTop: Spacing *4,
           borderRadius: Spacing,
           shadowColor: Colors.primary,
           shadowOffset: {
              width: 0,
              height: Spacing,
            },
           shadowOpacity: 0.3,
           shadowRadius: Spacing,
                        }}
      >
      <Text
              style={{
                fontFamily: Font["poppins-bold"],
                textAlign: "center",
                color:'white',
                fontSize: FontSize.large,
              }}
            >
        تحديث الحساب
      </Text>
      </TouchableOpacity>
      <TouchableOpacity  onPress={() => navigation.navigate("HomePage")} 
                  style={{
                    padding: Spacing * 1.5,
                    backgroundColor: Colors.primary,
                    marginVertical: Spacing * 1,
                    borderRadius: Spacing,
                    shadowColor: Colors.primary,
                    shadowOffset: {
                      width: 0,
                      height: Spacing,
                    },
                    shadowOpacity: 0.3,
                    shadowRadius: Spacing,
                  }}
        > 
      <Text   
              style={{
                fontFamily: Font["poppins-bold"],
                color: 'white',
                textAlign: "center",
                fontSize: FontSize.large,
              }}>
        العودة الى الصفحة الرئيسية
      </Text>
      </TouchableOpacity>
    </View>
  </ScrollView>
  );
}

const styles = StyleSheet.create({});
;

export default AccountManagement;


