import { Feather, MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SearchStyle } from '../../styles/SearchStyle'
import { useTranslation } from 'react-i18next'

function Search() {
  const { t, i18n } = useTranslation()

  const [input, setInput] = useState('')
  const handleReset = () => {
    setInput('')
  }
  return (
    <View style={SearchStyle.search}>
      <View style={SearchStyle.topSearch}>
        <View style={SearchStyle.containerSearch}>
          <TextInput
            style={SearchStyle.BgInput}
            value={input}
            placeholder={t('search.placeholder')}
            placeholderTextColor="#969696"
          />
          <TouchableOpacity
            style={SearchStyle.iconSearch}
            onPress={handleReset}
          >
            <Feather name="search" size={24} color="#969696" />
          </TouchableOpacity>
        </View>
      </View>
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
  )
}

export default Search
