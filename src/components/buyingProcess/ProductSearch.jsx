import { Feather } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TextInput, TouchableOpacity, View } from 'react-native'
import useProductStore from '../../store/useProductStore'
import { ProductsStyle } from '../../styles/ProductsStyle'
function ProductSearcher({ products, setShowSearchResults, resetInput }) {
  const { t } = useTranslation()
  const [input, setInput] = useState('')
  const setFilteredProducts = useProductStore(
    (state) => state.setFilteredProducts,
  )

  useEffect(() => {
    handleReset()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetInput])

  useEffect(() => {
    if (input !== '') {
      filterProducts(input)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products])

  const handleInputChange = (query) => {
    setInput(query)

    if (query === '') {
      setShowSearchResults(false)
      setFilteredProducts([])
    } else {
      filterProducts(query)
    }
  }
  const handleReset = () => {
    setShowSearchResults(false)
    setInput('')
    setFilteredProducts([])
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
      <TouchableOpacity style={ProductsStyle.iconSearch} onPress={handleReset}>
        <Feather name="search" size={24} color="#969696" />
      </TouchableOpacity>
    </View>
  )
}

export default ProductSearcher
