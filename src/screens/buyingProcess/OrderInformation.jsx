/* eslint-disable no-unused-vars */
import DatePickerAndroid from '@react-native-community/datetimepicker'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native'
import axios from '../../../axiosConfig'
import { createStorageOrder } from '../../config/urls.config'
import useOrderStore from '../../store/useOrderStore'
import useTokenStore from '../../store/useTokenStore'
import { OrderInformationStyle } from '../../styles/OrderInformationStyle'
import { GlobalStyles } from '../../styles/Styles'

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
  const { token } = useTokenStore()
  const navigation = useNavigation()
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  useEffect(() => {
    setData(articlesToPay)
    setDeliveryData(tomorrow)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChangeDate = async (event, newDate) => {
    if (event.type === 'set') {
      setDeliveryData(newDate)
      console.log('Fecha de entrega', deliveryData.toLocaleDateString('en-CA')) 
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
    console.log('este es  :DDD', jsonOrderData)

    try {
      const response = await axios.post(createStorageOrder, jsonOrderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const newOrderNumber = response.data.reference
      setOrderNumber(newOrderNumber)
      console.log(
        'Respuesta exitosa al crear la orden',
        response.data.reference,
      )
      return newOrderNumber
    } catch (error) {
      console.log('Error al crear la orden', error)
    }
  }

  // ENVIAR FORMULARIO
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const newOrderNumber = await getOrderNumber()
      if (newOrderNumber) {
        navigation.navigate('orderSuccessful')
      } else {
        console.log('No se obtuvo numero de orden')
      }
    } catch (error) {
      console.log('Error enviando el correo', error)
    }
  }

  return (
    <View style={OrderInformationStyle.OrderInformation}>
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
        >
          <Text style={GlobalStyles.textBtnSecundary}>
            {' '}
            {t('deliveryDetail.continue')}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default OrderInformation
