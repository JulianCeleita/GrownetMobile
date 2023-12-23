/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react'
import { navigate } from './RootNavigation'
import useTokenStore from '../store/useTokenStore'
import Home from '../screens/Home'
import Login from '../screens/Login/LoginPage'
import OTP from '../screens/Login/OtpPage'
import Restauranst from '../screens/buyingProcess/Restaurants'
import {
  StatusBar,
  TouchableOpacity,
  Platform,
  View,
  StyleSheet,
} from 'react-native'
import {
  useFonts,
  Poppins_700Bold,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_500Medium,
  Poppins_300Light_Italic,
} from '@expo-google-fonts/poppins'
import { createStackNavigator } from '@react-navigation/stack'
import TabNavigator from './TabNavigator'
import { useTranslation } from 'react-i18next'
import Suppliers from '../screens/buyingProcess/Suppliers'
import { useNavigation } from '@react-navigation/native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import OrderDetail from '../screens/buyingProcess/OrderDetail'
import OrderInformation from '../screens/buyingProcess/OrderInformation'
import TermsAndConditions from '../screens/TermsAndConditions'
import { Ionicons } from '@expo/vector-icons'
import Settings from '../screens/settings/Settings';
import Chat from '../screens/Chat'


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
      console.log('No se encontró un token. Redirigiendo a login.')
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
            name= "chat"
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
