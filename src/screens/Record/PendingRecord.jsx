import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Button, Checkbox } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { PendingStyle } from '../../styles/PendingRecordStyle'
import { RecordStyle } from '../../styles/RecordStyle'
import { GlobalStyles } from '../../styles/Styles'
import useTokenStore from '../../store/useTokenStore'
import useRecordStore from '../../store/useRecordStore'
import { selectedStorageOrder } from '../../config/urls.config'
import { ScrollView } from 'react-native-gesture-handler'
import { PastStyle } from '../../styles/PastRecordStyle'
import { useTranslation } from 'react-i18next'

function PendingRecord({ navigation }) {
  const { t } = useTranslation()

  const [checked, setChecked] = useState(false)

  const onToggleCheckbox = () => {
    setChecked(!checked)
  }
  const [input, setInput] = useState('')
  const handleInputChange = (query) => {
    setInput(query)
  }
  const [activeTab, setActiveTab] = useState('reception')

  const switchTab = () => {
    setActiveTab((prevTab) =>
      prevTab === 'productsRecord' ? 'reception' : 'productsRecord',
    )
  }
  // Resumen
  const { token } = useTokenStore()
  const { selectedPendingOrder } = useRecordStore()
  const [detailsToShow, setDetailsToShow] = useState({})

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
  }, [])

  const handlePendingOrderSelect = (orderReference) => {
    setSelectedPendingOrder(orderReference)
    navigation.navigate('pastRecord')
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
              <View style={PendingStyle.cardProduct}>
                <View style={PendingStyle.dispute}>
                  <Text style={PendingStyle.text}>Broccoli</Text>
                  <Text style={PendingStyle.p}>50 Unit</Text>
                </View>
                <View style={PendingStyle.disputeRight}>
                  <Checkbox
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={onToggleCheckbox}
                  />
                  {/* <Button onPress={() => navigation.navigate('disputeRecord')}>
                    <Text style={PendingStyle.p}>
                      {t('pendingRecord.openDispute')}
                    </Text>
          </Button>*/}
                </View>
              </View>
              <Button
                style={GlobalStyles.btnPrimary}
                onPress={() => navigation.navigate('recordsStack')}
              >
                <Text style={GlobalStyles.textBtnSecundary}>
                  {t('pendingRecord.confirmOrder')}
                </Text>
              </Button>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default PendingRecord
