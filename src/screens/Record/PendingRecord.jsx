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
  ModalErrorDispute
} from '../../components/ModalAlert'
import { closeSelectedOrder, selectedStorageOrder, createDisputeOrder } from '../../config/urls.config'
import useRecordStore from '../../store/useRecordStore'
import useTokenStore from '../../store/useTokenStore'
import { PastStyle } from '../../styles/PastRecordStyle'
import { DisputeStyle, PendingStyle } from '../../styles/PendingRecordStyle'
import { RecordStyle } from '../../styles/RecordStyle'
import { GlobalStyles } from '../../styles/Styles'

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
  const [showConfirmOrder, setShowConfirmOder] = useState(false)
  const [checkProduct, setCheckProduct] = useState({})
  const [evidences, setEvidences] = useState([])
  const [buttonEvidence, setButtonEvidence] = useState('upload')

  console.log('Detalles para mooostrarrr', detailsToShow)
  console.log('ESTADO DE LA ORDEN AQUI:', detailsToShow.id_stateOrders)
  console.log('NUMERO DE REFERENCIA:', detailsToShow.reference)

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
  useEffect(() => {
    if (evidences.length === 0) {
      setButtonEvidence('upload');
    }
  }, [evidences]);

  const pickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: '*/*',
    })

    if (result.type === 'success') {
      setEvidences([...evidences, result])
    } else {
      console.log('El usuario canceló la selección de archivos')
    }
  }

  const onSendEvidences = () => {
    const formData = new FormData();

    const disputeBody = {
      order: selectedPendingOrder,
      product_id: detailsToShow.evidences_id,
    };
    for (let key in disputeBody) {
      if (disputeBody.hasOwnProperty(key)) {
        formData.append(key, disputeBody[key]);
      }
    }
    evidences.forEach((file) => {
      formData.append("evidences[]", file);
    });

    axios
      .post(createDisputeOrder, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
        setEvidences([]);
        setButtonEvidence("upload");
      })
      .catch((error) => {
        console.error("Error al crear la disputa:", error);
      });
  };

  const removeEvidence = (index) => {
    const newEvidences = [...evidences];
    newEvidences.splice(index, 1);
    setEvidences(newEvidences);
  };

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
        console.log(response.data)
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
      {evidences.map((file, index) => (
        <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
          <Image
            source={{ uri: file.uri }}
            style={{ width: 30, height: 30, marginRight: 10 }}
          />
          <TouchableOpacity onPress={() => removeEvidence(index)}>
            <Text>X</Text>
          </TouchableOpacity>
        </View>
      ))}

      {buttonEvidence === 'upload' && (
        <Button
          onPress={pickDocument}
          title={t('uploadFile.customUpload')}
        />
      )}

      {buttonEvidence === 'submit' && (
        <Button
          onPress={onSendEvidences}
          title={t('uploadFile.submitEvidence')}
        />
      )}
    </View>
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

        {/* MODAL DE ORDEN CONFIRMADA */}
        <ModalConfirmOrder
          showModal={showConfirmOrder}
          closeModal={closeModal}
          Title={t('pendingRecord.modalTittle')}
          Title2="Grownet"
          message={t('pendingRecord.modalText')}
          message2={t('pendingRecord.modalButton')}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default PendingRecord
