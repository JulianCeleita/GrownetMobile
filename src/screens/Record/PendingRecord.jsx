import { Feather } from '@expo/vector-icons'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import axios from 'axios'
import * as DocumentPicker from 'expo-document-picker'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Text, TouchableOpacity, View, Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Button } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  ModalConfirmOrder,
  ModalErrorDispute,
  ModalSendEmail,
} from '../../components/ModalAlert'
import {
  closeSelectedOrder,
  selectedStorageOrder,
  createDisputeOrder,
  sendEmail,
} from '../../config/urls.config'
import useRecordStore from '../../store/useRecordStore'
import useTokenStore from '../../store/useTokenStore'
import { PastStyle } from '../../styles/PastRecordStyle'
import { DisputeStyle, PendingStyle } from '../../styles/PendingRecordStyle'
import { RecordStyle } from '../../styles/RecordStyle'
import { GlobalStyles } from '../../styles/Styles'
import { set } from 'date-fns'
import { ModalOpenDispute } from '../../components/ModalAlert'

function PendingRecord() {
  const navigation = useNavigation()
  const { t } = useTranslation()
  const { token } = useTokenStore()
  const {
    selectedPendingOrder,
    detailsToShow,
    setDetailsToShow,
    selectedProduct,
    setSelectedProduct,
  } = useRecordStore()
  const [textColor, setTextColor] = useState('#a4a4a4')
  const [productColors, setProductColors] = useState({})
  const [activeTab, setActiveTab] = useState('reception')
  const [showErrorDispute, setShowErrorDispute] = useState(false)
  const [showSendEmail, setShowSendEmail] = useState(false)
  const [showConfirmOrder, setShowConfirmOder] = useState(false)
  const [checkProduct, setCheckProduct] = useState({})
  const [evidences, setEvidences] = useState([])
  const [showOpenDispute, setShowOpenDispute] = useState(false)

  console.log('detailsToShow', detailsToShow)
  const disputePress = (productId) => {
    setProductColors((prevColors) => ({
      ...prevColors,
      [productId]: '#ee6055',
    }))
    setTimeout(() => {
      navigation.navigate('disputeRecord')
    }, 200)
  }
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setProductColors({})
    })
    return unsubscribe
  }, [navigation])

  const switchTab = () => {
    setActiveTab((prevTab) =>
      prevTab === 'productsRecord' ? 'reception' : 'productsRecord',
    )
  }

  useFocusEffect(
    React.useCallback(() => {
      axios
        .get(`${selectedStorageOrder}/${selectedPendingOrder}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setDetailsToShow(response.data.order)
        })
        .catch((error) => {
          console.log(error)
        })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  )

  const handleSelectProduct = (product) => {
    setSelectedProduct(product)
  }

  // SUBIR EVIDENCIA
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
      })
      console.log('Result from DocumentPicker:', result)

      if (!result.canceled) {
        setEvidences((prevEvidences) => [...prevEvidences, ...result.assets])
      } else {
        console.log('Document picking canceled')
      }
    } catch (error) {
      console.error('Error al seleccionar el archivo', error)
    }
  }

  const onSendEvidences = async () => {
    const formData = new FormData()

    const disputeBody = {
      order: selectedPendingOrder,
      product_id: detailsToShow.evidences_id,
    }
    for (let key in disputeBody) {
      if (disputeBody.hasOwnProperty(key)) {
        formData.append(key, disputeBody[key])
      }
    }
    evidences.forEach((file) => {
      const fileUri = file.uri
      const fileName = fileUri.split('/').pop()
      const fileType = fileUri.match(/\.(\w+)$/)?.[1]
      formData.append('evidences[]', {
        uri: fileUri,
        name: fileName || 'image',
        type: `image/${fileType}` || 'image/jpg',
      })
    })

    axios
      .post(createDisputeOrder, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        setShowOpenDispute(true)
        setEvidences([])
      })
      .catch((error) => {
        console.error('Error al crear la disputa:', error)
      })
  }

  const removeEvidence = (index) => {
    const newEvidences = [...evidences]
    newEvidences.splice(index, 1)
    setEvidences(newEvidences)
  }

  // ENVIAR CORREO DE DISPUTA

  const onSendMail = () => {
    axios
      .get(`${sendEmail}/${selectedPendingOrder}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setShowSendEmail(true)
      })
      .catch((error) => {
        console.log('Error al enviar el correo', error)
      })
  }

  // CERRAR LA ORDEN SELECCIONADA
  const onConfirmOrder = (e) => {
    e.preventDefault()
    if (detailsToShow.id_stateOrders === 6) {
      setShowErrorDispute(true)
    } else {
      onCloseOrder(e)
    }
  }

  const onCloseOrder = () => {
    const bodyCloseOrder = {
      reference: selectedPendingOrder,
      state: 5,
    }
    axios
      .post(closeSelectedOrder, bodyCloseOrder, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setShowErrorDispute(false)
        setShowConfirmOder(true)
      })
      .catch((error) => {
        console.log('Error al cerrar la orden', error)
      })
  }
  const closeModal = () => {
    if (showConfirmOrder === true) {
      setShowConfirmOder(false)
      navigation.navigate('Records', { screen: 'recordsStack' })
    } else {
      setShowErrorDispute(false)
      setShowOpenDispute(false)
      setShowSendEmail(false)
    }
  }
  const handleOutsidePress = () => {
    closeModal()
  }
  const handlePress = (productId) => {
    setCheckProduct((prevState) => ({
      ...prevState,
      [productId]: !prevState[productId],
    }))
  }
  return (
    <SafeAreaView style={RecordStyle.record}>
      <ScrollView>
        <View style={[RecordStyle.tabContainer, GlobalStyles.boxShadow]}>
          <TouchableOpacity
            style={[
              {
                flex: 1,
                backgroundColor:
                  activeTab === 'productsRecord' ? '#62c471' : 'white',
                padding: 10,
                alignItems: 'center',
              },
              RecordStyle.btnTab,
            ]}
            onPress={switchTab}
          >
            <Text
              style={{
                fontFamily: 'PoppinsRegular',
                color: activeTab === 'productsRecord' ? 'white' : '#04444f',
              }}
            >
              {t('pendingRecord.products')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              {
                flex: 1,
                backgroundColor:
                  activeTab === 'reception' ? '#62c471' : 'white',
              },
              RecordStyle.btnTab,
            ]}
            onPress={switchTab}
          >
            <Text
              style={{
                fontFamily: 'PoppinsRegular',
                color: activeTab === 'reception' ? 'white' : '#04444f',
              }}
            >
              {t('pendingRecord.reception')}
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          {activeTab === 'productsRecord' ? (
            <View style={PastStyle.past}>
              {detailsToShow && (
                <View style={GlobalStyles.cardInvoces}>
                  <Text style={PastStyle.tittle}>
                    {' '}
                    {t('pendingRecord.supplierDetails')}
                  </Text>
                  <View style={PastStyle.products}>
                    <Text style={PastStyle.subtittle}>
                      {detailsToShow.nameSuppliers}
                    </Text>
                    <Text style={PastStyle.subtittle}>
                      #{detailsToShow.reference}
                    </Text>
                  </View>
                  <Text style={PastStyle.p}>{detailsToShow.created_date}</Text>
                  <Text style={PastStyle.tittle}>
                    {' '}
                    {t('pendingRecord.productDetails')}
                  </Text>
                  {detailsToShow.products?.map((product) => (
                    <View>
                      <View style={PastStyle.products}>
                        <Text style={[PastStyle.subtittle, { width: '70%' }]}>
                          {product.name}
                        </Text>
                        <Text style={PastStyle.subtittle}>
                          £{product.price}
                        </Text>
                      </View>
                      <Text style={PastStyle.p}>
                        {product.quantity} {product.uom}
                      </Text>
                    </View>
                  ))}
                  <Text style={PastStyle.tittle}>
                    {t('pendingRecord.paymentDetails')}
                  </Text>
                  <View style={PastStyle.products}>
                    <Text style={PastStyle.subtittle}>
                      {t('pendingRecord.tax')}
                    </Text>
                    <Text style={PastStyle.subtittle}>
                      £{detailsToShow.total_tax}
                    </Text>
                  </View>
                  <View style={PastStyle.total}>
                    <View style={PastStyle.products}>
                      <Text style={PastStyle.textTotal}>
                        {t('pendingRecord.currentTotal')}
                      </Text>
                      <Text style={PastStyle.textTotal}>
                        £{detailsToShow.total}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            </View>
          ) : (
            <View style={[PendingStyle.receptionCard, GlobalStyles.boxShadow]}>
              <Text style={PendingStyle.title}>
                {t('pendingRecord.checkYourProducts')}
              </Text>
              {detailsToShow.products?.map((product) => (
                <TouchableOpacity
                  key={product.id}
                  onPress={() => handlePress(product.id)}
                  style={{
                    backgroundColor: checkProduct[product.id]
                      ? '#04444f'
                      : 'transparent',
                    marginHorizontal: 10,
                    marginBottom: 5,
                    paddingTop: 15,
                    borderRadius: 10,
                  }}
                >
                  <View style={PendingStyle.cardProduct} key={product.id}>
                    <View style={PendingStyle.dispute}>
                      <Text
                        style={[
                          PendingStyle.text,
                          {
                            color: checkProduct[product.id]
                              ? 'white'
                              : '#04444f',
                          },
                        ]}
                      >
                        {product.name}
                      </Text>
                      <Text
                        style={[
                          PendingStyle.p,
                          { color: productColors[product.id] || textColor },
                        ]}
                        onPress={() => {
                          handleSelectProduct(product)
                          disputePress(product.id)
                        }}
                      >
                        {t('pendingRecord.openDispute')}
                      </Text>
                    </View>
                    <View style={PendingStyle.disputeRight}>
                      <Text
                        style={[
                          PendingStyle.p,
                          {
                            color: checkProduct[product.id]
                              ? 'white'
                              : '#868686',
                          },
                        ]}
                      >
                        {product.quantity} {product.uom}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
              <View>
                {evidences.length > 0 &&
                  evidences.map((file, index) => (
                    <View
                      key={index}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 10,
                        backgroundColor: '#fff',
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                        elevation: 5,
                        borderRadius: 10,
                        padding: 10,
                      }}
                    >
                      <Image
                        source={{ uri: file.uri }}
                        style={{
                          width: 150,
                          height: 150,
                          marginRight: 10,
                          borderRadius: 10,
                        }}
                        onError={(e) => {
                          console.log('Error al cargar la imagen', e)
                        }}
                      />
                      <TouchableOpacity
                        onPress={() => removeEvidence(index, index)}
                        style={{
                          backgroundColor: '#FF5252',
                          borderRadius: 50,
                          padding: 10,
                          marginLeft: 'auto',
                        }}
                      >
                        <Text
                          style={{
                            color: '#fff',
                            fontWeight: 'bold',
                          }}
                        >
                          X
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ))}
              </View>
              <View>
                {evidences.length < 4 && (
                  <Button
                    style={DisputeStyle.buttonUpload}
                    onPress={pickDocument}
                  >
                    <Feather name="upload" size={18} color="#04444F" />
                    <Text style={DisputeStyle.textBtnUpload}>
                      {' '}
                      {t('uploadFile.customUpload')}
                    </Text>
                  </Button>
                )}
                {evidences.length > 0 && (
                  <Button
                    style={DisputeStyle.buttonUpload}
                    onPress={onSendEvidences}
                  >
                    <Feather name="send" size={18} color="#04444F" />
                    <Text style={DisputeStyle.textBtnUpload}>
                      {' '}
                      {t('uploadFile.submitEvidence')}
                    </Text>
                  </Button>
                )}
              </View>
              {detailsToShow.id_stateOrders === 6 && (
                 <Button style={DisputeStyle.buttonSendEmail} onPress={onSendMail}>
                 <Feather name="send" size={18} color="#04444F" />
                 <Text style={DisputeStyle.textBtnUpload}>
                   {' '}
                   {t('uploadFile.sendEmail')}
                 </Text>
               </Button>
              )}             
              <Button
                style={GlobalStyles.btnPrimary}
                onPress={(e) => onConfirmOrder(e)}
              >
                <Text style={GlobalStyles.textBtnSecundary}>
                  {t('pendingRecord.confirmOrder')}
                </Text>
              </Button>
            </View>
          )}
        </View>
        {/* MODAL DE DISPUTA ABIERTA */}
        <ModalErrorDispute
          showModal={showErrorDispute}
          closeModal={closeModal}
          onCloseOrder={onCloseOrder}
          handleOutsidePress={handleOutsidePress}
          Title={t('pendingRecord.warningTitle')}
          message={t('pendingRecord.warningFirstPart')}
          messagep2={t('pendingRecord.warningSecondPart')}
          messagep3={t('pendingRecord.warningThirdPart')}
          message2={t('pendingRecord.modalButton')}
          btnClose={t('pendingRecord.warningCancel')}
        />
        {/* MODAL DE ENVIO DE CORREO CON DISPUTA */}
        <ModalSendEmail
          showModal={showSendEmail}
          closeModal={closeModal}
          Title={t('pendingRecord.modalTittle')}
          Title2="Grownet"
          message={t('pendingRecord.modalMailText')}
          message2={t('pendingRecord.modalButton')}
        />
        {/* MODAL DE DISPUTA ABIERTA */}
        <ModalErrorDispute
          showModal={showErrorDispute}
          closeModal={closeModal}
          onCloseOrder={onCloseOrder}
          handleOutsidePress={handleOutsidePress}
          Title={t('pendingRecord.warningTitle')}
          message={t('pendingRecord.warningFirstPart')}
          messagep2={t('pendingRecord.warningSecondPart')}
          messagep3={t('pendingRecord.warningThirdPart')}
          message2={t('pendingRecord.modalButton')}
          btnClose={t('pendingRecord.warningCancel')}
        />
        {/* MODAL DE ORDEN CONFIRMADA */}
        <ModalConfirmOrder
          showModal={showConfirmOrder}
          closeModal={closeModal}
          Title={t('pendingRecord.modalTittle')}
          Title2="Grownet"
          message={t('pendingRecord.modalText')}
          message2={t('pendingRecord.modalButton')}
        />
        {/* MODAL DE DISPUTA ABIERTA */}
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

export default PendingRecord
