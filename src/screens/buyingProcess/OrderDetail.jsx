import React from 'react'
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import useOrderStore from '../../store/useOrderStore'
import { GlobalStyles } from '../../styles/Styles'
import ProductDetail from '../../components/buyingProcess/ProductDetail'
import { ScrollView } from 'react-native-gesture-handler'
import { OrderDetailStyle } from '../../styles/OrderDetailStyle'
import { useTranslation } from 'react-i18next'
import { AntDesign } from '@expo/vector-icons'
import { FavoritesStyle } from '../../styles/FavoritesStyle'

export default function OrderDetails() {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const articlesToPayStore = useOrderStore()
  const totalNet = articlesToPayStore.totalNet
  const totalTaxes = articlesToPayStore.totalTaxes
  const totalToPay = articlesToPayStore.totalToPay

  const updateTotalNet = (newNet) => {
    articlesToPayStore.setTotalNet(newNet)
  }

  const updateTotalTaxes = (newTaxes) => {
    articlesToPayStore.setTotalTaxes(newTaxes)
  }

  const updateTotalToPay = (newTotal) => {
    articlesToPayStore.setTotalToPay(newTotal)
  }
  return (
    <SafeAreaView
      style={[
        OrderDetailStyle.details,
        {
          paddingTop: Platform.OS === 'ios' ? 40 : null,
        },
      ]}
    >
      <ScrollView>
        {articlesToPayStore.articlesToPay.length > 0 ? (
          <View
            style={{
              width: '100%',
              flex: 1,
              alignItems: 'center',
            }}
          >
            <View style={OrderDetailStyle.containerDetails}>
              <ProductDetail
                updateTotalToPay={updateTotalToPay}
                updateTotalTaxes={updateTotalTaxes}
                updateTotalNet={updateTotalNet}
              />
              <View>
                <Text style={OrderDetailStyle.tittle}>
                  {t('orderDetails.paymentDetails')}
                </Text>
                <View style={OrderDetailStyle.productDetail}>
                  <Text style={OrderDetailStyle.text}>
                    {t('orderDetails.net')}
                  </Text>
                  <Text style={OrderDetailStyle.text}>
                    £{totalNet.toFixed(2)}
                  </Text>
                </View>
                <View style={OrderDetailStyle.productDetail}>
                  <Text style={OrderDetailStyle.text}>
                    {t('orderDetails.tax')}
                  </Text>
                  <Text style={OrderDetailStyle.text}>
                    £{totalTaxes.toFixed(2)}
                  </Text>
                </View>
              </View>
              <View style={OrderDetailStyle.totalDetail}>
                <Text style={OrderDetailStyle.currentText}>
                  {t('orderDetails.currentvalue')}
                </Text>
                <Text style={OrderDetailStyle.currentText}>
                  £{totalToPay.toFixed(2)}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={[GlobalStyles.btnPrimary, OrderDetailStyle.spaceButton]}
              onPress={() => navigation.navigate('orderInformation')}
              disabled={totalToPay === 0}
            >
              <Text style={GlobalStyles.textBtnSecundary}>
                {t('orderDetails.continue')}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={[FavoritesStyle.card, GlobalStyles.boxShadow]}>
            <AntDesign name="shoppingcart" size={65} color="#62C471" />
            <Text style={FavoritesStyle.tittle}>{t('cart.titleCard')}</Text>
            <Text style={FavoritesStyle.text}>{t('cart.text')}</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('TabNavigator', { screen: 'Favorites' })
              }}
              style={[GlobalStyles.btnPrimary, { width: 200 }]}
            >
              <Text style={GlobalStyles.textBtnSecundary}>
                {t('cart.buttonText')}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}
