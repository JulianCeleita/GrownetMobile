import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native'
import { GlobalStyles } from '../../styles/Styles'
import { MaterialIcons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import ProductCards from './ProductCards'
import SelectQuantity from './SelectQuantity'
import { ProductsStyle } from '../../styles/ProductsStyle'
import { ModalStepperStyle } from '../../styles/ModalStepperStyle'
import { Dropdown } from 'react-native-element-dropdown'
import { Platform, StyleSheet } from 'react-native'

const ModalStepper = () => {
  const [amount, setAmount] = useState('')
  const [selectedValue, setSelectedValue] = useState(null)
  const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ]
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
        {/*modal*/}
        <View style={ModalStepperStyle.modalContainer}>
          <View style={ModalStepperStyle.centeredView}>
            <View style={ModalStepperStyle.modalView}>
              <View style={ModalStepperStyle.product}>
                <Text style={ModalStepperStyle.text}>Cucumber</Text>
                <Dropdown
                  style={[ModalStepperStyle.dropdown]}
                  containerStyle={{ borderRadius: 20, marginBottom: 10 }}
                  placeholderStyle={ModalStepperStyle.placeholderStyle}
                  selectedTextStyle={ModalStepperStyle.selectedTextStyle}
                  data={data}
                  maxHeight={200}
                  labelField="label"
                  valueField="value"
                  placeholder="box"
                  value={selectedValue}
                  onChange={handleDropdownChange}
                  //placeholder={!isFocus ? uomToPay : '...'}
                  //value={uomToPay}
                  //onFocus={() => setIsFocus(true)}
                  //onBlur={() => setIsFocus(false)}
                  //onChange={handleUomToPayChange}
                />
              </View>
              <View style={ModalStepperStyle.countOrderD}>
                <TouchableOpacity>
                  <Text style={ModalStepperStyle.button}>-</Text>
                </TouchableOpacity>
                <TextInput
                  style={ModalStepperStyle.countSelect}
                  placeholder="0"
                  keyboardType="numeric"
                  //value={0}
                />

                <TouchableOpacity>
                  <Text style={ModalStepperStyle.button2}>+</Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity style={ModalStepperStyle.btn}>
                  <Text style={ModalStepperStyle.textBtn}>
                    Añadir a la order
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
