import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { favoritesBySupplier } from '../../config/urls.config'
import useOrderStore from '../../store/useOrderStore'
import ProductCards from '../../components/buyingProcess/ProductCards'
import { useTranslation } from 'react-i18next'
import axios from '../../../axiosConfig'
import useTokenStore from '../../store/useTokenStore'
import { FavoritesStyle } from '../../styles/FavoritesStyle'
import { GlobalStyles } from '../../styles/Styles'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const Favorites = () => {
  const [favorites, setFavorites] = useState()
  const navigation = useNavigation()
  const { t } = useTranslation()
  const { token } = useTokenStore()

  const { articlesToPay, selectedSupplier, selectedRestaurant, categories } =
    useOrderStore()
  console.log('articlesToPay', articlesToPay)

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
          console.log('isValidProduct', isValidProduct)
          return isValidProduct
        })

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
    useOrderStore.setState({ articlesToPay: updatedArticlesToPay })
  }

  return (
    <SafeAreaView style={FavoritesStyle.favorites}>
      <ScrollView>
        {favorites?.length > 0 && (
          <View>
            <Text style={styles.StyleText}>
              {t('favorites2.findFirstPart')}{' '}
              {favorites?.filter((favorite) => favorite.active === 1).length}{' '}
              {t('favorites2.findSecondPart')}{' '}
            </Text>
          </View>
        )}

        {favorites?.length === 0 && (
          <View style={[FavoritesStyle.card, GlobalStyles.boxShadow]}>
            <View style={styles.container}>
              <Ionicons name="md-heart-circle" size={65} color="#62C471" />
              <Text style={FavoritesStyle.tittle}>
                {t('favorites.titleCard')}
              </Text>
              <Text style={FavoritesStyle.text}>{t('favorites.text')}</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('products')}
                style={[GlobalStyles.btnPrimary, { width: 200 }]}
              >
                <Text style={GlobalStyles.textBtnSecundary}>
                  {t('favorites.buttonText')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {favorites?.map((favorite) => (
          <View key={favorite.id} style={{ marginTop: 10 }}>
            <ProductCards
              key={favorite.id}
              productData={favorite}
              onAmountChange={handleAmountChange}
              onUomChange={handleUomChange}
              //   fetchProducts={fetchProducts}
              //   currentPage={currentPage}
              fetchFavorites={fetchFavorites}
              opacity
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
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
