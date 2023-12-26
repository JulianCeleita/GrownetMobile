/* eslint-disable camelcase */
import {
  Poppins_300Light_Italic,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  useFonts,
} from '@expo-google-fonts/poppins'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Platform, StatusBar, TouchableOpacity } from 'react-native'
import Home from '../screens/Home'
import Login from '../screens/Login/LoginPage'
import OTP from '../screens/Login/OtpPage'
import TermsAndConditions from '../screens/TermsAndConditions'
import OrderInformation from '../screens/buyingProcess/OrderInformation'
import Restauranst from '../screens/buyingProcess/Restaurants'
import Suppliers from '../screens/buyingProcess/Suppliers'
import useTokenStore from '../store/useTokenStore'
import { navigate } from './RootNavigation'
import TabNavigator from './TabNavigator'

import OrderSuccessful from '../screens/buyingProcess/OrderSuccessful'

import Chat from '../screens/Chat'
import Settings from '../screens/settings/Settings'

const Stack = createStackNavigator()

function useHeaderLeftLogic() {
  const navigation = useNavigation()

  const goBack = () => {
    navigation.goBack()
  }

  return { goBack }
}

function useHeaderLeftLogic2() {
  const navigation = useNavigation()

  const goBackProducts = () => {
    navigation.replace('products')
  }
  const goBackSuppliers = () => {
    navigation.navigate('TabNavigator')
  }

  return { goBackProducts, goBackSuppliers }
}

const HeaderLeft = () => {
  const { goBack } = useHeaderLeftLogic()

  return (
    <TouchableOpacity
      style={{
        marginHorizontal: 28,
        marginTop: Platform.OS === 'ios' ? 0 : null,
        marginBottom: Platform.OS === 'ios' ? 0 : null,
      }}
      onPress={goBack}
    >
      <MaterialCommunityIcons
        name="arrow-left"
        size={24}
        color="#04444F"
        style={{ position: 'relative', width: 20 }}
      />
    </TouchableOpacity>
  )
}

const HeaderLeft2 = () => {
  const { goBackProducts } = useHeaderLeftLogic2()

  return (
    <TouchableOpacity
      style={{
        marginHorizontal: 28,
        marginTop: Platform.OS === 'ios' ? 0 : null,
        marginBottom: Platform.OS === 'ios' ? 0 : null,
      }}
      onPress={goBackProducts}
    >
      <MaterialCommunityIcons
        name="arrow-left"
        size={24}
        color="#04444F"
        style={{ position: 'relative', width: 20 }}
      />
    </TouchableOpacity>
  )
}

function AuthNavigator() {
  const { t } = useTranslation()
  const [fontsLoaded] = useFonts({
    PoppinsBold: Poppins_700Bold,
    PoppinsRegular: Poppins_400Regular,
    PoppinsMedium: Poppins_500Medium,
    PoppinsSemi: Poppins_600SemiBold,
    PoppinsItalic: Poppins_300Light_Italic,
  })

  const { token } = useTokenStore()

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (token) {
      setIsLoading(false)
    } else {
      navigate('home')
      setIsLoading(false)
    }
  }, [token])

  if (!fontsLoaded || isLoading) {
    return null
  }

  return (
    <Stack.Navigator>
      {token ? (
        <>
          <Stack.Screen
            name="restaurants"
            component={Restauranst}
            options={() => ({
              headerShown: true,
              title: t('stackNavigator.chooseYourRestaurant'),
              headerStyle: {
                backgroundColor: '#f2f2f2',
                height:
                  Platform.OS === 'android'
                    ? StatusBar.currentHeight + 50
                    : StatusBar.currentHeight + 70,
              },
              headerTintColor: '#04444F',
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontFamily: 'PoppinsSemi',
                fontSize: 22,
              },
              headerTitleContainerStyle: {
                height: Platform.OS === 'ios' ? 50 : null,
              },
            })}
          />
          <Stack.Screen
            name="suppliers"
            component={Suppliers}
            options={{
              headerShown: true,
              headerBackTitleVisible: false,
              title: t('stackNavigator.suppliers'),
              headerStyle: {
                backgroundColor: '#f2f2f2',
                height:
                  Platform.OS === 'ios'
                    ? StatusBar.currentHeight + 110
                    : StatusBar.currentHeight + 60,
              },
              headerTintColor: '#04444F',
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontFamily: 'PoppinsSemi',
                fontSize: 22,
              },
            }}
          />
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{
              headerShown: true,
              title: 'Settings',
            }}
          />
          <Stack.Screen
            name="chat"
            component={Chat}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="TabNavigator"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="orderInformation"
            component={OrderInformation}
            options={{
              headerShown: true,
              title: t('stackNavigator.orderDetail'),
              headerStyle: {
                backgroundColor: 'white',
                height:
                  Platform.OS === 'android'
                    ? StatusBar.currentHeight + 60
                    : StatusBar.currentHeight + 120,
              },
              headerTintColor: '#04444F',
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontFamily: 'PoppinsSemi',
                fontSize: 22,
              },
              headerLeft: () => HeaderLeft(),
              headerTitleContainerStyle: {
                height: Platform.OS === 'ios' ? 70 : null,
              },
            }}
          />
          <Stack.Screen
            name="orderSuccessful"
            component={OrderSuccessful}
            options={{
              headerShown: false,
              title: t('stackNavigator.orderSuccessful'),
              headerStyle: {
                backgroundColor: 'white',
                height:
                  Platform.OS === 'ios'
                    ? StatusBar.currentHeight + 110
                    : StatusBar.currentHeight + 60,
              },
              headerTintColor: '#04444F',
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontFamily: 'PoppinsSemi',
                fontSize: 22,
              },
            }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="otp"
            component={OTP}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Terms&Conditions"
            component={TermsAndConditions}
            options={{
              headerShown: true,
              title: 'Terms & Conditions',
              headerStyle: {
                backgroundColor: '#f2f2f2',
                height: StatusBar.currentHeight + 60,
              },
              headerTintColor: '#04444F',
              headerTitleAlign: 'center',
              headerTitleStyle: {
                fontFamily: 'PoppinsSemi',
                fontSize: 22,
              },
            }}
          />
        </>
      )}
    </Stack.Navigator>
  )
}

export default AuthNavigator
