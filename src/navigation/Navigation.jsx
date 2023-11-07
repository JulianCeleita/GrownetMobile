import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { navigate } from './RootNavigation'
import AuthNavigator from './AuthNavigator'

export default function Navigation() {
  return (
    <NavigationContainer ref={navigate}>
      <AuthNavigator />
    </NavigationContainer>
  )
}
