import React, { useState } from 'react'
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
import { AntDesign } from '@expo/vector-icons'
import { ModalStyle } from '../../styles/LoginStyle'
import { GlobalStyles } from '../../styles/Styles'
import SelectQuantity from './SelectQuantity'
import { useTranslation } from 'react-i18next'

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
  counter,
  onAmountUpdate,
}) => {
  const { t } = useTranslation()
  const [selectedValue, setSelectedValue] = useState(null)

  console.log(selectedValue)
  const handleDropdownChange = (value, index) => {
    // Aquí puedes realizar acciones basadas en el cambio de selección
    setSelectedValue(value)
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
              <SelectQuantity
                productData={productData}
                onAmountChange={onAmountChange}
                counter={0}
                style={ModalStepperStyle}
                onAmountUpdate={onAmountUpdate}
              />

              <View>
                <TouchableOpacity style={ModalStepperStyle.btn}>
                  <Text
                    style={ModalStepperStyle.textBtn}
                    onPress={() => setIsModalVisible(false)}
                  >
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