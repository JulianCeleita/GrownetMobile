import { AntDesign } from '@expo/vector-icons'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import { ModalStepperStyle } from '../../styles/ModalStepperStyle'

const ModalStepper = ({
  setIsModalVisible,
  name,
  prices,
  uomToPay,
  isFocus,
  setIsFocus,
  handleUomToPayChange,
  productData,
  onAmountChange,
}) => {
  const { t } = useTranslation()
  const { id } = productData
  const [amount, setAmount] = useState(productData.amount)
  const [selectedAmount, setSelectedAmount] = useState(productData.amount)

  const handleButtonClick = () => {
    setIsModalVisible(false)
    onAmountChange(id, amount)
  }

  return (
    <Modal
      visible={true}
      animationType="fade"
      transparent={true}
      onRequestClose=""
    >
      <TouchableWithoutFeedback>
        <View style={ModalStepperStyle.modalContainer}>
          <View style={ModalStepperStyle.centeredView}>
            <View style={ModalStepperStyle.modalView}>
              <View style={ModalStepperStyle.title}>
                <Text style={ModalStepperStyle.textTitle}>{name}</Text>
                <TouchableOpacity
                  style={ModalStepperStyle.close}
                  onPress={() => setIsModalVisible(false)}
                >
                  <AntDesign name="close" size={25} color="#7E7E7E" />
                </TouchableOpacity>
              </View>
              <View style={ModalStepperStyle.product}>
                <View style={ModalStepperStyle.uoms}>
                  <Text style={ModalStepperStyle.text}>
                    {prices.find((price) => price.nameUoms === uomToPay).name}
                  </Text>
                  <Text style={ModalStepperStyle.textPrice}>
                    £{' '}
                    {
                      prices.find((price) => price.nameUoms === uomToPay)
                        .priceWithTax
                    }
                  </Text>
                </View>

                <Dropdown
                  style={[
                    ModalStepperStyle.dropdown,
                    isFocus && { borderColor: '#04444f' },
                  ]}
                  containerStyle={{ borderRadius: 20 }}
                  placeholderStyle={ModalStepperStyle.placeholderStyle}
                  selectedTextStyle={ModalStepperStyle.selectedTextStyle}
                  data={prices}
                  maxHeight={200}
                  labelField="nameUoms"
                  valueField="nameUoms"
                  placeholder={!isFocus ? uomToPay : '...'}
                  value={uomToPay}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={handleUomToPayChange}
                />
              </View>
              <View style={ModalStepperStyle.count}>
                <TouchableOpacity
                  onPress={() => {
                    if (amount > 0) {
                      setAmount(amount - 1)
                    }
                  }}
                >
                  <Text style={ModalStepperStyle.button}>-</Text>
                </TouchableOpacity>

                <TextInput
                  style={ModalStepperStyle.countSelect}
                  keyboardType="numeric"
                  value={amount.toString()}
                  onChangeText={(value) => {
                    const numericValue = parseInt(value, 10)

                    setAmount(isNaN(numericValue) ? '' : numericValue)
                  }}
                />

                <TouchableOpacity
                  onPress={() => {
                    setAmount(amount + 1)
                  }}
                >
                  <Text style={ModalStepperStyle.button2}>+</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={ModalStepperStyle.btn}
                  onPress={handleButtonClick}
                >
                  <Text style={ModalStepperStyle.textBtn}>
                    {t('modalStepper.textBtn')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

export default ModalStepper
