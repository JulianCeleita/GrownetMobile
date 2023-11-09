import React, { useEffect, useRef, useState } from 'react'
import {
  View,
  Dimensions,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Text,
} from 'react-native'
import Carousel from 'react-native-snap-carousel'
import { GlobalStyles, ProductsStyles } from '../../styles/Styles'
import { MaterialIcons } from '@expo/vector-icons'
import { Iconify } from 'react-native-iconify'
import useTokenStore from '../../store/useTokenStore'
import { allCategories } from '../../config/urls.config'
import axios from '../../../axiosConfig'
import { ProductsStyle } from '../../styles/ProductsStyle'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { LinearGradient } from 'expo-linear-gradient'

const { width } = Dimensions.get('window')

function ProductsCategories({
  showFavorites,
  toggleShowFavorites,
  categoriesProduct,
  filterCategory,
  selectedCategory,
}) {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const isCarousel = useRef(null)
  const [categories, setCategories] = useState()
  const { token } = useTokenStore()

  const isCategoryActive = (category) => {
    if (
      category === selectedCategory ||
      (category === 'All' && selectedCategory === 'All')
    ) {
      return true
    }
    return false
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(allCategories, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setCategories(response.data.categories)
      } catch (error) {
        console.error('Error al obtener los datos de la API:', error)
      }
    }
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const urlImg = process.env.EXPO_PUBLIC_BASE_IMG
  const updatedCategories = [...categoriesProduct, 'Favorites']

  const renderItem = ({ item }) => {
    return (
      <View
        style={[
          ProductsStyle.contenImage,
          isCategoryActive(item) && ProductsStyle.activeCategory,
        ]}
      >
        {item === 'Favorites' && showFavorites ? (
          <TouchableOpacity onPress={toggleShowFavorites}>
            <Text>Favorites</Text>
          </TouchableOpacity>
        ) : item === 'Favorites' ? (
          <TouchableOpacity onPress={toggleShowFavorites}>
            <Text>Favorites</Text>
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity
          key={item}
          onPress={() => filterCategory('All', item)}
        >
          {item === 'All' && <Text>All</Text>}
        </TouchableOpacity>
        {categories?.map((categoryApi) => (
          <TouchableOpacity
            key={categoryApi.id}
            onPress={() => filterCategory(categoryApi.name, categoryApi.id)}
          >
            {item === categoryApi.name && (
              <>
                <Text
                  style={[
                    ProductsStyle.text,
                    isCategoryActive(item) && ProductsStyle.activeCategory,
                  ]}
                >
                  {categoryApi.name}
                </Text>
              </>
            )}
          </TouchableOpacity>
        ))}
      </View>
    )
  }
  const handlePress = () => {
    navigation.navigate('ordersDetail')
  }
  return (
    <SafeAreaView style={ProductsStyle.fixedContainer}>
      <LinearGradient
        colors={['rgba(255, 255, 255, 0)', 'white']}
        start={[0.5, 0.1]}
        end={[0.5, 0.5]}
      >
        <Carousel
          data={updatedCategories}
          renderItem={renderItem}
          sliderWidth={width}
          itemWidth={width / 3}
          autoplay={true}
          loop={true}
          layout="default"
          useScrollView={true}
          ref={isCarousel}
          scrollEnabled={true}
          enableSnap={true}
          inactiveSlideOpacity={1}
        />
        <View style={ProductsStyle.containerButton}>
          <TouchableOpacity
            style={GlobalStyles.btnPrimary}
            onPress={handlePress}
          >
            <Text style={ProductsStyle.textButton}>
              {t('categoriesMenu.continue')}
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  )
}
export default ProductsCategories
