import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FavoritesStyle } from '../../styles/FavoritesStyle'
import { GlobalStyles } from '../../styles/Styles'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'

const Favorites = () => {
  const navigation = useNavigation()
  const { t, i18n } = useTranslation()

  return (
    <SafeAreaView style={FavoritesStyle.favorites}>
      <View>
        <View style={[FavoritesStyle.card, GlobalStyles.boxShadow]}>
          <Ionicons name="md-heart-circle" size={65} color="#62C471" />
          <Text style={FavoritesStyle.tittle}>{t('favorites.titleCard')}</Text>
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
    </SafeAreaView>
  )
}

export default Favorites
