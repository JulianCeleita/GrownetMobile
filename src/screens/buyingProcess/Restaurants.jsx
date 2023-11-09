import {
  SafeAreaView,
  ScrollView,
  ImageBackground,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { availableRestaurants } from '../../config/urls.config'
import { RestaurantStyle } from '../../styles/RestaurantsStyle'
import axios from '../../../axiosConfig.'
import useTokenStore from '../../store/useTokenStore'
import useOrderStore from '../../store/useOrderStore'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const Restaurants = () => {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const { token } = useTokenStore()
  const { restaurants, setRestaurants, setSelectedRestaurant } = useOrderStore()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(availableRestaurants, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setSelectedRestaurant(null)
        setRestaurants(response.data.customersChef)

        if (response.data.customersChef.length === 1) {
          setSelectedRestaurant(response.data.customersChef[0])
          navigation.navigate('suppliers')
        }
      } catch (error) {
        console.error('Error al obtener los restaurantes:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [setRestaurants, setSelectedRestaurant, token, navigation])

  const urlImg = process.env.EXPO_PUBLIC_BASE_IMG

  const onPressAdd = () => {
    navigation.navigate('TabNavigator', { screen: 'Chat' });
  }
  const onPressSuppliers = (restaurant) => {
    setSelectedRestaurant(restaurant)
    navigation.navigate('TabNavigator')
  }

  return (
    <SafeAreaView>
      {!isLoading && (
        <ScrollView contentContainerStyle={RestaurantStyle.restaurants}>
          {restaurants.map((restaurant) => {
            const imageUrl = `${urlImg}${restaurant.image}`

            return (
              <TouchableOpacity
                onPress={() => onPressSuppliers(restaurant)}
                key={restaurant.accountNumber}
              >
                <ImageBackground
                  style={RestaurantStyle.RestaurantBg}
                  source={require('../../../assets/img/backgroundRestaurants.png')}
                >
                  <Image
                    source={{
                      uri: imageUrl,
                    }}
                    style={{ width: 160, height: 160 }}
                  />
                  <Text
                    style={RestaurantStyle.TextDirectionRestaurant}
                    numberOfLines={2}
                    ellipsizeMode="tail"
                  >
                    {restaurant.address}
                  </Text>
                </ImageBackground>
              </TouchableOpacity>
            )
          })}
          <TouchableOpacity
            onPress={onPressAdd}
            style={RestaurantStyle.buttonAddCont}
          >
            <View style={RestaurantStyle.containButtonAdd}>
              <Ionicons
                name="add-circle-outline"
                size={34}
                color="#ffff"
                style={{ padding: 10 }}
              />
              <Text style={RestaurantStyle.textAddRestaurant}>
                {t('restaurants.addRestaurant')}
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      )}
    </SafeAreaView>
  )
}

export default Restaurants
