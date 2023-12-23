import {
  Ionicons,
  MaterialCommunityIcons,
  Octicons,
  Feather,
} from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useNavigation, useRoute } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { useEffect } from 'react'
import { StatusBar, TouchableOpacity, Platform } from 'react-native'
import Chat from '../screens/Chat'
import PastRecord from '../screens/Record/PastRecord'
import PendingRecord from '../screens/Record/PendingRecord'
import Records from '../screens/Record/Records'
import Settings from '../screens/settings/Settings'
import OrderSuccessful from '../screens/buyingProcess/OrderSuccessful'
import DisputeRecord from '../screens/Record/DisputeRecord'
import TermsAndConditions from '../screens/TermsAndConditions'
import { useTranslation } from 'react-i18next'
import Faq from '../screens/settings/Faq'
import Products from '../screens/buyingProcess/Products'
import OrderDetails from '../screens/buyingProcess/OrderDetail'
import Favorites from '../screens/buyingProcess/Favorites'
import Search from '../screens/buyingProcess/Search'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const HeaderLeft2 = () => {
  const navigation = useNavigation()

  const goBack = () => {
    navigation.navigate('restaurants')
  }

  return (
    <TouchableOpacity
      style={{
        marginHorizontal: 28,
        marginTop: Platform.OS === 'ios' ? 50 : null,
      }}
      onPress={goBack}
    >
      <MaterialCommunityIcons
        name="arrow-left"
        size={24}
        color="#04444F"
        style={{ position: 'relative' }}
      />
    </TouchableOpacity>
  )
}

function SettingsStack() {
  const { t } = useTranslation()
  return (
    <Stack.Navigator
      initialRouteName="Records"
      screenOptions={{
        headerMode: 'screen',
        headerTintColor: 'white',
        headerStyle: { backgroundColor: '#026CD2' },
      }}
    >
      <Stack.Screen
        name="Records"
        component={Records}
        options={{
          headerBackTitleVisible: false,
          title: t('stackRecord.profile'),
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: 'white',
            height:
              Platform.OS === 'ios'
                ? StatusBar.currentHeight + 130
                : StatusBar.currentHeight + 60,
          },
          headerTitleStyle: {
            fontFamily: 'PoppinsSemi',
            fontSize: 22,
            color: '#026CD2',
          },
        }}
      />
      <Stack.Screen
        name="pastRecord"
        component={PastRecord}
        options={{
          title: t('stackRecord.orderDetails'),
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
      <Stack.Screen
        name="pendingRecord"
        component={PendingRecord}
        options={{
          headerBackTitleVisible: false,
          title: t('stackRecord.orderDetails'),
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
      <Stack.Screen
        name="disputeRecord"
        component={DisputeRecord}
        options={{
          title: t('stackRecord.whatWentWrong'),
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
            color: '#026cd2',
          },
        }}
      />
      <Stack.Screen
        name="Faq"
        component={Faq}
        options={{
          headerShown: true,
          title: t('menuPrimary.faq'),
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
        name="Terms&Conditions"
        component={TermsAndConditions}
        options={{
          headerShown: true,
          title: t('menuPrimary.termsAndConditions'),
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
        name="chat"
        component={Chat}
        options={{
          title: 'Chat',
          headerShown: false,
          headerStyle: {
            backgroundColor: 'white',
            height:
              Platform.OS === 'ios'
                ? StatusBar.currentHeight + 110
                : StatusBar.currentHeight + 60,
          },
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'PoppinsSemi',
            fontSize: 22,
            color: '#04444f',
          },
        }}
      />
    </Stack.Navigator>
  )
}
function useHeaderLeftLogic2() {
  const navigation = useNavigation()

  const goBackProducts = () => {
    navigation.replace('products')
  }
  const goBackSuppliers = () => {
    navigation.navigate('suppliers')
  }

  return { goBackProducts, goBackSuppliers }
}
const HeaderLeft3 = () => {
  const { goBackSuppliers } = useHeaderLeftLogic2()

  return (
    <TouchableOpacity
      style={{
        marginHorizontal: 28,
        marginTop: Platform.OS === 'ios' ? 30 : null,
        marginBottom: Platform.OS === 'ios' ? 0 : null,
      }}
      onPress={goBackSuppliers}
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
const headerRight = () => {
  const route = useRoute()
  return <TouchableOpacity onPress={route.onPressHandler} />
}

function OrderStack() {
  const { t } = useTranslation()
  return (
    <Stack.Navigator
      initialRouteName="products"
      screenOptions={{
        headerMode: 'screen',
        headerTintColor: '#026CD2',
        headerStyle: {
          backgroundColor: 'white',
        },
      }}
    >
      <Stack.Screen
        name="products"
        component={Products}
        options={() => ({
          headerShown: false,
          title: t('stackNavigator.makeYourOrder'),
          headerStyle: {
            backgroundColor: 'white',
            height:
              Platform.OS === 'android'
                ? StatusBar.currentHeight + 60
                : StatusBar.currentHeight + 130,
          },
          headerTintColor: '#04444F',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'PoppinsSemi',
            fontSize: 22,
            marginRight: 22,
          },
          headerRight: () => headerRight(),
          headerLeft: () => HeaderLeft3(),
          headerLeftContainerStyle: {
            marginHorizontal: 28,
          },
          headerTitleContainerStyle: {
            height: Platform.OS === 'ios' ? 80 : null,
          },
        })}
      />
      <Stack.Screen
        name="ordersDetail"
        component={OrderDetails}
        options={{
          headerShown: true,
          title: t('stackNavigator.orderDetail'),
          headerStyle: {
            backgroundColor: 'white',
            height:
              Platform.OS === 'android'
                ? StatusBar.currentHeight + 50
                : StatusBar.currentHeight + 120,
          },
          headerTintColor: '#04444F',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'PoppinsSemi',
            fontSize: 22,
          },
          headerLeft: () => HeaderLeft2(),
          headerTitleContainerStyle: {
            height: Platform.OS === 'ios' ? 70 : null,
          },
        }}
      />

      <Stack.Screen
        name="orderSuccessful"
        component={OrderSuccessful}
        options={{
          headerShown: true,
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
    </Stack.Navigator>
  )
}

const tabBarIconProps =
  (name) =>
  ({ size, color }) => {
    return <Ionicons name={name} size={39} color={color} />
  }

const tabBarIconFavorites =
  (name) =>
  ({ focused, color }) => {
    if (focused) {
      return <MaterialCommunityIcons name={name} size={38} color={color} />
    } else {
      return <Feather name={name} size={36} color={color} />
    }
  }

const tabBarIconSearch =
  (name) =>
  ({ size, color }) => {
    return <Feather name={name} size={36} color={color} />
  }
const tabBarIconHome =
  (name) =>
  ({ size, color }) => {
    return <Octicons name={name} size={35} color={color} />
  }
const tabBarIconAcount =
  (name) =>
  ({ size, color }) => {
    return <MaterialCommunityIcons name={name} size={39} color={color} />
  }
const TabNavigator = () => {
  const { t } = useTranslation()

  return (
    <Tab.Navigator
      initialRouteName="Orders"
      screenOptions={{
        tabBarActiveTintColor: '#04444F',
        tabBarStyle: {
          height: 70,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Orders"
        component={OrderStack}
        options={{
          tabBarIcon: tabBarIconHome('home'),
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: tabBarIconSearch('search'),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="OrdersDetail"
        component={OrderDetails}
        options={{
          title: t('menuPrimary.orders'),
          tabBarIcon: tabBarIconProps('cart-outline'),
          headerShown: true,
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
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarIcon: tabBarIconFavorites('heart'),
          headerShown: true,
          headerTintColor: '#04444F',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'PoppinsSemi',
            fontSize: 22,
          },
          unmountOnBlur: true,
        }}
      />
      {/* <Tab.Screen
        name="Records"
        component={RecordsStack}
        options={{
          title: t('menuPrimary.records'),
          tabBarIcon: tabBarIconProps('records'),
          headerShown: false,
        }}
      /> */}
      {/* <Tab.Screen
        name="Chat"
        component={ChatStack}
        options={{
          title: t('menuPrimary.chat'),
          tabBarIcon: tabBarIconProps('chat'),
          headerShown: false,
        }}
      /> */}
      <Tab.Screen
        name="Profile"
        component={SettingsStack}
        options={{
          tabBarIcon: tabBarIconAcount('account-outline'),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  )
}

export default TabNavigator
