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
import { AntDesign } from '@expo/vector-icons'
const ModalAlert = ({
  message = '',
  message2 = '',
  closeModal = () => {},
  Title = '',
  countryCode = '',
  phoneNumber = '',
  handleOutsidePress = () => {},
  showModal,
  messagep2,
  messagep3,
  Top,
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

export const ModalOpenDispute = ({
  message = '',
  message2 = '',
  closeModal = () => {},
  Title = '',
  handleOutsidePress = () => {},
  showModal,
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
              <AntDesign name="checkcircle" size={45} color="#62c471" />
              <Text
                style={[
                  ModalStyle.modalTextTitle,
                  { marginTop: 10, color: '#62c471' },
                ]}
              >
                {Title}
              </Text>
              <Text style={ModalStyle.modalText}>{message}</Text>

              <TouchableOpacity
                onPress={closeModal}
                style={[
                  GlobalStyles.btnPrimary,
                  ModalStyle.space,
                  { marginTop: 8 },
                ]}
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
export const ModalErrorDispute = ({
  message = '',
  message2 = '',
  closeModal = () => {},
  onCloseOrder = () => {},
  Title = '',
  showModal,
  btnClose,
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
      <View style={ModalStyle.modalContainer}>
        <View style={ModalStyle.centeredView}>
          <View style={ModalStyle.modalView}>
            <MaterialIcons name="error-outline" size={45} color="#ee6055" />
            <Text style={[ModalStyle.modalTextTitle, { marginTop: 10 }]}>
              {Title}
            </Text>
            <Text style={ModalStyle.modalText}>
              {message} <Text style={ModalStyle.modalText2}>{messagep2}</Text>
              {messagep3}
            </Text>
            <View style={[ModalStyle.buttons, { marginTop: 10 }]}>
              <TouchableOpacity
                onPress={onCloseOrder}
                style={[GlobalStyles.btnPrimary, ModalStyle.space]}
              >
                <Text style={GlobalStyles.textBtnSecundary}>{message2}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={closeModal}
                style={GlobalStyles.btnOutline}
              >
                <Text style={GlobalStyles.textBtnOutline}>{btnClose}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export const ModalConfirmOrder = ({
  message = '',
  message2 = '',
  closeModal = () => {},
  Title = '',
  showModal,
  btnClose,
  Title2,
}) => {
  return (
    <Modal
      visible={showModal}
      animationType="fade"
      transparent={true}
      onRequestClose={closeModal}
    >
      <View style={ModalStyle.modalContainer}>
        <View style={ModalStyle.centeredView}>
          <View style={ModalStyle.modalView}>
            <MaterialIcons name="celebration" size={45} color="#62c471" />
            <Text
              style={[
                ModalStyle.modalTextTitle,
                { marginTop: 10, color: '#62c471' },
              ]}
            >
              {Title} <Text style={{ color: '#026cd2' }}>{Title2}</Text>
            </Text>
            <Text style={ModalStyle.modalText}>{message}</Text>

            <TouchableOpacity
              onPress={closeModal}
              style={[
                GlobalStyles.btnPrimary,
                ModalStyle.space,
                { marginTop: 8 },
              ]}
            >
              <Text style={GlobalStyles.textBtnSecundary}>{message2}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}
