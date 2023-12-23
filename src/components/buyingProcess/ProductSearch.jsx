import { Feather } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TextInput, TouchableOpacity, View } from 'react-native'
import useProductStore from '../../store/useProductStore'
import { ProductsStyle } from '../../styles/ProductsStyle'
function ProductSearcher() {
  const { t } = useTranslation()
  const [input, setInput] = useState('')
  const setFilteredProducts = useProductStore(
    (state) => state.setFilteredProducts,
  )


  const handleInputChange = (query) => {
    setInput(query)

    if (query === '') {
      setShowSearchResults(false)
      setFilteredProducts([])
    } else {
      filterProducts(query)
    }
  }

  const filterProducts = (query) => {
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase()),
    )
    setShowSearchResults(true)
    setFilteredProducts(filtered)
  }

  return (
    <View style={ProductsStyle.containerSearch}>
      <TextInput
        style={ProductsStyle.BgInput}
        value={input}
        onChangeText={handleInputChange}
        placeholder={t('productSearcher.placeholder')}
        placeholderTextColor="#969696"
      />
      <TouchableOpacity style={ProductsStyle.iconSearch}>
        <Feather name="search" size={24} color="#969696" />
      </TouchableOpacity>
    </View>
  )
}

export default ProductSearcher
