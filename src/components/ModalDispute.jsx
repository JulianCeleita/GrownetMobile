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

export default function ModalDispute({ showModal, closeModal }) {
  const { t } = useTranslation()
  const [selectedValue, setSelectedValue] = useState('')
  const [solutionSelected, setSolutionSelected] = useState('1')
  const { selectedOrder, selectedProduct } = useRecordStore()
  const [evidences, setEvidences] = useState([])
  const [quantityDispute, setQuantityDispute] = useState('')

  const data = [
    { label: 'Incomplete', value: 'Incomplete' },
    { label: 'Incorrect', value: 'Incorrect' },
    { label: 'Defective', value: 'Defective' },
  ]
  const onToggleCheckbox = (value) => {
    setSolutionSelected(value)
  }

  const handleQuantityChange = (inputValue) => {
    const re = /^[0-9\b]+$/
    if (inputValue === '' || re.test(inputValue)) {
      setQuantityDispute(inputValue)
    }
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
                      {t('disputeRecord.quantityDelivered')}
                    </Text>
                    <TextInput
                      style={[DisputeStyle.inputNumber, { marginTop: 8 }]}
                      placeholder="#"
                      //value={quantityDispute}
                      //onChangeText={handleQuantityChange}
                      keyboardType="numeric"
                      required
                    />
                  </View>
                  <View style={DisputeStyle.viewDispute}>
                    <Text style={DisputeStyle.text}>Details: </Text>
                    <TextInput
                      style={DisputeStyle.input}
                      placeholder="Leave your comments"
                      //value={quantityDispute}
                      //onChangeText={handleQuantityChange}
                      keyboardType="text"
                      required
                    />
                  </View>
                  <View>
                    <Text style={DisputeStyle.textWrong}>
                      What do you want to do?
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
              {selectedValue.value === 'Incorrect' && (
                <View>
                  <View style={DisputeStyle.viewDispute}>
                    <Text style={DisputeStyle.text}>
                      {t('disputeRecord.quantityDelivered')}
                    </Text>
                    <TextInput
                      style={[DisputeStyle.inputNumber, { marginTop: 8 }]}
                      placeholder="#"
                      //value={quantityDispute}
                      //onChangeText={handleQuantityChange}
                      keyboardType="numeric"
                      required
                    />
                  </View>
                  <View style={DisputeStyle.viewDispute}>
                    <Text style={DisputeStyle.text}>Details: </Text>
                    <TextInput
                      style={DisputeStyle.input}
                      placeholder="Leave your comments"
                      //value={quantityDispute}
                      //onChangeText={handleQuantityChange}
                      keyboardType="text"
                      required
                    />
                  </View>
                  <View>
                    <Text style={DisputeStyle.textWrong}>
                      What do you want to do?
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

              {selectedValue.value === 'Incomplete' && (
                <View>
                  <View style={DisputeStyle.viewDispute}>
                    <Text style={DisputeStyle.text}>
                      {t('disputeRecord.quantityDelivered')}
                    </Text>
                    <TextInput
                      style={[DisputeStyle.inputNumber, { marginTop: 8 }]}
                      placeholder="#"
                      //value={quantityDispute}
                      //onChangeText={handleQuantityChange}
                      keyboardType="numeric"
                      required
                    />
                  </View>
                  <View>
                    <Text style={DisputeStyle.textWrong}>
                      What do you want to do?
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

              {selectedValue != '' && (
                <TouchableOpacity
                  onPress={closeModal}
                  style={[
                    GlobalStyles.btnPrimary,
                    ModalStyle.space,
                    { marginTop: 8 },
                  ]}
                >
                  <Text style={GlobalStyles.textBtnSecundary}>Send</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}
