import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FavoritesStyle } from '../../styles/FavoritesStyle'
import { GlobalStyles } from '../../styles/Styles'

const Favorites = () => {
  return (
    <SafeAreaView style={FavoritesStyle.favorites}>
      <View>
        <Text>Tus favoritos</Text>
      </View>
      <View style={[FavoritesStyle.card, GlobalStyles.boxShadow]}>
        <Text style={FavoritesStyle.tittle}>Todavía no tienes favoritos</Text>
        <Text style={FavoritesStyle.text}>
          Navega por productos y escoge tus favoritos seleccionando el icono del
          corazón
        </Text>
        <TouchableOpacity style={[GlobalStyles.btnPrimary, { width: 200 }]}>
          <Text style={GlobalStyles.textBtnSecundary}>Ir a productos</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Favorites
