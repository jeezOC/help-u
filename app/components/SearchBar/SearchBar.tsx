import React, { useState } from "react";
import { TextInput } from "react-native-paper";
import { View } from "react-native";
import Icon from "../Icon/Icon";
import { AppColors, AppFonts, AppTextSizes } from "../../styles/AppTheme";

const SearchBar = () => {

  const [input, setInput] = useState('');
  console.log(input);

  return (
    <View>
      <View
        style={{
          margin: 15,
          width: "90%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            width: '100%',
            height: 'auto',
            backgroundColor: AppColors.gray,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: AppColors.gray,
            borderRadius: 10,
            paddingLeft: 30,
            paddingRight: 30,
          }}
        >
          <Icon
            iconName="search"
            iconSize="md"
          />
          <TextInput
            value={input}
            onChangeText={(text) => setInput(text)}
            underlineColor="transparent"
            style={{ 
              fontSize: AppTextSizes.sm,
              fontFamily: AppFonts.ligth,
              color: AppColors.notBlack,
              backgroundColor: "transparent", 
              width: "100%", }}
            placeholder="Buscar" />
        </View>
      </View>
    </View>
  )
};

export default SearchBar