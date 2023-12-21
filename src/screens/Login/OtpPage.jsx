import {
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { GlobalStyles } from '../../styles/Styles'
import { OtpStyle } from '../../styles/LoginStyle'
import { useRoute } from '@react-navigation/native'
import { otpApiUrl, validationApiUrl } from '../../config/urls.config'
import axios from '../../../axiosConfig'
import useTokenStore from '../../store/useTokenStore'
import { useTranslation } from 'react-i18next'
import ModalAlert from '../../components/ModalAlert'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const Otp = () => {
  const { t } = useTranslation()
  const [showModal, setShowModal] = useState(false)
  const [showEmptyInputModal, setShowEmptyInputModal] = useState(false)
  const [OtpValue, setOtpValue] = useState('')
  const pin1Ref = useRef()
  const pin2Ref = useRef()
  const pin3Ref = useRef()
  const pin4Ref = useRef()
  const [pin1, setPin1] = useState('')
  const [pin2, setPin2] = useState('')
  const [pin3, setPin3] = useState('')
  const [pin4, setPin4] = useState('')
  const route = useRoute()
  const { setToken, countryCode, phoneNumber } = useTokenStore()
  const [seconds, setSeconds] = useState(20)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1)
      }
      if (seconds === 0) {
        setShow(true)
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [seconds])

  // REENVIAR EL OTP
  const resendOtpCode = async () => {
    const state = {
      form: {
        country: parseInt(countryCode, 10),
        telephone: parseInt(phoneNumber, 10),
      },
    }

    try {
      const response = await axios.post(validationApiUrl, state.form)
      if (response.data.flag === 1) {
        console.log('Respuesta con CODIGO TWILIO:', response.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const enviarOTP = async () => {
    const otp = pin1 + pin2 + pin3 + pin4

    setOtpValue(otp)
    const formData = route.params
    if (otp.length !== 4) {
      setShowEmptyInputModal(true)
      return
    }

    try {
      const response = await axios.post(
        `${otpApiUrl}?country=${formData.country}&telephone=${formData.telephone}&code=${otp}`,
      )
      if (response.data.flag === 1) {
        const token = response.data.token
        setToken(token)
      } else {
        setShowModal(true)
      }
    } catch (error) {
      console.error('Error al enviar OTP:', error)
    }
  }
  const closeModal = () => {
    setShowModal(false)
    setShowEmptyInputModal(false)
  }
  const handleOutsidePress = () => {
    closeModal()
  }

  const handleResendCode = () => {
    resendOtpCode()
    setSeconds(20)
    setShow(false)
  }

  const ContainerComponent =
    Platform.OS === 'ios' ? KeyboardAwareScrollView : SafeAreaView

  const containerProps =
    Platform.OS === 'ios'
      ? {
          resetScrollToCoords: { x: 0, y: 0 },
          contentContainerStyle: OtpStyle.containerOtpPage,
          scrollEnabled: true,
        }
      : {
          style: OtpStyle.containerOtpPage,
        }

  return (
    <ContainerComponent {...containerProps}>
      <Image
        style={OtpStyle.tinyLogoOtp}
        source={require('../../../assets/logo.png')}
      />

      <Text style={OtpStyle.textTittle}>
        {t('codeOtp.enterVerificationCode')}
      </Text>
      <Text style={OtpStyle.textP}>{t('codeOtp.codeSent')}</Text>
      <View style={OtpStyle.containerOTP}>
        <View style={OtpStyle.textInputView}>
          <TextInput
            ref={pin1Ref}
            style={OtpStyle.textInput}
            keyboardType={'number-pad'}
            maxLength={1}
            onChangeText={(text) => {
              setPin1(text)
              text ? pin2Ref.current.focus() : pin1Ref.current.focus()
            }}
          />
        </View>
        <View style={OtpStyle.textInputView}>
          <TextInput
            ref={pin2Ref}
            style={OtpStyle.textInput}
            keyboardType={'number-pad'}
            maxLength={1}
            onChangeText={(text) => {
              setPin2(text)
              text ? pin3Ref.current.focus() : pin1Ref.current.focus()
            }}
          />
        </View>
        <View style={OtpStyle.textInputView}>
          <TextInput
            ref={pin3Ref}
            style={OtpStyle.textInput}
            keyboardType={'number-pad'}
            maxLength={1}
            onChangeText={(text) => {
              setPin3(text)
              text ? pin4Ref.current.focus() : pin2Ref.current.focus()
            }}
          />
        </View>
        <View style={OtpStyle.textInputView}>
          <TextInput
            ref={pin4Ref}
            style={OtpStyle.textInput}
            keyboardType={'number-pad'}
            maxLength={1}
            onChangeText={(text) => {
              setPin4(text)
              !text && pin3Ref.current.focus()
            }}
          />
        </View>
      </View>
      <TouchableOpacity onPress={enviarOTP} style={GlobalStyles.btnSecundary}>
        <Text style={GlobalStyles.textBtnSecundary}>
          {' '}
          {t('codeOtp.verifyAndProceed')}
        </Text>
      </TouchableOpacity>
      {show ? (
        <View style={OtpStyle.ContainerdidntCode}>
          <Text style={OtpStyle.textP}>{t('codeOtp.didntReceiveCode')}</Text>
          <TouchableOpacity>
            <Text onPress={handleResendCode} style={OtpStyle.sendCode}>
              {t('codeOtp.sendAgain')}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={OtpStyle.ContainerdidntCode}>
          <Text style={OtpStyle.textP}>
            {t('codeOtp.waitFirstPart')}
            {seconds}
            {t('codeOtp.waitSecondPart')}
          </Text>
        </View>
      )}
      <ModalAlert
        showModal={showModal}
        closeModal={closeModal}
        handleOutsidePress={handleOutsidePress}
        Title={t('codeOtp.title')}
        message={t('codeOtp.message')}
        countryCode={OtpValue}
        message2={t('codeOtp.code')}
        isOtp
      />

      <ModalAlert
        showModal={showEmptyInputModal}
        closeModal={closeModal}
        handleOutsidePress={handleOutsidePress}
        Title={t('login.modalTitle_2')}
        message={t('codeOtp.message2Modal')}
        message2={t('codeOtp.code')}
        Top
      />
    </ContainerComponent>
  )
}

export default Otp
