import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ScrollView, Text, TextInput, View } from 'react-native'
import { Button, Checkbox } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ModalOpenDispute } from '../../components/ModalAlert'
import { createDisputeOrder } from '../../config/urls.config'
import useRecordStore from '../../store/useRecordStore'
import useTokenStore from '../../store/useTokenStore'
import { DisputeStyle } from '../../styles/PendingRecordStyle'
import { GlobalStyles } from '../../styles/Styles'

function DisputeRecord() {
  const { t } = useTranslation()
  const { token } = useTokenStore()
  const [motive, setMotive] = useState('1')
  const [quantityDispute, setQuantityDispute] = useState('')
  const { selectedPendingOrder, selectedProduct } = useRecordStore()
  const [solutionSelected, setSolutionSelected] = useState('1')
  const [showOpenDispute, setShowOpenDispute] = useState(false)
  const navigation = useNavigation()

  const handleQuantityChange = (inputValue) => {
    const re = /^[0-9\b]+$/
    if (inputValue === '' || re.test(inputValue)) {
      setQuantityDispute(inputValue)
    }
  }

  const onToggleCheckbox = (value) => {
    setSolutionSelected(value)
  }

  const closeModal = () => {
    setShowOpenDispute(false)
    navigation.goBack()
  }

  // ENVIAR LA DISPUTA
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!quantityDispute) {
      alert('Please fill in the quantity')
      return
    }
    const formData = new FormData()
    const disputeBody = {
      order: selectedPendingOrder,
      motive: motive,
      id_solutionsDisputes: solutionSelected,
      product_id: selectedProduct.id,
      description: '',
      quantity: quantityDispute,
    }
    for (let key in disputeBody) {
      if (disputeBody.hasOwnProperty(key)) {
        formData.append(key, disputeBody[key])
      }
    }
    axios
      .post(createDisputeOrder, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log(response.data)
        setShowOpenDispute(true)
      })
      .catch((error) => {
        console.error('Error al crear la disputa:', error)
      })
  }

  const renderContent = () => {
    if (motive === '1') {
      return (
        <View>
          <View style={[GlobalStyles.boxShadow, DisputeStyle.cardForm]}>
            <Text style={DisputeStyle.text}>
              {t('disputeRecord.quantityDelivered')}
            </Text>
            <TextInput
              style={DisputeStyle.input}
              placeholder="Total received"
              value={quantityDispute}
              onChangeText={handleQuantityChange}
              keyboardType="numeric"
              required
            />
          </View>
          <View style={[GlobalStyles.boxShadow, DisputeStyle.cardForm]}>
            <View style={DisputeStyle.optionForm}>
              <Text style={DisputeStyle.text}>
                {t('disputeRecord.sendNextOrder')}
              </Text>
              <Checkbox.Item
                label=""
                status={solutionSelected === '1' ? 'checked' : 'unchecked'}
                onPress={() => onToggleCheckbox('1')}
              />
            </View>
            <View style={DisputeStyle.optionForm}>
              <Text style={DisputeStyle.text}>
                {t('disputeRecord.creditNote')}
              </Text>
              <Checkbox.Item
                label=""
                status={solutionSelected === '2' ? 'checked' : 'unchecked'}
                onPress={() => onToggleCheckbox('2')}
              />
            </View>
          </View>
        </View>
      )
    } else if (motive === '2') {
      return (
        <View>
          <View style={[GlobalStyles.boxShadow, DisputeStyle.cardForm]}>
            <Text style={DisputeStyle.text}>
              {t('disputeRecord.quantityDefective')}
            </Text>
            <TextInput
              style={DisputeStyle.input}
              placeholder="Total defective"
              value={quantityDispute}
              onChangeText={handleQuantityChange}
              keyboardType="numeric"
              required
            />
          </View>
          <View style={[GlobalStyles.boxShadow, DisputeStyle.cardForm]}>
            <View style={DisputeStyle.optionForm}>
              <Text style={DisputeStyle.text}>
                {t('disputeRecord.sendNextOrder')}
              </Text>
              <Checkbox.Item
                label=""
                status={solutionSelected === '1' ? 'checked' : 'unchecked'}
                onPress={() => onToggleCheckbox('1')}
              />
            </View>
            <View style={DisputeStyle.optionForm}>
              <Text style={DisputeStyle.text}>
                {t('disputeRecord.creditNote')}
              </Text>
              <Checkbox.Item
                label=""
                status={solutionSelected === '2' ? 'checked' : 'unchecked'}
                onPress={() => onToggleCheckbox('2')}
              />
            </View>
          </View>
        </View>
      )
    }
  }
  const activeButtonColor = {
    backgroundColor: '#04444f',
    color: 'white',
    borderRadius: 10,
    margin: 8,
  }

  return (
    <SafeAreaView
      style={
        (DisputeStyle.dispute, { backgroundColor: 'white', height: '100%' })
      }
    >
      <ScrollView>
        <View style={DisputeStyle.cardTittle}>
          <MaterialIcons name="error-outline" size={60} color="#62c471" />
          <View style={{ paddingLeft: 10 }}>
            <Text style={DisputeStyle.title}>{selectedProduct.name}</Text>
            <Text style={DisputeStyle.quantity}>
              {selectedProduct.quantity} {selectedProduct.uom}
            </Text>
          </View>
        </View>
        <View style={DisputeStyle.dispute}>
          <View style={[GlobalStyles.boxShadow, DisputeStyle.cardTabs]}>
            <Button
              mode={motive === '1' ? 'contained' : 'text'}
              onPress={() => setMotive('1')}
              style={motive === '1' ? activeButtonColor : null}
            >
              <Text style={DisputeStyle.text}>
                {t('disputeRecord.wrongQuantity')}
              </Text>
            </Button>
            <Button
              mode={motive === '2' ? 'contained' : 'text'}
              onPress={() => setMotive('2')}
              style={motive === '2' ? activeButtonColor : null}
            >
              <Text style={DisputeStyle.text}>
                {t('disputeRecord.defective')}
              </Text>
            </Button>
          </View>
          {renderContent()}
          <Button
            onPress={handleSubmit}
            style={[GlobalStyles.btnPrimary, DisputeStyle.space]}
          >
            <Text style={GlobalStyles.textBtnSecundary}>
              {t('disputeRecord.send')}
            </Text>
          </Button>
          <View style={DisputeStyle.space} />
        </View>
        <ModalOpenDispute
          showModal={showOpenDispute}
          closeModal={closeModal}
          Title={t('disputeRecord.modalTittle')}
          message={t('disputeRecord.modalText')}
          message2={t('pendingRecord.modalButton')}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default DisputeRecord
