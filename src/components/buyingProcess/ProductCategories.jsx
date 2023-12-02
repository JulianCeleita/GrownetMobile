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
import useTokenStore from '../../store/useTokenStore'
import { allCategories } from '../../config/urls.config'
import axios from '../../../axiosConfig'
import { ProductsStyle } from '../../styles/ProductsStyle'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { LinearGradient } from 'expo-linear-gradient'
import useOrderStore from '../../store/useOrderStore'

const { width } = Dimensions.get('window')

function ProductsCategories({
  showFavorites,
  toggleShowFavorites,
  filterCategory,
  selectedCategory,
  toggleShowFavorites2,
}) {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const isCarousel = useRef(null)
  const [categories, setCategories] = useState([])
  const { token } = useTokenStore()
  const { selectedSupplier } = useOrderStore()

  useEffect(() => {
    axios
      .get(`${allCategories}${selectedSupplier.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCategories(response.data.categories)
      })
      .catch((error) => {
        console.error('Error al obtener los datos de la API:', error)
      })
  }, [selectedSupplier, token])

  const categoriesList = categories.map((e) => e.name)
  const updatedCategories = ['All', ...categoriesList, 'Favorites']

  const renderItem = ({ item, index }) => {
    const isCurrentItem = index === isCarousel.current.currentIndex
    return (
      <View>
        {item === 'Favorites' && showFavorites ? (
          <TouchableOpacity onPress={toggleShowFavorites2} activeOpacity={0.9}>
            <Text style={ProductsStyle.buttonCategory2}>{t('categoriesMenu.goBack')}</Text>
          </TouchableOpacity>
        ) : item === 'Favorites' ? (
          <TouchableOpacity onPress={toggleShowFavorites} activeOpacity={0.9}>
            <Text style={ProductsStyle.buttonCategory}>{t('categoriesMenu.favorites')}</Text>
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity
          key={item}
          onPress={() => filterCategory('All', item)}
          activeOpacity={0.9}
        >
          {item === 'All' && (
            <Text
              style={
                selectedCategory === 'All' && !showFavorites
                  ? ProductsStyle.buttonCategory2
                  : ProductsStyle.buttonCategory
              }
            >
              All
            </Text>
          )}
        </TouchableOpacity>
        {categories?.map((categoryApi) => (
          <TouchableOpacity
            key={categoryApi.id}
            onPress={() => filterCategory(categoryApi.name, categoryApi.id)}
            activeOpacity={0.9}
          >
            {item === categoryApi.name && (
              <>
                <Text
                  style={
                    selectedCategory === categoryApi.name && !showFavorites
                      ? ProductsStyle.buttonCategory2
                      : ProductsStyle.buttonCategory
                  }
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
        end={[0.5, 0.2]}
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
