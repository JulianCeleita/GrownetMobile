/* eslint-disable no-unused-vars */
import DatePickerAndroid from '@react-native-community/datetimepicker'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Keyboard,
  Platform,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import axios from '../../../axiosConfig'
import { createStorageOrder } from '../../config/urls.config'
import useOrderStore from '../../store/useOrderStore'
import useTokenStore from '../../store/useTokenStore'
import { OrderInformationStyle } from '../../styles/OrderInformationStyle'
import { GlobalStyles } from '../../styles/Styles'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const OrderInformation = () => {
  const { t } = useTranslation()
  const {
    selectedRestaurant,
    articlesToPay,
    deliveryData,
    setDeliveryData,
    specialRequirements,
    selectedSupplier,
    setSpecialRequirements,
    totalNet,
    totalTaxes,
    totalToPay,
    setOrderNumber,
  } = useOrderStore()
  const [data, setData] = useState([])
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [loading, setLoading] = useState(false)
  const { token } = useTokenStore()
  const navigation = useNavigation()
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  useEffect(() => {
    setData(articlesToPay)
    setDeliveryData(tomorrow)
    setLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChangeDate = async (event, newDate) => {
    if (event.type === 'set') {
      setDeliveryData(newDate)
    }
    setShowDatePicker(false)
  }

  // OBTENER NUMERO DE ORDEN
  const getOrderNumber = async () => {
    const filteredJsonProducts = articlesToPay.filter(
      (article) => article.amount > 0,
    )
    const jsonProducts = filteredJsonProducts.map((article) => ({
      quantity: article.amount,
      id_presentations: article.idUomToPay,
      price: article.totalItemToPay,
    }))
    const jsonOrderData = {
      id_suppliers: selectedSupplier.id,
      date_delivery: deliveryData.toLocaleDateString('en-CA'),
      address_delivery: selectedRestaurant.address,
      accountNumber_customers: selectedRestaurant.accountNumber,
      observation: specialRequirements,
      total: totalToPay,
      net: totalNet,
      total_tax: totalTaxes,
      products: jsonProducts,
    }

    try {
      const response = await axios.post(createStorageOrder, jsonOrderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const newOrderNumber = response.data.reference
      setOrderNumber(newOrderNumber)
      return newOrderNumber
    } catch (error) {
      console.error('Error al crear la orden', error)
    }
  }

  // ENVIAR FORMULARIO
  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    try {
      const newOrderNumber = await getOrderNumber()
      if (newOrderNumber) {
        navigation.navigate('orderSuccessful')
        setSpecialRequirements('')
      }
    } catch (error) {
      console.error('Error enviando el correo', error)
    }
  }

  return (
    <KeyboardAwareScrollView>
      <SafeAreaView
        style={{
          flex: Platform.OS === 'ios' ? 1 : null,
          marginTop: Platform.OS === 'ios' ? 0 : null,
          ...OrderInformationStyle.OrderInformation,
        }}
      >
        <View>
          <Text style={OrderInformationStyle.PrimaryTex}>
            {t('deliveryDetail.address')}
          </Text>
          <View style={OrderInformationStyle.containerInputs}>
            <TextInput
              style={OrderInformationStyle.input}
              value={selectedRestaurant.address}
              editable={false}
            />
          </View>
          <Text style={OrderInformationStyle.PrimaryTex}>
            {t('deliveryDetail.deliver')}
          </Text>
          <View style={OrderInformationStyle.containerInputs}>
            <TextInput
              value={deliveryData.toLocaleDateString()}
              onFocus={() => {
                Keyboard.dismiss()
                setShowDatePicker(true)
              }}
              style={OrderInformationStyle.input2}
            />
            {showDatePicker && (
              <DatePickerAndroid
                value={deliveryData}
                mode={'date'}
                display="default"
                onChange={handleChangeDate}
                minimumDate={tomorrow}
              />
            )}
          </View>
          <Text style={OrderInformationStyle.PrimaryTex}>
            {t('deliveryDetail.specialRequirements')}
          </Text>
          <View style={OrderInformationStyle.containerInputs}>
            <TextInput
              value={specialRequirements}
              onChangeText={(text) => setSpecialRequirements(text)}
              style={OrderInformationStyle.inputRequirements}
              multiline={true}
              numberOfLines={8}
              textAlignVertical="top"
            />
          </View>
          <View style={OrderInformationStyle.containerButton}>
            <TouchableOpacity
              onPress={handleSubmit}
              style={GlobalStyles.btnPrimary}
              disabled={loading}
            >
              <Text style={GlobalStyles.textBtnSecundary}>
                {' '}
                {t('deliveryDetail.continue')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  )
}

export default OrderInformation
