import React, { useState, useCallback } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { GlobalStyles } from '../../styles/Styles'
import { Dropdown } from 'react-native-element-dropdown'
import SelectQuantity from './SelectQuantity'
import axios from '../../../axiosConfig'
import { ProductsStyle } from '../../styles/ProductsStyle'
import { addFavorites } from '../../config/urls.config'
import useOrderStore from '../../store/useOrderStore'
import useTokenStore from '../../store/useTokenStore'
import ModalStepper from './ModalStepper'

const ProductCards = ({
  productData,
  onAmountChange,
  onUomChange,
  opacity,
  fetchFavorites,
  fetchProducts,
  currentPage,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const { id, name, image, prices, uomToPay, active } = productData

  const { selectedSupplier, selectedRestaurant } = useOrderStore()
  const { token } = useTokenStore()
  const [isFocus, setIsFocus] = useState(false)

  const [productState, setProductState] = useState({
    isFavorite: active === 1,
    isFavoritePending: false,
    isBeingUpdated: false,
  })
  const handleToggleFavorite = useCallback(async () => {
    if (productState.isFavoritePending) return

    try {
      setProductState((prevState) => ({
        ...prevState,
        isFavoritePending: true,
      }))

      const newFavoriteState = !productState.isFavorite

      setProductState((prevState) => ({
        ...prevState,
        isFavorite: newFavoriteState,
        isBeingUpdated: !newFavoriteState,
      }))

      const requestData = {
        customer_id: selectedRestaurant.accountNumber,
        product_id: productData.id,
        supplier_id: selectedSupplier.id,
        active: newFavoriteState ? 1 : 0,
      }

      const response = await axios.post(addFavorites, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setProductState((prevState) => ({
        ...prevState,
        isFavoritePending: false,
      }))
      if (opacity) {
        await fetchFavorites()
      } else {
        await fetchProducts(currentPage)
      }
    } catch (error) {
      setProductState((prevState) => ({
        ...prevState,
        isFavorite: !prevState.isFavorite,
        isFavoritePending: false,
        isBeingUpdated: false,
      }))

      console.error('Error al gestionar el favorito:', error)
    }
  }, [
    productData,
    productState.isFavorite,
    productState.isFavoritePending,
    selectedRestaurant.accountNumber,
    selectedSupplier.id,
    token,
    fetchFavorites,
    fetchProducts,
    currentPage,
  ])

  const handleUomToPayChange = useCallback(
    (event) => {
      try {
        const { nameUoms } = event
        onUomChange(id, nameUoms)
      } catch (error) {
        console.error('Error al procesar la promesa:', error)
      }
    },
    [id, onUomChange],
  )
  const imageUrl =
    'https://static.vecteezy.com/system/resources/previews/025/064/813/original/broccoli-with-ai-generated-free-png.png'
  return (
    <View style={{ alignItems: 'center', width: '100%' }}>
      <View
        style={[
          ProductsStyle.container,
          GlobalStyles.boxShadow,
          opacity && productState.isBeingUpdated ? { opacity: 0.5 } : null,
        ]}
      >
        <TouchableOpacity
          style={ProductsStyle.containerImage}
          onPress={() => setIsModalVisible(true)}
        >
          <Image
            source={{ uri: imageUrl }}
            style={ProductsStyle.ImageCardProduct}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <View>
          <View style={ProductsStyle.containName}>
            <TouchableOpacity onPress={() => setIsModalVisible(true)}>
              <Text style={ProductsStyle.textName}>
                {name}{' '}
                {prices.find((price) => price.nameUoms === uomToPay).name}
              </Text>
              <Text style={ProductsStyle.textPrice}>
                £
                {
                  prices.find((price) => price.nameUoms === uomToPay)
                    .priceWithTax
                }
              </Text>
            </TouchableOpacity>
            <View style={{ alignItems: 'center' }}>
              <TouchableOpacity onPress={handleToggleFavorite}>
                <Icon
                  name={productState.isFavorite ? 'heart' : 'heart-o'}
                  size={24}
                  color="#62C471"
                  style={{ marginTop: 5 }}
                />
              </TouchableOpacity>
              <View style={ProductsStyle.quantity}>
                <Text style={ProductsStyle.textQuantity}>100</Text>
              </View>
            </View>
          </View>
          {/*<View style={ProductsStyle.containerSelect}>
            <SelectQuantity
              productData={productData}
              onAmountChange={onAmountChange}
              counter={0}
            />
            <View style={ProductsStyle.containerDrop}>
              <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: '#04444f' }]}
                containerStyle={{ borderRadius: 20 }}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={prices}
                maxHeight={200}
                labelField="nameUoms"
                valueField="nameUoms"
                placeholder={!isFocus ? uomToPay : '...'}
                value={uomToPay}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={handleUomToPayChange}
              />
            </View>
          </View>*/}
        </View>
      </View>
      {isModalVisible && (
        <ModalStepper
          setIsModalVisible={setIsModalVisible}
          name={name}
          prices={prices}
          uomToPay={uomToPay}
          isFocus={isFocus}
          setIsFocus={setIsFocus}
          handleUomToPayChange={handleUomToPayChange}
          //Variables selectQuantity
          productData={productData}
          onAmountChange={onAmountChange}
          counter={0}
        />
      )}
    </View>
  )
}

export default ProductCards

const styles = StyleSheet.create({
  dropdown: {
    height: 45,
    borderColor: '#f2f2f2',
    borderWidth: 1.5,
    borderRadius: 51,
    paddingHorizontal: 8,
  },

  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#04444f',
    fontFamily: 'PoppinsMedium',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#04444f',
    fontFamily: 'PoppinsMedium',
  },
})
