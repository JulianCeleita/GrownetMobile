import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { SearchStyle } from '../../styles/SearchStyle'
import { useTranslation } from 'react-i18next'
import useTokenStore from '../../store/useTokenStore'
import useOrderStore from '../../store/useOrderStore'
import axios from '../../../axiosConfig'
import ProductCards from '../../components/buyingProcess/ProductCards'
import { productsSearchApi } from '../../config/urls.config'

function Search() {
  const { t } = useTranslation()
  const { token } = useTokenStore()
  const { articlesToPay, selectedSupplier, selectedRestaurant, categories } =
    useOrderStore()
  const [search, setSearch] = useState('')
  const [productSearch, setProductSearch] = useState([])

  const SearchByName = async () => {
    const requestBody = {
      search: search,
      supplier_id: selectedSupplier.id,
      accountName: selectedRestaurant.accountNumber,
    }

    console.log('requestBody:', requestBody)

    try {
      const response = await axios.post(productsSearchApi, requestBody, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      const defaultProducts = response.data.products

      const productsWithTax = defaultProducts
        .filter((product) => product.prices.some((price) => price.nameUoms))
        .map((product) => {
          const pricesWithTax = product.prices.map((price) => {
            const priceWithTaxCalculation = (
              price.price +
              //To do cambiar a price.tax
              price.price * price.tax
            ).toFixed(2)
            return {
              ...price,
              priceWithTax:
                isNaN(priceWithTaxCalculation) ||
                parseFloat(priceWithTaxCalculation) === 0
                  ? null
                  : priceWithTaxCalculation,
            }
          })

          return {
            ...product,
            amount: 0,
            uomToPay: product.prices[0].nameUoms,
            idUomToPay: product.prices[0].id,
            prices: pricesWithTax,
          }
        })
        .filter((product) =>
          product.prices.some(
            (price) => price.priceWithTax && parseFloat(price.priceWithTax) > 0,
          ),
        )

      setProductSearch(productsWithTax)
    } catch (error) {
      console.error('Error al obtener los productos favoritos:', error)
    }
  }
  useEffect(() => {
    if (search.trim() === '') {
      setProductSearch([])
    } else {
      SearchByName()
    }
  }, [search])
  // CAMBIO DE CANTIDAD DE ARTICULOS
  const handleAmountChange = (productId, newAmount) => {
    setProductSearch((prevArticles) =>
      prevArticles.map((article) =>
        article.id === productId ? { ...article, amount: newAmount } : article,
      ),
    )
    const updatedArticlesToPay = productSearch?.map((article) =>
      article.id === productId ? { ...article, amount: newAmount } : article,
    )

    useOrderStore.setState({ articlesToPay: updatedArticlesToPay })
  }
  // CAMBIO DE UOM DE ARTICULOS (EACH, BOX, KG)
  const handleUomChange = (productId, newUomToPay) => {
    const updatedArticlesToPay = productSearch?.map((article) => {
      if (article.id === productId) {
        const selectedPrice = article.prices.find(
          (price) => price.nameUoms === newUomToPay,
        )
        return {
          ...article,
          uomToPay: newUomToPay,
          idUomToPay: selectedPrice.id,
          priceWithTax: selectedPrice.priceWithTax,
        }
      }
      return article
    })
    setProductSearch(updatedArticlesToPay)
    useOrderStore.setState({ articlesToPay: updatedArticlesToPay })
  }

  function debounce(func, delay) {
    let debounceTimer
    return function (...args) {
      const context = this
      const [text] = args

      if (text !== undefined && text.trim()) {
        console.log('se ejecuto debounce')
        clearTimeout(debounceTimer)
        debounceTimer = setTimeout(() => func.apply(context, args), delay)
      } else {
        setProductSearch([])
      }
    }
  }

  const debouncedHandleReset = debounce(SearchByName, 1000)

  const handleSearchChange = (text) => {
    setSearch(text)
    if (!text.trim()) {
      setProductSearch([])
    } else {
      debouncedHandleReset(text)
    }
    console.log('search', search)
  }

  return (
    <View style={SearchStyle.search}>
      <View style={SearchStyle.topSearch}>
        <View style={SearchStyle.containerSearch}>
          <TextInput
            style={SearchStyle.BgInput}
            value={search}
            placeholder={t('search.placeholder')}
            placeholderTextColor="#969696"
            onChangeText={handleSearchChange}
          />
          <TouchableOpacity
            style={SearchStyle.iconSearch}
            onPress={SearchByName}
          >
            <Feather name="search" size={24} color="#969696" />
          </TouchableOpacity>
        </View>
      </View>
      {productSearch.length === 0 && (
        <View>
          <View style={SearchStyle.suggestion}>
            <Text style={SearchStyle.tittle}>{t('search.title')} 🔍</Text>
          </View>
          <View style={SearchStyle.image}>
            <MaterialCommunityIcons
              name="store-search-outline"
              size={200}
              color="#D9D9D9"
            />
            <Text style={SearchStyle.text}>{t('search.text')}</Text>
          </View>
        </View>
      )}

      {productSearch.length > 0 && (
        <ScrollView style={{ marginTop: 10 }}>
          {productSearch.map((product) => (
            <ProductCards
              key={product.id}
              productData={product}
              onAmountChange={handleAmountChange}
              onUomChange={handleUomChange}
            />
          ))}
        </ScrollView>
      )}
    </View>
  )
}

export default Search