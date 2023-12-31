import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  FlatList,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from '../../../axiosConfig'
import ProductCards from '../../components/buyingProcess/ProductCards'
import { favoritesBySupplier } from '../../config/urls.config'
import useOrderStore from '../../store/useOrderStore'
import useTokenStore from '../../store/useTokenStore'
import { FavoritesStyle } from '../../styles/FavoritesStyle'
import { GlobalStyles } from '../../styles/Styles'

const Favorites = () => {
  const [favorites, setFavorites] = useState()
  const navigation = useNavigation()
  const { t } = useTranslation()
  const { token } = useTokenStore()

  const { articlesToPay, selectedSupplier, selectedRestaurant, categories } =
    useOrderStore()

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchFavorites()
      } catch (error) {
        console.error('Error al obtener los productos favoritos:', error)
      }
    }

    fetchData()
  }, [])

  const fetchFavorites = async () => {
    const requestBody = {
      supplier_id: selectedSupplier.id,
      accountNumber: selectedRestaurant.accountNumber,
    }

    try {
      const response = await axios.post(favoritesBySupplier, requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const defaultFavorites = response.data.favorites

      const productsWithTax = defaultFavorites
        .filter((product) => product.prices.some((price) => price.nameUoms))
        .map((product) => {
          const pricesWithTax = product.prices.map((price) => {
            const priceWithTaxCalculation = (
              price.price +
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
        .filter((product) => {
          const isValidProduct = product.prices.some(
            (price) => price.priceWithTax && parseFloat(price.priceWithTax) > 0,
          )
          return isValidProduct
        })
        .map((product) => {
          const existingProduct = articlesToPay.find(
            (prevProduct) => prevProduct.id === product.id,
          )

          return existingProduct || product
        })
        .filter(
          (product, index, self) =>
            index === self.findIndex((t) => t.id === product.id),
        )

      setFavorites(productsWithTax)
    } catch (error) {
      console.error('Error al obtener los productos favoritos:', error)
    }
  }
  // CAMBIO DE CANTIDAD DE ARTICULOS
  const handleAmountChange = (productId, newAmount) => {
    setFavorites((prevArticles) =>
      prevArticles.map((article) =>
        article.id === productId ? { ...article, amount: newAmount } : article,
      ),
    )

    const currentArticlesToPay = articlesToPay

    const productExists = currentArticlesToPay.some(
      (article) => article.id === productId,
    )

    const product = favorites.find((article) => article.id === productId)

    if (productExists) {
      useOrderStore.setState((prevState) => ({
        articlesToPay: prevState.articlesToPay.map((article) =>
          article.id === productId && newAmount > 0
            ? { ...product, amount: newAmount }
            : article,
        ),
      }))
    } else if (newAmount > 0) {
      useOrderStore.setState((prevState) => ({
        articlesToPay: [
          ...prevState.articlesToPay,
          { ...product, amount: newAmount },
        ],
      }))
    }
  }

  // CAMBIO DE UOM DE ARTICULOS (EACH, BOX, KG)
  const handleUomChange = (productId, newUomToPay) => {
    const updatedArticlesToPay = favorites?.map((article) => {
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
    setFavorites(updatedArticlesToPay)
  }

  return (
    <View style={FavoritesStyle.favorites}>
      {favorites?.length === 0 && (
        <View style={[FavoritesStyle.card, GlobalStyles.boxShadow]}>
          <Ionicons name="md-heart-circle" size={65} color="#62C471" />
          <Text style={FavoritesStyle.tittle}>{t('favorites.titleCard')}</Text>
          <Text style={FavoritesStyle.text}>{t('favorites.text')}</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Orders')
            }}
            style={[GlobalStyles.btnPrimary, { width: 200 }]}
          >
            <Text style={GlobalStyles.textBtnSecundary}>
              {t('favorites.buttonText')}
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {favorites?.length > 0 &&
        (Platform.OS === 'ios' ? (
          <FlatList
            data={favorites}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ProductCards
                key={item.id}
                productData={item}
                onAmountChange={handleAmountChange}
                onUomChange={handleUomChange}
                fetchFavorites={fetchFavorites}
                opacity
              />
            )}
            contentContainerStyle={{ marginTop: 10 }}
          />
        ) : (
          <ScrollView style={{ marginTop: 10 }}>
            {favorites?.map((favorite) => (
              <ProductCards
                key={favorite.id}
                productData={favorite}
                onAmountChange={handleAmountChange}
                onUomChange={handleUomChange}
                fetchFavorites={fetchFavorites}
                opacity
              />
            ))}
          </ScrollView>
        ))}
    </View>
  )
}

export default Favorites

const styles = StyleSheet.create({
  StyleText: {
    textAlign: 'center',
    color: '#04444f',
    fontSize: 15,
    fontFamily: 'PoppinsRegular',
    marginTop: 0,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
