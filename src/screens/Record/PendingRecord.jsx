import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Button, Checkbox } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { DisputeStyle, PendingStyle } from '../../styles/PendingRecordStyle'
import { RecordStyle } from '../../styles/RecordStyle'
import { GlobalStyles } from '../../styles/Styles'
import useTokenStore from '../../store/useTokenStore'
import useRecordStore from '../../store/useRecordStore'
import { selectedStorageOrder } from '../../config/urls.config'
import { ScrollView } from 'react-native-gesture-handler'
import { PastStyle } from '../../styles/PastRecordStyle'
import { useTranslation } from 'react-i18next'
import { closeSelectedOrder } from '../../config/urls.config'
import ModalAlert, {
  ModalConfirmOrder,
  ModalErrorDispute,
  ModalOpenDispute,
} from '../../components/ModalAlert'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import * as DocumentPicker from 'expo-document-picker'

function PendingRecord() {
  const navigation = useNavigation()
  const { t } = useTranslation()
  const [checked, setChecked] = useState(false)
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

  console.log('ORDER', detailsToShow)
  console.log('SELECTED ORDER', selectedPendingOrder)
  console.log('SELECTED PRODUCT', selectedProduct)

  const onToggleCheckbox = () => {
    setChecked(!checked)
  }

  const switchTab = () => {
    setActiveTab((prevTab) =>
      prevTab === 'productsRecord' ? 'reception' : 'productsRecord',
    )
  }

  useEffect(() => {
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
  }, [])

  const handleSelectProduct = (product) => {
    setSelectedProduct(product)
  }

  // SUBIR EVIDENCIA
  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: '*/*',
    })

    if (result.type === 'success') {
      console.log('URI:', result.uri)
      console.log('Nombre:', result.name)
      console.log('Tamaño:', result.size)
    } else {
      console.log('El usuario canceló la selección de archivos')
    }
  }

  // CERRAR LA ORDEN SELECCIONADA
  const onCloseOrder = (e) => {
    e.preventDefault()
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
        console.log(response.data)
        navigation.navigate('record')
      })
      .catch((error) => {
        console.log('Error al cerrar la orden', error)
      })
  }
  const [showErrorDispute, setShowErrorDispute] = useState(false)
  const [showOpenDispute, setShowOpenDispute] = useState(false)
  const [showConfirmOrder, setShowConfirmOder] = useState(false)
  const closeModal = () => {
    setShowOpenDispute(false)
    setShowConfirmOder(false)
    setShowErrorDispute(false)
  }
  const openModal = () => {
    setShowOpenDispute(true)
    setShowConfirmOder(true)
    setShowErrorDispute(true)
  }
  const handleOutsidePress = () => {
    closeModal()
  }
  const [checkProduct, setCheckProduct] = useState({})

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
                        <Text style={PastStyle.subtittle}>{product.name}</Text>
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
                <Button
                  style={DisputeStyle.buttonUpload}
                  onPress={pickDocument}
                >
                  <Feather name="send" size={18} color="#04444F" />
                  <Text style={DisputeStyle.textBtnUpload}>
                    {' '}
                    {t('uploadFile.submitEvidence')}
                  </Text>
                </Button>
              </View>
              <Button
                style={GlobalStyles.btnPrimary}
                onPress={(e) => onCloseOrder(e)}
              >
                <Text style={GlobalStyles.textBtnSecundary}>
                  {t('pendingRecord.confirmOrder')}
                </Text>
              </Button>
            </View>
          )}
        </View>
        <Button style={GlobalStyles.btnOutline} onPress={openModal}>
          tiene disputa
        </Button>
        {
          <ModalErrorDispute
            showModal={showErrorDispute}
            closeModal={closeModal}
            handleOutsidePress={handleOutsidePress}
            Title={t('pendingRecord.warningTitle')}
            message={t('pendingRecord.warningFirstPart')}
            messagep2={t('pendingRecord.warningSecondPart')}
            messagep3={t('pendingRecord.warningThirdPart')}
            message2={t('pendingRecord.modalButton')}
            btnClose={t('pendingRecord.warningCancel')}
          />
        }
        {/*
          <ModalOpenDispute
            showModal={showOpenDispute}
            closeModal={closeModal}
            handleOutsidePress={handleOutsidePress}
            Title={t('disputeRecord.modalTittle')}
            message={t('disputeRecord.modalText')}
            message2={t('pendingRecord.modalButton')}
          />
        */}
        {/* <ModalConfirmOrder
          showModal={showConfirmOrder}
          closeModal={closeModal}
          handleOutsidePress={handleOutsidePress}
          Title={t('pendingRecord.modalTittle')}
          Title2="Grownet"
          message={t('pendingRecord.modalText')}
          message2={t('pendingRecord.modalButton')}
        />*/}
      </ScrollView>
    </SafeAreaView>
  )
}

export default PendingRecord
