import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Ionicons } from '@expo/vector-icons';
import axios from '../../../axiosConfig';
import { allCategories } from '../../config/urls.config';
import useOrderStore from '../../store/useOrderStore';
import useTokenStore from '../../store/useTokenStore';
import { ProductsStyle } from '../../styles/ProductsStyle';

const { width } = Dimensions.get('window');

function ProductsCategories({
  showFavorites,
  toggleShowFavorites,
  filterCategory,
  selectedCategory,
  toggleShowFavorites2,
}) {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const isCarousel = useRef(null);
  const [categories, setCategories] = useState([]);
  const { token } = useTokenStore();
  const { selectedSupplier } = useOrderStore();
  

  useEffect(() => {
    axios
      .get(`${allCategories}${selectedSupplier.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCategories(response.data.categories);
      })
      .catch((error) => {
        console.error('Error al obtener los datos de la API:', error);
      });
  }, [selectedSupplier, token]);

  const categoriesList = categories.map((e) => e.name);
  const updatedCategories = ['All', ...categoriesList];

  const renderItem = ({ item }) => {
    if (item === 'Favorites' && showFavorites) {
      return (
        <TouchableOpacity onPress={toggleShowFavorites2} activeOpacity={0.9}>
          <Text style={ProductsStyle.buttonCategory2}>
            {t('categoriesMenu.goBack')}
          </Text>
        </TouchableOpacity>
      );
    } else if (item === 'Favorites') {
      return (
        <TouchableOpacity onPress={toggleShowFavorites} activeOpacity={0.9}>
          <Text style={ProductsStyle.buttonCategory}>
            {t('categoriesMenu.favorites')}
          </Text>
        </TouchableOpacity>
      );
    } else if (item === 'All') {
      return (
        <TouchableOpacity
          key={item}
          onPress={() => filterCategory('All', item)}
          activeOpacity={0.9}
        >
          <Text
            style={
              selectedCategory === 'All' && !showFavorites
                ? ProductsStyle.buttonCategory2
                : ProductsStyle.buttonCategory
            }
          >
            {t('categoriesMenu.all')}
          </Text>
        </TouchableOpacity>
      );
    } else {
      const categoryApi = categories.find(category => category.name === item);
      if (categoryApi) {
        return (
          <TouchableOpacity
            key={categoryApi.id}
            onPress={() => filterCategory(categoryApi.name, categoryApi.id)}
            activeOpacity={0.9}
          >
            <Text
              style={
                selectedCategory === categoryApi.name && !showFavorites
                  ? ProductsStyle.buttonCategory2
                  : ProductsStyle.buttonCategory
              }
            >
              {categoryApi.name}
            </Text>
          </TouchableOpacity>
        );
      }
    }
    return null;
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={ProductsStyle.fixedContainer}>
      {/* Flecha para regresar */}
      <TouchableOpacity
        style={[ProductsStyle.backButton, { marginTop: 20, marginLeft: 15 }]}
        onPress={handleGoBack}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <View style={ProductsStyle.categoriesMenu}>
        {/* Carousel */}
        <Carousel
          data={updatedCategories}
          renderItem={renderItem}
          sliderWidth={width}
          itemWidth={width / 2.5}
          autoplay={false}
          loop={true}
          layout="default"
          useScrollView={true}
          ref={isCarousel}
          scrollEnabled={true}
          enableSnap={true}
          inactiveSlideOpacity={1}
          firstItem={0}
        />
      </View>
    </SafeAreaView>
  );
}

export default ProductsCategories;
