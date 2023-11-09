import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { GlobalStyles } from '../../styles/Styles'
import { Dropdown } from 'react-native-element-dropdown'
import SelectQuantity from './SelectQuantity'
import { useFavoritesStore } from '../../store/useFavoriteStore'
import { ProductsStyle } from '../../styles/ProductsStyle'

const ProductCards = ({ productData, onAmountChange, onUomChange }) => {
  const { id, name, image, prices, uomToPay } = productData

  const [isFocus, setIsFocus] = useState(false)
  const { favorites, addFavorite, removeFavorite } = useFavoritesStore()
  const isFavorite = favorites.includes(id, name, image)
  const counter = 0

  const urlImg = process.env.EXPO_PUBLIC_BASE_IMG
  const selectedUom = prices.find((price) => price.nameUoms === uomToPay)

  const handleToggleFavorite = () => {
    if (isFavorite) {
      console.log('remove', id)
      removeFavorite(id)
    } else {
      console.log('add  ', id)
      addFavorite(id)
    }
  }

  function handleUomToPayChange(event) {
    console.log('newUomToPay:', event)
    try {
      const { nameUoms } = event
      onUomChange(id, nameUoms)
    } catch (error) {
      console.error('Error al procesar la promesa:', error)
    }
  }

  return (
    <View style={{ alignItems: 'center', width: '100%' }}>
      <View style={[ProductsStyle.container, GlobalStyles.boxShadow]}>
        <View style={ProductsStyle.containerImage}>
          <Image
            source={{ uri: urlImg + image }}
            style={ProductsStyle.ImageCardProduct}
            resizeMode="contain"
          />
        </View>
        <View>
          <View style={ProductsStyle.containName}>
            <View>
              <Text style={ProductsStyle.textName}>{name}</Text>
              <Text style={ProductsStyle.textName1}>{selectedUom.name}</Text>
              <Text style={ProductsStyle.textPrice}>
                £{selectedUom.priceWithTax}
              </Text>
            </View>

            <TouchableOpacity onPress={handleToggleFavorite}>
              <Icon
                name={isFavorite ? 'heart' : 'heart-o'}
                size={24}
                color="#62C471"
                style={{ marginTop: 5 }}
              />
            </TouchableOpacity>
          </View>
          <View style={ProductsStyle.containerSelect}>
            <SelectQuantity
              productData={productData}
              onAmountChange={onAmountChange}
              counter={counter}
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
          </View>
        </View>
      </View>
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
