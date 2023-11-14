import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import useOrderStore from '../../store/useOrderStore'
import ProductCard from './ProductCards'
import { useTranslation } from 'react-i18next'
import { favoritesBySupplier } from '../../config/urls.config'
import axios from '../../../axiosConfig'
import useTokenStore from '../../store/useTokenStore'

export default function Favorites({ onAmountChange, onUomChange }) {
  const { t } = useTranslation()
  const [favorites, setFavorites] = useState([])
  const { token } = useTokenStore()
  const { selectedSupplier } = useOrderStore()

  const fetchFavorites = async () => {
    const requestBody = {
      supplier_id: selectedSupplier.id,
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
              price.price * product.tax
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
      const uniqueProducts = Array.from(
        new Set(productsWithTax.map((product) => product.id)),
      ).map((id) => productsWithTax.find((product) => product.id === id))

      useOrderStore.setState({ articlesToPay: uniqueProducts })

      setFavorites(uniqueProducts)
    } catch (error) {
      console.error('Error al obtener los productos del proveedor:', error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchFavorites()
      } catch (error) {
        console.error('Error al obtener los favoritos del proveedor:', error)
      }
    }

    fetchData()
  }, [selectedSupplier, token])

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.StyleText}>
        <Text>{t('favorites.findFirstPart')} </Text> {favorites.length}{' '}
        <Text>{t('favorites.findSecondPart')}</Text>
      </Text>
      <View style={{ flex: 1 }}>
        {favorites.map((product) => (
          <ProductCard
            key={product.id}
            productData={product}
            onAmountChange={onAmountChange}
            onUomChange={onUomChange}
            opacity
            reloadFavorites={fetchFavorites}
          />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  StyleText: {
    textAlign: 'center',
    color: '#04444f',
    fontSize: 15,
  },
})
