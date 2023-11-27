import React from 'react';
import { ScrollView, View, Image, Text, StyleSheet } from 'react-native';
import SearchBar from '../components/SearchBar/SearchBar';
import { AppColors, AppTextSizes, AppFonts } from '../styles/AppTheme';

const Search = () => {
  return (
    <ScrollView>
      <View style={styles.container} >
        <View style={styles.headerContainer}>
          <View style={styles.titleContainer}>
            <Image
              source={require('../../assets/favicon.png')}
              onError={(e) => console.log(e)}
              style={styles.image}
            />
            <Text style={styles.title} >
              Búsqueda de eventos
            </Text>
          </View>
        </View>
        <SearchBar></SearchBar>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: AppColors.background,
  },
  image: {
    height: 30,
    width: 30,
    objectFit: 'contain',
    resizeMode: 'contain',
    marginRight: 5,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: AppTextSizes.lg,
    fontFamily: AppFonts.bold,
    color: AppColors.greenSolid,
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 5,
  }
});

export default Search;