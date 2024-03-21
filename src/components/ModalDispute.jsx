import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
} from 'react-native'
import * as DocumentPicker from 'expo-document-picker'
import { ModalStyle } from '../styles/LoginStyle'
import { MaterialIcons, Feather } from '@expo/vector-icons'
import { GlobalStyles, colors } from '../styles/Styles'
import { DisputeStyle } from '../styles/PendingRecordStyle'
import { useTranslation } from 'react-i18next'
import { ModalStepperStyle } from '../styles/ModalStepperStyle'
import { Dropdown } from 'react-native-element-dropdown'
import { Button, Checkbox } from 'react-native-paper'
import useRecordStore from '../store/useRecordStore'
import { createDisputeOrder } from '../config/urls.config'
import axios from 'axios'
import useTokenStore from '../store/useTokenStore'
import { ModalOpenDispute } from './ModalAlert'
import { useNavigation } from '@react-navigation/native'

export default function ModalDispute({ showModal, setShowModal, closeModal }) {
  const { t } = useTranslation()
  const navigation = useNavigation()
  const { token } = useTokenStore()
  const [selectedValue, setSelectedValue] = useState('')
  const [solutionSelected, setSolutionSelected] = useState('1')
  const { selectedOrder, selectedProduct } = useRecordStore()
  const [evidences, setEvidences] = useState([])
  const [quantityDispute, setQuantityDispute] = useState('')
  const [details, setDetails] = useState('')
  const [showOpenDispute, setShowOpenDispute] = useState(false)
  const data = [
    { label: 'Incomplete', value: 'Incomplete', motive: '1' },
    { label: 'Defective', value: 'Defective', motive: '2' },
  ]
  const onToggleCheckbox = (value) => {
    setSolutionSelected(value)
  }
  const closeModalSubmit = () => {
    setShowOpenDispute(false)
    navigation.goBack()
  }

  const handleQuantityChange = (inputValue) => {
    const re = /^[0-9\b]+$/
    if (inputValue === '' || re.test(inputValue)) {
      setQuantityDispute(inputValue)
    }
  }
  const handleDetailsChange = (text) => {
    setDetails(text)
  }
  // SUBIR EVIDENCIA
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
      })
      if (!result.canceled) {
        setEvidences((prevEvidences) => [...prevEvidences, ...result.assets])
      }
    } catch (error) {
      console.error('Error al seleccionar el archivo', error)
    }
  }
  console.log('value: ', selectedValue.motive)
  // ENVIAR LA DISPUTA
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!quantityDispute) {
      alert('Please fill in the quantity')
      return
    }
    const formData = new FormData()
    const disputeBody = {
      order: selectedOrder,
      motive: selectedValue.motive,
      id_solutionsDisputes: solutionSelected,
      product_id: selectedProduct.id,
      description: details,
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
        setShowOpenDispute(true)
        setShowModal(false)
      })
      .catch((error) => {
        console.error('Error al crear la disputa:', error)
      })
  }
  return (
    <Modal
      visible={showModal}
      animationType="fade"
      transparent={true}
      onRequestClose={closeModal}
    >
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={ModalStyle.modalContainer}>
          <View style={ModalStyle.centeredView}>
            <View style={ModalStyle.modalView}>
              <MaterialIcons name="error-outline" size={45} color="#ee6055" />
              <Text style={[ModalStyle.modalTextTitle]}>
                {selectedProduct.name +
                  ' - ' +
                  selectedProduct.quantity +
                  ' ' +
                  selectedProduct.uom}
              </Text>
              <View style={DisputeStyle.viewDispute}>
                <Text style={DisputeStyle.textWrong}>
                  {t('stackRecord.whatWentWrong')}
                </Text>
                <Dropdown
                  placeholder="Select"
                  data={data}
                  labelField="label"
                  valueField="value"
                  value={selectedValue}
                  onChange={(value) => setSelectedValue(value)}
                  placeholderStyle={DisputeStyle.placeholderStyle}
                  selectedTextStyle={ModalStepperStyle.selectedTextStyle}
                  containerStyle={{
                    backgroundColor: 'white',
                    borderRadius: 15,
                  }}
                  itemTextStyle={{
                    color: '#04444f',
                    fontFamily: 'PoppinsRegular',
                    fontSize: 15,
                  }}
                  style={DisputeStyle.dropdown}
                />
              </View>

              {selectedValue.value === 'Defective' && (
                <View>
                  <View style={DisputeStyle.viewDispute}>
                    <Text style={DisputeStyle.text}>
                      {t('disputeRecord.quantityDefective')}
                    </Text>
                    <TextInput
                      style={[DisputeStyle.inputNumber, { marginTop: 8 }]}
                      placeholder="#"
                      value={quantityDispute}
                      onChangeText={handleQuantityChange}
                      keyboardType="numeric"
                      required
                    />
                  </View>
                  <View style={DisputeStyle.viewDispute}>
                    <Text style={DisputeStyle.text}>
                      {t('stackRecord.details')}{' '}
                    </Text>
                    <TextInput
                      style={DisputeStyle.input}
                      placeholder="Leave your comments"
                      value={details}
                      onChangeText={handleDetailsChange}
                      required
                    />
                  </View>
                  <View>
                    <Text style={DisputeStyle.textWrong}>
                      {t('stackRecord.whatDoYouDo')}
                    </Text>
                    <View style={DisputeStyle.optionForm}>
                      <Text style={DisputeStyle.result}>
                        {t('disputeRecord.sendNextOrder')}
                      </Text>
                      <Checkbox.Item
                        label=""
                        status={
                          solutionSelected === '1' ? 'checked' : 'unchecked'
                        }
                        onPress={() => onToggleCheckbox('1')}
                        style={DisputeStyle.check}
                      />
                      <Text style={DisputeStyle.result}>
                        {t('disputeRecord.creditNote')}
                      </Text>
                      <Checkbox.Item
                        label=""
                        status={
                          solutionSelected === '2' ? 'checked' : 'unchecked'
                        }
                        onPress={() => onToggleCheckbox('2')}
                      />
                    </View>
                    <Button
                      style={[
                        DisputeStyle.buttonUpload,
                        GlobalStyles.boxShadow,
                      ]}
                      onPress={pickDocument}
                    >
                      <Feather name="upload" size={18} color="#04444F" />
                      <Text style={DisputeStyle.textBtnUpload}>
                        {' '}
                        {t('uploadFile.customUpload')}
                      </Text>
                    </Button>
                    {evidences.length > 0 && (
                      <View style={DisputeStyle.uploadPhoto}>
                        <Feather name="camera" size={24} color={colors.green} />
                        <Text style={DisputeStyle.textBtnUpload}>
                          <Text>{evidences[0].name}</Text>
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              )}
              {selectedValue.value === 'Incomplete' && (
                <View>
                  <View style={DisputeStyle.viewDispute}>
                    <Text style={DisputeStyle.text}>
                      {t('disputeRecord.quantityDefective')}
                    </Text>
                    <TextInput
                      style={[DisputeStyle.inputNumber, { marginTop: 8 }]}
                      placeholder="#"
                      value={quantityDispute}
                      onChangeText={handleQuantityChange}
                      keyboardType="numeric"
                      required
                    />
                  </View>
                  <View style={DisputeStyle.viewDispute}>
                    <Text style={DisputeStyle.text}>
                      {t('stackRecord.details')}{' '}
                    </Text>
                    <TextInput
                      style={DisputeStyle.input}
                      placeholder="Leave your comments"
                      value={details}
                      onChangeText={handleDetailsChange}
                      required
                    />
                  </View>
                  <View>
                    <Text style={DisputeStyle.textWrong}>
                      {t('stackRecord.whatDoYouDo')}
                    </Text>
                    <View style={DisputeStyle.optionForm}>
                      <Text style={DisputeStyle.result}>
                        {t('disputeRecord.sendNextOrder')}
                      </Text>
                      <Checkbox.Item
                        label=""
                        status={
                          solutionSelected === '1' ? 'checked' : 'unchecked'
                        }
                        onPress={() => onToggleCheckbox('1')}
                        style={DisputeStyle.check}
                      />
                      <Text style={DisputeStyle.result}>
                        {t('disputeRecord.creditNote')}
                      </Text>
                      <Checkbox.Item
                        label=""
                        status={
                          solutionSelected === '2' ? 'checked' : 'unchecked'
                        }
                        onPress={() => onToggleCheckbox('2')}
                      />
                    </View>
                  </View>
                </View>
              )}

              {/* {renderContent()} */}
              {selectedValue != '' && (
                <Button
                  onPress={handleSubmit}
                  style={[GlobalStyles.btnPrimary, { marginTop: 10 }]}
                >
                  <Text style={GlobalStyles.textBtnSecundary}>
                    {t('disputeRecord.send')}
                  </Text>
                </Button>
              )}
              {/* {selectedValue != '' && (
                <TouchableOpacity
                  onPress={closeModal}
                  style={[GlobalStyles.btnPrimary, ModalStyle.space]}
                >
                  <Text style={GlobalStyles.textBtnSecundary}>Send</Text>
                </TouchableOpacity>
              )} */}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <ModalOpenDispute
        showModal={showOpenDispute}
        closeModal={closeModalSubmit}
        Title={t('disputeRecord.modalTittle')}
        message={t('disputeRecord.modalText')}
        message2={t('pendingRecord.modalButton')}
      />
    </Modal>
  )
}
