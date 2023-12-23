import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import ProductDetail from '../../components/buyingProcess/ProductDetail'
import useOrderStore from '../../store/useOrderStore'
import { OrderDetailStyle } from '../../styles/OrderDetailStyle'
import { GlobalStyles } from '../../styles/Styles'

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
      style={{
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 40 : null,
        ...(Platform.OS === 'android' ? OrderDetailStyle.details : {}),
      }}
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
          <View style={[OrderDetailStyle.card, GlobalStyles.boxShadow]}>
            <Ionicons name="nutrition-outline" size={65} color="#62C471" />
            <Text style={OrderDetailStyle.tittleModal}>
              {t('orderDetails.titleCard')}
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Orders')
              }}
              style={[GlobalStyles.btnPrimary, { width: 200 }]}
            >
              <Text style={GlobalStyles.textBtnSecundary}>
                {t('orderDetails.buttonText')}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}
