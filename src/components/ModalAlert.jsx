import React from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native'
import { ModalStyle } from '../styles/LoginStyle'
import { MaterialIcons } from '@expo/vector-icons'
import { GlobalStyles } from '../styles/Styles'

const ModalAlert = ({
  message = '',
  message2 = '',
  closeModal = () => {},
  Title = '',
  countryCode = '',
  phoneNumber = '',
  handleOutsidePress = () => {},
  showModal,
  Top,
  messagep2,
  messagep3,
}) => {
  return (
    <Modal
      visible={showModal}
      animationType="fade"
      transparent={true}
      onRequestClose={closeModal}
    >
      <TouchableWithoutFeedback onPress={handleOutsidePress}>
        <View style={ModalStyle.modalContainer}>
          <View style={ModalStyle.centeredView}>
            <View style={ModalStyle.modalView}>
              <MaterialIcons name="error-outline" size={45} color="#ee6055" />
              <Text
                style={[ModalStyle.modalTextTitle, { marginTop: Top ? 20 : 0 }]}
              >
                {Title}
              </Text>
              <Text style={ModalStyle.modalText}>{message}</Text>
              <Text style={ModalStyle.modalText2}>
                {`${countryCode} ${phoneNumber}`}
              </Text>
              <TouchableOpacity
                onPress={closeModal}
                style={[GlobalStyles.btnPrimary, ModalStyle.space]}
              >
                <Text style={GlobalStyles.textBtnSecundary}>{message2}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

export default ModalAlert
export const ModalErrorDispute = ({
  message = '',
  message2 = '',
  closeModal = () => {},
  Title = '',
  countryCode = '',
  phoneNumber = '',
  handleOutsidePress = () => {},
  showModal,
  Top,
  isOtp,
  messagep2,
  messagep3,
  btnClose,
}) => {
  return (
    <Modal
      visible={showModal}
      animationType="fade"
      transparent={true}
      onRequestClose={closeModal}
    >
      <TouchableWithoutFeedback onPress={handleOutsidePress}>
        <View style={ModalStyle.modalContainer}>
          <View style={ModalStyle.centeredView}>
            <View style={ModalStyle.modalView}>
              <MaterialIcons name="error-outline" size={45} color="#ee6055" />
              <Text
                style={[ModalStyle.modalTextTitle, { marginTop: Top ? 20 : 0 }]}
              >
                {Title}
              </Text>
              <Text style={ModalStyle.modalText}>
                {message} <Text style={ModalStyle.modalText2}>{messagep2}</Text>
                {messagep3}
              </Text>
              <Text style={ModalStyle.modalText2}>
                {`${countryCode} ${phoneNumber}`}
              </Text>
              <View style={ModalStyle.buttons}>
                <TouchableOpacity
                  onPress={closeModal}
                  style={[GlobalStyles.btnPrimary, ModalStyle.space]}
                >
                  <Text style={GlobalStyles.textBtnSecundary}>{message2}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={closeModal}
                  style={[GlobalStyles.btnOutline, ModalStyle.space]}
                >
                  <Text style={GlobalStyles.textBtnOutline}>{btnClose}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}
