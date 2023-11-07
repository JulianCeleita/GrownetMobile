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
  isOtp,
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

              {/*<TouchableOpacity
                onPress={closeModal}
                style={isOtp ? ModalStyle.bgInt : ''}
              >
                <Text
                  style={isOtp ? ModalStyle.TextChange2 : ModalStyle.TextChange}
                >
                  {message2}
                </Text>
  </TouchableOpacity>*/}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

export default ModalAlert
