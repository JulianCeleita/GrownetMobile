import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import useOrderStore from '../../store/useOrderStore'
import ProductCard from './ProductCards'
import { useTranslation } from 'react-i18next'

export default function Favorites({
  fetchFavorites,
  onAmountChange,
  onUomChange,
}) {
  const { t } = useTranslation()

  const { articlesToPay } = useOrderStore()
  const favoriteArticlesToPay = articlesToPay.filter(
    (article) => article.active === 1,
  )

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.StyleText}>
        <Text>{t('favorites.findFirstPart')} </Text>{' '}
        {favoriteArticlesToPay.length}{' '}
        <Text>{t('favorites.findSecondPart')}</Text>
      </Text>
      <View style={{ flex: 1 }}>
        {favoriteArticlesToPay.map((product) => (
          <ProductCard
            key={product.id}
            productData={product}
            onAmountChange={onAmountChange}
            onUomChange={onUomChange}
            fetchFavorites={fetchFavorites}
            opacity
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
