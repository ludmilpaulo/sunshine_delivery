import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, ActivityIndicator, TextInput } from 'react-native';
import HeaderTabs from '../components/HeaderTabs';
import Screen from '../components/Screen'
import Categories from '../components/Categories'
import RestaurantItem from '../components/RestaurantItem'
import tailwind from 'tailwind-react-native-classnames';
import { Ionicons } from '@expo/vector-icons';
import colors from '../configs/colors'
import * as Location from 'expo-location';
import Geocoder from 'react-native-geocoding'



const HomeScreen = () => {
    const [restaurantData, setRestaurantData] = useState([{}]);
    const [search, setSearch] = useState('');
    const [filteredDataSource, setFilteredDataSource] = useState([]);
    const [masterDataSource, setMasterDataSource] = useState([]);
    const [activeTab, setActiveTab] = useState("Delivery");
    const [loading, setLoading] = useState(false)
    


   useEffect(() => {
      fetch('https://www.sunshinedeliver.com/api/customer/restaurants/')
        .then((response) => response.json())
        .then((responseJson) => {
          setRestaurantData(responseJson.restaurants);
          setFilteredDataSource(responseJson.restaurants);
          setMasterDataSource(responseJson.restaurants);
         
        })
        .catch((error) => {
          console.error(error);
        });
    }, 
    []);

      console.log('data do rest ',restaurantData);
    ///******************************Procurar************************* */
      const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
          // Inserted text is not blank
          // Filter the masterDataSource and update FilteredDataSource
          const newData = masterDataSource.filter(function (item) {
            // Applying filter for the inserted text in search bar
            const itemData = item.name
              ? item.name.toUpperCase()
              : ''.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
          });
          setFilteredDataSource(newData);
          setSearch(text);
        } else {
          // Inserted text is blank
          // Update FilteredDataSource with restaurantData
          setFilteredDataSource(masterDataSource);
          setSearch(text);
        }
      };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };


    

    ///******************************************************************* */

    

    return (
        <Screen style={tailwind`bg-white flex-1`}>
            <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
             <View style={tailwind`mt-2 mx-4 mb-1 relative justify-center`}>
            <Ionicons name="search-sharp" size={20} color="#B1B1B3" style={tailwind`absolute left-4 z-10 self-center`} />
            <TextInput style={[tailwind`rounded-full py-2 px-5 pl-10 bg-gray-100`, styles.input]}
            onChangeText={(text) => searchFilterFunction(text)}
            value={search} 
            placeholder="Pesquisar restaurantes" />
        </View>
         
            <ScrollView style={tailwind`flex-1`} showsVerticalScrollIndicator={false}>
                <Categories />
                {loading && <ActivityIndicator size="large" color={colors.primary} style={tailwind`mt-2 mb-6`} />}
                <RestaurantItem restaurantData={filteredDataSource} />
            </ScrollView>
        </Screen>
    );
}
const styles = StyleSheet.create({
    input: {
        borderColor: colors.medium,
        borderWidth: 1,
    },
})

export default HomeScreen;
