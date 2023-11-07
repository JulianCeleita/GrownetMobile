import React from 'react'
import Navigation from './src/navigation/Navigation'
import { I18nextProvider } from 'react-i18next'
import i18n from './src/screens/settings/traslations/i18n'

export default function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Navigation />
    </I18nextProvider>
  )
}
