import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { favoritesBySupplier } from '../../config/urls.config'
import useOrderStore from '../../store/useOrderStore'
import ProductCards from '../../components/buyingProcess/ProductCards'
import { useTranslation } from 'react-i18next'
import axios from '../../../axiosConfig'
import useTokenStore from '../../store/useTokenStore'

const Favorites = () => {
  const [favorites, setFavorites] = useState()
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
    const updatedArticlesToPay = favorites.map((article) =>
      article.id === productId ? { ...article, amount: newAmount } : article,
    )

    useOrderStore.setState({ articlesToPay: updatedArticlesToPay })
  }
  // CAMBIO DE UOM DE ARTICULOS (EACH, BOX, KG)
  const handleUomChange = (productId, newUomToPay) => {
    const updatedArticlesToPay = favorites.map((article) => {
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
    <ScrollView>
      <Text style={styles.StyleText}>
        {t('favorites.findFirstPart')}{' '}
        {favorites?.filter((favorite) => favorite.active === 1).length}{' '}
        {t('favorites.findSecondPart')}{' '}
      </Text>
      {favorites
        ?.filter((favorite) => favorite.active === 1)
        .map((favorite) => (
          <View key={favorite.id}>
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
  )
}

export default Favorites
const styles = StyleSheet.create({
  StyleText: {
    textAlign: 'center',
    color: '#04444f',
    fontSize: 15,
  },
})
