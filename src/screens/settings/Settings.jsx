import { AntDesign, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React, { useState, useRef } from 'react'
import { SafeAreaView, TouchableOpacity, View, Animated } from 'react-native'
import { Card, Text } from 'react-native-paper'
import useTokenStore from '../../store/useTokenStore'
import { SettingsStyle } from '../../styles/SettingsStyle'
import AccordionListItem from './AccordionListItem'
import { Iconify } from 'react-native-iconify'
import { useTranslation } from 'react-i18next'
import { GlobalStyles } from '../../styles/Styles'

const Settings = () => {
  const { t, i18n } = useTranslation()
  const navigation = useNavigation()
  const { setToken } = useTokenStore()

  const [isListOpen, setListOpen] = useState(false)
  const logoutButtonPosition = useRef(new Animated.Value(0)).current

  const changeLanguage = (language) => {
    i18n.changeLanguage(language)
  }

  const handleListToggle = () => {
    setListOpen(!isListOpen)
    Animated.timing(logoutButtonPosition, {
      toValue: isListOpen ? 0 : 110,
      duration: 300,
      useNativeDriver: false,
    }).start()
  }

  const handleLogout = async () => {
    try {
      setToken(null)
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
    }
  }
  const navigateTermnsAndConditions = () => {
    navigation.navigate('Terms&Conditions')
  }

  const onPressAdd = () => {
    navigation.navigate('Chat')
  }

  return (
    <SafeAreaView style={SettingsStyle.settings}>
      <Text style={SettingsStyle.tittle}>{t('settings.hi')} 👋</Text>
      <Text style={SettingsStyle.subtittle}>{t('settings.helpText')}</Text>
      <TouchableOpacity onPress={onPressAdd}>
        <Card style={SettingsStyle.card}>
          <Card.Content style={SettingsStyle.card1}>
            <View>
              <Text variant="titleLarge" style={SettingsStyle.txtCard}>
                {t('settings.restaurants')}
              </Text>
              <Text variant="bodyMedium" style={SettingsStyle.txtCard2}>
                {t('settings.editRestaurants')}
              </Text>
            </View>
            <Ionicons name="add-circle-outline" size={45} color="#ffff" />
          </Card.Content>
        </Card>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressAdd}>
        <Card style={SettingsStyle.card}>
          <Card.Content style={SettingsStyle.card1}>
            <View>
              <Text variant="titleLarge" style={SettingsStyle.txtCard}>
                {t('settings.suppliers')}
              </Text>
              <Text variant="bodyMedium" style={SettingsStyle.txtCard2}>
                {t('settings.editSuppliers')}
              </Text>
            </View>
            <Ionicons name="add-circle-outline" size={45} color="#ffff" />
          </Card.Content>
        </Card>
      </TouchableOpacity>
      <View style={[SettingsStyle.settingButton, GlobalStyles.boxShadow]}>
        <AccordionListItem
          title={t('settings.languages')}
          onListToggle={handleListToggle}
        >
          <View style={SettingsStyle.itemsAccordion}>
            <Iconify icon="circle-flags:uk" size={20} />
            <Text
              style={SettingsStyle.Languages}
              onPress={() => changeLanguage('en')}
            >
              {t('settings.english')}
            </Text>
          </View>
          <View style={SettingsStyle.itemsAccordion}>
            <Iconify icon="circle-flags:es" size={20} />
            <Text
              style={SettingsStyle.Languages}
              onPress={() => changeLanguage('es')}
            >
              {t('settings.spanish')}
            </Text>
          </View>
          <View style={SettingsStyle.itemsAccordion}>
            <Iconify icon="circle-flags:pt" size={20} />
            <Text
              style={SettingsStyle.Languages}
              onPress={() => changeLanguage('pt')}
            >
              {t('settings.portuguese')}
            </Text>
          </View>
        </AccordionListItem>
      </View>
      <Animated.View style={{ marginTop: logoutButtonPosition }}>
        <View
          style={[SettingsStyle.containerFaqAndTerms, GlobalStyles.boxShadow]}
        >
          <TouchableOpacity style={SettingsStyle.FaqAndTerms}>
            <Text style={SettingsStyle.styleTextTitle}>
              {' '}
              {t('settings.faq')}
            </Text>
            <Ionicons name="chevron-forward" size={24} color="#04444F" />
          </TouchableOpacity>
        </View>

        <View
          style={[SettingsStyle.containerFaqAndTerms, GlobalStyles.boxShadow]}
        >
          <TouchableOpacity
            style={SettingsStyle.FaqAndTerms}
            onPress={navigateTermnsAndConditions}
          >
            <Text style={SettingsStyle.styleTextTitle}>
              {t('settings.termsAndConditions')}
            </Text>
            <Ionicons name="chevron-forward" size={24} color="#04444F" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={SettingsStyle.btnlogOut}
          onPress={handleLogout}
        >
          <AntDesign name="logout" size={22} color="#026cd2" />
          <Text style={SettingsStyle.textLogout}>
            {''}
            {t('settings.logOut')}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  )
}

export default Settings
